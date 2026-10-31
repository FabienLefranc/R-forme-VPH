// Gestion des adresses (URL) du site.
// Chaque page a sa propre adresse, ce qui permet :
//  - de partager le lien d'une fiche,
//  - d'utiliser le bouton « Retour » du navigateur / du téléphone,
//  - d'être indexé page par page par Google.
//
// Format choisi : paramètres d'URL (?cat=...&sous=...&marque=...&modele=...).
// Il fonctionne sur n'importe quel hébergement, sans configuration serveur.

import { CATEGORIES } from './data';
import { AppStep, MainTab, Category, SubCategory, Brand, Model } from './types';

export const SITE_URL = 'https://assistant-ergo.fr';
export const SITE_NAME = 'Assistant Ergo';
export const DEFAULT_TITLE = 'Assistant Ergo – Guide VPH & LPPR des ergothérapeutes';
export const DEFAULT_DESCRIPTION =
  "Le guide des ergothérapeutes pour les fauteuils roulants et VPH pris en charge (LPPR, réforme du 1er décembre 2025) : fiches techniques, comparateur de modèles et actualités.";

const TAB_SLUGS: Record<MainTab, string> = {
  [MainTab.COMPARATOR]: '',
  [MainTab.NEWS]: 'actualites',
  [MainTab.ABOUT]: 'presentation',
  [MainTab.CONTACT]: 'contact',
  [MainTab.LEGAL]: 'mentions-legales',
  [MainTab.PRIVACY]: 'confidentialite',
};

const TAB_TITLES: Record<MainTab, string> = {
  [MainTab.COMPARATOR]: 'Matériel',
  [MainTab.NEWS]: 'Actualités',
  [MainTab.ABOUT]: 'Présentation',
  [MainTab.CONTACT]: 'Contact',
  [MainTab.LEGAL]: 'Mentions légales',
  [MainTab.PRIVACY]: 'Confidentialité',
};

export interface NavState {
  tab: MainTab;
  step: AppStep;
  category: Category | null;
  subCategory: SubCategory | null;
  brand: Brand | null;
  model: Model | null;
  compareModels: Model[];
}

export const HOME_STATE: NavState = {
  tab: MainTab.COMPARATOR,
  step: AppStep.CATEGORY_SELECTION,
  category: null,
  subCategory: null,
  brand: null,
  model: null,
  compareModels: [],
};

const ci = (a?: string | null, b?: string | null) =>
  !!a && !!b && a.toLowerCase() === b.toLowerCase();

export function findModelById(id: string): Model | undefined {
  for (const c of CATEGORIES)
    for (const s of c.subCategories)
      for (const b of s.brands || [])
        for (const m of b.models || []) if (ci(m.id, id)) return m;
  return undefined;
}

/** Lit l'adresse et retrouve la page correspondante. */
export function parseUrl(search: string): NavState {
  const p = new URLSearchParams(search);

  // Onglets (nouveau format ?page=... et ancien format ?tab=NEWS)
  const page = p.get('page');
  const legacyTab = p.get('tab');
  let tab = MainTab.COMPARATOR;
  if (page) {
    const found = (Object.keys(TAB_SLUGS) as MainTab[]).find(t => TAB_SLUGS[t] === page);
    if (found) tab = found;
  } else if (legacyTab && (Object.values(MainTab) as string[]).includes(legacyTab.toUpperCase())) {
    tab = legacyTab.toUpperCase() as MainTab;
  }
  if (tab !== MainTab.COMPARATOR) return { ...HOME_STATE, tab };

  // Comparatif partagé : ?comparer=id1,id2
  const compare = p.get('comparer');
  if (compare) {
    const models = compare
      .split(',')
      .map(id => findModelById(id.trim()))
      .filter((m): m is Model => !!m)
      .slice(0, 4);
    if (models.length > 0) {
      return { ...HOME_STATE, step: AppStep.COMPARISON_VIEW, compareModels: models };
    }
  }

  const category = CATEGORIES.find(c => ci(c.id, p.get('cat')));
  if (!category) return { ...HOME_STATE };

  if (category.subCategories.length === 0) {
    return {
      ...HOME_STATE,
      step: AppStep.DETAILS_CHAT,
      category,
      subCategory: { id: 'general', name: 'Général', description: category.name },
    };
  }

  const subCategory = category.subCategories.find(s => ci(s.id, p.get('sous')));
  if (!subCategory) return { ...HOME_STATE, step: AppStep.SUBCATEGORY_SELECTION, category };

  const brands = subCategory.brands || [];
  if (brands.length === 0) {
    return { ...HOME_STATE, step: AppStep.DETAILS_CHAT, category, subCategory };
  }

  const brand = brands.find(b => ci(b.id, p.get('marque')));
  if (!brand) return { ...HOME_STATE, step: AppStep.BRAND_SELECTION, category, subCategory };

  const models = brand.models || [];
  if (models.length === 0) {
    return { ...HOME_STATE, step: AppStep.DETAILS_CHAT, category, subCategory, brand };
  }

  const model = models.find(m => ci(m.id, p.get('modele')));
  if (!model) return { ...HOME_STATE, step: AppStep.MODEL_SELECTION, category, subCategory, brand };

  return { ...HOME_STATE, step: AppStep.DETAILS_CHAT, category, subCategory, brand, model };
}

