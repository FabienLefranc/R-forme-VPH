// Nettoyage à l'affichage des notes de travail internes présentes dans les fiches.
//
// Lors de la rédaction des fiches, des notes de vérification ont été ajoutées
// dans les données (ex. « Coloris repris de ta fiche assistant-ergo.fr… »,
// « pas d'image récupérée », « page fabricant non relue »…). Elles sont utiles
// pour toi mais ne doivent pas apparaître aux visiteurs.
//
// Les données ne sont PAS supprimées : elles restent dans data.ts pour que tu
// puisses les relire et trancher les écarts. On les masque seulement à l'écran.

const INTERNAL_NOTE =
  /assistant-ergo\.fr|\bta fiche\b|\bton site\b|pas d'image récupérée|non relue|lecture automatique/i;

/** Vrai si la phrase est une note de travail interne (à masquer au public). */
export const isInternalNote = (text?: string) => !!text && INTERNAL_NOTE.test(text);

/** Retire les phrases de notes internes d'une liste (points forts, limites…). */
export const publicItems = (items: string[] = []) => items.filter(t => !isInternalNote(t));

/**
 * Retire d'une valeur ou d'un libellé les mentions entre parenthèses du type
 * « (site assistant-ergo.fr) » ou « (60 Ah selon le site assistant-ergo.fr) ».
 */
export const cleanInline = (text: string = '') =>
  text
    .replace(/\s*\([^()]*assistant-ergo\.fr[^()]*\)/gi, '')
    .replace(/,?\s*(selon|sur) (le site )?assistant-ergo\.fr/gi, '')
    .trim();
