
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
            En dehors de l'inscription volontaire à la newsletter (voir point 4), le site ne stocke aucune donnée personnelle de manière persistante. Les textes saisis sont traités de manière transitoire par l'intelligence artificielle pour générer des réponses.
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
            Avec votre accord uniquement, le site utilise Google Analytics pour mesurer son audience (pages consultées, durée de visite, type d'appareil), avec anonymisation de l'adresse IP. Ces cookies (_ga) sont conservés 13 mois au maximum. Aucun pistage publicitaire n'est mis en place et aucune donnée n'est revendue.
          </p>
          <p className="text-slate-600 text-sm mt-2">
            Votre choix (accepter ou refuser) est mémorisé 6 mois dans votre navigateur. Vous pouvez le modifier à tout moment :{' '}
            <button onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="text-indigo-600 hover:underline font-medium">gérer mes cookies</button>.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">4. Newsletter « Le Journal du VPH »</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Si vous vous inscrivez à la newsletter, votre adresse e-mail est enregistrée uniquement pour vous envoyer le journal. L'inscription repose sur votre consentement et doit être confirmée par un e-mail (double validation).
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mt-2">
            La liste des abonnés et l'envoi sont gérés par Brevo (Sendinblue SAS, société française), qui agit comme sous-traitant et héberge les données dans l'Union européenne. Votre adresse n'est ni vendue ni transmise à d'autres. Elle est conservée tant que vous êtes abonné.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mt-2">
            Vous pouvez vous désinscrire à tout moment grâce au lien présent en bas de chaque e-mail, ou en écrivant à l'adresse ci-dessous. Vous disposez aussi d'un droit d'accès, de rectification et de suppression de vos données, et pouvez saisir la CNIL.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-2">5. Contact</h3>
          <p className="text-slate-600 text-sm">
            Pour toute question relative à vos données, vous pouvez contacter : <a href="mailto:contact.assistant.ergo@gmail.com" className="text-indigo-600 hover:underline">contact.assistant.ergo@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
