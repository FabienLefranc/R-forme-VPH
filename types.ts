
export enum AppStep {
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  SUBCATEGORY_SELECTION = 'SUBCATEGORY_SELECTION',
  BRAND_SELECTION = 'BRAND_SELECTION',
  MODEL_SELECTION = 'MODEL_SELECTION',
  DETAILS_CHAT = 'DETAILS_CHAT',
  COMPARISON_VIEW = 'COMPARISON_VIEW'
}

export enum MainTab {
  COMPARATOR = 'COMPARATOR',
  NEWS = 'NEWS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  LEGAL = 'LEGAL',
  PRIVACY = 'PRIVACY',
  NEWSLETTER = 'NEWSLETTER'
}

/** Rubriques de la page Actualités (onglets). */
export type NewsCategory = 'lppr' | 'solutions' | 'fabricants' | 'agenda';

/** Un numéro du Journal du VPH (newsletter), affiché sur la page Actualités. */
export interface JournalIssue {
  /** Numéro du journal (1, 2, 3…). */
  numero: number;
  /** Date d'envoi aux abonnés, au format AAAA-MM-JJ (ex. '2026-11-06'). */
  dateEnvoi: string;
  titre: string;
  /** 2 lignes : ce qu'il faut retenir. Visible pendant l'exclusivité. */
  chapeau: string;
  /** Titres des rubriques du numéro. Visibles pendant l'exclusivité. */
  sommaire: string[];
  /** Contenu complet en HTML, affiché seulement après les 15 jours d'exclusivité. */
  contenu?: string;
  /** Lien vers la version en ligne de la campagne Brevo (optionnel). */
  lienWeb?: string;
}

/** Un salon ou événement à venir (onglet Agenda). */
export interface UpcomingEvent {
  /** Date de début, au format AAAA-MM-JJ. */
  date: string;
  /** Date de fin si l'événement dure plusieurs jours (AAAA-MM-JJ). */
  dateFin?: string;
  nom: string;
  lieu: string;
  url?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  /** Rubrique (onglet) de l'article. */
  categorie?: NewsCategory;
  /** Pour les « Solutions terrain » : le problème résolu, affiché en titre. */
  accroche?: string;
  content: string;
  fullContent?: string; // HTML/Markdown for detailed view
  imageUrl?: string;
  hashtags: string[];
  linkedinUrl?: string;
  internalLink?: {
    type: 'MODEL' | 'BRAND' | 'SUBCATEGORY' | 'INFO_MODAL' | 'EXTERNAL' | '';
    id: string;
    label: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    url?: string;
  };
}

export interface ProductDetails {
  presentation: string[];
  specs: { label: string; value: string }[];
  // Fix: Made options, pros, and cons optional to fix TS error in data.ts when data is incomplete
  options?: string[];
  pros?: string[];
  cons?: string[];
  colors?: { name: string; hex: string; border?: string; effect?: string }[];
}

export interface Model {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  manufacturerUrl?: string;
  details?: ProductDetails;

  isPediatric?: boolean;
  isBariatric?: boolean;
}


export interface Brand {
  id: string;
  name: string;
  models?: Model[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  brands?: Brand[];
  detailedInfo?: {
    title: string;
    content: string; // HTML/Markdown content
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}