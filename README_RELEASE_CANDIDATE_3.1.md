# AstroMatch 3.1 — Release Candidate

## Objectif
Socle exploitable commercialement sans licence astronomique payante obligatoire.

## Calcul astronomique
Le provider réel utilise Astronomy Engine, bibliothèque JavaScript MIT. Astronomy Engine fournit les positions géocentriques des 10 corps retenus et fonctionne dans Node.js et le navigateur.

## Maisons
Le provider réel prend désormais en charge :
- Placidus (solveur semi-arc itératif)
- Whole Sign
- Equal
- Porphyry

Le solveur de maisons est séparé du calcul planétaire. En cas de géométrie Placidus non résoluble (notamment certaines latitudes polaires), le moteur retourne explicitement `house_fallback=true` et utilise Porphyry au lieu de masquer le changement.

## Validation locale
- 52 tests exécutés
- 51 PASS
- 1 SKIP : provider Astronomy Engine réel non installé dans l'environnement de build
- 0 FAIL
- Le solveur Placidus est contrôlé par fixtures numériques indépendantes.
- Le script `production:check` effectue la validation end-to-end réelle après installation de `astronomy-engine` : 10 corps, angles, 12 cuspides Placidus, références numériques et DST.

Le skip est intentionnel : l'environnement de construction n'a pas pu télécharger npm. Le kit ne prétend donc pas avoir exécuté le provider réel ici.

## Installation
```bash
npm install
```
Puis :
```bash
ASTROMATCH_EPHEMERIS_PROVIDER=astronomy-engine npm run production:check
```

## Licence
Astronomy Engine est MIT. Conserver son avis de copyright/licence lors de la redistribution. Voir `THIRD_PARTY_LICENSES.md`.

## Limite importante
Le moteur astronomique réel est prêt à être exécuté mais sa validation end-to-end doit être effectuée dans un environnement où `npm install` est disponible. `npm run production:check` est prévu précisément pour cette étape et échoue explicitement si le provider n'est pas réellement exécutable.
