# AstroMatch — Prototype (Kit complet)

Application de compatibilité astrologique avec moteur astronomique réel,
API locale Node.js et interface mobile. JavaScript ES Modules.

## Ce que fait ce kit

- Créer un profil principal et plusieurs profils cibles.
- Calculer un thème natal à partir de positions astronomiques réelles pour chaque profil.
- Comparer le principal à chaque cible (synastrie : aspects, overlays de
  maison, contacts d'angle).
- Calculer un score par domaine (Amour, Passion, Communication, Émotions,
  Quotidien, Projets, Frictions) selon les formules AstroMatch V1.0, puis
  un score global.
- Produire une interprétation structurée et traçable (chaque point fort
  ou point de vigilance renvoie à l'aspect astrologique exact qui l'a
  produit).
- Recalculer automatiquement toutes les cibles quand le profil principal
  change, sans jamais recalculer inutilement les thèmes des cibles.

## Éphémérides et limites actuelles

AstroMatch utilise **Astronomy Engine** comme provider d’éphémérides par défaut.

Les positions du Soleil, de la Lune et des planètes sont calculées à partir de vraies positions astronomiques. Le moteur fournit notamment les longitudes écliptiques, signes, degrés, rétrogradations, Ascendant, MC et maisons lorsque l’heure de naissance est connue.

Le provider actif par défaut est :

`astronomy-engine`

Le fichier `js/astrology/ephemeris/simulated_ephemeris.js` existe toujours, mais il est conservé uniquement pour des tests déterministes/offline. Il n’est pas utilisé pour les calculs normaux de profils.

La résolution des lieux reste encore limitée : `profile_service.js` utilise un petit annuaire local de villes ou des coordonnées manuelles. Aucun vrai service de géocodage n’est encore branché.

La couche IA actuelle ne fait pas appel à un vrai LLM externe : les interprétations restent déterministes et auditables.

## Structure du projet

```
AstroMatch/
├── package.json
├── README.md
├── js/
│   ├── utils/            → fonctions pures (math, id, validation)
│   ├── profiles/         → création/validation/gestion des profils
│   ├── astrology/        → thème natal + Astronomy Engine + provider simulé de test
│   ├── synastry/         → comparaison de deux thèmes (aspects, overlays)
│   ├── scoring/          → calcul du score V1.0 (+ config JSON externe)
│   ├── interpretation/   → texte structuré à partir du score
│   ├── ai_layer/         → narration (hook pour une IA future)
│   ├── storage/          → persistance (localStorage / mémoire)
│   └── orchestration/    → coordination principal → N cibles
├── schemas/              → schémas JSON de référence (documentation)
└── tests/                → tests automatisés (node --test)
```

## Lancer les tests (recommandé, y compris depuis un téléphone)

AstroMatch dépend du package astronomy-engine pour les calculs astronomiques : les tests utilisent le test
runner intégré à Node.js (`node:test`), disponible nativement à partir de
Node 20.

### Sur ordinateur

```bash
cd AstroMatch
npm test
```

(équivalent direct, sans npm : `node --test`, exécuté depuis la racine
`AstroMatch/` — Node découvre automatiquement tous les fichiers
`*.test.js` du dossier `tests/`)

### Sur téléphone (Acode + Termux, Android)

1. Installe [Termux](https://termux.dev/) depuis F-Droid (pas le Play
   Store, qui distribue une version obsolète).
2. Dans Termux :
   ```bash
   pkg update
   pkg install nodejs
   ```
3. Copie le dossier `AstroMatch/` dans le stockage partagé, puis dans
   Termux :
   ```bash
   cd /storage/emulated/0/AstroMatch   # ou l'emplacement où tu l'as copié
   node --test
   ```
4. Tu peux éditer les fichiers dans Acode et relancer `node --test` dans
   Termux après chaque modification.

Aucun serveur, aucun navigateur n'est nécessaire pour valider que le
moteur fonctionne correctement : les tests automatisés couvrent le thème natal, les éphémérides,
la synastrie, le scoring et l'orchestration.

## Utiliser le moteur dans du code

```js
import { createProfile } from "./js/profiles/profile_service.js";
import { runFullComparison } from "./js/orchestration/comparison_orchestrator.js";

createProfile({
  role: "primary",
  first_name: "Anthony",
  date: "1990-04-12",
  time: "14:35",
  time_known: true,
  place: "Lyon, France"
});

createProfile({
  role: "target",
  first_name: "Julie",
  date: "1992-08-03",
  time: "09:10",
  time_known: true,
  place: "Paris, France"
});

const results = await runFullComparison();
console.log(results[0].score.global_score);       // score global (0-100)
console.log(results[0].interpretation);            // détail par domaine
console.log(results[0].narrative);                 // texte narratif
```

Pour modifier le profil principal et déclencher un recalcul en cascade :

```js
import { updateProfile } from "./js/profiles/profile_service.js";
import { onPrimaryProfileChanged } from "./js/orchestration/comparison_orchestrator.js";

updateProfile(primaryProfileId, { time: "08:00" });
const updatedResults = await onPrimaryProfileChanged();
```

## Ce qui reste à améliorer

- Géocodage réel des lieux de naissance.
- Résolution automatique du fuseau horaire depuis le lieu.
- Horoscope quotidien basé sur les transits.
- Éventuelle narration enrichie avec un vrai LLM.
- Packaging et déploiement production.

## Prochaines étapes

1. Ajouter le moteur de transits quotidiens.
2. Brancher l’horoscope personnalisé sur l’accueil.
3. Ajouter un vrai géocodeur.
4. Préparer le déploiement production.

### Audit V1.0.2
- Validation structurelle de `weighting_v1.json` avant calcul.
- Respect de `rule.orb_max` lors du déclenchement des règles.
- Correction du calcul du domaine `frictions` : les règles V1.0 utilisent des `base_points` positifs pour mesurer l'intensité des frictions, ensuite pénalisante au score global.
- Un impact d'une règle de friction est désormais tracé comme `negative`.
- Le cache natal vérifie aussi la version du moteur d'éphémérides.
- Le schéma JSON du thème natal a été renforcé et inclut `source_profile_updated_at`.

## Audit massif V1.1.0

Cette version regroupe plusieurs corrections et durcissements afin d'éviter
une succession de petits packages :

- validation stricte du rôle et du système de maisons ;
- rejet explicite d'une mise à jour avec une seule coordonnée ;
- normalisation des dates/heures saisies ;
- cache du thème principal, comme pour les cibles ;
- empreinte déterministe des données de naissance pour fiabiliser l'invalidation du cache ;
- point d'entrée unique `js/astrology/ephemeris/ephemeris_adapter.js` pour remplacer le simulateur par un vrai provider sans réécrire le moteur natal ;
- métadonnées explicites indiquant qu'un thème issu du provider simulé n'a aucune validité astrologique réelle et que les maisons produites sont `equal_simulated` même si le profil demande Placidus ;
- schéma du thème natal aligné avec ces métadonnées ;
- couverture de tests portée à 35 tests automatisés.

### Important — état actuel

L’ancienne note indiquant que le moteur était simulé est obsolète.

AstroMatch utilise désormais `astronomy-engine` par défaut avec :

- `production_ready: true`
- `real_astronomical_positions: true`

Le provider `simulated` reste disponible uniquement pour les tests.
