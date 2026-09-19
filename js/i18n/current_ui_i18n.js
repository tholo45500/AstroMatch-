import {
  initI18n,
  setLocale,
  getLocale
} from "./i18n.js";


/*
 * =========================================================
 * ASTROMATCH I18N — UI V3 RÉELLE
 *
 * Cible :
 *   #astromatchMainNav
 *   #astromatchTodayView
 *
 * NE TOUCHE PAS :
 *   #astromatchHomeDashboard
 *   anciens blocs astro-home-*
 *
 * Ce module ne scanne pas toute l'application.
 * =========================================================
 */


const PAIRS = [

  /* -------------------------------------------------------
   * TODAY — STRUCTURE ACTUELLE
   * ------------------------------------------------------- */

  [
    "☀️ AUJOURD’HUI",
    "☀️ TODAY"
  ],

  [
    "Ton ciel du jour",
    "Your sky today"
  ],

  [
    "TON ÉNERGIE DU JOUR",
    "TODAY'S ENERGY"
  ],

  [
    "✨ Ce que ça change pour toi",
    "✨ What it changes for you"
  ],

  [
    "🔎 Ce qui influence ta journée",
    "🔎 What influences your day"
  ],

  [
    "Calcul du ciel du jour…",
    "Calculating today's sky…"
  ],

  [
    "Calcul du ciel du jour...",
    "Calculating today's sky…"
  ],

  [
    "Calcul en cours…",
    "Calculating…"
  ],

  [
    "Calcul en cours...",
    "Calculating…"
  ],

  [
    "Voir les détails astrologiques",
    "View astrological details"
  ],

  [
    "Aucun transit dominant n’est isolé aujourd’hui.",
    "No dominant transit stands out today."
  ],

  [
    "Aucun transit dominant n'est isolé aujourd'hui.",
    "No dominant transit stands out today."
  ],

  [
    "Impossible de calculer ton ciel du jour.",
    "Unable to calculate your sky today."
  ],

  [
    "Ton ciel du jour est prêt.",
    "Your sky today is ready."
  ],


  /* -------------------------------------------------------
   * DOMAINES
   * ------------------------------------------------------- */

  [
    "Cœur",
    "Heart"
  ],

  [
    "Échanges",
    "Communication"
  ],

  [
    "Énergie",
    "Energy"
  ],

  [
    "Vie affective",
    "Emotional life"
  ],

  [
    "Climat du jour",
    "Daily climate"
  ],

  [
    "Très favorable",
    "Very favorable"
  ],

  [
    "Équilibré",
    "Balanced"
  ],

  [
    "À nuancer",
    "Mixed"
  ],

  [
    "Plus sensible",
    "More sensitive"
  ],


  /* -------------------------------------------------------
   * PHRASE DU JOUR — VRAIES SORTIES DU MOTEUR DAILY
   * ------------------------------------------------------- */

  [
    "Aujourd'hui, le cœur gagne à suivre ce qui semble simple et sincère.",
    "Today, let your heart follow what feels simple and sincere."
  ],

  [
    "Aujourd'hui, laisse les émotions se poser avant de leur donner une direction.",
    "Today, let your emotions settle before giving them a direction."
  ],

  [
    "Aujourd'hui, protège l'essentiel sans transformer chaque tension en verdict.",
    "Today, protect what matters without turning every tension into a verdict."
  ],

  [
    "Aujourd'hui, les bons mots peuvent ouvrir plus de portes que la force.",
    "Today, the right words can open more doors than force."
  ],

  [
    "Aujourd'hui, choisis bien ton moment : le fond compte autant que la manière.",
    "Today, choose your moment carefully: what you say matters as much as how you say it."
  ],

  [
    "Aujourd'hui, clarifie avant de conclure et écoute avant de répondre.",
    "Today, clarify before concluding and listen before replying."
  ],

  [
    "Aujourd'hui, ton élan est un moteur : dirige-le vers ce qui mérite vraiment ton énergie.",
    "Today, your momentum is a driving force: direct it toward what truly deserves your energy."
  ],

  [
    "Aujourd'hui, avance à ton rythme et garde ton énergie pour ce qui compte.",
    "Today, move at your own pace and save your energy for what matters."
  ],

  [
    "Aujourd'hui, canalise l'impulsion plutôt que de lutter contre elle.",
    "Today, channel the impulse rather than fighting it."
  ],


  /* -------------------------------------------------------
   * CŒUR — TEXTES DAILY
   * ------------------------------------------------------- */

  [
    "Le climat affectif est très porteur : les émotions circulent avec plus de naturel.",
    "The emotional climate is especially supportive: feelings flow more naturally."
  ],

  [
    "Le cœur bénéficie d'un courant favorable, propice aux rapprochements et aux élans sincères.",
    "The heart benefits from a favorable current, encouraging closeness and sincere gestures."
  ],

  [
    "Le climat affectif reste nuancé : avance avec naturel sans chercher à provoquer les choses.",
    "The emotional climate remains nuanced: move naturally without trying to force things."
  ],

  [
    "Le terrain affectif demande un peu plus de souplesse et de recul aujourd'hui.",
    "The emotional landscape calls for a little more flexibility and perspective today."
  ],

  [
    "Le cœur est plus sensible aujourd'hui : évite les réactions à chaud et laisse de l'espace.",
    "The heart is more sensitive today: avoid reacting in the heat of the moment and give things some space."
  ],


  /* -------------------------------------------------------
   * COMMUNICATION — TEXTES DAILY
   * ------------------------------------------------------- */

  [
    "Les échanges sont particulièrement fluides : c'est un bon moment pour dire les choses clairement.",
    "Communication is especially fluid: it's a good time to say things clearly."
  ],

  [
    "La communication est bien soutenue, avec davantage de facilité pour faire passer tes idées.",
    "Communication is well supported, making it easier to get your ideas across."
  ],

  [
    "Les échanges sont globalement neutres : la qualité dépendra surtout du ton et du timing.",
    "Communication is fairly neutral: quality will depend mostly on tone and timing."
  ],

  [
    "Les mots peuvent partir plus vite que prévu : vérifie ce que tu veux vraiment faire passer.",
    "Words may come out faster than expected: check what you really want to convey."
  ],

  [
    "La communication demande de la prudence : mieux vaut clarifier que supposer.",
    "Communication calls for caution: it's better to clarify than assume."
  ],


  /* -------------------------------------------------------
   * ÉNERGIE — TEXTES DAILY
   * ------------------------------------------------------- */

  [
    "L'énergie est très présente : utilise-la pour avancer concrètement sur ce qui compte.",
    "Your energy is strong: use it to make concrete progress on what matters."
  ],

  [
    "Tu disposes d'un bon élan pour agir, décider et faire bouger les choses.",
    "You have good momentum to act, decide, and move things forward."
  ],

  [
    "Le rythme est stable : inutile de forcer, avance régulièrement.",
    "Your pace is steady: no need to force it, keep moving consistently."
  ],

  [
    "L'énergie peut être irrégulière : dose l'effort plutôt que de tout pousser d'un coup.",
    "Energy may be uneven: pace your effort instead of pushing everything at once."
  ],

  [
    "Le niveau d'énergie invite à ralentir et à privilégier l'essentiel.",
    "Your energy level suggests slowing down and focusing on the essentials."
  ],


  /* -------------------------------------------------------
   * INFLUENCES HUMANISÉES DE L'UI ACTUELLE
   * ------------------------------------------------------- */

  [
    "Tes émotions ou tes attentes peuvent prendre plus de place aujourd’hui. Évite de tirer des conclusions trop vite et privilégie les gestes simples, sincères et sans pression.",
    "Your emotions or expectations may take up more space today. Avoid jumping to conclusions and favor simple, sincere gestures without pressure."
  ],

  [
    "Le climat affectif favorise davantage de naturel et de proximité. C’est un bon moment pour exprimer ce que tu ressens sans chercher à tout contrôler.",
    "The emotional climate favors greater ease and closeness. It's a good time to express how you feel without trying to control everything."
  ],

  [
    "Les échanges peuvent être plus nerveux, imprévisibles ou faciles à mal interpréter. Prends quelques secondes avant de répondre et vérifie ce que l’autre voulait vraiment dire.",
    "Conversations may feel more tense, unpredictable or easy to misread. Take a few seconds before replying and check what the other person really meant."
  ],

  [
    "Les mots circulent plus facilement aujourd’hui. Profite-en pour clarifier une situation, dire les choses simplement ou relancer une conversation importante.",
    "Words flow more easily today. Use that momentum to clarify a situation, speak plainly or restart an important conversation."
  ],

  [
    "Ton énergie peut être plus irrégulière ou dispersée. Évite de tout faire en même temps et concentre-toi sur ce qui mérite vraiment ton attention.",
    "Your energy may be more uneven or scattered. Avoid doing everything at once and focus on what truly deserves your attention."
  ],

  [
    "Tu disposes d’un élan plus naturel pour agir et avancer. Oriente cette énergie vers une décision ou une tâche concrète plutôt que de la laisser se disperser.",
    "You have a more natural drive to act and move forward. Direct that energy toward a concrete decision or task instead of letting it scatter."
  ],

  [
    "Cette influence demande davantage de recul aujourd’hui.",
    "This influence calls for more perspective today."
  ],

  [
    "Cette influence apporte un courant plutôt favorable aujourd’hui.",
    "This influence brings a generally supportive current today."
  ],


  /* -------------------------------------------------------
   * BADGES / DÉTAILS ASTRO
   * ------------------------------------------------------- */

  [
    "soutien",
    "support"
  ],

  [
    "Cible natale",
    "Natal target"
  ],

  [
    "Zone activée",
    "Activated area"
  ],

  [
    "Intensité",
    "Intensity"
  ],

  [
    "Conjonction",
    "Conjunction"
  ],

  [
    "conjonction",
    "conjunction"
  ],

  [
    "Carré",
    "Square"
  ],

  [
    "carré",
    "square"
  ],

  [
    "Trigone",
    "Trine"
  ],

  [
    "trigone",
    "trine"
  ],

  [
    "Soleil",
    "Sun"
  ],

  [
    "Lune",
    "Moon"
  ],

  [
    "Mercure",
    "Mercury"
  ],

  [
    "Vénus",
    "Venus"
  ],

  [
    "Saturne",
    "Saturn"
  ],

  [
    "Uranus",
    "Uranus"
  ],

  [
    "Pluton",
    "Pluto"
  ],


  /* -------------------------------------------------------
   * ERREURS DAILY VISIBLES
   * ------------------------------------------------------- */

  [
    "Profil principal introuvable",
    "Main profile not found"
  ],

  [
    "Moteur Daily indisponible",
    "Daily engine unavailable"
  ],

  [
    "Résultat Daily invalide",
    "Invalid Daily result"
  ]

];


