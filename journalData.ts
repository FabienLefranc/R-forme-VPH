import { JournalIssue, UpcomingEvent } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// LE JOURNAL DU VPH SUR LA PAGE ACTUALITÉS
//
// Après chaque envoi Brevo, ajoute le numéro EN HAUT de la liste ci-dessous.
// Le site gère tout seul l'exclusivité :
//   - pendant 15 jours après « dateEnvoi » : seuls le titre, le chapeau et le
//     sommaire sont affichés, avec le badge « Libre dans X jours » ;
//   - ensuite : le numéro complet (« contenu ») est en accès libre.
//
// ⚠️ Le site est une application React : tout ce qui est écrit ici est lisible
// dans le code par une personne un peu technique, même pendant l'exclusivité.
// Pour une exclusivité stricte, laisse « contenu » vide au départ et ajoute-le
// une fois les 15 jours passés (ou mets seulement « lienWeb » à ce moment-là).
//
// Modèle à copier :
//
//   {
//     numero: 1,
//     dateEnvoi: '2026-11-06',
//     titre: 'Titre du numéro',
//     chapeau: "Ce qu'il faut retenir cette semaine, en 2 lignes.",
//     sommaire: ['Les nouveautés produits', 'Le remboursement et la LPPR', 'Les alertes sécurité', 'Ailleurs dans le monde', 'Les nouvelles fiches du site'],
//     contenu: `<p>Texte complet du numéro (HTML)…</p>`,
//     lienWeb: 'https://…',  // version en ligne Brevo, optionnel
//   },
// ─────────────────────────────────────────────────────────────────────────────

/** Durée d'exclusivité réservée aux abonnés, en jours. */
export const EXCLUSIVITE_JOURS = 15;

