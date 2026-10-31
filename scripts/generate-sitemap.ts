// Génère public/sitemap.xml avec une adresse par catégorie, sous-catégorie,
// marque et fiche modèle, pour que Google indexe toutes les fiches.
// À relancer après l'ajout de nouveaux fauteuils :  npm run sitemap
import { writeFileSync } from 'fs';
import { CATEGORIES } from '../data';
import { SITE_URL, buildSearch, HOME_STATE } from '../routing';
import { AppStep, MainTab } from '../types';

const today = new Date().toISOString().slice(0, 10);
const urls: { loc: string; priority: string; freq: string }[] = [];
const add = (search: string, priority: string, freq = 'weekly') =>
  urls.push({ loc: `${SITE_URL}/${search}`, priority, freq });

add('', '1.0', 'daily');
for (const tab of [MainTab.NEWS, MainTab.ABOUT, MainTab.CONTACT, MainTab.LEGAL, MainTab.PRIVACY]) {
  add(buildSearch({ ...HOME_STATE, tab }), tab === MainTab.NEWS ? '0.8' : '0.3', tab === MainTab.NEWS ? 'weekly' : 'monthly');
}

for (const category of CATEGORIES) {
  add(buildSearch({ ...HOME_STATE, step: AppStep.SUBCATEGORY_SELECTION, category }), '0.8');
  for (const subCategory of category.subCategories) {
    add(buildSearch({ ...HOME_STATE, step: AppStep.BRAND_SELECTION, category, subCategory }), '0.8');
    for (const brand of subCategory.brands || []) {
      add(buildSearch({ ...HOME_STATE, step: AppStep.MODEL_SELECTION, category, subCategory, brand }), '0.5');
      for (const model of brand.models || []) {
        add(buildSearch({ ...HOME_STATE, step: AppStep.DETAILS_CHAT, category, subCategory, brand, model }), '0.7');
      }
    }
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;');
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(u => `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n') +
  '\n</urlset>\n';

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml : ${urls.length} adresses`);