const DATE_PAIRS = [

  ["lundi", "Monday"],
  ["mardi", "Tuesday"],
  ["mercredi", "Wednesday"],
  ["jeudi", "Thursday"],
  ["vendredi", "Friday"],
  ["samedi", "Saturday"],
  ["dimanche", "Sunday"],

  ["janvier", "January"],
  ["février", "February"],
  ["mars", "March"],
  ["avril", "April"],
  ["mai", "May"],
  ["juin", "June"],
  ["juillet", "July"],
  ["août", "August"],
  ["septembre", "September"],
  ["octobre", "October"],
  ["novembre", "November"],
  ["décembre", "December"]

];


const NAV = {

  today: {
    fr: "Aujourd’hui",
    en: "Today"
  },

  relations: {
    fr: "Relations",
    en: "Relations"
  },

  me: {
    fr: "Moi",
    en: "Me"
  }

};


const NAV_VALUES =
  new Set(
    Object
      .values(NAV)
      .flatMap(
        item => [
          item.fr,
          item.en
        ]
      )
  );


function locale() {

  return (
    getLocale() === "en"
      ? "en"
      : "fr"
  );

}


function replaceAllLiteral(
  source,
  from,
  to
) {

  if (
    !source ||
    !from ||
    from === to
  ) {
    return source;
  }

  return source
    .split(from)
    .join(to);

}


