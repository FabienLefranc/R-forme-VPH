
import React from 'react';

export function PrivacyView() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Politique de Confidentialité</h2>
        <p className="text-slate-500">Conformité RGPD et protection de vos données.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-8">
        <p className="text-slate-600 leading-relaxed italic text-sm">
          La présente Politique de Confidentialité informe les utilisateurs sur le traitement des données sur assistant-ergo.fr.
        </p>

        {/* Section 1 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. Collecte des données</h3>
          <p className="text-slate-600 text-sm">
            Le site ne stocke aucune donnée personnelle de manière persistante. Les textes saisis sont traités de manière transitoire par l'intelligence artificielle pour générer des réponses.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. Confidentialité et Sécurité</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            L'utilisateur est tenu de ne saisir aucune donnée nominative ou identifiante (RGPD). Les échanges sont éphémères et ne sont pas utilisés pour l'entraînement des modèles de l'IA.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. Cookies</h3>
          <p className="text-slate-600 text-sm">
            Seuls des cookies techniques nécessaires au fonctionnement du site peuvent être utilisés. Aucun pistage publicitaire n'est mis en place.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">4. Contact</h3>
          <p className="text-slate-600 text-sm">
            Pour toute question relative à vos données, vous pouvez contacter : <a href="mailto:contact.assistant.ergo@gmail.com" className="text-indigo-600 hover:underline">contact.assistant.ergo@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
