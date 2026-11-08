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