const FR_EN =
  [...PAIRS]
    .sort(
      (a, b) =>
        b[0].length -
        a[0].length
    );


const EN_FR =
  [...PAIRS]
    .map(
      ([fr, en]) =>
        [en, fr]
    )
    .sort(
      (a, b) =>
        b[0].length -
        a[0].length
    );


function translateDateWords(
  value,
  targetLocale
) {

  let output =
    String(value ?? "");


  const pairs =
    targetLocale === "en"
      ? DATE_PAIRS
      : DATE_PAIRS.map(
          ([fr, en]) =>
            [en, fr]
        );


  for (
    const [from, to]
    of pairs
  ) {

    const lowerFrom =
      from.toLocaleLowerCase();

    const lowerTo =
      to.toLocaleLowerCase();


    output =
      replaceAllLiteral(
        output,
        lowerFrom,
        lowerTo
      );


    const capFrom =
      from.charAt(0)
        .toUpperCase() +
      from.slice(1);

    const capTo =
      to.charAt(0)
        .toUpperCase() +
      to.slice(1);


    output =
      replaceAllLiteral(
        output,
        capFrom,
        capTo
      );

  }


  return output;

}


function translateValue(value) {

  let output =
    String(value ?? "");


  const targetLocale =
    locale();


  const pairs =
    targetLocale === "en"
      ? FR_EN
      : EN_FR;


  for (
    const [from, to]
    of pairs
  ) {

    output =
      replaceAllLiteral(
        output,
        from,
        to
      );

  }


  output =
    translateDateWords(
      output,
      targetLocale
    );


  /*
   * Maison 4 ↔ House 4
   */

  if (
    targetLocale === "en"
  ) {

    output =
      output.replace(
        /\bMaison\s+(\d+)\b/g,
        "House $1"
      );

  } else {

    output =
      output.replace(
        /\bHouse\s+(\d+)\b/g,
        "Maison $1"
      );

  }


  return output;

}