/** Construit l'adresse (partie « ?... ») correspondant à la page affichée. */
export function buildSearch(s: NavState): string {
  if (s.tab !== MainTab.COMPARATOR) return `?page=${TAB_SLUGS[s.tab]}`;

  if (s.step === AppStep.COMPARISON_VIEW) {
    if (s.compareModels.length === 0) return '';
    return `?comparer=${s.compareModels.map(m => encodeURIComponent(m.id)).join(',')}`;
  }

  if (s.step === AppStep.CATEGORY_SELECTION || !s.category) return '';

  const p = new URLSearchParams();
  p.set('cat', s.category.id);
  if (s.subCategory && s.subCategory.id !== 'general') p.set('sous', s.subCategory.id);
  if (s.brand) p.set('marque', s.brand.id);
  if (s.model) p.set('modele', s.model.id);
  return `?${p.toString()}`;
}

/** Lien complet (à copier / partager) vers une fiche modèle. */
export function modelUrl(category: Category, subCategory: SubCategory, brand: Brand | null, model: Model): string {
  return (
    SITE_URL +
    '/' +
    buildSearch({ ...HOME_STATE, step: AppStep.DETAILS_CHAT, category, subCategory, brand, model })
  );
}

/** Titre d'onglet et description pour Google, selon la page affichée. */
export function pageMeta(s: NavState): { title: string; description: string } {
  const suffix = ` | ${SITE_NAME}`;
  if (s.tab !== MainTab.COMPARATOR) {
    return { title: TAB_TITLES[s.tab] + suffix, description: DEFAULT_DESCRIPTION };
  }
  if (s.step === AppStep.COMPARISON_VIEW) {
    return {
      title: `Comparatif : ${s.compareModels.map(m => m.name).join(' / ')}${suffix}`,
      description: 'Comparatif technique de fauteuils roulants et VPH pris en charge LPPR.',
    };
  }
  if (s.model) {
    return {
      title: `${s.model.name} (${s.subCategory?.name}) – fiche technique${suffix}`,
      description: s.model.description || DEFAULT_DESCRIPTION,
    };
  }
  if (s.brand && s.subCategory) {
    return {
      title: `${s.brand.name} – ${s.subCategory.name}${suffix}`,
      description: `Modèles ${s.brand.name} en catégorie ${s.subCategory.name} : ${s.subCategory.description || ''}`.trim(),
    };
  }
  if (s.subCategory && s.subCategory.id !== 'general') {
    return {
      title: `${s.subCategory.name} – ${s.subCategory.description || s.category?.name}${suffix}`,
      description: `${s.subCategory.name} : ${s.subCategory.description || ''}. Marques et modèles pris en charge, fiches techniques.`,
    };
  }
  if (s.category) {
    return {
      title: `${s.category.name}${suffix}`,
      description: `${s.category.name} : catégories LPPR, marques et modèles pris en charge.`,
    };
  }
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function applyPageMeta(s: NavState, search: string) {
  const { title, description } = pageMeta(s);
  const url = SITE_URL + '/' + search;
  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
}
