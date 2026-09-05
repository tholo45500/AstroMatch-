// js/ai_layer/narrative_generator.js
//
// Couche IA — EN AVAL UNIQUEMENT. Ce module ne calcule jamais de score et
// ne modifie jamais les données structurées produites par le scoring ou
// l'interprétation ; il se contente de les reformuler en texte narratif.
//
// Dans ce prototype, aucune IA réelle n'est appelée : la fonction ci-
// dessous est un compositeur de texte déterministe, construit à partir
// des mêmes données structurées. C'est volontairement l'unique point
// d'entrée que devra utiliser un futur appel à un vrai modèle de langage
// (ex: remplacer le corps de generateNarrative par un appel à une API,
// en lui passant `interpretation` en entrée et en renvoyant une chaîne) —
// sans que le reste de l'application ait à changer.

/**
 * @param {object[]} interpretation - sortie de interpretation_engine.buildInterpretation
 * @param {string} targetName - prénom du profil cible, pour personnaliser le texte
 * @returns {string} un texte narratif complet, construit uniquement à
 *   partir des données déjà calculées (aucune invention de contenu).
 */
export function generateNarrative(interpretation, targetName) {
  const paragraphs = [];

  const frictions = interpretation.find((d) => d.domain === "frictions");
  const otherDomains = interpretation.filter((d) => d.domain !== "frictions");

  const bestDomain = [...otherDomains].sort((a, b) => b.score - a.score)[0];
  const weakestDomain = [...otherDomains].sort((a, b) => a.score - b.score)[0];

  paragraphs.push(
    `Compatibilité avec ${targetName} : le point le plus fort se situe du côté de "${bestDomain.label}" (${bestDomain.score}%), tandis que "${weakestDomain.label}" (${weakestDomain.score}%) demande le plus d'attention.`
  );

  for (const domain of otherDomains) {
    let paragraph = `${domain.label} (${domain.score}%) — ${domain.summary}`;
    if (domain.key_points.length > 0) {
      paragraph += ` Points forts : ${domain.key_points.join(" ")}`;
    }
    if (domain.warnings.length > 0) {
      paragraph += ` Points de vigilance : ${domain.warnings.join(" ")}`;
    }
    paragraphs.push(paragraph);
  }

  if (frictions) {
    let paragraph = `Frictions (${frictions.score}%) — ${frictions.summary}`;
    if (frictions.key_points.length > 0) {
      paragraph += ` Éléments apaisants : ${frictions.key_points.join(" ")}`;
    }
    if (frictions.warnings.length > 0) {
      paragraph += ` Sources de tension : ${frictions.warnings.join(" ")}`;
    }
    paragraphs.push(paragraph);
  }

  return paragraphs.join("\n\n");
}
