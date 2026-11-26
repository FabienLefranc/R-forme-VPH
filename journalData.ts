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
  {
    numero: 2,
    dateEnvoi: '2026-11-09',
    titre: 'Sunrise Medical rachète Spinergy',
    chapeau: "Un gros nom du fauteuil actif change de mains, le Permobil M4 Nexa arrive aux États-Unis, et l'échéance du 30 novembre approche toujours sans texte officiel.",
    sommaire: ['À la une : Sunrise Medical rachète Spinergy', 'Nouveauté : Permobil M4 Nexa', 'Sur assistant-ergo.fr : Quickie QS7 X et eFOLDi Navigator', 'Ailleurs dans le monde', 'Agenda', 'Remboursement et LPPR', 'Sécurité'],
    contenu: `
<p>Bonjour,</p>
<p>Semaine plutôt calme côté nouveaux fauteuils. Mais un gros nom du fauteuil actif change de mains. Et l'échéance du 30 novembre approche, sans texte officiel pour la confirmer. Je vous fais le point, simplement.</p>
<h3>À la une · Sunrise Medical rachète Spinergy</h3>
<p>Le 2 novembre, Sunrise Medical (Quickie, Sopur, Zippie, Breezy) a annoncé le rachat de Spinergy. Spinergy, c'est la marque américaine des roues à rayons en fibre et des mains courantes qu'on voit souvent sur les fauteuils actifs et de sport.</p>
<p>Spinergy garde son nom, son équipe et continue de travailler avec les autres fabricants de fauteuils. Le montant n'est pas communiqué. Rien n'est dit pour l'Europe ou la France.</p>
<p><strong>Ce que ça change sur le terrain :</strong> pour l'instant, rien de concret. Les roues Spinergy restent disponibles comme avant, selon l'annonce. À surveiller dans les prochains mois : tarifs, délais et options proposées sur les fauteuils des autres marques.</p>
<p>Sources : <a href="https://www.sunrisemedical.com/company-information/press-releases/2026/november/sunrise-medical-acquires-spinergy" target="_blank" rel="noopener">communiqué Sunrise Medical</a> · <a href="https://mobilitymgmt.com/sunrise-medical-acquires-spinergy/" target="_blank" rel="noopener">Mobility Management</a></p>
<h3>Nouveauté · Permobil M4 Nexa</h3>
<p>Annoncé fin septembre aux États-Unis, ce fauteuil électrique compact est en cours de déploiement depuis le 1er novembre. Il est pensé pour les personnes de petite taille : assise très basse (38 cm du sol), bascule vers l'avant pour faciliter les transferts, profondeur d'assise de 25 à 56 cm, petit rayon de braquage. Les petites roues avant permettent de glisser les repose-pieds dessous pour s'approcher d'une table ou d'un plan de travail.</p>
<p><strong>Pour qui ?</strong> Adolescents et adultes de petite taille, qui devaient souvent choisir entre un fauteuil bien ajusté et un fauteuil fonctionnel.</p>
<p><strong>Encore inconnu :</strong> la date d'arrivée en France, le prix et l'inscription à la LPPR. <a href="https://www.homecaremag.com/permobil-launches-new-compact-power-wheelchair/" target="_blank" rel="noopener">Source : HomeCare</a></p>
<h3>Sur assistant-ergo.fr</h3>
<p><a href="https://assistant-ergo.fr/?cat=manuel&sous=FRMC&marque=sunrise&modele=sunrise-medical-quickie-qs7-x">Quickie QS7 X</a> (Sunrise Medical) : un fauteuil manuel de la marque qui vient de racheter Spinergy.<br><a href="https://assistant-ergo.fr/?cat=electrique&sous=FRE_CLASSE_A&marque=efoldi&modele=efoldi-navigator">eFOLDi Navigator</a> : le fauteuil électrique pliant de la marque anglaise eFOLDi, qui agrandit son équipe cette semaine.</p>
<h3>Ailleurs dans le monde</h3>
<p><strong>États-Unis.</strong> Josh Turek, utilisateur de fauteuil roulant né avec un spina bifida et ancien professionnel des aides techniques chez un revendeur, a été élu au Sénat américain le 3 novembre. Quand les gens qui connaissent le terrain arrivent là où se prennent les décisions, les sujets comme le remboursement des fauteuils avancent mieux. <a href="https://mobilitymgmt.com/take-5-coffee-break-former-atp-flips-iowa-senate-seat-dollywood-earns-high-accessibility-marks/" target="_blank" rel="noopener">Source</a></p>
<p><strong>Japon.</strong> WHILL, qui fait rouler des fauteuils électriques autonomes dans les aéroports (Tokyo-Haneda, Singapour), entre dans un programme de Tokyo pour développer ce service dans le monde. De quoi imaginer des fauteuils en libre-service pour les longs trajets dans nos gares et aéroports. <a href="https://whill.inc/us/news/" target="_blank" rel="noopener">Source</a></p>
<p><strong>Royaume-Uni.</strong> Le fabricant de tricycles Jorvik signe une année record (+35 %) et promet plus de modèles accessibles. Le tricycle comme vraie solution de mobilité et de loisir, pas seulement de rééducation. <a href="https://thiis.co.uk/jorvik-tricycles-promises-more-accessible-options-as-it-celebrates-record-financial-year/" target="_blank" rel="noopener">Source</a></p>
<h3>Agenda</h3>
<p><strong>2 et 3 décembre</strong> · Autonomic Lille Europe, Lille Grand Palais (gares Lille Flandres et Lille Europe à 5 min à pied, métro ligne 2). Salon handicap et grand âge des Hauts-de-France, entrée gratuite avec badge à réserver en ligne. L'occasion d'essayer et de comparer des fauteuils côte à côte et de poser ses questions directement aux fabricants. <a href="https://www.autonomic-expo.com/salon/autonomic-lille-europe" target="_blank" rel="noopener">Infos et badge</a></p>
<h3>Remboursement et LPPR</h3>
<p>La fin de la période où ancienne et nouvelle nomenclature cohabitent est annoncée au 30 novembre 2026 par plusieurs acteurs, sans texte officiel trouvé pour le confirmer. Par prudence, un dossier encore monté sur l'ancienne nomenclature est à faire aboutir avant fin novembre, en vérifiant auprès de la CPAM. Pas de nouvelle inscription de fauteuil à la LPPR cette semaine. Sources : <a href="https://www.orisha.com/fr/blog/psad-psdm-reforme-vph" target="_blank" rel="noopener">Orisha</a> · <a href="https://mobile.cerahtec.fr/fr/news?c=VPH%2CLPPr" target="_blank" rel="noopener">CERAHTEC</a></p>
<h3>Sécurité</h3>
<p>Aucun rappel ni avis de sécurité sur un fauteuil, un scooter ou une motorisation repéré cette semaine sur le site de l'ANSM.</p>
`,
  },
  {
    numero: 1,
    dateEnvoi: '2026-11-02',
    titre: 'Ottobock cède ses fauteuils roulants à DHCare',
    chapeau: "Premier numéro : un gros mouvement dans le secteur, la nouvelle assistance électrique Empulse R90, les Quickie QS3 X et QS7 X, et quelques idées venues des États-Unis.",
    sommaire: ['À la une : Ottobock cède ses fauteuils roulants à DHCare', 'Nouveauté : assistance électrique Empulse R90', 'Sur assistant-ergo.fr : Quickie QS3 X et QS7 X', 'Ailleurs dans le monde', 'Remboursement et LPPR', 'Sécurité'],
    contenu: `
<p>Bonjour,</p>
<p>Chaque semaine, je trie ce qui bouge chez les fabricants, en France et ailleurs. Pas tout. Juste ce qui peut changer quelque chose pour les personnes qu'on accompagne. Cette semaine : un gros mouvement dans le secteur, une nouvelle assistance électrique, et quelques idées venues des États-Unis.</p>
<h3>À la une · Ottobock cède ses fauteuils roulants à DHCare</h3>
<p>L'accord a été signé le 19 juin 2026. DHCare, c'est le nouveau groupe né de la fusion d'Invacare Europe et de Direct Healthcare Group, détenu par le fonds Rhône. Il récupère toute l'activité « Human Mobility » d'Ottobock : fauteuils manuels, électriques, et le spécialiste pédiatrique veldink4Kids.</p>
<p>La finalisation est attendue au second semestre 2026. En France, la filiale fait l'objet de négociations exclusives à part.</p>
<p><strong>Ce que ça change sur le terrain :</strong> rien dans l'immédiat. Ottobock reste l'interlocuteur jusqu'à la finalisation. À surveiller ensuite : gammes conservées ou fusionnées avec Invacare et Küschall, SAV, contacts commerciaux.</p>
<p>Sources : <a href="https://live.deutsche-boerse.com/news/EQS-News-Ottobock-sells-its-Human-Mobility-wheelchair-business-e9c011b9-ed97-4a0b-823b-d28eb1d2d314" target="_blank" rel="noopener">communiqué Ottobock</a> · <a href="https://www.invacare.com/news/dhcare-signs-definitive-agreement-to-acquire-ottobocks-human-mobility-division/" target="_blank" rel="noopener">communiqué DHCare</a></p>
<h3>Nouveauté · Sunrise Medical lance l'assistance électrique Empulse R90</h3>
<p>Annoncée le 30 octobre. Un module ultraléger placé sous l'assise, qui se relève et se démonte à tout moment (fixation V-Lock). Commande sans fil à placer où on veut sur le châssis. Batterie amovible. Réglages via l'appli Sunrise Intelligence.</p>
<p><strong>Pour qui ?</strong> Les personnes en manuel qui fatiguent sur les distances ou les pentes, et veulent garder leur fauteuil.</p>
<p><strong>Encore inconnu :</strong> poids, autonomie, vitesse, prise en charge LPPR. À comparer avec SmartDrive ou e-pilot. <a href="https://www.sunrisemedical.fr/company-information/news/france/2026/assistance-electrique-r90" target="_blank" rel="noopener">Source : Sunrise Medical France</a></p>
<h3>Sur assistant-ergo.fr · Quickie QS3 X et QS7 X, les deux nouveaux pliants actifs</h3>
<p>Sortis en octobre. Le QS7 X joue la carte du pliage le plus compact et du poids. Le QS3 X, celle d'un pliant actif solide et polyvalent. Les fiches complètes sont sur le site : dimensions, options, coloris.</p>
<p><a href="https://assistant-ergo.fr/?cat=manuel&sous=FRMC&marque=sunrise&modele=sunrise-medical-quickie-qs3-x">Quickie QS3 X</a> : pliant actif, jusqu'à 130 kg.<br><a href="https://assistant-ergo.fr/?cat=manuel&sous=FRMC&marque=sunrise&modele=sunrise-medical-quickie-qs7-x">Quickie QS7 X</a> : pliant ultra-compact, alu série 7000.</p>
<p>Sources : <a href="https://www.sunrisemedical.fr/company-information/news/france/2026/fauteuil-roulant-manuel-actif-pliant-qs3x" target="_blank" rel="noopener">annonce QS3 X</a> · <a href="https://www.sunrisemedical.fr/company-information/news/france/2026/fauteuil-roulant-manuel-actif-pliant-qs7x" target="_blank" rel="noopener">annonce QS7 X</a> (Sunrise Medical France)</p>
<h3>Ailleurs dans le monde</h3>
<p><strong>États-Unis.</strong> Permobil M4 Nexa : un électrique à traction centrale compact pour ados et adultes de petit gabarit, avec bascule, inclinaison, lift et repose-jambes électriques. Les fonctions des « grands » fauteuils, dans un petit format. <a href="https://newmobility.com/m4-nexa/" target="_blank" rel="noopener">Source</a></p>
<p><strong>États-Unis.</strong> SOUL Mobility Power-Flex : un module qui remplace les roues d'un manuel léger et le transforme en électrique en 30 secondes environ, sans outil. Joystick, suspension, bascule 30°. L'idée du fauteuil « hybride » qui suit les journées avec et sans fatigue. <a href="https://mobilitymgmt.com/working-a-new-angle/" target="_blank" rel="noopener">Source</a></p>
<p><strong>États-Unis.</strong> Raz Design, bariatrique : des sangles de dossier qui laissent de la place au fessier pour une assise plus profonde, et un verrou pour ne plus perdre les repose-pieds en établissement. Un détail simple, une vraie question de terrain. <a href="https://mobilitymgmt.com/briefly-raz-design-highlights-gluteal-shelf-foot-support-lock-kids-with-sma-should-be-monitored-for-respiratory-issues/" target="_blank" rel="noopener">Source</a></p>
<h3>Remboursement et LPPR</h3>
<p>Rien de neuf au Journal officiel cette semaine. Point de vigilance : la fin de la cohabitation entre ancienne et nouvelle nomenclature VPH, annoncée pour fin novembre 2026.</p>
<h3>Sécurité</h3>
<p>Aucun avis de sécurité <a href="https://ansm.sante.fr/informations-de-securite/" target="_blank" rel="noopener">ANSM</a> concernant un VPH publié cette semaine.</p>
`,
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
