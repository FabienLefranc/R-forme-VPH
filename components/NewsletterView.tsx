import React from 'react';
import { NewsletterForm } from './NewsletterForm';

interface NewsletterViewProps {
  onPrivacy: () => void;
}

const POINTS: { title: string; text: string }[] = [
  {
    title: 'Les nouveautés produits',
    text: "Fauteuils manuels et électriques, scooters, motorisations, pédiatrie, bariatrique : ce qui sort chez les fabricants, et pour qui c'est intéressant.",
  },
  {
    title: 'Le remboursement et la LPPR',
    text: 'Les textes qui changent, les nouvelles inscriptions, les dates à ne pas rater pour les dossiers en cours.',
  },
  {
    title: 'Les alertes sécurité',
    text: "Les rappels de produits et avis de l'ANSM qui concernent les VPH.",
  },
  {
    title: 'Ailleurs dans le monde',
    text: "Ce qui se fait à l'étranger. Pas toujours disponible chez nous, mais souvent source d'idées.",
  },
  {
    title: 'Les nouvelles fiches du site',
    text: 'Les modèles ajoutés ou mis à jour sur assistant-ergo.fr, avec le lien direct vers leur fiche.',
  },
];

export const NewsletterView: React.FC<NewsletterViewProps> = ({ onPrivacy }) => (
  <div className="max-w-4xl mx-auto p-4 md:p-6 animate-fade-in">
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white px-6 md:px-10 py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3">Newsletter gratuite</p>
        <h2 className="text-3xl md:text-4xl font-black leading-tight">Le Journal du VPH</h2>
        <p className="mt-4 text-slate-300 text-lg max-w-2xl">
          Chaque semaine, je fais le tri dans l'actualité des fauteuils roulants et des aides à la mobilité.
          Pas tout. Juste ce qui peut changer quelque chose pour les personnes qu'on accompagne.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 px-6 md:px-10 py-10">
        <div className="md:col-span-3 flex flex-col gap-5">
          <h3 className="text-lg font-bold text-slate-900">Dans chaque numéro</h3>
          <ul className="flex flex-col gap-4">
            {POINTS.map(p => (
              <li key={p.title} className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0 text-indigo-600" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <div>
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pour qui ? Les ergothérapeutes, les personnes concernées, leurs proches, et tous ceux qui travaillent autour du fauteuil roulant.
            Un e-mail par semaine, le lundi en général. Gratuit, sans publicité, et vos coordonnées ne sont jamais revendues.
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:sticky md:top-24">
            <NewsletterForm onPrivacy={onPrivacy} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 md:px-10 py-5 text-xs text-slate-500">
        Le journal est préparé avec l'aide d'un outil de veille automatisée, puis relu et commenté par un ergothérapeute.
        Les informations fabricants restent à vérifier avant toute préconisation.
      </div>
    </div>
  </div>
);
