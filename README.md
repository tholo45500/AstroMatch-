# AstroMatch — Prototype (Kit complet)

Moteur de compatibilité astrologique. Prototype local, sans framework,
sans backend, sans base de données externe. JavaScript ES Modules pur.

## Ce que fait ce kit

- Créer un profil principal et plusieurs profils cibles.
- Calculer un thème natal simulé (déterministe) pour chaque profil.
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

## Ce qui est SIMULÉ (à savoir avant de lire les résultats)

- **Les positions planétaires** (`js/astrology/ephemeris/simulated_ephemeris.js`)
  ne sont pas de vraies éphémérides astronomiques. Elles sont générées de
  façon déterministe (un même profil donne toujours le même thème), mais
  n'ont aucune valeur astrologique réelle. Le module est conçu comme un
  adaptateur isolé, remplaçable plus tard par un vrai moteur (ex : Swiss
  Ephemeris) sans toucher au reste de l'application.
- **La résolution des lieux de naissance** (`js/profiles/profile_service.js`)
  utilise un petit annuaire de villes codé en dur (Paris, Lyon, Marseille,
  Montréal, Dakar, Tokyo) ou une saisie manuelle de latitude/longitude.
  Aucun vrai service de géocodage n'est appelé.
- **Le fuseau horaire** n'est pas résolu automatiquement pour une saisie
  manuelle de coordonnées (`timezone_id` reste `null` dans ce cas).
- **La couche IA** (`js/ai_layer/narrative_generator.js`) ne fait AUCUN
  appel à un vrai modèle de langage : elle recompose un texte à partir
  des données déjà calculées, de façon déterministe. C'est le point
  d'entrée prévu pour brancher un vrai LLM plus tard.

Tout le reste (règles de scoring, formules mathématiques, logique de
synastrie, orchestration, gestion des erreurs) est du code réel et
fonctionnel, pas une démonstration.

## Structure du projet

```
AstroMatch/
├── package.json
├── README.md
├── js/
│   ├── utils/            → fonctions pures (math, id, validation)
│   ├── profiles/         → création/validation/gestion des profils
│   ├── astrology/        → thème natal (+ adaptateur ephemeris simulé)
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

Ce kit ne dépend d'aucun package externe : les tests utilisent le test
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
moteur fonctionne correctement : les 39 tests couvrent le calcul du
thème natal, la synastrie, le scoring et l'orchestration.

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

## Ce qui n'est PAS encore dans ce kit

- Pas d'interface graphique (HTML/CSS) — ce kit est le moteur pur,
  utilisable en Node ou importable dans une page web.
- Pas de vraies éphémérides, pas de vrai géocodage, pas de vrai appel IA
  (voir section "Ce qui est simulé" ci-dessus).
- Pas de gestion de fuseaux horaires historiques (changements d'heure
  d'été passés, etc.) — sujet identifié comme risque technique mais non
  traité dans ce prototype.

## Prochaines étapes suggérées

1. Ajouter une interface (formulaires + affichage des résultats).
2. Remplacer `simulated_ephemeris.js` par un vrai calcul d'éphémérides.
3. Brancher un vrai géocodeur dans `profile_service.js`.
4. Brancher un vrai modèle de langage dans `narrative_generator.js`,
   sans changer sa signature d'entrée/sortie.


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

### Important
Le moteur d'éphémérides reste volontairement simulé dans ce kit. Tant qu'un
provider astronomique réel n'est pas branché, les positions planétaires,
l'Ascendant et les maisons ne doivent pas être présentés à l'utilisateur
comme des calculs astrologiques réels.