function translateTree(root) {

  if (!root) {
    return;
  }


  const walker =
    document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );


  const nodes = [];


  while (
    walker.nextNode()
  ) {

    nodes.push(
      walker.currentNode
    );

  }


  for (
    const node
    of nodes
  ) {

    const parent =
      node.parentElement;


    if (!parent) {
      continue;
    }


    if (
      parent.closest(
        `
        script,
        style,
        textarea,
        code,
        pre,
        #astromatchLanguageSwitch
        `
      )
    ) {
      continue;
    }


    const current =
      node.nodeValue;


    const translated =
      translateValue(
        current
      );


    if (
      translated !==
      current
    ) {

      node.nodeValue =
        translated;

    }

  }


  root
    .querySelectorAll(
      `
      [title],
      [aria-label],
      [placeholder]
      `
    )
    .forEach(
      element => {

        for (
          const attr
          of [
            "title",
            "aria-label",
            "placeholder"
          ]
        ) {

          if (
            !element
              .hasAttribute(
                attr
              )
          ) {
            continue;
          }


          const current =
            element
              .getAttribute(
                attr
              );


          const translated =
            translateValue(
              current
            );


          if (
            translated !==
            current
          ) {

            element
              .setAttribute(
                attr,
                translated
              );

          }

        }

      }
    );

}


function replaceNavLabel(
  button,
  label
) {

  const walker =
    document.createTreeWalker(
      button,
      NodeFilter.SHOW_TEXT
    );


  const nodes = [];


  while (
    walker.nextNode()
  ) {

    if (
      walker
        .currentNode
        .nodeValue
        .trim()
    ) {

      nodes.push(
        walker.currentNode
      );

    }

  }


  let target =
    nodes.find(
      node =>
        NAV_VALUES.has(
          node.nodeValue.trim()
        )
    );


  if (!target) {

    target =
      nodes.at(-1);

  }


  if (!target) {
    return;
  }


  const leading =
    target.nodeValue
      .match(/^\s*/)?.[0] ||
    "";


  const trailing =
    target.nodeValue
      .match(/\s*$/)?.[0] ||
    "";


  target.nodeValue =
    leading +
    label +
    trailing;

}


function translateNavigation() {

  const currentLocale =
    locale();


  document
    .querySelectorAll(
      `
      #astromatchMainNav
      [data-main-tab]
      `
    )
    .forEach(
      button => {

        const key =
          button.dataset.mainTab;


        if (!NAV[key]) {
          return;
        }


        replaceNavLabel(
          button,
          NAV[key][currentLocale]
        );

      }
    );

}


function updateSwitch() {

  const currentLocale =
    locale();


  document
    .querySelectorAll(
      `
      #astromatchLanguageSwitch
      [data-lang]
      `
    )
    .forEach(
      button => {

        button
          .classList
          .toggle(
            "active",
            button.dataset.lang ===
              currentLocale
          );

      }
    );

}


