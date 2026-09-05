# AstroMatch V2.3 — stratégie 0 € de licence astronomique

## Décision
AstroMatch ne dépend plus de Swiss Ephemeris dans sa distribution commerciale.
Le provider astronomique réel est **Astronomy Engine**, distribué sous licence MIT.

- Aucun achat de licence astronomique requis.
- Aucun appel API astronomique payant requis.
- Calcul local, déterministe, navigateur ou Node.js.
- Le provider simulé reste uniquement pour les tests hors dépendance.

## Installation

```bash
npm install
npm test
```

Le package `astronomy-engine` est gratuit à utiliser sous les conditions de sa licence MIT.

## Limite actuelle
Astronomy Engine calcule les positions astronomiques, mais ne fournit pas directement tous les systèmes de maisons astrologiques dont AstroMatch a besoin. V2.3 supporte donc `equal` et `whole_sign` via notre propre couche de maisons.

**Placidus n'est pas déclaré supporté tant qu'il n'a pas été implémenté et validé séparément.**

## Production
La capacité `production_ready` reste `false` tant qu'une suite de référence indépendante n'a pas validé :
- positions des 10 corps,
- rétrogradations,
- Ascendant/MC,
- maisons,
- fuseaux horaires/DST,
- dates limites et cas historiques.

## Licence
Voir `THIRD_PARTY_LICENSES.md` pour les obligations d'attribution MIT.

### Mode de test
Par défaut, le kit utilise le provider simulé pour que `npm test` reste autonome.
Pour utiliser le vrai calcul gratuit :

```bash
npm install
ASTROMATCH_EPHEMERIS_PROVIDER=astronomy-engine node --test
```

Le provider réel devient ainsi explicite et traçable.


## V2.3 — correction importante
Le provider utilise désormais l'API géocentrique `GeoVector` + `Ecliptic` d'Astronomy Engine pour les longitudes natales. Il ne dépend plus de `node:module`, ce qui permet au même module d'être bundlé côté navigateur.
