
import React from 'react';

export function LegalView() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Mentions Légales</h2>
        <p className="text-slate-500">Informations réglementaires et conditions d'utilisation.</p>
      </div>

      <div className="space-y-8">
        {/* Simple Disclaimer */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-amber-500">⚠️</span> Avertissement
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            L'outil <strong>assistant-ergo.fr</strong> est une interface d'assistance technique. Il ne constitue pas un avis médical officiel. L'utilisateur demeure seul responsable de l'interprétation des résultats et de leur application clinique. Les réponses sont générées par un système d'intelligence artificielle qui peut produire des erreurs.
          </p>
        </section>

        {/* Section 1 */}
        <section className="bg-white p-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">1. Édition du site</h3>
          <div className="text-slate-600 space-y-2 text-sm">
            <p>Propriétaire & Publication : <strong>Fabien Lefranc</strong></p>
            <p>Contact : <a href="mailto:contact.assistant.ergo@gmail.com" className="text-indigo-600 hover:underline">contact.assistant.ergo@gmail.com</a></p>
            <p>Statut : Particulier</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">2. Hébergement</h3>
          <p className="text-slate-600 text-sm">
            Le site est hébergé par <strong>Google Cloud Platform</strong> (Cloud Run).
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">3. Propriété intellectuelle</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            L'ensemble des contenus (textes, logos, arborescence) est la propriété exclusive de Fabien Lefranc, sauf mention contraire (marques et documentations constructeurs).
          </p>
        </section>
      </div>
    </div>
  );
}