function createSwitch() {

  document
    .getElementById(
      "astromatchLanguageTestSwitch"
    )
    ?.remove();


  if (
    document.getElementById(
      "astromatchLanguageSwitch"
    )
  ) {
    return;
  }


  const box =
    document.createElement(
      "div"
    );


  box.id =
    "astromatchLanguageSwitch";


  box.innerHTML = `
    <button
      type="button"
      data-lang="fr"
    >
      🇫🇷 FR
    </button>

    <button
      type="button"
      data-lang="en"
    >
      🇬🇧 EN
    </button>
  `;


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "ASTROMATCH_I18N_SWITCH_STYLE";


  style.textContent = `

    #astromatchLanguageSwitch {

      position: fixed;

      top: 12px;
      right: 12px;

      z-index: 12000;

      display: flex;
      gap: 5px;

      padding: 6px;

      border:
        1px solid
        rgba(255,255,255,.14);

      border-radius: 14px;

      background:
        rgba(15,16,30,.92);

      backdrop-filter:
        blur(12px);

      -webkit-backdrop-filter:
        blur(12px);

    }


    #astromatchLanguageSwitch
    button {

      border:
        1px solid
        rgba(255,255,255,.10);

      border-radius: 9px;

      padding:
        7px 9px;

      background:
        rgba(255,255,255,.06);

      color: #fff;

      font-size: 11px;
      font-weight: 900;

    }


    #astromatchLanguageSwitch
    button.active {

      border-color:
        rgba(167,139,250,.72);

      background:
        linear-gradient(
          135deg,
          #6d4aff,
          #7565ef
        );

    }

  `;


  document.head
    .appendChild(
      style
    );


  document.body
    .appendChild(
      box
    );


  box
    .querySelectorAll(
      "[data-lang]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            setLocale(
              button.dataset.lang,
              {
                translate: false
              }
            );


            applyAll();

          }
        );

      }
    );

}



/*
 * =========================================================
 * ASTROMATCH_RELATIONS_I18N_V1
 *
 * Relations V3 réelle :
 * - catégories
 * - recherche
 * - favoris
 * - listes profils
 * - formulaire cible
 *
 * IMPORTANT :
 * traduction exacte pour ne jamais modifier
 * les noms/prénoms saisis par l'utilisateur.
 * =========================================================
 */

