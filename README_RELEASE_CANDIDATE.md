# AstroMatch — Release Candidate 3.0

## But
Ce kit constitue le **socle exploitable** du moteur AstroMatch avec un provider astronomique réel sans licence astronomique payante.

### Provider réel
`astronomy-engine@2.1.19` (MIT), utilisable dans Node.js et dans le navigateur. Les positions planétaires sont calculées en géocentrique et tropical. 

### Maisons disponibles dans ce RC
- `whole_sign` : oui
- `equal` : oui
- `placidus` : volontairement bloqué tant que sa validation indépendante n'est pas terminée

Le défaut est maintenant `whole_sign`, afin qu'un profil neuf soit calculable immédiatement avec le provider réel.

## Installation
```bash
npm install
```

## Test automatique
```bash
npm test
```

## Vérification du provider réel
```bash
npm run production:check
```

## Démonstration complète
```bash
npm run demo
```

## Utilisation dans l'application
L'entrée publique est :

```js
import { createProfile, compatibility } from "./js/engine.js";
```

Le moteur renvoie les thèmes natals, la synastrie, le score, l'interprétation et la narration déterministe.

## Règle d'architecture
L'IA ne modifie jamais les positions, aspects ou scores. Elle ne sert qu'à narrer un résultat déjà calculé.

## Licence
AstroMatch n'embarque aucun provider astronomique payant. Le provider choisi pour ce RC est `astronomy-engine`, sous MIT. Conserver le fichier `THIRD_PARTY_LICENSES.md` lors de la distribution.

## Limite connue
Le RC est exploitable pour les calculs avec Whole Sign / Equal. Placidus reste un chantier de validation, pas une approximation cachée.
