# Third-party licenses — AstroMatch 3.1

## Astronomy Engine

AstroMatch utilise le package npm `astronomy-engine` de Don Cross.

- License: **MIT**
- Commercial/proprietary use: permitted under the MIT terms.
- AstroMatch doit conserver l'avis de copyright et la notice de permission MIT lors de la redistribution du composant.

Official project: https://github.com/cosinekitty/astronomy
Package: https://www.npmjs.com/package/astronomy-engine

MIT notice: Copyright (c) 2019-2023 Don Cross. The full MIT permission text is reproduced in the distributed Astronomy Engine package; AstroMatch does not remove or alter that notice.

Aucun composant Swiss Ephemeris n'est requis par cette version du kit.

## astronomy-engine 2.1.19
- Usage: provider astronomique réel
- License: MIT
- Package: astronomy-engine
- No paid astronomical license required.

## Auseklis house solver attribution

The Placidus/Porphyry/Equal/Whole-Sign house solver logic in the AstroMatch provider is adapted from the MIT-licensed `auseklis` project by devil.services (2026), specifically `src/ephemeris/houses.ts` at commit `57e64175a4238362ad870afe6f09310a38bb082d`.

The original project is MIT licensed. The adapted portion remains subject to the MIT license and is included here solely as a mathematical house-system implementation; AstroMatch's scoring, orchestration and product logic are original.