const RELATION_EXACT_PAIRS = [

  ["Mes relations", "My relationships"],

  [
    "Choisis une personne pour découvrir votre dynamique.",
    "Choose a person to explore your dynamic."
  ],

  [
    "Sélection des profils",
    "Profile selection"
  ],

  [
    "Appuie sur un profil pour ouvrir la comparaison.",
    "Tap a profile to open the comparison."
  ],


  /* Navigation Relations */

  ["Amour", "Love"],
  ["Amitié", "Friendship"],
  ["Famille", "Family"],
  ["Professionnel", "Professional"],

  ["Favoris", "Favorites"],
  ["Rechercher", "Search"],

  [
    "Rechercher une personne…",
    "Search for a person…"
  ],

  [
    "Rechercher une personne...",
    "Search for a person…"
  ],

  [
    "Fermer la recherche",
    "Close search"
  ],


  /* Groupes */

  [
    "Ajouter un profil",
    "Add profile"
  ],

  [
    "Aucun profil pour le moment.",
    "No profiles yet."
  ],

  [
    "Réduire la liste",
    "Show less"
  ],

  [
    "Aucun profil cible disponible.",
    "No target profiles available."
  ],


  /* Favoris / récents */

  [
    "⭐ Tes favoris",
    "⭐ Your favorites"
  ],

  [
    "Accès rapide à tes profils préférés",
    "Quick access to your favorite profiles"
  ],

  [
    "Voir tout ›",
    "View all ›"
  ],

  [
    "⭐ Ajoute des profils en favoris pour les retrouver ici.",
    "⭐ Add profiles to your favorites to find them here."
  ],

  [
    "🕘 Ajouts récents",
    "🕘 Recent additions"
  ],

  [
    "Tes derniers profils enregistrés",
    "Your recently saved profiles"
  ],


  /* Cartes profils */

  [
    "Voir le thème astral",
    "View birth chart"
  ],

  [
    "Profil cible",
    "Target profile"
  ],

  [
    "Lieu inconnu",
    "Unknown place"
  ],

  [
    "Signe inconnu",
    "Unknown sign"
  ],

  [
    "Ajouter aux favoris",
    "Add to favorites"
  ],

  [
    "Retirer des favoris",
    "Remove from favorites"
  ],


  /* Formulaire cible */

  [
    "Changer la photo",
    "Change photo"
  ],

  [
    "Appuie sur la photo pour la changer",
    "Tap the photo to change it"
  ],

  [
    "Supprimer la photo",
    "Remove photo"
  ],

  ["Prénom", "First name"],
  ["Nom", "Last name"],
  ["Sexe", "Gender"],

  [
    "Non renseigné",
    "Not specified"
  ],

  ["Femme", "Woman"],
  ["Homme", "Man"],

  ["Relation", "Relationship"],

  [
    "❤️ Relation",
    "❤️ Love"
  ],

  [
    "🤝 Amitié",
    "🤝 Friendship"
  ],

  [
    "👨‍👩‍👧‍👦 Famille",
    "👨‍👩‍👧‍👦 Family"
  ],

  [
    "💼 Professionnel",
    "💼 Professional"
  ],

  [
    "Date de naissance",
    "Birth date"
  ],

  ["Heure", "Time"],

  [
    "Lieu de naissance",
    "Birthplace"
  ],

  ["Enregistrer", "Save"],
  ["Ajouter", "Add"],
  ["Modifier", "Edit"],


  /* États calcul */

  ["Calcul…", "Calculating…"],
  ["Calcul...", "Calculating…"],

  [
    "Calcul réel en cours…",
    "Real calculation in progress…"
  ],

  [
    "Compatibilité recalculée pour cette cible.",
    "Compatibility recalculated for this profile."
  ],

  ["Erreur", "Error"],
  ["Prêt", "Ready"],

  [
    "Le calcul n’a pas pu être terminé.",
    "The calculation could not be completed."
  ],

  [
    "Le calcul n'a pas pu être terminé.",
    "The calculation could not be completed."
  ],

  [
    "La sélection recalcule automatiquement la compatibilité.",
    "Selecting a profile automatically recalculates compatibility."
  ]

];


const RELATION_FR_EN =
  new Map(
    RELATION_EXACT_PAIRS
  );


const RELATION_EN_FR =
  new Map(
    RELATION_EXACT_PAIRS
      .map(
        ([fr, en]) =>
          [en, fr]
      )
  );


function translateRelationValue(
  value
) {

  const raw =
    String(value ?? "");

  const clean =
    raw.trim();

  if (!clean) {
    return raw;
  }


  const currentLocale =
    locale();


  const map =
    currentLocale === "en"
      ? RELATION_FR_EN
      : RELATION_EN_FR;


  let translated =
    map.get(clean);


  /*
   * Valeurs dynamiques.
   *
   * Exemple :
   * 32 ans · ♏ Scorpion
   *
   * On ne touche jamais au nom du profil.
   */

  if (!translated) {

    translated =
      clean;


    if (
      currentLocale === "en"
    ) {

      translated =
        translated.replace(
          /\b(\d+)\s+ans\b/g,
          "$1 years old"
        );


      translated =
        translated.replace(
          /^Afficher les (\d+) autres$/,
          "Show $1 more"
        );

    } else {

      translated =
        translated.replace(
          /\b(\d+)\s+years old\b/g,
          "$1 ans"
        );


      translated =
        translated.replace(
          /^Show (\d+) more$/,
          "Afficher les $1 autres"
        );

    }


    if (
      translated === clean
    ) {
      return raw;
    }

  }


  const leading =
    raw.match(/^\s*/)?.[0] ||
    "";


  const trailing =
    raw.match(/\s*$/)?.[0] ||
    "";


  return (
    leading +
    translated +
    trailing
  );

}


