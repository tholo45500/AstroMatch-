// js/storage/repository.js
//
// Persistance simple pour le prototype.
//
// - Dans un navigateur : utilise localStorage.
// - Dans Node (ex : exécution des tests via `node --test`) : localStorage
//   n'existe pas, donc on bascule automatiquement sur un stockage en
//   mémoire avec exactement la même interface (getItem/setItem/removeItem).
//   Le reste du repository ne sait même pas laquelle des deux est utilisée.
//
// Principe de versionning : on ne supprime JAMAIS brutalement une donnée
// remplacée (chart, synastry, score) — l'ancienne valeur est poussée dans
// un tableau `history` avant d'être écrasée par la nouvelle "current".

const memoryStore = new Map();

const storageBackend =
  typeof localStorage !== "undefined"
    ? localStorage
    : {
        getItem(key) {
          return memoryStore.has(key) ? memoryStore.get(key) : null;
        },
        setItem(key, value) {
          memoryStore.set(key, value);
        },
        removeItem(key) {
          memoryStore.delete(key);
        }
      };

const KEYS = {
  profiles: "astromatch:profiles",
  charts: "astromatch:charts", // { [profile_id]: { current, history: [] } }
  synastries: "astromatch:synastries", // { [target_profile_id]: { current, history: [] } }
  scores: "astromatch:scores", // { [target_profile_id]: { current, history: [] } }
  interpretations: "astromatch:interpretations" // { [target_profile_id]: interpretation }
};

function readJson(key, fallback) {
  const raw = storageBackend.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  storageBackend.setItem(key, JSON.stringify(value));
}

function pushVersioned(store, id, newValue) {
  const existing = store[id];
  if (existing) {
    store[id] = { current: newValue, history: [existing.current, ...existing.history].slice(0, 20) };
  } else {
    store[id] = { current: newValue, history: [] };
  }
  return store;
}

export const repository = {
  // ---------------- Profiles ----------------
  saveProfile(profile) {
    const profiles = readJson(KEYS.profiles, []).filter((p) => p.profile_id !== profile.profile_id);
    profiles.push(profile);
    writeJson(KEYS.profiles, profiles);
    return profile;
  },

  getProfile(profileId) {
    return readJson(KEYS.profiles, []).find((p) => p.profile_id === profileId) || null;
  },

  getAllProfiles() {
    return readJson(KEYS.profiles, []);
  },

  getPrimaryProfile() {
    return readJson(KEYS.profiles, []).find((p) => p.role === "primary") || null;
  },

  getTargetProfiles() {
    return readJson(KEYS.profiles, []).filter((p) => p.role === "target");
  },

  deleteProfile(profileId) {
    writeJson(
      KEYS.profiles,
      readJson(KEYS.profiles, []).filter((p) => p.profile_id !== profileId)
    );
    // Les charts/synastries/scores associés restent en historique — ils
    // deviennent simplement orphelins et inaccessibles depuis l'UI plutôt
    // que supprimés brutalement.
  },

  // ---------------- Natal charts (par profile_id) ----------------
  saveChart(profileId, chart) {
    const charts = readJson(KEYS.charts, {});
    pushVersioned(charts, profileId, chart);
    writeJson(KEYS.charts, charts);
    return chart;
  },

  getChart(profileId) {
    const charts = readJson(KEYS.charts, {});
    return charts[profileId] ? charts[profileId].current : null;
  },

  getChartHistory(profileId) {
    const charts = readJson(KEYS.charts, {});
    return charts[profileId] ? charts[profileId].history : [];
  },

  // ---------------- Synastries (par target_profile_id) ----------------
  saveSynastry(targetProfileId, synastry) {
    const synastries = readJson(KEYS.synastries, {});
    pushVersioned(synastries, targetProfileId, synastry);
    writeJson(KEYS.synastries, synastries);
    return synastry;
  },

  getSynastry(targetProfileId) {
    const synastries = readJson(KEYS.synastries, {});
    return synastries[targetProfileId] ? synastries[targetProfileId].current : null;
  },

  // ---------------- Scores (par target_profile_id) ----------------
  saveScore(targetProfileId, score) {
    const scores = readJson(KEYS.scores, {});
    pushVersioned(scores, targetProfileId, score);
    writeJson(KEYS.scores, scores);
    return score;
  },

  getScore(targetProfileId) {
    const scores = readJson(KEYS.scores, {});
    return scores[targetProfileId] ? scores[targetProfileId].current : null;
  },

  // ---------------- Interprétations (par target_profile_id) ----------------
  saveInterpretation(targetProfileId, interpretation) {
    const interpretations = readJson(KEYS.interpretations, {});
    interpretations[targetProfileId] = interpretation;
    writeJson(KEYS.interpretations, interpretations);
    return interpretation;
  },

  getInterpretation(targetProfileId) {
    const interpretations = readJson(KEYS.interpretations, {});
    return interpretations[targetProfileId] || null;
  },

  // ---------------- Reset complet (démo / tests) ----------------
  clearAll() {
    Object.values(KEYS).forEach((k) => storageBackend.removeItem(k));
    memoryStore.clear();
  }
};