export const JOURNAL_ISSUES: JournalIssue[] = [
  // Ajoute les numéros ici, le plus récent en premier.
  {
    numero: 4,
    dateEnvoi: '2026-11-23',
    titre: "Omni en liquidation : ce qu'il faut savoir",
    chapeau: "Omni, la trottinette française pour fauteuil, est en liquidation judiciaire. Aussi : un électrique pliant en carbone, un avis de sécurité Raz et la fin de la transition le 30/11.",
    sommaire: ['À la une : Omni en liquidation judiciaire', 'Nouveauté : KERDOM Carbon XT', 'Sur assistant-ergo.fr : deux kits de motorisation remboursés', 'Ailleurs dans le monde', 'Agenda', 'Remboursement et LPPR', 'Sécurité'],
    contenu: `
<p>Bonjour,</p>
<p>Semaine calme côté nouveautés, mais une mauvaise nouvelle : Omni, la jeune entreprise française des trottinettes pour fauteuil, est en liquidation. Petit rappel aussi : les prescriptions d'avant décembre 2025 ne servent plus après le 30 novembre. Et un avis de sécurité à connaître sur des chaises de douche Raz.</p>
<h3>À la une · Omni, la trottinette pour fauteuil, en liquidation judiciaire</h3>
<p>Omni, créée en 2018 à Montrouge, proposait une roue électrique qui se fixe à l'avant d'un fauteuil manuel. Le tribunal des activités économiques de Nanterre l'a placée en liquidation judiciaire le 4 novembre, après une cessation des paiements le 2 septembre. On ne sait pas encore si une autre entreprise reprendra le produit.</p>
<p><strong>Ce que ça change sur le terrain :</strong> pour les personnes déjà équipées, la question, c'est l'entretien (pièces, batterie, garantie). Rapprochez-vous du revendeur. Omni n'était pas sur la liste des fauteuils et kits remboursés.</p>
<p>Sources : <a href="https://www.yanous.com/news/actualite/actualite2611.html" target="_blank" rel="noopener">Yanous, 16/11</a> · <a href="https://www.francereprises.com/vigie/entreprise/844548214" target="_blank" rel="noopener">annonce BODACC</a></p>
<h3>Nouveauté · KERDOM Carbon XT</h3>
<p>Un fauteuil électrique pliant au châssis en carbone, annoncé le 20 novembre aux États-Unis : 18,4 kg sans batterie et 181 kg de charge maximale selon le fabricant. Pas de distributeur en France, pas d'inscription LPPR, pas de marquage CE annoncé. <a href="https://fortune.com/press-releases/kerdom-carbon-xt-heavy-duty-strength-2026-11-20/" target="_blank" rel="noopener">Communiqué KERDOM</a></p>
<h3>Sur assistant-ergo.fr · Motoriser un manuel avec un kit remboursé</h3>
<p>Deux kits de propulsion électrique sur la liste CERAHTEC, avec leur fiche : <a href="https://assistant-ergo.fr/?cat=aap&sous=KIT&marque=alber&modele=alber-e-fix-e35">Alber e-fix E35</a> et <a href="https://assistant-ergo.fr/?cat=aap&sous=KIT&marque=benoit_systemes&modele=benoit-systemes-minotor-3">Benoit Systèmes Minotor 3</a>.</p>
<h3>Ailleurs dans le monde</h3>
<p><strong>Canada.</strong> À partir du 14 décembre, WestJet doit prendre en charge les fauteuils électriques qui ne passent pas sous 89 cm (vol, autre compagnie ou remboursement). <a href="https://deeparrival.com/news/westjet-tall-power-wheelchair-rebook-refund-december-14-2026/" target="_blank" rel="noopener">Source</a></p>
<p><strong>États-Unis.</strong> Stealth Products rachète Align3D, spécialiste des assises moulées à partir d'un scan 3D. <a href="https://mobilitymgmt.com/lorenzo-romero-newly-acquired-align3d-revolutionized-custom-molded-seating-process/" target="_blank" rel="noopener">Source</a></p>
<h3>Agenda</h3>
<p><strong>2 et 3 décembre</strong> · Autonomic Lille Europe, Lille Grand Palais. <a href="https://www.autonomic-expo.com/salon/autonomic-lille-europe" target="_blank" rel="noopener">Infos et badge</a><br><strong>25 et 26 novembre</strong> · OT Show, NEC Birmingham (Royaume-Uni).</p>
<h3>Remboursement et LPPR</h3>
<p>Lundi 30 novembre, fin de la transition : une prescription d'avant le 1er décembre 2025 ne vaut que pour un achat fait d'ici là. Liste CERAHTEC mise à jour le 19 novembre, sans arrivée ni départ repéré. <a href="https://www.monparcourshandicap.gouv.fr/actualite/nouvelle-prise-en-charge-des-fauteuils-roulants" target="_blank" rel="noopener">monparcourshandicap.gouv.fr</a></p>
<h3>Sécurité</h3>
<p>Avis ANSM du 20/11 sur les chaises de douche Raz (Raz-AT, Raz-SP, ZUM-SP, Raze) : certains sièges peuvent casser. Raz remplace le siège gratuitement. <a href="https://ansm.sante.fr/informations-de-securite/chaise-de-douche-toilette-mobile-raz-raz-design-inc" target="_blank" rel="noopener">Avis ANSM</a></p>
`,
    lienWeb: 'http://sh1.sendinblue.com/nv5jsnmt4c.html',
  },
  {
    numero: 3,
    dateEnvoi: '2026-11-16',
    titre: 'Plus que 2 semaines avant le 30/11',
    chapeau: "Fin de la transition le 30 novembre pour les anciennes prescriptions, l'Empulse M90 entre à la LPPR, deux nouvelles fiches et une loi américaine sur les fauteuils ultralégers.",
    sommaire: ['À la une : ancienne prescription, plus que deux semaines', "Nouveauté : l'Empulse M90 remboursé", 'Sur assistant-ergo.fr : deux nouveaux venus sur la liste LPPR', 'Ailleurs dans le monde', 'Agenda', 'Remboursement et LPPR', 'Sécurité'],
    contenu: `
<p>Bonjour,</p>
<p>Cette semaine, une date à noter partout : le 30 novembre. Si vous avez une prescription de fauteuil faite avant décembre 2025, il vous reste deux semaines. À côté, la liste des fauteuils remboursés a bougé deux fois en quelques jours. Et on file aux États-Unis, où le remboursement des fauteuils ultralégers change.</p>
<h3>À la une · Ancienne prescription : plus que deux semaines</h3>
<p>Depuis le 1er décembre 2025, les fauteuils roulants sont pris en charge à 100 % avec la nouvelle nomenclature. Une prescription faite avant cette date reste utilisable pour un achat fait au plus tard le 30 novembre 2026. Après, seul le nouveau cadre s'applique.</p>
<p><strong>Ce que ça change sur le terrain :</strong> une vieille ordonnance qui n'a pas abouti à un achat d'ici le 30/11 risque de ne plus servir. Il faudra une nouvelle prescription, avec pour certains fauteuils un binôme médecin + ergo ou kiné. Une <a href="https://experience.arcgis.com/experience/0a1b5ce38baa4a23bcda1a08d2d3289a/" target="_blank" rel="noopener">carte nationale</a> aide à trouver un prescripteur.</p>
<p>Sources : <a href="https://www.monparcourshandicap.gouv.fr/actualite/nouvelle-prise-en-charge-des-fauteuils-roulants" target="_blank" rel="noopener">monparcourshandicap.gouv.fr</a> · <a href="https://informations.handicap.fr/a-fauteuils-roulants-la-carte-des-prescripteurs-en-ligne-39543.php" target="_blank" rel="noopener">Handicap.fr</a></p>
<h3>Nouveauté · L'Empulse M90 entre sur la liste des fauteuils remboursés</h3>
<p>Des roues arrière motorisées qui se fixent sur un fauteuil manuel, pilotées avec un petit joystick. Sur la liste CERAHTEC depuis le 10 novembre, dans les kits de propulsion électrique. <a href="https://assistant-ergo.fr/?cat=aap&sous=KIT&marque=sunrise&modele=sunrise-medical-empulse-m90">Voir la fiche</a></p>
<h3>Sur assistant-ergo.fr · Deux nouveaux venus sur la liste LPPR</h3>
<p><a href="https://assistant-ergo.fr/?cat=manuel&sous=FRMP&marque=vermeiren&modele=vermeiren-inovys-ii-l70">Vermeiren Inovys II L70</a> (manuel de confort, FRMP) et <a href="https://assistant-ergo.fr/?cat=electrique&sous=FREP_CLASSE_B&marque=pride_mobility&modele=pride-quantum-4front-2">Pride Quantum 4Front²</a> (électrique multi-position, FREP classe B).</p>
<h3>Ailleurs dans le monde</h3>
<p><strong>États-Unis.</strong> Une loi promulguée le 10 novembre impose à Medicare des codes de remboursement à part pour les manuels ultralégers en titane ou en carbone. <a href="https://nrrts.org/legislative-alert-hr1703/" target="_blank" rel="noopener">Source</a></p>
<p><strong>États-Unis.</strong> Robooter C40, un électrique pliant à trois modes : la personne conduit, ou l'aidant pousse, avec ou sans assistance. Pas disponible en France. <a href="https://www.einpresswire.com/article/956439890/robooter-launches-c40-power-wheelchair-with-three-ways-to-move" target="_blank" rel="noopener">Source</a></p>
<h3>Agenda</h3>
<p><strong>2 et 3 décembre</strong> · Autonomic Lille Europe, Lille Grand Palais. <a href="https://www.autonomic-expo.com/salon/autonomic-lille-europe" target="_blank" rel="noopener">Infos et badge</a></p>
<h3>Remboursement et LPPR</h3>
<p>Liste CERAHTEC mise à jour le 10 puis le 12 novembre : Vermeiren Inovys II L70, Sunrise Empulse M90 et Pride Quantum 4Front². <a href="https://mobile.cerahtec.fr/doc/lppr_nn.pdf" target="_blank" rel="noopener">Voir la liste</a></p>
<h3>Sécurité</h3>
<p>Aucun avis de sécurité ANSM concernant un VPH publié cette semaine-là.</p>
`,
    lienWeb: 'http://sh1.sendinblue.com/nrzrsnmt4c.html',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AGENDA : salons et événements à venir (les dates passées disparaissent seules)
//
//   { date: '2027-03-17', dateFin: '2027-03-18', nom: 'Autonomic Sud', lieu: 'Toulouse · MEETT', url: 'https://…' },
// ─────────────────────────────────────────────────────────────────────────────
export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    date: '2026-12-02',
    dateFin: '2026-12-03',
    nom: 'Autonomic Lille Europe',
    lieu: 'Lille Grand Palais · entrée gratuite',
    url: 'https://www.autonomic-expo.com/salon/autonomic-lille-europe',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HISTORIQUE DES REMBOURSEMENTS (onglet « Remboursement LPPR »)
// articleId = l'article d'actualité qui détaille le mois (cliquable).
// ─────────────────────────────────────────────────────────────────────────────
export const LPPR_TIMELINE: { mois: string; produits: string; articleId?: string }[] = [
  { mois: 'Mars 2026', produits: 'RGK Elite et Grand Slam (Sunrise Medical) · Empulse M90 · Panthera S3 (Permobil) · Poussettes Trak et Reach', articleId: '1' },
  { mois: 'Avril 2026', produits: 'Dreeft, système de freinage pour fauteuil manuel', articleId: '12' },
  { mois: 'Mai 2026', produits: '4 fauteuils et 2 bases, dont Hector (HMS-Vilgo) et Icon 60 (Rehasense)', articleId: '15' },
  { mois: 'Juillet 2026', produits: 'Speedy A1 (Pro Activ, FRMA) · Stingray (Cree, POU_MRE)', articleId: '17' },
  { mois: 'Août 2026', produits: 'Scooter Eon (Vermeiren) · Poussette Corzino (Cree)', articleId: '18' },
  { mois: 'Septembre 2026', produits: 'Avantgarde Teen 2 et Teen 2 VR (Ottobock) · QS3 X (Sunrise Medical) · Colt Plus (Pride) · Wizemed C100 (Sungo) · Invacare Poirier devient DHCARE', articleId: '19' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Outils de date (ne pas modifier)
// ─────────────────────────────────────────────────────────────────────────────
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** Lit 'AAAA-MM-JJ' en date locale (minuit). */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/** '2026-11-06' → '6 novembre 2026'. */
export function formatDateFr(iso: string): string {
  const d = parseISODate(iso);
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Date à laquelle le numéro devient libre d'accès. */
export function dateLiberation(issue: JournalIssue): Date {
  const d = parseISODate(issue.dateEnvoi);
  d.setDate(d.getDate() + EXCLUSIVITE_JOURS);
  return d;
}

/** Nombre de jours restants avant l'accès libre (0 = déjà libre). */
export function joursAvantLiberation(issue: JournalIssue, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((dateLiberation(issue).getTime() - today.getTime()) / 86400000);
  return Math.max(0, diff);
}

export function estLibre(issue: JournalIssue, now: Date = new Date()): boolean {
  return joursAvantLiberation(issue, now) === 0;
}