function translateRelationTree(
  root
) {

  if (!root) {
    return;
  }


  const walker =
    document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );


  const nodes = [];


  while (
    walker.nextNode()
  ) {

    nodes.push(
      walker.currentNode
    );

  }


  for (
    const node
    of nodes
  ) {

    const parent =
      node.parentElement;


    if (!parent) {
      continue;
    }


    if (
      parent.closest(
        `
        script,
        style,
        textarea,
        code,
        pre,
        #astromatchHomeDashboard,
        #astromatchLanguageSwitch
        `
      )
    ) {
      continue;
    }


    const current =
      node.nodeValue;


    const translated =
      translateRelationValue(
        current
      );


    if (
      translated !==
      current
    ) {

      node.nodeValue =
        translated;

    }

  }


  /*
   * Attributs :
   * title / aria / placeholder.
   *
   * On inclut aussi ROOT lui-même,
   * contrairement à querySelectorAll seul.
   */

  const candidates = [
    root,
    ...root.querySelectorAll(
      `
      [title],
      [aria-label],
      [placeholder]
      `
    )
  ];


  for (
    const element
    of candidates
  ) {

    if (
      !(element instanceof Element)
    ) {
      continue;
    }


    for (
      const attr
      of [
        "title",
        "aria-label",
        "placeholder"
      ]
    ) {

      if (
        !element.hasAttribute(
          attr
        )
      ) {
        continue;
      }


      const current =
        element.getAttribute(
          attr
        );


      const translated =
        translateRelationValue(
          current
        );


      if (
        translated !==
        current
      ) {

        element.setAttribute(
          attr,
          translated
        );

      }

    }

  }

}


function translateRelationsSurfaces() {

  /*
   * On vise UNIQUEMENT la Relations V3 réelle.
   *
   * L'ancien astromatchHomeDashboard est
   * volontairement exclu.
   */

  const roots = [

    document.querySelector(
      ".astromatch-relations-head"
    ),

    document.getElementById(
      "targetSelector"
    ),

    document.getElementById(
      "targetSelectionHint"
    ),

    document.getElementById(
      "targetProfileEditor"
    ),

    document.getElementById(
      "astromatchRelationFloatingNav"
    )

  ];


  for (
    const root
    of roots
  ) {

    translateRelationTree(
      root
    );

  }


  /*
   * La catégorie pro est volontairement
   * abrégée "Pro" en français.
   *
   * En anglais on affiche "Work".
   */

  document
    .querySelectorAll(
      `
      [data-relation-jump="professional"]
      span:nth-of-type(2)
      `
    )
    .forEach(
      element => {

        element.textContent =
          locale() === "en"
            ? "Work"
            : "Pro";

      }
    );

}


function installRelationsObserver() {

  /*
   * Relations reconstruit souvent son HTML :
   * recherche,
   * favoris,
   * ouverture d'un groupe,
   * ajout/modification,
   * changement de profil.
   *
   * On observe les reconstructions DOM mais PAS
   * les attributs ni characterData :
   * aucune boucle provoquée par notre traduction.
   */

  const observer =
    new MutationObserver(
      schedule
    );


  observer.observe(
    document.body,
    {
      childList: true,
      subtree: true
    }
  );

}


let scheduled =
  false;


let busy =
  false;


function applyAll() {

  if (busy) {
    return;
  }


  busy = true;


  try {

    translateNavigation();


    const today =
      document.getElementById(
        "astromatchTodayView"
      );


    if (today) {

      translateTree(
        today
      );

    }


    translateRelationsSurfaces();

    updateSwitch();

  } finally {

    busy =
      false;

  }

}


function schedule() {

  if (scheduled) {
    return;
  }


  scheduled =
    true;


  requestAnimationFrame(
    () => {

      scheduled =
        false;

      applyAll();

    }
  );

}


function installTodayObserver() {

  const today =
    document.getElementById(
      "astromatchTodayView"
    );


  if (!today) {
    return;
  }


  const observer =
    new MutationObserver(
      schedule
    );


  observer.observe(
    today,
    {
      childList: true,
      subtree: true,
      characterData: true
    }
  );

}


function boot() {

  initI18n();

  createSwitch();

  applyAll();

  installTodayObserver();

  installRelationsObserver();


  window.addEventListener(
    "astromatch:languagechange",
    schedule
  );


  console.log(
    "ASTROMATCH I18N CURRENT UI — READY",
    locale()
  );

}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    boot,
    {
      once: true
    }
  );

} else {

  boot();

}
