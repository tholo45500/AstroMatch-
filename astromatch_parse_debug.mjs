// ===== SCRIPT 1 | HTML START 10 =====
// ===== SCRIPT 2 | HTML START 12 =====
// HTML 0012 | JS-SCRIPT 2: 0001

// HTML 0013 | JS-SCRIPT 2: 0002
(function () {
// HTML 0014 | JS-SCRIPT 2: 0003
  var box = document.createElement("pre");
// HTML 0015 | JS-SCRIPT 2: 0004

// HTML 0016 | JS-SCRIPT 2: 0005
  box.id = "ASTROMATCH_PRE_MODULE_DIAG";
// HTML 0017 | JS-SCRIPT 2: 0006

// HTML 0018 | JS-SCRIPT 2: 0007
  box.style.cssText =
// HTML 0019 | JS-SCRIPT 2: 0008
    "position:fixed;" +
// HTML 0020 | JS-SCRIPT 2: 0009
    "z-index:2147483647;" +
// HTML 0021 | JS-SCRIPT 2: 0010
    "left:5px;" +
// HTML 0022 | JS-SCRIPT 2: 0011
    "right:5px;" +
// HTML 0023 | JS-SCRIPT 2: 0012
    "top:5px;" +
// HTML 0024 | JS-SCRIPT 2: 0013
    "max-height:90vh;" +
// HTML 0025 | JS-SCRIPT 2: 0014
    "overflow:auto;" +
// HTML 0026 | JS-SCRIPT 2: 0015
    "background:#000;" +
// HTML 0027 | JS-SCRIPT 2: 0016
    "color:#00ff00;" +
// HTML 0028 | JS-SCRIPT 2: 0017
    "border:3px solid #00ff00;" +
// HTML 0029 | JS-SCRIPT 2: 0018
    "border-radius:8px;" +
// HTML 0030 | JS-SCRIPT 2: 0019
    "padding:12px;" +
// HTML 0031 | JS-SCRIPT 2: 0020
    "font:12px monospace;" +
// HTML 0032 | JS-SCRIPT 2: 0021
    "white-space:pre-wrap;";
// HTML 0033 | JS-SCRIPT 2: 0022

// HTML 0034 | JS-SCRIPT 2: 0023
  box.textContent =
// HTML 0035 | JS-SCRIPT 2: 0024
    "ASTROMATCH PRE-MODULE DIAGNOSTIC\\n" +
// HTML 0036 | JS-SCRIPT 2: 0025
    "JS CLASSIQUE EXECUTE\\n" +
// HTML 0037 | JS-SCRIPT 2: 0026
    "En attente du module...\\n";
// HTML 0038 | JS-SCRIPT 2: 0027

// HTML 0039 | JS-SCRIPT 2: 0028
  document.addEventListener("DOMContentLoaded", function () {
// HTML 0040 | JS-SCRIPT 2: 0029
    if (!box.parentNode) {
// HTML 0041 | JS-SCRIPT 2: 0030
      document.body.appendChild(box);
// HTML 0042 | JS-SCRIPT 2: 0031
    }
// HTML 0043 | JS-SCRIPT 2: 0032
  });
// HTML 0044 | JS-SCRIPT 2: 0033

// HTML 0045 | JS-SCRIPT 2: 0034
  window.addEventListener("error", function (e) {
// HTML 0046 | JS-SCRIPT 2: 0035
    box.textContent +=
// HTML 0047 | JS-SCRIPT 2: 0036
      "\\n===== ERROR =====\\n" +
// HTML 0048 | JS-SCRIPT 2: 0037
      "message: " + e.message +
// HTML 0049 | JS-SCRIPT 2: 0038
      "\\nfile: " + e.filename +
// HTML 0050 | JS-SCRIPT 2: 0039
      "\\nline: " + e.lineno +
// HTML 0051 | JS-SCRIPT 2: 0040
      "\\ncolumn: " + e.colno +
// HTML 0052 | JS-SCRIPT 2: 0041
      "\\n";
// HTML 0053 | JS-SCRIPT 2: 0042

// HTML 0054 | JS-SCRIPT 2: 0043
    if (e.error && e.error.stack) {
// HTML 0055 | JS-SCRIPT 2: 0044
      box.textContent += e.error.stack + "\\n";
// HTML 0056 | JS-SCRIPT 2: 0045
    }
// HTML 0057 | JS-SCRIPT 2: 0046

// HTML 0058 | JS-SCRIPT 2: 0047
    if (!box.parentNode) {
// HTML 0059 | JS-SCRIPT 2: 0048
      document.body.appendChild(box);
// HTML 0060 | JS-SCRIPT 2: 0049
    }
// HTML 0061 | JS-SCRIPT 2: 0050
  });
// HTML 0062 | JS-SCRIPT 2: 0051

// HTML 0063 | JS-SCRIPT 2: 0052
  window.addEventListener("unhandledrejection", function (e) {
// HTML 0064 | JS-SCRIPT 2: 0053
    box.textContent +=
// HTML 0065 | JS-SCRIPT 2: 0054
      "\\n===== UNHANDLED PROMISE =====\\n" +
// HTML 0066 | JS-SCRIPT 2: 0055
      String(e.reason && e.reason.stack || e.reason) +
// HTML 0067 | JS-SCRIPT 2: 0056
      "\\n";
// HTML 0068 | JS-SCRIPT 2: 0057

// HTML 0069 | JS-SCRIPT 2: 0058
    if (!box.parentNode) {
// HTML 0070 | JS-SCRIPT 2: 0059
      document.body.appendChild(box);
// HTML 0071 | JS-SCRIPT 2: 0060
    }
// HTML 0072 | JS-SCRIPT 2: 0061
  });
// HTML 0073 | JS-SCRIPT 2: 0062

// HTML 0074 | JS-SCRIPT 2: 0063
  document.documentElement.appendChild(
// HTML 0075 | JS-SCRIPT 2: 0064
    document.createComment("ASTROMATCH PRE MODULE DIAGNOSTIC")
// HTML 0076 | JS-SCRIPT 2: 0065
  );
// HTML 0077 | JS-SCRIPT 2: 0066

// HTML 0078 | JS-SCRIPT 2: 0067
  window.__ASTROMATCH_PRE_MODULE_DIAG__ = box;
// HTML 0079 | JS-SCRIPT 2: 0068

// HTML 0080 | JS-SCRIPT 2: 0069
  setTimeout(function () {
// HTML 0081 | JS-SCRIPT 2: 0070
    if (!box.parentNode && document.body) {
// HTML 0082 | JS-SCRIPT 2: 0071
      document.body.appendChild(box);
// HTML 0083 | JS-SCRIPT 2: 0072
    }
// HTML 0084 | JS-SCRIPT 2: 0073
  }, 0);
// HTML 0085 | JS-SCRIPT 2: 0074

// HTML 0086 | JS-SCRIPT 2: 0075
  setTimeout(function () {
// HTML 0087 | JS-SCRIPT 2: 0076
    if (!box.parentNode && document.body) {
// HTML 0088 | JS-SCRIPT 2: 0077
      document.body.appendChild(box);
// HTML 0089 | JS-SCRIPT 2: 0078
    }
// HTML 0090 | JS-SCRIPT 2: 0079

// HTML 0091 | JS-SCRIPT 2: 0080
    box.textContent +=
// HTML 0092 | JS-SCRIPT 2: 0081
      "\\n===== 5 SECONDES =====\\n" +
// HTML 0093 | JS-SCRIPT 2: 0082
      "Le script module n'a peut-être pas démarré.\\n";
// HTML 0094 | JS-SCRIPT 2: 0083
  }, 5000);
// HTML 0095 | JS-SCRIPT 2: 0084
})();
// ===== SCRIPT 3 | HTML START 1041 =====
// HTML 1041 | JS-SCRIPT 3: 0001

// HTML 1042 | JS-SCRIPT 3: 0002
window.addEventListener("DOMContentLoaded", function() {
// HTML 1043 | JS-SCRIPT 3: 0003
  const box = document.getElementById("jsDiagnostic");
// HTML 1044 | JS-SCRIPT 3: 0004
  if (box) box.textContent = "JavaScript : page chargée, module en attente…";
// HTML 1045 | JS-SCRIPT 3: 0005
});
// HTML 1046 | JS-SCRIPT 3: 0006

// HTML 1047 | JS-SCRIPT 3: 0007
window.addEventListener("error", function(e) {
// HTML 1048 | JS-SCRIPT 3: 0008
  const box = document.getElementById("jsDiagnostic");
// HTML 1049 | JS-SCRIPT 3: 0009
  if (box) {
// HTML 1050 | JS-SCRIPT 3: 0010
    box.textContent =
// HTML 1051 | JS-SCRIPT 3: 0011
      "ASTROMATCH JS DIAGNOSTIC — " +
// HTML 1052 | JS-SCRIPT 3: 0012
      (e.message || "Erreur JavaScript inconnue");
// HTML 1053 | JS-SCRIPT 3: 0013
  }
// HTML 1054 | JS-SCRIPT 3: 0014
});
// HTML 1055 | JS-SCRIPT 3: 0015

// HTML 1056 | JS-SCRIPT 3: 0016
window.addEventListener("unhandledrejection", function(e) {
// HTML 1057 | JS-SCRIPT 3: 0017
  const box = document.getElementById("jsDiagnostic");
// HTML 1058 | JS-SCRIPT 3: 0018
  if (box) {
// HTML 1059 | JS-SCRIPT 3: 0019
    box.textContent =
// HTML 1060 | JS-SCRIPT 3: 0020
      "ASTROMATCH JS DIAGNOSTIC — " +
// HTML 1061 | JS-SCRIPT 3: 0021
      (e.reason?.message || String(e.reason));
// HTML 1062 | JS-SCRIPT 3: 0022
  }
// HTML 1063 | JS-SCRIPT 3: 0023
});
// ===== SCRIPT 4 | HTML START 1067 =====
// HTML 1067 | JS-SCRIPT 4: 0001

// HTML 1068 | JS-SCRIPT 4: 0002
/*
// HTML 1069 | JS-SCRIPT 4: 0003
 * ============================================================
// HTML 1070 | JS-SCRIPT 4: 0004
 * ASTROMATCH RELATIONSHIP VIEW ENGINE
// HTML 1071 | JS-SCRIPT 4: 0005
 * ------------------------------------------------------------
// HTML 1072 | JS-SCRIPT 4: 0006
 * PRESENTATION ONLY
// HTML 1073 | JS-SCRIPT 4: 0007
 *
// HTML 1074 | JS-SCRIPT 4: 0008
 * Les scores utilisés ici proviennent exclusivement des
// HTML 1075 | JS-SCRIPT 4: 0009
 * domaines déjà calculés par l'API AstroMatch.
// HTML 1076 | JS-SCRIPT 4: 0010
 *
// HTML 1077 | JS-SCRIPT 4: 0011
 * Aucun recalcul astrologique.
// HTML 1078 | JS-SCRIPT 4: 0012
 * Aucun changement du scoring V1.2.
// HTML 1079 | JS-SCRIPT 4: 0013
 * Aucun nouveau facteur astrologique.
// HTML 1080 | JS-SCRIPT 4: 0014
 * ============================================================
// HTML 1081 | JS-SCRIPT 4: 0015
 */
// HTML 1082 | JS-SCRIPT 4: 0016

// HTML 1083 | JS-SCRIPT 4: 0017
let ASTROMATCH_RESULT = null;
// HTML 1084 | JS-SCRIPT 4: 0018

// HTML 1085 | JS-SCRIPT 4: 0019
/*
// HTML 1086 | JS-SCRIPT 4: 0020
 * ============================================================
// HTML 1087 | JS-SCRIPT 4: 0021
 * ASTROMATCH TARGET RESULT CACHE
// HTML 1088 | JS-SCRIPT 4: 0022
 * ------------------------------------------------------------
// HTML 1089 | JS-SCRIPT 4: 0023
 * PRESENTATION / SESSION ONLY
// HTML 1090 | JS-SCRIPT 4: 0024
 *
// HTML 1091 | JS-SCRIPT 4: 0025
 * Conserve les résultats API déjà calculés pour chaque profil
// HTML 1092 | JS-SCRIPT 4: 0026
 * cible afin de permettre une comparaison entre plusieurs
// HTML 1093 | JS-SCRIPT 4: 0027
 * cibles sans recalcul astrologique supplémentaire.
// HTML 1094 | JS-SCRIPT 4: 0028
 *
// HTML 1095 | JS-SCRIPT 4: 0029
 * Clé : profile_id
// HTML 1096 | JS-SCRIPT 4: 0030
 * Valeur : résultat complet retourné par /api/match
// HTML 1097 | JS-SCRIPT 4: 0031
 *
// HTML 1098 | JS-SCRIPT 4: 0032
 * Aucun changement du backend.
// HTML 1099 | JS-SCRIPT 4: 0033
 * Aucun changement du scoring V1.2.
// HTML 1100 | JS-SCRIPT 4: 0034
 * Aucun changement du moteur synastrie.
// HTML 1101 | JS-SCRIPT 4: 0035
 * ============================================================
// HTML 1102 | JS-SCRIPT 4: 0036
 */
// HTML 1103 | JS-SCRIPT 4: 0037
const ASTROMATCH_TARGET_RESULTS = new Map();
// HTML 1104 | JS-SCRIPT 4: 0038

// HTML 1105 | JS-SCRIPT 4: 0039
if (typeof window !== "undefined") {
// HTML 1106 | JS-SCRIPT 4: 0040
  window.__astromatchTargetResults =
// HTML 1107 | JS-SCRIPT 4: 0041
    ASTROMATCH_TARGET_RESULTS;
// HTML 1108 | JS-SCRIPT 4: 0042
}
// HTML 1109 | JS-SCRIPT 4: 0043

// HTML 1110 | JS-SCRIPT 4: 0044
let CURRENT_RELATIONSHIP_MODE = "love";
// HTML 1111 | JS-SCRIPT 4: 0045

// HTML 1112 | JS-SCRIPT 4: 0046
function relationshipEscapeHtml(value) {
// HTML 1113 | JS-SCRIPT 4: 0047
  return String(value ?? "")
// HTML 1114 | JS-SCRIPT 4: 0048
    .replace(/&/g, "&amp;")
// HTML 1115 | JS-SCRIPT 4: 0049
    .replace(/</g, "&lt;")
// HTML 1116 | JS-SCRIPT 4: 0050
    .replace(/>/g, "&gt;")
// HTML 1117 | JS-SCRIPT 4: 0051
    .replace(/"/g, "&quot;")
// HTML 1118 | JS-SCRIPT 4: 0052
    .replace(/'/g, "&#039;");
// HTML 1119 | JS-SCRIPT 4: 0053
}
// HTML 1120 | JS-SCRIPT 4: 0054

// HTML 1121 | JS-SCRIPT 4: 0055
const RELATIONSHIP_META = {
// HTML 1122 | JS-SCRIPT 4: 0056
  love: {
// HTML 1123 | JS-SCRIPT 4: 0057
    icon: "❤️",
// HTML 1124 | JS-SCRIPT 4: 0058
    title: "Amour",
// HTML 1125 | JS-SCRIPT 4: 0059
    subtitle: "Affection, proximité et construction du couple"
// HTML 1126 | JS-SCRIPT 4: 0060
  },
// HTML 1127 | JS-SCRIPT 4: 0061
  friendship: {
// HTML 1128 | JS-SCRIPT 4: 0062
    icon: "🤝",
// HTML 1129 | JS-SCRIPT 4: 0063
    title: "Amitié",
// HTML 1130 | JS-SCRIPT 4: 0064
    subtitle: "Complicité, confiance et qualité des échanges"
// HTML 1131 | JS-SCRIPT 4: 0065
  },
// HTML 1132 | JS-SCRIPT 4: 0066
  flirt: {
// HTML 1133 | JS-SCRIPT 4: 0067
    icon: "🔥",
// HTML 1134 | JS-SCRIPT 4: 0068
    title: "Flirt",
// HTML 1135 | JS-SCRIPT 4: 0069
    subtitle: "Attirance, alchimie et dynamique de séduction"
// HTML 1136 | JS-SCRIPT 4: 0070
  },
// HTML 1137 | JS-SCRIPT 4: 0071
  family: {
// HTML 1138 | JS-SCRIPT 4: 0072
    icon: "👨‍👩‍👧‍👦",
// HTML 1139 | JS-SCRIPT 4: 0073
    title: "Famille",
// HTML 1140 | JS-SCRIPT 4: 0074
    subtitle: "Liens familiaux, compréhension et équilibre"
// HTML 1141 | JS-SCRIPT 4: 0075
  }
// HTML 1142 | JS-SCRIPT 4: 0076
};
// HTML 1143 | JS-SCRIPT 4: 0077

// HTML 1144 | JS-SCRIPT 4: 0078
const RELATIONSHIP_WEIGHTS = {
// HTML 1145 | JS-SCRIPT 4: 0079
  love: {
// HTML 1146 | JS-SCRIPT 4: 0080
    love: 0.30,
// HTML 1147 | JS-SCRIPT 4: 0081
    emotions: 0.20,
// HTML 1148 | JS-SCRIPT 4: 0082
    communication: 0.15,
// HTML 1149 | JS-SCRIPT 4: 0083
    passion: 0.20,
// HTML 1150 | JS-SCRIPT 4: 0084
    daily: 0.10,
// HTML 1151 | JS-SCRIPT 4: 0085
    projects: 0.05,
// HTML 1152 | JS-SCRIPT 4: 0086
    frictions: 0.20
// HTML 1153 | JS-SCRIPT 4: 0087
  },
// HTML 1154 | JS-SCRIPT 4: 0088

// HTML 1155 | JS-SCRIPT 4: 0089
  friendship: {
// HTML 1156 | JS-SCRIPT 4: 0090
    love: 0.05,
// HTML 1157 | JS-SCRIPT 4: 0091
    emotions: 0.25,
// HTML 1158 | JS-SCRIPT 4: 0092
    communication: 0.30,
// HTML 1159 | JS-SCRIPT 4: 0093
    passion: 0.05,
// HTML 1160 | JS-SCRIPT 4: 0094
    daily: 0.20,
// HTML 1161 | JS-SCRIPT 4: 0095
    projects: 0.15,
// HTML 1162 | JS-SCRIPT 4: 0096
    frictions: 0.15
// HTML 1163 | JS-SCRIPT 4: 0097
  },
// HTML 1164 | JS-SCRIPT 4: 0098

// HTML 1165 | JS-SCRIPT 4: 0099
  flirt: {
// HTML 1166 | JS-SCRIPT 4: 0100
    love: 0.35,
// HTML 1167 | JS-SCRIPT 4: 0101
    emotions: 0.10,
// HTML 1168 | JS-SCRIPT 4: 0102
    communication: 0.15,
// HTML 1169 | JS-SCRIPT 4: 0103
    passion: 0.40,
// HTML 1170 | JS-SCRIPT 4: 0104
    daily: 0.00,
// HTML 1171 | JS-SCRIPT 4: 0105
    projects: 0.00,
// HTML 1172 | JS-SCRIPT 4: 0106
    frictions: 0.15
// HTML 1173 | JS-SCRIPT 4: 0107
  },
// HTML 1174 | JS-SCRIPT 4: 0108

// HTML 1175 | JS-SCRIPT 4: 0109
  /*
// HTML 1176 | JS-SCRIPT 4: 0110
   * Famille = présentation relationnelle.
// HTML 1177 | JS-SCRIPT 4: 0111
   * On réutilise volontairement la pondération
// HTML 1178 | JS-SCRIPT 4: 0112
   * de l'amitié tant qu'aucune doctrine familiale
// HTML 1179 | JS-SCRIPT 4: 0113
   * spécifique n'est définie.
// HTML 1180 | JS-SCRIPT 4: 0114
   */
// HTML 1181 | JS-SCRIPT 4: 0115
  family: {
// HTML 1182 | JS-SCRIPT 4: 0116
    love: 0.05,
// HTML 1183 | JS-SCRIPT 4: 0117
    emotions: 0.25,
// HTML 1184 | JS-SCRIPT 4: 0118
    communication: 0.30,
// HTML 1185 | JS-SCRIPT 4: 0119
    passion: 0.05,
// HTML 1186 | JS-SCRIPT 4: 0120
    daily: 0.20,
// HTML 1187 | JS-SCRIPT 4: 0121
    projects: 0.15,
// HTML 1188 | JS-SCRIPT 4: 0122
    frictions: 0.15
// HTML 1189 | JS-SCRIPT 4: 0123
  }
// HTML 1190 | JS-SCRIPT 4: 0124
};
// HTML 1191 | JS-SCRIPT 4: 0125

// HTML 1192 | JS-SCRIPT 4: 0126
function relationshipDomainMap(result) {
// HTML 1193 | JS-SCRIPT 4: 0127
  const map = {};
// HTML 1194 | JS-SCRIPT 4: 0128

// HTML 1195 | JS-SCRIPT 4: 0129
  for (const d of (result?.domains || [])) {
// HTML 1196 | JS-SCRIPT 4: 0130
    if (d?.domain) map[d.domain] = d;
// HTML 1197 | JS-SCRIPT 4: 0131
  }
// HTML 1198 | JS-SCRIPT 4: 0132

// HTML 1199 | JS-SCRIPT 4: 0133
  return map;
// HTML 1200 | JS-SCRIPT 4: 0134
}
// HTML 1201 | JS-SCRIPT 4: 0135

// HTML 1202 | JS-SCRIPT 4: 0136
function numericScore(domain, fallback = 50) {
// HTML 1203 | JS-SCRIPT 4: 0137
  const n = Number(domain?.score);
// HTML 1204 | JS-SCRIPT 4: 0138
  if (!Number.isFinite(n)) return fallback;
// HTML 1205 | JS-SCRIPT 4: 0139
  return Math.max(0, Math.min(100, n));
// HTML 1206 | JS-SCRIPT 4: 0140
}
// HTML 1207 | JS-SCRIPT 4: 0141

// HTML 1208 | JS-SCRIPT 4: 0142
function calculateRelationshipScore(mode, result) {
// HTML 1209 | JS-SCRIPT 4: 0143
  const domains = relationshipDomainMap(result);
// HTML 1210 | JS-SCRIPT 4: 0144
  const weights = RELATIONSHIP_WEIGHTS[mode];
// HTML 1211 | JS-SCRIPT 4: 0145

// HTML 1212 | JS-SCRIPT 4: 0146
  if (!weights) return 50;
// HTML 1213 | JS-SCRIPT 4: 0147

// HTML 1214 | JS-SCRIPT 4: 0148
  let total = 0;
// HTML 1215 | JS-SCRIPT 4: 0149
  let weightTotal = 0;
// HTML 1216 | JS-SCRIPT 4: 0150

// HTML 1217 | JS-SCRIPT 4: 0151
  for (const domain of [
// HTML 1218 | JS-SCRIPT 4: 0152
    "love",
// HTML 1219 | JS-SCRIPT 4: 0153
    "emotions",
// HTML 1220 | JS-SCRIPT 4: 0154
    "communication",
// HTML 1221 | JS-SCRIPT 4: 0155
    "passion",
// HTML 1222 | JS-SCRIPT 4: 0156
    "daily",
// HTML 1223 | JS-SCRIPT 4: 0157
    "projects"
// HTML 1224 | JS-SCRIPT 4: 0158
  ]) {
// HTML 1225 | JS-SCRIPT 4: 0159
    const weight = Number(weights[domain] || 0);
// HTML 1226 | JS-SCRIPT 4: 0160

// HTML 1227 | JS-SCRIPT 4: 0161
    if (!weight) continue;
// HTML 1228 | JS-SCRIPT 4: 0162

// HTML 1229 | JS-SCRIPT 4: 0163
    total += numericScore(domains[domain]) * weight;
// HTML 1230 | JS-SCRIPT 4: 0164
    weightTotal += weight;
// HTML 1231 | JS-SCRIPT 4: 0165
  }
// HTML 1232 | JS-SCRIPT 4: 0166

// HTML 1233 | JS-SCRIPT 4: 0167
  let score = weightTotal ? total / weightTotal : 50;
// HTML 1234 | JS-SCRIPT 4: 0168

// HTML 1235 | JS-SCRIPT 4: 0169
  /*
// HTML 1236 | JS-SCRIPT 4: 0170
   * IMPORTANT :
// HTML 1237 | JS-SCRIPT 4: 0171
   * Dans l'Interpretation Engine actuel, frictions = 0 avec
// HTML 1238 | JS-SCRIPT 4: 0172
   * contribution_count = 0 signifie qu'aucune règle dédiée
// HTML 1239 | JS-SCRIPT 4: 0173
   * de friction n'a contribué.
// HTML 1240 | JS-SCRIPT 4: 0174
   *
// HTML 1241 | JS-SCRIPT 4: 0175
   * Ce n'est PAS un score de "zéro friction".
// HTML 1242 | JS-SCRIPT 4: 0176
   * On ne pénalise donc que lorsqu'un vrai domaine de friction
// HTML 1243 | JS-SCRIPT 4: 0177
   * contient des contributions.
// HTML 1244 | JS-SCRIPT 4: 0178
   */
// HTML 1245 | JS-SCRIPT 4: 0179
  const frictionWeight = Number(weights.frictions || 0);
// HTML 1246 | JS-SCRIPT 4: 0180
  const frictionDomain = domains.frictions;
// HTML 1247 | JS-SCRIPT 4: 0181
  const frictionContributions = Number(
// HTML 1248 | JS-SCRIPT 4: 0182
    frictionDomain?.contribution_count || 0
// HTML 1249 | JS-SCRIPT 4: 0183
  );
// HTML 1250 | JS-SCRIPT 4: 0184

// HTML 1251 | JS-SCRIPT 4: 0185
  if (frictionWeight > 0 && frictionContributions > 0) {
// HTML 1252 | JS-SCRIPT 4: 0186
    const friction = numericScore(frictionDomain);
// HTML 1253 | JS-SCRIPT 4: 0187
    score -= Math.max(0, 50 - friction) * frictionWeight;
// HTML 1254 | JS-SCRIPT 4: 0188
  }
// HTML 1255 | JS-SCRIPT 4: 0189

// HTML 1256 | JS-SCRIPT 4: 0190
  return Math.round(Math.max(0, Math.min(100, score)) * 100) / 100;
// HTML 1257 | JS-SCRIPT 4: 0191
}
// HTML 1258 | JS-SCRIPT 4: 0192

// HTML 1259 | JS-SCRIPT 4: 0193
function relationshipLevel(score) {
// HTML 1260 | JS-SCRIPT 4: 0194
  if (score >= 80) return "Exceptionnel";
// HTML 1261 | JS-SCRIPT 4: 0195
  if (score >= 70) return "Très élevé";
// HTML 1262 | JS-SCRIPT 4: 0196
  if (score >= 60) return "Élevé";
// HTML 1263 | JS-SCRIPT 4: 0197
  if (score >= 50) return "Équilibré";
// HTML 1264 | JS-SCRIPT 4: 0198
  if (score >= 40) return "Modéré";
// HTML 1265 | JS-SCRIPT 4: 0199
  if (score >= 30) return "Faible";
// HTML 1266 | JS-SCRIPT 4: 0200
  return "Très faible";
// HTML 1267 | JS-SCRIPT 4: 0201
}
// HTML 1268 | JS-SCRIPT 4: 0202

// HTML 1269 | JS-SCRIPT 4: 0203

// HTML 1270 | JS-SCRIPT 4: 0204
function debugFactorObject(value) {
// HTML 1271 | JS-SCRIPT 4: 0205
  try {
// HTML 1272 | JS-SCRIPT 4: 0206
    const root = value ?? {};
// HTML 1273 | JS-SCRIPT 4: 0207
    const item = root?.item ?? root ?? {};
// HTML 1274 | JS-SCRIPT 4: 0208

// HTML 1275 | JS-SCRIPT 4: 0209
    const candidates = {
// HTML 1276 | JS-SCRIPT 4: 0210
      root_rule_id: root?.rule_id,
// HTML 1277 | JS-SCRIPT 4: 0211
      root_ruleId: root?.ruleId,
// HTML 1278 | JS-SCRIPT 4: 0212
      root_factor_id: root?.factor_id,
// HTML 1279 | JS-SCRIPT 4: 0213
      root_factorId: root?.factorId,
// HTML 1280 | JS-SCRIPT 4: 0214
      root_id: root?.id,
// HTML 1281 | JS-SCRIPT 4: 0215
      root_code: root?.code,
// HTML 1282 | JS-SCRIPT 4: 0216
      root_key: root?.key,
// HTML 1283 | JS-SCRIPT 4: 0217

// HTML 1284 | JS-SCRIPT 4: 0218
      item_rule_id: item?.rule_id,
// HTML 1285 | JS-SCRIPT 4: 0219
      item_ruleId: item?.ruleId,
// HTML 1286 | JS-SCRIPT 4: 0220
      item_factor_id: item?.factor_id,
// HTML 1287 | JS-SCRIPT 4: 0221
      item_factorId: item?.factorId,
// HTML 1288 | JS-SCRIPT 4: 0222
      item_id: item?.id,
// HTML 1289 | JS-SCRIPT 4: 0223
      item_code: item?.code,
// HTML 1290 | JS-SCRIPT 4: 0224
      item_key: item?.key
// HTML 1291 | JS-SCRIPT 4: 0225
    };
// HTML 1292 | JS-SCRIPT 4: 0226

// HTML 1293 | JS-SCRIPT 4: 0227
    console.log(
// HTML 1294 | JS-SCRIPT 4: 0228
      "ASTROMATCH FACTOR DEBUG",
// HTML 1295 | JS-SCRIPT 4: 0229
      JSON.stringify({
// HTML 1296 | JS-SCRIPT 4: 0230
        root,
// HTML 1297 | JS-SCRIPT 4: 0231
        item,
// HTML 1298 | JS-SCRIPT 4: 0232
        candidates
// HTML 1299 | JS-SCRIPT 4: 0233
      }, null, 2)
// HTML 1300 | JS-SCRIPT 4: 0234
    );
// HTML 1301 | JS-SCRIPT 4: 0235

// HTML 1302 | JS-SCRIPT 4: 0236
    return {
// HTML 1303 | JS-SCRIPT 4: 0237
      root,
// HTML 1304 | JS-SCRIPT 4: 0238
      item,
// HTML 1305 | JS-SCRIPT 4: 0239
      candidates
// HTML 1306 | JS-SCRIPT 4: 0240
    };
// HTML 1307 | JS-SCRIPT 4: 0241
  } catch (error) {
// HTML 1308 | JS-SCRIPT 4: 0242
    console.error("ASTROMATCH FACTOR DEBUG ERROR", error);
// HTML 1309 | JS-SCRIPT 4: 0243
    return null;
// HTML 1310 | JS-SCRIPT 4: 0244
  }
// HTML 1311 | JS-SCRIPT 4: 0245
}
// HTML 1312 | JS-SCRIPT 4: 0246

// HTML 1313 | JS-SCRIPT 4: 0247
function factorText(item) {
// HTML 1314 | JS-SCRIPT 4: 0248
  /*
// HTML 1315 | JS-SCRIPT 4: 0249
   * ASTROMATCH V1.2
// HTML 1316 | JS-SCRIPT 4: 0250
   *
// HTML 1317 | JS-SCRIPT 4: 0251
   * factorText() appartient au script classique.
// HTML 1318 | JS-SCRIPT 4: 0252
   * humanFactorLabel() appartient au script module.
// HTML 1319 | JS-SCRIPT 4: 0253
   *
// HTML 1320 | JS-SCRIPT 4: 0254
   * Le pont officiel entre les deux est :
// HTML 1321 | JS-SCRIPT 4: 0255
   * window.__astromatchHumanFactorLabel
// HTML 1322 | JS-SCRIPT 4: 0256
   */
// HTML 1323 | JS-SCRIPT 4: 0257

// HTML 1324 | JS-SCRIPT 4: 0258
  if (
// HTML 1325 | JS-SCRIPT 4: 0259
    typeof window !== "undefined" &&
// HTML 1326 | JS-SCRIPT 4: 0260
    typeof window.__astromatchHumanFactorLabel === "function"
// HTML 1327 | JS-SCRIPT 4: 0261
  ) {
// HTML 1328 | JS-SCRIPT 4: 0262
    return window.__astromatchHumanFactorLabel(item);
// HTML 1329 | JS-SCRIPT 4: 0263
  }
// HTML 1330 | JS-SCRIPT 4: 0264

// HTML 1331 | JS-SCRIPT 4: 0265
  /*
// HTML 1332 | JS-SCRIPT 4: 0266
   * Fallback de sécurité si le module n'est pas encore chargé.
// HTML 1333 | JS-SCRIPT 4: 0267
   */
// HTML 1334 | JS-SCRIPT 4: 0268
  if (typeof item === "string") {
// HTML 1335 | JS-SCRIPT 4: 0269
    return item;
// HTML 1336 | JS-SCRIPT 4: 0270
  }
// HTML 1337 | JS-SCRIPT 4: 0271

// HTML 1338 | JS-SCRIPT 4: 0272
  return (
// HTML 1339 | JS-SCRIPT 4: 0273
    item?.label ||
// HTML 1340 | JS-SCRIPT 4: 0274
    item?.title ||
// HTML 1341 | JS-SCRIPT 4: 0275
    item?.name ||
// HTML 1342 | JS-SCRIPT 4: 0276
    "Un facteur astrologique influence cette relation"
// HTML 1343 | JS-SCRIPT 4: 0277
  );
// HTML 1344 | JS-SCRIPT 4: 0278
}
// HTML 1345 | JS-SCRIPT 4: 0279

// HTML 1346 | JS-SCRIPT 4: 0280
function getAllFactors(result) {
// HTML 1347 | JS-SCRIPT 4: 0281
  const factors = [];
// HTML 1348 | JS-SCRIPT 4: 0282

// HTML 1349 | JS-SCRIPT 4: 0283
  for (const domain of (result?.domains || [])) {
// HTML 1350 | JS-SCRIPT 4: 0284
    for (const item of (domain?.strengths || [])) {
// HTML 1351 | JS-SCRIPT 4: 0285
      factors.push({
// HTML 1352 | JS-SCRIPT 4: 0286
        domain: domain.domain,
// HTML 1353 | JS-SCRIPT 4: 0287
        type: "strength",
// HTML 1354 | JS-SCRIPT 4: 0288
        item
// HTML 1355 | JS-SCRIPT 4: 0289
      });
// HTML 1356 | JS-SCRIPT 4: 0290
    }
// HTML 1357 | JS-SCRIPT 4: 0291

// HTML 1358 | JS-SCRIPT 4: 0292
    for (const item of (domain?.tensions || [])) {
// HTML 1359 | JS-SCRIPT 4: 0293
      factors.push({
// HTML 1360 | JS-SCRIPT 4: 0294
        domain: domain.domain,
// HTML 1361 | JS-SCRIPT 4: 0295
        type: "tension",
// HTML 1362 | JS-SCRIPT 4: 0296
        item
// HTML 1363 | JS-SCRIPT 4: 0297
      });
// HTML 1364 | JS-SCRIPT 4: 0298
    }
// HTML 1365 | JS-SCRIPT 4: 0299

// HTML 1366 | JS-SCRIPT 4: 0300
    for (const item of (domain?.mixed_factors || [])) {
// HTML 1367 | JS-SCRIPT 4: 0301
      factors.push({
// HTML 1368 | JS-SCRIPT 4: 0302
        domain: domain.domain,
// HTML 1369 | JS-SCRIPT 4: 0303
        type: "mixed",
// HTML 1370 | JS-SCRIPT 4: 0304
        item
// HTML 1371 | JS-SCRIPT 4: 0305
      });
// HTML 1372 | JS-SCRIPT 4: 0306
    }
// HTML 1373 | JS-SCRIPT 4: 0307

// HTML 1374 | JS-SCRIPT 4: 0308
    for (const item of (domain?.key_factors || [])) {
// HTML 1375 | JS-SCRIPT 4: 0309
      factors.push({
// HTML 1376 | JS-SCRIPT 4: 0310
        domain: domain.domain,
// HTML 1377 | JS-SCRIPT 4: 0311
        type: "key",
// HTML 1378 | JS-SCRIPT 4: 0312
        item
// HTML 1379 | JS-SCRIPT 4: 0313
      });
// HTML 1380 | JS-SCRIPT 4: 0314
    }
// HTML 1381 | JS-SCRIPT 4: 0315
  }
// HTML 1382 | JS-SCRIPT 4: 0316

// HTML 1383 | JS-SCRIPT 4: 0317
  return factors;
// HTML 1384 | JS-SCRIPT 4: 0318
}
// HTML 1385 | JS-SCRIPT 4: 0319

// HTML 1386 | JS-SCRIPT 4: 0320
function uniqueFactors(items) {
// HTML 1387 | JS-SCRIPT 4: 0321
  const seen = new Set();
// HTML 1388 | JS-SCRIPT 4: 0322

// HTML 1389 | JS-SCRIPT 4: 0323
  return items.filter(entry => {
// HTML 1390 | JS-SCRIPT 4: 0324
    const text = factorText(entry.item || entry);
// HTML 1391 | JS-SCRIPT 4: 0325

// HTML 1392 | JS-SCRIPT 4: 0326
    if (!text) return false;
// HTML 1393 | JS-SCRIPT 4: 0327

// HTML 1394 | JS-SCRIPT 4: 0328
    const key = text.toLowerCase().trim();
// HTML 1395 | JS-SCRIPT 4: 0329

// HTML 1396 | JS-SCRIPT 4: 0330
    if (seen.has(key)) return false;
// HTML 1397 | JS-SCRIPT 4: 0331

// HTML 1398 | JS-SCRIPT 4: 0332
    seen.add(key);
// HTML 1399 | JS-SCRIPT 4: 0333
    return true;
// HTML 1400 | JS-SCRIPT 4: 0334
  });
// HTML 1401 | JS-SCRIPT 4: 0335
}
// HTML 1402 | JS-SCRIPT 4: 0336

// HTML 1403 | JS-SCRIPT 4: 0337
function modeRelevantDomains(mode) {
// HTML 1404 | JS-SCRIPT 4: 0338
  if (mode === "love") {
// HTML 1405 | JS-SCRIPT 4: 0339
    return ["love", "emotions", "communication", "passion", "daily", "projects"];
// HTML 1406 | JS-SCRIPT 4: 0340
  }
// HTML 1407 | JS-SCRIPT 4: 0341

// HTML 1408 | JS-SCRIPT 4: 0342
  if (mode === "friendship") {
// HTML 1409 | JS-SCRIPT 4: 0343
    return ["communication", "emotions", "daily", "projects", "love"];
// HTML 1410 | JS-SCRIPT 4: 0344
  }
// HTML 1411 | JS-SCRIPT 4: 0345

// HTML 1412 | JS-SCRIPT 4: 0346
  return ["passion", "love", "communication", "emotions"];
// HTML 1413 | JS-SCRIPT 4: 0347
}
// HTML 1414 | JS-SCRIPT 4: 0348

// HTML 1415 | JS-SCRIPT 4: 0349

// HTML 1416 | JS-SCRIPT 4: 0350

// HTML 1417 | JS-SCRIPT 4: 0351
function uniqueDisplayFactors(factors) {
// HTML 1418 | JS-SCRIPT 4: 0352
  const seen = new Set();
// HTML 1419 | JS-SCRIPT 4: 0353

// HTML 1420 | JS-SCRIPT 4: 0354
  return (Array.isArray(factors) ? factors : []).filter((factor) => {
// HTML 1421 | JS-SCRIPT 4: 0355
    const item = factor?.item ?? factor;
// HTML 1422 | JS-SCRIPT 4: 0356

// HTML 1423 | JS-SCRIPT 4: 0357
    const key = String(
// HTML 1424 | JS-SCRIPT 4: 0358
      item?.rule_id ??
// HTML 1425 | JS-SCRIPT 4: 0359
      item?.ruleId ??
// HTML 1426 | JS-SCRIPT 4: 0360
      item?.factor_id ??
// HTML 1427 | JS-SCRIPT 4: 0361
      item?.factorId ??
// HTML 1428 | JS-SCRIPT 4: 0362
      item?.id ??
// HTML 1429 | JS-SCRIPT 4: 0363
      item?.code ??
// HTML 1430 | JS-SCRIPT 4: 0364
      item?.key ??
// HTML 1431 | JS-SCRIPT 4: 0365
      humanFactorLabel(item)
// HTML 1432 | JS-SCRIPT 4: 0366
    ).toUpperCase();
// HTML 1433 | JS-SCRIPT 4: 0367

// HTML 1434 | JS-SCRIPT 4: 0368
    if (seen.has(key)) {
// HTML 1435 | JS-SCRIPT 4: 0369
      return false;
// HTML 1436 | JS-SCRIPT 4: 0370
    }
// HTML 1437 | JS-SCRIPT 4: 0371

// HTML 1438 | JS-SCRIPT 4: 0372
    seen.add(key);
// HTML 1439 | JS-SCRIPT 4: 0373
    return true;
// HTML 1440 | JS-SCRIPT 4: 0374
  });
// HTML 1441 | JS-SCRIPT 4: 0375
}
// HTML 1442 | JS-SCRIPT 4: 0376

// HTML 1443 | JS-SCRIPT 4: 0377
function factorTypeIcon(type) {
// HTML 1444 | JS-SCRIPT 4: 0378
  switch (String(type || "").toLowerCase()) {
// HTML 1445 | JS-SCRIPT 4: 0379
    case "key":
// HTML 1446 | JS-SCRIPT 4: 0380
      return "◆";
// HTML 1447 | JS-SCRIPT 4: 0381
    case "strength":
// HTML 1448 | JS-SCRIPT 4: 0382
      return "✓";
// HTML 1449 | JS-SCRIPT 4: 0383
    case "tension":
// HTML 1450 | JS-SCRIPT 4: 0384
      return "⚠";
// HTML 1451 | JS-SCRIPT 4: 0385
    case "mixed":
// HTML 1452 | JS-SCRIPT 4: 0386
      return "⚖";
// HTML 1453 | JS-SCRIPT 4: 0387
    default:
// HTML 1454 | JS-SCRIPT 4: 0388
      return "•";
// HTML 1455 | JS-SCRIPT 4: 0389
  }
// HTML 1456 | JS-SCRIPT 4: 0390
}
// HTML 1457 | JS-SCRIPT 4: 0391

// HTML 1458 | JS-SCRIPT 4: 0392
function factorTypeLabel(type) {
// HTML 1459 | JS-SCRIPT 4: 0393
  switch (String(type || "").toLowerCase()) {
// HTML 1460 | JS-SCRIPT 4: 0394
    case "key":
// HTML 1461 | JS-SCRIPT 4: 0395
      return "Facteur clé";
// HTML 1462 | JS-SCRIPT 4: 0396
    case "strength":
// HTML 1463 | JS-SCRIPT 4: 0397
      return "Point favorable";
// HTML 1464 | JS-SCRIPT 4: 0398
    case "tension":
// HTML 1465 | JS-SCRIPT 4: 0399
      return "Point de vigilance";
// HTML 1466 | JS-SCRIPT 4: 0400
    case "mixed":
// HTML 1467 | JS-SCRIPT 4: 0401
      return "Facteur mixte";
// HTML 1468 | JS-SCRIPT 4: 0402
    default:
// HTML 1469 | JS-SCRIPT 4: 0403
      return "Facteur";
// HTML 1470 | JS-SCRIPT 4: 0404
  }
// HTML 1471 | JS-SCRIPT 4: 0405
}
// HTML 1472 | JS-SCRIPT 4: 0406

// HTML 1473 | JS-SCRIPT 4: 0407
function modeFactors(mode, result) {
// HTML 1474 | JS-SCRIPT 4: 0408
  const domains = modeRelevantDomains(mode);
// HTML 1475 | JS-SCRIPT 4: 0409
  const factors = getAllFactors(result)
// HTML 1476 | JS-SCRIPT 4: 0410
    .filter(f => domains.includes(f.domain));
// HTML 1477 | JS-SCRIPT 4: 0411

// HTML 1478 | JS-SCRIPT 4: 0412
  const factorKey = (entry) => {
// HTML 1479 | JS-SCRIPT 4: 0413
    const item = entry?.item ?? entry;
// HTML 1480 | JS-SCRIPT 4: 0414

// HTML 1481 | JS-SCRIPT 4: 0415
    return String(
// HTML 1482 | JS-SCRIPT 4: 0416
      item?.rule_id ??
// HTML 1483 | JS-SCRIPT 4: 0417
      item?.ruleId ??
// HTML 1484 | JS-SCRIPT 4: 0418
      item?.factor_id ??
// HTML 1485 | JS-SCRIPT 4: 0419
      item?.factorId ??
// HTML 1486 | JS-SCRIPT 4: 0420
      item?.id ??
// HTML 1487 | JS-SCRIPT 4: 0421
      item?.code ??
// HTML 1488 | JS-SCRIPT 4: 0422
      item?.key ??
// HTML 1489 | JS-SCRIPT 4: 0423
      humanFactorLabel(item)
// HTML 1490 | JS-SCRIPT 4: 0424
    ).toUpperCase();
// HTML 1491 | JS-SCRIPT 4: 0425
  };
// HTML 1492 | JS-SCRIPT 4: 0426

// HTML 1493 | JS-SCRIPT 4: 0427
  /*
// HTML 1494 | JS-SCRIPT 4: 0428
   * Un même facteur peut apparaître dans plusieurs catégories
// HTML 1495 | JS-SCRIPT 4: 0429
   * internes (strength / key / mixed / tension).
// HTML 1496 | JS-SCRIPT 4: 0430
   *
// HTML 1497 | JS-SCRIPT 4: 0431
   * Pour l'utilisateur final :
// HTML 1498 | JS-SCRIPT 4: 0432
   * → une seule occurrence par facteur.
// HTML 1499 | JS-SCRIPT 4: 0433
   *
// HTML 1500 | JS-SCRIPT 4: 0434
   * On conserve la catégorie la plus pertinente :
// HTML 1501 | JS-SCRIPT 4: 0435
   * tension/mixed > strength > key.
// HTML 1502 | JS-SCRIPT 4: 0436
   */
// HTML 1503 | JS-SCRIPT 4: 0437
  const priority = {
// HTML 1504 | JS-SCRIPT 4: 0438
    tension: 3,
// HTML 1505 | JS-SCRIPT 4: 0439
    mixed: 3,
// HTML 1506 | JS-SCRIPT 4: 0440
    strength: 2,
// HTML 1507 | JS-SCRIPT 4: 0441
    key: 1
// HTML 1508 | JS-SCRIPT 4: 0442
  };
// HTML 1509 | JS-SCRIPT 4: 0443

// HTML 1510 | JS-SCRIPT 4: 0444
  const byKey = new Map();
// HTML 1511 | JS-SCRIPT 4: 0445

// HTML 1512 | JS-SCRIPT 4: 0446
  for (const factor of factors) {
// HTML 1513 | JS-SCRIPT 4: 0447
    const key = factorKey(factor);
// HTML 1514 | JS-SCRIPT 4: 0448
    const current = byKey.get(key);
// HTML 1515 | JS-SCRIPT 4: 0449

// HTML 1516 | JS-SCRIPT 4: 0450
    if (!current) {
// HTML 1517 | JS-SCRIPT 4: 0451
      byKey.set(key, factor);
// HTML 1518 | JS-SCRIPT 4: 0452
      continue;
// HTML 1519 | JS-SCRIPT 4: 0453
    }
// HTML 1520 | JS-SCRIPT 4: 0454

// HTML 1521 | JS-SCRIPT 4: 0455
    const currentPriority = priority[current.type] || 0;
// HTML 1522 | JS-SCRIPT 4: 0456
    const factorPriority = priority[factor.type] || 0;
// HTML 1523 | JS-SCRIPT 4: 0457

// HTML 1524 | JS-SCRIPT 4: 0458
    if (factorPriority > currentPriority) {
// HTML 1525 | JS-SCRIPT 4: 0459
      byKey.set(key, factor);
// HTML 1526 | JS-SCRIPT 4: 0460
    }
// HTML 1527 | JS-SCRIPT 4: 0461
  }
// HTML 1528 | JS-SCRIPT 4: 0462

// HTML 1529 | JS-SCRIPT 4: 0463
  const typePriority = {
// HTML 1530 | JS-SCRIPT 4: 0464
    key: 4,
// HTML 1531 | JS-SCRIPT 4: 0465
    strength: 3,
// HTML 1532 | JS-SCRIPT 4: 0466
    tension: 2,
// HTML 1533 | JS-SCRIPT 4: 0467
    mixed: 1
// HTML 1534 | JS-SCRIPT 4: 0468
  };
// HTML 1535 | JS-SCRIPT 4: 0469

// HTML 1536 | JS-SCRIPT 4: 0470
  const contributionOf = (f) =>
// HTML 1537 | JS-SCRIPT 4: 0471
    Number(
// HTML 1538 | JS-SCRIPT 4: 0472
      f?.item?.contribution?.score ??
// HTML 1539 | JS-SCRIPT 4: 0473
      f?.item?.score ??
// HTML 1540 | JS-SCRIPT 4: 0474
      f?.score ??
// HTML 1541 | JS-SCRIPT 4: 0475
      0
// HTML 1542 | JS-SCRIPT 4: 0476
    );
// HTML 1543 | JS-SCRIPT 4: 0477

// HTML 1544 | JS-SCRIPT 4: 0478
  const unique = [...byKey.values()].sort((a, b) => {
// HTML 1545 | JS-SCRIPT 4: 0479
    const pa = typePriority[a.type] ?? 0;
// HTML 1546 | JS-SCRIPT 4: 0480
    const pb = typePriority[b.type] ?? 0;
// HTML 1547 | JS-SCRIPT 4: 0481

// HTML 1548 | JS-SCRIPT 4: 0482
    if (pb !== pa) return pb - pa;
// HTML 1549 | JS-SCRIPT 4: 0483

// HTML 1550 | JS-SCRIPT 4: 0484
    return contributionOf(b) - contributionOf(a);
// HTML 1551 | JS-SCRIPT 4: 0485
  });
// HTML 1552 | JS-SCRIPT 4: 0486

// HTML 1553 | JS-SCRIPT 4: 0487
  const positives = unique.filter(
// HTML 1554 | JS-SCRIPT 4: 0488
    f => f.type === "strength" || f.type === "key"
// HTML 1555 | JS-SCRIPT 4: 0489
  );
// HTML 1556 | JS-SCRIPT 4: 0490

// HTML 1557 | JS-SCRIPT 4: 0491
  const negatives = unique.filter(
// HTML 1558 | JS-SCRIPT 4: 0492
    f => f.type === "tension" || f.type === "mixed"
// HTML 1559 | JS-SCRIPT 4: 0493
  );
// HTML 1560 | JS-SCRIPT 4: 0494

// HTML 1561 | JS-SCRIPT 4: 0495
  return {
// HTML 1562 | JS-SCRIPT 4: 0496
    all: unique,
// HTML 1563 | JS-SCRIPT 4: 0497
    positives,
// HTML 1564 | JS-SCRIPT 4: 0498
    negatives
// HTML 1565 | JS-SCRIPT 4: 0499
  };
// HTML 1566 | JS-SCRIPT 4: 0500
}
// HTML 1567 | JS-SCRIPT 4: 0501

// HTML 1568 | JS-SCRIPT 4: 0502
function itemHtml(title, text, badge = "") {
// HTML 1569 | JS-SCRIPT 4: 0503
  return `
// HTML 1570 | JS-SCRIPT 4: 0504
    <div class="relationship-item">
// HTML 1571 | JS-SCRIPT 4: 0505
      <div class="flex items-start justify-between gap-3">
// HTML 1572 | JS-SCRIPT 4: 0506
        <div class="relationship-item-title">${relationshipEscapeHtml(title)}</div>
// HTML 1573 | JS-SCRIPT 4: 0507
        ${badge ? `<span class="relationship-badge">${relationshipEscapeHtml(badge)}</span>` : ""}
// HTML 1574 | JS-SCRIPT 4: 0508
      </div>
// HTML 1575 | JS-SCRIPT 4: 0509
      <div class="relationship-item-text">${relationshipEscapeHtml(text)}</div>
// HTML 1576 | JS-SCRIPT 4: 0510
    </div>
// HTML 1577 | JS-SCRIPT 4: 0511
  `;
// HTML 1578 | JS-SCRIPT 4: 0512
}
// HTML 1579 | JS-SCRIPT 4: 0513

// HTML 1580 | JS-SCRIPT 4: 0514
function emptyHtml(text) {
// HTML 1581 | JS-SCRIPT 4: 0515
  return `
// HTML 1582 | JS-SCRIPT 4: 0516
    <div class="relationship-empty">
// HTML 1583 | JS-SCRIPT 4: 0517
      ${relationshipEscapeHtml(text)}
// HTML 1584 | JS-SCRIPT 4: 0518
    </div>
// HTML 1585 | JS-SCRIPT 4: 0519
  `;
// HTML 1586 | JS-SCRIPT 4: 0520
}
// HTML 1587 | JS-SCRIPT 4: 0521

// HTML 1588 | JS-SCRIPT 4: 0522
function buildPositiveExplanation(mode, factor, score) {
// HTML 1589 | JS-SCRIPT 4: 0523
  const specific = relationshipSpecificExplanation(
// HTML 1590 | JS-SCRIPT 4: 0524
    factor,
// HTML 1591 | JS-SCRIPT 4: 0525
    mode,
// HTML 1592 | JS-SCRIPT 4: 0526
    factor?.type
// HTML 1593 | JS-SCRIPT 4: 0527
  );
// HTML 1594 | JS-SCRIPT 4: 0528

// HTML 1595 | JS-SCRIPT 4: 0529
  if (specific) return specific;
// HTML 1596 | JS-SCRIPT 4: 0530

// HTML 1597 | JS-SCRIPT 4: 0531
  if (mode === "love") {
// HTML 1598 | JS-SCRIPT 4: 0532
    return "Cette dynamique peut soutenir l'attirance, la complicité ou la construction du couple.";
// HTML 1599 | JS-SCRIPT 4: 0533
  }
// HTML 1600 | JS-SCRIPT 4: 0534

// HTML 1601 | JS-SCRIPT 4: 0535
  if (mode === "friendship") {
// HTML 1602 | JS-SCRIPT 4: 0536
    return "Cette dynamique peut soutenir la complicité, la confiance et une relation naturelle.";
// HTML 1603 | JS-SCRIPT 4: 0537
  }
// HTML 1604 | JS-SCRIPT 4: 0538

// HTML 1605 | JS-SCRIPT 4: 0539
  if (mode === "family") {
// HTML 1606 | JS-SCRIPT 4: 0540
    return "Cette dynamique peut favoriser la compréhension, la solidarité et une relation familiale plus naturelle.";
// HTML 1607 | JS-SCRIPT 4: 0541
  }
// HTML 1608 | JS-SCRIPT 4: 0542

// HTML 1609 | JS-SCRIPT 4: 0543
  return "Cette dynamique peut faciliter la connexion et les échanges dans une dynamique de séduction.";
// HTML 1610 | JS-SCRIPT 4: 0544
}
// HTML 1611 | JS-SCRIPT 4: 0545

// HTML 1612 | JS-SCRIPT 4: 0546
function buildNegativeExplanation(mode, factor) {
// HTML 1613 | JS-SCRIPT 4: 0547
  const specific = relationshipSpecificExplanation(
// HTML 1614 | JS-SCRIPT 4: 0548
    factor,
// HTML 1615 | JS-SCRIPT 4: 0549
    mode,
// HTML 1616 | JS-SCRIPT 4: 0550
    factor?.type
// HTML 1617 | JS-SCRIPT 4: 0551
  );
// HTML 1618 | JS-SCRIPT 4: 0552

// HTML 1619 | JS-SCRIPT 4: 0553
  if (specific) return specific;
// HTML 1620 | JS-SCRIPT 4: 0554

// HTML 1621 | JS-SCRIPT 4: 0555
  if (mode === "love") {
// HTML 1622 | JS-SCRIPT 4: 0556
    return "Cette dynamique peut créer des incompréhensions ou des tensions si elle est mal gérée.";
// HTML 1623 | JS-SCRIPT 4: 0557
  }
// HTML 1624 | JS-SCRIPT 4: 0558

// HTML 1625 | JS-SCRIPT 4: 0559
  if (mode === "friendship") {
// HTML 1626 | JS-SCRIPT 4: 0560
    return "Cette dynamique demande surtout de respecter le rythme et la façon de communiquer de chacun.";
// HTML 1627 | JS-SCRIPT 4: 0561
  }
// HTML 1628 | JS-SCRIPT 4: 0562

// HTML 1629 | JS-SCRIPT 4: 0563
  if (mode === "family") {
// HTML 1630 | JS-SCRIPT 4: 0564
    return "Cette dynamique demande surtout de respecter les différences de rythme, de sensibilité et de communication au sein de la famille.";
// HTML 1631 | JS-SCRIPT 4: 0565
  }
// HTML 1632 | JS-SCRIPT 4: 0566

// HTML 1633 | JS-SCRIPT 4: 0567
  return "Cette dynamique peut créer de la tension dans la séduction si elle devient un rapport de force.";
// HTML 1634 | JS-SCRIPT 4: 0568
}
// HTML 1635 | JS-SCRIPT 4: 0569

// HTML 1636 | JS-SCRIPT 4: 0570
function buildAdvice(mode, score, factors) {
// HTML 1637 | JS-SCRIPT 4: 0571
  const advice = [];
// HTML 1638 | JS-SCRIPT 4: 0572

// HTML 1639 | JS-SCRIPT 4: 0573
  const hasFactor = (...patterns) =>
// HTML 1640 | JS-SCRIPT 4: 0574
    factors.all.some(f => {
// HTML 1641 | JS-SCRIPT 4: 0575
      const text = factorText(f.item);
// HTML 1642 | JS-SCRIPT 4: 0576
      return patterns.some(pattern => pattern.test(text));
// HTML 1643 | JS-SCRIPT 4: 0577
    });
// HTML 1644 | JS-SCRIPT 4: 0578

// HTML 1645 | JS-SCRIPT 4: 0579
  if (mode === "love") {
// HTML 1646 | JS-SCRIPT 4: 0580
    advice.push({
// HTML 1647 | JS-SCRIPT 4: 0581
      title: "Communique clairement",
// HTML 1648 | JS-SCRIPT 4: 0582
      text: "Quand quelque chose est important, dis-le directement plutôt que de laisser l'autre deviner."
// HTML 1649 | JS-SCRIPT 4: 0583
    });
// HTML 1650 | JS-SCRIPT 4: 0584

// HTML 1651 | JS-SCRIPT 4: 0585
    advice.push({
// HTML 1652 | JS-SCRIPT 4: 0586
      title: "Laisse respirer la relation",
// HTML 1653 | JS-SCRIPT 4: 0587
      text: "La complémentarité fonctionne mieux quand chacun conserve son espace et son rythme."
// HTML 1654 | JS-SCRIPT 4: 0588
    });
// HTML 1655 | JS-SCRIPT 4: 0589

// HTML 1656 | JS-SCRIPT 4: 0590
    if (
// HTML 1657 | JS-SCRIPT 4: 0591
      hasFactor(
// HTML 1658 | JS-SCRIPT 4: 0592
        /v[ée]nus.*jupiter/i,
// HTML 1659 | JS-SCRIPT 4: 0593
        /jupiter.*v[ée]nus/i,
// HTML 1660 | JS-SCRIPT 4: 0594
        /harmonie affective/i,
// HTML 1661 | JS-SCRIPT 4: 0595
        /chaleureuse/i
// HTML 1662 | JS-SCRIPT 4: 0596
      )
// HTML 1663 | JS-SCRIPT 4: 0597
    ) {
// HTML 1664 | JS-SCRIPT 4: 0598
      advice.push({
// HTML 1665 | JS-SCRIPT 4: 0599
        title: "Entretiens la générosité",
// HTML 1666 | JS-SCRIPT 4: 0600
        text: "Quand l'affection et la générosité circulent naturellement, prends le temps de les entretenir sans les considérer comme acquises."
// HTML 1667 | JS-SCRIPT 4: 0601
      });
// HTML 1668 | JS-SCRIPT 4: 0602
    }
// HTML 1669 | JS-SCRIPT 4: 0603

// HTML 1670 | JS-SCRIPT 4: 0604
    if (
// HTML 1671 | JS-SCRIPT 4: 0605
      hasFactor(
// HTML 1672 | JS-SCRIPT 4: 0606
        /lune.*v[ée]nus/i,
// HTML 1673 | JS-SCRIPT 4: 0607
        /v[ée]nus.*lune/i,
// HTML 1674 | JS-SCRIPT 4: 0608
        /harmonie.*affective/i
// HTML 1675 | JS-SCRIPT 4: 0609
      )
// HTML 1676 | JS-SCRIPT 4: 0610
    ) {
// HTML 1677 | JS-SCRIPT 4: 0611
      advice.push({
// HTML 1678 | JS-SCRIPT 4: 0612
        title: "Nourris la proximité",
// HTML 1679 | JS-SCRIPT 4: 0613
        text: "Les petites attentions et les moments de douceur peuvent renforcer naturellement le sentiment de proximité."
// HTML 1680 | JS-SCRIPT 4: 0614
      });
// HTML 1681 | JS-SCRIPT 4: 0615
    }
// HTML 1682 | JS-SCRIPT 4: 0616

// HTML 1683 | JS-SCRIPT 4: 0617
    if (
// HTML 1684 | JS-SCRIPT 4: 0618
      factors.negatives.some(f =>
// HTML 1685 | JS-SCRIPT 4: 0619
        /mercury.*moon|moon.*mercury|mercure.*lune|lune.*mercure/i
// HTML 1686 | JS-SCRIPT 4: 0620
          .test(factorText(f.item))
// HTML 1687 | JS-SCRIPT 4: 0621
      )
// HTML 1688 | JS-SCRIPT 4: 0622
    ) {
// HTML 1689 | JS-SCRIPT 4: 0623
      advice.push({
// HTML 1690 | JS-SCRIPT 4: 0624
        title: "En cas de malentendu",
// HTML 1691 | JS-SCRIPT 4: 0625
        text: "Reviens aux faits, reformule et demande ce que l'autre voulait réellement dire."
// HTML 1692 | JS-SCRIPT 4: 0626
      });
// HTML 1693 | JS-SCRIPT 4: 0627
    }
// HTML 1694 | JS-SCRIPT 4: 0628
  }
// HTML 1695 | JS-SCRIPT 4: 0629

// HTML 1696 | JS-SCRIPT 4: 0630
  if (mode === "friendship") {
// HTML 1697 | JS-SCRIPT 4: 0631
    advice.push({
// HTML 1698 | JS-SCRIPT 4: 0632
      title: "Misez sur la simplicité",
// HTML 1699 | JS-SCRIPT 4: 0633
      text: "Les meilleurs moments viennent souvent des échanges naturels, sans chercher à surinterpréter chaque réaction."
// HTML 1700 | JS-SCRIPT 4: 0634
    });
// HTML 1701 | JS-SCRIPT 4: 0635

// HTML 1702 | JS-SCRIPT 4: 0636
    advice.push({
// HTML 1703 | JS-SCRIPT 4: 0637
      title: "Entretenez la complicité",
// HTML 1704 | JS-SCRIPT 4: 0638
      text: "Une activité partagée ou un projet commun peut renforcer la dynamique."
// HTML 1705 | JS-SCRIPT 4: 0639
    });
// HTML 1706 | JS-SCRIPT 4: 0640

// HTML 1707 | JS-SCRIPT 4: 0641
    advice.push({
// HTML 1708 | JS-SCRIPT 4: 0642
      title: "Respecte le rythme",
// HTML 1709 | JS-SCRIPT 4: 0643
      text: "Une bonne amitié n'a pas besoin d'être constamment présente pour rester solide."
// HTML 1710 | JS-SCRIPT 4: 0644
    });
// HTML 1711 | JS-SCRIPT 4: 0645

// HTML 1712 | JS-SCRIPT 4: 0646
    if (
// HTML 1713 | JS-SCRIPT 4: 0647
      hasFactor(
// HTML 1714 | JS-SCRIPT 4: 0648
        /mercure.*v[ée]nus/i,
// HTML 1715 | JS-SCRIPT 4: 0649
        /v[ée]nus.*mercure/i,
// HTML 1716 | JS-SCRIPT 4: 0650
        /mercure.*mars/i,
// HTML 1717 | JS-SCRIPT 4: 0651
        /mars.*mercure/i
// HTML 1718 | JS-SCRIPT 4: 0652
      )
// HTML 1719 | JS-SCRIPT 4: 0653
    ) {
// HTML 1720 | JS-SCRIPT 4: 0654
      advice.push({
// HTML 1721 | JS-SCRIPT 4: 0655
        title: "Profite de la fluidité",
// HTML 1722 | JS-SCRIPT 4: 0656
        text: "Quand les échanges sont naturellement stimulants, laisse la conversation et les activités communes créer la complicité."
// HTML 1723 | JS-SCRIPT 4: 0657
      });
// HTML 1724 | JS-SCRIPT 4: 0658
    }
// HTML 1725 | JS-SCRIPT 4: 0659
  }
// HTML 1726 | JS-SCRIPT 4: 0660

// HTML 1727 | JS-SCRIPT 4: 0661

// HTML 1728 | JS-SCRIPT 4: 0662
  if (mode === "family") {
// HTML 1729 | JS-SCRIPT 4: 0663
    advice.push({
// HTML 1730 | JS-SCRIPT 4: 0664
      title: "Garde un dialogue simple",
// HTML 1731 | JS-SCRIPT 4: 0665
      text: "Les relations familiales gagnent souvent à privilégier les échanges directs, calmes et sans surinterprétation."
// HTML 1732 | JS-SCRIPT 4: 0666
    });
// HTML 1733 | JS-SCRIPT 4: 0667

// HTML 1734 | JS-SCRIPT 4: 0668
    advice.push({
// HTML 1735 | JS-SCRIPT 4: 0669
      title: "Respecte les différences",
// HTML 1736 | JS-SCRIPT 4: 0670
      text: "Une bonne dynamique familiale peut exister même lorsque chacun fonctionne ou ressent les choses différemment."
// HTML 1737 | JS-SCRIPT 4: 0671
    });
// HTML 1738 | JS-SCRIPT 4: 0672

// HTML 1739 | JS-SCRIPT 4: 0673
    advice.push({
// HTML 1740 | JS-SCRIPT 4: 0674
      title: "Entretenez le lien",
// HTML 1741 | JS-SCRIPT 4: 0675
      text: "Les moments partagés, les petites attentions et les projets communs peuvent renforcer naturellement la proximité."
// HTML 1742 | JS-SCRIPT 4: 0676
    });
// HTML 1743 | JS-SCRIPT 4: 0677
  }
// HTML 1744 | JS-SCRIPT 4: 0678

// HTML 1745 | JS-SCRIPT 4: 0679
  if (mode === "flirt") {
// HTML 1746 | JS-SCRIPT 4: 0680
    advice.push({
// HTML 1747 | JS-SCRIPT 4: 0681
      title: "Joue sur la légèreté",
// HTML 1748 | JS-SCRIPT 4: 0682
      text: "Humour, curiosité et échanges naturels sont généralement plus efficaces que la pression ou les déclarations trop rapides."
// HTML 1749 | JS-SCRIPT 4: 0683
    });
// HTML 1750 | JS-SCRIPT 4: 0684

// HTML 1751 | JS-SCRIPT 4: 0685
    advice.push({
// HTML 1752 | JS-SCRIPT 4: 0686
      title: "Observe la réciprocité",
// HTML 1753 | JS-SCRIPT 4: 0687
      text: "Avance lorsque l'intérêt est partagé et laisse de l'espace lorsque les signaux sont ambigus."
// HTML 1754 | JS-SCRIPT 4: 0688
    });
// HTML 1755 | JS-SCRIPT 4: 0689

// HTML 1756 | JS-SCRIPT 4: 0690
    if (
// HTML 1757 | JS-SCRIPT 4: 0691
      factors.negatives.some(f =>
// HTML 1758 | JS-SCRIPT 4: 0692
        /venus.*mars|mars.*venus|v[ée]nus.*mars/i
// HTML 1759 | JS-SCRIPT 4: 0693
          .test(factorText(f.item))
// HTML 1760 | JS-SCRIPT 4: 0694
      )
// HTML 1761 | JS-SCRIPT 4: 0695
    ) {
// HTML 1762 | JS-SCRIPT 4: 0696
      advice.push({
// HTML 1763 | JS-SCRIPT 4: 0697
        title: "Canalise l'intensité",
// HTML 1764 | JS-SCRIPT 4: 0698
        text: "La tension peut être séduisante, mais évite les provocations, les jalousies fabriquées et les rapports de force."
// HTML 1765 | JS-SCRIPT 4: 0699
      });
// HTML 1766 | JS-SCRIPT 4: 0700
    }
// HTML 1767 | JS-SCRIPT 4: 0701

// HTML 1768 | JS-SCRIPT 4: 0702
    if (
// HTML 1769 | JS-SCRIPT 4: 0703
      hasFactor(
// HTML 1770 | JS-SCRIPT 4: 0704
        /venus.*mars/i,
// HTML 1771 | JS-SCRIPT 4: 0705
        /mars.*venus/i,
// HTML 1772 | JS-SCRIPT 4: 0706
        /attirance.*intense/i,
// HTML 1773 | JS-SCRIPT 4: 0707
        /chimie/i
// HTML 1774 | JS-SCRIPT 4: 0708
      )
// HTML 1775 | JS-SCRIPT 4: 0709
    ) {
// HTML 1776 | JS-SCRIPT 4: 0710
      advice.push({
// HTML 1777 | JS-SCRIPT 4: 0711
        title: "Laisse monter l'alchimie",
// HTML 1778 | JS-SCRIPT 4: 0712
        text: "Une forte attirance gagne souvent à rester spontanée : montre ton intérêt sans chercher à forcer le rythme."
// HTML 1779 | JS-SCRIPT 4: 0713
      });
// HTML 1780 | JS-SCRIPT 4: 0714
    }
// HTML 1781 | JS-SCRIPT 4: 0715

// HTML 1782 | JS-SCRIPT 4: 0716
    if (
// HTML 1783 | JS-SCRIPT 4: 0717
      hasFactor(
// HTML 1784 | JS-SCRIPT 4: 0718
        /jupiter.*uranus/i,
// HTML 1785 | JS-SCRIPT 4: 0719
        /uranus.*jupiter/i,
// HTML 1786 | JS-SCRIPT 4: 0720
        /spontan[ée]it[ée]/i,
// HTML 1787 | JS-SCRIPT 4: 0721
        /curiosit[ée]/i
// HTML 1788 | JS-SCRIPT 4: 0722
      )
// HTML 1789 | JS-SCRIPT 4: 0723
    ) {
// HTML 1790 | JS-SCRIPT 4: 0724
      advice.push({
// HTML 1791 | JS-SCRIPT 4: 0725
        title: "Garde une part de surprise",
// HTML 1792 | JS-SCRIPT 4: 0726
        text: "La curiosité et la nouveauté peuvent nourrir l'attirance : laisse de la place à l'imprévu."
// HTML 1793 | JS-SCRIPT 4: 0727
      });
// HTML 1794 | JS-SCRIPT 4: 0728
    }
// HTML 1795 | JS-SCRIPT 4: 0729
  }
// HTML 1796 | JS-SCRIPT 4: 0730

// HTML 1797 | JS-SCRIPT 4: 0731
  return advice.slice(0, 3);
// HTML 1798 | JS-SCRIPT 4: 0732
}
// HTML 1799 | JS-SCRIPT 4: 0733
function relationshipSpecificExplanation(factor, mode, classification) {
// HTML 1800 | JS-SCRIPT 4: 0734
  const item = factor?.item ?? factor;
// HTML 1801 | JS-SCRIPT 4: 0735

// HTML 1802 | JS-SCRIPT 4: 0736
  const id = String(
// HTML 1803 | JS-SCRIPT 4: 0737
    item?.rule_id ??
// HTML 1804 | JS-SCRIPT 4: 0738
    item?.ruleId ??
// HTML 1805 | JS-SCRIPT 4: 0739
    item?.factor_id ??
// HTML 1806 | JS-SCRIPT 4: 0740
    item?.factorId ??
// HTML 1807 | JS-SCRIPT 4: 0741
    item?.id ??
// HTML 1808 | JS-SCRIPT 4: 0742
    item?.code ??
// HTML 1809 | JS-SCRIPT 4: 0743
    item?.key ??
// HTML 1810 | JS-SCRIPT 4: 0744
    ""
// HTML 1811 | JS-SCRIPT 4: 0745
  ).toUpperCase();
// HTML 1812 | JS-SCRIPT 4: 0746

// HTML 1813 | JS-SCRIPT 4: 0747
  const texts = {
// HTML 1814 | JS-SCRIPT 4: 0748
    "V11_SUN_VENUS_OPPOSITION": {
// HTML 1815 | JS-SCRIPT 4: 0749
      mixed:
// HTML 1816 | JS-SCRIPT 4: 0750
        "Attirance et complémentarité peuvent être fortes, mais chacun peut avoir une façon différente d'exprimer l'affection ou de définir la proximité.",
// HTML 1817 | JS-SCRIPT 4: 0751
      advice:
// HTML 1818 | JS-SCRIPT 4: 0752
        "Cherche l'équilibre entre rapprochement et liberté personnelle."
// HTML 1819 | JS-SCRIPT 4: 0753
    },
// HTML 1820 | JS-SCRIPT 4: 0754

// HTML 1821 | JS-SCRIPT 4: 0755
    "V11_VENUS_JUPITER_TRINE": {
// HTML 1822 | JS-SCRIPT 4: 0756
      favorable:
// HTML 1823 | JS-SCRIPT 4: 0757
        "Une dynamique naturellement chaleureuse peut faciliter la générosité, l'affection et le plaisir d'être ensemble.",
// HTML 1824 | JS-SCRIPT 4: 0758
      advice:
// HTML 1825 | JS-SCRIPT 4: 0759
        "Entretiens cette facilité sans prendre les bons moments pour acquis."
// HTML 1826 | JS-SCRIPT 4: 0760
    },
// HTML 1827 | JS-SCRIPT 4: 0761

// HTML 1828 | JS-SCRIPT 4: 0762
    "V11B_JUPITER_NEPTUNE_TRINE": {
// HTML 1829 | JS-SCRIPT 4: 0763
      favorable:
// HTML 1830 | JS-SCRIPT 4: 0764
        "Cette dynamique peut favoriser la bienveillance, l'ouverture et une vision positive de l'autre.",
// HTML 1831 | JS-SCRIPT 4: 0765
      advice:
// HTML 1832 | JS-SCRIPT 4: 0766
        "Profite de cette ouverture tout en gardant les attentes réalistes."
// HTML 1833 | JS-SCRIPT 4: 0767
    },
// HTML 1834 | JS-SCRIPT 4: 0768

// HTML 1835 | JS-SCRIPT 4: 0769
    "V11_MERCURY_MOON_SQUARE": {
// HTML 1836 | JS-SCRIPT 4: 0770
      tension:
// HTML 1837 | JS-SCRIPT 4: 0771
        "Le risque principal est le décalage entre ce qui est dit et ce qui est ressenti. Une parole peut être comprise différemment de l'intention initiale.",
// HTML 1838 | JS-SCRIPT 4: 0772
      advice:
// HTML 1839 | JS-SCRIPT 4: 0773
        "Quand un sujet compte, dis clairement ce que tu ressens et vérifie ce que l'autre a compris."
// HTML 1840 | JS-SCRIPT 4: 0774
    },
// HTML 1841 | JS-SCRIPT 4: 0775

// HTML 1842 | JS-SCRIPT 4: 0776
    "V11_VENUS_MARS_SQUARE": {
// HTML 1843 | JS-SCRIPT 4: 0777
      tension:
// HTML 1844 | JS-SCRIPT 4: 0778
        "La chimie et l'attirance peuvent être fortes, mais elles peuvent aussi créer de l'impatience, des réactions vives ou des rapports de force.",
// HTML 1845 | JS-SCRIPT 4: 0779
      advice:
// HTML 1846 | JS-SCRIPT 4: 0780
        "Entretiens la tension positive sans transformer les désaccords en compétition."
// HTML 1847 | JS-SCRIPT 4: 0781
    },
// HTML 1848 | JS-SCRIPT 4: 0782

// HTML 1849 | JS-SCRIPT 4: 0783
    "V11B_JUPITER_URANUS_TRINE": {
// HTML 1850 | JS-SCRIPT 4: 0784
      favorable:
// HTML 1851 | JS-SCRIPT 4: 0785
        "Cette dynamique peut apporter ouverture, curiosité et envie d'expérimenter de nouvelles choses ensemble.",
// HTML 1852 | JS-SCRIPT 4: 0786
      advice:
// HTML 1853 | JS-SCRIPT 4: 0787
        "Laisse de la place à la spontanéité et aux projets nouveaux."
// HTML 1854 | JS-SCRIPT 4: 0788
    }
// HTML 1855 | JS-SCRIPT 4: 0789
  };
// HTML 1856 | JS-SCRIPT 4: 0790

// HTML 1857 | JS-SCRIPT 4: 0791
  const data = texts[id];
// HTML 1858 | JS-SCRIPT 4: 0792

// HTML 1859 | JS-SCRIPT 4: 0793
  if (!data) return null;
// HTML 1860 | JS-SCRIPT 4: 0794

// HTML 1861 | JS-SCRIPT 4: 0795
  if (classification === "mixed") {
// HTML 1862 | JS-SCRIPT 4: 0796
    return data.mixed || data.advice || null;
// HTML 1863 | JS-SCRIPT 4: 0797
  }
// HTML 1864 | JS-SCRIPT 4: 0798

// HTML 1865 | JS-SCRIPT 4: 0799
  if (classification === "tension") {
// HTML 1866 | JS-SCRIPT 4: 0800
    return data.tension || data.advice || null;
// HTML 1867 | JS-SCRIPT 4: 0801
  }
// HTML 1868 | JS-SCRIPT 4: 0802

// HTML 1869 | JS-SCRIPT 4: 0803
  return data.favorable || data.advice || null;
// HTML 1870 | JS-SCRIPT 4: 0804
}
// HTML 1871 | JS-SCRIPT 4: 0805

// HTML 1872 | JS-SCRIPT 4: 0806
function renderRelationshipMode() {
// HTML 1873 | JS-SCRIPT 4: 0807
  const result = ASTROMATCH_RESULT;
// HTML 1874 | JS-SCRIPT 4: 0808

// HTML 1875 | JS-SCRIPT 4: 0809
  if (!result) return;
// HTML 1876 | JS-SCRIPT 4: 0810

// HTML 1877 | JS-SCRIPT 4: 0811
  const meta = RELATIONSHIP_META[CURRENT_RELATIONSHIP_MODE];
// HTML 1878 | JS-SCRIPT 4: 0812
  const score = calculateRelationshipScore(
// HTML 1879 | JS-SCRIPT 4: 0813
    CURRENT_RELATIONSHIP_MODE,
// HTML 1880 | JS-SCRIPT 4: 0814
    result
// HTML 1881 | JS-SCRIPT 4: 0815
  );
// HTML 1882 | JS-SCRIPT 4: 0816

// HTML 1883 | JS-SCRIPT 4: 0817
  const factors = modeFactors(
// HTML 1884 | JS-SCRIPT 4: 0818
    CURRENT_RELATIONSHIP_MODE,
// HTML 1885 | JS-SCRIPT 4: 0819
    result
// HTML 1886 | JS-SCRIPT 4: 0820
  );
// HTML 1887 | JS-SCRIPT 4: 0821

// HTML 1888 | JS-SCRIPT 4: 0822
  const scoreEl = document.getElementById("relationshipScore");
// HTML 1889 | JS-SCRIPT 4: 0823
  const levelEl = document.getElementById("relationshipLevel");
// HTML 1890 | JS-SCRIPT 4: 0824
  const iconEl = document.getElementById("relationshipIcon");
// HTML 1891 | JS-SCRIPT 4: 0825
  const titleEl = document.getElementById("relationshipTitle");
// HTML 1892 | JS-SCRIPT 4: 0826
  const subtitleEl = document.getElementById("relationshipSubtitle");
// HTML 1893 | JS-SCRIPT 4: 0827

// HTML 1894 | JS-SCRIPT 4: 0828
  if (iconEl) iconEl.textContent = meta.icon;
// HTML 1895 | JS-SCRIPT 4: 0829
  if (titleEl) titleEl.textContent = meta.title;
// HTML 1896 | JS-SCRIPT 4: 0830
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;
// HTML 1897 | JS-SCRIPT 4: 0831

// HTML 1898 | JS-SCRIPT 4: 0832
  if (scoreEl) {
// HTML 1899 | JS-SCRIPT 4: 0833
    scoreEl.textContent = Number(score).toFixed(0);
// HTML 1900 | JS-SCRIPT 4: 0834
  }
// HTML 1901 | JS-SCRIPT 4: 0835

// HTML 1902 | JS-SCRIPT 4: 0836
  if (levelEl) {
// HTML 1903 | JS-SCRIPT 4: 0837
    levelEl.textContent = relationshipLevel(score);
// HTML 1904 | JS-SCRIPT 4: 0838
  }
// HTML 1905 | JS-SCRIPT 4: 0839

// HTML 1906 | JS-SCRIPT 4: 0840
  for (const id of ["love", "friendship", "flirt", "family"]) {
// HTML 1907 | JS-SCRIPT 4: 0841
    const tab = document.getElementById(`tab-${id}`);
// HTML 1908 | JS-SCRIPT 4: 0842

// HTML 1909 | JS-SCRIPT 4: 0843
    if (tab) {
// HTML 1910 | JS-SCRIPT 4: 0844
      tab.classList.toggle(
// HTML 1911 | JS-SCRIPT 4: 0845
        "active",
// HTML 1912 | JS-SCRIPT 4: 0846
        id === CURRENT_RELATIONSHIP_MODE
// HTML 1913 | JS-SCRIPT 4: 0847
      );
// HTML 1914 | JS-SCRIPT 4: 0848
    }
// HTML 1915 | JS-SCRIPT 4: 0849
  }
// HTML 1916 | JS-SCRIPT 4: 0850

// HTML 1917 | JS-SCRIPT 4: 0851
  const whyMatch = document.getElementById("whyMatch");
// HTML 1918 | JS-SCRIPT 4: 0852
  const whyNot = document.getElementById("whyNot");
// HTML 1919 | JS-SCRIPT 4: 0853
  const advice = document.getElementById("advice");
// HTML 1920 | JS-SCRIPT 4: 0854
  const doList = document.getElementById("doList");
// HTML 1921 | JS-SCRIPT 4: 0855
  const dontList = document.getElementById("dontList");
// HTML 1922 | JS-SCRIPT 4: 0856
  const relationshipFactors = document.getElementById("relationshipFactors");
// HTML 1923 | JS-SCRIPT 4: 0857

// HTML 1924 | JS-SCRIPT 4: 0858
  if (whyMatch) {
// HTML 1925 | JS-SCRIPT 4: 0859
    if (!factors.positives.length) {
// HTML 1926 | JS-SCRIPT 4: 0860
      whyMatch.innerHTML = emptyHtml(
// HTML 1927 | JS-SCRIPT 4: 0861
        "Aucune dynamique favorable particulièrement marquée n’a été détectée ici."
// HTML 1928 | JS-SCRIPT 4: 0862
      );
// HTML 1929 | JS-SCRIPT 4: 0863
    } else {
// HTML 1930 | JS-SCRIPT 4: 0864
      whyMatch.innerHTML = factors.positives
// HTML 1931 | JS-SCRIPT 4: 0865
        .slice(0, 4)
// HTML 1932 | JS-SCRIPT 4: 0866
        .map(f =>
// HTML 1933 | JS-SCRIPT 4: 0867
          itemHtml(
// HTML 1934 | JS-SCRIPT 4: 0868
            factorText(f.item),
// HTML 1935 | JS-SCRIPT 4: 0869
            buildPositiveExplanation(
// HTML 1936 | JS-SCRIPT 4: 0870
              CURRENT_RELATIONSHIP_MODE,
// HTML 1937 | JS-SCRIPT 4: 0871
              f,
// HTML 1938 | JS-SCRIPT 4: 0872
              score
// HTML 1939 | JS-SCRIPT 4: 0873
            ),
// HTML 1940 | JS-SCRIPT 4: 0874
            null
// HTML 1941 | JS-SCRIPT 4: 0875
          )
// HTML 1942 | JS-SCRIPT 4: 0876
        )
// HTML 1943 | JS-SCRIPT 4: 0877
        .join("");
// HTML 1944 | JS-SCRIPT 4: 0878
    }
// HTML 1945 | JS-SCRIPT 4: 0879
  }
// HTML 1946 | JS-SCRIPT 4: 0880

// HTML 1947 | JS-SCRIPT 4: 0881
  if (whyNot) {
// HTML 1948 | JS-SCRIPT 4: 0882
    if (!factors.negatives.length) {
// HTML 1949 | JS-SCRIPT 4: 0883
      whyNot.innerHTML = emptyHtml(
// HTML 1950 | JS-SCRIPT 4: 0884
        "Aucun facteur de tension majeur n’a été détecté dans les domaines qui comptent le plus pour cette dynamique."
// HTML 1951 | JS-SCRIPT 4: 0885
      );
// HTML 1952 | JS-SCRIPT 4: 0886
    } else {
// HTML 1953 | JS-SCRIPT 4: 0887
      whyNot.innerHTML = factors.negatives
// HTML 1954 | JS-SCRIPT 4: 0888
        .slice(0, 4)
// HTML 1955 | JS-SCRIPT 4: 0889
        .map(f =>
// HTML 1956 | JS-SCRIPT 4: 0890
          itemHtml(
// HTML 1957 | JS-SCRIPT 4: 0891
            factorText(f.item),
// HTML 1958 | JS-SCRIPT 4: 0892
            buildNegativeExplanation(
// HTML 1959 | JS-SCRIPT 4: 0893
              CURRENT_RELATIONSHIP_MODE,
// HTML 1960 | JS-SCRIPT 4: 0894
              f
// HTML 1961 | JS-SCRIPT 4: 0895
            ),
// HTML 1962 | JS-SCRIPT 4: 0896
            null
// HTML 1963 | JS-SCRIPT 4: 0897
          )
// HTML 1964 | JS-SCRIPT 4: 0898
        )
// HTML 1965 | JS-SCRIPT 4: 0899
        .join("");
// HTML 1966 | JS-SCRIPT 4: 0900
    }
// HTML 1967 | JS-SCRIPT 4: 0901
  }
// HTML 1968 | JS-SCRIPT 4: 0902

// HTML 1969 | JS-SCRIPT 4: 0903
  const adviceItems = buildAdvice(
// HTML 1970 | JS-SCRIPT 4: 0904
    CURRENT_RELATIONSHIP_MODE,
// HTML 1971 | JS-SCRIPT 4: 0905
    score,
// HTML 1972 | JS-SCRIPT 4: 0906
    factors
// HTML 1973 | JS-SCRIPT 4: 0907
  );
// HTML 1974 | JS-SCRIPT 4: 0908

// HTML 1975 | JS-SCRIPT 4: 0909
  if (advice) {
// HTML 1976 | JS-SCRIPT 4: 0910
    advice.innerHTML = adviceItems
// HTML 1977 | JS-SCRIPT 4: 0911
      .map(a => itemHtml(a.title, a.text))
// HTML 1978 | JS-SCRIPT 4: 0912
      .join("");
// HTML 1979 | JS-SCRIPT 4: 0913
  }
// HTML 1980 | JS-SCRIPT 4: 0914

// HTML 1981 | JS-SCRIPT 4: 0915
  if (doList) {
// HTML 1982 | JS-SCRIPT 4: 0916
    const list = [];
// HTML 1983 | JS-SCRIPT 4: 0917

// HTML 1984 | JS-SCRIPT 4: 0918
    if (CURRENT_RELATIONSHIP_MODE === "love") {
// HTML 1985 | JS-SCRIPT 4: 0919
      list.push("Exprime clairement tes intentions.");
// HTML 1986 | JS-SCRIPT 4: 0920
      list.push("Laisse de l'espace à l'autre.");
// HTML 1987 | JS-SCRIPT 4: 0921
      list.push("Privilégie les discussions directes.");
// HTML 1988 | JS-SCRIPT 4: 0922
    }
// HTML 1989 | JS-SCRIPT 4: 0923

// HTML 1990 | JS-SCRIPT 4: 0924
    if (CURRENT_RELATIONSHIP_MODE === "friendship") {
// HTML 1991 | JS-SCRIPT 4: 0925
      list.push("Entretenez une complicité simple.");
// HTML 1992 | JS-SCRIPT 4: 0926
      list.push("Partagez des activités ou projets.");
// HTML 1993 | JS-SCRIPT 4: 0927
      list.push("Respecte les moments de distance.");
// HTML 1994 | JS-SCRIPT 4: 0928
    }
// HTML 1995 | JS-SCRIPT 4: 0929

// HTML 1996 | JS-SCRIPT 4: 0930
    if (CURRENT_RELATIONSHIP_MODE === "flirt") {
// HTML 1997 | JS-SCRIPT 4: 0931
      list.push("Reste léger et naturel.");
// HTML 1998 | JS-SCRIPT 4: 0932
      list.push("Observe la réciprocité.");
// HTML 1999 | JS-SCRIPT 4: 0933
      list.push("Utilise l'humour plutôt que la pression.");
// HTML 2000 | JS-SCRIPT 4: 0934
    }
// HTML 2001 | JS-SCRIPT 4: 0935

// HTML 2002 | JS-SCRIPT 4: 0936
    doList.innerHTML = list
// HTML 2003 | JS-SCRIPT 4: 0937
      .map(x => `<div>• ${relationshipEscapeHtml(x)}</div>`)
// HTML 2004 | JS-SCRIPT 4: 0938
      .join("");
// HTML 2005 | JS-SCRIPT 4: 0939
  }
// HTML 2006 | JS-SCRIPT 4: 0940

// HTML 2007 | JS-SCRIPT 4: 0941
  if (dontList) {
// HTML 2008 | JS-SCRIPT 4: 0942
    const list = [];
// HTML 2009 | JS-SCRIPT 4: 0943

// HTML 2010 | JS-SCRIPT 4: 0944
    if (CURRENT_RELATIONSHIP_MODE === "love") {
// HTML 2011 | JS-SCRIPT 4: 0945
      list.push("Évite les non-dits importants.");
// HTML 2012 | JS-SCRIPT 4: 0946
      list.push("Évite les rapports de force.");
// HTML 2013 | JS-SCRIPT 4: 0947
      list.push("Évite de tout interpréter.");
// HTML 2014 | JS-SCRIPT 4: 0948
    }
// HTML 2015 | JS-SCRIPT 4: 0949

// HTML 2016 | JS-SCRIPT 4: 0950
    if (CURRENT_RELATIONSHIP_MODE === "friendship") {
// HTML 2017 | JS-SCRIPT 4: 0951
      list.push("Évite de mettre une pression affective.");
// HTML 2018 | JS-SCRIPT 4: 0952
      list.push("Évite les tests ou sous-entendus.");
// HTML 2019 | JS-SCRIPT 4: 0953
      list.push("Évite de dramatiser les silences.");
// HTML 2020 | JS-SCRIPT 4: 0954
    }
// HTML 2021 | JS-SCRIPT 4: 0955

// HTML 2022 | JS-SCRIPT 4: 0956
    if (CURRENT_RELATIONSHIP_MODE === "flirt") {
// HTML 2023 | JS-SCRIPT 4: 0957
      list.push("Évite de forcer le rapprochement.");
// HTML 2024 | JS-SCRIPT 4: 0958
      list.push("Évite la jalousie provoquée.");
// HTML 2025 | JS-SCRIPT 4: 0959
      list.push("Évite les jeux de pouvoir.");
// HTML 2026 | JS-SCRIPT 4: 0960
    }
// HTML 2027 | JS-SCRIPT 4: 0961

// HTML 2028 | JS-SCRIPT 4: 0962
    dontList.innerHTML = list
// HTML 2029 | JS-SCRIPT 4: 0963
      .map(x => `<div>• ${relationshipEscapeHtml(x)}</div>`)
// HTML 2030 | JS-SCRIPT 4: 0964
      .join("");
// HTML 2031 | JS-SCRIPT 4: 0965
  }
// HTML 2032 | JS-SCRIPT 4: 0966

// HTML 2033 | JS-SCRIPT 4: 0967
  if (relationshipFactors) {
// HTML 2034 | JS-SCRIPT 4: 0968
    if (!factors.all.length) {
// HTML 2035 | JS-SCRIPT 4: 0969
      relationshipFactors.innerHTML = emptyHtml(
// HTML 2036 | JS-SCRIPT 4: 0970
        "Aucun facteur spécifique détecté pour ce mode."
// HTML 2037 | JS-SCRIPT 4: 0971
      );
// HTML 2038 | JS-SCRIPT 4: 0972
    } else {
// HTML 2039 | JS-SCRIPT 4: 0973
      relationshipFactors.innerHTML = factors.all
// HTML 2040 | JS-SCRIPT 4: 0974
        .slice(0, 8)
// HTML 2041 | JS-SCRIPT 4: 0975
        .map(f =>
// HTML 2042 | JS-SCRIPT 4: 0976
          `<div class="flex items-center gap-2 text-sm">
// HTML 2043 | JS-SCRIPT 4: 0977
             <span class="text-slate-400">•</span>
// HTML 2044 | JS-SCRIPT 4: 0978
             <span>${relationshipEscapeHtml(factorText(f.item))}</span>
// HTML 2045 | JS-SCRIPT 4: 0979
           </div>`
// HTML 2046 | JS-SCRIPT 4: 0980
        )
// HTML 2047 | JS-SCRIPT 4: 0981
        .join("");
// HTML 2048 | JS-SCRIPT 4: 0982
    }
// HTML 2049 | JS-SCRIPT 4: 0983
  }
// HTML 2050 | JS-SCRIPT 4: 0984
}
// HTML 2051 | JS-SCRIPT 4: 0985

// HTML 2052 | JS-SCRIPT 4: 0986

// HTML 2053 | JS-SCRIPT 4: 0987
function openTargetComparison() {
// HTML 2054 | JS-SCRIPT 4: 0988
  const container =
// HTML 2055 | JS-SCRIPT 4: 0989
    document.getElementById("targetComparison");
// HTML 2056 | JS-SCRIPT 4: 0990

// HTML 2057 | JS-SCRIPT 4: 0991
  if (!container) return;
// HTML 2058 | JS-SCRIPT 4: 0992

// HTML 2059 | JS-SCRIPT 4: 0993
  const cache =
// HTML 2060 | JS-SCRIPT 4: 0994
    typeof window !== "undefined"
// HTML 2061 | JS-SCRIPT 4: 0995
      ? window.__astromatchTargetResults
// HTML 2062 | JS-SCRIPT 4: 0996
      : null;
// HTML 2063 | JS-SCRIPT 4: 0997

// HTML 2064 | JS-SCRIPT 4: 0998
  if (!cache || cache.size < 2) {
// HTML 2065 | JS-SCRIPT 4: 0999
    window.__astromatchStatus(
// HTML 2066 | JS-SCRIPT 4: 1000
      "Sélectionne au moins deux profils pour les comparer."
// HTML 2067 | JS-SCRIPT 4: 1001
    );
// HTML 2068 | JS-SCRIPT 4: 1002
    return;
// HTML 2069 | JS-SCRIPT 4: 1003
  }
// HTML 2070 | JS-SCRIPT 4: 1004

// HTML 2071 | JS-SCRIPT 4: 1005
  renderTargetComparison();
// HTML 2072 | JS-SCRIPT 4: 1006

// HTML 2073 | JS-SCRIPT 4: 1007
  container.classList.remove("hidden");
// HTML 2074 | JS-SCRIPT 4: 1008

// HTML 2075 | JS-SCRIPT 4: 1009
  document.body.classList.add(
// HTML 2076 | JS-SCRIPT 4: 1010
    "overflow-hidden"
// HTML 2077 | JS-SCRIPT 4: 1011
  );
// HTML 2078 | JS-SCRIPT 4: 1012
}
// HTML 2079 | JS-SCRIPT 4: 1013

// HTML 2080 | JS-SCRIPT 4: 1014

// HTML 2081 | JS-SCRIPT 4: 1015
function closeTargetComparison() {
// HTML 2082 | JS-SCRIPT 4: 1016
  const container =
// HTML 2083 | JS-SCRIPT 4: 1017
    document.getElementById("targetComparison");
// HTML 2084 | JS-SCRIPT 4: 1018

// HTML 2085 | JS-SCRIPT 4: 1019
  if (!container) return;
// HTML 2086 | JS-SCRIPT 4: 1020

// HTML 2087 | JS-SCRIPT 4: 1021
  container.classList.add("hidden");
// HTML 2088 | JS-SCRIPT 4: 1022

// HTML 2089 | JS-SCRIPT 4: 1023
  document.body.classList.remove(
// HTML 2090 | JS-SCRIPT 4: 1024
    "overflow-hidden"
// HTML 2091 | JS-SCRIPT 4: 1025
  );
// HTML 2092 | JS-SCRIPT 4: 1026
}
// HTML 2093 | JS-SCRIPT 4: 1027

// HTML 2094 | JS-SCRIPT 4: 1028

// HTML 2095 | JS-SCRIPT 4: 1029

// HTML 2096 | JS-SCRIPT 4: 1030
function renderTargetComparison() {
// HTML 2097 | JS-SCRIPT 4: 1031
  const content =
// HTML 2098 | JS-SCRIPT 4: 1032
    document.getElementById("targetComparisonContent");
// HTML 2099 | JS-SCRIPT 4: 1033

// HTML 2100 | JS-SCRIPT 4: 1034
  if (!content) return;
// HTML 2101 | JS-SCRIPT 4: 1035

// HTML 2102 | JS-SCRIPT 4: 1036
  const cache =
// HTML 2103 | JS-SCRIPT 4: 1037
    typeof window !== "undefined"
// HTML 2104 | JS-SCRIPT 4: 1038
      ? window.__astromatchTargetResults
// HTML 2105 | JS-SCRIPT 4: 1039
      : null;
// HTML 2106 | JS-SCRIPT 4: 1040

// HTML 2107 | JS-SCRIPT 4: 1041
  if (!cache || cache.size < 2) {
// HTML 2108 | JS-SCRIPT 4: 1042
    content.innerHTML = `
// HTML 2109 | JS-SCRIPT 4: 1043
      <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
// HTML 2110 | JS-SCRIPT 4: 1044
        <div class="text-3xl mb-3">⚖️</div>
// HTML 2111 | JS-SCRIPT 4: 1045
        <div class="font-bold text-lg">
// HTML 2112 | JS-SCRIPT 4: 1046
          Comparaison indisponible
// HTML 2113 | JS-SCRIPT 4: 1047
        </div>
// HTML 2114 | JS-SCRIPT 4: 1048
        <p class="text-sm text-slate-400 mt-2">
// HTML 2115 | JS-SCRIPT 4: 1049
          Sélectionne au moins deux profils cibles pour pouvoir les comparer.
// HTML 2116 | JS-SCRIPT 4: 1050
        </p>
// HTML 2117 | JS-SCRIPT 4: 1051
      </div>
// HTML 2118 | JS-SCRIPT 4: 1052
    `;
// HTML 2119 | JS-SCRIPT 4: 1053
    return;
// HTML 2120 | JS-SCRIPT 4: 1054
  }
// HTML 2121 | JS-SCRIPT 4: 1055

// HTML 2122 | JS-SCRIPT 4: 1056
  const entries =
// HTML 2123 | JS-SCRIPT 4: 1057
    [...cache.entries()]
// HTML 2124 | JS-SCRIPT 4: 1058
      .map(([id, result]) => ({ id, result }))
// HTML 2125 | JS-SCRIPT 4: 1059
      .filter(entry =>
// HTML 2126 | JS-SCRIPT 4: 1060
        entry.result &&
// HTML 2127 | JS-SCRIPT 4: 1061
        entry.result.global &&
// HTML 2128 | JS-SCRIPT 4: 1062
        Array.isArray(entry.result.domains)
// HTML 2129 | JS-SCRIPT 4: 1063
      );
// HTML 2130 | JS-SCRIPT 4: 1064

// HTML 2131 | JS-SCRIPT 4: 1065
  if (entries.length < 2) {
// HTML 2132 | JS-SCRIPT 4: 1066
    content.innerHTML = `
// HTML 2133 | JS-SCRIPT 4: 1067
      <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
// HTML 2134 | JS-SCRIPT 4: 1068
        <div class="text-3xl mb-3">⚖️</div>
// HTML 2135 | JS-SCRIPT 4: 1069
        <div class="font-bold text-lg">
// HTML 2136 | JS-SCRIPT 4: 1070
          Pas encore assez de résultats
// HTML 2137 | JS-SCRIPT 4: 1071
        </div>
// HTML 2138 | JS-SCRIPT 4: 1072
        <p class="text-sm text-slate-400 mt-2">
// HTML 2139 | JS-SCRIPT 4: 1073
          Calcule au moins deux profils cibles avant de lancer la comparaison.
// HTML 2140 | JS-SCRIPT 4: 1074
        </p>
// HTML 2141 | JS-SCRIPT 4: 1075
      </div>
// HTML 2142 | JS-SCRIPT 4: 1076
    `;
// HTML 2143 | JS-SCRIPT 4: 1077
    return;
// HTML 2144 | JS-SCRIPT 4: 1078
  }
// HTML 2145 | JS-SCRIPT 4: 1079

// HTML 2146 | JS-SCRIPT 4: 1080
  const left = entries[0];
// HTML 2147 | JS-SCRIPT 4: 1081
  const right = entries[1];
// HTML 2148 | JS-SCRIPT 4: 1082

// HTML 2149 | JS-SCRIPT 4: 1083
  const getTargetName = (result, fallback) =>
// HTML 2150 | JS-SCRIPT 4: 1084
    result?.profiles?.target?.name || fallback;
// HTML 2151 | JS-SCRIPT 4: 1085

// HTML 2152 | JS-SCRIPT 4: 1086
  const leftName =
// HTML 2153 | JS-SCRIPT 4: 1087
    getTargetName(left.result, "Profil 1");
// HTML 2154 | JS-SCRIPT 4: 1088

// HTML 2155 | JS-SCRIPT 4: 1089
  const rightName =
// HTML 2156 | JS-SCRIPT 4: 1090
    getTargetName(right.result, "Profil 2");
// HTML 2157 | JS-SCRIPT 4: 1091

// HTML 2158 | JS-SCRIPT 4: 1092
  const domainMeta = {
// HTML 2159 | JS-SCRIPT 4: 1093
    love: {
// HTML 2160 | JS-SCRIPT 4: 1094
      icon: "❤️",
// HTML 2161 | JS-SCRIPT 4: 1095
      label: "Amour"
// HTML 2162 | JS-SCRIPT 4: 1096
    },
// HTML 2163 | JS-SCRIPT 4: 1097
    emotions: {
// HTML 2164 | JS-SCRIPT 4: 1098
      icon: "🌙",
// HTML 2165 | JS-SCRIPT 4: 1099
      label: "Émotions"
// HTML 2166 | JS-SCRIPT 4: 1100
    },
// HTML 2167 | JS-SCRIPT 4: 1101
    communication: {
// HTML 2168 | JS-SCRIPT 4: 1102
      icon: "🗣️",
// HTML 2169 | JS-SCRIPT 4: 1103
      label: "Communication"
// HTML 2170 | JS-SCRIPT 4: 1104
    },
// HTML 2171 | JS-SCRIPT 4: 1105
    passion: {
// HTML 2172 | JS-SCRIPT 4: 1106
      icon: "🔥",
// HTML 2173 | JS-SCRIPT 4: 1107
      label: "Passion"
// HTML 2174 | JS-SCRIPT 4: 1108
    },
// HTML 2175 | JS-SCRIPT 4: 1109
    daily: {
// HTML 2176 | JS-SCRIPT 4: 1110
      icon: "🏠",
// HTML 2177 | JS-SCRIPT 4: 1111
      label: "Quotidien"
// HTML 2178 | JS-SCRIPT 4: 1112
    },
// HTML 2179 | JS-SCRIPT 4: 1113
    projects: {
// HTML 2180 | JS-SCRIPT 4: 1114
      icon: "🚀",
// HTML 2181 | JS-SCRIPT 4: 1115
      label: "Projets"
// HTML 2182 | JS-SCRIPT 4: 1116
    }
// HTML 2183 | JS-SCRIPT 4: 1117
  };
// HTML 2184 | JS-SCRIPT 4: 1118

// HTML 2185 | JS-SCRIPT 4: 1119
  function getDomainMap(result) {
// HTML 2186 | JS-SCRIPT 4: 1120
    const map = new Map();
// HTML 2187 | JS-SCRIPT 4: 1121

// HTML 2188 | JS-SCRIPT 4: 1122
    for (const domain of result?.domains || []) {
// HTML 2189 | JS-SCRIPT 4: 1123
      if (!domain?.domain) continue;
// HTML 2190 | JS-SCRIPT 4: 1124

// HTML 2191 | JS-SCRIPT 4: 1125
      const score = Number(domain.score);
// HTML 2192 | JS-SCRIPT 4: 1126

// HTML 2193 | JS-SCRIPT 4: 1127
      if (Number.isFinite(score)) {
// HTML 2194 | JS-SCRIPT 4: 1128
        map.set(
// HTML 2195 | JS-SCRIPT 4: 1129
          String(domain.domain),
// HTML 2196 | JS-SCRIPT 4: 1130
          score
// HTML 2197 | JS-SCRIPT 4: 1131
        );
// HTML 2198 | JS-SCRIPT 4: 1132
      }
// HTML 2199 | JS-SCRIPT 4: 1133
    }
// HTML 2200 | JS-SCRIPT 4: 1134

// HTML 2201 | JS-SCRIPT 4: 1135
    return map;
// HTML 2202 | JS-SCRIPT 4: 1136
  }
// HTML 2203 | JS-SCRIPT 4: 1137

// HTML 2204 | JS-SCRIPT 4: 1138
  const leftDomains =
// HTML 2205 | JS-SCRIPT 4: 1139
    getDomainMap(left.result);
// HTML 2206 | JS-SCRIPT 4: 1140

// HTML 2207 | JS-SCRIPT 4: 1141
  const rightDomains =
// HTML 2208 | JS-SCRIPT 4: 1142
    getDomainMap(right.result);
// HTML 2209 | JS-SCRIPT 4: 1143

// HTML 2210 | JS-SCRIPT 4: 1144
  const comparisons =
// HTML 2211 | JS-SCRIPT 4: 1145
    Object.entries(domainMeta)
// HTML 2212 | JS-SCRIPT 4: 1146
      .map(([key, meta]) => {
// HTML 2213 | JS-SCRIPT 4: 1147
        const a = Number(leftDomains.get(key));
// HTML 2214 | JS-SCRIPT 4: 1148
        const b = Number(rightDomains.get(key));
// HTML 2215 | JS-SCRIPT 4: 1149

// HTML 2216 | JS-SCRIPT 4: 1150
        const leftScore =
// HTML 2217 | JS-SCRIPT 4: 1151
          Number.isFinite(a) ? a : null;
// HTML 2218 | JS-SCRIPT 4: 1152

// HTML 2219 | JS-SCRIPT 4: 1153
        const rightScore =
// HTML 2220 | JS-SCRIPT 4: 1154
          Number.isFinite(b) ? b : null;
// HTML 2221 | JS-SCRIPT 4: 1155

// HTML 2222 | JS-SCRIPT 4: 1156
        if (
// HTML 2223 | JS-SCRIPT 4: 1157
          leftScore === null &&
// HTML 2224 | JS-SCRIPT 4: 1158
          rightScore === null
// HTML 2225 | JS-SCRIPT 4: 1159
        ) {
// HTML 2226 | JS-SCRIPT 4: 1160
          return null;
// HTML 2227 | JS-SCRIPT 4: 1161
        }
// HTML 2228 | JS-SCRIPT 4: 1162

// HTML 2229 | JS-SCRIPT 4: 1163
        const safeLeft =
// HTML 2230 | JS-SCRIPT 4: 1164
          leftScore === null ? 50 : leftScore;
// HTML 2231 | JS-SCRIPT 4: 1165

// HTML 2232 | JS-SCRIPT 4: 1166
        const safeRight =
// HTML 2233 | JS-SCRIPT 4: 1167
          rightScore === null ? 50 : rightScore;
// HTML 2234 | JS-SCRIPT 4: 1168

// HTML 2235 | JS-SCRIPT 4: 1169
        const delta =
// HTML 2236 | JS-SCRIPT 4: 1170
          Number(
// HTML 2237 | JS-SCRIPT 4: 1171
            (safeRight - safeLeft).toFixed(2)
// HTML 2238 | JS-SCRIPT 4: 1172
          );
// HTML 2239 | JS-SCRIPT 4: 1173

// HTML 2240 | JS-SCRIPT 4: 1174
        return {
// HTML 2241 | JS-SCRIPT 4: 1175
          key,
// HTML 2242 | JS-SCRIPT 4: 1176
          meta,
// HTML 2243 | JS-SCRIPT 4: 1177
          leftScore: safeLeft,
// HTML 2244 | JS-SCRIPT 4: 1178
          rightScore: safeRight,
// HTML 2245 | JS-SCRIPT 4: 1179
          delta
// HTML 2246 | JS-SCRIPT 4: 1180
        };
// HTML 2247 | JS-SCRIPT 4: 1181
      })
// HTML 2248 | JS-SCRIPT 4: 1182
      .filter(Boolean);
// HTML 2249 | JS-SCRIPT 4: 1183

// HTML 2250 | JS-SCRIPT 4: 1184
  const globalA =
// HTML 2251 | JS-SCRIPT 4: 1185
    Number(left.result.global.score);
// HTML 2252 | JS-SCRIPT 4: 1186

// HTML 2253 | JS-SCRIPT 4: 1187
  const globalB =
// HTML 2254 | JS-SCRIPT 4: 1188
    Number(right.result.global.score);
// HTML 2255 | JS-SCRIPT 4: 1189

// HTML 2256 | JS-SCRIPT 4: 1190
  const safeGlobalA =
// HTML 2257 | JS-SCRIPT 4: 1191
    Number.isFinite(globalA)
// HTML 2258 | JS-SCRIPT 4: 1192
      ? globalA
// HTML 2259 | JS-SCRIPT 4: 1193
      : 50;
// HTML 2260 | JS-SCRIPT 4: 1194

// HTML 2261 | JS-SCRIPT 4: 1195
  const safeGlobalB =
// HTML 2262 | JS-SCRIPT 4: 1196
    Number.isFinite(globalB)
// HTML 2263 | JS-SCRIPT 4: 1197
      ? globalB
// HTML 2264 | JS-SCRIPT 4: 1198
      : 50;
// HTML 2265 | JS-SCRIPT 4: 1199

// HTML 2266 | JS-SCRIPT 4: 1200
  const globalDelta =
// HTML 2267 | JS-SCRIPT 4: 1201
    Number(
// HTML 2268 | JS-SCRIPT 4: 1202
      (safeGlobalB - safeGlobalA).toFixed(2)
// HTML 2269 | JS-SCRIPT 4: 1203
    );
// HTML 2270 | JS-SCRIPT 4: 1204

// HTML 2271 | JS-SCRIPT 4: 1205
  const globalDeltaText =
// HTML 2272 | JS-SCRIPT 4: 1206
    globalDelta > 0
// HTML 2273 | JS-SCRIPT 4: 1207
      ? `+${globalDelta.toFixed(2)}`
// HTML 2274 | JS-SCRIPT 4: 1208
      : globalDelta.toFixed(2);
// HTML 2275 | JS-SCRIPT 4: 1209

// HTML 2276 | JS-SCRIPT 4: 1210
  const globalWinner =
// HTML 2277 | JS-SCRIPT 4: 1211
    globalDelta > 0
// HTML 2278 | JS-SCRIPT 4: 1212
      ? rightName
// HTML 2279 | JS-SCRIPT 4: 1213
      : globalDelta < 0
// HTML 2280 | JS-SCRIPT 4: 1214
        ? leftName
// HTML 2281 | JS-SCRIPT 4: 1215
        : null;
// HTML 2282 | JS-SCRIPT 4: 1216

// HTML 2283 | JS-SCRIPT 4: 1217
  const strongestDifference =
// HTML 2284 | JS-SCRIPT 4: 1218
    [...comparisons]
// HTML 2285 | JS-SCRIPT 4: 1219
      .sort(
// HTML 2286 | JS-SCRIPT 4: 1220
        (a, b) =>
// HTML 2287 | JS-SCRIPT 4: 1221
          Math.abs(b.delta) -
// HTML 2288 | JS-SCRIPT 4: 1222
          Math.abs(a.delta)
// HTML 2289 | JS-SCRIPT 4: 1223
      )[0] || null;
// HTML 2290 | JS-SCRIPT 4: 1224

// HTML 2291 | JS-SCRIPT 4: 1225
  const strongestWinner =
// HTML 2292 | JS-SCRIPT 4: 1226
    strongestDifference
// HTML 2293 | JS-SCRIPT 4: 1227
      ? strongestDifference.delta > 0
// HTML 2294 | JS-SCRIPT 4: 1228
        ? rightName
// HTML 2295 | JS-SCRIPT 4: 1229
        : strongestDifference.delta < 0
// HTML 2296 | JS-SCRIPT 4: 1230
          ? leftName
// HTML 2297 | JS-SCRIPT 4: 1231
          : null
// HTML 2298 | JS-SCRIPT 4: 1232
      : null;
// HTML 2299 | JS-SCRIPT 4: 1233

// HTML 2300 | JS-SCRIPT 4: 1234
  const rows =
// HTML 2301 | JS-SCRIPT 4: 1235
    comparisons
// HTML 2302 | JS-SCRIPT 4: 1236
      .map(item => {
// HTML 2303 | JS-SCRIPT 4: 1237
        const maxScore =
// HTML 2304 | JS-SCRIPT 4: 1238
          Math.max(
// HTML 2305 | JS-SCRIPT 4: 1239
            item.leftScore,
// HTML 2306 | JS-SCRIPT 4: 1240
            item.rightScore,
// HTML 2307 | JS-SCRIPT 4: 1241
            1
// HTML 2308 | JS-SCRIPT 4: 1242
          );
// HTML 2309 | JS-SCRIPT 4: 1243

// HTML 2310 | JS-SCRIPT 4: 1244
        const leftWidth =
// HTML 2311 | JS-SCRIPT 4: 1245
          Math.max(
// HTML 2312 | JS-SCRIPT 4: 1246
            0,
// HTML 2313 | JS-SCRIPT 4: 1247
            Math.min(
// HTML 2314 | JS-SCRIPT 4: 1248
              100,
// HTML 2315 | JS-SCRIPT 4: 1249
              (item.leftScore / maxScore) * 100
// HTML 2316 | JS-SCRIPT 4: 1250
            )
// HTML 2317 | JS-SCRIPT 4: 1251
          );
// HTML 2318 | JS-SCRIPT 4: 1252

// HTML 2319 | JS-SCRIPT 4: 1253
        const rightWidth =
// HTML 2320 | JS-SCRIPT 4: 1254
          Math.max(
// HTML 2321 | JS-SCRIPT 4: 1255
            0,
// HTML 2322 | JS-SCRIPT 4: 1256
            Math.min(
// HTML 2323 | JS-SCRIPT 4: 1257
              100,
// HTML 2324 | JS-SCRIPT 4: 1258
              (item.rightScore / maxScore) * 100
// HTML 2325 | JS-SCRIPT 4: 1259
            )
// HTML 2326 | JS-SCRIPT 4: 1260
          );
// HTML 2327 | JS-SCRIPT 4: 1261

// HTML 2328 | JS-SCRIPT 4: 1262
        const winner =
// HTML 2329 | JS-SCRIPT 4: 1263
          item.delta > 0
// HTML 2330 | JS-SCRIPT 4: 1264
            ? rightName
// HTML 2331 | JS-SCRIPT 4: 1265
            : item.delta < 0
// HTML 2332 | JS-SCRIPT 4: 1266
              ? leftName
// HTML 2333 | JS-SCRIPT 4: 1267
              : null;
// HTML 2334 | JS-SCRIPT 4: 1268

// HTML 2335 | JS-SCRIPT 4: 1269
        const deltaText =
// HTML 2336 | JS-SCRIPT 4: 1270
          item.delta > 0
// HTML 2337 | JS-SCRIPT 4: 1271
            ? `+${item.delta.toFixed(2)}`
// HTML 2338 | JS-SCRIPT 4: 1272
            : item.delta.toFixed(2);
// HTML 2339 | JS-SCRIPT 4: 1273

// HTML 2340 | JS-SCRIPT 4: 1274
        const winnerHtml =
// HTML 2341 | JS-SCRIPT 4: 1275
          winner
// HTML 2342 | JS-SCRIPT 4: 1276
            ? `
// HTML 2343 | JS-SCRIPT 4: 1277
              <span class="astromatch-compare-winner">
// HTML 2344 | JS-SCRIPT 4: 1278
                ${relationshipEscapeHtml(winner)} gagne
// HTML 2345 | JS-SCRIPT 4: 1279
              </span>
// HTML 2346 | JS-SCRIPT 4: 1280
            `
// HTML 2347 | JS-SCRIPT 4: 1281
            : `
// HTML 2348 | JS-SCRIPT 4: 1282
              <span class="text-[10px] text-slate-500 font-semibold">
// HTML 2349 | JS-SCRIPT 4: 1283
                Égalité
// HTML 2350 | JS-SCRIPT 4: 1284
              </span>
// HTML 2351 | JS-SCRIPT 4: 1285
            `;
// HTML 2352 | JS-SCRIPT 4: 1286

// HTML 2353 | JS-SCRIPT 4: 1287
        return `
// HTML 2354 | JS-SCRIPT 4: 1288
          <div class="astromatch-compare-domain rounded-3xl bg-slate-900/60 border border-slate-800 p-4">
// HTML 2355 | JS-SCRIPT 4: 1289

// HTML 2356 | JS-SCRIPT 4: 1290
            <div class="flex items-center justify-between gap-3 mb-4">
// HTML 2357 | JS-SCRIPT 4: 1291

// HTML 2358 | JS-SCRIPT 4: 1292
              <div class="flex items-center gap-2 min-w-0">
// HTML 2359 | JS-SCRIPT 4: 1293
                <span class="text-xl">
// HTML 2360 | JS-SCRIPT 4: 1294
                  ${item.meta.icon}
// HTML 2361 | JS-SCRIPT 4: 1295
                </span>
// HTML 2362 | JS-SCRIPT 4: 1296

// HTML 2363 | JS-SCRIPT 4: 1297
                <div class="min-w-0">
// HTML 2364 | JS-SCRIPT 4: 1298
                  <div class="text-sm font-bold truncate">
// HTML 2365 | JS-SCRIPT 4: 1299
                    ${relationshipEscapeHtml(item.meta.label)}
// HTML 2366 | JS-SCRIPT 4: 1300
                  </div>
// HTML 2367 | JS-SCRIPT 4: 1301

// HTML 2368 | JS-SCRIPT 4: 1302
                  <div class="mt-1">
// HTML 2369 | JS-SCRIPT 4: 1303
                    ${winnerHtml}
// HTML 2370 | JS-SCRIPT 4: 1304
                  </div>
// HTML 2371 | JS-SCRIPT 4: 1305
                </div>
// HTML 2372 | JS-SCRIPT 4: 1306
              </div>
// HTML 2373 | JS-SCRIPT 4: 1307

// HTML 2374 | JS-SCRIPT 4: 1308
              <div class="text-right shrink-0">
// HTML 2375 | JS-SCRIPT 4: 1309
                <div class="text-xs text-slate-500">
// HTML 2376 | JS-SCRIPT 4: 1310
                  Écart
// HTML 2377 | JS-SCRIPT 4: 1311
                </div>
// HTML 2378 | JS-SCRIPT 4: 1312

// HTML 2379 | JS-SCRIPT 4: 1313
                <div class="font-black text-sm ${
// HTML 2380 | JS-SCRIPT 4: 1314
                  item.delta > 0
// HTML 2381 | JS-SCRIPT 4: 1315
                    ? "text-emerald-300"
// HTML 2382 | JS-SCRIPT 4: 1316
                    : item.delta < 0
// HTML 2383 | JS-SCRIPT 4: 1317
                      ? "text-rose-300"
// HTML 2384 | JS-SCRIPT 4: 1318
                      : "text-slate-400"
// HTML 2385 | JS-SCRIPT 4: 1319
                }">
// HTML 2386 | JS-SCRIPT 4: 1320
                  ${relationshipEscapeHtml(deltaText)}
// HTML 2387 | JS-SCRIPT 4: 1321
                </div>
// HTML 2388 | JS-SCRIPT 4: 1322
              </div>
// HTML 2389 | JS-SCRIPT 4: 1323

// HTML 2390 | JS-SCRIPT 4: 1324
            </div>
// HTML 2391 | JS-SCRIPT 4: 1325

// HTML 2392 | JS-SCRIPT 4: 1326
            <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
// HTML 2393 | JS-SCRIPT 4: 1327

// HTML 2394 | JS-SCRIPT 4: 1328
              <div>
// HTML 2395 | JS-SCRIPT 4: 1329
                <div class="flex items-end justify-between gap-2 mb-2">
// HTML 2396 | JS-SCRIPT 4: 1330
                  <span class="text-[11px] text-slate-500 truncate">
// HTML 2397 | JS-SCRIPT 4: 1331
                    ${relationshipEscapeHtml(leftName)}
// HTML 2398 | JS-SCRIPT 4: 1332
                  </span>
// HTML 2399 | JS-SCRIPT 4: 1333

// HTML 2400 | JS-SCRIPT 4: 1334
                  <span class="text-lg font-black text-white">
// HTML 2401 | JS-SCRIPT 4: 1335
                    ${Math.round(item.leftScore)}
// HTML 2402 | JS-SCRIPT 4: 1336
                  </span>
// HTML 2403 | JS-SCRIPT 4: 1337
                </div>
// HTML 2404 | JS-SCRIPT 4: 1338

// HTML 2405 | JS-SCRIPT 4: 1339
                <div class="astromatch-compare-bar">
// HTML 2406 | JS-SCRIPT 4: 1340
                  <div
// HTML 2407 | JS-SCRIPT 4: 1341
                    class="astromatch-compare-bar-fill bg-slate-400"
// HTML 2408 | JS-SCRIPT 4: 1342
                    style="width:${leftWidth}%"
// HTML 2409 | JS-SCRIPT 4: 1343
                  ></div>
// HTML 2410 | JS-SCRIPT 4: 1344
                </div>
// HTML 2411 | JS-SCRIPT 4: 1345
              </div>
// HTML 2412 | JS-SCRIPT 4: 1346

// HTML 2413 | JS-SCRIPT 4: 1347
              <div class="astromatch-compare-vs">
// HTML 2414 | JS-SCRIPT 4: 1348
                VS
// HTML 2415 | JS-SCRIPT 4: 1349
              </div>
// HTML 2416 | JS-SCRIPT 4: 1350

// HTML 2417 | JS-SCRIPT 4: 1351
              <div>
// HTML 2418 | JS-SCRIPT 4: 1352
                <div class="flex items-end justify-between gap-2 mb-2">
// HTML 2419 | JS-SCRIPT 4: 1353
                  <span class="text-[11px] text-slate-500 truncate">
// HTML 2420 | JS-SCRIPT 4: 1354
                    ${relationshipEscapeHtml(rightName)}
// HTML 2421 | JS-SCRIPT 4: 1355
                  </span>
// HTML 2422 | JS-SCRIPT 4: 1356

// HTML 2423 | JS-SCRIPT 4: 1357
                  <span class="text-lg font-black text-white">
// HTML 2424 | JS-SCRIPT 4: 1358
                    ${Math.round(item.rightScore)}
// HTML 2425 | JS-SCRIPT 4: 1359
                  </span>
// HTML 2426 | JS-SCRIPT 4: 1360
                </div>
// HTML 2427 | JS-SCRIPT 4: 1361

// HTML 2428 | JS-SCRIPT 4: 1362
                <div class="astromatch-compare-bar">
// HTML 2429 | JS-SCRIPT 4: 1363
                  <div
// HTML 2430 | JS-SCRIPT 4: 1364
                    class="astromatch-compare-bar-fill bg-slate-300"
// HTML 2431 | JS-SCRIPT 4: 1365
                    style="width:${rightWidth}%"
// HTML 2432 | JS-SCRIPT 4: 1366
                  ></div>
// HTML 2433 | JS-SCRIPT 4: 1367
                </div>
// HTML 2434 | JS-SCRIPT 4: 1368
              </div>
// HTML 2435 | JS-SCRIPT 4: 1369

// HTML 2436 | JS-SCRIPT 4: 1370
            </div>
// HTML 2437 | JS-SCRIPT 4: 1371

// HTML 2438 | JS-SCRIPT 4: 1372
          </div>
// HTML 2439 | JS-SCRIPT 4: 1373
        `;
// HTML 2440 | JS-SCRIPT 4: 1374
      })
// HTML 2441 | JS-SCRIPT 4: 1375
      .join("");
// HTML 2442 | JS-SCRIPT 4: 1376

// HTML 2443 | JS-SCRIPT 4: 1377
  const globalWinnerHtml =
// HTML 2444 | JS-SCRIPT 4: 1378
    globalWinner
// HTML 2445 | JS-SCRIPT 4: 1379
      ? `
// HTML 2446 | JS-SCRIPT 4: 1380
        <div class="mt-3 text-xs text-emerald-300 font-semibold">
// HTML 2447 | JS-SCRIPT 4: 1381
          🏆 ${relationshipEscapeHtml(globalWinner)}
// HTML 2448 | JS-SCRIPT 4: 1382
          possède le score global le plus élevé.
// HTML 2449 | JS-SCRIPT 4: 1383
        </div>
// HTML 2450 | JS-SCRIPT 4: 1384
      `
// HTML 2451 | JS-SCRIPT 4: 1385
      : `
// HTML 2452 | JS-SCRIPT 4: 1386
        <div class="mt-3 text-xs text-slate-500 font-semibold">
// HTML 2453 | JS-SCRIPT 4: 1387
          Les deux profils ont le même score global.
// HTML 2454 | JS-SCRIPT 4: 1388
        </div>
// HTML 2455 | JS-SCRIPT 4: 1389
      `;
// HTML 2456 | JS-SCRIPT 4: 1390

// HTML 2457 | JS-SCRIPT 4: 1391
  const strongestHtml =
// HTML 2458 | JS-SCRIPT 4: 1392
    strongestDifference && strongestWinner
// HTML 2459 | JS-SCRIPT 4: 1393
      ? `
// HTML 2460 | JS-SCRIPT 4: 1394
        <div class="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
// HTML 2461 | JS-SCRIPT 4: 1395
          <div class="text-xs uppercase tracking-widest text-slate-500 mb-2">
// HTML 2462 | JS-SCRIPT 4: 1396
            Plus grande différence
// HTML 2463 | JS-SCRIPT 4: 1397
          </div>
// HTML 2464 | JS-SCRIPT 4: 1398

// HTML 2465 | JS-SCRIPT 4: 1399
          <div class="flex items-center gap-3">
// HTML 2466 | JS-SCRIPT 4: 1400
            <div class="text-2xl">
// HTML 2467 | JS-SCRIPT 4: 1401
              ${strongestDifference.meta.icon}
// HTML 2468 | JS-SCRIPT 4: 1402
            </div>
// HTML 2469 | JS-SCRIPT 4: 1403

// HTML 2470 | JS-SCRIPT 4: 1404
            <div class="min-w-0">
// HTML 2471 | JS-SCRIPT 4: 1405
              <div class="font-bold">
// HTML 2472 | JS-SCRIPT 4: 1406
                ${relationshipEscapeHtml(
// HTML 2473 | JS-SCRIPT 4: 1407
                  strongestDifference.meta.label
// HTML 2474 | JS-SCRIPT 4: 1408
                )}
// HTML 2475 | JS-SCRIPT 4: 1409
              </div>
// HTML 2476 | JS-SCRIPT 4: 1410

// HTML 2477 | JS-SCRIPT 4: 1411
              <div class="text-xs text-slate-400 mt-1">
// HTML 2478 | JS-SCRIPT 4: 1412
                ${relationshipEscapeHtml(strongestWinner)}
// HTML 2479 | JS-SCRIPT 4: 1413
                se démarque de
// HTML 2480 | JS-SCRIPT 4: 1414
                ${Math.abs(strongestDifference.delta).toFixed(2)}
// HTML 2481 | JS-SCRIPT 4: 1415
                points.
// HTML 2482 | JS-SCRIPT 4: 1416
              </div>
// HTML 2483 | JS-SCRIPT 4: 1417
            </div>
// HTML 2484 | JS-SCRIPT 4: 1418
          </div>
// HTML 2485 | JS-SCRIPT 4: 1419
        </div>
// HTML 2486 | JS-SCRIPT 4: 1420
      `
// HTML 2487 | JS-SCRIPT 4: 1421
      : "";
// HTML 2488 | JS-SCRIPT 4: 1422

// HTML 2489 | JS-SCRIPT 4: 1423
  content.innerHTML = `
// HTML 2490 | JS-SCRIPT 4: 1424
    
// HTML 2491 | JS-SCRIPT 4: 1425
    <div id="astromatchCompareSelectorsV21"></div>
// HTML 2492 | JS-SCRIPT 4: 1426

// HTML 2493 | JS-SCRIPT 4: 1427
    <div id="astromatchCompareV21Results"></div>
// HTML 2494 | JS-SCRIPT 4: 1428

// HTML 2495 | JS-SCRIPT 4: 1429
    <div class="astromatch-compare-v2">
// HTML 2496 | JS-SCRIPT 4: 1430

// HTML 2497 | JS-SCRIPT 4: 1431
      <!-- HERO -->
// HTML 2498 | JS-SCRIPT 4: 1432
      <div class="astromatch-compare-hero rounded-[2rem] bg-slate-900/80 border border-slate-800 p-5">
// HTML 2499 | JS-SCRIPT 4: 1433

// HTML 2500 | JS-SCRIPT 4: 1434
        <div class="text-[11px] uppercase tracking-[.18em] text-slate-500 text-center mb-4">
// HTML 2501 | JS-SCRIPT 4: 1435
          Comparaison directe
// HTML 2502 | JS-SCRIPT 4: 1436
        </div>
// HTML 2503 | JS-SCRIPT 4: 1437

// HTML 2504 | JS-SCRIPT 4: 1438
        <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
// HTML 2505 | JS-SCRIPT 4: 1439

// HTML 2506 | JS-SCRIPT 4: 1440
          <div class="text-center min-w-0">
// HTML 2507 | JS-SCRIPT 4: 1441
            <div class="text-sm font-bold truncate">
// HTML 2508 | JS-SCRIPT 4: 1442
              ${relationshipEscapeHtml(leftName)}
// HTML 2509 | JS-SCRIPT 4: 1443
            </div>
// HTML 2510 | JS-SCRIPT 4: 1444

// HTML 2511 | JS-SCRIPT 4: 1445
            <div class="astromatch-compare-score mt-2 text-white">
// HTML 2512 | JS-SCRIPT 4: 1446
              ${Math.round(safeGlobalA)}
// HTML 2513 | JS-SCRIPT 4: 1447
            </div>
// HTML 2514 | JS-SCRIPT 4: 1448

// HTML 2515 | JS-SCRIPT 4: 1449
            <div class="text-xs text-slate-500">
// HTML 2516 | JS-SCRIPT 4: 1450
              /100
// HTML 2517 | JS-SCRIPT 4: 1451
            </div>
// HTML 2518 | JS-SCRIPT 4: 1452

// HTML 2519 | JS-SCRIPT 4: 1453
            <div class="text-xs text-slate-400 mt-2 truncate">
// HTML 2520 | JS-SCRIPT 4: 1454
              ${relationshipEscapeHtml(
// HTML 2521 | JS-SCRIPT 4: 1455
                left.result.global.label || ""
// HTML 2522 | JS-SCRIPT 4: 1456
              )}
// HTML 2523 | JS-SCRIPT 4: 1457
            </div>
// HTML 2524 | JS-SCRIPT 4: 1458
          </div>
// HTML 2525 | JS-SCRIPT 4: 1459

// HTML 2526 | JS-SCRIPT 4: 1460
          <div class="text-center">
// HTML 2527 | JS-SCRIPT 4: 1461
            <div class="text-[10px] uppercase tracking-widest text-slate-600">
// HTML 2528 | JS-SCRIPT 4: 1462
              VS
// HTML 2529 | JS-SCRIPT 4: 1463
            </div>
// HTML 2530 | JS-SCRIPT 4: 1464
          </div>
// HTML 2531 | JS-SCRIPT 4: 1465

// HTML 2532 | JS-SCRIPT 4: 1466
          <div class="text-center min-w-0">
// HTML 2533 | JS-SCRIPT 4: 1467
            <div class="text-sm font-bold truncate">
// HTML 2534 | JS-SCRIPT 4: 1468
              ${relationshipEscapeHtml(rightName)}
// HTML 2535 | JS-SCRIPT 4: 1469
            </div>
// HTML 2536 | JS-SCRIPT 4: 1470

// HTML 2537 | JS-SCRIPT 4: 1471
            <div class="astromatch-compare-score mt-2 text-white">
// HTML 2538 | JS-SCRIPT 4: 1472
              ${Math.round(safeGlobalB)}
// HTML 2539 | JS-SCRIPT 4: 1473
            </div>
// HTML 2540 | JS-SCRIPT 4: 1474

// HTML 2541 | JS-SCRIPT 4: 1475
            <div class="text-xs text-slate-500">
// HTML 2542 | JS-SCRIPT 4: 1476
              /100
// HTML 2543 | JS-SCRIPT 4: 1477
            </div>
// HTML 2544 | JS-SCRIPT 4: 1478

// HTML 2545 | JS-SCRIPT 4: 1479
            <div class="text-xs text-slate-400 mt-2 truncate">
// HTML 2546 | JS-SCRIPT 4: 1480
              ${relationshipEscapeHtml(
// HTML 2547 | JS-SCRIPT 4: 1481
                right.result.global.label || ""
// HTML 2548 | JS-SCRIPT 4: 1482
              )}
// HTML 2549 | JS-SCRIPT 4: 1483
            </div>
// HTML 2550 | JS-SCRIPT 4: 1484
          </div>
// HTML 2551 | JS-SCRIPT 4: 1485

// HTML 2552 | JS-SCRIPT 4: 1486
        </div>
// HTML 2553 | JS-SCRIPT 4: 1487

// HTML 2554 | JS-SCRIPT 4: 1488
        <div class="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 text-center">
// HTML 2555 | JS-SCRIPT 4: 1489

// HTML 2556 | JS-SCRIPT 4: 1490
          <div class="text-xs text-slate-500">
// HTML 2557 | JS-SCRIPT 4: 1491
            Écart global
// HTML 2558 | JS-SCRIPT 4: 1492
          </div>
// HTML 2559 | JS-SCRIPT 4: 1493

// HTML 2560 | JS-SCRIPT 4: 1494
          <div class="astromatch-compare-gap mt-2 ${
// HTML 2561 | JS-SCRIPT 4: 1495
            globalDelta > 0
// HTML 2562 | JS-SCRIPT 4: 1496
              ? "text-emerald-300"
// HTML 2563 | JS-SCRIPT 4: 1497
              : globalDelta < 0
// HTML 2564 | JS-SCRIPT 4: 1498
                ? "text-rose-300"
// HTML 2565 | JS-SCRIPT 4: 1499
                : "text-slate-300"
// HTML 2566 | JS-SCRIPT 4: 1500
          }">
// HTML 2567 | JS-SCRIPT 4: 1501
            ${relationshipEscapeHtml(globalDeltaText)}
// HTML 2568 | JS-SCRIPT 4: 1502
          </div>
// HTML 2569 | JS-SCRIPT 4: 1503

// HTML 2570 | JS-SCRIPT 4: 1504
          ${globalWinnerHtml}
// HTML 2571 | JS-SCRIPT 4: 1505

// HTML 2572 | JS-SCRIPT 4: 1506
        </div>
// HTML 2573 | JS-SCRIPT 4: 1507

// HTML 2574 | JS-SCRIPT 4: 1508
      </div>
// HTML 2575 | JS-SCRIPT 4: 1509

// HTML 2576 | JS-SCRIPT 4: 1510
      <!-- KEY DIFFERENCE -->
// HTML 2577 | JS-SCRIPT 4: 1511
      ${strongestHtml}
// HTML 2578 | JS-SCRIPT 4: 1512

// HTML 2579 | JS-SCRIPT 4: 1513
      <!-- DOMAINS -->
// HTML 2580 | JS-SCRIPT 4: 1514
      <div>
// HTML 2581 | JS-SCRIPT 4: 1515

// HTML 2582 | JS-SCRIPT 4: 1516
        <div class="astromatch-compare-section-title px-1">
// HTML 2583 | JS-SCRIPT 4: 1517
          Comparaison par domaine
// HTML 2584 | JS-SCRIPT 4: 1518
        </div>
// HTML 2585 | JS-SCRIPT 4: 1519

// HTML 2586 | JS-SCRIPT 4: 1520
        <div class="space-y-3">
// HTML 2587 | JS-SCRIPT 4: 1521
          ${rows}
// HTML 2588 | JS-SCRIPT 4: 1522
        </div>
// HTML 2589 | JS-SCRIPT 4: 1523

// HTML 2590 | JS-SCRIPT 4: 1524
      </div>
// HTML 2591 | JS-SCRIPT 4: 1525

// HTML 2592 | JS-SCRIPT 4: 1526
      <!-- SOURCE OF TRUTH -->
// HTML 2593 | JS-SCRIPT 4: 1527
      <div class="rounded-2xl bg-slate-950/40 border border-slate-800 p-4">
// HTML 2594 | JS-SCRIPT 4: 1528

// HTML 2595 | JS-SCRIPT 4: 1529
        <div class="flex items-center gap-2">
// HTML 2596 | JS-SCRIPT 4: 1530
          <span>🔎</span>
// HTML 2597 | JS-SCRIPT 4: 1531
          <div class="text-sm font-bold">
// HTML 2598 | JS-SCRIPT 4: 1532
            Comment lire cette comparaison ?
// HTML 2599 | JS-SCRIPT 4: 1533
          </div>
// HTML 2600 | JS-SCRIPT 4: 1534
        </div>
// HTML 2601 | JS-SCRIPT 4: 1535

// HTML 2602 | JS-SCRIPT 4: 1536
        <p class="text-xs text-slate-400 leading-relaxed mt-2">
// HTML 2603 | JS-SCRIPT 4: 1537
          Les valeurs affichées proviennent directement des résultats
// HTML 2604 | JS-SCRIPT 4: 1538
          AstroMatch calculés pour chaque profil. Le comparateur ne
// HTML 2605 | JS-SCRIPT 4: 1539
          recalcule ni la synastrie ni le score.
// HTML 2606 | JS-SCRIPT 4: 1540
        </p>
// HTML 2607 | JS-SCRIPT 4: 1541

// HTML 2608 | JS-SCRIPT 4: 1542
      </div>
// HTML 2609 | JS-SCRIPT 4: 1543

// HTML 2610 | JS-SCRIPT 4: 1544
    </div>
// HTML 2611 | JS-SCRIPT 4: 1545
  `;
// HTML 2612 | JS-SCRIPT 4: 1546

// HTML 2613 | JS-SCRIPT 4: 1547
    try {
// HTML 2614 | JS-SCRIPT 4: 1548
      astromatchInitComparatorV21();
// HTML 2615 | JS-SCRIPT 4: 1549
    } catch (error) {
// HTML 2616 | JS-SCRIPT 4: 1550
      console.warn(
// HTML 2617 | JS-SCRIPT 4: 1551
        "AstroMatch Comparator V2.1.3 init :",
// HTML 2618 | JS-SCRIPT 4: 1552
        error
// HTML 2619 | JS-SCRIPT 4: 1553
      );
// HTML 2620 | JS-SCRIPT 4: 1554
    }
// HTML 2621 | JS-SCRIPT 4: 1555

// HTML 2622 | JS-SCRIPT 4: 1556
}
// HTML 2623 | JS-SCRIPT 4: 1557

// HTML 2624 | JS-SCRIPT 4: 1558

// HTML 2625 | JS-SCRIPT 4: 1559
function getAllowedRelationshipModes(target) {
// HTML 2626 | JS-SCRIPT 4: 1560
  const context =
// HTML 2627 | JS-SCRIPT 4: 1561
    target?.relationship?.context ||
// HTML 2628 | JS-SCRIPT 4: 1562
    "romantic";
// HTML 2629 | JS-SCRIPT 4: 1563

// HTML 2630 | JS-SCRIPT 4: 1564
  if (context === "family") {
// HTML 2631 | JS-SCRIPT 4: 1565
    return ["family"];
// HTML 2632 | JS-SCRIPT 4: 1566
  }
// HTML 2633 | JS-SCRIPT 4: 1567

// HTML 2634 | JS-SCRIPT 4: 1568
  if (context === "friendship") {
// HTML 2635 | JS-SCRIPT 4: 1569
    return ["friendship"];
// HTML 2636 | JS-SCRIPT 4: 1570
  }
// HTML 2637 | JS-SCRIPT 4: 1571

// HTML 2638 | JS-SCRIPT 4: 1572
  return ["love", "friendship", "flirt"];
// HTML 2639 | JS-SCRIPT 4: 1573
}
// HTML 2640 | JS-SCRIPT 4: 1574

// HTML 2641 | JS-SCRIPT 4: 1575
function normalizeRelationshipModeForTarget(target) {
// HTML 2642 | JS-SCRIPT 4: 1576
  const allowed =
// HTML 2643 | JS-SCRIPT 4: 1577
    getAllowedRelationshipModes(target);
// HTML 2644 | JS-SCRIPT 4: 1578

// HTML 2645 | JS-SCRIPT 4: 1579
  if (!allowed.includes(CURRENT_RELATIONSHIP_MODE)) {
// HTML 2646 | JS-SCRIPT 4: 1580
    CURRENT_RELATIONSHIP_MODE =
// HTML 2647 | JS-SCRIPT 4: 1581
      allowed[0] || "friendship";
// HTML 2648 | JS-SCRIPT 4: 1582
  }
// HTML 2649 | JS-SCRIPT 4: 1583

// HTML 2650 | JS-SCRIPT 4: 1584
  renderRelationshipTabs(allowed);
// HTML 2651 | JS-SCRIPT 4: 1585
}
// HTML 2652 | JS-SCRIPT 4: 1586

// HTML 2653 | JS-SCRIPT 4: 1587
function renderRelationshipTabs(allowed) {
// HTML 2654 | JS-SCRIPT 4: 1588
  for (const mode of [
// HTML 2655 | JS-SCRIPT 4: 1589
    "love",
// HTML 2656 | JS-SCRIPT 4: 1590
    "friendship",
// HTML 2657 | JS-SCRIPT 4: 1591
    "flirt",
// HTML 2658 | JS-SCRIPT 4: 1592
    "family"
// HTML 2659 | JS-SCRIPT 4: 1593
  ]) {
// HTML 2660 | JS-SCRIPT 4: 1594

// HTML 2661 | JS-SCRIPT 4: 1595
    const tab =
// HTML 2662 | JS-SCRIPT 4: 1596
      document.getElementById(`tab-${mode}`);
// HTML 2663 | JS-SCRIPT 4: 1597

// HTML 2664 | JS-SCRIPT 4: 1598
    if (!tab) continue;
// HTML 2665 | JS-SCRIPT 4: 1599

// HTML 2666 | JS-SCRIPT 4: 1600
    const visible =
// HTML 2667 | JS-SCRIPT 4: 1601
      allowed.includes(mode);
// HTML 2668 | JS-SCRIPT 4: 1602

// HTML 2669 | JS-SCRIPT 4: 1603
    tab.classList.toggle(
// HTML 2670 | JS-SCRIPT 4: 1604
      "hidden",
// HTML 2671 | JS-SCRIPT 4: 1605
      !visible
// HTML 2672 | JS-SCRIPT 4: 1606
    );
// HTML 2673 | JS-SCRIPT 4: 1607

// HTML 2674 | JS-SCRIPT 4: 1608
    tab.setAttribute(
// HTML 2675 | JS-SCRIPT 4: 1609
      "aria-hidden",
// HTML 2676 | JS-SCRIPT 4: 1610
      visible ? "false" : "true"
// HTML 2677 | JS-SCRIPT 4: 1611
    );
// HTML 2678 | JS-SCRIPT 4: 1612
  }
// HTML 2679 | JS-SCRIPT 4: 1613
}
// HTML 2680 | JS-SCRIPT 4: 1614

// HTML 2681 | JS-SCRIPT 4: 1615

// HTML 2682 | JS-SCRIPT 4: 1616
function selectRelationshipMode(mode) {
// HTML 2683 | JS-SCRIPT 4: 1617
  if (!RELATIONSHIP_META[mode]) return;
// HTML 2684 | JS-SCRIPT 4: 1618

// HTML 2685 | JS-SCRIPT 4: 1619
  const allowed =
// HTML 2686 | JS-SCRIPT 4: 1620
    getAllowedRelationshipModes(
// HTML 2687 | JS-SCRIPT 4: 1621
        window.__astromatchSelectedTarget || null
// HTML 2688 | JS-SCRIPT 4: 1622
    );
// HTML 2689 | JS-SCRIPT 4: 1623

// HTML 2690 | JS-SCRIPT 4: 1624
  if (!allowed.includes(mode)) {
// HTML 2691 | JS-SCRIPT 4: 1625
    return;
// HTML 2692 | JS-SCRIPT 4: 1626
  }
// HTML 2693 | JS-SCRIPT 4: 1627

// HTML 2694 | JS-SCRIPT 4: 1628
  CURRENT_RELATIONSHIP_MODE = mode;
// HTML 2695 | JS-SCRIPT 4: 1629
  renderRelationshipMode();
// HTML 2696 | JS-SCRIPT 4: 1630
}
// HTML 2697 | JS-SCRIPT 4: 1631

// HTML 2698 | JS-SCRIPT 4: 1632
window.selectRelationshipMode = selectRelationshipMode;
// HTML 2699 | JS-SCRIPT 4: 1633

// HTML 2700 | JS-SCRIPT 4: 1634
window.setAstroMatchRelationshipResult = function(result) {
// HTML 2701 | JS-SCRIPT 4: 1635
  ASTROMATCH_RESULT = result;
// HTML 2702 | JS-SCRIPT 4: 1636

// HTML 2703 | JS-SCRIPT 4: 1637
  /*
// HTML 2704 | JS-SCRIPT 4: 1638
   * Le résultat est déjà validé par calculateSelectedTarget().
// HTML 2705 | JS-SCRIPT 4: 1639
   * On le mémorise uniquement pour la cible actuellement
// HTML 2706 | JS-SCRIPT 4: 1640
   * sélectionnée.
// HTML 2707 | JS-SCRIPT 4: 1641
   */
// HTML 2708 | JS-SCRIPT 4: 1642
  const targetId =
// HTML 2709 | JS-SCRIPT 4: 1643
    (typeof window !== "undefined"
// HTML 2710 | JS-SCRIPT 4: 1644
      ? window.__astromatchSelectedTargetId
// HTML 2711 | JS-SCRIPT 4: 1645
      : null) ||
// HTML 2712 | JS-SCRIPT 4: 1646
    result?.profiles?.target?.profile_id ||
// HTML 2713 | JS-SCRIPT 4: 1647
    result?.profiles?.target?.id ||
// HTML 2714 | JS-SCRIPT 4: 1648
    null;
// HTML 2715 | JS-SCRIPT 4: 1649

// HTML 2716 | JS-SCRIPT 4: 1650
  if (targetId) {
// HTML 2717 | JS-SCRIPT 4: 1651
    ASTROMATCH_TARGET_RESULTS.set(
// HTML 2718 | JS-SCRIPT 4: 1652
      String(targetId),
// HTML 2719 | JS-SCRIPT 4: 1653
      result
// HTML 2720 | JS-SCRIPT 4: 1654
    );
// HTML 2721 | JS-SCRIPT 4: 1655
  }
// HTML 2722 | JS-SCRIPT 4: 1656

// HTML 2723 | JS-SCRIPT 4: 1657
  renderRelationshipMode();
// HTML 2724 | JS-SCRIPT 4: 1658
};
// ===== SCRIPT 5 | HTML START 2734 =====
// HTML 2734 | JS-SCRIPT 5: 0001

// HTML 2735 | JS-SCRIPT 5: 0002
/* ASTROMATCH_DIRECT_DOMAIN_FIX */
// HTML 2736 | JS-SCRIPT 5: 0003

// HTML 2737 | JS-SCRIPT 5: 0004

// HTML 2738 | JS-SCRIPT 5: 0005
window.astromatchDirectDomainDetail = function(domainKey) {
// HTML 2739 | JS-SCRIPT 5: 0006

// HTML 2740 | JS-SCRIPT 5: 0007
  console.log("ASTROMATCH PRETTY DOMAIN CLICK =", domainKey);
// HTML 2741 | JS-SCRIPT 5: 0008

// HTML 2742 | JS-SCRIPT 5: 0009
  const result =
// HTML 2743 | JS-SCRIPT 5: 0010
    window.__astromatchLastResult ||
// HTML 2744 | JS-SCRIPT 5: 0011
    window.__astromatchCurrentResult ||
// HTML 2745 | JS-SCRIPT 5: 0012
    null;
// HTML 2746 | JS-SCRIPT 5: 0013

// HTML 2747 | JS-SCRIPT 5: 0014
  if (!result || !Array.isArray(result.domains)) {
// HTML 2748 | JS-SCRIPT 5: 0015
    console.warn("ASTROMATCH PRETTY : résultat absent");
// HTML 2749 | JS-SCRIPT 5: 0016
    return;
// HTML 2750 | JS-SCRIPT 5: 0017
  }
// HTML 2751 | JS-SCRIPT 5: 0018

// HTML 2752 | JS-SCRIPT 5: 0019
  const domain = result.domains.find(d =>
// HTML 2753 | JS-SCRIPT 5: 0020
    String(d.domain || "").toLowerCase() ===
// HTML 2754 | JS-SCRIPT 5: 0021
    String(domainKey || "").toLowerCase()
// HTML 2755 | JS-SCRIPT 5: 0022
  );
// HTML 2756 | JS-SCRIPT 5: 0023

// HTML 2757 | JS-SCRIPT 5: 0024
  if (!domain) {
// HTML 2758 | JS-SCRIPT 5: 0025
    console.warn(
// HTML 2759 | JS-SCRIPT 5: 0026
      "ASTROMATCH PRETTY : domaine absent",
// HTML 2760 | JS-SCRIPT 5: 0027
      domainKey
// HTML 2761 | JS-SCRIPT 5: 0028
    );
// HTML 2762 | JS-SCRIPT 5: 0029
    return;
// HTML 2763 | JS-SCRIPT 5: 0030
  }
// HTML 2764 | JS-SCRIPT 5: 0031

// HTML 2765 | JS-SCRIPT 5: 0032
  const esc = value =>
// HTML 2766 | JS-SCRIPT 5: 0033
    String(value ?? "")
// HTML 2767 | JS-SCRIPT 5: 0034
      .replace(/&/g,"&amp;")
// HTML 2768 | JS-SCRIPT 5: 0035
      .replace(/</g,"&lt;")
// HTML 2769 | JS-SCRIPT 5: 0036
      .replace(/>/g,"&gt;")
// HTML 2770 | JS-SCRIPT 5: 0037
      .replace(/"/g,"&quot;")
// HTML 2771 | JS-SCRIPT 5: 0038
      .replace(/'/g,"&#039;");
// HTML 2772 | JS-SCRIPT 5: 0039

// HTML 2773 | JS-SCRIPT 5: 0040
  const planetNames = {
// HTML 2774 | JS-SCRIPT 5: 0041
    sun: "Soleil",
// HTML 2775 | JS-SCRIPT 5: 0042
    moon: "Lune",
// HTML 2776 | JS-SCRIPT 5: 0043
    mercury: "Mercure",
// HTML 2777 | JS-SCRIPT 5: 0044
    venus: "Vénus",
// HTML 2778 | JS-SCRIPT 5: 0045
    mars: "Mars",
// HTML 2779 | JS-SCRIPT 5: 0046
    jupiter: "Jupiter",
// HTML 2780 | JS-SCRIPT 5: 0047
    saturn: "Saturne",
// HTML 2781 | JS-SCRIPT 5: 0048
    uranus: "Uranus",
// HTML 2782 | JS-SCRIPT 5: 0049
    neptune: "Neptune",
// HTML 2783 | JS-SCRIPT 5: 0050
    pluto: "Pluton"
// HTML 2784 | JS-SCRIPT 5: 0051
  };
// HTML 2785 | JS-SCRIPT 5: 0052

// HTML 2786 | JS-SCRIPT 5: 0053
  const planetSymbols = {
// HTML 2787 | JS-SCRIPT 5: 0054
    sun: "☀️",
// HTML 2788 | JS-SCRIPT 5: 0055
    moon: "🌙",
// HTML 2789 | JS-SCRIPT 5: 0056
    mercury: "☿",
// HTML 2790 | JS-SCRIPT 5: 0057
    venus: "♀️",
// HTML 2791 | JS-SCRIPT 5: 0058
    mars: "♂️",
// HTML 2792 | JS-SCRIPT 5: 0059
    jupiter: "♃",
// HTML 2793 | JS-SCRIPT 5: 0060
    saturn: "♄",
// HTML 2794 | JS-SCRIPT 5: 0061
    uranus: "♅",
// HTML 2795 | JS-SCRIPT 5: 0062
    neptune: "♆",
// HTML 2796 | JS-SCRIPT 5: 0063
    pluto: "♇"
// HTML 2797 | JS-SCRIPT 5: 0064
  };
// HTML 2798 | JS-SCRIPT 5: 0065

// HTML 2799 | JS-SCRIPT 5: 0066
  const aspectNames = {
// HTML 2800 | JS-SCRIPT 5: 0067
    conjunction: "Conjonction",
// HTML 2801 | JS-SCRIPT 5: 0068
    opposition: "Opposition",
// HTML 2802 | JS-SCRIPT 5: 0069
    trine: "Trigone",
// HTML 2803 | JS-SCRIPT 5: 0070
    square: "Carré",
// HTML 2804 | JS-SCRIPT 5: 0071
    sextile: "Sextile",
// HTML 2805 | JS-SCRIPT 5: 0072
    quincunx: "Quinconce",
// HTML 2806 | JS-SCRIPT 5: 0073
    semisextile: "Semi-sextile",
// HTML 2807 | JS-SCRIPT 5: 0074
    semisquare: "Semi-carré",
// HTML 2808 | JS-SCRIPT 5: 0075
    sesquiquadrate: "Sesqui-carré"
// HTML 2809 | JS-SCRIPT 5: 0076
  };
// HTML 2810 | JS-SCRIPT 5: 0077

// HTML 2811 | JS-SCRIPT 5: 0078
  const aspectSymbols = {
// HTML 2812 | JS-SCRIPT 5: 0079
    conjunction: "☌",
// HTML 2813 | JS-SCRIPT 5: 0080
    opposition: "☍",
// HTML 2814 | JS-SCRIPT 5: 0081
    trine: "△",
// HTML 2815 | JS-SCRIPT 5: 0082
    square: "□",
// HTML 2816 | JS-SCRIPT 5: 0083
    sextile: "⚹",
// HTML 2817 | JS-SCRIPT 5: 0084
    quincunx: "⚻",
// HTML 2818 | JS-SCRIPT 5: 0085
    semisextile: "⚺",
// HTML 2819 | JS-SCRIPT 5: 0086
    semisquare: "∠",
// HTML 2820 | JS-SCRIPT 5: 0087
    sesquiquadrate: "⚼"
// HTML 2821 | JS-SCRIPT 5: 0088
  };
// HTML 2822 | JS-SCRIPT 5: 0089

// HTML 2823 | JS-SCRIPT 5: 0090
  const domainIcons = {
// HTML 2824 | JS-SCRIPT 5: 0091
    love: "❤️",
// HTML 2825 | JS-SCRIPT 5: 0092
    emotions: "🌙",
// HTML 2826 | JS-SCRIPT 5: 0093
    communication: "🗣️",
// HTML 2827 | JS-SCRIPT 5: 0094
    passion: "🔥",
// HTML 2828 | JS-SCRIPT 5: 0095
    daily_life: "🏠",
// HTML 2829 | JS-SCRIPT 5: 0096
    projects: "🚀",
// HTML 2830 | JS-SCRIPT 5: 0097
    family: "👨‍👩‍👧‍👦",
// HTML 2831 | JS-SCRIPT 5: 0098
    frictions: "⚠️"
// HTML 2832 | JS-SCRIPT 5: 0099
  };
// HTML 2833 | JS-SCRIPT 5: 0100

// HTML 2834 | JS-SCRIPT 5: 0101
  const domainLabels = {
// HTML 2835 | JS-SCRIPT 5: 0102
    love: "Amour",
// HTML 2836 | JS-SCRIPT 5: 0103
    emotions: "Émotions",
// HTML 2837 | JS-SCRIPT 5: 0104
    communication: "Communication",
// HTML 2838 | JS-SCRIPT 5: 0105
    passion: "Passion",
// HTML 2839 | JS-SCRIPT 5: 0106
    daily_life: "Quotidien",
// HTML 2840 | JS-SCRIPT 5: 0107
    projects: "Projets",
// HTML 2841 | JS-SCRIPT 5: 0108
    family: "Famille",
// HTML 2842 | JS-SCRIPT 5: 0109
    frictions: "Frictions"
// HTML 2843 | JS-SCRIPT 5: 0110
  };
// HTML 2844 | JS-SCRIPT 5: 0111

// HTML 2845 | JS-SCRIPT 5: 0112
  const factorText = item => {
// HTML 2846 | JS-SCRIPT 5: 0113

// HTML 2847 | JS-SCRIPT 5: 0114
    if (item == null) return "";
// HTML 2848 | JS-SCRIPT 5: 0115

// HTML 2849 | JS-SCRIPT 5: 0116
    if (
// HTML 2850 | JS-SCRIPT 5: 0117
      typeof item === "string" ||
// HTML 2851 | JS-SCRIPT 5: 0118
      typeof item === "number"
// HTML 2852 | JS-SCRIPT 5: 0119
    ) {
// HTML 2853 | JS-SCRIPT 5: 0120
      return String(item);
// HTML 2854 | JS-SCRIPT 5: 0121
    }
// HTML 2855 | JS-SCRIPT 5: 0122

// HTML 2856 | JS-SCRIPT 5: 0123
    if (typeof item === "object") {
// HTML 2857 | JS-SCRIPT 5: 0124

// HTML 2858 | JS-SCRIPT 5: 0125
      const candidates = [
// HTML 2859 | JS-SCRIPT 5: 0126
        item.text,
// HTML 2860 | JS-SCRIPT 5: 0127
        item.label,
// HTML 2861 | JS-SCRIPT 5: 0128
        item.description,
// HTML 2862 | JS-SCRIPT 5: 0129
        item.title,
// HTML 2863 | JS-SCRIPT 5: 0130
        item.message,
// HTML 2864 | JS-SCRIPT 5: 0131
        item.interpretation,
// HTML 2865 | JS-SCRIPT 5: 0132
        item.name,
// HTML 2866 | JS-SCRIPT 5: 0133
        item.reason
// HTML 2867 | JS-SCRIPT 5: 0134
      ];
// HTML 2868 | JS-SCRIPT 5: 0135

// HTML 2869 | JS-SCRIPT 5: 0136
      for (const value of candidates) {
// HTML 2870 | JS-SCRIPT 5: 0137
        if (
// HTML 2871 | JS-SCRIPT 5: 0138
          value !== undefined &&
// HTML 2872 | JS-SCRIPT 5: 0139
          value !== null &&
// HTML 2873 | JS-SCRIPT 5: 0140
          String(value).trim()
// HTML 2874 | JS-SCRIPT 5: 0141
        ) {
// HTML 2875 | JS-SCRIPT 5: 0142
          return String(value);
// HTML 2876 | JS-SCRIPT 5: 0143
        }
// HTML 2877 | JS-SCRIPT 5: 0144
      }
// HTML 2878 | JS-SCRIPT 5: 0145

// HTML 2879 | JS-SCRIPT 5: 0146
      const a = item.planet_a;
// HTML 2880 | JS-SCRIPT 5: 0147
      const b = item.planet_b;
// HTML 2881 | JS-SCRIPT 5: 0148
      const aspect = item.aspect_type;
// HTML 2882 | JS-SCRIPT 5: 0149

// HTML 2883 | JS-SCRIPT 5: 0150
      if (a && b && aspect) {
// HTML 2884 | JS-SCRIPT 5: 0151
        return `${planetNames[a] || a} ${aspectNames[aspect] || aspect} ${planetNames[b] || b}`;
// HTML 2885 | JS-SCRIPT 5: 0152
      }
// HTML 2886 | JS-SCRIPT 5: 0153

// HTML 2887 | JS-SCRIPT 5: 0154
      try {
// HTML 2888 | JS-SCRIPT 5: 0155
        return JSON.stringify(item);
// HTML 2889 | JS-SCRIPT 5: 0156
      } catch {
// HTML 2890 | JS-SCRIPT 5: 0157
        return String(item);
// HTML 2891 | JS-SCRIPT 5: 0158
      }
// HTML 2892 | JS-SCRIPT 5: 0159
    }
// HTML 2893 | JS-SCRIPT 5: 0160

// HTML 2894 | JS-SCRIPT 5: 0161
    return String(item);
// HTML 2895 | JS-SCRIPT 5: 0162
  };
// HTML 2896 | JS-SCRIPT 5: 0163

// HTML 2897 | JS-SCRIPT 5: 0164
  const prettyFactor = item => {
// HTML 2898 | JS-SCRIPT 5: 0165

// HTML 2899 | JS-SCRIPT 5: 0166
    if (!item || typeof item !== "object") {
// HTML 2900 | JS-SCRIPT 5: 0167
      return `
// HTML 2901 | JS-SCRIPT 5: 0168
        <div style="
// HTML 2902 | JS-SCRIPT 5: 0169
          padding:12px 14px;
// HTML 2903 | JS-SCRIPT 5: 0170
          border-radius:14px;
// HTML 2904 | JS-SCRIPT 5: 0171
          background:rgba(255,255,255,.05);
// HTML 2905 | JS-SCRIPT 5: 0172
          color:rgba(255,255,255,.82);
// HTML 2906 | JS-SCRIPT 5: 0173
          font-size:14px;
// HTML 2907 | JS-SCRIPT 5: 0174
        ">
// HTML 2908 | JS-SCRIPT 5: 0175
          ${esc(factorText(item))}
// HTML 2909 | JS-SCRIPT 5: 0176
        </div>
// HTML 2910 | JS-SCRIPT 5: 0177
      `;
// HTML 2911 | JS-SCRIPT 5: 0178
    }
// HTML 2912 | JS-SCRIPT 5: 0179

// HTML 2913 | JS-SCRIPT 5: 0180
    const a = item.planet_a;
// HTML 2914 | JS-SCRIPT 5: 0181
    const b = item.planet_b;
// HTML 2915 | JS-SCRIPT 5: 0182
    const aspect = item.aspect_type;
// HTML 2916 | JS-SCRIPT 5: 0183

// HTML 2917 | JS-SCRIPT 5: 0184
    const aName = planetNames[a] || a || "—";
// HTML 2918 | JS-SCRIPT 5: 0185
    const bName = planetNames[b] || b || "—";
// HTML 2919 | JS-SCRIPT 5: 0186

// HTML 2920 | JS-SCRIPT 5: 0187
    const aSymbol = planetSymbols[a] || "•";
// HTML 2921 | JS-SCRIPT 5: 0188
    const bSymbol = planetSymbols[b] || "•";
// HTML 2922 | JS-SCRIPT 5: 0189

// HTML 2923 | JS-SCRIPT 5: 0190
    const aspectName =
// HTML 2924 | JS-SCRIPT 5: 0191
      aspectNames[aspect] ||
// HTML 2925 | JS-SCRIPT 5: 0192
      aspect ||
// HTML 2926 | JS-SCRIPT 5: 0193
      "Aspect";
// HTML 2927 | JS-SCRIPT 5: 0194

// HTML 2928 | JS-SCRIPT 5: 0195
    const aspectSymbol =
// HTML 2929 | JS-SCRIPT 5: 0196
      aspectSymbols[aspect] ||
// HTML 2930 | JS-SCRIPT 5: 0197
      "•";
// HTML 2931 | JS-SCRIPT 5: 0198

// HTML 2932 | JS-SCRIPT 5: 0199
    const points =
// HTML 2933 | JS-SCRIPT 5: 0200
      Number.isFinite(Number(item.final_points))
// HTML 2934 | JS-SCRIPT 5: 0201
        ? Number(item.final_points).toFixed(2)
// HTML 2935 | JS-SCRIPT 5: 0202
        : null;
// HTML 2936 | JS-SCRIPT 5: 0203

// HTML 2937 | JS-SCRIPT 5: 0204
    const doctrine =
// HTML 2938 | JS-SCRIPT 5: 0205
      item.doctrine_polarity === "MIXED_TENSION_REVIEW"
// HTML 2939 | JS-SCRIPT 5: 0206
        ? "Facteur mixte"
// HTML 2940 | JS-SCRIPT 5: 0207
        : null;
// HTML 2941 | JS-SCRIPT 5: 0208

// HTML 2942 | JS-SCRIPT 5: 0209
    return `
// HTML 2943 | JS-SCRIPT 5: 0210
      <div style="
// HTML 2944 | JS-SCRIPT 5: 0211
        padding:14px;
// HTML 2945 | JS-SCRIPT 5: 0212
        border-radius:16px;
// HTML 2946 | JS-SCRIPT 5: 0213
        background:linear-gradient(
// HTML 2947 | JS-SCRIPT 5: 0214
          145deg,
// HTML 2948 | JS-SCRIPT 5: 0215
          rgba(255,255,255,.065),
// HTML 2949 | JS-SCRIPT 5: 0216
          rgba(255,255,255,.035)
// HTML 2950 | JS-SCRIPT 5: 0217
        );
// HTML 2951 | JS-SCRIPT 5: 0218
        border:1px solid rgba(255,255,255,.08);
// HTML 2952 | JS-SCRIPT 5: 0219
      ">
// HTML 2953 | JS-SCRIPT 5: 0220

// HTML 2954 | JS-SCRIPT 5: 0221
        <div style="
// HTML 2955 | JS-SCRIPT 5: 0222
          display:flex;
// HTML 2956 | JS-SCRIPT 5: 0223
          align-items:center;
// HTML 2957 | JS-SCRIPT 5: 0224
          gap:8px;
// HTML 2958 | JS-SCRIPT 5: 0225
          font-size:17px;
// HTML 2959 | JS-SCRIPT 5: 0226
          font-weight:800;
// HTML 2960 | JS-SCRIPT 5: 0227
        ">
// HTML 2961 | JS-SCRIPT 5: 0228
          <span>${aSymbol}</span>
// HTML 2962 | JS-SCRIPT 5: 0229
          <span>${esc(aName)}</span>
// HTML 2963 | JS-SCRIPT 5: 0230

// HTML 2964 | JS-SCRIPT 5: 0231
          <span style="
// HTML 2965 | JS-SCRIPT 5: 0232
            color:rgba(255,255,255,.45);
// HTML 2966 | JS-SCRIPT 5: 0233
            font-size:20px;
// HTML 2967 | JS-SCRIPT 5: 0234
          ">
// HTML 2968 | JS-SCRIPT 5: 0235
            ${aspectSymbol}
// HTML 2969 | JS-SCRIPT 5: 0236
          </span>
// HTML 2970 | JS-SCRIPT 5: 0237

// HTML 2971 | JS-SCRIPT 5: 0238
          <span>${bSymbol}</span>
// HTML 2972 | JS-SCRIPT 5: 0239
          <span>${esc(bName)}</span>
// HTML 2973 | JS-SCRIPT 5: 0240
        </div>
// HTML 2974 | JS-SCRIPT 5: 0241

// HTML 2975 | JS-SCRIPT 5: 0242
        <div style="
// HTML 2976 | JS-SCRIPT 5: 0243
          margin-top:7px;
// HTML 2977 | JS-SCRIPT 5: 0244
          display:flex;
// HTML 2978 | JS-SCRIPT 5: 0245
          flex-wrap:wrap;
// HTML 2979 | JS-SCRIPT 5: 0246
          gap:7px;
// HTML 2980 | JS-SCRIPT 5: 0247
          align-items:center;
// HTML 2981 | JS-SCRIPT 5: 0248
        ">
// HTML 2982 | JS-SCRIPT 5: 0249

// HTML 2983 | JS-SCRIPT 5: 0250
          <span style="
// HTML 2984 | JS-SCRIPT 5: 0251
            padding:4px 8px;
// HTML 2985 | JS-SCRIPT 5: 0252
            border-radius:999px;
// HTML 2986 | JS-SCRIPT 5: 0253
            background:rgba(139,92,246,.16);
// HTML 2987 | JS-SCRIPT 5: 0254
            color:rgba(255,255,255,.78);
// HTML 2988 | JS-SCRIPT 5: 0255
            font-size:12px;
// HTML 2989 | JS-SCRIPT 5: 0256
          ">
// HTML 2990 | JS-SCRIPT 5: 0257
            ${esc(aspectName)}
// HTML 2991 | JS-SCRIPT 5: 0258
          </span>
// HTML 2992 | JS-SCRIPT 5: 0259

// HTML 2993 | JS-SCRIPT 5: 0260
          ${
// HTML 2994 | JS-SCRIPT 5: 0261
            doctrine
// HTML 2995 | JS-SCRIPT 5: 0262
              ? `
// HTML 2996 | JS-SCRIPT 5: 0263
                <span style="
// HTML 2997 | JS-SCRIPT 5: 0264
                  padding:4px 8px;
// HTML 2998 | JS-SCRIPT 5: 0265
                  border-radius:999px;
// HTML 2999 | JS-SCRIPT 5: 0266
                  background:rgba(245,158,11,.13);
// HTML 3000 | JS-SCRIPT 5: 0267
                  color:rgba(255,255,255,.72);
// HTML 3001 | JS-SCRIPT 5: 0268
                  font-size:12px;
// HTML 3002 | JS-SCRIPT 5: 0269
                ">
// HTML 3003 | JS-SCRIPT 5: 0270
                  ◆ ${doctrine}
// HTML 3004 | JS-SCRIPT 5: 0271
                </span>
// HTML 3005 | JS-SCRIPT 5: 0272
              `
// HTML 3006 | JS-SCRIPT 5: 0273
              : ""
// HTML 3007 | JS-SCRIPT 5: 0274
          }
// HTML 3008 | JS-SCRIPT 5: 0275

// HTML 3009 | JS-SCRIPT 5: 0276
          ${
// HTML 3010 | JS-SCRIPT 5: 0277
            points !== null
// HTML 3011 | JS-SCRIPT 5: 0278
              ? `
// HTML 3012 | JS-SCRIPT 5: 0279
                <span style="
// HTML 3013 | JS-SCRIPT 5: 0280
                  margin-left:auto;
// HTML 3014 | JS-SCRIPT 5: 0281
                  font-size:13px;
// HTML 3015 | JS-SCRIPT 5: 0282
                  font-weight:800;
// HTML 3016 | JS-SCRIPT 5: 0283
                  color:rgba(255,255,255,.72);
// HTML 3017 | JS-SCRIPT 5: 0284
                ">
// HTML 3018 | JS-SCRIPT 5: 0285
                  ${points} pts
// HTML 3019 | JS-SCRIPT 5: 0286
                </span>
// HTML 3020 | JS-SCRIPT 5: 0287
              `
// HTML 3021 | JS-SCRIPT 5: 0288
              : ""
// HTML 3022 | JS-SCRIPT 5: 0289
          }
// HTML 3023 | JS-SCRIPT 5: 0290

// HTML 3024 | JS-SCRIPT 5: 0291
        </div>
// HTML 3025 | JS-SCRIPT 5: 0292

// HTML 3026 | JS-SCRIPT 5: 0293
      </div>
// HTML 3027 | JS-SCRIPT 5: 0294
    `;
// HTML 3028 | JS-SCRIPT 5: 0295
  };
// HTML 3029 | JS-SCRIPT 5: 0296

// HTML 3030 | JS-SCRIPT 5: 0297
  const renderFactors = (
// HTML 3031 | JS-SCRIPT 5: 0298
    items,
// HTML 3032 | JS-SCRIPT 5: 0299
    title,
// HTML 3033 | JS-SCRIPT 5: 0300
    icon
// HTML 3034 | JS-SCRIPT 5: 0301
  ) => {
// HTML 3035 | JS-SCRIPT 5: 0302

// HTML 3036 | JS-SCRIPT 5: 0303
    if (!Array.isArray(items) || !items.length) {
// HTML 3037 | JS-SCRIPT 5: 0304
      return "";
// HTML 3038 | JS-SCRIPT 5: 0305
    }
// HTML 3039 | JS-SCRIPT 5: 0306

// HTML 3040 | JS-SCRIPT 5: 0307
    return `
// HTML 3041 | JS-SCRIPT 5: 0308
      <section style="margin-top:22px">
// HTML 3042 | JS-SCRIPT 5: 0309

// HTML 3043 | JS-SCRIPT 5: 0310
        <div style="
// HTML 3044 | JS-SCRIPT 5: 0311
          font-size:16px;
// HTML 3045 | JS-SCRIPT 5: 0312
          font-weight:850;
// HTML 3046 | JS-SCRIPT 5: 0313
          margin-bottom:10px;
// HTML 3047 | JS-SCRIPT 5: 0314
        ">
// HTML 3048 | JS-SCRIPT 5: 0315
          ${icon} ${title}
// HTML 3049 | JS-SCRIPT 5: 0316
        </div>
// HTML 3050 | JS-SCRIPT 5: 0317

// HTML 3051 | JS-SCRIPT 5: 0318
        <div style="
// HTML 3052 | JS-SCRIPT 5: 0319
          display:flex;
// HTML 3053 | JS-SCRIPT 5: 0320
          flex-direction:column;
// HTML 3054 | JS-SCRIPT 5: 0321
          gap:9px;
// HTML 3055 | JS-SCRIPT 5: 0322
        ">
// HTML 3056 | JS-SCRIPT 5: 0323
          ${items.map(prettyFactor).join("")}
// HTML 3057 | JS-SCRIPT 5: 0324
        </div>
// HTML 3058 | JS-SCRIPT 5: 0325

// HTML 3059 | JS-SCRIPT 5: 0326
      </section>
// HTML 3060 | JS-SCRIPT 5: 0327
    `;
// HTML 3061 | JS-SCRIPT 5: 0328
  };
// HTML 3062 | JS-SCRIPT 5: 0329

// HTML 3063 | JS-SCRIPT 5: 0330
  const score =
// HTML 3064 | JS-SCRIPT 5: 0331
    Math.round(Number(domain.score || 0));
// HTML 3065 | JS-SCRIPT 5: 0332

// HTML 3066 | JS-SCRIPT 5: 0333
  const icon =
// HTML 3067 | JS-SCRIPT 5: 0334
    domainIcons[
// HTML 3068 | JS-SCRIPT 5: 0335
      String(domain.domain || "").toLowerCase()
// HTML 3069 | JS-SCRIPT 5: 0336
    ] || "✨";
// HTML 3070 | JS-SCRIPT 5: 0337

// HTML 3071 | JS-SCRIPT 5: 0338
  const title =
// HTML 3072 | JS-SCRIPT 5: 0339
    domainLabels[
// HTML 3073 | JS-SCRIPT 5: 0340
      String(domain.domain || "").toLowerCase()
// HTML 3074 | JS-SCRIPT 5: 0341
    ] ||
// HTML 3075 | JS-SCRIPT 5: 0342
    domain.domain ||
// HTML 3076 | JS-SCRIPT 5: 0343
    domainKey;
// HTML 3077 | JS-SCRIPT 5: 0344

// HTML 3078 | JS-SCRIPT 5: 0345
  const old =
// HTML 3079 | JS-SCRIPT 5: 0346
    document.getElementById(
// HTML 3080 | JS-SCRIPT 5: 0347
      "astromatchDirectDomainModal"
// HTML 3081 | JS-SCRIPT 5: 0348
    );
// HTML 3082 | JS-SCRIPT 5: 0349

// HTML 3083 | JS-SCRIPT 5: 0350
  if (old) {
// HTML 3084 | JS-SCRIPT 5: 0351
    old.remove();
// HTML 3085 | JS-SCRIPT 5: 0352
  }
// HTML 3086 | JS-SCRIPT 5: 0353

// HTML 3087 | JS-SCRIPT 5: 0354
  const modal =
// HTML 3088 | JS-SCRIPT 5: 0355
    document.createElement("div");
// HTML 3089 | JS-SCRIPT 5: 0356

// HTML 3090 | JS-SCRIPT 5: 0357
  modal.id =
// HTML 3091 | JS-SCRIPT 5: 0358
    "astromatchDirectDomainModal";
// HTML 3092 | JS-SCRIPT 5: 0359

// HTML 3093 | JS-SCRIPT 5: 0360
  modal.style.cssText = `
// HTML 3094 | JS-SCRIPT 5: 0361
    position:fixed;
// HTML 3095 | JS-SCRIPT 5: 0362
    inset:0;
// HTML 3096 | JS-SCRIPT 5: 0363
    z-index:2147483647;
// HTML 3097 | JS-SCRIPT 5: 0364
    display:flex;
// HTML 3098 | JS-SCRIPT 5: 0365
    align-items:center;
// HTML 3099 | JS-SCRIPT 5: 0366
    justify-content:center;
// HTML 3100 | JS-SCRIPT 5: 0367
    padding:16px;
// HTML 3101 | JS-SCRIPT 5: 0368
    background:rgba(0,0,0,.82);
// HTML 3102 | JS-SCRIPT 5: 0369
    backdrop-filter:blur(12px);
// HTML 3103 | JS-SCRIPT 5: 0370
    -webkit-backdrop-filter:blur(12px);
// HTML 3104 | JS-SCRIPT 5: 0371
  `;
// HTML 3105 | JS-SCRIPT 5: 0372

// HTML 3106 | JS-SCRIPT 5: 0373
  modal.innerHTML = `
// HTML 3107 | JS-SCRIPT 5: 0374
    <div style="
// HTML 3108 | JS-SCRIPT 5: 0375
      width:min(680px,100%);
// HTML 3109 | JS-SCRIPT 5: 0376
      max-height:90vh;
// HTML 3110 | JS-SCRIPT 5: 0377
      overflow:auto;
// HTML 3111 | JS-SCRIPT 5: 0378
      border-radius:26px;
// HTML 3112 | JS-SCRIPT 5: 0379
      background:#11111b;
// HTML 3113 | JS-SCRIPT 5: 0380
      border:1px solid rgba(255,255,255,.13);
// HTML 3114 | JS-SCRIPT 5: 0381
      box-shadow:0 30px 100px rgba(0,0,0,.75);
// HTML 3115 | JS-SCRIPT 5: 0382
      color:white;
// HTML 3116 | JS-SCRIPT 5: 0383
    ">
// HTML 3117 | JS-SCRIPT 5: 0384

// HTML 3118 | JS-SCRIPT 5: 0385
      <div style="
// HTML 3119 | JS-SCRIPT 5: 0386
        position:sticky;
// HTML 3120 | JS-SCRIPT 5: 0387
        top:0;
// HTML 3121 | JS-SCRIPT 5: 0388
        z-index:3;
// HTML 3122 | JS-SCRIPT 5: 0389
        padding:20px;
// HTML 3123 | JS-SCRIPT 5: 0390
        background:rgba(17,17,27,.97);
// HTML 3124 | JS-SCRIPT 5: 0391
        border-bottom:1px solid rgba(255,255,255,.08);
// HTML 3125 | JS-SCRIPT 5: 0392
        backdrop-filter:blur(14px);
// HTML 3126 | JS-SCRIPT 5: 0393
      ">
// HTML 3127 | JS-SCRIPT 5: 0394

// HTML 3128 | JS-SCRIPT 5: 0395
        <div style="
// HTML 3129 | JS-SCRIPT 5: 0396
          display:flex;
// HTML 3130 | JS-SCRIPT 5: 0397
          justify-content:space-between;
// HTML 3131 | JS-SCRIPT 5: 0398
          align-items:center;
// HTML 3132 | JS-SCRIPT 5: 0399
          gap:15px;
// HTML 3133 | JS-SCRIPT 5: 0400
        ">
// HTML 3134 | JS-SCRIPT 5: 0401

// HTML 3135 | JS-SCRIPT 5: 0402
          <div>
// HTML 3136 | JS-SCRIPT 5: 0403

// HTML 3137 | JS-SCRIPT 5: 0404
            <div style="
// HTML 3138 | JS-SCRIPT 5: 0405
              font-size:11px;
// HTML 3139 | JS-SCRIPT 5: 0406
              letter-spacing:.08em;
// HTML 3140 | JS-SCRIPT 5: 0407
              color:rgba(255,255,255,.4);
// HTML 3141 | JS-SCRIPT 5: 0408
              font-weight:700;
// HTML 3142 | JS-SCRIPT 5: 0409
            ">
// HTML 3143 | JS-SCRIPT 5: 0410
              DÉTAIL ASTROLOGIQUE
// HTML 3144 | JS-SCRIPT 5: 0411
            </div>
// HTML 3145 | JS-SCRIPT 5: 0412

// HTML 3146 | JS-SCRIPT 5: 0413
            <div style="
// HTML 3147 | JS-SCRIPT 5: 0414
              margin-top:5px;
// HTML 3148 | JS-SCRIPT 5: 0415
              font-size:25px;
// HTML 3149 | JS-SCRIPT 5: 0416
              font-weight:900;
// HTML 3150 | JS-SCRIPT 5: 0417
            ">
// HTML 3151 | JS-SCRIPT 5: 0418
              ${icon}
// HTML 3152 | JS-SCRIPT 5: 0419
              ${esc(title)}
// HTML 3153 | JS-SCRIPT 5: 0420
            </div>
// HTML 3154 | JS-SCRIPT 5: 0421

// HTML 3155 | JS-SCRIPT 5: 0422
          </div>
// HTML 3156 | JS-SCRIPT 5: 0423

// HTML 3157 | JS-SCRIPT 5: 0424
          <button
// HTML 3158 | JS-SCRIPT 5: 0425
            type="button"
// HTML 3159 | JS-SCRIPT 5: 0426
            id="astromatchDirectDomainClose"
// HTML 3160 | JS-SCRIPT 5: 0427
            style="
// HTML 3161 | JS-SCRIPT 5: 0428
              width:42px;
// HTML 3162 | JS-SCRIPT 5: 0429
              height:42px;
// HTML 3163 | JS-SCRIPT 5: 0430
              border-radius:50%;
// HTML 3164 | JS-SCRIPT 5: 0431
              border:1px solid rgba(255,255,255,.12);
// HTML 3165 | JS-SCRIPT 5: 0432
              background:rgba(255,255,255,.07);
// HTML 3166 | JS-SCRIPT 5: 0433
              color:white;
// HTML 3167 | JS-SCRIPT 5: 0434
              font-size:25px;
// HTML 3168 | JS-SCRIPT 5: 0435
              cursor:pointer;
// HTML 3169 | JS-SCRIPT 5: 0436
            "
// HTML 3170 | JS-SCRIPT 5: 0437
          >×</button>
// HTML 3171 | JS-SCRIPT 5: 0438

// HTML 3172 | JS-SCRIPT 5: 0439
        </div>
// HTML 3173 | JS-SCRIPT 5: 0440

// HTML 3174 | JS-SCRIPT 5: 0441
        <div style="
// HTML 3175 | JS-SCRIPT 5: 0442
          display:flex;
// HTML 3176 | JS-SCRIPT 5: 0443
          justify-content:space-between;
// HTML 3177 | JS-SCRIPT 5: 0444
          align-items:end;
// HTML 3178 | JS-SCRIPT 5: 0445
          margin-top:20px;
// HTML 3179 | JS-SCRIPT 5: 0446
        ">
// HTML 3180 | JS-SCRIPT 5: 0447

// HTML 3181 | JS-SCRIPT 5: 0448
          <div>
// HTML 3182 | JS-SCRIPT 5: 0449

// HTML 3183 | JS-SCRIPT 5: 0450
            <div style="
// HTML 3184 | JS-SCRIPT 5: 0451
              font-size:13px;
// HTML 3185 | JS-SCRIPT 5: 0452
              color:rgba(255,255,255,.45);
// HTML 3186 | JS-SCRIPT 5: 0453
            ">
// HTML 3187 | JS-SCRIPT 5: 0454
              Niveau
// HTML 3188 | JS-SCRIPT 5: 0455
            </div>
// HTML 3189 | JS-SCRIPT 5: 0456

// HTML 3190 | JS-SCRIPT 5: 0457
            <div style="
// HTML 3191 | JS-SCRIPT 5: 0458
              margin-top:3px;
// HTML 3192 | JS-SCRIPT 5: 0459
              font-size:18px;
// HTML 3193 | JS-SCRIPT 5: 0460
              font-weight:800;
// HTML 3194 | JS-SCRIPT 5: 0461
            ">
// HTML 3195 | JS-SCRIPT 5: 0462
              ${esc(domain.label || domain.level || "—")}
// HTML 3196 | JS-SCRIPT 5: 0463
            </div>
// HTML 3197 | JS-SCRIPT 5: 0464

// HTML 3198 | JS-SCRIPT 5: 0465
          </div>
// HTML 3199 | JS-SCRIPT 5: 0466

// HTML 3200 | JS-SCRIPT 5: 0467
          <div style="text-align:right">
// HTML 3201 | JS-SCRIPT 5: 0468

// HTML 3202 | JS-SCRIPT 5: 0469
            <div style="
// HTML 3203 | JS-SCRIPT 5: 0470
              font-size:44px;
// HTML 3204 | JS-SCRIPT 5: 0471
              line-height:1;
// HTML 3205 | JS-SCRIPT 5: 0472
              font-weight:950;
// HTML 3206 | JS-SCRIPT 5: 0473
            ">
// HTML 3207 | JS-SCRIPT 5: 0474
              ${score}
// HTML 3208 | JS-SCRIPT 5: 0475
            </div>
// HTML 3209 | JS-SCRIPT 5: 0476

// HTML 3210 | JS-SCRIPT 5: 0477
            <div style="
// HTML 3211 | JS-SCRIPT 5: 0478
              font-size:12px;
// HTML 3212 | JS-SCRIPT 5: 0479
              color:rgba(255,255,255,.4);
// HTML 3213 | JS-SCRIPT 5: 0480
            ">
// HTML 3214 | JS-SCRIPT 5: 0481
              /100
// HTML 3215 | JS-SCRIPT 5: 0482
            </div>
// HTML 3216 | JS-SCRIPT 5: 0483

// HTML 3217 | JS-SCRIPT 5: 0484
          </div>
// HTML 3218 | JS-SCRIPT 5: 0485

// HTML 3219 | JS-SCRIPT 5: 0486
        </div>
// HTML 3220 | JS-SCRIPT 5: 0487

// HTML 3221 | JS-SCRIPT 5: 0488
        <div style="
// HTML 3222 | JS-SCRIPT 5: 0489
          height:8px;
// HTML 3223 | JS-SCRIPT 5: 0490
          margin-top:15px;
// HTML 3224 | JS-SCRIPT 5: 0491
          border-radius:999px;
// HTML 3225 | JS-SCRIPT 5: 0492
          background:rgba(255,255,255,.08);
// HTML 3226 | JS-SCRIPT 5: 0493
          overflow:hidden;
// HTML 3227 | JS-SCRIPT 5: 0494
        ">
// HTML 3228 | JS-SCRIPT 5: 0495
          <div style="
// HTML 3229 | JS-SCRIPT 5: 0496
            width:${Math.max(0,Math.min(100,score))}%;
// HTML 3230 | JS-SCRIPT 5: 0497
            height:100%;
// HTML 3231 | JS-SCRIPT 5: 0498
            border-radius:999px;
// HTML 3232 | JS-SCRIPT 5: 0499
            background:linear-gradient(
// HTML 3233 | JS-SCRIPT 5: 0500
              90deg,
// HTML 3234 | JS-SCRIPT 5: 0501
              #8b5cf6,
// HTML 3235 | JS-SCRIPT 5: 0502
              #ec4899
// HTML 3236 | JS-SCRIPT 5: 0503
            );
// HTML 3237 | JS-SCRIPT 5: 0504
          "></div>
// HTML 3238 | JS-SCRIPT 5: 0505
        </div>
// HTML 3239 | JS-SCRIPT 5: 0506

// HTML 3240 | JS-SCRIPT 5: 0507
      </div>
// HTML 3241 | JS-SCRIPT 5: 0508

// HTML 3242 | JS-SCRIPT 5: 0509
      <div style="padding:20px">
// HTML 3243 | JS-SCRIPT 5: 0510

// HTML 3244 | JS-SCRIPT 5: 0511
        ${renderFactors(
// HTML 3245 | JS-SCRIPT 5: 0512
          domain.strengths,
// HTML 3246 | JS-SCRIPT 5: 0513
          "Ce qui rapproche",
// HTML 3247 | JS-SCRIPT 5: 0514
          "💚"
// HTML 3248 | JS-SCRIPT 5: 0515
        )}
// HTML 3249 | JS-SCRIPT 5: 0516

// HTML 3250 | JS-SCRIPT 5: 0517
        ${renderFactors(
// HTML 3251 | JS-SCRIPT 5: 0518
          domain.tensions,
// HTML 3252 | JS-SCRIPT 5: 0519
          "Ce qui demande de l’attention",
// HTML 3253 | JS-SCRIPT 5: 0520
          "⚠️"
// HTML 3254 | JS-SCRIPT 5: 0521
        )}
// HTML 3255 | JS-SCRIPT 5: 0522

// HTML 3256 | JS-SCRIPT 5: 0523
        ${renderFactors(
// HTML 3257 | JS-SCRIPT 5: 0524
          domain.mixed_factors,
// HTML 3258 | JS-SCRIPT 5: 0525
          "Facteurs mixtes",
// HTML 3259 | JS-SCRIPT 5: 0526
          "◆"
// HTML 3260 | JS-SCRIPT 5: 0527
        )}
// HTML 3261 | JS-SCRIPT 5: 0528

// HTML 3262 | JS-SCRIPT 5: 0529
        ${renderFactors(
// HTML 3263 | JS-SCRIPT 5: 0530
          domain.key_factors,
// HTML 3264 | JS-SCRIPT 5: 0531
          "Facteurs clés",
// HTML 3265 | JS-SCRIPT 5: 0532
          "🎯"
// HTML 3266 | JS-SCRIPT 5: 0533
        )}
// HTML 3267 | JS-SCRIPT 5: 0534

// HTML 3268 | JS-SCRIPT 5: 0535
        <div style="
// HTML 3269 | JS-SCRIPT 5: 0536
          margin-top:22px;
// HTML 3270 | JS-SCRIPT 5: 0537
          padding:14px;
// HTML 3271 | JS-SCRIPT 5: 0538
          border-radius:16px;
// HTML 3272 | JS-SCRIPT 5: 0539
          background:rgba(255,255,255,.04);
// HTML 3273 | JS-SCRIPT 5: 0540
          border:1px solid rgba(255,255,255,.07);
// HTML 3274 | JS-SCRIPT 5: 0541
          text-align:center;
// HTML 3275 | JS-SCRIPT 5: 0542
        ">
// HTML 3276 | JS-SCRIPT 5: 0543

// HTML 3277 | JS-SCRIPT 5: 0544
          <div style="
// HTML 3278 | JS-SCRIPT 5: 0545
            font-size:12px;
// HTML 3279 | JS-SCRIPT 5: 0546
            color:rgba(255,255,255,.42);
// HTML 3280 | JS-SCRIPT 5: 0547
          ">
// HTML 3281 | JS-SCRIPT 5: 0548
            FACTEURS ASTROLOGIQUES
// HTML 3282 | JS-SCRIPT 5: 0549
          </div>
// HTML 3283 | JS-SCRIPT 5: 0550

// HTML 3284 | JS-SCRIPT 5: 0551
          <div style="
// HTML 3285 | JS-SCRIPT 5: 0552
            margin-top:4px;
// HTML 3286 | JS-SCRIPT 5: 0553
            font-size:15px;
// HTML 3287 | JS-SCRIPT 5: 0554
            font-weight:700;
// HTML 3288 | JS-SCRIPT 5: 0555
            color:rgba(255,255,255,.78);
// HTML 3289 | JS-SCRIPT 5: 0556
          ">
// HTML 3290 | JS-SCRIPT 5: 0557
            ${Number(domain.contribution_count || 0)}
// HTML 3291 | JS-SCRIPT 5: 0558
            facteur(s) contribuent à ce domaine.
// HTML 3292 | JS-SCRIPT 5: 0559
          </div>
// HTML 3293 | JS-SCRIPT 5: 0560

// HTML 3294 | JS-SCRIPT 5: 0561
        </div>
// HTML 3295 | JS-SCRIPT 5: 0562

// HTML 3296 | JS-SCRIPT 5: 0563
        <div style="
// HTML 3297 | JS-SCRIPT 5: 0564
          margin-top:18px;
// HTML 3298 | JS-SCRIPT 5: 0565
          text-align:center;
// HTML 3299 | JS-SCRIPT 5: 0566
          font-size:11px;
// HTML 3300 | JS-SCRIPT 5: 0567
          color:rgba(255,255,255,.3);
// HTML 3301 | JS-SCRIPT 5: 0568
        ">
// HTML 3302 | JS-SCRIPT 5: 0569
          Calcul astrologique réel AstroMatch
// HTML 3303 | JS-SCRIPT 5: 0570
          · aucune modification du score
// HTML 3304 | JS-SCRIPT 5: 0571
        </div>
// HTML 3305 | JS-SCRIPT 5: 0572

// HTML 3306 | JS-SCRIPT 5: 0573
      </div>
// HTML 3307 | JS-SCRIPT 5: 0574

// HTML 3308 | JS-SCRIPT 5: 0575
    </div>
// HTML 3309 | JS-SCRIPT 5: 0576
  `;
// HTML 3310 | JS-SCRIPT 5: 0577

// HTML 3311 | JS-SCRIPT 5: 0578
  document.body.appendChild(modal);
// HTML 3312 | JS-SCRIPT 5: 0579

// HTML 3313 | JS-SCRIPT 5: 0580
  document
// HTML 3314 | JS-SCRIPT 5: 0581
    .getElementById(
// HTML 3315 | JS-SCRIPT 5: 0582
      "astromatchDirectDomainClose"
// HTML 3316 | JS-SCRIPT 5: 0583
    )
// HTML 3317 | JS-SCRIPT 5: 0584
    ?.addEventListener(
// HTML 3318 | JS-SCRIPT 5: 0585
      "click",
// HTML 3319 | JS-SCRIPT 5: 0586
      () => modal.remove()
// HTML 3320 | JS-SCRIPT 5: 0587
    );
// HTML 3321 | JS-SCRIPT 5: 0588

// HTML 3322 | JS-SCRIPT 5: 0589
  modal.addEventListener(
// HTML 3323 | JS-SCRIPT 5: 0590
    "click",
// HTML 3324 | JS-SCRIPT 5: 0591
    event => {
// HTML 3325 | JS-SCRIPT 5: 0592
      if (event.target === modal) {
// HTML 3326 | JS-SCRIPT 5: 0593
        modal.remove();
// HTML 3327 | JS-SCRIPT 5: 0594
      }
// HTML 3328 | JS-SCRIPT 5: 0595
    }
// HTML 3329 | JS-SCRIPT 5: 0596
  );
// HTML 3330 | JS-SCRIPT 5: 0597
};
// HTML 3331 | JS-SCRIPT 5: 0598

// HTML 3332 | JS-SCRIPT 5: 0599

// HTML 3333 | JS-SCRIPT 5: 0600
  const lists = (items, title, icon) => {
// HTML 3334 | JS-SCRIPT 5: 0601

// HTML 3335 | JS-SCRIPT 5: 0602
    if (!Array.isArray(items) || !items.length) return "";
// HTML 3336 | JS-SCRIPT 5: 0603

// HTML 3337 | JS-SCRIPT 5: 0604
    return `
// HTML 3338 | JS-SCRIPT 5: 0605
      <div style="margin-top:18px">
// HTML 3339 | JS-SCRIPT 5: 0606
        <div style="
// HTML 3340 | JS-SCRIPT 5: 0607
          font-size:16px;
// HTML 3341 | JS-SCRIPT 5: 0608
          font-weight:800;
// HTML 3342 | JS-SCRIPT 5: 0609
          margin-bottom:8px;
// HTML 3343 | JS-SCRIPT 5: 0610
        ">
// HTML 3344 | JS-SCRIPT 5: 0611
          ${icon} ${title}
// HTML 3345 | JS-SCRIPT 5: 0612
        </div>
// HTML 3346 | JS-SCRIPT 5: 0613

// HTML 3347 | JS-SCRIPT 5: 0614
        <div style="
// HTML 3348 | JS-SCRIPT 5: 0615
          display:flex;
// HTML 3349 | JS-SCRIPT 5: 0616
          flex-direction:column;
// HTML 3350 | JS-SCRIPT 5: 0617
          gap:8px;
// HTML 3351 | JS-SCRIPT 5: 0618
        ">
// HTML 3352 | JS-SCRIPT 5: 0619
          ${items.map(x => `
// HTML 3353 | JS-SCRIPT 5: 0620
            <div style="
// HTML 3354 | JS-SCRIPT 5: 0621
              padding:11px 13px;
// HTML 3355 | JS-SCRIPT 5: 0622
              border-radius:12px;
// HTML 3356 | JS-SCRIPT 5: 0623
              background:rgba(255,255,255,.05);
// HTML 3357 | JS-SCRIPT 5: 0624
              color:rgba(255,255,255,.82);
// HTML 3358 | JS-SCRIPT 5: 0625
              font-size:14px;
// HTML 3359 | JS-SCRIPT 5: 0626
            ">
// HTML 3360 | JS-SCRIPT 5: 0627
              • ${esc(factorText(x))}
// HTML 3361 | JS-SCRIPT 5: 0628
            </div>
// HTML 3362 | JS-SCRIPT 5: 0629
          `).join("")}
// HTML 3363 | JS-SCRIPT 5: 0630
        </div>
// HTML 3364 | JS-SCRIPT 5: 0631
      </div>
// HTML 3365 | JS-SCRIPT 5: 0632
    `;
// HTML 3366 | JS-SCRIPT 5: 0633
  };
// HTML 3367 | JS-SCRIPT 5: 0634

// HTML 3368 | JS-SCRIPT 5: 0635
  const score = Math.round(Number(domain.score || 0));
// HTML 3369 | JS-SCRIPT 5: 0636

// HTML 3370 | JS-SCRIPT 5: 0637
  const icon = ({
// HTML 3371 | JS-SCRIPT 5: 0638
    love:"❤️",
// HTML 3372 | JS-SCRIPT 5: 0639
    emotions:"🌙",
// HTML 3373 | JS-SCRIPT 5: 0640
    communication:"🗣️",
// HTML 3374 | JS-SCRIPT 5: 0641
    passion:"🔥",
// HTML 3375 | JS-SCRIPT 5: 0642
    daily_life:"🏠",
// HTML 3376 | JS-SCRIPT 5: 0643
    projects:"🚀",
// HTML 3377 | JS-SCRIPT 5: 0644
    family:"👨‍👩‍👧‍👦",
// HTML 3378 | JS-SCRIPT 5: 0645
    frictions:"⚠️"
// HTML 3379 | JS-SCRIPT 5: 0646
  })[String(domain.domain || "").toLowerCase()] || "✨";
// HTML 3380 | JS-SCRIPT 5: 0647

// HTML 3381 | JS-SCRIPT 5: 0648
  const old = document.getElementById(
// HTML 3382 | JS-SCRIPT 5: 0649
    "astromatchDirectDomainModal"
// HTML 3383 | JS-SCRIPT 5: 0650
  );
// HTML 3384 | JS-SCRIPT 5: 0651

// HTML 3385 | JS-SCRIPT 5: 0652
  if (old) old.remove();
// HTML 3386 | JS-SCRIPT 5: 0653

// HTML 3387 | JS-SCRIPT 5: 0654
  const modal = document.createElement("div");
// HTML 3388 | JS-SCRIPT 5: 0655

// HTML 3389 | JS-SCRIPT 5: 0656
  modal.id = "astromatchDirectDomainModal";
// HTML 3390 | JS-SCRIPT 5: 0657

// HTML 3391 | JS-SCRIPT 5: 0658
  modal.style.cssText = `
// HTML 3392 | JS-SCRIPT 5: 0659
    position:fixed;
// HTML 3393 | JS-SCRIPT 5: 0660
    inset:0;
// HTML 3394 | JS-SCRIPT 5: 0661
    z-index:2147483647;
// HTML 3395 | JS-SCRIPT 5: 0662
    display:flex;
// HTML 3396 | JS-SCRIPT 5: 0663
    align-items:center;
// HTML 3397 | JS-SCRIPT 5: 0664
    justify-content:center;
// HTML 3398 | JS-SCRIPT 5: 0665
    padding:16px;
// HTML 3399 | JS-SCRIPT 5: 0666
    background:rgba(0,0,0,.82);
// HTML 3400 | JS-SCRIPT 5: 0667
    backdrop-filter:blur(10px);
// HTML 3401 | JS-SCRIPT 5: 0668
    -webkit-backdrop-filter:blur(10px);
// HTML 3402 | JS-SCRIPT 5: 0669
  `;
// HTML 3403 | JS-SCRIPT 5: 0670

// HTML 3404 | JS-SCRIPT 5: 0671
  modal.innerHTML = `
// HTML 3405 | JS-SCRIPT 5: 0672
    <div style="
// HTML 3406 | JS-SCRIPT 5: 0673
      width:min(680px,100%);
// HTML 3407 | JS-SCRIPT 5: 0674
      max-height:90vh;
// HTML 3408 | JS-SCRIPT 5: 0675
      overflow:auto;
// HTML 3409 | JS-SCRIPT 5: 0676
      border-radius:24px;
// HTML 3410 | JS-SCRIPT 5: 0677
      background:#11111b;
// HTML 3411 | JS-SCRIPT 5: 0678
      border:1px solid rgba(255,255,255,.14);
// HTML 3412 | JS-SCRIPT 5: 0679
      box-shadow:0 30px 100px rgba(0,0,0,.7);
// HTML 3413 | JS-SCRIPT 5: 0680
      color:white;
// HTML 3414 | JS-SCRIPT 5: 0681
    ">
// HTML 3415 | JS-SCRIPT 5: 0682

// HTML 3416 | JS-SCRIPT 5: 0683
      <div style="
// HTML 3417 | JS-SCRIPT 5: 0684
        position:sticky;
// HTML 3418 | JS-SCRIPT 5: 0685
        top:0;
// HTML 3419 | JS-SCRIPT 5: 0686
        z-index:2;
// HTML 3420 | JS-SCRIPT 5: 0687
        padding:20px;
// HTML 3421 | JS-SCRIPT 5: 0688
        background:#151521;
// HTML 3422 | JS-SCRIPT 5: 0689
        border-bottom:1px solid rgba(255,255,255,.08);
// HTML 3423 | JS-SCRIPT 5: 0690
      ">
// HTML 3424 | JS-SCRIPT 5: 0691

// HTML 3425 | JS-SCRIPT 5: 0692
        <div style="
// HTML 3426 | JS-SCRIPT 5: 0693
          display:flex;
// HTML 3427 | JS-SCRIPT 5: 0694
          justify-content:space-between;
// HTML 3428 | JS-SCRIPT 5: 0695
          align-items:center;
// HTML 3429 | JS-SCRIPT 5: 0696
          gap:15px;
// HTML 3430 | JS-SCRIPT 5: 0697
        ">
// HTML 3431 | JS-SCRIPT 5: 0698

// HTML 3432 | JS-SCRIPT 5: 0699
          <div>
// HTML 3433 | JS-SCRIPT 5: 0700
            <div style="
// HTML 3434 | JS-SCRIPT 5: 0701
              font-size:12px;
// HTML 3435 | JS-SCRIPT 5: 0702
              color:rgba(255,255,255,.45);
// HTML 3436 | JS-SCRIPT 5: 0703
            ">
// HTML 3437 | JS-SCRIPT 5: 0704
              DÉTAIL DU DOMAINE
// HTML 3438 | JS-SCRIPT 5: 0705
            </div>
// HTML 3439 | JS-SCRIPT 5: 0706

// HTML 3440 | JS-SCRIPT 5: 0707
            <div style="
// HTML 3441 | JS-SCRIPT 5: 0708
              margin-top:5px;
// HTML 3442 | JS-SCRIPT 5: 0709
              font-size:25px;
// HTML 3443 | JS-SCRIPT 5: 0710
              font-weight:900;
// HTML 3444 | JS-SCRIPT 5: 0711
            ">
// HTML 3445 | JS-SCRIPT 5: 0712
              ${icon}
// HTML 3446 | JS-SCRIPT 5: 0713
              ${esc(domain.domain)}
// HTML 3447 | JS-SCRIPT 5: 0714
            </div>
// HTML 3448 | JS-SCRIPT 5: 0715
          </div>
// HTML 3449 | JS-SCRIPT 5: 0716

// HTML 3450 | JS-SCRIPT 5: 0717
          <button
// HTML 3451 | JS-SCRIPT 5: 0718
            type="button"
// HTML 3452 | JS-SCRIPT 5: 0719
            id="astromatchDirectDomainClose"
// HTML 3453 | JS-SCRIPT 5: 0720
            style="
// HTML 3454 | JS-SCRIPT 5: 0721
              width:42px;
// HTML 3455 | JS-SCRIPT 5: 0722
              height:42px;
// HTML 3456 | JS-SCRIPT 5: 0723
              border-radius:50%;
// HTML 3457 | JS-SCRIPT 5: 0724
              border:1px solid rgba(255,255,255,.12);
// HTML 3458 | JS-SCRIPT 5: 0725
              background:rgba(255,255,255,.07);
// HTML 3459 | JS-SCRIPT 5: 0726
              color:white;
// HTML 3460 | JS-SCRIPT 5: 0727
              font-size:25px;
// HTML 3461 | JS-SCRIPT 5: 0728
              cursor:pointer;
// HTML 3462 | JS-SCRIPT 5: 0729
            "
// HTML 3463 | JS-SCRIPT 5: 0730
          >×</button>
// HTML 3464 | JS-SCRIPT 5: 0731

// HTML 3465 | JS-SCRIPT 5: 0732
        </div>
// HTML 3466 | JS-SCRIPT 5: 0733

// HTML 3467 | JS-SCRIPT 5: 0734
        <div style="
// HTML 3468 | JS-SCRIPT 5: 0735
          display:flex;
// HTML 3469 | JS-SCRIPT 5: 0736
          justify-content:space-between;
// HTML 3470 | JS-SCRIPT 5: 0737
          align-items:end;
// HTML 3471 | JS-SCRIPT 5: 0738
          margin-top:20px;
// HTML 3472 | JS-SCRIPT 5: 0739
        ">
// HTML 3473 | JS-SCRIPT 5: 0740

// HTML 3474 | JS-SCRIPT 5: 0741
          <div>
// HTML 3475 | JS-SCRIPT 5: 0742
            <div style="
// HTML 3476 | JS-SCRIPT 5: 0743
              color:rgba(255,255,255,.45);
// HTML 3477 | JS-SCRIPT 5: 0744
              font-size:13px;
// HTML 3478 | JS-SCRIPT 5: 0745
            ">
// HTML 3479 | JS-SCRIPT 5: 0746
              Niveau
// HTML 3480 | JS-SCRIPT 5: 0747
            </div>
// HTML 3481 | JS-SCRIPT 5: 0748

// HTML 3482 | JS-SCRIPT 5: 0749
            <div style="
// HTML 3483 | JS-SCRIPT 5: 0750
              font-size:18px;
// HTML 3484 | JS-SCRIPT 5: 0751
              font-weight:800;
// HTML 3485 | JS-SCRIPT 5: 0752
              margin-top:4px;
// HTML 3486 | JS-SCRIPT 5: 0753
            ">
// HTML 3487 | JS-SCRIPT 5: 0754
              ${esc(domain.label || domain.level || "—")}
// HTML 3488 | JS-SCRIPT 5: 0755
            </div>
// HTML 3489 | JS-SCRIPT 5: 0756
          </div>
// HTML 3490 | JS-SCRIPT 5: 0757

// HTML 3491 | JS-SCRIPT 5: 0758
          <div style="text-align:right">
// HTML 3492 | JS-SCRIPT 5: 0759
            <div style="
// HTML 3493 | JS-SCRIPT 5: 0760
              font-size:42px;
// HTML 3494 | JS-SCRIPT 5: 0761
              line-height:1;
// HTML 3495 | JS-SCRIPT 5: 0762
              font-weight:900;
// HTML 3496 | JS-SCRIPT 5: 0763
            ">
// HTML 3497 | JS-SCRIPT 5: 0764
              ${score}
// HTML 3498 | JS-SCRIPT 5: 0765
            </div>
// HTML 3499 | JS-SCRIPT 5: 0766

// HTML 3500 | JS-SCRIPT 5: 0767
            <div style="
// HTML 3501 | JS-SCRIPT 5: 0768
              font-size:12px;
// HTML 3502 | JS-SCRIPT 5: 0769
              color:rgba(255,255,255,.4);
// HTML 3503 | JS-SCRIPT 5: 0770
            ">
// HTML 3504 | JS-SCRIPT 5: 0771
              /100
// HTML 3505 | JS-SCRIPT 5: 0772
            </div>
// HTML 3506 | JS-SCRIPT 5: 0773
          </div>
// HTML 3507 | JS-SCRIPT 5: 0774

// HTML 3508 | JS-SCRIPT 5: 0775
        </div>
// HTML 3509 | JS-SCRIPT 5: 0776

// HTML 3510 | JS-SCRIPT 5: 0777
        <div style="
// HTML 3511 | JS-SCRIPT 5: 0778
          height:8px;
// HTML 3512 | JS-SCRIPT 5: 0779
          margin-top:15px;
// HTML 3513 | JS-SCRIPT 5: 0780
          background:rgba(255,255,255,.08);
// HTML 3514 | JS-SCRIPT 5: 0781
          border-radius:999px;
// HTML 3515 | JS-SCRIPT 5: 0782
          overflow:hidden;
// HTML 3516 | JS-SCRIPT 5: 0783
        ">
// HTML 3517 | JS-SCRIPT 5: 0784
          <div style="
// HTML 3518 | JS-SCRIPT 5: 0785
            width:${Math.max(0,Math.min(100,score))}%;
// HTML 3519 | JS-SCRIPT 5: 0786
            height:100%;
// HTML 3520 | JS-SCRIPT 5: 0787
            background:linear-gradient(90deg,#8b5cf6,#ec4899);
// HTML 3521 | JS-SCRIPT 5: 0788
          "></div>
// HTML 3522 | JS-SCRIPT 5: 0789
        </div>
// HTML 3523 | JS-SCRIPT 5: 0790

// HTML 3524 | JS-SCRIPT 5: 0791
      </div>
// HTML 3525 | JS-SCRIPT 5: 0792

// HTML 3526 | JS-SCRIPT 5: 0793
      <div style="padding:20px">
// HTML 3527 | JS-SCRIPT 5: 0794

// HTML 3528 | JS-SCRIPT 5: 0795
        ${lists(
// HTML 3529 | JS-SCRIPT 5: 0796
          domain.strengths,
// HTML 3530 | JS-SCRIPT 5: 0797
          "Ce qui rapproche",
// HTML 3531 | JS-SCRIPT 5: 0798
          "💚"
// HTML 3532 | JS-SCRIPT 5: 0799
        )}
// HTML 3533 | JS-SCRIPT 5: 0800

// HTML 3534 | JS-SCRIPT 5: 0801
        ${lists(
// HTML 3535 | JS-SCRIPT 5: 0802
          domain.tensions,
// HTML 3536 | JS-SCRIPT 5: 0803
          "Points de tension",
// HTML 3537 | JS-SCRIPT 5: 0804
          "⚠️"
// HTML 3538 | JS-SCRIPT 5: 0805
        )}
// HTML 3539 | JS-SCRIPT 5: 0806

// HTML 3540 | JS-SCRIPT 5: 0807
        ${lists(
// HTML 3541 | JS-SCRIPT 5: 0808
          domain.mixed_factors,
// HTML 3542 | JS-SCRIPT 5: 0809
          "Facteurs mixtes",
// HTML 3543 | JS-SCRIPT 5: 0810
          "◆"
// HTML 3544 | JS-SCRIPT 5: 0811
        )}
// HTML 3545 | JS-SCRIPT 5: 0812

// HTML 3546 | JS-SCRIPT 5: 0813
        ${lists(
// HTML 3547 | JS-SCRIPT 5: 0814
          domain.key_factors,
// HTML 3548 | JS-SCRIPT 5: 0815
          "Facteurs clés",
// HTML 3549 | JS-SCRIPT 5: 0816
          "🎯"
// HTML 3550 | JS-SCRIPT 5: 0817
        )}
// HTML 3551 | JS-SCRIPT 5: 0818

// HTML 3552 | JS-SCRIPT 5: 0819
        <div style="
// HTML 3553 | JS-SCRIPT 5: 0820
          margin-top:20px;
// HTML 3554 | JS-SCRIPT 5: 0821
          padding:13px;
// HTML 3555 | JS-SCRIPT 5: 0822
          border-radius:14px;
// HTML 3556 | JS-SCRIPT 5: 0823
          background:rgba(255,255,255,.04);
// HTML 3557 | JS-SCRIPT 5: 0824
          color:rgba(255,255,255,.5);
// HTML 3558 | JS-SCRIPT 5: 0825
          font-size:12px;
// HTML 3559 | JS-SCRIPT 5: 0826
          text-align:center;
// HTML 3560 | JS-SCRIPT 5: 0827
        ">
// HTML 3561 | JS-SCRIPT 5: 0828
          ${Number(domain.contribution_count || 0)}
// HTML 3562 | JS-SCRIPT 5: 0829
          facteur(s) astrologique(s) contribuent à ce domaine.
// HTML 3563 | JS-SCRIPT 5: 0830
        </div>
// HTML 3564 | JS-SCRIPT 5: 0831

// HTML 3565 | JS-SCRIPT 5: 0832
      </div>
// HTML 3566 | JS-SCRIPT 5: 0833

// HTML 3567 | JS-SCRIPT 5: 0834
    </div>
// HTML 3568 | JS-SCRIPT 5: 0835
  `;
// HTML 3569 | JS-SCRIPT 5: 0836

// HTML 3570 | JS-SCRIPT 5: 0837
  document.body.appendChild(modal);
// HTML 3571 | JS-SCRIPT 5: 0838

// HTML 3572 | JS-SCRIPT 5: 0839
  document
// HTML 3573 | JS-SCRIPT 5: 0840
    .getElementById("astromatchDirectDomainClose")
// HTML 3574 | JS-SCRIPT 5: 0841
    ?.addEventListener("click", () => modal.remove());
// HTML 3575 | JS-SCRIPT 5: 0842

// HTML 3576 | JS-SCRIPT 5: 0843
  modal.addEventListener("click", e => {
// HTML 3577 | JS-SCRIPT 5: 0844
    if (e.target === modal) modal.remove();
// HTML 3578 | JS-SCRIPT 5: 0845
  });
// HTML 3579 | JS-SCRIPT 5: 0846
};
// ===== SCRIPT 6 | HTML START 3583 =====
// HTML 3583 | JS-SCRIPT 6: 0001

// HTML 3584 | JS-SCRIPT 6: 0002
/* ASTROMATCH_CAPTURE_DOMAIN_INTERCEPTOR */
// HTML 3585 | JS-SCRIPT 6: 0003

// HTML 3586 | JS-SCRIPT 6: 0004
(function () {
// HTML 3587 | JS-SCRIPT 6: 0005

// HTML 3588 | JS-SCRIPT 6: 0006
  document.addEventListener(
// HTML 3589 | JS-SCRIPT 6: 0007
    "click",
// HTML 3590 | JS-SCRIPT 6: 0008
    function (event) {
// HTML 3591 | JS-SCRIPT 6: 0009

// HTML 3592 | JS-SCRIPT 6: 0010
      const card =
// HTML 3593 | JS-SCRIPT 6: 0011
        event.target.closest(
// HTML 3594 | JS-SCRIPT 6: 0012
          "[data-astromatch-domain-key]"
// HTML 3595 | JS-SCRIPT 6: 0013
        );
// HTML 3596 | JS-SCRIPT 6: 0014

// HTML 3597 | JS-SCRIPT 6: 0015
      if (!card) return;
// HTML 3598 | JS-SCRIPT 6: 0016

// HTML 3599 | JS-SCRIPT 6: 0017
      const key =
// HTML 3600 | JS-SCRIPT 6: 0018
        card.getAttribute(
// HTML 3601 | JS-SCRIPT 6: 0019
          "data-astromatch-domain-key"
// HTML 3602 | JS-SCRIPT 6: 0020
        );
// HTML 3603 | JS-SCRIPT 6: 0021

// HTML 3604 | JS-SCRIPT 6: 0022
      if (!key) return;
// HTML 3605 | JS-SCRIPT 6: 0023

// HTML 3606 | JS-SCRIPT 6: 0024
      console.log(
// HTML 3607 | JS-SCRIPT 6: 0025
        "ASTROMATCH CAPTURE CLICK =",
// HTML 3608 | JS-SCRIPT 6: 0026
        key
// HTML 3609 | JS-SCRIPT 6: 0027
      );
// HTML 3610 | JS-SCRIPT 6: 0028

// HTML 3611 | JS-SCRIPT 6: 0029
      /*
// HTML 3612 | JS-SCRIPT 6: 0030
       * On intercepte AVANT les anciens handlers.
// HTML 3613 | JS-SCRIPT 6: 0031
       */
// HTML 3614 | JS-SCRIPT 6: 0032
      event.preventDefault();
// HTML 3615 | JS-SCRIPT 6: 0033
      event.stopImmediatePropagation();
// HTML 3616 | JS-SCRIPT 6: 0034

// HTML 3617 | JS-SCRIPT 6: 0035
      if (
// HTML 3618 | JS-SCRIPT 6: 0036
        typeof window.astromatchDirectDomainDetail ===
// HTML 3619 | JS-SCRIPT 6: 0037
        "function"
// HTML 3620 | JS-SCRIPT 6: 0038
      ) {
// HTML 3621 | JS-SCRIPT 6: 0039

// HTML 3622 | JS-SCRIPT 6: 0040
        console.log(
// HTML 3623 | JS-SCRIPT 6: 0041
          "ASTROMATCH CAPTURE → DIRECT MODAL"
// HTML 3624 | JS-SCRIPT 6: 0042
        );
// HTML 3625 | JS-SCRIPT 6: 0043

// HTML 3626 | JS-SCRIPT 6: 0044
        window.astromatchDirectDomainDetail(key);
// HTML 3627 | JS-SCRIPT 6: 0045

// HTML 3628 | JS-SCRIPT 6: 0046
      } else {
// HTML 3629 | JS-SCRIPT 6: 0047

// HTML 3630 | JS-SCRIPT 6: 0048
        console.warn(
// HTML 3631 | JS-SCRIPT 6: 0049
          "ASTROMATCH CAPTURE : direct modal indisponible"
// HTML 3632 | JS-SCRIPT 6: 0050
        );
// HTML 3633 | JS-SCRIPT 6: 0051

// HTML 3634 | JS-SCRIPT 6: 0052
      }
// HTML 3635 | JS-SCRIPT 6: 0053

// HTML 3636 | JS-SCRIPT 6: 0054
    },
// HTML 3637 | JS-SCRIPT 6: 0055
    true
// HTML 3638 | JS-SCRIPT 6: 0056
  );
// HTML 3639 | JS-SCRIPT 6: 0057

// HTML 3640 | JS-SCRIPT 6: 0058
  console.log(
// HTML 3641 | JS-SCRIPT 6: 0059
    "ASTROMATCH CAPTURE INTERCEPTOR READY"
// HTML 3642 | JS-SCRIPT 6: 0060
  );
// HTML 3643 | JS-SCRIPT 6: 0061

// HTML 3644 | JS-SCRIPT 6: 0062
})();
// ===== SCRIPT 7 | HTML START 3647 =====
// HTML 3647 | JS-SCRIPT 7: 0001

// HTML 3648 | JS-SCRIPT 7: 0002

// HTML 3649 | JS-SCRIPT 7: 0003
const API_URL = "http://127.0.0.1:3000/api/match";
// HTML 3650 | JS-SCRIPT 7: 0004

// HTML 3651 | JS-SCRIPT 7: 0005
const diagnostic = document.getElementById("jsDiagnostic");
// HTML 3652 | JS-SCRIPT 7: 0006

// HTML 3653 | JS-SCRIPT 7: 0007
function status(message) {
// HTML 3654 | JS-SCRIPT 7: 0008
  if (diagnostic) {
// HTML 3655 | JS-SCRIPT 7: 0009
    diagnostic.textContent = message;
// HTML 3656 | JS-SCRIPT 7: 0010
  }
// HTML 3657 | JS-SCRIPT 7: 0011
}
// HTML 3658 | JS-SCRIPT 7: 0012

// HTML 3659 | JS-SCRIPT 7: 0013
/*
// HTML 3660 | JS-SCRIPT 7: 0014
 * Bridge scope module -> fonctions classiques
// HTML 3661 | JS-SCRIPT 7: 0015
 */
// HTML 3662 | JS-SCRIPT 7: 0016
window.__astromatchStatus = status;
// HTML 3663 | JS-SCRIPT 7: 0017

// HTML 3664 | JS-SCRIPT 7: 0018

// HTML 3665 | JS-SCRIPT 7: 0019
function escapeHtml(value) {
// HTML 3666 | JS-SCRIPT 7: 0020
  return String(value ?? "")
// HTML 3667 | JS-SCRIPT 7: 0021
    .replace(/&/g, "&amp;")
// HTML 3668 | JS-SCRIPT 7: 0022
    .replace(/</g, "&lt;")
// HTML 3669 | JS-SCRIPT 7: 0023
    .replace(/>/g, "&gt;")
// HTML 3670 | JS-SCRIPT 7: 0024
    .replace(/"/g, "&quot;")
// HTML 3671 | JS-SCRIPT 7: 0025
    .replace(/'/g, "&#039;");
// HTML 3672 | JS-SCRIPT 7: 0026
}
// HTML 3673 | JS-SCRIPT 7: 0027

// HTML 3674 | JS-SCRIPT 7: 0028
/* =========================================================
// HTML 3675 | JS-SCRIPT 7: 0029
   PROFILS REELS
// HTML 3676 | JS-SCRIPT 7: 0030
   ========================================================= */
// HTML 3677 | JS-SCRIPT 7: 0031

// HTML 3678 | JS-SCRIPT 7: 0032
function getStoredProfiles() {
// HTML 3679 | JS-SCRIPT 7: 0033
  const raw = localStorage.getItem("astromatch:profiles");
// HTML 3680 | JS-SCRIPT 7: 0034

// HTML 3681 | JS-SCRIPT 7: 0035
  if (!raw) {
// HTML 3682 | JS-SCRIPT 7: 0036
    throw new Error("AUCUN_PROFIL_STOCKE");
// HTML 3683 | JS-SCRIPT 7: 0037
  }
// HTML 3684 | JS-SCRIPT 7: 0038

// HTML 3685 | JS-SCRIPT 7: 0039
  let profiles;
// HTML 3686 | JS-SCRIPT 7: 0040

// HTML 3687 | JS-SCRIPT 7: 0041
  try {
// HTML 3688 | JS-SCRIPT 7: 0042
    profiles = JSON.parse(raw);
// HTML 3689 | JS-SCRIPT 7: 0043
  } catch {
// HTML 3690 | JS-SCRIPT 7: 0044
    throw new Error("PROFILS_JSON_INVALIDE");
// HTML 3691 | JS-SCRIPT 7: 0045
  }
// HTML 3692 | JS-SCRIPT 7: 0046

// HTML 3693 | JS-SCRIPT 7: 0047
  if (!Array.isArray(profiles)) {
// HTML 3694 | JS-SCRIPT 7: 0048
    throw new Error("PROFILS_FORMAT_INVALIDE");
// HTML 3695 | JS-SCRIPT 7: 0049
  }
// HTML 3696 | JS-SCRIPT 7: 0050

// HTML 3697 | JS-SCRIPT 7: 0051
  return profiles;
// HTML 3698 | JS-SCRIPT 7: 0052
}
// HTML 3699 | JS-SCRIPT 7: 0053

// HTML 3700 | JS-SCRIPT 7: 0054
function getRealProfiles() {
// HTML 3701 | JS-SCRIPT 7: 0055
  const profiles = getStoredProfiles();
// HTML 3702 | JS-SCRIPT 7: 0056

// HTML 3703 | JS-SCRIPT 7: 0057
  const primary = profiles.find(
// HTML 3704 | JS-SCRIPT 7: 0058
    profile => profile?.role === "primary"
// HTML 3705 | JS-SCRIPT 7: 0059
  );
// HTML 3706 | JS-SCRIPT 7: 0060

// HTML 3707 | JS-SCRIPT 7: 0061
  if (!primary) {
// HTML 3708 | JS-SCRIPT 7: 0062
    throw new Error("PROFIL_PRINCIPAL_INTRouvable");
// HTML 3709 | JS-SCRIPT 7: 0063
  }
// HTML 3710 | JS-SCRIPT 7: 0064

// HTML 3711 | JS-SCRIPT 7: 0065
  const linkedTargets = profiles.filter(
// HTML 3712 | JS-SCRIPT 7: 0066
    profile =>
// HTML 3713 | JS-SCRIPT 7: 0067
      profile?.role === "target" &&
// HTML 3714 | JS-SCRIPT 7: 0068
      profile?.linked_primary_id === primary.profile_id
// HTML 3715 | JS-SCRIPT 7: 0069
  );
// HTML 3716 | JS-SCRIPT 7: 0070

// HTML 3717 | JS-SCRIPT 7: 0071
  /*
// HTML 3718 | JS-SCRIPT 7: 0072
   * Compatibilité avec d'anciens profils target
// HTML 3719 | JS-SCRIPT 7: 0073
   * ne possédant pas encore linked_primary_id.
// HTML 3720 | JS-SCRIPT 7: 0074
   */
// HTML 3721 | JS-SCRIPT 7: 0075
  const fallbackTargets = profiles.filter(
// HTML 3722 | JS-SCRIPT 7: 0076
    profile =>
// HTML 3723 | JS-SCRIPT 7: 0077
      profile?.role === "target" &&
// HTML 3724 | JS-SCRIPT 7: 0078
      !profile?.linked_primary_id
// HTML 3725 | JS-SCRIPT 7: 0079
  );
// HTML 3726 | JS-SCRIPT 7: 0080

// HTML 3727 | JS-SCRIPT 7: 0081
  const targets = [
// HTML 3728 | JS-SCRIPT 7: 0082
    ...linkedTargets,
// HTML 3729 | JS-SCRIPT 7: 0083
    ...fallbackTargets.filter(
// HTML 3730 | JS-SCRIPT 7: 0084
      fallback =>
// HTML 3731 | JS-SCRIPT 7: 0085
        !linkedTargets.some(
// HTML 3732 | JS-SCRIPT 7: 0086
          target => target?.profile_id === fallback?.profile_id
// HTML 3733 | JS-SCRIPT 7: 0087
        )
// HTML 3734 | JS-SCRIPT 7: 0088
    )
// HTML 3735 | JS-SCRIPT 7: 0089
  ];
// HTML 3736 | JS-SCRIPT 7: 0090

// HTML 3737 | JS-SCRIPT 7: 0091
  if (!targets.length) {
// HTML 3738 | JS-SCRIPT 7: 0092
    throw new Error("AUCUN_PROFIL_CIBLE");
// HTML 3739 | JS-SCRIPT 7: 0093
  }
// HTML 3740 | JS-SCRIPT 7: 0094

// HTML 3741 | JS-SCRIPT 7: 0095
  return {
// HTML 3742 | JS-SCRIPT 7: 0096
    primary,
// HTML 3743 | JS-SCRIPT 7: 0097
    targets
// HTML 3744 | JS-SCRIPT 7: 0098
  };
// HTML 3745 | JS-SCRIPT 7: 0099
}
// HTML 3746 | JS-SCRIPT 7: 0100

// HTML 3747 | JS-SCRIPT 7: 0101
/* =========================================================
// HTML 3748 | JS-SCRIPT 7: 0102
   PROFIL STOCKE -> INPUT API
// HTML 3749 | JS-SCRIPT 7: 0103
   ========================================================= */
// HTML 3750 | JS-SCRIPT 7: 0104

// HTML 3751 | JS-SCRIPT 7: 0105
function profileToApiInput(profile) {
// HTML 3752 | JS-SCRIPT 7: 0106
  if (!profile) {
// HTML 3753 | JS-SCRIPT 7: 0107
    throw new Error("PROFIL_INVALIDE");
// HTML 3754 | JS-SCRIPT 7: 0108
  }
// HTML 3755 | JS-SCRIPT 7: 0109

// HTML 3756 | JS-SCRIPT 7: 0110
  const birth = profile.birth_data || {};
// HTML 3757 | JS-SCRIPT 7: 0111
  const time = birth.time || {};
// HTML 3758 | JS-SCRIPT 7: 0112
  const place = birth.place || {};
// HTML 3759 | JS-SCRIPT 7: 0113
  const resolved = place.resolved || {};
// HTML 3760 | JS-SCRIPT 7: 0114

// HTML 3761 | JS-SCRIPT 7: 0115
  return {
// HTML 3762 | JS-SCRIPT 7: 0116
    role: profile.role,
// HTML 3763 | JS-SCRIPT 7: 0117

// HTML 3764 | JS-SCRIPT 7: 0118
    first_name:
// HTML 3765 | JS-SCRIPT 7: 0119
      profile.identity?.first_name || "",
// HTML 3766 | JS-SCRIPT 7: 0120

// HTML 3767 | JS-SCRIPT 7: 0121
    last_name:
// HTML 3768 | JS-SCRIPT 7: 0122
      profile.identity?.last_name || "",
// HTML 3769 | JS-SCRIPT 7: 0123

// HTML 3770 | JS-SCRIPT 7: 0124
    date:
// HTML 3771 | JS-SCRIPT 7: 0125
      birth.date || "",
// HTML 3772 | JS-SCRIPT 7: 0126

// HTML 3773 | JS-SCRIPT 7: 0127
    time:
// HTML 3774 | JS-SCRIPT 7: 0128
      time.value || "",
// HTML 3775 | JS-SCRIPT 7: 0129

// HTML 3776 | JS-SCRIPT 7: 0130
    time_known:
// HTML 3777 | JS-SCRIPT 7: 0131
      Boolean(time.known),
// HTML 3778 | JS-SCRIPT 7: 0132

// HTML 3779 | JS-SCRIPT 7: 0133
    place:
// HTML 3780 | JS-SCRIPT 7: 0134
      place.raw_input || "",
// HTML 3781 | JS-SCRIPT 7: 0135

// HTML 3782 | JS-SCRIPT 7: 0136
    latitude:
// HTML 3783 | JS-SCRIPT 7: 0137
      resolved.latitude,
// HTML 3784 | JS-SCRIPT 7: 0138

// HTML 3785 | JS-SCRIPT 7: 0139
    longitude:
// HTML 3786 | JS-SCRIPT 7: 0140
      resolved.longitude,
// HTML 3787 | JS-SCRIPT 7: 0141

// HTML 3788 | JS-SCRIPT 7: 0142
    timezone_id:
// HTML 3789 | JS-SCRIPT 7: 0143
      resolved.timezone_id,
// HTML 3790 | JS-SCRIPT 7: 0144

// HTML 3791 | JS-SCRIPT 7: 0145
    house_system:
// HTML 3792 | JS-SCRIPT 7: 0146
      profile.house_system || "whole_sign",
// HTML 3793 | JS-SCRIPT 7: 0147

// HTML 3794 | JS-SCRIPT 7: 0148
    linked_primary_id:
// HTML 3795 | JS-SCRIPT 7: 0149
      profile.linked_primary_id || null
// HTML 3796 | JS-SCRIPT 7: 0150
  };
// HTML 3797 | JS-SCRIPT 7: 0151
}
// HTML 3798 | JS-SCRIPT 7: 0152

// HTML 3799 | JS-SCRIPT 7: 0153
/* =========================================================
// HTML 3800 | JS-SCRIPT 7: 0154
   RENDU DES DOMAINES
// HTML 3801 | JS-SCRIPT 7: 0155
   ========================================================= */
// HTML 3802 | JS-SCRIPT 7: 0156

// HTML 3803 | JS-SCRIPT 7: 0157

// HTML 3804 | JS-SCRIPT 7: 0158
const DOMAIN_META = {
// HTML 3805 | JS-SCRIPT 7: 0159
  love: {
// HTML 3806 | JS-SCRIPT 7: 0160
    icon: "❤️",
// HTML 3807 | JS-SCRIPT 7: 0161
    label: "Amour"
// HTML 3808 | JS-SCRIPT 7: 0162
  },
// HTML 3809 | JS-SCRIPT 7: 0163
  emotions: {
// HTML 3810 | JS-SCRIPT 7: 0164
    icon: "🌙",
// HTML 3811 | JS-SCRIPT 7: 0165
    label: "Émotions"
// HTML 3812 | JS-SCRIPT 7: 0166
  },
// HTML 3813 | JS-SCRIPT 7: 0167
  communication: {
// HTML 3814 | JS-SCRIPT 7: 0168
    icon: "🗣️",
// HTML 3815 | JS-SCRIPT 7: 0169
    label: "Communication"
// HTML 3816 | JS-SCRIPT 7: 0170
  },
// HTML 3817 | JS-SCRIPT 7: 0171
  passion: {
// HTML 3818 | JS-SCRIPT 7: 0172
    icon: "🔥",
// HTML 3819 | JS-SCRIPT 7: 0173
    label: "Passion"
// HTML 3820 | JS-SCRIPT 7: 0174
  },
// HTML 3821 | JS-SCRIPT 7: 0175
  daily: {
// HTML 3822 | JS-SCRIPT 7: 0176
    icon: "🏠",
// HTML 3823 | JS-SCRIPT 7: 0177
    label: "Quotidien"
// HTML 3824 | JS-SCRIPT 7: 0178
  },
// HTML 3825 | JS-SCRIPT 7: 0179
  projects: {
// HTML 3826 | JS-SCRIPT 7: 0180
    icon: "🚀",
// HTML 3827 | JS-SCRIPT 7: 0181
    label: "Projets"
// HTML 3828 | JS-SCRIPT 7: 0182
  },
// HTML 3829 | JS-SCRIPT 7: 0183
  frictions: {
// HTML 3830 | JS-SCRIPT 7: 0184
    icon: "⚠️",
// HTML 3831 | JS-SCRIPT 7: 0185
    label: "Frictions"
// HTML 3832 | JS-SCRIPT 7: 0186
  }
// HTML 3833 | JS-SCRIPT 7: 0187
};
// HTML 3834 | JS-SCRIPT 7: 0188

// HTML 3835 | JS-SCRIPT 7: 0189
const LEVEL_LABELS = {
// HTML 3836 | JS-SCRIPT 7: 0190
  exceptional: "Exceptionnel",
// HTML 3837 | JS-SCRIPT 7: 0191
  very_high: "Très élevé",
// HTML 3838 | JS-SCRIPT 7: 0192
  high: "Élevé",
// HTML 3839 | JS-SCRIPT 7: 0193
  balanced: "Équilibré",
// HTML 3840 | JS-SCRIPT 7: 0194
  moderate: "Modéré",
// HTML 3841 | JS-SCRIPT 7: 0195
  low: "Faible",
// HTML 3842 | JS-SCRIPT 7: 0196
  very_low: "Très faible"
// HTML 3843 | JS-SCRIPT 7: 0197
};
// HTML 3844 | JS-SCRIPT 7: 0198

// HTML 3845 | JS-SCRIPT 7: 0199
const FACTOR_LABELS = {
// HTML 3846 | JS-SCRIPT 7: 0200
  V11_SUN_VENUS_OPPOSITION: "Soleil — Vénus en opposition",
// HTML 3847 | JS-SCRIPT 7: 0201
  V11_VENUS_JUPITER_TRINE: "Vénus — Jupiter en trigone",
// HTML 3848 | JS-SCRIPT 7: 0202
  V11_MERCURY_MOON_SQUARE: "Mercure — Lune en carré",
// HTML 3849 | JS-SCRIPT 7: 0203
  V11_VENUS_MARS_SQUARE: "Vénus — Mars en carré",
// HTML 3850 | JS-SCRIPT 7: 0204
  V11B_JUPITER_NEPTUNE_TRINE: "Jupiter — Neptune en trigone",
// HTML 3851 | JS-SCRIPT 7: 0205
  V11B_JUPITER_URANUS_TRINE: "Jupiter — Uranus en trigone"
// HTML 3852 | JS-SCRIPT 7: 0206
};
// HTML 3853 | JS-SCRIPT 7: 0207

// HTML 3854 | JS-SCRIPT 7: 0208

// HTML 3855 | JS-SCRIPT 7: 0209
const FACTOR_FALLBACK_LABELS = {
// HTML 3856 | JS-SCRIPT 7: 0210
  "SUN_VENUS_OPPOSITION": "Soleil — Vénus en opposition",
// HTML 3857 | JS-SCRIPT 7: 0211
  "VENUS_JUPITER_TRINE": "Vénus — Jupiter en trigone",
// HTML 3858 | JS-SCRIPT 7: 0212
  "MERCURY_MOON_SQUARE": "Mercure — Lune en carré",
// HTML 3859 | JS-SCRIPT 7: 0213
  "VENUS_MARS_SQUARE": "Vénus — Mars en carré",
// HTML 3860 | JS-SCRIPT 7: 0214
  "JUPITER_NEPTUNE_TRINE": "Jupiter — Neptune en trigone",
// HTML 3861 | JS-SCRIPT 7: 0215
  "JUPITER_URANUS_TRINE": "Jupiter — Uranus en trigone"
// HTML 3862 | JS-SCRIPT 7: 0216
};
// HTML 3863 | JS-SCRIPT 7: 0217

// HTML 3864 | JS-SCRIPT 7: 0218
/*
// HTML 3865 | JS-SCRIPT 7: 0219
 * ============================================================
// HTML 3866 | JS-SCRIPT 7: 0220
 * ASTROMATCH V1.2 — HUMAN FACTORS
// HTML 3867 | JS-SCRIPT 7: 0221
 * ------------------------------------------------------------
// HTML 3868 | JS-SCRIPT 7: 0222
 * Les rule_id sont internes au moteur.
// HTML 3869 | JS-SCRIPT 7: 0223
 * L'utilisateur final voit une formulation naturelle.
// HTML 3870 | JS-SCRIPT 7: 0224
 *
// HTML 3871 | JS-SCRIPT 7: 0225
 * 51 / 51 règles V1.2 couvertes.
// HTML 3872 | JS-SCRIPT 7: 0226
 * Aucun impact sur le scoring ou le calcul astrologique.
// HTML 3873 | JS-SCRIPT 7: 0227
 * ============================================================
// HTML 3874 | JS-SCRIPT 7: 0228
 */
// HTML 3875 | JS-SCRIPT 7: 0229

// HTML 3876 | JS-SCRIPT 7: 0230
const ASTROMATCH_HUMAN_FACTORS = {
// HTML 3877 | JS-SCRIPT 7: 0231

// HTML 3878 | JS-SCRIPT 7: 0232
  AMOUR_VENUS_CONJ_VENUS:
// HTML 3879 | JS-SCRIPT 7: 0233
    "Une façon d’aimer très proche",
// HTML 3880 | JS-SCRIPT 7: 0234

// HTML 3881 | JS-SCRIPT 7: 0235
  AMOUR_VENUS_TRI_SOLEIL:
// HTML 3882 | JS-SCRIPT 7: 0236
    "Une belle harmonie entre affection et personnalité",
// HTML 3883 | JS-SCRIPT 7: 0237

// HTML 3884 | JS-SCRIPT 7: 0238
  AMOUR_SATURNE_CARRE_VENUS:
// HTML 3885 | JS-SCRIPT 7: 0239
    "L’affection peut parfois sembler retenue",
// HTML 3886 | JS-SCRIPT 7: 0240

// HTML 3887 | JS-SCRIPT 7: 0241
  PASSION_VENUS_CONJ_MARS:
// HTML 3888 | JS-SCRIPT 7: 0242
    "Une forte alchimie et une attirance naturelle",
// HTML 3889 | JS-SCRIPT 7: 0243

// HTML 3890 | JS-SCRIPT 7: 0244
  PASSION_MARS_TRI_PLUTON:
// HTML 3891 | JS-SCRIPT 7: 0245
    "Une énergie passionnée et profondément intense",
// HTML 3892 | JS-SCRIPT 7: 0246

// HTML 3893 | JS-SCRIPT 7: 0247
  COMM_MERCURE_SEX_MERCURE:
// HTML 3894 | JS-SCRIPT 7: 0248
    "Une communication fluide et complémentaire",
// HTML 3895 | JS-SCRIPT 7: 0249

// HTML 3896 | JS-SCRIPT 7: 0250
  COMM_MERCURE_CARRE_MARS:
// HTML 3897 | JS-SCRIPT 7: 0251
    "Les discussions peuvent parfois devenir très vives",
// HTML 3898 | JS-SCRIPT 7: 0252

// HTML 3899 | JS-SCRIPT 7: 0253
  EMOTIONS_LUNE_CONJ_LUNE:
// HTML 3900 | JS-SCRIPT 7: 0254
    "Une forte résonance émotionnelle",
// HTML 3901 | JS-SCRIPT 7: 0255

// HTML 3902 | JS-SCRIPT 7: 0256
  EMOTIONS_LUNE_OPPO_NEPTUNE:
// HTML 3903 | JS-SCRIPT 7: 0257
    "Les émotions peuvent parfois manquer de clarté",
// HTML 3904 | JS-SCRIPT 7: 0258

// HTML 3905 | JS-SCRIPT 7: 0259
  QUOTIDIEN_SATURNE_TRI_LUNE:
// HTML 3906 | JS-SCRIPT 7: 0260
    "Un bon équilibre entre stabilité et émotions",
// HTML 3907 | JS-SCRIPT 7: 0261

// HTML 3908 | JS-SCRIPT 7: 0262
  PROJETS_SOLEIL_CONJ_SATURNE:
// HTML 3909 | JS-SCRIPT 7: 0263
    "Une capacité à construire quelque chose de solide",
// HTML 3910 | JS-SCRIPT 7: 0264

// HTML 3911 | JS-SCRIPT 7: 0265
  FRICTIONS_MARS_OPPO_SATURNE:
// HTML 3912 | JS-SCRIPT 7: 0266
    "Des blocages peuvent apparaître face aux initiatives",
// HTML 3913 | JS-SCRIPT 7: 0267

// HTML 3914 | JS-SCRIPT 7: 0268
  FRICTIONS_URANUS_CARRE_MARS:
// HTML 3915 | JS-SCRIPT 7: 0269
    "Une dynamique imprévisible peut créer des tensions",
// HTML 3916 | JS-SCRIPT 7: 0270

// HTML 3917 | JS-SCRIPT 7: 0271
  V11_SUN_MOON_CONJ:
// HTML 3918 | JS-SCRIPT 7: 0272
    "Une forte connexion entre identité et émotions",
// HTML 3919 | JS-SCRIPT 7: 0273

// HTML 3920 | JS-SCRIPT 7: 0274
  V11_SUN_MOON_TRINE:
// HTML 3921 | JS-SCRIPT 7: 0275
    "Une belle harmonie entre personnalité et émotions",
// HTML 3922 | JS-SCRIPT 7: 0276

// HTML 3923 | JS-SCRIPT 7: 0277
  V11_SUN_MOON_SQUARE:
// HTML 3924 | JS-SCRIPT 7: 0278
    "La personnalité et les émotions peuvent parfois diverger",
// HTML 3925 | JS-SCRIPT 7: 0279

// HTML 3926 | JS-SCRIPT 7: 0280
  V11_SUN_VENUS_CONJ:
// HTML 3927 | JS-SCRIPT 7: 0281
    "Une affection naturelle et spontanée",
// HTML 3928 | JS-SCRIPT 7: 0282

// HTML 3929 | JS-SCRIPT 7: 0283
  V11_SUN_VENUS_SEXTILE:
// HTML 3930 | JS-SCRIPT 7: 0284
    "Une bonne entente entre personnalité et affection",
// HTML 3931 | JS-SCRIPT 7: 0285

// HTML 3932 | JS-SCRIPT 7: 0286
  V11_SUN_VENUS_OPPOSITION:
// HTML 3933 | JS-SCRIPT 7: 0287
    "Une forte attirance, avec des différences de fonctionnement",
// HTML 3934 | JS-SCRIPT 7: 0288

// HTML 3935 | JS-SCRIPT 7: 0289
  V11_MOON_VENUS_CONJ:
// HTML 3936 | JS-SCRIPT 7: 0290
    "Une grande douceur et une affection naturelle",
// HTML 3937 | JS-SCRIPT 7: 0291

// HTML 3938 | JS-SCRIPT 7: 0292
  V11_MOON_VENUS_TRINE:
// HTML 3939 | JS-SCRIPT 7: 0293
    "Une belle harmonie affective",
// HTML 3940 | JS-SCRIPT 7: 0294

// HTML 3941 | JS-SCRIPT 7: 0295
  V11_MOON_VENUS_SQUARE:
// HTML 3942 | JS-SCRIPT 7: 0296
    "Les besoins affectifs peuvent parfois se heurter",
// HTML 3943 | JS-SCRIPT 7: 0297

// HTML 3944 | JS-SCRIPT 7: 0298
  V11_MERCURY_MOON_TRINE:
// HTML 3945 | JS-SCRIPT 7: 0299
    "Une bonne compréhension entre pensées et émotions",
// HTML 3946 | JS-SCRIPT 7: 0300

// HTML 3947 | JS-SCRIPT 7: 0301
  V11_MERCURY_MOON_SQUARE:
// HTML 3948 | JS-SCRIPT 7: 0302
    "Les émotions peuvent parfois compliquer les échanges",
// HTML 3949 | JS-SCRIPT 7: 0303

// HTML 3950 | JS-SCRIPT 7: 0304
  V11_MERCURY_VENUS_CONJ:
// HTML 3951 | JS-SCRIPT 7: 0305
    "Une communication naturellement chaleureuse",
// HTML 3952 | JS-SCRIPT 7: 0306

// HTML 3953 | JS-SCRIPT 7: 0307
  V11_MERCURY_VENUS_TRINE:
// HTML 3954 | JS-SCRIPT 7: 0308
    "Une communication naturelle et agréable",
// HTML 3955 | JS-SCRIPT 7: 0309

// HTML 3956 | JS-SCRIPT 7: 0310
  V11_MERCURY_MARS_TRINE:
// HTML 3957 | JS-SCRIPT 7: 0311
    "Des échanges dynamiques et stimulants",
// HTML 3958 | JS-SCRIPT 7: 0312

// HTML 3959 | JS-SCRIPT 7: 0313
  V11_MOON_MARS_TRINE:
// HTML 3960 | JS-SCRIPT 7: 0314
    "Une énergie émotionnelle qui circule naturellement",
// HTML 3961 | JS-SCRIPT 7: 0315

// HTML 3962 | JS-SCRIPT 7: 0316
  V11_MOON_MARS_SQUARE:
// HTML 3963 | JS-SCRIPT 7: 0317
    "Les émotions peuvent parfois provoquer des réactions fortes",
// HTML 3964 | JS-SCRIPT 7: 0318

// HTML 3965 | JS-SCRIPT 7: 0319
  V11_VENUS_MARS_TRINE:
// HTML 3966 | JS-SCRIPT 7: 0320
    "Une belle alchimie entre affection et passion",
// HTML 3967 | JS-SCRIPT 7: 0321

// HTML 3968 | JS-SCRIPT 7: 0322
  V11_VENUS_MARS_SQUARE:
// HTML 3969 | JS-SCRIPT 7: 0323
    "Une attirance intense et parfois électrique",
// HTML 3970 | JS-SCRIPT 7: 0324

// HTML 3971 | JS-SCRIPT 7: 0325
  V11_VENUS_JUPITER_CONJ:
// HTML 3972 | JS-SCRIPT 7: 0326
    "Une grande générosité dans les sentiments",
// HTML 3973 | JS-SCRIPT 7: 0327

// HTML 3974 | JS-SCRIPT 7: 0328
  V11_VENUS_JUPITER_TRINE:
// HTML 3975 | JS-SCRIPT 7: 0329
    "Une belle harmonie affective et généreuse",
// HTML 3976 | JS-SCRIPT 7: 0330

// HTML 3977 | JS-SCRIPT 7: 0331
  V11_SUN_JUPITER_TRINE:
// HTML 3978 | JS-SCRIPT 7: 0332
    "Une énergie positive qui encourage la confiance",
// HTML 3979 | JS-SCRIPT 7: 0333

// HTML 3980 | JS-SCRIPT 7: 0334
  V11_MOON_JUPITER_TRINE:
// HTML 3981 | JS-SCRIPT 7: 0335
    "Une chaleur émotionnelle et une belle générosité",
// HTML 3982 | JS-SCRIPT 7: 0336

// HTML 3983 | JS-SCRIPT 7: 0337
  V11_JUPITER_SATURN_TRINE:
// HTML 3984 | JS-SCRIPT 7: 0338
    "Une bonne capacité à faire grandir des projets durables",
// HTML 3985 | JS-SCRIPT 7: 0339

// HTML 3986 | JS-SCRIPT 7: 0340
  V11B_JUPITER_URANUS_CONJ:
// HTML 3987 | JS-SCRIPT 7: 0341
    "Une relation qui encourage le changement et la découverte",
// HTML 3988 | JS-SCRIPT 7: 0342

// HTML 3989 | JS-SCRIPT 7: 0343
  V11B_JUPITER_URANUS_TRINE:
// HTML 3990 | JS-SCRIPT 7: 0344
    "Une énergie qui pousse à découvrir de nouvelles choses",
// HTML 3991 | JS-SCRIPT 7: 0345

// HTML 3992 | JS-SCRIPT 7: 0346
  V11B_JUPITER_URANUS_SQUARE:
// HTML 3993 | JS-SCRIPT 7: 0347
    "Des envies différentes peuvent créer de l’instabilité",
// HTML 3994 | JS-SCRIPT 7: 0348

// HTML 3995 | JS-SCRIPT 7: 0349
  V11B_JUPITER_NEPTUNE_CONJ:
// HTML 3996 | JS-SCRIPT 7: 0350
    "Une forte capacité à partager des rêves et des idéaux",
// HTML 3997 | JS-SCRIPT 7: 0351

// HTML 3998 | JS-SCRIPT 7: 0352
  V11B_JUPITER_NEPTUNE_TRINE:
// HTML 3999 | JS-SCRIPT 7: 0353
    "Une vision commune qui peut nourrir les rêves",
// HTML 4000 | JS-SCRIPT 7: 0354

// HTML 4001 | JS-SCRIPT 7: 0355
  V11B_JUPITER_NEPTUNE_SQUARE:
// HTML 4002 | JS-SCRIPT 7: 0356
    "Les attentes et les idéaux peuvent parfois manquer de réalisme",
// HTML 4003 | JS-SCRIPT 7: 0357

// HTML 4004 | JS-SCRIPT 7: 0358
  V11B_JUPITER_PLUTO_CONJ:
// HTML 4005 | JS-SCRIPT 7: 0359
    "Une relation qui peut provoquer de profondes transformations",
// HTML 4006 | JS-SCRIPT 7: 0360

// HTML 4007 | JS-SCRIPT 7: 0361
  V11B_JUPITER_PLUTO_TRINE:
// HTML 4008 | JS-SCRIPT 7: 0362
    "Une dynamique puissante qui favorise l’évolution",
// HTML 4009 | JS-SCRIPT 7: 0363

// HTML 4010 | JS-SCRIPT 7: 0364
  V11B_JUPITER_PLUTO_SQUARE:
// HTML 4011 | JS-SCRIPT 7: 0365
    "Les ambitions peuvent parfois provoquer des rapports de force",
// HTML 4012 | JS-SCRIPT 7: 0366

// HTML 4013 | JS-SCRIPT 7: 0367
  V11B_SATURN_URANUS_TRINE:
// HTML 4014 | JS-SCRIPT 7: 0368
    "Un bon équilibre entre stabilité et changement",
// HTML 4015 | JS-SCRIPT 7: 0369

// HTML 4016 | JS-SCRIPT 7: 0370
  V11B_SATURN_URANUS_SQUARE:
// HTML 4017 | JS-SCRIPT 7: 0371
    "Le besoin de stabilité peut entrer en conflit avec l’envie de liberté",
// HTML 4018 | JS-SCRIPT 7: 0372

// HTML 4019 | JS-SCRIPT 7: 0373
  V11B_SATURN_NEPTUNE_TRINE:
// HTML 4020 | JS-SCRIPT 7: 0374
    "La stabilité peut donner une forme concrète aux rêves",
// HTML 4021 | JS-SCRIPT 7: 0375

// HTML 4022 | JS-SCRIPT 7: 0376
  V11B_SATURN_NEPTUNE_SQUARE:
// HTML 4023 | JS-SCRIPT 7: 0377
    "Les responsabilités peuvent parfois freiner les aspirations",
// HTML 4024 | JS-SCRIPT 7: 0378

// HTML 4025 | JS-SCRIPT 7: 0379
  V11B_SATURN_PLUTO_TRINE:
// HTML 4026 | JS-SCRIPT 7: 0380
    "Une grande capacité à traverser les changements ensemble",
// HTML 4027 | JS-SCRIPT 7: 0381

// HTML 4028 | JS-SCRIPT 7: 0382
  V11B_SATURN_PLUTO_SQUARE:
// HTML 4029 | JS-SCRIPT 7: 0383
    "Les périodes de changement peuvent créer une forte pression",
// HTML 4030 | JS-SCRIPT 7: 0384

// HTML 4031 | JS-SCRIPT 7: 0385
};
// HTML 4032 | JS-SCRIPT 7: 0386

// HTML 4033 | JS-SCRIPT 7: 0387

// HTML 4034 | JS-SCRIPT 7: 0388
/*
// HTML 4035 | JS-SCRIPT 7: 0389
 * Retourne uniquement le libellé humain destiné à l'interface.
// HTML 4036 | JS-SCRIPT 7: 0390
 * Le rule_id reste accessible dans les données techniques.
// HTML 4037 | JS-SCRIPT 7: 0391
 */
// HTML 4038 | JS-SCRIPT 7: 0392
function humanFactorLabel(value) {
// HTML 4039 | JS-SCRIPT 7: 0393
  const root = value ?? {};
// HTML 4040 | JS-SCRIPT 7: 0394
  const item = root?.item ?? root ?? {};
// HTML 4041 | JS-SCRIPT 7: 0395

// HTML 4042 | JS-SCRIPT 7: 0396
  /*
// HTML 4043 | JS-SCRIPT 7: 0397
   * ==========================================================
// HTML 4044 | JS-SCRIPT 7: 0398
   * RESOLUTION HUMAN FACTOR — PRIORITE AU VRAI RULE_ID
// HTML 4045 | JS-SCRIPT 7: 0399
   * ==========================================================
// HTML 4046 | JS-SCRIPT 7: 0400
   *
// HTML 4047 | JS-SCRIPT 7: 0401
   * IMPORTANT :
// HTML 4048 | JS-SCRIPT 7: 0402
   * "id", "code" et "key" peuvent être des identifiants
// HTML 4049 | JS-SCRIPT 7: 0403
   * techniques d'objet et ne doivent jamais prendre priorité
// HTML 4050 | JS-SCRIPT 7: 0404
   * sur le rule_id AstroMatch.
// HTML 4051 | JS-SCRIPT 7: 0405
   */
// HTML 4052 | JS-SCRIPT 7: 0406

// HTML 4053 | JS-SCRIPT 7: 0407
  const ruleIdCandidates = [
// HTML 4054 | JS-SCRIPT 7: 0408
    root?.rule_id,
// HTML 4055 | JS-SCRIPT 7: 0409
    root?.ruleId,
// HTML 4056 | JS-SCRIPT 7: 0410

// HTML 4057 | JS-SCRIPT 7: 0411
    item?.rule_id,
// HTML 4058 | JS-SCRIPT 7: 0412
    item?.ruleId,
// HTML 4059 | JS-SCRIPT 7: 0413

// HTML 4060 | JS-SCRIPT 7: 0414
    root?.contribution?.rule_id,
// HTML 4061 | JS-SCRIPT 7: 0415
    root?.contribution?.ruleId,
// HTML 4062 | JS-SCRIPT 7: 0416

// HTML 4063 | JS-SCRIPT 7: 0417
    root?.rule?.rule_id,
// HTML 4064 | JS-SCRIPT 7: 0418
    root?.rule?.ruleId,
// HTML 4065 | JS-SCRIPT 7: 0419

// HTML 4066 | JS-SCRIPT 7: 0420
    root?.factor?.rule_id,
// HTML 4067 | JS-SCRIPT 7: 0421
    root?.factor?.ruleId,
// HTML 4068 | JS-SCRIPT 7: 0422

// HTML 4069 | JS-SCRIPT 7: 0423
    item?.contribution?.rule_id,
// HTML 4070 | JS-SCRIPT 7: 0424
    item?.contribution?.ruleId,
// HTML 4071 | JS-SCRIPT 7: 0425

// HTML 4072 | JS-SCRIPT 7: 0426
    item?.rule?.rule_id,
// HTML 4073 | JS-SCRIPT 7: 0427
    item?.rule?.ruleId,
// HTML 4074 | JS-SCRIPT 7: 0428

// HTML 4075 | JS-SCRIPT 7: 0429
    item?.factor?.rule_id,
// HTML 4076 | JS-SCRIPT 7: 0430
    item?.factor?.ruleId
// HTML 4077 | JS-SCRIPT 7: 0431
  ];
// HTML 4078 | JS-SCRIPT 7: 0432

// HTML 4079 | JS-SCRIPT 7: 0433
  const ruleId = ruleIdCandidates.find(
// HTML 4080 | JS-SCRIPT 7: 0434
    v =>
// HTML 4081 | JS-SCRIPT 7: 0435
      v !== undefined &&
// HTML 4082 | JS-SCRIPT 7: 0436
      v !== null &&
// HTML 4083 | JS-SCRIPT 7: 0437
      String(v).trim() !== ""
// HTML 4084 | JS-SCRIPT 7: 0438
  );
// HTML 4085 | JS-SCRIPT 7: 0439

// HTML 4086 | JS-SCRIPT 7: 0440
  const normalizedRuleId = String(
// HTML 4087 | JS-SCRIPT 7: 0441
    ruleId ?? ""
// HTML 4088 | JS-SCRIPT 7: 0442
  ).trim().toUpperCase();
// HTML 4089 | JS-SCRIPT 7: 0443

// HTML 4090 | JS-SCRIPT 7: 0444
  /*
// HTML 4091 | JS-SCRIPT 7: 0445
   * PRIORITE ABSOLUE :
// HTML 4092 | JS-SCRIPT 7: 0446
   * dictionnaire humain V1.2.
// HTML 4093 | JS-SCRIPT 7: 0447
   */
// HTML 4094 | JS-SCRIPT 7: 0448
  if (
// HTML 4095 | JS-SCRIPT 7: 0449
    normalizedRuleId &&
// HTML 4096 | JS-SCRIPT 7: 0450
    typeof ASTROMATCH_HUMAN_FACTORS !== "undefined" &&
// HTML 4097 | JS-SCRIPT 7: 0451
    ASTROMATCH_HUMAN_FACTORS[normalizedRuleId]
// HTML 4098 | JS-SCRIPT 7: 0452
  ) {
// HTML 4099 | JS-SCRIPT 7: 0453
    const factor =
// HTML 4100 | JS-SCRIPT 7: 0454
      ASTROMATCH_HUMAN_FACTORS[normalizedRuleId];
// HTML 4101 | JS-SCRIPT 7: 0455

// HTML 4102 | JS-SCRIPT 7: 0456
    if (typeof factor === "string") {
// HTML 4103 | JS-SCRIPT 7: 0457
      return factor;
// HTML 4104 | JS-SCRIPT 7: 0458
    }
// HTML 4105 | JS-SCRIPT 7: 0459

// HTML 4106 | JS-SCRIPT 7: 0460
    if (factor?.title) {
// HTML 4107 | JS-SCRIPT 7: 0461
      return String(factor.title);
// HTML 4108 | JS-SCRIPT 7: 0462
    }
// HTML 4109 | JS-SCRIPT 7: 0463
  }
// HTML 4110 | JS-SCRIPT 7: 0464

// HTML 4111 | JS-SCRIPT 7: 0465
  /*
// HTML 4112 | JS-SCRIPT 7: 0466
   * Fallback court pour compatibilité avec les anciennes
// HTML 4113 | JS-SCRIPT 7: 0467
   * structures de facteurs.
// HTML 4114 | JS-SCRIPT 7: 0468
   */
// HTML 4115 | JS-SCRIPT 7: 0469
  const shortRuleId = normalizedRuleId
// HTML 4116 | JS-SCRIPT 7: 0470
    .replace(/^V11B_/, "")
// HTML 4117 | JS-SCRIPT 7: 0471
    .replace(/^V11_/, "")
// HTML 4118 | JS-SCRIPT 7: 0472
    .replace(/^V\d+_/, "");
// HTML 4119 | JS-SCRIPT 7: 0473

// HTML 4120 | JS-SCRIPT 7: 0474
  if (
// HTML 4121 | JS-SCRIPT 7: 0475
    shortRuleId &&
// HTML 4122 | JS-SCRIPT 7: 0476
    typeof FACTOR_FALLBACK_LABELS !== "undefined" &&
// HTML 4123 | JS-SCRIPT 7: 0477
    FACTOR_FALLBACK_LABELS[shortRuleId]
// HTML 4124 | JS-SCRIPT 7: 0478
  ) {
// HTML 4125 | JS-SCRIPT 7: 0479
    return FACTOR_FALLBACK_LABELS[shortRuleId];
// HTML 4126 | JS-SCRIPT 7: 0480
  }
// HTML 4127 | JS-SCRIPT 7: 0481

// HTML 4128 | JS-SCRIPT 7: 0482
  /*
// HTML 4129 | JS-SCRIPT 7: 0483
   * Seulement maintenant :
// HTML 4130 | JS-SCRIPT 7: 0484
   * champs humains éventuellement fournis directement
// HTML 4131 | JS-SCRIPT 7: 0485
   * par le backend.
// HTML 4132 | JS-SCRIPT 7: 0486
   */
// HTML 4133 | JS-SCRIPT 7: 0487
  const humanFields = [
// HTML 4134 | JS-SCRIPT 7: 0488
    root?.name,
// HTML 4135 | JS-SCRIPT 7: 0489
    root?.label,
// HTML 4136 | JS-SCRIPT 7: 0490
    root?.title,
// HTML 4137 | JS-SCRIPT 7: 0491

// HTML 4138 | JS-SCRIPT 7: 0492
    item?.name,
// HTML 4139 | JS-SCRIPT 7: 0493
    item?.label,
// HTML 4140 | JS-SCRIPT 7: 0494
    item?.title
// HTML 4141 | JS-SCRIPT 7: 0495
  ];
// HTML 4142 | JS-SCRIPT 7: 0496

// HTML 4143 | JS-SCRIPT 7: 0497
  const humanValue = humanFields.find(
// HTML 4144 | JS-SCRIPT 7: 0498
    v =>
// HTML 4145 | JS-SCRIPT 7: 0499
      v !== undefined &&
// HTML 4146 | JS-SCRIPT 7: 0500
      v !== null &&
// HTML 4147 | JS-SCRIPT 7: 0501
      String(v).trim() !== ""
// HTML 4148 | JS-SCRIPT 7: 0502
  );
// HTML 4149 | JS-SCRIPT 7: 0503

// HTML 4150 | JS-SCRIPT 7: 0504
  if (humanValue) {
// HTML 4151 | JS-SCRIPT 7: 0505
    return String(humanValue);
// HTML 4152 | JS-SCRIPT 7: 0506
  }
// HTML 4153 | JS-SCRIPT 7: 0507

// HTML 4154 | JS-SCRIPT 7: 0508
  /*
// HTML 4155 | JS-SCRIPT 7: 0509
   * Dernier recours :
// HTML 4156 | JS-SCRIPT 7: 0510
   * aucun identifiant technique ne doit apparaître
// HTML 4157 | JS-SCRIPT 7: 0511
   * dans l'interface utilisateur.
// HTML 4158 | JS-SCRIPT 7: 0512
   */
// HTML 4159 | JS-SCRIPT 7: 0513
  return "Un facteur astrologique influence cette relation";
// HTML 4160 | JS-SCRIPT 7: 0514
}
// HTML 4161 | JS-SCRIPT 7: 0515

// HTML 4162 | JS-SCRIPT 7: 0516
/*
// HTML 4163 | JS-SCRIPT 7: 0517
 * ==========================================================
// HTML 4164 | JS-SCRIPT 7: 0518
 * ASTROMATCH V1.2 — BRIDGE SCRIPT CLASSIQUE -> MODULE
// HTML 4165 | JS-SCRIPT 7: 0519
 * ==========================================================
// HTML 4166 | JS-SCRIPT 7: 0520
 *
// HTML 4167 | JS-SCRIPT 7: 0521
 * factorText() vit dans le script classique.
// HTML 4168 | JS-SCRIPT 7: 0522
 * humanFactorLabel() vit dans le module.
// HTML 4169 | JS-SCRIPT 7: 0523
 *
// HTML 4170 | JS-SCRIPT 7: 0524
 * Exposition volontaire et contrôlée via window.
// HTML 4171 | JS-SCRIPT 7: 0525
 */
// HTML 4172 | JS-SCRIPT 7: 0526
if (typeof window !== "undefined") {
// HTML 4173 | JS-SCRIPT 7: 0527
  window.__astromatchHumanFactorLabel = humanFactorLabel;
// HTML 4174 | JS-SCRIPT 7: 0528
}
// HTML 4175 | JS-SCRIPT 7: 0529

// HTML 4176 | JS-SCRIPT 7: 0530

// HTML 4177 | JS-SCRIPT 7: 0531

// HTML 4178 | JS-SCRIPT 7: 0532
function humanLevelLabel(level) {
// HTML 4179 | JS-SCRIPT 7: 0533
  return LEVEL_LABELS[String(level || "").toLowerCase()] || level || "";
// HTML 4180 | JS-SCRIPT 7: 0534
}
// HTML 4181 | JS-SCRIPT 7: 0535

// HTML 4182 | JS-SCRIPT 7: 0536
function domainIcon(domain) {
// HTML 4183 | JS-SCRIPT 7: 0537
  return DOMAIN_META[domain]?.icon || "✨";
// HTML 4184 | JS-SCRIPT 7: 0538
}
// HTML 4185 | JS-SCRIPT 7: 0539

// HTML 4186 | JS-SCRIPT 7: 0540
function domainLabel(domain, fallback) {
// HTML 4187 | JS-SCRIPT 7: 0541
  return DOMAIN_META[domain]?.label || fallback || domain || "";
// HTML 4188 | JS-SCRIPT 7: 0542
}
// HTML 4189 | JS-SCRIPT 7: 0543

// HTML 4190 | JS-SCRIPT 7: 0544
function scoreProgressClass(score) {
// HTML 4191 | JS-SCRIPT 7: 0545
  const n = Number(score);
// HTML 4192 | JS-SCRIPT 7: 0546
  if (n >= 80) return "bg-emerald-400";
// HTML 4193 | JS-SCRIPT 7: 0547
  if (n >= 60) return "bg-green-400";
// HTML 4194 | JS-SCRIPT 7: 0548
  if (n >= 50) return "bg-violet-400";
// HTML 4195 | JS-SCRIPT 7: 0549
  if (n >= 40) return "bg-amber-400";
// HTML 4196 | JS-SCRIPT 7: 0550
  return "bg-rose-400";
// HTML 4197 | JS-SCRIPT 7: 0551
}
// HTML 4198 | JS-SCRIPT 7: 0552

// HTML 4199 | JS-SCRIPT 7: 0553

// HTML 4200 | JS-SCRIPT 7: 0554
function humanReliabilityLabel(level) {
// HTML 4201 | JS-SCRIPT 7: 0555
  const labels = {
// HTML 4202 | JS-SCRIPT 7: 0556
    full: "Complète",
// HTML 4203 | JS-SCRIPT 7: 0557
    partial: "Partielle",
// HTML 4204 | JS-SCRIPT 7: 0558
    degraded: "Dégradée",
// HTML 4205 | JS-SCRIPT 7: 0559
    unknown: "Indisponible"
// HTML 4206 | JS-SCRIPT 7: 0560
  };
// HTML 4207 | JS-SCRIPT 7: 0561

// HTML 4208 | JS-SCRIPT 7: 0562
  return labels[String(level || "").toLowerCase()] || level || "";
// HTML 4209 | JS-SCRIPT 7: 0563
}
// HTML 4210 | JS-SCRIPT 7: 0564

// HTML 4211 | JS-SCRIPT 7: 0565
function factorCountLabel(count) {
// HTML 4212 | JS-SCRIPT 7: 0566
  const n = Number(count) || 0;
// HTML 4213 | JS-SCRIPT 7: 0567
  return `${n} ${n === 1 ? "facteur" : "facteurs"}`;
// HTML 4214 | JS-SCRIPT 7: 0568
}
// HTML 4215 | JS-SCRIPT 7: 0569

// HTML 4216 | JS-SCRIPT 7: 0570
function renderDomains(domains) {
// HTML 4217 | JS-SCRIPT 7: 0571
  const container = document.getElementById("domains");
// HTML 4218 | JS-SCRIPT 7: 0572

// HTML 4219 | JS-SCRIPT 7: 0573
  if (!container) return;
// HTML 4220 | JS-SCRIPT 7: 0574

// HTML 4221 | JS-SCRIPT 7: 0575
  if (!Array.isArray(domains) || domains.length === 0) {
// HTML 4222 | JS-SCRIPT 7: 0576
    container.innerHTML =
// HTML 4223 | JS-SCRIPT 7: 0577
      '<div class="text-gray-400">Aucun domaine disponible.</div>';
// HTML 4224 | JS-SCRIPT 7: 0578
    return;
// HTML 4225 | JS-SCRIPT 7: 0579
  }
// HTML 4226 | JS-SCRIPT 7: 0580

// HTML 4227 | JS-SCRIPT 7: 0581
  const html = domains.map((domain, index) => {
// HTML 4228 | JS-SCRIPT 7: 0582
    const score = Math.round(Number(domain?.score) || 0);
// HTML 4229 | JS-SCRIPT 7: 0583
    const level = humanLevelLabel(domain?.level);
// HTML 4230 | JS-SCRIPT 7: 0584

// HTML 4231 | JS-SCRIPT 7: 0585
    const meta = DOMAIN_META[domain?.domain] || {};
// HTML 4232 | JS-SCRIPT 7: 0586
    const icon = meta.icon || "✨";
// HTML 4233 | JS-SCRIPT 7: 0587
    const label = meta.label || domain?.label || domain?.domain || "";
// HTML 4234 | JS-SCRIPT 7: 0588
    const domainKey = String(domain?.domain || `domain_${index}`);
// HTML 4235 | JS-SCRIPT 7: 0589

// HTML 4236 | JS-SCRIPT 7: 0590
    const strengths = Array.isArray(domain?.strengths)
// HTML 4237 | JS-SCRIPT 7: 0591
      ? domain.strengths
// HTML 4238 | JS-SCRIPT 7: 0592
      : [];
// HTML 4239 | JS-SCRIPT 7: 0593

// HTML 4240 | JS-SCRIPT 7: 0594
    const tensions = Array.isArray(domain?.tensions)
// HTML 4241 | JS-SCRIPT 7: 0595
      ? domain.tensions
// HTML 4242 | JS-SCRIPT 7: 0596
      : [];
// HTML 4243 | JS-SCRIPT 7: 0597

// HTML 4244 | JS-SCRIPT 7: 0598
    const mixed = Array.isArray(domain?.mixed_factors)
// HTML 4245 | JS-SCRIPT 7: 0599
      ? domain.mixed_factors
// HTML 4246 | JS-SCRIPT 7: 0600
      : [];
// HTML 4247 | JS-SCRIPT 7: 0601

// HTML 4248 | JS-SCRIPT 7: 0602
    const keyFactors = Array.isArray(domain?.key_factors)
// HTML 4249 | JS-SCRIPT 7: 0603
      ? domain.key_factors
// HTML 4250 | JS-SCRIPT 7: 0604
      : [];
// HTML 4251 | JS-SCRIPT 7: 0605

// HTML 4252 | JS-SCRIPT 7: 0606
    const count = Number(domain?.contribution_count) || 0;
// HTML 4253 | JS-SCRIPT 7: 0607

// HTML 4254 | JS-SCRIPT 7: 0608
    /*
// HTML 4255 | JS-SCRIPT 7: 0609
     * =========================================================
// HTML 4256 | JS-SCRIPT 7: 0610
     * FACTEURS — DEDUPLICATION
// HTML 4257 | JS-SCRIPT 7: 0611
     * =========================================================
// HTML 4258 | JS-SCRIPT 7: 0612
     */
// HTML 4259 | JS-SCRIPT 7: 0613

// HTML 4260 | JS-SCRIPT 7: 0614
    const factorIdentity = (item) => {
// HTML 4261 | JS-SCRIPT 7: 0615
      if (typeof item === "string") {
// HTML 4262 | JS-SCRIPT 7: 0616
        return item.trim().toUpperCase();
// HTML 4263 | JS-SCRIPT 7: 0617
      }
// HTML 4264 | JS-SCRIPT 7: 0618

// HTML 4265 | JS-SCRIPT 7: 0619
      return String(
// HTML 4266 | JS-SCRIPT 7: 0620
        item?.rule_id ??
// HTML 4267 | JS-SCRIPT 7: 0621
        item?.ruleId ??
// HTML 4268 | JS-SCRIPT 7: 0622
        item?.factor_id ??
// HTML 4269 | JS-SCRIPT 7: 0623
        item?.factorId ??
// HTML 4270 | JS-SCRIPT 7: 0624
        item?.id ??
// HTML 4271 | JS-SCRIPT 7: 0625
        item?.code ??
// HTML 4272 | JS-SCRIPT 7: 0626
        item?.key ??
// HTML 4273 | JS-SCRIPT 7: 0627
        humanFactorLabel(item)
// HTML 4274 | JS-SCRIPT 7: 0628
      ).trim().toUpperCase();
// HTML 4275 | JS-SCRIPT 7: 0629
    };
// HTML 4276 | JS-SCRIPT 7: 0630

// HTML 4277 | JS-SCRIPT 7: 0631
    const usedFactors = new Set();
// HTML 4278 | JS-SCRIPT 7: 0632

// HTML 4279 | JS-SCRIPT 7: 0633
    const takeUnique = (items) => {
// HTML 4280 | JS-SCRIPT 7: 0634
      const output = [];
// HTML 4281 | JS-SCRIPT 7: 0635

// HTML 4282 | JS-SCRIPT 7: 0636
      for (const item of items) {
// HTML 4283 | JS-SCRIPT 7: 0637
        const key = factorIdentity(item);
// HTML 4284 | JS-SCRIPT 7: 0638

// HTML 4285 | JS-SCRIPT 7: 0639
        if (usedFactors.has(key)) continue;
// HTML 4286 | JS-SCRIPT 7: 0640

// HTML 4287 | JS-SCRIPT 7: 0641
        usedFactors.add(key);
// HTML 4288 | JS-SCRIPT 7: 0642
        output.push(item);
// HTML 4289 | JS-SCRIPT 7: 0643
      }
// HTML 4290 | JS-SCRIPT 7: 0644

// HTML 4291 | JS-SCRIPT 7: 0645
      return output;
// HTML 4292 | JS-SCRIPT 7: 0646
    };
// HTML 4293 | JS-SCRIPT 7: 0647

// HTML 4294 | JS-SCRIPT 7: 0648
    const uniqueMixed = takeUnique(mixed);
// HTML 4295 | JS-SCRIPT 7: 0649
    const uniqueTensions = takeUnique(tensions);
// HTML 4296 | JS-SCRIPT 7: 0650
    const uniqueKeyFactors = takeUnique(keyFactors);
// HTML 4297 | JS-SCRIPT 7: 0651
    const uniqueStrengths = takeUnique(strengths);
// HTML 4298 | JS-SCRIPT 7: 0652

// HTML 4299 | JS-SCRIPT 7: 0653
    const strengthHtml = uniqueStrengths.length
// HTML 4300 | JS-SCRIPT 7: 0654
      ? `
// HTML 4301 | JS-SCRIPT 7: 0655
        <div class="mt-4">
// HTML 4302 | JS-SCRIPT 7: 0656
          <div class="text-sm font-semibold text-green-300">
// HTML 4303 | JS-SCRIPT 7: 0657
            Points forts
// HTML 4304 | JS-SCRIPT 7: 0658
          </div>
// HTML 4305 | JS-SCRIPT 7: 0659

// HTML 4306 | JS-SCRIPT 7: 0660
          <ul class="mt-2 space-y-2 text-sm text-gray-300">
// HTML 4307 | JS-SCRIPT 7: 0661
            ${uniqueStrengths.map(item => `
// HTML 4308 | JS-SCRIPT 7: 0662
              <li class="flex items-start gap-2">
// HTML 4309 | JS-SCRIPT 7: 0663
                <span class="text-green-300 shrink-0">✓</span>
// HTML 4310 | JS-SCRIPT 7: 0664
                <span class="factor-human">
// HTML 4311 | JS-SCRIPT 7: 0665
                  ${escapeHtml(humanFactorLabel(item))}
// HTML 4312 | JS-SCRIPT 7: 0666
                </span>
// HTML 4313 | JS-SCRIPT 7: 0667
              </li>
// HTML 4314 | JS-SCRIPT 7: 0668
            `).join("")}
// HTML 4315 | JS-SCRIPT 7: 0669
          </ul>
// HTML 4316 | JS-SCRIPT 7: 0670
        </div>
// HTML 4317 | JS-SCRIPT 7: 0671
      `
// HTML 4318 | JS-SCRIPT 7: 0672
      : "";
// HTML 4319 | JS-SCRIPT 7: 0673

// HTML 4320 | JS-SCRIPT 7: 0674
    const tensionHtml = uniqueTensions.length
// HTML 4321 | JS-SCRIPT 7: 0675
      ? `
// HTML 4322 | JS-SCRIPT 7: 0676
        <div class="mt-4">
// HTML 4323 | JS-SCRIPT 7: 0677
          <div class="text-sm font-semibold text-red-300">
// HTML 4324 | JS-SCRIPT 7: 0678
            Tensions
// HTML 4325 | JS-SCRIPT 7: 0679
          </div>
// HTML 4326 | JS-SCRIPT 7: 0680

// HTML 4327 | JS-SCRIPT 7: 0681
          <ul class="mt-2 space-y-2 text-sm text-gray-300">
// HTML 4328 | JS-SCRIPT 7: 0682
            ${uniqueTensions.map(item => `
// HTML 4329 | JS-SCRIPT 7: 0683
              <li class="flex items-start gap-2">
// HTML 4330 | JS-SCRIPT 7: 0684
                <span class="text-red-300 shrink-0">⚠</span>
// HTML 4331 | JS-SCRIPT 7: 0685
                <span class="factor-human">
// HTML 4332 | JS-SCRIPT 7: 0686
                  ${escapeHtml(humanFactorLabel(item))}
// HTML 4333 | JS-SCRIPT 7: 0687
                </span>
// HTML 4334 | JS-SCRIPT 7: 0688
              </li>
// HTML 4335 | JS-SCRIPT 7: 0689
            `).join("")}
// HTML 4336 | JS-SCRIPT 7: 0690
          </ul>
// HTML 4337 | JS-SCRIPT 7: 0691
        </div>
// HTML 4338 | JS-SCRIPT 7: 0692
      `
// HTML 4339 | JS-SCRIPT 7: 0693
      : "";
// HTML 4340 | JS-SCRIPT 7: 0694

// HTML 4341 | JS-SCRIPT 7: 0695
    const mixedHtml = uniqueMixed.length
// HTML 4342 | JS-SCRIPT 7: 0696
      ? `
// HTML 4343 | JS-SCRIPT 7: 0697
        <div class="mt-4">
// HTML 4344 | JS-SCRIPT 7: 0698
          <div class="text-sm font-semibold text-yellow-300">
// HTML 4345 | JS-SCRIPT 7: 0699
            Facteurs mixtes
// HTML 4346 | JS-SCRIPT 7: 0700
          </div>
// HTML 4347 | JS-SCRIPT 7: 0701

// HTML 4348 | JS-SCRIPT 7: 0702
          <ul class="mt-2 space-y-2 text-sm text-gray-300">
// HTML 4349 | JS-SCRIPT 7: 0703
            ${uniqueMixed.map(item => `
// HTML 4350 | JS-SCRIPT 7: 0704
              <li class="flex items-start gap-2">
// HTML 4351 | JS-SCRIPT 7: 0705
                <span class="text-yellow-300 shrink-0">◆</span>
// HTML 4352 | JS-SCRIPT 7: 0706
                <span class="factor-human">
// HTML 4353 | JS-SCRIPT 7: 0707
                  ${escapeHtml(humanFactorLabel(item))}
// HTML 4354 | JS-SCRIPT 7: 0708
                </span>
// HTML 4355 | JS-SCRIPT 7: 0709
              </li>
// HTML 4356 | JS-SCRIPT 7: 0710
            `).join("")}
// HTML 4357 | JS-SCRIPT 7: 0711
          </ul>
// HTML 4358 | JS-SCRIPT 7: 0712
        </div>
// HTML 4359 | JS-SCRIPT 7: 0713
      `
// HTML 4360 | JS-SCRIPT 7: 0714
      : "";
// HTML 4361 | JS-SCRIPT 7: 0715

// HTML 4362 | JS-SCRIPT 7: 0716
    const keyFactorHtml = uniqueKeyFactors.length
// HTML 4363 | JS-SCRIPT 7: 0717
      ? `
// HTML 4364 | JS-SCRIPT 7: 0718
        <div class="mt-4">
// HTML 4365 | JS-SCRIPT 7: 0719
          <div class="text-sm font-semibold text-blue-300">
// HTML 4366 | JS-SCRIPT 7: 0720
            Facteurs clés
// HTML 4367 | JS-SCRIPT 7: 0721
          </div>
// HTML 4368 | JS-SCRIPT 7: 0722

// HTML 4369 | JS-SCRIPT 7: 0723
          <ul class="mt-2 space-y-2 text-sm text-gray-300">
// HTML 4370 | JS-SCRIPT 7: 0724
            ${uniqueKeyFactors.map(item => `
// HTML 4371 | JS-SCRIPT 7: 0725
              <li class="flex items-start gap-2">
// HTML 4372 | JS-SCRIPT 7: 0726
                <span class="text-blue-300 shrink-0">•</span>
// HTML 4373 | JS-SCRIPT 7: 0727
                <span class="factor-human">
// HTML 4374 | JS-SCRIPT 7: 0728
                  ${escapeHtml(humanFactorLabel(item))}
// HTML 4375 | JS-SCRIPT 7: 0729
                </span>
// HTML 4376 | JS-SCRIPT 7: 0730
              </li>
// HTML 4377 | JS-SCRIPT 7: 0731
            `).join("")}
// HTML 4378 | JS-SCRIPT 7: 0732
          </ul>
// HTML 4379 | JS-SCRIPT 7: 0733
        </div>
// HTML 4380 | JS-SCRIPT 7: 0734
      `
// HTML 4381 | JS-SCRIPT 7: 0735
      : "";
// HTML 4382 | JS-SCRIPT 7: 0736

// HTML 4383 | JS-SCRIPT 7: 0737
    const safeKey = escapeHtml(domainKey).replace(/"/g, "&quot;");
// HTML 4384 | JS-SCRIPT 7: 0738

// HTML 4385 | JS-SCRIPT 7: 0739
    return `
// HTML 4386 | JS-SCRIPT 7: 0740
      <article
// HTML 4387 | JS-SCRIPT 7: 0741
        class="domain-card rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden cursor-pointer transition-all duration-200 hover:border-white/20 hover:bg-white/10"
// HTML 4388 | JS-SCRIPT 7: 0742
        data-astromatch-domain-key="${safeKey}"
// HTML 4389 | JS-SCRIPT 7: 0743
        role="button"
// HTML 4390 | JS-SCRIPT 7: 0744
        tabindex="0"
// HTML 4391 | JS-SCRIPT 7: 0745
        aria-label="Voir le détail de ${escapeHtml(label)}"
// HTML 4392 | JS-SCRIPT 7: 0746
      >
// HTML 4393 | JS-SCRIPT 7: 0747

// HTML 4394 | JS-SCRIPT 7: 0748
        <div class="flex items-center justify-between gap-4">
// HTML 4395 | JS-SCRIPT 7: 0749

// HTML 4396 | JS-SCRIPT 7: 0750
          <div class="flex items-center gap-3 min-w-0">
// HTML 4397 | JS-SCRIPT 7: 0751

// HTML 4398 | JS-SCRIPT 7: 0752
            <div class="text-2xl shrink-0">
// HTML 4399 | JS-SCRIPT 7: 0753
              ${icon}
// HTML 4400 | JS-SCRIPT 7: 0754
            </div>
// HTML 4401 | JS-SCRIPT 7: 0755

// HTML 4402 | JS-SCRIPT 7: 0756
            <div class="min-w-0">
// HTML 4403 | JS-SCRIPT 7: 0757
              <h3 class="font-bold text-lg truncate">
// HTML 4404 | JS-SCRIPT 7: 0758
                ${escapeHtml(label)}
// HTML 4405 | JS-SCRIPT 7: 0759
              </h3>
// HTML 4406 | JS-SCRIPT 7: 0760

// HTML 4407 | JS-SCRIPT 7: 0761
              <div class="text-xs text-gray-400 mt-0.5">
// HTML 4408 | JS-SCRIPT 7: 0762
                ${escapeHtml(level)} · ${factorCountLabel(count)}
// HTML 4409 | JS-SCRIPT 7: 0763
              </div>
// HTML 4410 | JS-SCRIPT 7: 0764
            </div>
// HTML 4411 | JS-SCRIPT 7: 0765

// HTML 4412 | JS-SCRIPT 7: 0766
          </div>
// HTML 4413 | JS-SCRIPT 7: 0767

// HTML 4414 | JS-SCRIPT 7: 0768
          <div class="text-right shrink-0">
// HTML 4415 | JS-SCRIPT 7: 0769

// HTML 4416 | JS-SCRIPT 7: 0770
            <div class="text-2xl font-bold">
// HTML 4417 | JS-SCRIPT 7: 0771
              ${score}
// HTML 4418 | JS-SCRIPT 7: 0772
            </div>
// HTML 4419 | JS-SCRIPT 7: 0773

// HTML 4420 | JS-SCRIPT 7: 0774
            <div class="text-[10px] text-gray-500">
// HTML 4421 | JS-SCRIPT 7: 0775
              /100
// HTML 4422 | JS-SCRIPT 7: 0776
            </div>
// HTML 4423 | JS-SCRIPT 7: 0777

// HTML 4424 | JS-SCRIPT 7: 0778
          </div>
// HTML 4425 | JS-SCRIPT 7: 0779

// HTML 4426 | JS-SCRIPT 7: 0780
        </div>
// HTML 4427 | JS-SCRIPT 7: 0781

// HTML 4428 | JS-SCRIPT 7: 0782
        <div class="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
// HTML 4429 | JS-SCRIPT 7: 0783

// HTML 4430 | JS-SCRIPT 7: 0784
          <div
// HTML 4431 | JS-SCRIPT 7: 0785
            class="score-progress h-full rounded-full ${scoreProgressClass(score)} transition-all duration-700"
// HTML 4432 | JS-SCRIPT 7: 0786
            style="width:${Math.max(0, Math.min(100, score))}%"
// HTML 4433 | JS-SCRIPT 7: 0787
          ></div>
// HTML 4434 | JS-SCRIPT 7: 0788

// HTML 4435 | JS-SCRIPT 7: 0789
        </div>
// HTML 4436 | JS-SCRIPT 7: 0790

// HTML 4437 | JS-SCRIPT 7: 0791
        ${strengthHtml}
// HTML 4438 | JS-SCRIPT 7: 0792
        ${tensionHtml}
// HTML 4439 | JS-SCRIPT 7: 0793
        ${mixedHtml}
// HTML 4440 | JS-SCRIPT 7: 0794
        ${keyFactorHtml}
// HTML 4441 | JS-SCRIPT 7: 0795

// HTML 4442 | JS-SCRIPT 7: 0796
        <div class="mt-4 text-xs text-slate-500">
// HTML 4443 | JS-SCRIPT 7: 0797
          👆 Appuyer pour voir le détail
// HTML 4444 | JS-SCRIPT 7: 0798
        </div>
// HTML 4445 | JS-SCRIPT 7: 0799

// HTML 4446 | JS-SCRIPT 7: 0800
      </article>
// HTML 4447 | JS-SCRIPT 7: 0801
    `;
// HTML 4448 | JS-SCRIPT 7: 0802
  }).join("");
// HTML 4449 | JS-SCRIPT 7: 0803

// HTML 4450 | JS-SCRIPT 7: 0804
  container.innerHTML = html;
// HTML 4451 | JS-SCRIPT 7: 0805

// HTML 4452 | JS-SCRIPT 7: 0806
  /*
// HTML 4453 | JS-SCRIPT 7: 0807
   * =========================================================
// HTML 4454 | JS-SCRIPT 7: 0808
   * DETAIL DOMAINE
// HTML 4455 | JS-SCRIPT 7: 0809
   * =========================================================
// HTML 4456 | JS-SCRIPT 7: 0810
   *
// HTML 4457 | JS-SCRIPT 7: 0811
   * Le panneau est maintenant généré DANS LE MEME innerHTML
// HTML 4458 | JS-SCRIPT 7: 0812
   * que les cartes. Il fait donc partie du DOM rendu par
// HTML 4459 | JS-SCRIPT 7: 0813
   * renderDomains() et ne dépend plus d'un appendChild externe.
// HTML 4460 | JS-SCRIPT 7: 0814
   */
// HTML 4461 | JS-SCRIPT 7: 0815

// HTML 4462 | JS-SCRIPT 7: 0816
  container.innerHTML = html + `
// HTML 4463 | JS-SCRIPT 7: 0817
    <div
// HTML 4464 | JS-SCRIPT 7: 0818
      id="astromatchPrimaryDomainDetail"
// HTML 4465 | JS-SCRIPT 7: 0819
      class="mt-5"
// HTML 4466 | JS-SCRIPT 7: 0820
      aria-live="polite"
// HTML 4467 | JS-SCRIPT 7: 0821
    ></div>
// HTML 4468 | JS-SCRIPT 7: 0822
  `;
// HTML 4469 | JS-SCRIPT 7: 0823

// HTML 4470 | JS-SCRIPT 7: 0824
  /*
// HTML 4471 | JS-SCRIPT 7: 0825
   * =========================================================
// HTML 4472 | JS-SCRIPT 7: 0826
   * CLIC SUR LES VRAIES CARTES VISIBLES
// HTML 4473 | JS-SCRIPT 7: 0827
   * =========================================================
// HTML 4474 | JS-SCRIPT 7: 0828
   */
// HTML 4475 | JS-SCRIPT 7: 0829

// HTML 4476 | JS-SCRIPT 7: 0830
  container.querySelectorAll("[data-astromatch-domain-key]")
// HTML 4477 | JS-SCRIPT 7: 0831
    .forEach(card => {
// HTML 4478 | JS-SCRIPT 7: 0832

// HTML 4479 | JS-SCRIPT 7: 0833
      const openDetail = () => {
// HTML 4480 | JS-SCRIPT 7: 0834
        const key =
// HTML 4481 | JS-SCRIPT 7: 0835
          card.getAttribute("data-astromatch-domain-key");
// HTML 4482 | JS-SCRIPT 7: 0836

// HTML 4483 | JS-SCRIPT 7: 0837
        if (
// HTML 4484 | JS-SCRIPT 7: 0838
          typeof window.astromatchShowPrimaryDomainDetail ===
// HTML 4485 | JS-SCRIPT 7: 0839
          "function"
// HTML 4486 | JS-SCRIPT 7: 0840
        ) {
// HTML 4487 | JS-SCRIPT 7: 0841
          window.astromatchDirectDomainDetail(key);
// HTML 4488 | JS-SCRIPT 7: 0842
        }
// HTML 4489 | JS-SCRIPT 7: 0843
      };
// HTML 4490 | JS-SCRIPT 7: 0844

// HTML 4491 | JS-SCRIPT 7: 0845
      card.addEventListener("click", openDetail);
// HTML 4492 | JS-SCRIPT 7: 0846

// HTML 4493 | JS-SCRIPT 7: 0847
      card.addEventListener("keydown", event => {
// HTML 4494 | JS-SCRIPT 7: 0848
        if (event.key === "Enter" || event.key === " ") {
// HTML 4495 | JS-SCRIPT 7: 0849
          event.preventDefault();
// HTML 4496 | JS-SCRIPT 7: 0850
          openDetail();
// HTML 4497 | JS-SCRIPT 7: 0851
        }
// HTML 4498 | JS-SCRIPT 7: 0852
      });
// HTML 4499 | JS-SCRIPT 7: 0853
    });
// HTML 4500 | JS-SCRIPT 7: 0854
}
// HTML 4501 | JS-SCRIPT 7: 0855

// HTML 4502 | JS-SCRIPT 7: 0856

// HTML 4503 | JS-SCRIPT 7: 0857
/* =========================================================
// HTML 4504 | JS-SCRIPT 7: 0858
   ASTROMATCH PRIMARY DOMAIN DETAIL
// HTML 4505 | JS-SCRIPT 7: 0859
   ========================================================= */
// HTML 4506 | JS-SCRIPT 7: 0860

// HTML 4507 | JS-SCRIPT 7: 0861

// HTML 4508 | JS-SCRIPT 7: 0862
function astromatchShowPrimaryDomainDetail(domainKey) {
// HTML 4509 | JS-SCRIPT 7: 0863
  console.log("ASTROMATCH DETAIL CLICK =", domainKey);
// HTML 4510 | JS-SCRIPT 7: 0864

// HTML 4511 | JS-SCRIPT 7: 0865
  const result =
// HTML 4512 | JS-SCRIPT 7: 0866
    window.__astromatchLastResult ||
// HTML 4513 | JS-SCRIPT 7: 0867
    window.__astromatchCurrentResult ||
// HTML 4514 | JS-SCRIPT 7: 0868
    window.__astromatchComparatorV212?.result ||
// HTML 4515 | JS-SCRIPT 7: 0869
    null;
// HTML 4516 | JS-SCRIPT 7: 0870

// HTML 4517 | JS-SCRIPT 7: 0871
  console.log(
// HTML 4518 | JS-SCRIPT 7: 0872
    "ASTROMATCH DETAIL RESULT =",
// HTML 4519 | JS-SCRIPT 7: 0873
    result ? "FOUND" : "ABSENT"
// HTML 4520 | JS-SCRIPT 7: 0874
  );
// HTML 4521 | JS-SCRIPT 7: 0875

// HTML 4522 | JS-SCRIPT 7: 0876
  console.log(
// HTML 4523 | JS-SCRIPT 7: 0877
    "ASTROMATCH DETAIL DOMAINS =",
// HTML 4524 | JS-SCRIPT 7: 0878
    result?.domains?.map(d => ({
// HTML 4525 | JS-SCRIPT 7: 0879
      domain: d.domain,
// HTML 4526 | JS-SCRIPT 7: 0880
      score: d.score
// HTML 4527 | JS-SCRIPT 7: 0881
    })) || []
// HTML 4528 | JS-SCRIPT 7: 0882
  );
// HTML 4529 | JS-SCRIPT 7: 0883

// HTML 4530 | JS-SCRIPT 7: 0884
  if (!result || !Array.isArray(result.domains)) {
// HTML 4531 | JS-SCRIPT 7: 0885
    alert(
// HTML 4532 | JS-SCRIPT 7: 0886
      "AstroMatch : résultat de calcul indisponible.\n\n" +
// HTML 4533 | JS-SCRIPT 7: 0887
      "Le clic fonctionne, mais aucun résultat astrologique n'est actuellement disponible."
// HTML 4534 | JS-SCRIPT 7: 0888
    );
// HTML 4535 | JS-SCRIPT 7: 0889
    return;
// HTML 4536 | JS-SCRIPT 7: 0890
  }
// HTML 4537 | JS-SCRIPT 7: 0891

// HTML 4538 | JS-SCRIPT 7: 0892
  const domain = result.domains.find(d =>
// HTML 4539 | JS-SCRIPT 7: 0893
    String(d.domain || "").toLowerCase() ===
// HTML 4540 | JS-SCRIPT 7: 0894
    String(domainKey || "").toLowerCase()
// HTML 4541 | JS-SCRIPT 7: 0895
  );
// HTML 4542 | JS-SCRIPT 7: 0896

// HTML 4543 | JS-SCRIPT 7: 0897
  if (!domain) {
// HTML 4544 | JS-SCRIPT 7: 0898
    console.warn(
// HTML 4545 | JS-SCRIPT 7: 0899
      "ASTROMATCH DETAIL DOMAIN NOT FOUND =",
// HTML 4546 | JS-SCRIPT 7: 0900
      domainKey
// HTML 4547 | JS-SCRIPT 7: 0901
    );
// HTML 4548 | JS-SCRIPT 7: 0902

// HTML 4549 | JS-SCRIPT 7: 0903
    alert(
// HTML 4550 | JS-SCRIPT 7: 0904
      "AstroMatch : domaine introuvable : " +
// HTML 4551 | JS-SCRIPT 7: 0905
      String(domainKey)
// HTML 4552 | JS-SCRIPT 7: 0906
    );
// HTML 4553 | JS-SCRIPT 7: 0907
    return;
// HTML 4554 | JS-SCRIPT 7: 0908
  }
// HTML 4555 | JS-SCRIPT 7: 0909

// HTML 4556 | JS-SCRIPT 7: 0910
  console.log(
// HTML 4557 | JS-SCRIPT 7: 0911
    "ASTROMATCH DETAIL DOMAIN FOUND =",
// HTML 4558 | JS-SCRIPT 7: 0912
    domain
// HTML 4559 | JS-SCRIPT 7: 0913
  );
// HTML 4560 | JS-SCRIPT 7: 0914

// HTML 4561 | JS-SCRIPT 7: 0915
  const old = document.getElementById(
// HTML 4562 | JS-SCRIPT 7: 0916
    "astromatchPrimaryDomainModal"
// HTML 4563 | JS-SCRIPT 7: 0917
  );
// HTML 4564 | JS-SCRIPT 7: 0918

// HTML 4565 | JS-SCRIPT 7: 0919
  if (old) {
// HTML 4566 | JS-SCRIPT 7: 0920
    old.remove();
// HTML 4567 | JS-SCRIPT 7: 0921
  }
// HTML 4568 | JS-SCRIPT 7: 0922

// HTML 4569 | JS-SCRIPT 7: 0923
  const meta =
// HTML 4570 | JS-SCRIPT 7: 0924
    typeof astromatchV212DomainMeta === "function"
// HTML 4571 | JS-SCRIPT 7: 0925
      ? astromatchV212DomainMeta(domain.domain)
// HTML 4572 | JS-SCRIPT 7: 0926
      : null;
// HTML 4573 | JS-SCRIPT 7: 0927

// HTML 4574 | JS-SCRIPT 7: 0928
  const escapeHtml =
// HTML 4575 | JS-SCRIPT 7: 0929
    typeof astromatchV212Escape === "function"
// HTML 4576 | JS-SCRIPT 7: 0930
      ? astromatchV212Escape
// HTML 4577 | JS-SCRIPT 7: 0931
      : (value) =>
// HTML 4578 | JS-SCRIPT 7: 0932
          String(value ?? "")
// HTML 4579 | JS-SCRIPT 7: 0933
            .replace(/&/g, "&amp;")
// HTML 4580 | JS-SCRIPT 7: 0934
            .replace(/</g, "&lt;")
// HTML 4581 | JS-SCRIPT 7: 0935
            .replace(/>/g, "&gt;")
// HTML 4582 | JS-SCRIPT 7: 0936
            .replace(/"/g, "&quot;")
// HTML 4583 | JS-SCRIPT 7: 0937
            .replace(/'/g, "&#039;");
// HTML 4584 | JS-SCRIPT 7: 0938

// HTML 4585 | JS-SCRIPT 7: 0939
  const score = Number(domain.score ?? 0);
// HTML 4586 | JS-SCRIPT 7: 0940

// HTML 4587 | JS-SCRIPT 7: 0941
  const label =
// HTML 4588 | JS-SCRIPT 7: 0942
    domain.label ||
// HTML 4589 | JS-SCRIPT 7: 0943
    domain.level ||
// HTML 4590 | JS-SCRIPT 7: 0944
    "Non évalué";
// HTML 4591 | JS-SCRIPT 7: 0945

// HTML 4592 | JS-SCRIPT 7: 0946
  const icon =
// HTML 4593 | JS-SCRIPT 7: 0947
    meta?.icon ||
// HTML 4594 | JS-SCRIPT 7: 0948
    ({
// HTML 4595 | JS-SCRIPT 7: 0949
      love: "❤️",
// HTML 4596 | JS-SCRIPT 7: 0950
      emotions: "🌙",
// HTML 4597 | JS-SCRIPT 7: 0951
      communication: "🗣️",
// HTML 4598 | JS-SCRIPT 7: 0952
      passion: "🔥",
// HTML 4599 | JS-SCRIPT 7: 0953
      daily_life: "🏠",
// HTML 4600 | JS-SCRIPT 7: 0954
      projects: "🚀",
// HTML 4601 | JS-SCRIPT 7: 0955
      family: "👨‍👩‍👧‍👦",
// HTML 4602 | JS-SCRIPT 7: 0956
      frictions: "⚠️"
// HTML 4603 | JS-SCRIPT 7: 0957
    }[
// HTML 4604 | JS-SCRIPT 7: 0958
      String(domain.domain || "").toLowerCase()
// HTML 4605 | JS-SCRIPT 7: 0959
    ] || "✨");
// HTML 4606 | JS-SCRIPT 7: 0960

// HTML 4607 | JS-SCRIPT 7: 0961
  const title =
// HTML 4608 | JS-SCRIPT 7: 0962
    meta?.label ||
// HTML 4609 | JS-SCRIPT 7: 0963
    domain.domain ||
// HTML 4610 | JS-SCRIPT 7: 0964
    domainKey;
// HTML 4611 | JS-SCRIPT 7: 0965

// HTML 4612 | JS-SCRIPT 7: 0966
  const renderList = (items, emptyText) => {
// HTML 4613 | JS-SCRIPT 7: 0967
    if (!Array.isArray(items) || items.length === 0) {
// HTML 4614 | JS-SCRIPT 7: 0968
      return `
// HTML 4615 | JS-SCRIPT 7: 0969
        <div class="text-sm text-white/40">
// HTML 4616 | JS-SCRIPT 7: 0970
          ${escapeHtml(emptyText)}
// HTML 4617 | JS-SCRIPT 7: 0971
        </div>
// HTML 4618 | JS-SCRIPT 7: 0972
      `;
// HTML 4619 | JS-SCRIPT 7: 0973
    }
// HTML 4620 | JS-SCRIPT 7: 0974

// HTML 4621 | JS-SCRIPT 7: 0975
    return `
// HTML 4622 | JS-SCRIPT 7: 0976
      <ul class="space-y-2">
// HTML 4623 | JS-SCRIPT 7: 0977
        ${items.map(item => `
// HTML 4624 | JS-SCRIPT 7: 0978
          <li class="flex gap-2 items-start">
// HTML 4625 | JS-SCRIPT 7: 0979
            <span class="text-white/50 mt-0.5">•</span>
// HTML 4626 | JS-SCRIPT 7: 0980
            <span class="text-sm text-white/80">
// HTML 4627 | JS-SCRIPT 7: 0981
              ${escapeHtml(item)}
// HTML 4628 | JS-SCRIPT 7: 0982
            </span>
// HTML 4629 | JS-SCRIPT 7: 0983
          </li>
// HTML 4630 | JS-SCRIPT 7: 0984
        `).join("")}
// HTML 4631 | JS-SCRIPT 7: 0985
      </ul>
// HTML 4632 | JS-SCRIPT 7: 0986
    `;
// HTML 4633 | JS-SCRIPT 7: 0987
  };
// HTML 4634 | JS-SCRIPT 7: 0988

// HTML 4635 | JS-SCRIPT 7: 0989
  const strengths =
// HTML 4636 | JS-SCRIPT 7: 0990
    Array.isArray(domain.strengths)
// HTML 4637 | JS-SCRIPT 7: 0991
      ? domain.strengths
// HTML 4638 | JS-SCRIPT 7: 0992
      : [];
// HTML 4639 | JS-SCRIPT 7: 0993

// HTML 4640 | JS-SCRIPT 7: 0994
  const tensions =
// HTML 4641 | JS-SCRIPT 7: 0995
    Array.isArray(domain.tensions)
// HTML 4642 | JS-SCRIPT 7: 0996
      ? domain.tensions
// HTML 4643 | JS-SCRIPT 7: 0997
      : [];
// HTML 4644 | JS-SCRIPT 7: 0998

// HTML 4645 | JS-SCRIPT 7: 0999
  const mixed =
// HTML 4646 | JS-SCRIPT 7: 1000
    Array.isArray(domain.mixed_factors)
// HTML 4647 | JS-SCRIPT 7: 1001
      ? domain.mixed_factors
// HTML 4648 | JS-SCRIPT 7: 1002
      : [];
// HTML 4649 | JS-SCRIPT 7: 1003

// HTML 4650 | JS-SCRIPT 7: 1004
  const keyFactors =
// HTML 4651 | JS-SCRIPT 7: 1005
    Array.isArray(domain.key_factors)
// HTML 4652 | JS-SCRIPT 7: 1006
      ? domain.key_factors
// HTML 4653 | JS-SCRIPT 7: 1007
      : [];
// HTML 4654 | JS-SCRIPT 7: 1008

// HTML 4655 | JS-SCRIPT 7: 1009
  const modal = document.createElement("div");
// HTML 4656 | JS-SCRIPT 7: 1010

// HTML 4657 | JS-SCRIPT 7: 1011
  modal.id = "astromatchPrimaryDomainModal";
// HTML 4658 | JS-SCRIPT 7: 1012

// HTML 4659 | JS-SCRIPT 7: 1013
  modal.style.position = "fixed";
// HTML 4660 | JS-SCRIPT 7: 1014
  modal.style.inset = "0";
// HTML 4661 | JS-SCRIPT 7: 1015
  modal.style.zIndex = "2147483647";
// HTML 4662 | JS-SCRIPT 7: 1016
  modal.style.display = "flex";
// HTML 4663 | JS-SCRIPT 7: 1017
  modal.style.alignItems = "center";
// HTML 4664 | JS-SCRIPT 7: 1018
  modal.style.justifyContent = "center";
// HTML 4665 | JS-SCRIPT 7: 1019
  modal.style.padding = "16px";
// HTML 4666 | JS-SCRIPT 7: 1020
  modal.style.background = "rgba(0,0,0,0.78)";
// HTML 4667 | JS-SCRIPT 7: 1021
  modal.style.backdropFilter = "blur(10px)";
// HTML 4668 | JS-SCRIPT 7: 1022
  modal.style.webkitBackdropFilter = "blur(10px)";
// HTML 4669 | JS-SCRIPT 7: 1023

// HTML 4670 | JS-SCRIPT 7: 1024
  modal.innerHTML = `
// HTML 4671 | JS-SCRIPT 7: 1025
    <div
// HTML 4672 | JS-SCRIPT 7: 1026
      id="astromatchPrimaryDomainModalCard"
// HTML 4673 | JS-SCRIPT 7: 1027
      style="
// HTML 4674 | JS-SCRIPT 7: 1028
        width:min(680px,100%);
// HTML 4675 | JS-SCRIPT 7: 1029
        max-height:90vh;
// HTML 4676 | JS-SCRIPT 7: 1030
        overflow:auto;
// HTML 4677 | JS-SCRIPT 7: 1031
        background:linear-gradient(
// HTML 4678 | JS-SCRIPT 7: 1032
          145deg,
// HTML 4679 | JS-SCRIPT 7: 1033
          rgba(25,25,35,.98),
// HTML 4680 | JS-SCRIPT 7: 1034
          rgba(10,10,18,.99)
// HTML 4681 | JS-SCRIPT 7: 1035
        );
// HTML 4682 | JS-SCRIPT 7: 1036
        border:1px solid rgba(255,255,255,.12);
// HTML 4683 | JS-SCRIPT 7: 1037
        border-radius:24px;
// HTML 4684 | JS-SCRIPT 7: 1038
        box-shadow:0 25px 80px rgba(0,0,0,.65);
// HTML 4685 | JS-SCRIPT 7: 1039
        color:white;
// HTML 4686 | JS-SCRIPT 7: 1040
      "
// HTML 4687 | JS-SCRIPT 7: 1041
    >
// HTML 4688 | JS-SCRIPT 7: 1042

// HTML 4689 | JS-SCRIPT 7: 1043
      <div
// HTML 4690 | JS-SCRIPT 7: 1044
        style="
// HTML 4691 | JS-SCRIPT 7: 1045
          position:sticky;
// HTML 4692 | JS-SCRIPT 7: 1046
          top:0;
// HTML 4693 | JS-SCRIPT 7: 1047
          z-index:2;
// HTML 4694 | JS-SCRIPT 7: 1048
          padding:20px;
// HTML 4695 | JS-SCRIPT 7: 1049
          background:rgba(15,15,24,.96);
// HTML 4696 | JS-SCRIPT 7: 1050
          border-bottom:1px solid rgba(255,255,255,.08);
// HTML 4697 | JS-SCRIPT 7: 1051
          backdrop-filter:blur(14px);
// HTML 4698 | JS-SCRIPT 7: 1052
        "
// HTML 4699 | JS-SCRIPT 7: 1053
      >
// HTML 4700 | JS-SCRIPT 7: 1054
        <div
// HTML 4701 | JS-SCRIPT 7: 1055
          style="
// HTML 4702 | JS-SCRIPT 7: 1056
            display:flex;
// HTML 4703 | JS-SCRIPT 7: 1057
            align-items:center;
// HTML 4704 | JS-SCRIPT 7: 1058
            justify-content:space-between;
// HTML 4705 | JS-SCRIPT 7: 1059
            gap:16px;
// HTML 4706 | JS-SCRIPT 7: 1060
          "
// HTML 4707 | JS-SCRIPT 7: 1061
        >
// HTML 4708 | JS-SCRIPT 7: 1062

// HTML 4709 | JS-SCRIPT 7: 1063
          <div>
// HTML 4710 | JS-SCRIPT 7: 1064
            <div
// HTML 4711 | JS-SCRIPT 7: 1065
              style="
// HTML 4712 | JS-SCRIPT 7: 1066
                font-size:13px;
// HTML 4713 | JS-SCRIPT 7: 1067
                color:rgba(255,255,255,.5);
// HTML 4714 | JS-SCRIPT 7: 1068
                margin-bottom:5px;
// HTML 4715 | JS-SCRIPT 7: 1069
              "
// HTML 4716 | JS-SCRIPT 7: 1070
            >
// HTML 4717 | JS-SCRIPT 7: 1071
              DÉTAIL DU DOMAINE
// HTML 4718 | JS-SCRIPT 7: 1072
            </div>
// HTML 4719 | JS-SCRIPT 7: 1073

// HTML 4720 | JS-SCRIPT 7: 1074
            <div
// HTML 4721 | JS-SCRIPT 7: 1075
              style="
// HTML 4722 | JS-SCRIPT 7: 1076
                font-size:25px;
// HTML 4723 | JS-SCRIPT 7: 1077
                font-weight:800;
// HTML 4724 | JS-SCRIPT 7: 1078
                line-height:1.1;
// HTML 4725 | JS-SCRIPT 7: 1079
              "
// HTML 4726 | JS-SCRIPT 7: 1080
            >
// HTML 4727 | JS-SCRIPT 7: 1081
              ${icon}
// HTML 4728 | JS-SCRIPT 7: 1082
              ${escapeHtml(title)}
// HTML 4729 | JS-SCRIPT 7: 1083
            </div>
// HTML 4730 | JS-SCRIPT 7: 1084
          </div>
// HTML 4731 | JS-SCRIPT 7: 1085

// HTML 4732 | JS-SCRIPT 7: 1086
          <button
// HTML 4733 | JS-SCRIPT 7: 1087
            id="astromatchPrimaryDomainModalClose"
// HTML 4734 | JS-SCRIPT 7: 1088
            type="button"
// HTML 4735 | JS-SCRIPT 7: 1089
            aria-label="Fermer"
// HTML 4736 | JS-SCRIPT 7: 1090
            style="
// HTML 4737 | JS-SCRIPT 7: 1091
              width:42px;
// HTML 4738 | JS-SCRIPT 7: 1092
              height:42px;
// HTML 4739 | JS-SCRIPT 7: 1093
              border-radius:50%;
// HTML 4740 | JS-SCRIPT 7: 1094
              border:1px solid rgba(255,255,255,.12);
// HTML 4741 | JS-SCRIPT 7: 1095
              background:rgba(255,255,255,.07);
// HTML 4742 | JS-SCRIPT 7: 1096
              color:white;
// HTML 4743 | JS-SCRIPT 7: 1097
              font-size:24px;
// HTML 4744 | JS-SCRIPT 7: 1098
              cursor:pointer;
// HTML 4745 | JS-SCRIPT 7: 1099
            "
// HTML 4746 | JS-SCRIPT 7: 1100
          >
// HTML 4747 | JS-SCRIPT 7: 1101
            ×
// HTML 4748 | JS-SCRIPT 7: 1102
          </button>
// HTML 4749 | JS-SCRIPT 7: 1103

// HTML 4750 | JS-SCRIPT 7: 1104
        </div>
// HTML 4751 | JS-SCRIPT 7: 1105

// HTML 4752 | JS-SCRIPT 7: 1106
        <div
// HTML 4753 | JS-SCRIPT 7: 1107
          style="
// HTML 4754 | JS-SCRIPT 7: 1108
            display:flex;
// HTML 4755 | JS-SCRIPT 7: 1109
            align-items:end;
// HTML 4756 | JS-SCRIPT 7: 1110
            justify-content:space-between;
// HTML 4757 | JS-SCRIPT 7: 1111
            gap:20px;
// HTML 4758 | JS-SCRIPT 7: 1112
            margin-top:20px;
// HTML 4759 | JS-SCRIPT 7: 1113
          "
// HTML 4760 | JS-SCRIPT 7: 1114
        >
// HTML 4761 | JS-SCRIPT 7: 1115

// HTML 4762 | JS-SCRIPT 7: 1116
          <div>
// HTML 4763 | JS-SCRIPT 7: 1117
            <div
// HTML 4764 | JS-SCRIPT 7: 1118
              style="
// HTML 4765 | JS-SCRIPT 7: 1119
                font-size:14px;
// HTML 4766 | JS-SCRIPT 7: 1120
                color:rgba(255,255,255,.55);
// HTML 4767 | JS-SCRIPT 7: 1121
              "
// HTML 4768 | JS-SCRIPT 7: 1122
            >
// HTML 4769 | JS-SCRIPT 7: 1123
              Niveau
// HTML 4770 | JS-SCRIPT 7: 1124
            </div>
// HTML 4771 | JS-SCRIPT 7: 1125

// HTML 4772 | JS-SCRIPT 7: 1126
            <div
// HTML 4773 | JS-SCRIPT 7: 1127
              style="
// HTML 4774 | JS-SCRIPT 7: 1128
                font-size:18px;
// HTML 4775 | JS-SCRIPT 7: 1129
                font-weight:700;
// HTML 4776 | JS-SCRIPT 7: 1130
                margin-top:3px;
// HTML 4777 | JS-SCRIPT 7: 1131
              "
// HTML 4778 | JS-SCRIPT 7: 1132
            >
// HTML 4779 | JS-SCRIPT 7: 1133
              ${escapeHtml(label)}
// HTML 4780 | JS-SCRIPT 7: 1134
            </div>
// HTML 4781 | JS-SCRIPT 7: 1135
          </div>
// HTML 4782 | JS-SCRIPT 7: 1136

// HTML 4783 | JS-SCRIPT 7: 1137
          <div style="text-align:right">
// HTML 4784 | JS-SCRIPT 7: 1138
            <div
// HTML 4785 | JS-SCRIPT 7: 1139
              style="
// HTML 4786 | JS-SCRIPT 7: 1140
                font-size:42px;
// HTML 4787 | JS-SCRIPT 7: 1141
                line-height:1;
// HTML 4788 | JS-SCRIPT 7: 1142
                font-weight:900;
// HTML 4789 | JS-SCRIPT 7: 1143
              "
// HTML 4790 | JS-SCRIPT 7: 1144
            >
// HTML 4791 | JS-SCRIPT 7: 1145
              ${Math.round(score)}
// HTML 4792 | JS-SCRIPT 7: 1146
            </div>
// HTML 4793 | JS-SCRIPT 7: 1147

// HTML 4794 | JS-SCRIPT 7: 1148
            <div
// HTML 4795 | JS-SCRIPT 7: 1149
              style="
// HTML 4796 | JS-SCRIPT 7: 1150
                font-size:13px;
// HTML 4797 | JS-SCRIPT 7: 1151
                color:rgba(255,255,255,.45);
// HTML 4798 | JS-SCRIPT 7: 1152
                margin-top:3px;
// HTML 4799 | JS-SCRIPT 7: 1153
              "
// HTML 4800 | JS-SCRIPT 7: 1154
            >
// HTML 4801 | JS-SCRIPT 7: 1155
              /100
// HTML 4802 | JS-SCRIPT 7: 1156
            </div>
// HTML 4803 | JS-SCRIPT 7: 1157
          </div>
// HTML 4804 | JS-SCRIPT 7: 1158

// HTML 4805 | JS-SCRIPT 7: 1159
        </div>
// HTML 4806 | JS-SCRIPT 7: 1160

// HTML 4807 | JS-SCRIPT 7: 1161
        <div
// HTML 4808 | JS-SCRIPT 7: 1162
          style="
// HTML 4809 | JS-SCRIPT 7: 1163
            height:8px;
// HTML 4810 | JS-SCRIPT 7: 1164
            margin-top:16px;
// HTML 4811 | JS-SCRIPT 7: 1165
            background:rgba(255,255,255,.08);
// HTML 4812 | JS-SCRIPT 7: 1166
            border-radius:999px;
// HTML 4813 | JS-SCRIPT 7: 1167
            overflow:hidden;
// HTML 4814 | JS-SCRIPT 7: 1168
          "
// HTML 4815 | JS-SCRIPT 7: 1169
        >
// HTML 4816 | JS-SCRIPT 7: 1170
          <div
// HTML 4817 | JS-SCRIPT 7: 1171
            style="
// HTML 4818 | JS-SCRIPT 7: 1172
              width:${Math.max(0,Math.min(100,score))}%;
// HTML 4819 | JS-SCRIPT 7: 1173
              height:100%;
// HTML 4820 | JS-SCRIPT 7: 1174
              border-radius:999px;
// HTML 4821 | JS-SCRIPT 7: 1175
              background:linear-gradient(
// HTML 4822 | JS-SCRIPT 7: 1176
                90deg,
// HTML 4823 | JS-SCRIPT 7: 1177
                #8b5cf6,
// HTML 4824 | JS-SCRIPT 7: 1178
                #ec4899
// HTML 4825 | JS-SCRIPT 7: 1179
              );
// HTML 4826 | JS-SCRIPT 7: 1180
            "
// HTML 4827 | JS-SCRIPT 7: 1181
          ></div>
// HTML 4828 | JS-SCRIPT 7: 1182
        </div>
// HTML 4829 | JS-SCRIPT 7: 1183

// HTML 4830 | JS-SCRIPT 7: 1184
      </div>
// HTML 4831 | JS-SCRIPT 7: 1185

// HTML 4832 | JS-SCRIPT 7: 1186
      <div style="padding:20px">
// HTML 4833 | JS-SCRIPT 7: 1187

// HTML 4834 | JS-SCRIPT 7: 1188
        ${
// HTML 4835 | JS-SCRIPT 7: 1189
          strengths.length
// HTML 4836 | JS-SCRIPT 7: 1190
            ? `
// HTML 4837 | JS-SCRIPT 7: 1191
              <section style="margin-bottom:22px">
// HTML 4838 | JS-SCRIPT 7: 1192
                <div
// HTML 4839 | JS-SCRIPT 7: 1193
                  style="
// HTML 4840 | JS-SCRIPT 7: 1194
                    font-size:16px;
// HTML 4841 | JS-SCRIPT 7: 1195
                    font-weight:800;
// HTML 4842 | JS-SCRIPT 7: 1196
                    margin-bottom:10px;
// HTML 4843 | JS-SCRIPT 7: 1197
                  "
// HTML 4844 | JS-SCRIPT 7: 1198
                >
// HTML 4845 | JS-SCRIPT 7: 1199
                  💚 Ce qui rapproche
// HTML 4846 | JS-SCRIPT 7: 1200
                </div>
// HTML 4847 | JS-SCRIPT 7: 1201

// HTML 4848 | JS-SCRIPT 7: 1202
                ${renderList(
// HTML 4849 | JS-SCRIPT 7: 1203
                  strengths,
// HTML 4850 | JS-SCRIPT 7: 1204
                  "Aucune force particulière identifiée."
// HTML 4851 | JS-SCRIPT 7: 1205
                )}
// HTML 4852 | JS-SCRIPT 7: 1206
              </section>
// HTML 4853 | JS-SCRIPT 7: 1207
            `
// HTML 4854 | JS-SCRIPT 7: 1208
            : ""
// HTML 4855 | JS-SCRIPT 7: 1209
        }
// HTML 4856 | JS-SCRIPT 7: 1210

// HTML 4857 | JS-SCRIPT 7: 1211
        ${
// HTML 4858 | JS-SCRIPT 7: 1212
          tensions.length
// HTML 4859 | JS-SCRIPT 7: 1213
            ? `
// HTML 4860 | JS-SCRIPT 7: 1214
              <section style="margin-bottom:22px">
// HTML 4861 | JS-SCRIPT 7: 1215
                <div
// HTML 4862 | JS-SCRIPT 7: 1216
                  style="
// HTML 4863 | JS-SCRIPT 7: 1217
                    font-size:16px;
// HTML 4864 | JS-SCRIPT 7: 1218
                    font-weight:800;
// HTML 4865 | JS-SCRIPT 7: 1219
                    margin-bottom:10px;
// HTML 4866 | JS-SCRIPT 7: 1220
                  "
// HTML 4867 | JS-SCRIPT 7: 1221
                >
// HTML 4868 | JS-SCRIPT 7: 1222
                  ⚠️ Points de tension
// HTML 4869 | JS-SCRIPT 7: 1223
                </div>
// HTML 4870 | JS-SCRIPT 7: 1224

// HTML 4871 | JS-SCRIPT 7: 1225
                ${renderList(
// HTML 4872 | JS-SCRIPT 7: 1226
                  tensions,
// HTML 4873 | JS-SCRIPT 7: 1227
                  "Aucune tension particulière identifiée."
// HTML 4874 | JS-SCRIPT 7: 1228
                )}
// HTML 4875 | JS-SCRIPT 7: 1229
              </section>
// HTML 4876 | JS-SCRIPT 7: 1230
            `
// HTML 4877 | JS-SCRIPT 7: 1231
            : ""
// HTML 4878 | JS-SCRIPT 7: 1232
        }
// HTML 4879 | JS-SCRIPT 7: 1233

// HTML 4880 | JS-SCRIPT 7: 1234
        ${
// HTML 4881 | JS-SCRIPT 7: 1235
          mixed.length
// HTML 4882 | JS-SCRIPT 7: 1236
            ? `
// HTML 4883 | JS-SCRIPT 7: 1237
              <section style="margin-bottom:22px">
// HTML 4884 | JS-SCRIPT 7: 1238

// HTML 4885 | JS-SCRIPT 7: 1239
                <div
// HTML 4886 | JS-SCRIPT 7: 1240
                  style="
// HTML 4887 | JS-SCRIPT 7: 1241
                    font-size:16px;
// HTML 4888 | JS-SCRIPT 7: 1242
                    font-weight:800;
// HTML 4889 | JS-SCRIPT 7: 1243
                    margin-bottom:10px;
// HTML 4890 | JS-SCRIPT 7: 1244
                  "
// HTML 4891 | JS-SCRIPT 7: 1245
                >
// HTML 4892 | JS-SCRIPT 7: 1246
                  ◆ Facteurs mixtes
// HTML 4893 | JS-SCRIPT 7: 1247
                </div>
// HTML 4894 | JS-SCRIPT 7: 1248

// HTML 4895 | JS-SCRIPT 7: 1249
                ${renderList(
// HTML 4896 | JS-SCRIPT 7: 1250
                  mixed,
// HTML 4897 | JS-SCRIPT 7: 1251
                  "Aucun facteur mixte."
// HTML 4898 | JS-SCRIPT 7: 1252
                )}
// HTML 4899 | JS-SCRIPT 7: 1253

// HTML 4900 | JS-SCRIPT 7: 1254
              </section>
// HTML 4901 | JS-SCRIPT 7: 1255
            `
// HTML 4902 | JS-SCRIPT 7: 1256
            : ""
// HTML 4903 | JS-SCRIPT 7: 1257
        }
// HTML 4904 | JS-SCRIPT 7: 1258

// HTML 4905 | JS-SCRIPT 7: 1259
        ${
// HTML 4906 | JS-SCRIPT 7: 1260
          keyFactors.length
// HTML 4907 | JS-SCRIPT 7: 1261
            ? `
// HTML 4908 | JS-SCRIPT 7: 1262
              <section style="margin-bottom:22px">
// HTML 4909 | JS-SCRIPT 7: 1263

// HTML 4910 | JS-SCRIPT 7: 1264
                <div
// HTML 4911 | JS-SCRIPT 7: 1265
                  style="
// HTML 4912 | JS-SCRIPT 7: 1266
                    font-size:16px;
// HTML 4913 | JS-SCRIPT 7: 1267
                    font-weight:800;
// HTML 4914 | JS-SCRIPT 7: 1268
                    margin-bottom:10px;
// HTML 4915 | JS-SCRIPT 7: 1269
                  "
// HTML 4916 | JS-SCRIPT 7: 1270
                >
// HTML 4917 | JS-SCRIPT 7: 1271
                  🎯 Facteurs clés
// HTML 4918 | JS-SCRIPT 7: 1272
                </div>
// HTML 4919 | JS-SCRIPT 7: 1273

// HTML 4920 | JS-SCRIPT 7: 1274
                ${renderList(
// HTML 4921 | JS-SCRIPT 7: 1275
                  keyFactors,
// HTML 4922 | JS-SCRIPT 7: 1276
                  "Aucun facteur clé."
// HTML 4923 | JS-SCRIPT 7: 1277
                )}
// HTML 4924 | JS-SCRIPT 7: 1278

// HTML 4925 | JS-SCRIPT 7: 1279
              </section>
// HTML 4926 | JS-SCRIPT 7: 1280
            `
// HTML 4927 | JS-SCRIPT 7: 1281
            : ""
// HTML 4928 | JS-SCRIPT 7: 1282
        }
// HTML 4929 | JS-SCRIPT 7: 1283

// HTML 4930 | JS-SCRIPT 7: 1284
        <section
// HTML 4931 | JS-SCRIPT 7: 1285
          style="
// HTML 4932 | JS-SCRIPT 7: 1286
            padding:14px 16px;
// HTML 4933 | JS-SCRIPT 7: 1287
            border-radius:16px;
// HTML 4934 | JS-SCRIPT 7: 1288
            background:rgba(255,255,255,.045);
// HTML 4935 | JS-SCRIPT 7: 1289
            border:1px solid rgba(255,255,255,.07);
// HTML 4936 | JS-SCRIPT 7: 1290
          "
// HTML 4937 | JS-SCRIPT 7: 1291
        >
// HTML 4938 | JS-SCRIPT 7: 1292

// HTML 4939 | JS-SCRIPT 7: 1293
          <div
// HTML 4940 | JS-SCRIPT 7: 1294
            style="
// HTML 4941 | JS-SCRIPT 7: 1295
              font-size:12px;
// HTML 4942 | JS-SCRIPT 7: 1296
              color:rgba(255,255,255,.45);
// HTML 4943 | JS-SCRIPT 7: 1297
              margin-bottom:5px;
// HTML 4944 | JS-SCRIPT 7: 1298
            "
// HTML 4945 | JS-SCRIPT 7: 1299
          >
// HTML 4946 | JS-SCRIPT 7: 1300
            FACTEURS ASTROLOGIQUES
// HTML 4947 | JS-SCRIPT 7: 1301
          </div>
// HTML 4948 | JS-SCRIPT 7: 1302

// HTML 4949 | JS-SCRIPT 7: 1303
          <div
// HTML 4950 | JS-SCRIPT 7: 1304
            style="
// HTML 4951 | JS-SCRIPT 7: 1305
              font-size:15px;
// HTML 4952 | JS-SCRIPT 7: 1306
              color:rgba(255,255,255,.8);
// HTML 4953 | JS-SCRIPT 7: 1307
            "
// HTML 4954 | JS-SCRIPT 7: 1308
          >
// HTML 4955 | JS-SCRIPT 7: 1309
            ${
// HTML 4956 | JS-SCRIPT 7: 1310
              domain.contribution_count ??
// HTML 4957 | JS-SCRIPT 7: 1311
              domain.contributions?.length ??
// HTML 4958 | JS-SCRIPT 7: 1312
              0
// HTML 4959 | JS-SCRIPT 7: 1313
            }
// HTML 4960 | JS-SCRIPT 7: 1314
            facteur(s) contribuent à ce domaine.
// HTML 4961 | JS-SCRIPT 7: 1315
          </div>
// HTML 4962 | JS-SCRIPT 7: 1316

// HTML 4963 | JS-SCRIPT 7: 1317
        </section>
// HTML 4964 | JS-SCRIPT 7: 1318

// HTML 4965 | JS-SCRIPT 7: 1319
        <div
// HTML 4966 | JS-SCRIPT 7: 1320
          style="
// HTML 4967 | JS-SCRIPT 7: 1321
            margin-top:18px;
// HTML 4968 | JS-SCRIPT 7: 1322
            text-align:center;
// HTML 4969 | JS-SCRIPT 7: 1323
            font-size:12px;
// HTML 4970 | JS-SCRIPT 7: 1324
            color:rgba(255,255,255,.35);
// HTML 4971 | JS-SCRIPT 7: 1325
          "
// HTML 4972 | JS-SCRIPT 7: 1326
        >
// HTML 4973 | JS-SCRIPT 7: 1327
          Données issues du calcul astrologique réel AstroMatch.
// HTML 4974 | JS-SCRIPT 7: 1328
          Aucun recalcul côté interface.
// HTML 4975 | JS-SCRIPT 7: 1329
        </div>
// HTML 4976 | JS-SCRIPT 7: 1330

// HTML 4977 | JS-SCRIPT 7: 1331
      </div>
// HTML 4978 | JS-SCRIPT 7: 1332
    </div>
// HTML 4979 | JS-SCRIPT 7: 1333
  `;
// HTML 4980 | JS-SCRIPT 7: 1334

// HTML 4981 | JS-SCRIPT 7: 1335
  document.body.appendChild(modal);
// HTML 4982 | JS-SCRIPT 7: 1336

// HTML 4983 | JS-SCRIPT 7: 1337
  console.log(
// HTML 4984 | JS-SCRIPT 7: 1338
    "ASTROMATCH DETAIL MODAL CREATED =",
// HTML 4985 | JS-SCRIPT 7: 1339
    !!document.getElementById("astromatchPrimaryDomainModal")
// HTML 4986 | JS-SCRIPT 7: 1340
  );
// HTML 4987 | JS-SCRIPT 7: 1341

// HTML 4988 | JS-SCRIPT 7: 1342
  const close = () => {
// HTML 4989 | JS-SCRIPT 7: 1343
    modal.remove();
// HTML 4990 | JS-SCRIPT 7: 1344
  };
// HTML 4991 | JS-SCRIPT 7: 1345

// HTML 4992 | JS-SCRIPT 7: 1346
  const closeButton =
// HTML 4993 | JS-SCRIPT 7: 1347
    document.getElementById(
// HTML 4994 | JS-SCRIPT 7: 1348
      "astromatchPrimaryDomainModalClose"
// HTML 4995 | JS-SCRIPT 7: 1349
    );
// HTML 4996 | JS-SCRIPT 7: 1350

// HTML 4997 | JS-SCRIPT 7: 1351
  if (closeButton) {
// HTML 4998 | JS-SCRIPT 7: 1352
    closeButton.addEventListener(
// HTML 4999 | JS-SCRIPT 7: 1353
      "click",
// HTML 5000 | JS-SCRIPT 7: 1354
      close
// HTML 5001 | JS-SCRIPT 7: 1355
    );
// HTML 5002 | JS-SCRIPT 7: 1356
  }
// HTML 5003 | JS-SCRIPT 7: 1357

// HTML 5004 | JS-SCRIPT 7: 1358
  modal.addEventListener(
// HTML 5005 | JS-SCRIPT 7: 1359
    "click",
// HTML 5006 | JS-SCRIPT 7: 1360
    event => {
// HTML 5007 | JS-SCRIPT 7: 1361
      if (event.target === modal) {
// HTML 5008 | JS-SCRIPT 7: 1362
        close();
// HTML 5009 | JS-SCRIPT 7: 1363
      }
// HTML 5010 | JS-SCRIPT 7: 1364
    }
// HTML 5011 | JS-SCRIPT 7: 1365
  );
// HTML 5012 | JS-SCRIPT 7: 1366

// HTML 5013 | JS-SCRIPT 7: 1367
  const onKeyDown = event => {
// HTML 5014 | JS-SCRIPT 7: 1368
    if (event.key === "Escape") {
// HTML 5015 | JS-SCRIPT 7: 1369
      close();
// HTML 5016 | JS-SCRIPT 7: 1370
      document.removeEventListener(
// HTML 5017 | JS-SCRIPT 7: 1371
        "keydown",
// HTML 5018 | JS-SCRIPT 7: 1372
        onKeyDown
// HTML 5019 | JS-SCRIPT 7: 1373
      );
// HTML 5020 | JS-SCRIPT 7: 1374
    }
// HTML 5021 | JS-SCRIPT 7: 1375
  };
// HTML 5022 | JS-SCRIPT 7: 1376

// HTML 5023 | JS-SCRIPT 7: 1377
  document.addEventListener(
// HTML 5024 | JS-SCRIPT 7: 1378
    "keydown",
// HTML 5025 | JS-SCRIPT 7: 1379
    onKeyDown
// HTML 5026 | JS-SCRIPT 7: 1380
  );
// HTML 5027 | JS-SCRIPT 7: 1381
}
// HTML 5028 | JS-SCRIPT 7: 1382

// HTML 5029 | JS-SCRIPT 7: 1383
window.astromatchShowPrimaryDomainDetail =
// HTML 5030 | JS-SCRIPT 7: 1384
  astromatchShowPrimaryDomainDetail;
// HTML 5031 | JS-SCRIPT 7: 1385

// HTML 5032 | JS-SCRIPT 7: 1386
/* =========================================================
// HTML 5033 | JS-SCRIPT 7: 1387
   HIGHLIGHTS / WARNINGS
// HTML 5034 | JS-SCRIPT 7: 1388
   ========================================================= */
// HTML 5035 | JS-SCRIPT 7: 1389

// HTML 5036 | JS-SCRIPT 7: 1390
function renderList(elementId, items, emptyText) {
// HTML 5037 | JS-SCRIPT 7: 1391
  const element = document.getElementById(elementId);
// HTML 5038 | JS-SCRIPT 7: 1392

// HTML 5039 | JS-SCRIPT 7: 1393
  if (!element) return;
// HTML 5040 | JS-SCRIPT 7: 1394

// HTML 5041 | JS-SCRIPT 7: 1395
  if (!Array.isArray(items) || items.length === 0) {
// HTML 5042 | JS-SCRIPT 7: 1396
    element.innerHTML =
// HTML 5043 | JS-SCRIPT 7: 1397
      `<div class="text-gray-400">${escapeHtml(emptyText)}</div>`;
// HTML 5044 | JS-SCRIPT 7: 1398
    return;
// HTML 5045 | JS-SCRIPT 7: 1399
  }
// HTML 5046 | JS-SCRIPT 7: 1400

// HTML 5047 | JS-SCRIPT 7: 1401
  element.innerHTML = items.map(item => `
// HTML 5048 | JS-SCRIPT 7: 1402
    <div class="rounded-xl bg-white/5 p-3">
// HTML 5049 | JS-SCRIPT 7: 1403
      ${escapeHtml(
// HTML 5050 | JS-SCRIPT 7: 1404
        typeof item === "string"
// HTML 5051 | JS-SCRIPT 7: 1405
          ? item
// HTML 5052 | JS-SCRIPT 7: 1406
          : item?.label ||
// HTML 5053 | JS-SCRIPT 7: 1407
            item?.text ||
// HTML 5054 | JS-SCRIPT 7: 1408
            item?.description ||
// HTML 5055 | JS-SCRIPT 7: 1409
            item?.rule_id ||
// HTML 5056 | JS-SCRIPT 7: 1410
            JSON.stringify(item)
// HTML 5057 | JS-SCRIPT 7: 1411
      )}
// HTML 5058 | JS-SCRIPT 7: 1412
    </div>
// HTML 5059 | JS-SCRIPT 7: 1413
  `).join("");
// HTML 5060 | JS-SCRIPT 7: 1414
}
// HTML 5061 | JS-SCRIPT 7: 1415

// HTML 5062 | JS-SCRIPT 7: 1416
/* =========================================================
// HTML 5063 | JS-SCRIPT 7: 1417
   RELIABILITY
// HTML 5064 | JS-SCRIPT 7: 1418
   ========================================================= */
// HTML 5065 | JS-SCRIPT 7: 1419

// HTML 5066 | JS-SCRIPT 7: 1420
function renderReliability(reliability) {
// HTML 5067 | JS-SCRIPT 7: 1421
  const element =
// HTML 5068 | JS-SCRIPT 7: 1422
    document.getElementById("reliability") ||
// HTML 5069 | JS-SCRIPT 7: 1423
    document.getElementById("reliabilityBox");
// HTML 5070 | JS-SCRIPT 7: 1424

// HTML 5071 | JS-SCRIPT 7: 1425
  if (!element) return;
// HTML 5072 | JS-SCRIPT 7: 1426

// HTML 5073 | JS-SCRIPT 7: 1427
  if (!reliability) {
// HTML 5074 | JS-SCRIPT 7: 1428
    element.innerHTML =
// HTML 5075 | JS-SCRIPT 7: 1429
      '<div class="text-gray-400">Fiabilité indisponible.</div>';
// HTML 5076 | JS-SCRIPT 7: 1430
    return;
// HTML 5077 | JS-SCRIPT 7: 1431
  }
// HTML 5078 | JS-SCRIPT 7: 1432

// HTML 5079 | JS-SCRIPT 7: 1433
  const notes = Array.isArray(reliability.notes)
// HTML 5080 | JS-SCRIPT 7: 1434
    ? reliability.notes
// HTML 5081 | JS-SCRIPT 7: 1435
    : [];
// HTML 5082 | JS-SCRIPT 7: 1436

// HTML 5083 | JS-SCRIPT 7: 1437
  element.innerHTML = `
// HTML 5084 | JS-SCRIPT 7: 1438
    <div class="font-semibold">
// HTML 5085 | JS-SCRIPT 7: 1439
      Fiabilité :
// HTML 5086 | JS-SCRIPT 7: 1440
      ${escapeHtml(reliability.level || "Inconnue")}
// HTML 5087 | JS-SCRIPT 7: 1441
    </div>
// HTML 5088 | JS-SCRIPT 7: 1442

// HTML 5089 | JS-SCRIPT 7: 1443
    <div class="mt-1 text-sm text-gray-400">
// HTML 5090 | JS-SCRIPT 7: 1444
      ${reliability.partial ? "Calcul partiel" : "Calcul complet"}
// HTML 5091 | JS-SCRIPT 7: 1445
    </div>
// HTML 5092 | JS-SCRIPT 7: 1446

// HTML 5093 | JS-SCRIPT 7: 1447
    ${
// HTML 5094 | JS-SCRIPT 7: 1448
      notes.length
// HTML 5095 | JS-SCRIPT 7: 1449
        ? `
// HTML 5096 | JS-SCRIPT 7: 1450
          <ul class="mt-2 space-y-1 text-sm text-gray-300">
// HTML 5097 | JS-SCRIPT 7: 1451
            ${notes.map(note =>
// HTML 5098 | JS-SCRIPT 7: 1452
              `<li>• ${escapeHtml(note)}</li>`
// HTML 5099 | JS-SCRIPT 7: 1453
            ).join("")}
// HTML 5100 | JS-SCRIPT 7: 1454
          </ul>
// HTML 5101 | JS-SCRIPT 7: 1455
        `
// HTML 5102 | JS-SCRIPT 7: 1456
        : ""
// HTML 5103 | JS-SCRIPT 7: 1457
    }
// HTML 5104 | JS-SCRIPT 7: 1458
  `;
// HTML 5105 | JS-SCRIPT 7: 1459
}
// HTML 5106 | JS-SCRIPT 7: 1460

// HTML 5107 | JS-SCRIPT 7: 1461

// HTML 5108 | JS-SCRIPT 7: 1462
let ASTROMATCH_PRIMARY_PROFILE = null;
// HTML 5109 | JS-SCRIPT 7: 1463
let ASTROMATCH_TARGET_PROFILES = [];
// HTML 5110 | JS-SCRIPT 7: 1464
let ASTROMATCH_SELECTED_TARGET = null;
// HTML 5111 | JS-SCRIPT 7: 1465
let ASTROMATCH_CALCULATION_TOKEN = 0;
// HTML 5112 | JS-SCRIPT 7: 1466

// HTML 5113 | JS-SCRIPT 7: 1467

// HTML 5114 | JS-SCRIPT 7: 1468

// HTML 5115 | JS-SCRIPT 7: 1469
function setTargetCalculationState(state) {
// HTML 5116 | JS-SCRIPT 7: 1470
  const element =
// HTML 5117 | JS-SCRIPT 7: 1471
    document.getElementById("targetCalculationState");
// HTML 5118 | JS-SCRIPT 7: 1472

// HTML 5119 | JS-SCRIPT 7: 1473
  const hint =
// HTML 5120 | JS-SCRIPT 7: 1474
    document.getElementById("targetSelectionHint");
// HTML 5121 | JS-SCRIPT 7: 1475

// HTML 5122 | JS-SCRIPT 7: 1476
  const selector =
// HTML 5123 | JS-SCRIPT 7: 1477
    document.getElementById("targetSelector");
// HTML 5124 | JS-SCRIPT 7: 1478

// HTML 5125 | JS-SCRIPT 7: 1479
  if (state === "loading") {
// HTML 5126 | JS-SCRIPT 7: 1480
    if (element) {
// HTML 5127 | JS-SCRIPT 7: 1481
      element.textContent = "Calcul…";
// HTML 5128 | JS-SCRIPT 7: 1482
      element.className =
// HTML 5129 | JS-SCRIPT 7: 1483
        "text-xs text-slate-300 whitespace-nowrap";
// HTML 5130 | JS-SCRIPT 7: 1484
    }
// HTML 5131 | JS-SCRIPT 7: 1485

// HTML 5132 | JS-SCRIPT 7: 1486
    if (hint) {
// HTML 5133 | JS-SCRIPT 7: 1487
      hint.textContent =
// HTML 5134 | JS-SCRIPT 7: 1488
        "Calcul réel en cours…";
// HTML 5135 | JS-SCRIPT 7: 1489
    }
// HTML 5136 | JS-SCRIPT 7: 1490

// HTML 5137 | JS-SCRIPT 7: 1491
    if (selector) {
// HTML 5138 | JS-SCRIPT 7: 1492
      selector.disabled = true;
// HTML 5139 | JS-SCRIPT 7: 1493
      selector.classList.add("opacity-70");
// HTML 5140 | JS-SCRIPT 7: 1494
    }
// HTML 5141 | JS-SCRIPT 7: 1495

// HTML 5142 | JS-SCRIPT 7: 1496
    return;
// HTML 5143 | JS-SCRIPT 7: 1497
  }
// HTML 5144 | JS-SCRIPT 7: 1498

// HTML 5145 | JS-SCRIPT 7: 1499
  if (state === "done") {
// HTML 5146 | JS-SCRIPT 7: 1500
    if (element) {
// HTML 5147 | JS-SCRIPT 7: 1501
      element.textContent = "✓ Calculé";
// HTML 5148 | JS-SCRIPT 7: 1502
      element.className =
// HTML 5149 | JS-SCRIPT 7: 1503
        "text-xs text-slate-300 whitespace-nowrap";
// HTML 5150 | JS-SCRIPT 7: 1504
    }
// HTML 5151 | JS-SCRIPT 7: 1505

// HTML 5152 | JS-SCRIPT 7: 1506
    if (hint) {
// HTML 5153 | JS-SCRIPT 7: 1507
      hint.textContent =
// HTML 5154 | JS-SCRIPT 7: 1508
        "Compatibilité recalculée pour cette cible.";
// HTML 5155 | JS-SCRIPT 7: 1509
    }
// HTML 5156 | JS-SCRIPT 7: 1510

// HTML 5157 | JS-SCRIPT 7: 1511
    if (selector) {
// HTML 5158 | JS-SCRIPT 7: 1512
      selector.disabled = false;
// HTML 5159 | JS-SCRIPT 7: 1513
      selector.classList.remove("opacity-70");
// HTML 5160 | JS-SCRIPT 7: 1514
    }
// HTML 5161 | JS-SCRIPT 7: 1515

// HTML 5162 | JS-SCRIPT 7: 1516
    return;
// HTML 5163 | JS-SCRIPT 7: 1517
  }
// HTML 5164 | JS-SCRIPT 7: 1518

// HTML 5165 | JS-SCRIPT 7: 1519
  if (state === "error") {
// HTML 5166 | JS-SCRIPT 7: 1520
    if (element) {
// HTML 5167 | JS-SCRIPT 7: 1521
      element.textContent = "Erreur";
// HTML 5168 | JS-SCRIPT 7: 1522
      element.className =
// HTML 5169 | JS-SCRIPT 7: 1523
        "text-xs text-red-400 whitespace-nowrap";
// HTML 5170 | JS-SCRIPT 7: 1524
    }
// HTML 5171 | JS-SCRIPT 7: 1525

// HTML 5172 | JS-SCRIPT 7: 1526
    if (hint) {
// HTML 5173 | JS-SCRIPT 7: 1527
      hint.textContent =
// HTML 5174 | JS-SCRIPT 7: 1528
        "Le calcul n’a pas pu être terminé.";
// HTML 5175 | JS-SCRIPT 7: 1529
    }
// HTML 5176 | JS-SCRIPT 7: 1530

// HTML 5177 | JS-SCRIPT 7: 1531
    if (selector) {
// HTML 5178 | JS-SCRIPT 7: 1532
      selector.disabled = false;
// HTML 5179 | JS-SCRIPT 7: 1533
      selector.classList.remove("opacity-70");
// HTML 5180 | JS-SCRIPT 7: 1534
    }
// HTML 5181 | JS-SCRIPT 7: 1535

// HTML 5182 | JS-SCRIPT 7: 1536
    return;
// HTML 5183 | JS-SCRIPT 7: 1537
  }
// HTML 5184 | JS-SCRIPT 7: 1538

// HTML 5185 | JS-SCRIPT 7: 1539
  if (element) {
// HTML 5186 | JS-SCRIPT 7: 1540
    element.textContent = "Prêt";
// HTML 5187 | JS-SCRIPT 7: 1541
    element.className =
// HTML 5188 | JS-SCRIPT 7: 1542
      "text-xs text-slate-500 whitespace-nowrap";
// HTML 5189 | JS-SCRIPT 7: 1543
  }
// HTML 5190 | JS-SCRIPT 7: 1544

// HTML 5191 | JS-SCRIPT 7: 1545
  if (hint) {
// HTML 5192 | JS-SCRIPT 7: 1546
    hint.textContent =
// HTML 5193 | JS-SCRIPT 7: 1547
      "La sélection recalcule automatiquement la compatibilité.";
// HTML 5194 | JS-SCRIPT 7: 1548
  }
// HTML 5195 | JS-SCRIPT 7: 1549

// HTML 5196 | JS-SCRIPT 7: 1550
  if (selector) {
// HTML 5197 | JS-SCRIPT 7: 1551
    selector.disabled = false;
// HTML 5198 | JS-SCRIPT 7: 1552
    selector.classList.remove("opacity-70");
// HTML 5199 | JS-SCRIPT 7: 1553
  }
// HTML 5200 | JS-SCRIPT 7: 1554
}
// HTML 5201 | JS-SCRIPT 7: 1555

// HTML 5202 | JS-SCRIPT 7: 1556

// HTML 5203 | JS-SCRIPT 7: 1557
function updateTargetSelectionVisual(target) {
// HTML 5204 | JS-SCRIPT 7: 1558
  const hint =
// HTML 5205 | JS-SCRIPT 7: 1559
    document.getElementById("targetSelectionHint");
// HTML 5206 | JS-SCRIPT 7: 1560

// HTML 5207 | JS-SCRIPT 7: 1561
  if (!hint || !target) return;
// HTML 5208 | JS-SCRIPT 7: 1562

// HTML 5209 | JS-SCRIPT 7: 1563
  const firstName =
// HTML 5210 | JS-SCRIPT 7: 1564
    target.identity?.first_name ||
// HTML 5211 | JS-SCRIPT 7: 1565
    "Profil cible";
// HTML 5212 | JS-SCRIPT 7: 1566

// HTML 5213 | JS-SCRIPT 7: 1567
  const lastName =
// HTML 5214 | JS-SCRIPT 7: 1568
    target.identity?.last_name ||
// HTML 5215 | JS-SCRIPT 7: 1569
    "";
// HTML 5216 | JS-SCRIPT 7: 1570

// HTML 5217 | JS-SCRIPT 7: 1571
  const fullName =
// HTML 5218 | JS-SCRIPT 7: 1572
    `${firstName}${lastName ? " " + lastName : ""}`.trim();
// HTML 5219 | JS-SCRIPT 7: 1573

// HTML 5220 | JS-SCRIPT 7: 1574
  hint.textContent =
// HTML 5221 | JS-SCRIPT 7: 1575
    `Analyse active : ${fullName}.`;
// HTML 5222 | JS-SCRIPT 7: 1576

// HTML 5223 | JS-SCRIPT 7: 1577
  refreshTargetCards();
// HTML 5224 | JS-SCRIPT 7: 1578
}
// HTML 5225 | JS-SCRIPT 7: 1579

// HTML 5226 | JS-SCRIPT 7: 1580

// HTML 5227 | JS-SCRIPT 7: 1581

// HTML 5228 | JS-SCRIPT 7: 1582
function calculateAge(profile) {
// HTML 5229 | JS-SCRIPT 7: 1583
  const date = profile?.birth_data?.date;
// HTML 5230 | JS-SCRIPT 7: 1584
  if (!date) return null;
// HTML 5231 | JS-SCRIPT 7: 1585

// HTML 5232 | JS-SCRIPT 7: 1586
  const birth = new Date(`${date}T00:00:00`);
// HTML 5233 | JS-SCRIPT 7: 1587
  if (!Number.isFinite(birth.getTime())) return null;
// HTML 5234 | JS-SCRIPT 7: 1588

// HTML 5235 | JS-SCRIPT 7: 1589
  const now = new Date();
// HTML 5236 | JS-SCRIPT 7: 1590

// HTML 5237 | JS-SCRIPT 7: 1591
  let age = now.getFullYear() - birth.getFullYear();
// HTML 5238 | JS-SCRIPT 7: 1592

// HTML 5239 | JS-SCRIPT 7: 1593
  const month = now.getMonth() - birth.getMonth();
// HTML 5240 | JS-SCRIPT 7: 1594

// HTML 5241 | JS-SCRIPT 7: 1595
  if (
// HTML 5242 | JS-SCRIPT 7: 1596
    month < 0 ||
// HTML 5243 | JS-SCRIPT 7: 1597
    (month === 0 && now.getDate() < birth.getDate())
// HTML 5244 | JS-SCRIPT 7: 1598
  ) {
// HTML 5245 | JS-SCRIPT 7: 1599
    age--;
// HTML 5246 | JS-SCRIPT 7: 1600
  }
// HTML 5247 | JS-SCRIPT 7: 1601

// HTML 5248 | JS-SCRIPT 7: 1602
  return age >= 0 && age < 150 ? age : null;
// HTML 5249 | JS-SCRIPT 7: 1603
}
// HTML 5250 | JS-SCRIPT 7: 1604

// HTML 5251 | JS-SCRIPT 7: 1605
function zodiacFromDate(dateValue) {
// HTML 5252 | JS-SCRIPT 7: 1606
  if (!dateValue) return null;
// HTML 5253 | JS-SCRIPT 7: 1607

// HTML 5254 | JS-SCRIPT 7: 1608
  const date = String(dateValue).slice(0, 10);
// HTML 5255 | JS-SCRIPT 7: 1609
  const [year, month, day] = date.split("-").map(Number);
// HTML 5256 | JS-SCRIPT 7: 1610

// HTML 5257 | JS-SCRIPT 7: 1611
  if (!month || !day) return null;
// HTML 5258 | JS-SCRIPT 7: 1612

// HTML 5259 | JS-SCRIPT 7: 1613
  const signs = [
// HTML 5260 | JS-SCRIPT 7: 1614
    { name: "Capricorne", symbol: "♑", element: "🌍 Terre", start: [12, 22], end: [1, 19] },
// HTML 5261 | JS-SCRIPT 7: 1615
    { name: "Verseau", symbol: "♒", element: "🌬️ Air", start: [1, 20], end: [2, 18] },
// HTML 5262 | JS-SCRIPT 7: 1616
    { name: "Poissons", symbol: "♓", element: "💧 Eau", start: [2, 19], end: [3, 20] },
// HTML 5263 | JS-SCRIPT 7: 1617
    { name: "Bélier", symbol: "♈", element: "🔥 Feu", start: [3, 21], end: [4, 19] },
// HTML 5264 | JS-SCRIPT 7: 1618
    { name: "Taureau", symbol: "♉", element: "🌍 Terre", start: [4, 20], end: [5, 20] },
// HTML 5265 | JS-SCRIPT 7: 1619
    { name: "Gémeaux", symbol: "♊", element: "🌬️ Air", start: [5, 21], end: [6, 20] },
// HTML 5266 | JS-SCRIPT 7: 1620
    { name: "Cancer", symbol: "♋", element: "💧 Eau", start: [6, 21], end: [7, 22] },
// HTML 5267 | JS-SCRIPT 7: 1621
    { name: "Lion", symbol: "♌", element: "🔥 Feu", start: [7, 23], end: [8, 22] },
// HTML 5268 | JS-SCRIPT 7: 1622
    { name: "Vierge", symbol: "♍", element: "🌍 Terre", start: [8, 23], end: [9, 22] },
// HTML 5269 | JS-SCRIPT 7: 1623
    { name: "Balance", symbol: "♎", element: "🌬️ Air", start: [9, 23], end: [10, 22] },
// HTML 5270 | JS-SCRIPT 7: 1624
    { name: "Scorpion", symbol: "♏", element: "💧 Eau", start: [10, 23], end: [11, 21] },
// HTML 5271 | JS-SCRIPT 7: 1625
    { name: "Sagittaire", symbol: "♐", element: "🔥 Feu", start: [11, 22], end: [12, 21] }
// HTML 5272 | JS-SCRIPT 7: 1626
  ];
// HTML 5273 | JS-SCRIPT 7: 1627

// HTML 5274 | JS-SCRIPT 7: 1628
  for (const sign of signs) {
// HTML 5275 | JS-SCRIPT 7: 1629
    const [sm, sd] = sign.start;
// HTML 5276 | JS-SCRIPT 7: 1630
    const [em, ed] = sign.end;
// HTML 5277 | JS-SCRIPT 7: 1631

// HTML 5278 | JS-SCRIPT 7: 1632
    if (
// HTML 5279 | JS-SCRIPT 7: 1633
      (sm <= em && (
// HTML 5280 | JS-SCRIPT 7: 1634
        (month > sm || (month === sm && day >= sd)) &&
// HTML 5281 | JS-SCRIPT 7: 1635
        (month < em || (month === em && day <= ed))
// HTML 5282 | JS-SCRIPT 7: 1636
      )) ||
// HTML 5283 | JS-SCRIPT 7: 1637
      (sm > em && (
// HTML 5284 | JS-SCRIPT 7: 1638
        (month > sm || (month === sm && day >= sd)) ||
// HTML 5285 | JS-SCRIPT 7: 1639
        (month < em || (month === em && day <= ed))
// HTML 5286 | JS-SCRIPT 7: 1640
      ))
// HTML 5287 | JS-SCRIPT 7: 1641
    ) {
// HTML 5288 | JS-SCRIPT 7: 1642
      return sign;
// HTML 5289 | JS-SCRIPT 7: 1643
    }
// HTML 5290 | JS-SCRIPT 7: 1644
  }
// HTML 5291 | JS-SCRIPT 7: 1645

// HTML 5292 | JS-SCRIPT 7: 1646
  return null;
// HTML 5293 | JS-SCRIPT 7: 1647
}
// HTML 5294 | JS-SCRIPT 7: 1648

// HTML 5295 | JS-SCRIPT 7: 1649
function parseTime(profile) {
// HTML 5296 | JS-SCRIPT 7: 1650
  const value = profile?.birth_data?.time?.value;
// HTML 5297 | JS-SCRIPT 7: 1651
  if (!value) return null;
// HTML 5298 | JS-SCRIPT 7: 1652

// HTML 5299 | JS-SCRIPT 7: 1653
  const match = String(value).match(/^(\d{1,2}):(\d{2})/);
// HTML 5300 | JS-SCRIPT 7: 1654

// HTML 5301 | JS-SCRIPT 7: 1655
  if (!match) return null;
// HTML 5302 | JS-SCRIPT 7: 1656

// HTML 5303 | JS-SCRIPT 7: 1657
  return {
// HTML 5304 | JS-SCRIPT 7: 1658
    hour: Number(match[1]),
// HTML 5305 | JS-SCRIPT 7: 1659
    minute: Number(match[2])
// HTML 5306 | JS-SCRIPT 7: 1660
  };
// HTML 5307 | JS-SCRIPT 7: 1661
}
// HTML 5308 | JS-SCRIPT 7: 1662

// HTML 5309 | JS-SCRIPT 7: 1663
/*
// HTML 5310 | JS-SCRIPT 7: 1664
 * Ascendant d'affichage uniquement.
// HTML 5311 | JS-SCRIPT 7: 1665
 *
// HTML 5312 | JS-SCRIPT 7: 1666
 * IMPORTANT :
// HTML 5313 | JS-SCRIPT 7: 1667
 * - utilisé uniquement pour la fiche UI
// HTML 5314 | JS-SCRIPT 7: 1668
 * - jamais envoyé au scoring
// HTML 5315 | JS-SCRIPT 7: 1669
 * - jamais utilisé dans computeSynastry()
// HTML 5316 | JS-SCRIPT 7: 1670
 * - jamais utilisé dans computeScore()
// HTML 5317 | JS-SCRIPT 7: 1671
 *
// HTML 5318 | JS-SCRIPT 7: 1672
 * Calcul astronomique classique à partir de :
// HTML 5319 | JS-SCRIPT 7: 1673
 * date + heure locale + longitude + latitude + obliquité.
// HTML 5320 | JS-SCRIPT 7: 1674
 */
// HTML 5321 | JS-SCRIPT 7: 1675
function calculateDisplayAscendant(profile) {
// HTML 5322 | JS-SCRIPT 7: 1676
  if (!profile?.birth_data?.time?.known) return null;
// HTML 5323 | JS-SCRIPT 7: 1677

// HTML 5324 | JS-SCRIPT 7: 1678
  const date = profile?.birth_data?.date;
// HTML 5325 | JS-SCRIPT 7: 1679
  const lat = Number(profile?.birth_data?.place?.resolved?.latitude);
// HTML 5326 | JS-SCRIPT 7: 1680
  const lon = Number(profile?.birth_data?.place?.resolved?.longitude);
// HTML 5327 | JS-SCRIPT 7: 1681
  const time = parseTime(profile);
// HTML 5328 | JS-SCRIPT 7: 1682

// HTML 5329 | JS-SCRIPT 7: 1683
  if (!date || !Number.isFinite(lat) || !Number.isFinite(lon) || !time) {
// HTML 5330 | JS-SCRIPT 7: 1684
    return null;
// HTML 5331 | JS-SCRIPT 7: 1685
  }
// HTML 5332 | JS-SCRIPT 7: 1686

// HTML 5333 | JS-SCRIPT 7: 1687
  const [Y, M, D] = String(date).slice(0, 10).split("-").map(Number);
// HTML 5334 | JS-SCRIPT 7: 1688

// HTML 5335 | JS-SCRIPT 7: 1689
  if (!Y || !M || !D) return null;
// HTML 5336 | JS-SCRIPT 7: 1690

// HTML 5337 | JS-SCRIPT 7: 1691
  // Conversion en JD UTC approximative.
// HTML 5338 | JS-SCRIPT 7: 1692
  // Europe/Paris est gérée ici via le décalage saisonnier.
// HTML 5339 | JS-SCRIPT 7: 1693
  // Cette valeur reste strictement présentationnelle.
// HTML 5340 | JS-SCRIPT 7: 1694
  const localDate = new Date(
// HTML 5341 | JS-SCRIPT 7: 1695
    Y,
// HTML 5342 | JS-SCRIPT 7: 1696
    M - 1,
// HTML 5343 | JS-SCRIPT 7: 1697
    D,
// HTML 5344 | JS-SCRIPT 7: 1698
    time.hour,
// HTML 5345 | JS-SCRIPT 7: 1699
    time.minute,
// HTML 5346 | JS-SCRIPT 7: 1700
    0,
// HTML 5347 | JS-SCRIPT 7: 1701
    0
// HTML 5348 | JS-SCRIPT 7: 1702
  );
// HTML 5349 | JS-SCRIPT 7: 1703

// HTML 5350 | JS-SCRIPT 7: 1704
  if (!Number.isFinite(localDate.getTime())) return null;
// HTML 5351 | JS-SCRIPT 7: 1705

// HTML 5352 | JS-SCRIPT 7: 1706
  const jan = new Date(Y, 0, 1);
// HTML 5353 | JS-SCRIPT 7: 1707
  const jul = new Date(Y, 6, 1);
// HTML 5354 | JS-SCRIPT 7: 1708

// HTML 5355 | JS-SCRIPT 7: 1709
  const parisOffset =
// HTML 5356 | JS-SCRIPT 7: 1710
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
// HTML 5357 | JS-SCRIPT 7: 1711

// HTML 5358 | JS-SCRIPT 7: 1712
  const utcMs =
// HTML 5359 | JS-SCRIPT 7: 1713
    localDate.getTime() +
// HTML 5360 | JS-SCRIPT 7: 1714
    parisOffset * 60000;
// HTML 5361 | JS-SCRIPT 7: 1715

// HTML 5362 | JS-SCRIPT 7: 1716
  const utc = new Date(utcMs);
// HTML 5363 | JS-SCRIPT 7: 1717

// HTML 5364 | JS-SCRIPT 7: 1718
  const jd =
// HTML 5365 | JS-SCRIPT 7: 1719
    utc.getTime() / 86400000 +
// HTML 5366 | JS-SCRIPT 7: 1720
    2440587.5;
// HTML 5367 | JS-SCRIPT 7: 1721

// HTML 5368 | JS-SCRIPT 7: 1722
  const T = (jd - 2451545.0) / 36525;
// HTML 5369 | JS-SCRIPT 7: 1723

// HTML 5370 | JS-SCRIPT 7: 1724
  let gmst =
// HTML 5371 | JS-SCRIPT 7: 1725
    280.46061837 +
// HTML 5372 | JS-SCRIPT 7: 1726
    360.98564736629 * (jd - 2451545.0) +
// HTML 5373 | JS-SCRIPT 7: 1727
    0.000387933 * T * T -
// HTML 5374 | JS-SCRIPT 7: 1728
    (T * T * T) / 38710000;
// HTML 5375 | JS-SCRIPT 7: 1729

// HTML 5376 | JS-SCRIPT 7: 1730
  gmst = ((gmst % 360) + 360) % 360;
// HTML 5377 | JS-SCRIPT 7: 1731

// HTML 5378 | JS-SCRIPT 7: 1732
  const lst = ((gmst + lon) % 360 + 360) % 360;
// HTML 5379 | JS-SCRIPT 7: 1733

// HTML 5380 | JS-SCRIPT 7: 1734
  const rad = Math.PI / 180;
// HTML 5381 | JS-SCRIPT 7: 1735

// HTML 5382 | JS-SCRIPT 7: 1736
  const obliquity =
// HTML 5383 | JS-SCRIPT 7: 1737
    23.439291 -
// HTML 5384 | JS-SCRIPT 7: 1738
    0.0130042 * T;
// HTML 5385 | JS-SCRIPT 7: 1739

// HTML 5386 | JS-SCRIPT 7: 1740
  const phi = lat * rad;
// HTML 5387 | JS-SCRIPT 7: 1741
  const eps = obliquity * rad;
// HTML 5388 | JS-SCRIPT 7: 1742
  const theta = lst * rad;
// HTML 5389 | JS-SCRIPT 7: 1743

// HTML 5390 | JS-SCRIPT 7: 1744
  const asc =
// HTML 5391 | JS-SCRIPT 7: 1745
    Math.atan2(
// HTML 5392 | JS-SCRIPT 7: 1746
      -Math.cos(theta),
// HTML 5393 | JS-SCRIPT 7: 1747
      Math.sin(theta) * Math.cos(eps) +
// HTML 5394 | JS-SCRIPT 7: 1748
      Math.tan(phi) * Math.sin(eps)
// HTML 5395 | JS-SCRIPT 7: 1749
    ) / rad;
// HTML 5396 | JS-SCRIPT 7: 1750

// HTML 5397 | JS-SCRIPT 7: 1751
  const degree = ((asc + 180) % 360 + 360) % 360;
// HTML 5398 | JS-SCRIPT 7: 1752

// HTML 5399 | JS-SCRIPT 7: 1753
  const signs = [
// HTML 5400 | JS-SCRIPT 7: 1754
    "Bélier", "Taureau", "Gémeaux", "Cancer",
// HTML 5401 | JS-SCRIPT 7: 1755
    "Lion", "Vierge", "Balance", "Scorpion",
// HTML 5402 | JS-SCRIPT 7: 1756
    "Sagittaire", "Capricorne", "Verseau", "Poissons"
// HTML 5403 | JS-SCRIPT 7: 1757
  ];
// HTML 5404 | JS-SCRIPT 7: 1758

// HTML 5405 | JS-SCRIPT 7: 1759
  const symbols = [
// HTML 5406 | JS-SCRIPT 7: 1760
    "♈", "♉", "♊", "♋", "♌", "♍",
// HTML 5407 | JS-SCRIPT 7: 1761
    "♎", "♏", "♐", "♑", "♒", "♓"
// HTML 5408 | JS-SCRIPT 7: 1762
  ];
// HTML 5409 | JS-SCRIPT 7: 1763

// HTML 5410 | JS-SCRIPT 7: 1764
  const index = Math.floor(degree / 30);
// HTML 5411 | JS-SCRIPT 7: 1765

// HTML 5412 | JS-SCRIPT 7: 1766
  return {
// HTML 5413 | JS-SCRIPT 7: 1767
    name: signs[index],
// HTML 5414 | JS-SCRIPT 7: 1768
    symbol: symbols[index],
// HTML 5415 | JS-SCRIPT 7: 1769
    degree
// HTML 5416 | JS-SCRIPT 7: 1770
  };
// HTML 5417 | JS-SCRIPT 7: 1771
}
// HTML 5418 | JS-SCRIPT 7: 1772

// HTML 5419 | JS-SCRIPT 7: 1773
function formatBirthDate(profile) {
// HTML 5420 | JS-SCRIPT 7: 1774
  const date = profile?.birth_data?.date;
// HTML 5421 | JS-SCRIPT 7: 1775

// HTML 5422 | JS-SCRIPT 7: 1776
  if (!date) return "Date inconnue";
// HTML 5423 | JS-SCRIPT 7: 1777

// HTML 5424 | JS-SCRIPT 7: 1778
  const parts = String(date).slice(0, 10).split("-");
// HTML 5425 | JS-SCRIPT 7: 1779

// HTML 5426 | JS-SCRIPT 7: 1780
  if (parts.length !== 3) return date;
// HTML 5427 | JS-SCRIPT 7: 1781

// HTML 5428 | JS-SCRIPT 7: 1782
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
// HTML 5429 | JS-SCRIPT 7: 1783
}
// HTML 5430 | JS-SCRIPT 7: 1784

// HTML 5431 | JS-SCRIPT 7: 1785
function formatBirthTime(profile) {
// HTML 5432 | JS-SCRIPT 7: 1786
  if (!profile?.birth_data?.time?.known) {
// HTML 5433 | JS-SCRIPT 7: 1787
    return "heure inconnue";
// HTML 5434 | JS-SCRIPT 7: 1788
  }
// HTML 5435 | JS-SCRIPT 7: 1789

// HTML 5436 | JS-SCRIPT 7: 1790
  return profile?.birth_data?.time?.value || "heure inconnue";
// HTML 5437 | JS-SCRIPT 7: 1791
}
// HTML 5438 | JS-SCRIPT 7: 1792

// HTML 5439 | JS-SCRIPT 7: 1793
function profileFullName(profile) {
// HTML 5440 | JS-SCRIPT 7: 1794
  const first =
// HTML 5441 | JS-SCRIPT 7: 1795
    profile?.identity?.first_name ||
// HTML 5442 | JS-SCRIPT 7: 1796
    "Profil cible";
// HTML 5443 | JS-SCRIPT 7: 1797

// HTML 5444 | JS-SCRIPT 7: 1798
  const last =
// HTML 5445 | JS-SCRIPT 7: 1799
    profile?.identity?.last_name ||
// HTML 5446 | JS-SCRIPT 7: 1800
    "";
// HTML 5447 | JS-SCRIPT 7: 1801

// HTML 5448 | JS-SCRIPT 7: 1802
  return `${first}${last ? " " + last : ""}`.trim();
// HTML 5449 | JS-SCRIPT 7: 1803
}
// HTML 5450 | JS-SCRIPT 7: 1804

// HTML 5451 | JS-SCRIPT 7: 1805
function genderLabel(profile) {
// HTML 5452 | JS-SCRIPT 7: 1806
  if (profile?.identity?.gender === "male") {
// HTML 5453 | JS-SCRIPT 7: 1807
    return "♂ Homme";
// HTML 5454 | JS-SCRIPT 7: 1808
  }
// HTML 5455 | JS-SCRIPT 7: 1809

// HTML 5456 | JS-SCRIPT 7: 1810
  if (profile?.identity?.gender === "female") {
// HTML 5457 | JS-SCRIPT 7: 1811
    return "♀ Femme";
// HTML 5458 | JS-SCRIPT 7: 1812
  }
// HTML 5459 | JS-SCRIPT 7: 1813

// HTML 5460 | JS-SCRIPT 7: 1814
  return "";
// HTML 5461 | JS-SCRIPT 7: 1815
}
// HTML 5462 | JS-SCRIPT 7: 1816

// HTML 5463 | JS-SCRIPT 7: 1817
function relationshipContextLabel(profile) {
// HTML 5464 | JS-SCRIPT 7: 1818
  const context =
// HTML 5465 | JS-SCRIPT 7: 1819
    profile?.relationship?.context ||
// HTML 5466 | JS-SCRIPT 7: 1820
    "romantic";
// HTML 5467 | JS-SCRIPT 7: 1821

// HTML 5468 | JS-SCRIPT 7: 1822
  if (context === "family") {
// HTML 5469 | JS-SCRIPT 7: 1823
    return "👨‍👩‍👧‍👦 Famille";
// HTML 5470 | JS-SCRIPT 7: 1824
  }
// HTML 5471 | JS-SCRIPT 7: 1825

// HTML 5472 | JS-SCRIPT 7: 1826
  if (context === "friendship") {
// HTML 5473 | JS-SCRIPT 7: 1827
    return "🤝 Amitié";
// HTML 5474 | JS-SCRIPT 7: 1828
  }
// HTML 5475 | JS-SCRIPT 7: 1829

// HTML 5476 | JS-SCRIPT 7: 1830
  return "❤️ Relation";
// HTML 5477 | JS-SCRIPT 7: 1831
}
// HTML 5478 | JS-SCRIPT 7: 1832

// HTML 5479 | JS-SCRIPT 7: 1833
function renderProfileCard(target, selectedTarget) {
// HTML 5480 | JS-SCRIPT 7: 1834
  const id =
// HTML 5481 | JS-SCRIPT 7: 1835
    String(target?.profile_id || "");
// HTML 5482 | JS-SCRIPT 7: 1836

// HTML 5483 | JS-SCRIPT 7: 1837
  const selected =
// HTML 5484 | JS-SCRIPT 7: 1838
    selectedTarget?.profile_id === target?.profile_id;
// HTML 5485 | JS-SCRIPT 7: 1839

// HTML 5486 | JS-SCRIPT 7: 1840
  const name =
// HTML 5487 | JS-SCRIPT 7: 1841
    profileFullName(target);
// HTML 5488 | JS-SCRIPT 7: 1842

// HTML 5489 | JS-SCRIPT 7: 1843
  const zodiac =
// HTML 5490 | JS-SCRIPT 7: 1844
    zodiacFromDate(target?.birth_data?.date);
// HTML 5491 | JS-SCRIPT 7: 1845

// HTML 5492 | JS-SCRIPT 7: 1846
  const age =
// HTML 5493 | JS-SCRIPT 7: 1847
    calculateAge(target);
// HTML 5494 | JS-SCRIPT 7: 1848

// HTML 5495 | JS-SCRIPT 7: 1849
  const asc =
// HTML 5496 | JS-SCRIPT 7: 1850
    calculateDisplayAscendant(target);
// HTML 5497 | JS-SCRIPT 7: 1851

// HTML 5498 | JS-SCRIPT 7: 1852
  const gender =
// HTML 5499 | JS-SCRIPT 7: 1853
    genderLabel(target);
// HTML 5500 | JS-SCRIPT 7: 1854

// HTML 5501 | JS-SCRIPT 7: 1855
  const context =
// HTML 5502 | JS-SCRIPT 7: 1856
    relationshipContextLabel(target);
// HTML 5503 | JS-SCRIPT 7: 1857

// HTML 5504 | JS-SCRIPT 7: 1858
  const place =
// HTML 5505 | JS-SCRIPT 7: 1859
    target?.birth_data?.place?.raw_input ||
// HTML 5506 | JS-SCRIPT 7: 1860
    "Lieu inconnu";
// HTML 5507 | JS-SCRIPT 7: 1861

// HTML 5508 | JS-SCRIPT 7: 1862
  const birth =
// HTML 5509 | JS-SCRIPT 7: 1863
    `${formatBirthDate(target)} · ${formatBirthTime(target)}`;
// HTML 5510 | JS-SCRIPT 7: 1864

// HTML 5511 | JS-SCRIPT 7: 1865
  return `
// HTML 5512 | JS-SCRIPT 7: 1866
    <button
// HTML 5513 | JS-SCRIPT 7: 1867
      type="button"
// HTML 5514 | JS-SCRIPT 7: 1868
      data-target-id="${escapeHtml(id)}"
// HTML 5515 | JS-SCRIPT 7: 1869
      aria-pressed="${selected ? "true" : "false"}"
// HTML 5516 | JS-SCRIPT 7: 1870
      class="astromatch-profile-card target-profile-card w-full text-left p-4 ${
// HTML 5517 | JS-SCRIPT 7: 1871
        selected ? "selected" : ""
// HTML 5518 | JS-SCRIPT 7: 1872
      }"
// HTML 5519 | JS-SCRIPT 7: 1873
    >
// HTML 5520 | JS-SCRIPT 7: 1874

// HTML 5521 | JS-SCRIPT 7: 1875
      <div class="flex items-start gap-3">
// HTML 5522 | JS-SCRIPT 7: 1876

// HTML 5523 | JS-SCRIPT 7: 1877
        <div class="zodiac-art">
// HTML 5524 | JS-SCRIPT 7: 1878
          <span class="zodiac-symbol">
// HTML 5525 | JS-SCRIPT 7: 1879
            ${zodiac?.symbol || "✦"}
// HTML 5526 | JS-SCRIPT 7: 1880
          </span>
// HTML 5527 | JS-SCRIPT 7: 1881
        </div>
// HTML 5528 | JS-SCRIPT 7: 1882

// HTML 5529 | JS-SCRIPT 7: 1883
        <div class="min-w-0 flex-1">
// HTML 5530 | JS-SCRIPT 7: 1884

// HTML 5531 | JS-SCRIPT 7: 1885
          <div class="flex items-start justify-between gap-2">
// HTML 5532 | JS-SCRIPT 7: 1886

// HTML 5533 | JS-SCRIPT 7: 1887
            <div class="min-w-0">
// HTML 5534 | JS-SCRIPT 7: 1888
              <div class="font-black text-base text-white truncate">
// HTML 5535 | JS-SCRIPT 7: 1889
                ${escapeHtml(name)}
// HTML 5536 | JS-SCRIPT 7: 1890
              </div>
// HTML 5537 | JS-SCRIPT 7: 1891

// HTML 5538 | JS-SCRIPT 7: 1892
              <div class="text-[11px] text-slate-400 mt-1">
// HTML 5539 | JS-SCRIPT 7: 1893
                ${gender ? escapeHtml(gender) : "Profil cible"}
// HTML 5540 | JS-SCRIPT 7: 1894
              </div>
// HTML 5541 | JS-SCRIPT 7: 1895
            </div>
// HTML 5542 | JS-SCRIPT 7: 1896

// HTML 5543 | JS-SCRIPT 7: 1897
            <div class="text-slate-500 text-xl leading-none">
// HTML 5544 | JS-SCRIPT 7: 1898
              ›
// HTML 5545 | JS-SCRIPT 7: 1899
            </div>
// HTML 5546 | JS-SCRIPT 7: 1900

// HTML 5547 | JS-SCRIPT 7: 1901
          </div>
// HTML 5548 | JS-SCRIPT 7: 1902

// HTML 5549 | JS-SCRIPT 7: 1903
          <div class="text-xs text-slate-400 mt-2">
// HTML 5550 | JS-SCRIPT 7: 1904
            ${escapeHtml(
// HTML 5551 | JS-SCRIPT 7: 1905
              age === null
// HTML 5552 | JS-SCRIPT 7: 1906
                ? birth
// HTML 5553 | JS-SCRIPT 7: 1907
                : `${age} ans · ${birth}`
// HTML 5554 | JS-SCRIPT 7: 1908
            )}
// HTML 5555 | JS-SCRIPT 7: 1909
          </div>
// HTML 5556 | JS-SCRIPT 7: 1910

// HTML 5557 | JS-SCRIPT 7: 1911
          <div class="text-xs text-slate-300 mt-1">
// HTML 5558 | JS-SCRIPT 7: 1912
            ${escapeHtml(place)}
// HTML 5559 | JS-SCRIPT 7: 1913
          </div>
// HTML 5560 | JS-SCRIPT 7: 1914

// HTML 5561 | JS-SCRIPT 7: 1915
          <div class="profile-meta-grid mt-3">
// HTML 5562 | JS-SCRIPT 7: 1916

// HTML 5563 | JS-SCRIPT 7: 1917
            <div class="profile-meta-pill">
// HTML 5564 | JS-SCRIPT 7: 1918
              <strong>${escapeHtml(zodiac?.symbol || "—")}</strong>
// HTML 5565 | JS-SCRIPT 7: 1919
              ${escapeHtml(zodiac?.name || "Signe inconnu")}
// HTML 5566 | JS-SCRIPT 7: 1920
            </div>
// HTML 5567 | JS-SCRIPT 7: 1921

// HTML 5568 | JS-SCRIPT 7: 1922
            <div class="profile-meta-pill">
// HTML 5569 | JS-SCRIPT 7: 1923
              <strong>↑ ${escapeHtml(asc?.symbol || "—")}</strong>
// HTML 5570 | JS-SCRIPT 7: 1924
              ${escapeHtml(asc?.name || "Ascendant")}
// HTML 5571 | JS-SCRIPT 7: 1925
            </div>
// HTML 5572 | JS-SCRIPT 7: 1926

// HTML 5573 | JS-SCRIPT 7: 1927
            <div class="profile-meta-pill">
// HTML 5574 | JS-SCRIPT 7: 1928
              <strong>${escapeHtml(zodiac?.element || "—")}</strong>
// HTML 5575 | JS-SCRIPT 7: 1929
            </div>
// HTML 5576 | JS-SCRIPT 7: 1930

// HTML 5577 | JS-SCRIPT 7: 1931
            <div class="profile-meta-pill">
// HTML 5578 | JS-SCRIPT 7: 1932
              <strong>${escapeHtml(context)}</strong>
// HTML 5579 | JS-SCRIPT 7: 1933
            </div>
// HTML 5580 | JS-SCRIPT 7: 1934

// HTML 5581 | JS-SCRIPT 7: 1935
          </div>
// HTML 5582 | JS-SCRIPT 7: 1936

// HTML 5583 | JS-SCRIPT 7: 1937
        </div>
// HTML 5584 | JS-SCRIPT 7: 1938

// HTML 5585 | JS-SCRIPT 7: 1939
      </div>
// HTML 5586 | JS-SCRIPT 7: 1940

// HTML 5587 | JS-SCRIPT 7: 1941
    </button>
// HTML 5588 | JS-SCRIPT 7: 1942
  `;
// HTML 5589 | JS-SCRIPT 7: 1943
}
// HTML 5590 | JS-SCRIPT 7: 1944

// HTML 5591 | JS-SCRIPT 7: 1945
function renderTargetSelector(targets, selectedTarget) {
// HTML 5592 | JS-SCRIPT 7: 1946
  const container =
// HTML 5593 | JS-SCRIPT 7: 1947
    document.getElementById("targetSelector");
// HTML 5594 | JS-SCRIPT 7: 1948

// HTML 5595 | JS-SCRIPT 7: 1949
  if (!container) return;
// HTML 5596 | JS-SCRIPT 7: 1950

// HTML 5597 | JS-SCRIPT 7: 1951
  const safeTargets =
// HTML 5598 | JS-SCRIPT 7: 1952
    Array.isArray(targets)
// HTML 5599 | JS-SCRIPT 7: 1953
      ? targets
// HTML 5600 | JS-SCRIPT 7: 1954
      : [];
// HTML 5601 | JS-SCRIPT 7: 1955

// HTML 5602 | JS-SCRIPT 7: 1956
  const men =
// HTML 5603 | JS-SCRIPT 7: 1957
    safeTargets.filter(
// HTML 5604 | JS-SCRIPT 7: 1958
      target =>
// HTML 5605 | JS-SCRIPT 7: 1959
        target?.identity?.gender === "male"
// HTML 5606 | JS-SCRIPT 7: 1960
    );
// HTML 5607 | JS-SCRIPT 7: 1961

// HTML 5608 | JS-SCRIPT 7: 1962
  const women =
// HTML 5609 | JS-SCRIPT 7: 1963
    safeTargets.filter(
// HTML 5610 | JS-SCRIPT 7: 1964
      target =>
// HTML 5611 | JS-SCRIPT 7: 1965
        target?.identity?.gender === "female"
// HTML 5612 | JS-SCRIPT 7: 1966
    );
// HTML 5613 | JS-SCRIPT 7: 1967

// HTML 5614 | JS-SCRIPT 7: 1968
  const unknown =
// HTML 5615 | JS-SCRIPT 7: 1969
    safeTargets.filter(
// HTML 5616 | JS-SCRIPT 7: 1970
      target =>
// HTML 5617 | JS-SCRIPT 7: 1971
        !["male", "female"].includes(
// HTML 5618 | JS-SCRIPT 7: 1972
          target?.identity?.gender
// HTML 5619 | JS-SCRIPT 7: 1973
        )
// HTML 5620 | JS-SCRIPT 7: 1974
    );
// HTML 5621 | JS-SCRIPT 7: 1975

// HTML 5622 | JS-SCRIPT 7: 1976
  const groupHtml = (
// HTML 5623 | JS-SCRIPT 7: 1977
    icon,
// HTML 5624 | JS-SCRIPT 7: 1978
    title,
// HTML 5625 | JS-SCRIPT 7: 1979
    list
// HTML 5626 | JS-SCRIPT 7: 1980
  ) => {
// HTML 5627 | JS-SCRIPT 7: 1981

// HTML 5628 | JS-SCRIPT 7: 1982
    if (!list.length) return "";
// HTML 5629 | JS-SCRIPT 7: 1983

// HTML 5630 | JS-SCRIPT 7: 1984
    return `
// HTML 5631 | JS-SCRIPT 7: 1985
      <div class="target-group-title">
// HTML 5632 | JS-SCRIPT 7: 1986
        <span>${icon}</span>
// HTML 5633 | JS-SCRIPT 7: 1987
        ${title}
// HTML 5634 | JS-SCRIPT 7: 1988
        <span class="text-slate-600">
// HTML 5635 | JS-SCRIPT 7: 1989
          ${list.length}
// HTML 5636 | JS-SCRIPT 7: 1990
        </span>
// HTML 5637 | JS-SCRIPT 7: 1991
      </div>
// HTML 5638 | JS-SCRIPT 7: 1992

// HTML 5639 | JS-SCRIPT 7: 1993
      <div class="space-y-3">
// HTML 5640 | JS-SCRIPT 7: 1994
        ${list
// HTML 5641 | JS-SCRIPT 7: 1995
          .map(target =>
// HTML 5642 | JS-SCRIPT 7: 1996
            renderProfileCard(
// HTML 5643 | JS-SCRIPT 7: 1997
              target,
// HTML 5644 | JS-SCRIPT 7: 1998
              selectedTarget
// HTML 5645 | JS-SCRIPT 7: 1999
            )
// HTML 5646 | JS-SCRIPT 7: 2000
          )
// HTML 5647 | JS-SCRIPT 7: 2001
          .join("")}
// HTML 5648 | JS-SCRIPT 7: 2002
      </div>
// HTML 5649 | JS-SCRIPT 7: 2003
    `;
// HTML 5650 | JS-SCRIPT 7: 2004
  };
// HTML 5651 | JS-SCRIPT 7: 2005

// HTML 5652 | JS-SCRIPT 7: 2006
  container.innerHTML = `
// HTML 5653 | JS-SCRIPT 7: 2007
    ${groupHtml("♂", "Hommes", men)}
// HTML 5654 | JS-SCRIPT 7: 2008

// HTML 5655 | JS-SCRIPT 7: 2009
    ${groupHtml("♀", "Femmes", women)}
// HTML 5656 | JS-SCRIPT 7: 2010

// HTML 5657 | JS-SCRIPT 7: 2011
    ${
// HTML 5658 | JS-SCRIPT 7: 2012
      unknown.length
// HTML 5659 | JS-SCRIPT 7: 2013
        ? groupHtml("•", "À CLASSER", unknown)
// HTML 5660 | JS-SCRIPT 7: 2014
        : ""
// HTML 5661 | JS-SCRIPT 7: 2015
    }
// HTML 5662 | JS-SCRIPT 7: 2016

// HTML 5663 | JS-SCRIPT 7: 2017
    ${
// HTML 5664 | JS-SCRIPT 7: 2018
      !safeTargets.length
// HTML 5665 | JS-SCRIPT 7: 2019
        ? `<div class="target-empty">
// HTML 5666 | JS-SCRIPT 7: 2020
             Aucun profil cible disponible.
// HTML 5667 | JS-SCRIPT 7: 2021
           </div>`
// HTML 5668 | JS-SCRIPT 7: 2022
        : ""
// HTML 5669 | JS-SCRIPT 7: 2023
    }
// HTML 5670 | JS-SCRIPT 7: 2024
  `;
// HTML 5671 | JS-SCRIPT 7: 2025

// HTML 5672 | JS-SCRIPT 7: 2026
  container
// HTML 5673 | JS-SCRIPT 7: 2027
    .querySelectorAll("[data-target-id]")
// HTML 5674 | JS-SCRIPT 7: 2028
    .forEach(button => {
// HTML 5675 | JS-SCRIPT 7: 2029

// HTML 5676 | JS-SCRIPT 7: 2030
      button.addEventListener(
// HTML 5677 | JS-SCRIPT 7: 2031
        "click",
// HTML 5678 | JS-SCRIPT 7: 2032
        () => {
// HTML 5679 | JS-SCRIPT 7: 2033
          selectTargetProfile(
// HTML 5680 | JS-SCRIPT 7: 2034
            button.dataset.targetId
// HTML 5681 | JS-SCRIPT 7: 2035
          );
// HTML 5682 | JS-SCRIPT 7: 2036
        }
// HTML 5683 | JS-SCRIPT 7: 2037
      );
// HTML 5684 | JS-SCRIPT 7: 2038

// HTML 5685 | JS-SCRIPT 7: 2039
    });
// HTML 5686 | JS-SCRIPT 7: 2040

// HTML 5687 | JS-SCRIPT 7: 2041
  updateTargetSelectionVisual(
// HTML 5688 | JS-SCRIPT 7: 2042
    selectedTarget
// HTML 5689 | JS-SCRIPT 7: 2043
  );
// HTML 5690 | JS-SCRIPT 7: 2044
}
// HTML 5691 | JS-SCRIPT 7: 2045

// HTML 5692 | JS-SCRIPT 7: 2046

// HTML 5693 | JS-SCRIPT 7: 2047
function refreshTargetCards() {
// HTML 5694 | JS-SCRIPT 7: 2048
  const selectedId =
// HTML 5695 | JS-SCRIPT 7: 2049
    String(
// HTML 5696 | JS-SCRIPT 7: 2050
      ASTROMATCH_SELECTED_TARGET?.profile_id || ""
// HTML 5697 | JS-SCRIPT 7: 2051
    );
// HTML 5698 | JS-SCRIPT 7: 2052

// HTML 5699 | JS-SCRIPT 7: 2053
  document
// HTML 5700 | JS-SCRIPT 7: 2054
    .querySelectorAll("[data-target-id]")
// HTML 5701 | JS-SCRIPT 7: 2055
    .forEach(button => {
// HTML 5702 | JS-SCRIPT 7: 2056

// HTML 5703 | JS-SCRIPT 7: 2057
      const isSelected =
// HTML 5704 | JS-SCRIPT 7: 2058
        String(button.dataset.targetId) ===
// HTML 5705 | JS-SCRIPT 7: 2059
        selectedId;
// HTML 5706 | JS-SCRIPT 7: 2060

// HTML 5707 | JS-SCRIPT 7: 2061
      button.setAttribute(
// HTML 5708 | JS-SCRIPT 7: 2062
        "aria-pressed",
// HTML 5709 | JS-SCRIPT 7: 2063
        isSelected ? "true" : "false"
// HTML 5710 | JS-SCRIPT 7: 2064
      );
// HTML 5711 | JS-SCRIPT 7: 2065

// HTML 5712 | JS-SCRIPT 7: 2066
      button.classList.toggle(
// HTML 5713 | JS-SCRIPT 7: 2067
        "selected",
// HTML 5714 | JS-SCRIPT 7: 2068
        isSelected
// HTML 5715 | JS-SCRIPT 7: 2069
      );
// HTML 5716 | JS-SCRIPT 7: 2070

// HTML 5717 | JS-SCRIPT 7: 2071
    });
// HTML 5718 | JS-SCRIPT 7: 2072
}
// HTML 5719 | JS-SCRIPT 7: 2073

// HTML 5720 | JS-SCRIPT 7: 2074
function selectTargetProfile(profileId) {
// HTML 5721 | JS-SCRIPT 7: 2075
  const target = ASTROMATCH_TARGET_PROFILES.find(
// HTML 5722 | JS-SCRIPT 7: 2076
    profile =>
// HTML 5723 | JS-SCRIPT 7: 2077
      String(profile?.profile_id) === String(profileId)
// HTML 5724 | JS-SCRIPT 7: 2078
  );
// HTML 5725 | JS-SCRIPT 7: 2079

// HTML 5726 | JS-SCRIPT 7: 2080
  if (!target) {
// HTML 5727 | JS-SCRIPT 7: 2081
    console.error(
// HTML 5728 | JS-SCRIPT 7: 2082
      "AstroMatch: profil cible introuvable",
// HTML 5729 | JS-SCRIPT 7: 2083
      profileId
// HTML 5730 | JS-SCRIPT 7: 2084
    );
// HTML 5731 | JS-SCRIPT 7: 2085
    return;
// HTML 5732 | JS-SCRIPT 7: 2086
  }
// HTML 5733 | JS-SCRIPT 7: 2087

// HTML 5734 | JS-SCRIPT 7: 2088
  ASTROMATCH_SELECTED_TARGET = target;
// HTML 5735 | JS-SCRIPT 7: 2089

// HTML 5736 | JS-SCRIPT 7: 2090
  /*
// HTML 5737 | JS-SCRIPT 7: 2091
   * Le contexte relationnel appartient au profil cible.
// HTML 5738 | JS-SCRIPT 7: 2092
   * Il pilote uniquement la présentation.
// HTML 5739 | JS-SCRIPT 7: 2093
   *
// HTML 5740 | JS-SCRIPT 7: 2094
   * Aucun impact sur le moteur astrologique/scoring.
// HTML 5741 | JS-SCRIPT 7: 2095
   */
// HTML 5742 | JS-SCRIPT 7: 2096
  normalizeRelationshipModeForTarget(target);
// HTML 5743 | JS-SCRIPT 7: 2097

// HTML 5744 | JS-SCRIPT 7: 2098
  renderTargetSelector(
// HTML 5745 | JS-SCRIPT 7: 2099
    ASTROMATCH_TARGET_PROFILES,
// HTML 5746 | JS-SCRIPT 7: 2100
    ASTROMATCH_SELECTED_TARGET
// HTML 5747 | JS-SCRIPT 7: 2101
  );
// HTML 5748 | JS-SCRIPT 7: 2102

// HTML 5749 | JS-SCRIPT 7: 2103
  setTargetCalculationState("loading");
// HTML 5750 | JS-SCRIPT 7: 2104

// HTML 5751 | JS-SCRIPT 7: 2105
  const targetElement =
// HTML 5752 | JS-SCRIPT 7: 2106
    document.getElementById("targetName");
// HTML 5753 | JS-SCRIPT 7: 2107

// HTML 5754 | JS-SCRIPT 7: 2108
  if (targetElement) {
// HTML 5755 | JS-SCRIPT 7: 2109
    targetElement.textContent =
// HTML 5756 | JS-SCRIPT 7: 2110
      target.identity?.first_name ||
// HTML 5757 | JS-SCRIPT 7: 2111
      "Profil cible";
// HTML 5758 | JS-SCRIPT 7: 2112
  }
// HTML 5759 | JS-SCRIPT 7: 2113

// HTML 5760 | JS-SCRIPT 7: 2114
  calculateSelectedTarget().catch(error => {
// HTML 5761 | JS-SCRIPT 7: 2115
    console.error(
// HTML 5762 | JS-SCRIPT 7: 2116
      "AstroMatch target calculation error:",
// HTML 5763 | JS-SCRIPT 7: 2117
      error
// HTML 5764 | JS-SCRIPT 7: 2118
    );
// HTML 5765 | JS-SCRIPT 7: 2119
    setTargetCalculationState("error");
// HTML 5766 | JS-SCRIPT 7: 2120

// HTML 5767 | JS-SCRIPT 7: 2121
    window.__astromatchStatus(
// HTML 5768 | JS-SCRIPT 7: 2122
      `Erreur calcul : ${error.message || error}`
// HTML 5769 | JS-SCRIPT 7: 2123
    );
// HTML 5770 | JS-SCRIPT 7: 2124
  });
// HTML 5771 | JS-SCRIPT 7: 2125
}
// HTML 5772 | JS-SCRIPT 7: 2126

// HTML 5773 | JS-SCRIPT 7: 2127

// HTML 5774 | JS-SCRIPT 7: 2128
function initializeTargetSelector(targets) {
// HTML 5775 | JS-SCRIPT 7: 2129
  ASTROMATCH_TARGET_PROFILES = Array.isArray(targets)
// HTML 5776 | JS-SCRIPT 7: 2130
    ? targets
// HTML 5777 | JS-SCRIPT 7: 2131
    : [];
// HTML 5778 | JS-SCRIPT 7: 2132

// HTML 5779 | JS-SCRIPT 7: 2133
  if (!ASTROMATCH_TARGET_PROFILES.length) {
// HTML 5780 | JS-SCRIPT 7: 2134
    throw new Error("AUCUN_PROFIL_CIBLE");
// HTML 5781 | JS-SCRIPT 7: 2135
  }
// HTML 5782 | JS-SCRIPT 7: 2136

// HTML 5783 | JS-SCRIPT 7: 2137
  ASTROMATCH_SELECTED_TARGET =
// HTML 5784 | JS-SCRIPT 7: 2138
    ASTROMATCH_TARGET_PROFILES[0];
// HTML 5785 | JS-SCRIPT 7: 2139

// HTML 5786 | JS-SCRIPT 7: 2140
  renderTargetSelector(
// HTML 5787 | JS-SCRIPT 7: 2141
    ASTROMATCH_TARGET_PROFILES,
// HTML 5788 | JS-SCRIPT 7: 2142
    ASTROMATCH_SELECTED_TARGET
// HTML 5789 | JS-SCRIPT 7: 2143
  );
// HTML 5790 | JS-SCRIPT 7: 2144

// HTML 5791 | JS-SCRIPT 7: 2145

// HTML 5792 | JS-SCRIPT 7: 2146
}
// HTML 5793 | JS-SCRIPT 7: 2147

// HTML 5794 | JS-SCRIPT 7: 2148

// HTML 5795 | JS-SCRIPT 7: 2149
async function calculateSelectedTarget() {
// HTML 5796 | JS-SCRIPT 7: 2150
  if (!ASTROMATCH_PRIMARY_PROFILE) {
// HTML 5797 | JS-SCRIPT 7: 2151
    throw new Error("PROFIL_PRINCIPAL_INTRouvable");
// HTML 5798 | JS-SCRIPT 7: 2152
  }
// HTML 5799 | JS-SCRIPT 7: 2153

// HTML 5800 | JS-SCRIPT 7: 2154
  if (!ASTROMATCH_SELECTED_TARGET) {
// HTML 5801 | JS-SCRIPT 7: 2155
    throw new Error("AUCUN_PROFIL_CIBLE");
// HTML 5802 | JS-SCRIPT 7: 2156
  }
// HTML 5803 | JS-SCRIPT 7: 2157

// HTML 5804 | JS-SCRIPT 7: 2158
  const primary =
// HTML 5805 | JS-SCRIPT 7: 2159
    ASTROMATCH_PRIMARY_PROFILE;
// HTML 5806 | JS-SCRIPT 7: 2160

// HTML 5807 | JS-SCRIPT 7: 2161
  const target =
// HTML 5808 | JS-SCRIPT 7: 2162
    ASTROMATCH_SELECTED_TARGET;
// HTML 5809 | JS-SCRIPT 7: 2163

// HTML 5810 | JS-SCRIPT 7: 2164
  const primaryInput =
// HTML 5811 | JS-SCRIPT 7: 2165
    profileToApiInput(primary);
// HTML 5812 | JS-SCRIPT 7: 2166

// HTML 5813 | JS-SCRIPT 7: 2167
  const targetInput =
// HTML 5814 | JS-SCRIPT 7: 2168
    profileToApiInput(target);
// HTML 5815 | JS-SCRIPT 7: 2169

// HTML 5816 | JS-SCRIPT 7: 2170
  const primaryName =
// HTML 5817 | JS-SCRIPT 7: 2171
    primary.identity?.first_name ||
// HTML 5818 | JS-SCRIPT 7: 2172
    "Profil principal";
// HTML 5819 | JS-SCRIPT 7: 2173

// HTML 5820 | JS-SCRIPT 7: 2174
  const targetName =
// HTML 5821 | JS-SCRIPT 7: 2175
    target.identity?.first_name ||
// HTML 5822 | JS-SCRIPT 7: 2176
    "Profil cible";
// HTML 5823 | JS-SCRIPT 7: 2177

// HTML 5824 | JS-SCRIPT 7: 2178
  const primaryElement =
// HTML 5825 | JS-SCRIPT 7: 2179
    document.getElementById("primaryName");
// HTML 5826 | JS-SCRIPT 7: 2180

// HTML 5827 | JS-SCRIPT 7: 2181
  const targetElement =
// HTML 5828 | JS-SCRIPT 7: 2182
    document.getElementById("targetName");
// HTML 5829 | JS-SCRIPT 7: 2183

// HTML 5830 | JS-SCRIPT 7: 2184
  if (primaryElement) {
// HTML 5831 | JS-SCRIPT 7: 2185
    primaryElement.textContent =
// HTML 5832 | JS-SCRIPT 7: 2186
      primaryName;
// HTML 5833 | JS-SCRIPT 7: 2187
  }
// HTML 5834 | JS-SCRIPT 7: 2188

// HTML 5835 | JS-SCRIPT 7: 2189
  if (targetElement) {
// HTML 5836 | JS-SCRIPT 7: 2190
    targetElement.textContent =
// HTML 5837 | JS-SCRIPT 7: 2191
      targetName;
// HTML 5838 | JS-SCRIPT 7: 2192
  }
// HTML 5839 | JS-SCRIPT 7: 2193

// HTML 5840 | JS-SCRIPT 7: 2194
  const token =
// HTML 5841 | JS-SCRIPT 7: 2195
    ++ASTROMATCH_CALCULATION_TOKEN;
// HTML 5842 | JS-SCRIPT 7: 2196

// HTML 5843 | JS-SCRIPT 7: 2197
  /*
// HTML 5844 | JS-SCRIPT 7: 2198
   * Bridge vers le Relationship View Engine.
// HTML 5845 | JS-SCRIPT 7: 2199
   * Le script module ne partage pas directement ses variables
// HTML 5846 | JS-SCRIPT 7: 2200
   * avec le script classique.
// HTML 5847 | JS-SCRIPT 7: 2201
   */
// HTML 5848 | JS-SCRIPT 7: 2202
  if (typeof window !== "undefined") {
// HTML 5849 | JS-SCRIPT 7: 2203
    window.__astromatchSelectedTargetId =
// HTML 5850 | JS-SCRIPT 7: 2204
      String(target?.profile_id || "");
// HTML 5851 | JS-SCRIPT 7: 2205
  }
// HTML 5852 | JS-SCRIPT 7: 2206

// HTML 5853 | JS-SCRIPT 7: 2207
  setTargetCalculationState("loading");
// HTML 5854 | JS-SCRIPT 7: 2208

// HTML 5855 | JS-SCRIPT 7: 2209
  window.__astromatchStatus(
// HTML 5856 | JS-SCRIPT 7: 2210
    `Calcul réel : ${primaryName} × ${targetName}…`
// HTML 5857 | JS-SCRIPT 7: 2211
  );
// HTML 5858 | JS-SCRIPT 7: 2212

// HTML 5859 | JS-SCRIPT 7: 2213
  const response = await fetch(API_URL, {
// HTML 5860 | JS-SCRIPT 7: 2214
    method: "POST",
// HTML 5861 | JS-SCRIPT 7: 2215
    headers: {
// HTML 5862 | JS-SCRIPT 7: 2216
      "Content-Type": "application/json"
// HTML 5863 | JS-SCRIPT 7: 2217
    },
// HTML 5864 | JS-SCRIPT 7: 2218
    body: JSON.stringify({
// HTML 5865 | JS-SCRIPT 7: 2219
      primary: primaryInput,
// HTML 5866 | JS-SCRIPT 7: 2220
      target: targetInput
// HTML 5867 | JS-SCRIPT 7: 2221
    })
// HTML 5868 | JS-SCRIPT 7: 2222
  });
// HTML 5869 | JS-SCRIPT 7: 2223

// HTML 5870 | JS-SCRIPT 7: 2224
  if (!response.ok) {
// HTML 5871 | JS-SCRIPT 7: 2225
    throw new Error(
// HTML 5872 | JS-SCRIPT 7: 2226
      `API HTTP ${response.status}`
// HTML 5873 | JS-SCRIPT 7: 2227
    );
// HTML 5874 | JS-SCRIPT 7: 2228
  }
// HTML 5875 | JS-SCRIPT 7: 2229

// HTML 5876 | JS-SCRIPT 7: 2230
  const payload =
// HTML 5877 | JS-SCRIPT 7: 2231
    await response.json();
// HTML 5878 | JS-SCRIPT 7: 2232

// HTML 5879 | JS-SCRIPT 7: 2233
  if (!payload.ok) {
// HTML 5880 | JS-SCRIPT 7: 2234
    throw new Error(
// HTML 5881 | JS-SCRIPT 7: 2235
      payload.error ||
// HTML 5882 | JS-SCRIPT 7: 2236
      "Erreur API inconnue"
// HTML 5883 | JS-SCRIPT 7: 2237
    );
// HTML 5884 | JS-SCRIPT 7: 2238
  }
// HTML 5885 | JS-SCRIPT 7: 2239

// HTML 5886 | JS-SCRIPT 7: 2240
  const result =
// HTML 5887 | JS-SCRIPT 7: 2241
    payload.result;
// HTML 5888 | JS-SCRIPT 7: 2242

// HTML 5889 | JS-SCRIPT 7: 2243
  if (!result || !result.global) {
// HTML 5890 | JS-SCRIPT 7: 2244
    throw new Error(
// HTML 5891 | JS-SCRIPT 7: 2245
      "RESULTAT_MATCH_INVALIDE"
// HTML 5892 | JS-SCRIPT 7: 2246
    );
// HTML 5893 | JS-SCRIPT 7: 2247
  }
// HTML 5894 | JS-SCRIPT 7: 2248

// HTML 5895 | JS-SCRIPT 7: 2249
  /*
// HTML 5896 | JS-SCRIPT 7: 2250
   * Une réponse ancienne ne doit jamais écraser
// HTML 5897 | JS-SCRIPT 7: 2251
   * le résultat du profil sélectionné ensuite.
// HTML 5898 | JS-SCRIPT 7: 2252
   */
// HTML 5899 | JS-SCRIPT 7: 2253
  if (token !== ASTROMATCH_CALCULATION_TOKEN) {
// HTML 5900 | JS-SCRIPT 7: 2254
    return null;
// HTML 5901 | JS-SCRIPT 7: 2255
  }
// HTML 5902 | JS-SCRIPT 7: 2256

// HTML 5903 | JS-SCRIPT 7: 2257
  const global =
// HTML 5904 | JS-SCRIPT 7: 2258
    result.global;
// HTML 5905 | JS-SCRIPT 7: 2259

// HTML 5906 | JS-SCRIPT 7: 2260
  window.__astromatchStatus(
// HTML 5907 | JS-SCRIPT 7: 2261
    `Calcul réel terminé — ${Math.round(Number(global.score) || 0)}/100`
// HTML 5908 | JS-SCRIPT 7: 2262
  );
// HTML 5909 | JS-SCRIPT 7: 2263

// HTML 5910 | JS-SCRIPT 7: 2264
  const globalScore =
// HTML 5911 | JS-SCRIPT 7: 2265
    document.getElementById("globalScore");
// HTML 5912 | JS-SCRIPT 7: 2266

// HTML 5913 | JS-SCRIPT 7: 2267
  if (globalScore) {
// HTML 5914 | JS-SCRIPT 7: 2268
    globalScore.textContent =
// HTML 5915 | JS-SCRIPT 7: 2269
      Math.round(Number(global.score) || 0);
// HTML 5916 | JS-SCRIPT 7: 2270
  }
// HTML 5917 | JS-SCRIPT 7: 2271

// HTML 5918 | JS-SCRIPT 7: 2272
  const globalLabel =
// HTML 5919 | JS-SCRIPT 7: 2273
    document.getElementById("globalLabel");
// HTML 5920 | JS-SCRIPT 7: 2274

// HTML 5921 | JS-SCRIPT 7: 2275
  if (globalLabel) {
// HTML 5922 | JS-SCRIPT 7: 2276
    globalLabel.textContent =
// HTML 5923 | JS-SCRIPT 7: 2277
      global.label || "";
// HTML 5924 | JS-SCRIPT 7: 2278
  }
// HTML 5925 | JS-SCRIPT 7: 2279

// HTML 5926 | JS-SCRIPT 7: 2280
  const summary =
// HTML 5927 | JS-SCRIPT 7: 2281
    document.getElementById("summary");
// HTML 5928 | JS-SCRIPT 7: 2282

// HTML 5929 | JS-SCRIPT 7: 2283
  if (summary) {
// HTML 5930 | JS-SCRIPT 7: 2284
    summary.textContent =
// HTML 5931 | JS-SCRIPT 7: 2285
      result.summary ||
// HTML 5932 | JS-SCRIPT 7: 2286
      "Compatibilité calculée par le moteur AstroMatch.";
// HTML 5933 | JS-SCRIPT 7: 2287
  }
// HTML 5934 | JS-SCRIPT 7: 2288

// HTML 5935 | JS-SCRIPT 7: 2289
  if (
// HTML 5936 | JS-SCRIPT 7: 2290
    result.profiles?.primary?.name &&
// HTML 5937 | JS-SCRIPT 7: 2291
    primaryElement
// HTML 5938 | JS-SCRIPT 7: 2292
  ) {
// HTML 5939 | JS-SCRIPT 7: 2293
    primaryElement.textContent =
// HTML 5940 | JS-SCRIPT 7: 2294
      result.profiles.primary.name;
// HTML 5941 | JS-SCRIPT 7: 2295
  }
// HTML 5942 | JS-SCRIPT 7: 2296

// HTML 5943 | JS-SCRIPT 7: 2297
  if (
// HTML 5944 | JS-SCRIPT 7: 2298
    result.profiles?.target?.name &&
// HTML 5945 | JS-SCRIPT 7: 2299
    targetElement
// HTML 5946 | JS-SCRIPT 7: 2300
  ) {
// HTML 5947 | JS-SCRIPT 7: 2301
    targetElement.textContent =
// HTML 5948 | JS-SCRIPT 7: 2302
      result.profiles.target.name;
// HTML 5949 | JS-SCRIPT 7: 2303
  }
// HTML 5950 | JS-SCRIPT 7: 2304

// HTML 5951 | JS-SCRIPT 7: 2305
  window.__astromatchLastResult = result;
// HTML 5952 | JS-SCRIPT 7: 2306
  renderDomains(result.domains);
// HTML 5953 | JS-SCRIPT 7: 2307

// HTML 5954 | JS-SCRIPT 7: 2308
  if (
// HTML 5955 | JS-SCRIPT 7: 2309
    typeof window.setAstroMatchRelationshipResult ===
// HTML 5956 | JS-SCRIPT 7: 2310
    "function"
// HTML 5957 | JS-SCRIPT 7: 2311
  ) {
// HTML 5958 | JS-SCRIPT 7: 2312
    window.setAstroMatchRelationshipResult(result);
// HTML 5959 | JS-SCRIPT 7: 2313
  }
// HTML 5960 | JS-SCRIPT 7: 2314

// HTML 5961 | JS-SCRIPT 7: 2315

// HTML 5962 | JS-SCRIPT 7: 2316
  renderList(
// HTML 5963 | JS-SCRIPT 7: 2317
    "highlights",
// HTML 5964 | JS-SCRIPT 7: 2318
    result.highlights,
// HTML 5965 | JS-SCRIPT 7: 2319
    "Aucun point marquant."
// HTML 5966 | JS-SCRIPT 7: 2320
  );
// HTML 5967 | JS-SCRIPT 7: 2321

// HTML 5968 | JS-SCRIPT 7: 2322
  renderList(
// HTML 5969 | JS-SCRIPT 7: 2323
    "warnings",
// HTML 5970 | JS-SCRIPT 7: 2324
    result.warnings,
// HTML 5971 | JS-SCRIPT 7: 2325
    "Aucun avertissement."
// HTML 5972 | JS-SCRIPT 7: 2326
  );
// HTML 5973 | JS-SCRIPT 7: 2327

// HTML 5974 | JS-SCRIPT 7: 2328
  renderList(
// HTML 5975 | JS-SCRIPT 7: 2329
    "topStrengths",
// HTML 5976 | JS-SCRIPT 7: 2330
    result.top_strengths,
// HTML 5977 | JS-SCRIPT 7: 2331
    "Aucun point fort majeur."
// HTML 5978 | JS-SCRIPT 7: 2332
  );
// HTML 5979 | JS-SCRIPT 7: 2333

// HTML 5980 | JS-SCRIPT 7: 2334
  renderList(
// HTML 5981 | JS-SCRIPT 7: 2335
    "topTensions",
// HTML 5982 | JS-SCRIPT 7: 2336
    result.top_tensions,
// HTML 5983 | JS-SCRIPT 7: 2337
    "Aucune tension majeure."
// HTML 5984 | JS-SCRIPT 7: 2338
  );
// HTML 5985 | JS-SCRIPT 7: 2339

// HTML 5986 | JS-SCRIPT 7: 2340
  renderReliability(
// HTML 5987 | JS-SCRIPT 7: 2341
    result.reliability
// HTML 5988 | JS-SCRIPT 7: 2342
  );
// HTML 5989 | JS-SCRIPT 7: 2343

// HTML 5990 | JS-SCRIPT 7: 2344
  setTargetCalculationState("done");
// HTML 5991 | JS-SCRIPT 7: 2345
  updateTargetSelectionVisual(target);
// HTML 5992 | JS-SCRIPT 7: 2346

// HTML 5993 | JS-SCRIPT 7: 2347
  console.log(
// HTML 5994 | JS-SCRIPT 7: 2348
    "ASTROMATCH REAL PROFILE",
// HTML 5995 | JS-SCRIPT 7: 2349
    {
// HTML 5996 | JS-SCRIPT 7: 2350
      primary,
// HTML 5997 | JS-SCRIPT 7: 2351
      target
// HTML 5998 | JS-SCRIPT 7: 2352
    }
// HTML 5999 | JS-SCRIPT 7: 2353
  );
// HTML 6000 | JS-SCRIPT 7: 2354

// HTML 6001 | JS-SCRIPT 7: 2355
  console.log(
// HTML 6002 | JS-SCRIPT 7: 2356
    "ASTROMATCH API RESULT",
// HTML 6003 | JS-SCRIPT 7: 2357
    result
// HTML 6004 | JS-SCRIPT 7: 2358
  );
// HTML 6005 | JS-SCRIPT 7: 2359

// HTML 6006 | JS-SCRIPT 7: 2360
  return result;
// HTML 6007 | JS-SCRIPT 7: 2361
}
// HTML 6008 | JS-SCRIPT 7: 2362

// HTML 6009 | JS-SCRIPT 7: 2363

// HTML 6010 | JS-SCRIPT 7: 2364

// HTML 6011 | JS-SCRIPT 7: 2365

// HTML 6012 | JS-SCRIPT 7: 2366
const openComparisonButton =
// HTML 6013 | JS-SCRIPT 7: 2367
  document.getElementById(
// HTML 6014 | JS-SCRIPT 7: 2368
    "openTargetComparison"
// HTML 6015 | JS-SCRIPT 7: 2369
  );
// HTML 6016 | JS-SCRIPT 7: 2370

// HTML 6017 | JS-SCRIPT 7: 2371
if (openComparisonButton) {
// HTML 6018 | JS-SCRIPT 7: 2372
  openComparisonButton.addEventListener(
// HTML 6019 | JS-SCRIPT 7: 2373
    "click",
// HTML 6020 | JS-SCRIPT 7: 2374
    openTargetComparison
// HTML 6021 | JS-SCRIPT 7: 2375
  );
// HTML 6022 | JS-SCRIPT 7: 2376
}
// HTML 6023 | JS-SCRIPT 7: 2377

// HTML 6024 | JS-SCRIPT 7: 2378

// HTML 6025 | JS-SCRIPT 7: 2379
const closeComparisonButton =
// HTML 6026 | JS-SCRIPT 7: 2380
  document.getElementById(
// HTML 6027 | JS-SCRIPT 7: 2381
    "closeTargetComparison"
// HTML 6028 | JS-SCRIPT 7: 2382
  );
// HTML 6029 | JS-SCRIPT 7: 2383

// HTML 6030 | JS-SCRIPT 7: 2384
if (closeComparisonButton) {
// HTML 6031 | JS-SCRIPT 7: 2385
  closeComparisonButton.addEventListener(
// HTML 6032 | JS-SCRIPT 7: 2386
    "click",
// HTML 6033 | JS-SCRIPT 7: 2387
    closeTargetComparison
// HTML 6034 | JS-SCRIPT 7: 2388
  );
// HTML 6035 | JS-SCRIPT 7: 2389
}
// HTML 6036 | JS-SCRIPT 7: 2390

// HTML 6037 | JS-SCRIPT 7: 2391
window.selectTargetProfile =
// HTML 6038 | JS-SCRIPT 7: 2392
  selectTargetProfile;
// HTML 6039 | JS-SCRIPT 7: 2393

// HTML 6040 | JS-SCRIPT 7: 2394
/* =========================================================
// HTML 6041 | JS-SCRIPT 7: 2395
   MATCH
// HTML 6042 | JS-SCRIPT 7: 2396
   ========================================================= */
// HTML 6043 | JS-SCRIPT 7: 2397

// HTML 6044 | JS-SCRIPT 7: 2398
function renderPrimaryProfileCard(profile) {
// HTML 6045 | JS-SCRIPT 7: 2399
  if (!profile) return;
// HTML 6046 | JS-SCRIPT 7: 2400

// HTML 6047 | JS-SCRIPT 7: 2401
  const name =
// HTML 6048 | JS-SCRIPT 7: 2402
    profileFullName(profile);
// HTML 6049 | JS-SCRIPT 7: 2403

// HTML 6050 | JS-SCRIPT 7: 2404
  const age =
// HTML 6051 | JS-SCRIPT 7: 2405
    calculateAge(profile);
// HTML 6052 | JS-SCRIPT 7: 2406

// HTML 6053 | JS-SCRIPT 7: 2407
  const zodiac =
// HTML 6054 | JS-SCRIPT 7: 2408
    zodiacFromDate(
// HTML 6055 | JS-SCRIPT 7: 2409
      profile?.birth_data?.date
// HTML 6056 | JS-SCRIPT 7: 2410
    );
// HTML 6057 | JS-SCRIPT 7: 2411

// HTML 6058 | JS-SCRIPT 7: 2412
  const asc =
// HTML 6059 | JS-SCRIPT 7: 2413
    calculateDisplayAscendant(profile);
// HTML 6060 | JS-SCRIPT 7: 2414

// HTML 6061 | JS-SCRIPT 7: 2415
  const gender =
// HTML 6062 | JS-SCRIPT 7: 2416
    genderLabel(profile);
// HTML 6063 | JS-SCRIPT 7: 2417

// HTML 6064 | JS-SCRIPT 7: 2418
  const element =
// HTML 6065 | JS-SCRIPT 7: 2419
    zodiac?.element || "";
// HTML 6066 | JS-SCRIPT 7: 2420

// HTML 6067 | JS-SCRIPT 7: 2421
  const birthLine =
// HTML 6068 | JS-SCRIPT 7: 2422
    `${age === null ? "" : age + " ans · "}` +
// HTML 6069 | JS-SCRIPT 7: 2423
    `${formatBirthDate(profile)} · ` +
// HTML 6070 | JS-SCRIPT 7: 2424
    `${formatBirthTime(profile)} · ` +
// HTML 6071 | JS-SCRIPT 7: 2425
    `${profile?.birth_data?.place?.raw_input || "Lieu inconnu"}`;
// HTML 6072 | JS-SCRIPT 7: 2426

// HTML 6073 | JS-SCRIPT 7: 2427
  const astroLine =
// HTML 6074 | JS-SCRIPT 7: 2428
    `${zodiac?.symbol || "✦"} ` +
// HTML 6075 | JS-SCRIPT 7: 2429
    `${zodiac?.name || "Signe inconnu"}` +
// HTML 6076 | JS-SCRIPT 7: 2430
    `${asc ? ` · ↑ ${asc.symbol} ${asc.name}` : ""}`;
// HTML 6077 | JS-SCRIPT 7: 2431

// HTML 6078 | JS-SCRIPT 7: 2432
  const nameEl =
// HTML 6079 | JS-SCRIPT 7: 2433
    document.getElementById("primaryName");
// HTML 6080 | JS-SCRIPT 7: 2434

// HTML 6081 | JS-SCRIPT 7: 2435
  const genderEl =
// HTML 6082 | JS-SCRIPT 7: 2436
    document.getElementById("primaryGender");
// HTML 6083 | JS-SCRIPT 7: 2437

// HTML 6084 | JS-SCRIPT 7: 2438
  const birthEl =
// HTML 6085 | JS-SCRIPT 7: 2439
    document.getElementById("primaryBirthLine");
// HTML 6086 | JS-SCRIPT 7: 2440

// HTML 6087 | JS-SCRIPT 7: 2441
  const astroEl =
// HTML 6088 | JS-SCRIPT 7: 2442
    document.getElementById("primaryAstroLine");
// HTML 6089 | JS-SCRIPT 7: 2443

// HTML 6090 | JS-SCRIPT 7: 2444
  const elementEl =
// HTML 6091 | JS-SCRIPT 7: 2445
    document.getElementById("primaryElement");
// HTML 6092 | JS-SCRIPT 7: 2446

// HTML 6093 | JS-SCRIPT 7: 2447
  const symbolEl =
// HTML 6094 | JS-SCRIPT 7: 2448
    document.getElementById("primaryZodiacSymbol");
// HTML 6095 | JS-SCRIPT 7: 2449

// HTML 6096 | JS-SCRIPT 7: 2450
  if (nameEl) {
// HTML 6097 | JS-SCRIPT 7: 2451
    nameEl.textContent = name;
// HTML 6098 | JS-SCRIPT 7: 2452
  }
// HTML 6099 | JS-SCRIPT 7: 2453

// HTML 6100 | JS-SCRIPT 7: 2454
  if (genderEl) {
// HTML 6101 | JS-SCRIPT 7: 2455
    genderEl.textContent = gender;
// HTML 6102 | JS-SCRIPT 7: 2456
  }
// HTML 6103 | JS-SCRIPT 7: 2457

// HTML 6104 | JS-SCRIPT 7: 2458
  if (birthEl) {
// HTML 6105 | JS-SCRIPT 7: 2459
    birthEl.textContent = birthLine;
// HTML 6106 | JS-SCRIPT 7: 2460
  }
// HTML 6107 | JS-SCRIPT 7: 2461

// HTML 6108 | JS-SCRIPT 7: 2462
  if (astroEl) {
// HTML 6109 | JS-SCRIPT 7: 2463
    astroEl.textContent = astroLine;
// HTML 6110 | JS-SCRIPT 7: 2464
  }
// HTML 6111 | JS-SCRIPT 7: 2465

// HTML 6112 | JS-SCRIPT 7: 2466
  if (elementEl) {
// HTML 6113 | JS-SCRIPT 7: 2467
    elementEl.textContent = element;
// HTML 6114 | JS-SCRIPT 7: 2468
  }
// HTML 6115 | JS-SCRIPT 7: 2469

// HTML 6116 | JS-SCRIPT 7: 2470
  if (symbolEl) {
// HTML 6117 | JS-SCRIPT 7: 2471
    symbolEl.textContent =
// HTML 6118 | JS-SCRIPT 7: 2472
      zodiac?.symbol || "✦";
// HTML 6119 | JS-SCRIPT 7: 2473
  }
// HTML 6120 | JS-SCRIPT 7: 2474
}
// HTML 6121 | JS-SCRIPT 7: 2475

// HTML 6122 | JS-SCRIPT 7: 2476

// HTML 6123 | JS-SCRIPT 7: 2477

// HTML 6124 | JS-SCRIPT 7: 2478
// ============================================================
// HTML 6125 | JS-SCRIPT 7: 2479
// ASTROMATCH COMPARATOR V2.1.2
// HTML 6126 | JS-SCRIPT 7: 2480
// Sélecteur de deux profils réels
// HTML 6127 | JS-SCRIPT 7: 2481
// Comparaison A ↔ B via le pipeline API existant
// HTML 6128 | JS-SCRIPT 7: 2482
// Détails des 7 domaines issus du moteur
// HTML 6129 | JS-SCRIPT 7: 2483
// ============================================================
// HTML 6130 | JS-SCRIPT 7: 2484

// HTML 6131 | JS-SCRIPT 7: 2485
function astromatchV212Escape(value) {
// HTML 6132 | JS-SCRIPT 7: 2486
  return String(value ?? "")
// HTML 6133 | JS-SCRIPT 7: 2487
    .replace(/&/g, "&amp;")
// HTML 6134 | JS-SCRIPT 7: 2488
    .replace(/</g, "&lt;")
// HTML 6135 | JS-SCRIPT 7: 2489
    .replace(/>/g, "&gt;")
// HTML 6136 | JS-SCRIPT 7: 2490
    .replace(/"/g, "&quot;")
// HTML 6137 | JS-SCRIPT 7: 2491
    .replace(/'/g, "&#039;");
// HTML 6138 | JS-SCRIPT 7: 2492
}
// HTML 6139 | JS-SCRIPT 7: 2493

// HTML 6140 | JS-SCRIPT 7: 2494
function astromatchV212Profiles() {
// HTML 6141 | JS-SCRIPT 7: 2495
  try {
// HTML 6142 | JS-SCRIPT 7: 2496
    const raw =
// HTML 6143 | JS-SCRIPT 7: 2497
      window.localStorage.getItem("astromatch:profiles");
// HTML 6144 | JS-SCRIPT 7: 2498

// HTML 6145 | JS-SCRIPT 7: 2499
    if (!raw) return [];
// HTML 6146 | JS-SCRIPT 7: 2500

// HTML 6147 | JS-SCRIPT 7: 2501
    const profiles = JSON.parse(raw);
// HTML 6148 | JS-SCRIPT 7: 2502

// HTML 6149 | JS-SCRIPT 7: 2503
    return Array.isArray(profiles)
// HTML 6150 | JS-SCRIPT 7: 2504
      ? profiles.filter(Boolean)
// HTML 6151 | JS-SCRIPT 7: 2505
      : [];
// HTML 6152 | JS-SCRIPT 7: 2506
  } catch (error) {
// HTML 6153 | JS-SCRIPT 7: 2507
    console.warn(
// HTML 6154 | JS-SCRIPT 7: 2508
      "AstroMatch V2.1.2 — lecture profils :",
// HTML 6155 | JS-SCRIPT 7: 2509
      error
// HTML 6156 | JS-SCRIPT 7: 2510
    );
// HTML 6157 | JS-SCRIPT 7: 2511
    return [];
// HTML 6158 | JS-SCRIPT 7: 2512
  }
// HTML 6159 | JS-SCRIPT 7: 2513
}
// HTML 6160 | JS-SCRIPT 7: 2514

// HTML 6161 | JS-SCRIPT 7: 2515
function astromatchV212ProfileId(profile) {
// HTML 6162 | JS-SCRIPT 7: 2516
  return String(
// HTML 6163 | JS-SCRIPT 7: 2517
    profile?.profile_id ||
// HTML 6164 | JS-SCRIPT 7: 2518
    profile?.id ||
// HTML 6165 | JS-SCRIPT 7: 2519
    ""
// HTML 6166 | JS-SCRIPT 7: 2520
  );
// HTML 6167 | JS-SCRIPT 7: 2521
}
// HTML 6168 | JS-SCRIPT 7: 2522

// HTML 6169 | JS-SCRIPT 7: 2523
function astromatchV212ProfileName(profile, fallback) {
// HTML 6170 | JS-SCRIPT 7: 2524
  if (!profile) return fallback || "Profil";
// HTML 6171 | JS-SCRIPT 7: 2525

// HTML 6172 | JS-SCRIPT 7: 2526
  const first =
// HTML 6173 | JS-SCRIPT 7: 2527
    profile.first_name ||
// HTML 6174 | JS-SCRIPT 7: 2528
    profile.firstName ||
// HTML 6175 | JS-SCRIPT 7: 2529
    profile.identity?.first_name ||
// HTML 6176 | JS-SCRIPT 7: 2530
    profile.identity?.firstName ||
// HTML 6177 | JS-SCRIPT 7: 2531
    "";
// HTML 6178 | JS-SCRIPT 7: 2532

// HTML 6179 | JS-SCRIPT 7: 2533
  const last =
// HTML 6180 | JS-SCRIPT 7: 2534
    profile.last_name ||
// HTML 6181 | JS-SCRIPT 7: 2535
    profile.lastName ||
// HTML 6182 | JS-SCRIPT 7: 2536
    profile.identity?.last_name ||
// HTML 6183 | JS-SCRIPT 7: 2537
    profile.identity?.lastName ||
// HTML 6184 | JS-SCRIPT 7: 2538
    "";
// HTML 6185 | JS-SCRIPT 7: 2539

// HTML 6186 | JS-SCRIPT 7: 2540
  const name =
// HTML 6187 | JS-SCRIPT 7: 2541
    `${first} ${last}`.trim();
// HTML 6188 | JS-SCRIPT 7: 2542

// HTML 6189 | JS-SCRIPT 7: 2543
  return name || fallback || "Profil";
// HTML 6190 | JS-SCRIPT 7: 2544
}
// HTML 6191 | JS-SCRIPT 7: 2545

// HTML 6192 | JS-SCRIPT 7: 2546
function astromatchV212DomainMeta(key) {
// HTML 6193 | JS-SCRIPT 7: 2547
  const meta =
// HTML 6194 | JS-SCRIPT 7: 2548
    typeof DOMAIN_META !== "undefined"
// HTML 6195 | JS-SCRIPT 7: 2549
      ? DOMAIN_META?.[key]
// HTML 6196 | JS-SCRIPT 7: 2550
      : null;
// HTML 6197 | JS-SCRIPT 7: 2551

// HTML 6198 | JS-SCRIPT 7: 2552
  if (meta) {
// HTML 6199 | JS-SCRIPT 7: 2553
    return {
// HTML 6200 | JS-SCRIPT 7: 2554
      icon: meta.icon || "✨",
// HTML 6201 | JS-SCRIPT 7: 2555
      label: meta.label || key
// HTML 6202 | JS-SCRIPT 7: 2556
    };
// HTML 6203 | JS-SCRIPT 7: 2557
  }
// HTML 6204 | JS-SCRIPT 7: 2558

// HTML 6205 | JS-SCRIPT 7: 2559
  const fallback = {
// HTML 6206 | JS-SCRIPT 7: 2560
    love: ["❤️", "Amour"],
// HTML 6207 | JS-SCRIPT 7: 2561
    emotions: ["🌙", "Émotions"],
// HTML 6208 | JS-SCRIPT 7: 2562
    communication: ["🗣️", "Communication"],
// HTML 6209 | JS-SCRIPT 7: 2563
    passion: ["🔥", "Passion"],
// HTML 6210 | JS-SCRIPT 7: 2564
    daily: ["🏠", "Quotidien"],
// HTML 6211 | JS-SCRIPT 7: 2565
    projects: ["🚀", "Projets"]
// HTML 6212 | JS-SCRIPT 7: 2566
  };
// HTML 6213 | JS-SCRIPT 7: 2567

// HTML 6214 | JS-SCRIPT 7: 2568
  return fallback[key]
// HTML 6215 | JS-SCRIPT 7: 2569
    ? {
// HTML 6216 | JS-SCRIPT 7: 2570
        icon: fallback[key][0],
// HTML 6217 | JS-SCRIPT 7: 2571
        label: fallback[key][1]
// HTML 6218 | JS-SCRIPT 7: 2572
      }
// HTML 6219 | JS-SCRIPT 7: 2573
    : {
// HTML 6220 | JS-SCRIPT 7: 2574
        icon: "✨",
// HTML 6221 | JS-SCRIPT 7: 2575
        label: key
// HTML 6222 | JS-SCRIPT 7: 2576
      };
// HTML 6223 | JS-SCRIPT 7: 2577
}
// HTML 6224 | JS-SCRIPT 7: 2578

// HTML 6225 | JS-SCRIPT 7: 2579
function astromatchV212BuildApiProfile(profile) {
// HTML 6226 | JS-SCRIPT 7: 2580
  if (!profile) return null;
// HTML 6227 | JS-SCRIPT 7: 2581

// HTML 6228 | JS-SCRIPT 7: 2582
  const birth =
// HTML 6229 | JS-SCRIPT 7: 2583
    profile.birth_data ||
// HTML 6230 | JS-SCRIPT 7: 2584
    profile.birthData ||
// HTML 6231 | JS-SCRIPT 7: 2585
    {};
// HTML 6232 | JS-SCRIPT 7: 2586

// HTML 6233 | JS-SCRIPT 7: 2587
  const place =
// HTML 6234 | JS-SCRIPT 7: 2588
    birth.place ||
// HTML 6235 | JS-SCRIPT 7: 2589
    profile.place ||
// HTML 6236 | JS-SCRIPT 7: 2590
    {};
// HTML 6237 | JS-SCRIPT 7: 2591

// HTML 6238 | JS-SCRIPT 7: 2592
  const resolved =
// HTML 6239 | JS-SCRIPT 7: 2593
    place.resolved ||
// HTML 6240 | JS-SCRIPT 7: 2594
    {};
// HTML 6241 | JS-SCRIPT 7: 2595

// HTML 6242 | JS-SCRIPT 7: 2596
  const date =
// HTML 6243 | JS-SCRIPT 7: 2597
    birth.date ||
// HTML 6244 | JS-SCRIPT 7: 2598
    profile.date ||
// HTML 6245 | JS-SCRIPT 7: 2599
    "";
// HTML 6246 | JS-SCRIPT 7: 2600

// HTML 6247 | JS-SCRIPT 7: 2601
  const rawTime =
// HTML 6248 | JS-SCRIPT 7: 2602
    birth.time ??
// HTML 6249 | JS-SCRIPT 7: 2603
    profile.time ??
// HTML 6250 | JS-SCRIPT 7: 2604
    "";
// HTML 6251 | JS-SCRIPT 7: 2605

// HTML 6252 | JS-SCRIPT 7: 2606
  const time =
// HTML 6253 | JS-SCRIPT 7: 2607
    typeof rawTime === "object"
// HTML 6254 | JS-SCRIPT 7: 2608
      ? (
// HTML 6255 | JS-SCRIPT 7: 2609
          rawTime.value ??
// HTML 6256 | JS-SCRIPT 7: 2610
          rawTime.time ??
// HTML 6257 | JS-SCRIPT 7: 2611
          ""
// HTML 6258 | JS-SCRIPT 7: 2612
        )
// HTML 6259 | JS-SCRIPT 7: 2613
      : rawTime;
// HTML 6260 | JS-SCRIPT 7: 2614

// HTML 6261 | JS-SCRIPT 7: 2615
  return {
// HTML 6262 | JS-SCRIPT 7: 2616
    role: profile.role || "target",
// HTML 6263 | JS-SCRIPT 7: 2617

// HTML 6264 | JS-SCRIPT 7: 2618
    first_name:
// HTML 6265 | JS-SCRIPT 7: 2619
      profile.first_name ||
// HTML 6266 | JS-SCRIPT 7: 2620
      profile.firstName ||
// HTML 6267 | JS-SCRIPT 7: 2621
      profile.identity?.first_name ||
// HTML 6268 | JS-SCRIPT 7: 2622
      "",
// HTML 6269 | JS-SCRIPT 7: 2623

// HTML 6270 | JS-SCRIPT 7: 2624
    last_name:
// HTML 6271 | JS-SCRIPT 7: 2625
      profile.last_name ||
// HTML 6272 | JS-SCRIPT 7: 2626
      profile.lastName ||
// HTML 6273 | JS-SCRIPT 7: 2627
      profile.identity?.last_name ||
// HTML 6274 | JS-SCRIPT 7: 2628
      "",
// HTML 6275 | JS-SCRIPT 7: 2629

// HTML 6276 | JS-SCRIPT 7: 2630
    date,
// HTML 6277 | JS-SCRIPT 7: 2631

// HTML 6278 | JS-SCRIPT 7: 2632
    time,
// HTML 6279 | JS-SCRIPT 7: 2633

// HTML 6280 | JS-SCRIPT 7: 2634
    time_known:
// HTML 6281 | JS-SCRIPT 7: 2635
      birth.time_known ??
// HTML 6282 | JS-SCRIPT 7: 2636
      (
// HTML 6283 | JS-SCRIPT 7: 2637
        typeof rawTime === "object"
// HTML 6284 | JS-SCRIPT 7: 2638
          ? rawTime.known
// HTML 6285 | JS-SCRIPT 7: 2639
          : undefined
// HTML 6286 | JS-SCRIPT 7: 2640
      ) ??
// HTML 6287 | JS-SCRIPT 7: 2641
      profile.time_known ??
// HTML 6288 | JS-SCRIPT 7: 2642
      profile.timeKnown ??
// HTML 6289 | JS-SCRIPT 7: 2643
      Boolean(time),
// HTML 6290 | JS-SCRIPT 7: 2644

// HTML 6291 | JS-SCRIPT 7: 2645
    place:
// HTML 6292 | JS-SCRIPT 7: 2646
      place.raw_input ||
// HTML 6293 | JS-SCRIPT 7: 2647
      profile.birth_place ||
// HTML 6294 | JS-SCRIPT 7: 2648
      "",
// HTML 6295 | JS-SCRIPT 7: 2649

// HTML 6296 | JS-SCRIPT 7: 2650
    latitude:
// HTML 6297 | JS-SCRIPT 7: 2651
      resolved.latitude ??
// HTML 6298 | JS-SCRIPT 7: 2652
      profile.latitude,
// HTML 6299 | JS-SCRIPT 7: 2653

// HTML 6300 | JS-SCRIPT 7: 2654
    longitude:
// HTML 6301 | JS-SCRIPT 7: 2655
      resolved.longitude ??
// HTML 6302 | JS-SCRIPT 7: 2656
      profile.longitude,
// HTML 6303 | JS-SCRIPT 7: 2657

// HTML 6304 | JS-SCRIPT 7: 2658
    timezone_id:
// HTML 6305 | JS-SCRIPT 7: 2659
      resolved.timezone_id ||
// HTML 6306 | JS-SCRIPT 7: 2660
      profile.timezone_id ||
// HTML 6307 | JS-SCRIPT 7: 2661
      "",
// HTML 6308 | JS-SCRIPT 7: 2662

// HTML 6309 | JS-SCRIPT 7: 2663
    house_system:
// HTML 6310 | JS-SCRIPT 7: 2664
      birth.house_system ||
// HTML 6311 | JS-SCRIPT 7: 2665
      profile.house_system ||
// HTML 6312 | JS-SCRIPT 7: 2666
      "placidus"
// HTML 6313 | JS-SCRIPT 7: 2667
  };
// HTML 6314 | JS-SCRIPT 7: 2668
}
// HTML 6315 | JS-SCRIPT 7: 2669

// HTML 6316 | JS-SCRIPT 7: 2670
async function astromatchV212Calculate(profileA, profileB) {
// HTML 6317 | JS-SCRIPT 7: 2671
  const primary =
// HTML 6318 | JS-SCRIPT 7: 2672
    astromatchV212BuildApiProfile(profileA);
// HTML 6319 | JS-SCRIPT 7: 2673

// HTML 6320 | JS-SCRIPT 7: 2674
  const target =
// HTML 6321 | JS-SCRIPT 7: 2675
    astromatchV212BuildApiProfile(profileB);
// HTML 6322 | JS-SCRIPT 7: 2676

// HTML 6323 | JS-SCRIPT 7: 2677
  if (!primary || !target) {
// HTML 6324 | JS-SCRIPT 7: 2678
    throw new Error(
// HTML 6325 | JS-SCRIPT 7: 2679
      "Profil A ou B invalide."
// HTML 6326 | JS-SCRIPT 7: 2680
    );
// HTML 6327 | JS-SCRIPT 7: 2681
  }
// HTML 6328 | JS-SCRIPT 7: 2682

// HTML 6329 | JS-SCRIPT 7: 2683
  const response =
// HTML 6330 | JS-SCRIPT 7: 2684
    await fetch(API_URL, {
// HTML 6331 | JS-SCRIPT 7: 2685
      method: "POST",
// HTML 6332 | JS-SCRIPT 7: 2686
      headers: {
// HTML 6333 | JS-SCRIPT 7: 2687
        "Content-Type": "application/json"
// HTML 6334 | JS-SCRIPT 7: 2688
      },
// HTML 6335 | JS-SCRIPT 7: 2689
      body: JSON.stringify({
// HTML 6336 | JS-SCRIPT 7: 2690
        primary,
// HTML 6337 | JS-SCRIPT 7: 2691
        target
// HTML 6338 | JS-SCRIPT 7: 2692
      })
// HTML 6339 | JS-SCRIPT 7: 2693
    });
// HTML 6340 | JS-SCRIPT 7: 2694

// HTML 6341 | JS-SCRIPT 7: 2695
  if (!response.ok) {
// HTML 6342 | JS-SCRIPT 7: 2696
    throw new Error(
// HTML 6343 | JS-SCRIPT 7: 2697
      `API /api/match HTTP ${response.status}`
// HTML 6344 | JS-SCRIPT 7: 2698
    );
// HTML 6345 | JS-SCRIPT 7: 2699
  }
// HTML 6346 | JS-SCRIPT 7: 2700

// HTML 6347 | JS-SCRIPT 7: 2701
  return await response.json();
// HTML 6348 | JS-SCRIPT 7: 2702
}
// HTML 6349 | JS-SCRIPT 7: 2703

// HTML 6350 | JS-SCRIPT 7: 2704
function astromatchV212List(items, emptyText) {
// HTML 6351 | JS-SCRIPT 7: 2705
  if (!Array.isArray(items) || !items.length) {
// HTML 6352 | JS-SCRIPT 7: 2706
    return `
// HTML 6353 | JS-SCRIPT 7: 2707
      <div class="astromatch-v211-empty">
// HTML 6354 | JS-SCRIPT 7: 2708
        ${astromatchV212Escape(emptyText)}
// HTML 6355 | JS-SCRIPT 7: 2709
      </div>
// HTML 6356 | JS-SCRIPT 7: 2710
    `;
// HTML 6357 | JS-SCRIPT 7: 2711
  }
// HTML 6358 | JS-SCRIPT 7: 2712

// HTML 6359 | JS-SCRIPT 7: 2713
  return `
// HTML 6360 | JS-SCRIPT 7: 2714
    <ul class="astromatch-v211-list">
// HTML 6361 | JS-SCRIPT 7: 2715
      ${items.map(item => `
// HTML 6362 | JS-SCRIPT 7: 2716
        <li>${astromatchV212Escape(item)}</li>
// HTML 6363 | JS-SCRIPT 7: 2717
      `).join("")}
// HTML 6364 | JS-SCRIPT 7: 2718
    </ul>
// HTML 6365 | JS-SCRIPT 7: 2719
  `;
// HTML 6366 | JS-SCRIPT 7: 2720
}
// HTML 6367 | JS-SCRIPT 7: 2721

// HTML 6368 | JS-SCRIPT 7: 2722
function astromatchV212RenderDomainDetail(key) {
// HTML 6369 | JS-SCRIPT 7: 2723
  const state =
// HTML 6370 | JS-SCRIPT 7: 2724
    window.__astromatchComparatorV212;
// HTML 6371 | JS-SCRIPT 7: 2725

// HTML 6372 | JS-SCRIPT 7: 2726
  const root =
// HTML 6373 | JS-SCRIPT 7: 2727
    document.getElementById(
// HTML 6374 | JS-SCRIPT 7: 2728
      "astromatchDomainDetailV21"
// HTML 6375 | JS-SCRIPT 7: 2729
    );
// HTML 6376 | JS-SCRIPT 7: 2730

// HTML 6377 | JS-SCRIPT 7: 2731
  if (!state?.result || !root) return;
// HTML 6378 | JS-SCRIPT 7: 2732

// HTML 6379 | JS-SCRIPT 7: 2733
  const domain =
// HTML 6380 | JS-SCRIPT 7: 2734
    Array.isArray(state.result.domains)
// HTML 6381 | JS-SCRIPT 7: 2735
      ? state.result.domains.find(
// HTML 6382 | JS-SCRIPT 7: 2736
          d =>
// HTML 6383 | JS-SCRIPT 7: 2737
            d &&
// HTML 6384 | JS-SCRIPT 7: 2738
            (
// HTML 6385 | JS-SCRIPT 7: 2739
              d.domain === key ||
// HTML 6386 | JS-SCRIPT 7: 2740
              d.key === key ||
// HTML 6387 | JS-SCRIPT 7: 2741
              d.id === key
// HTML 6388 | JS-SCRIPT 7: 2742
            )
// HTML 6389 | JS-SCRIPT 7: 2743
        )
// HTML 6390 | JS-SCRIPT 7: 2744
      : null;
// HTML 6391 | JS-SCRIPT 7: 2745

// HTML 6392 | JS-SCRIPT 7: 2746
  if (!domain) {
// HTML 6393 | JS-SCRIPT 7: 2747
    root.innerHTML = `
// HTML 6394 | JS-SCRIPT 7: 2748
      <div class="astromatch-v211-error">
// HTML 6395 | JS-SCRIPT 7: 2749
        Détail indisponible pour ce domaine.
// HTML 6396 | JS-SCRIPT 7: 2750
      </div>
// HTML 6397 | JS-SCRIPT 7: 2751
    `;
// HTML 6398 | JS-SCRIPT 7: 2752
    return;
// HTML 6399 | JS-SCRIPT 7: 2753
  }
// HTML 6400 | JS-SCRIPT 7: 2754

// HTML 6401 | JS-SCRIPT 7: 2755
  const meta =
// HTML 6402 | JS-SCRIPT 7: 2756
    astromatchV212DomainMeta(key);
// HTML 6403 | JS-SCRIPT 7: 2757

// HTML 6404 | JS-SCRIPT 7: 2758
  const score =
// HTML 6405 | JS-SCRIPT 7: 2759
    Number(domain.score);
// HTML 6406 | JS-SCRIPT 7: 2760

// HTML 6407 | JS-SCRIPT 7: 2761
  const level =
// HTML 6408 | JS-SCRIPT 7: 2762
    domain.level ||
// HTML 6409 | JS-SCRIPT 7: 2763
    domain.label ||
// HTML 6410 | JS-SCRIPT 7: 2764
    "—";
// HTML 6411 | JS-SCRIPT 7: 2765

// HTML 6412 | JS-SCRIPT 7: 2766
  const nameA =
// HTML 6413 | JS-SCRIPT 7: 2767
    astromatchV212ProfileName(
// HTML 6414 | JS-SCRIPT 7: 2768
      state.profileA,
// HTML 6415 | JS-SCRIPT 7: 2769
      "Profil A"
// HTML 6416 | JS-SCRIPT 7: 2770
    );
// HTML 6417 | JS-SCRIPT 7: 2771

// HTML 6418 | JS-SCRIPT 7: 2772
  const nameB =
// HTML 6419 | JS-SCRIPT 7: 2773
    astromatchV212ProfileName(
// HTML 6420 | JS-SCRIPT 7: 2774
      state.profileB,
// HTML 6421 | JS-SCRIPT 7: 2775
      "Profil B"
// HTML 6422 | JS-SCRIPT 7: 2776
    );
// HTML 6423 | JS-SCRIPT 7: 2777

// HTML 6424 | JS-SCRIPT 7: 2778
  root.innerHTML = `
// HTML 6425 | JS-SCRIPT 7: 2779
    <div class="astromatch-v211-detail">
// HTML 6426 | JS-SCRIPT 7: 2780

// HTML 6427 | JS-SCRIPT 7: 2781
      <div class="astromatch-v211-detail-header">
// HTML 6428 | JS-SCRIPT 7: 2782

// HTML 6429 | JS-SCRIPT 7: 2783
        <div>
// HTML 6430 | JS-SCRIPT 7: 2784
          <div class="astromatch-v211-detail-kicker">
// HTML 6431 | JS-SCRIPT 7: 2785
            DÉTAIL DU DOMAINE
// HTML 6432 | JS-SCRIPT 7: 2786
          </div>
// HTML 6433 | JS-SCRIPT 7: 2787

// HTML 6434 | JS-SCRIPT 7: 2788
          <h3>
// HTML 6435 | JS-SCRIPT 7: 2789
            ${meta.icon}
// HTML 6436 | JS-SCRIPT 7: 2790
            ${astromatchV212Escape(meta.label)}
// HTML 6437 | JS-SCRIPT 7: 2791
          </h3>
// HTML 6438 | JS-SCRIPT 7: 2792
        </div>
// HTML 6439 | JS-SCRIPT 7: 2793

// HTML 6440 | JS-SCRIPT 7: 2794
        <button
// HTML 6441 | JS-SCRIPT 7: 2795
          type="button"
// HTML 6442 | JS-SCRIPT 7: 2796
          class="astromatch-v211-close"
// HTML 6443 | JS-SCRIPT 7: 2797
          onclick="
// HTML 6444 | JS-SCRIPT 7: 2798
            document.getElementById(
// HTML 6445 | JS-SCRIPT 7: 2799
              'astromatchDomainDetailV21'
// HTML 6446 | JS-SCRIPT 7: 2800
            ).innerHTML = ''
// HTML 6447 | JS-SCRIPT 7: 2801
          "
// HTML 6448 | JS-SCRIPT 7: 2802
        >
// HTML 6449 | JS-SCRIPT 7: 2803
          ✕
// HTML 6450 | JS-SCRIPT 7: 2804
        </button>
// HTML 6451 | JS-SCRIPT 7: 2805

// HTML 6452 | JS-SCRIPT 7: 2806
      </div>
// HTML 6453 | JS-SCRIPT 7: 2807

// HTML 6454 | JS-SCRIPT 7: 2808
      <div class="astromatch-v211-detail-scores">
// HTML 6455 | JS-SCRIPT 7: 2809

// HTML 6456 | JS-SCRIPT 7: 2810
        <div class="astromatch-v211-person-score">
// HTML 6457 | JS-SCRIPT 7: 2811
          <div>
// HTML 6458 | JS-SCRIPT 7: 2812
            ${astromatchV212Escape(nameA)}
// HTML 6459 | JS-SCRIPT 7: 2813
          </div>
// HTML 6460 | JS-SCRIPT 7: 2814

// HTML 6461 | JS-SCRIPT 7: 2815
          <strong>
// HTML 6462 | JS-SCRIPT 7: 2816
            ${
// HTML 6463 | JS-SCRIPT 7: 2817
              Number.isFinite(score)
// HTML 6464 | JS-SCRIPT 7: 2818
                ? score.toFixed(1)
// HTML 6465 | JS-SCRIPT 7: 2819
                : "—"
// HTML 6466 | JS-SCRIPT 7: 2820
            }
// HTML 6467 | JS-SCRIPT 7: 2821
          </strong>
// HTML 6468 | JS-SCRIPT 7: 2822
        </div>
// HTML 6469 | JS-SCRIPT 7: 2823

// HTML 6470 | JS-SCRIPT 7: 2824
        <div class="astromatch-v211-person-score">
// HTML 6471 | JS-SCRIPT 7: 2825
          <div>
// HTML 6472 | JS-SCRIPT 7: 2826
            ${astromatchV212Escape(nameB)}
// HTML 6473 | JS-SCRIPT 7: 2827
          </div>
// HTML 6474 | JS-SCRIPT 7: 2828

// HTML 6475 | JS-SCRIPT 7: 2829
          <strong>
// HTML 6476 | JS-SCRIPT 7: 2830
            ${
// HTML 6477 | JS-SCRIPT 7: 2831
              Number.isFinite(score)
// HTML 6478 | JS-SCRIPT 7: 2832
                ? score.toFixed(1)
// HTML 6479 | JS-SCRIPT 7: 2833
                : "—"
// HTML 6480 | JS-SCRIPT 7: 2834
            }
// HTML 6481 | JS-SCRIPT 7: 2835
          </strong>
// HTML 6482 | JS-SCRIPT 7: 2836
        </div>
// HTML 6483 | JS-SCRIPT 7: 2837

// HTML 6484 | JS-SCRIPT 7: 2838
      </div>
// HTML 6485 | JS-SCRIPT 7: 2839

// HTML 6486 | JS-SCRIPT 7: 2840
      <div class="astromatch-v211-delta">
// HTML 6487 | JS-SCRIPT 7: 2841
        ${astromatchV212Escape(level)}
// HTML 6488 | JS-SCRIPT 7: 2842
      </div>
// HTML 6489 | JS-SCRIPT 7: 2843

// HTML 6490 | JS-SCRIPT 7: 2844
      <div class="astromatch-v211-detail-grid">
// HTML 6491 | JS-SCRIPT 7: 2845

// HTML 6492 | JS-SCRIPT 7: 2846
        <div>
// HTML 6493 | JS-SCRIPT 7: 2847

// HTML 6494 | JS-SCRIPT 7: 2848
          <div class="astromatch-v211-person-title">
// HTML 6495 | JS-SCRIPT 7: 2849
            💫 ${astromatchV212Escape(nameA)}
// HTML 6496 | JS-SCRIPT 7: 2850
          </div>
// HTML 6497 | JS-SCRIPT 7: 2851

// HTML 6498 | JS-SCRIPT 7: 2852
          <div class="astromatch-v211-detail-section">
// HTML 6499 | JS-SCRIPT 7: 2853
            <div class="astromatch-v211-detail-title">
// HTML 6500 | JS-SCRIPT 7: 2854
              💪 Forces
// HTML 6501 | JS-SCRIPT 7: 2855
            </div>
// HTML 6502 | JS-SCRIPT 7: 2856

// HTML 6503 | JS-SCRIPT 7: 2857
            ${astromatchV212List(
// HTML 6504 | JS-SCRIPT 7: 2858
              domain.strengths,
// HTML 6505 | JS-SCRIPT 7: 2859
              "Aucune force détaillée."
// HTML 6506 | JS-SCRIPT 7: 2860
            )}
// HTML 6507 | JS-SCRIPT 7: 2861
          </div>
// HTML 6508 | JS-SCRIPT 7: 2862

// HTML 6509 | JS-SCRIPT 7: 2863
          <div class="astromatch-v211-detail-section">
// HTML 6510 | JS-SCRIPT 7: 2864
            <div class="astromatch-v211-detail-title">
// HTML 6511 | JS-SCRIPT 7: 2865
              ⚠️ Tensions
// HTML 6512 | JS-SCRIPT 7: 2866
            </div>
// HTML 6513 | JS-SCRIPT 7: 2867

// HTML 6514 | JS-SCRIPT 7: 2868
            ${astromatchV212List(
// HTML 6515 | JS-SCRIPT 7: 2869
              domain.tensions,
// HTML 6516 | JS-SCRIPT 7: 2870
              "Aucune tension détaillée."
// HTML 6517 | JS-SCRIPT 7: 2871
            )}
// HTML 6518 | JS-SCRIPT 7: 2872
          </div>
// HTML 6519 | JS-SCRIPT 7: 2873

// HTML 6520 | JS-SCRIPT 7: 2874
        </div>
// HTML 6521 | JS-SCRIPT 7: 2875

// HTML 6522 | JS-SCRIPT 7: 2876
        <div>
// HTML 6523 | JS-SCRIPT 7: 2877

// HTML 6524 | JS-SCRIPT 7: 2878
          <div class="astromatch-v211-person-title">
// HTML 6525 | JS-SCRIPT 7: 2879
            💫 ${astromatchV212Escape(nameB)}
// HTML 6526 | JS-SCRIPT 7: 2880
          </div>
// HTML 6527 | JS-SCRIPT 7: 2881

// HTML 6528 | JS-SCRIPT 7: 2882
          <div class="astromatch-v211-detail-section">
// HTML 6529 | JS-SCRIPT 7: 2883
            <div class="astromatch-v211-detail-title">
// HTML 6530 | JS-SCRIPT 7: 2884
              🔀 Facteurs mixtes
// HTML 6531 | JS-SCRIPT 7: 2885
            </div>
// HTML 6532 | JS-SCRIPT 7: 2886

// HTML 6533 | JS-SCRIPT 7: 2887
            ${astromatchV212List(
// HTML 6534 | JS-SCRIPT 7: 2888
              domain.mixed_factors,
// HTML 6535 | JS-SCRIPT 7: 2889
              "Aucun facteur mixte."
// HTML 6536 | JS-SCRIPT 7: 2890
            )}
// HTML 6537 | JS-SCRIPT 7: 2891
          </div>
// HTML 6538 | JS-SCRIPT 7: 2892

// HTML 6539 | JS-SCRIPT 7: 2893
          <div class="astromatch-v211-detail-section">
// HTML 6540 | JS-SCRIPT 7: 2894
            <div class="astromatch-v211-detail-title">
// HTML 6541 | JS-SCRIPT 7: 2895
              🔑 Facteurs clés
// HTML 6542 | JS-SCRIPT 7: 2896
            </div>
// HTML 6543 | JS-SCRIPT 7: 2897

// HTML 6544 | JS-SCRIPT 7: 2898
            ${astromatchV212List(
// HTML 6545 | JS-SCRIPT 7: 2899
              domain.key_factors,
// HTML 6546 | JS-SCRIPT 7: 2900
              "Aucun facteur clé."
// HTML 6547 | JS-SCRIPT 7: 2901
            )}
// HTML 6548 | JS-SCRIPT 7: 2902
          </div>
// HTML 6549 | JS-SCRIPT 7: 2903

// HTML 6550 | JS-SCRIPT 7: 2904
        </div>
// HTML 6551 | JS-SCRIPT 7: 2905

// HTML 6552 | JS-SCRIPT 7: 2906
      </div>
// HTML 6553 | JS-SCRIPT 7: 2907

// HTML 6554 | JS-SCRIPT 7: 2908
    </div>
// HTML 6555 | JS-SCRIPT 7: 2909
  `;
// HTML 6556 | JS-SCRIPT 7: 2910
}
// HTML 6557 | JS-SCRIPT 7: 2911

// HTML 6558 | JS-SCRIPT 7: 2912
window.astromatchShowDomainDetail =
// HTML 6559 | JS-SCRIPT 7: 2913
  astromatchV212RenderDomainDetail;
// HTML 6560 | JS-SCRIPT 7: 2914

// HTML 6561 | JS-SCRIPT 7: 2915
/* ============================================================
// HTML 6562 | JS-SCRIPT 7: 2916
   ASTROMATCH V2.1.7 — GLOBAL DOMAIN CLICK
// HTML 6563 | JS-SCRIPT 7: 2917
   ============================================================ */
// HTML 6564 | JS-SCRIPT 7: 2918

// HTML 6565 | JS-SCRIPT 7: 2919
(function() {
// HTML 6566 | JS-SCRIPT 7: 2920
  if (window.__astromatchGlobalDomainClickBound) {
// HTML 6567 | JS-SCRIPT 7: 2921
    return;
// HTML 6568 | JS-SCRIPT 7: 2922
  }
// HTML 6569 | JS-SCRIPT 7: 2923

// HTML 6570 | JS-SCRIPT 7: 2924
  window.__astromatchGlobalDomainClickBound = true;
// HTML 6571 | JS-SCRIPT 7: 2925

// HTML 6572 | JS-SCRIPT 7: 2926
  document.addEventListener(
// HTML 6573 | JS-SCRIPT 7: 2927
    "click",
// HTML 6574 | JS-SCRIPT 7: 2928
    function(event) {
// HTML 6575 | JS-SCRIPT 7: 2929

// HTML 6576 | JS-SCRIPT 7: 2930
      const target = event.target;
// HTML 6577 | JS-SCRIPT 7: 2931

// HTML 6578 | JS-SCRIPT 7: 2932
      if (!target || !target.closest) {
// HTML 6579 | JS-SCRIPT 7: 2933
        return;
// HTML 6580 | JS-SCRIPT 7: 2934
      }
// HTML 6581 | JS-SCRIPT 7: 2935

// HTML 6582 | JS-SCRIPT 7: 2936
      /*
// HTML 6583 | JS-SCRIPT 7: 2937
       * V2.1 cards
// HTML 6584 | JS-SCRIPT 7: 2938
       */
// HTML 6585 | JS-SCRIPT 7: 2939
      const v21 =
// HTML 6586 | JS-SCRIPT 7: 2940
        target.closest(
// HTML 6587 | JS-SCRIPT 7: 2941
          "[data-astromatch-domain-key]"
// HTML 6588 | JS-SCRIPT 7: 2942
        );
// HTML 6589 | JS-SCRIPT 7: 2943

// HTML 6590 | JS-SCRIPT 7: 2944
      if (v21) {
// HTML 6591 | JS-SCRIPT 7: 2945

// HTML 6592 | JS-SCRIPT 7: 2946
        const key =
// HTML 6593 | JS-SCRIPT 7: 2947
          v21.getAttribute(
// HTML 6594 | JS-SCRIPT 7: 2948
            "data-astromatch-domain-key"
// HTML 6595 | JS-SCRIPT 7: 2949
          );
// HTML 6596 | JS-SCRIPT 7: 2950

// HTML 6597 | JS-SCRIPT 7: 2951
        if (!key) {
// HTML 6598 | JS-SCRIPT 7: 2952
          return;
// HTML 6599 | JS-SCRIPT 7: 2953
        }
// HTML 6600 | JS-SCRIPT 7: 2954

// HTML 6601 | JS-SCRIPT 7: 2955
        event.preventDefault();
// HTML 6602 | JS-SCRIPT 7: 2956
        event.stopPropagation();
// HTML 6603 | JS-SCRIPT 7: 2957

// HTML 6604 | JS-SCRIPT 7: 2958
        if (
// HTML 6605 | JS-SCRIPT 7: 2959
          typeof window.astromatchShowDomainDetail ===
// HTML 6606 | JS-SCRIPT 7: 2960
          "function"
// HTML 6607 | JS-SCRIPT 7: 2961
        ) {
// HTML 6608 | JS-SCRIPT 7: 2962
          window.astromatchShowDomainDetail(key);
// HTML 6609 | JS-SCRIPT 7: 2963
        }
// HTML 6610 | JS-SCRIPT 7: 2964

// HTML 6611 | JS-SCRIPT 7: 2965
        return;
// HTML 6612 | JS-SCRIPT 7: 2966
      }
// HTML 6613 | JS-SCRIPT 7: 2967

// HTML 6614 | JS-SCRIPT 7: 2968
      /*
// HTML 6615 | JS-SCRIPT 7: 2969
       * Anciennes cartes .domain-card
// HTML 6616 | JS-SCRIPT 7: 2970
       *
// HTML 6617 | JS-SCRIPT 7: 2971
       * On ne force pas encore leur détail :
// HTML 6618 | JS-SCRIPT 7: 2972
       * elles servent aussi à l'affichage principal.
// HTML 6619 | JS-SCRIPT 7: 2973
       */
// HTML 6620 | JS-SCRIPT 7: 2974
    },
// HTML 6621 | JS-SCRIPT 7: 2975
    true
// HTML 6622 | JS-SCRIPT 7: 2976
  );
// HTML 6623 | JS-SCRIPT 7: 2977
})();
// HTML 6624 | JS-SCRIPT 7: 2978

// HTML 6625 | JS-SCRIPT 7: 2979

// HTML 6626 | JS-SCRIPT 7: 2980

// HTML 6627 | JS-SCRIPT 7: 2981
function astromatchV212RenderResult() {
// HTML 6628 | JS-SCRIPT 7: 2982
  const state =
// HTML 6629 | JS-SCRIPT 7: 2983
    window.__astromatchComparatorV212;
// HTML 6630 | JS-SCRIPT 7: 2984

// HTML 6631 | JS-SCRIPT 7: 2985
  const root =
// HTML 6632 | JS-SCRIPT 7: 2986
    document.getElementById(
// HTML 6633 | JS-SCRIPT 7: 2987
      "astromatchCompareV21Results"
// HTML 6634 | JS-SCRIPT 7: 2988
    );
// HTML 6635 | JS-SCRIPT 7: 2989

// HTML 6636 | JS-SCRIPT 7: 2990
  if (!state?.result || !root) return;
// HTML 6637 | JS-SCRIPT 7: 2991

// HTML 6638 | JS-SCRIPT 7: 2992
  const result =
// HTML 6639 | JS-SCRIPT 7: 2993
    state.result;
// HTML 6640 | JS-SCRIPT 7: 2994

// HTML 6641 | JS-SCRIPT 7: 2995
  const nameA =
// HTML 6642 | JS-SCRIPT 7: 2996
    astromatchV212ProfileName(
// HTML 6643 | JS-SCRIPT 7: 2997
      state.profileA,
// HTML 6644 | JS-SCRIPT 7: 2998
      "Profil A"
// HTML 6645 | JS-SCRIPT 7: 2999
    );
// HTML 6646 | JS-SCRIPT 7: 3000

// HTML 6647 | JS-SCRIPT 7: 3001
  const nameB =
// HTML 6648 | JS-SCRIPT 7: 3002
    astromatchV212ProfileName(
// HTML 6649 | JS-SCRIPT 7: 3003
      state.profileB,
// HTML 6650 | JS-SCRIPT 7: 3004
      "Profil B"
// HTML 6651 | JS-SCRIPT 7: 3005
    );
// HTML 6652 | JS-SCRIPT 7: 3006

// HTML 6653 | JS-SCRIPT 7: 3007
  const global =
// HTML 6654 | JS-SCRIPT 7: 3008
    result.global || {};
// HTML 6655 | JS-SCRIPT 7: 3009

// HTML 6656 | JS-SCRIPT 7: 3010
  const score =
// HTML 6657 | JS-SCRIPT 7: 3011
    Number(global.score);
// HTML 6658 | JS-SCRIPT 7: 3012

// HTML 6659 | JS-SCRIPT 7: 3013
  const domains =
// HTML 6660 | JS-SCRIPT 7: 3014
    Array.isArray(result.domains)
// HTML 6661 | JS-SCRIPT 7: 3015
      ? result.domains
// HTML 6662 | JS-SCRIPT 7: 3016
      : [];
// HTML 6663 | JS-SCRIPT 7: 3017

// HTML 6664 | JS-SCRIPT 7: 3018
  root.innerHTML = `
// HTML 6665 | JS-SCRIPT 7: 3019
    <div class="astromatch-compare-hero">
// HTML 6666 | JS-SCRIPT 7: 3020

// HTML 6667 | JS-SCRIPT 7: 3021
      <div class="astromatch-compare-score">
// HTML 6668 | JS-SCRIPT 7: 3022
        <div>
// HTML 6669 | JS-SCRIPT 7: 3023
          ${astromatchV212Escape(nameA)}
// HTML 6670 | JS-SCRIPT 7: 3024
        </div>
// HTML 6671 | JS-SCRIPT 7: 3025

// HTML 6672 | JS-SCRIPT 7: 3026
        <strong>
// HTML 6673 | JS-SCRIPT 7: 3027
          ${
// HTML 6674 | JS-SCRIPT 7: 3028
            Number.isFinite(score)
// HTML 6675 | JS-SCRIPT 7: 3029
              ? score.toFixed(1)
// HTML 6676 | JS-SCRIPT 7: 3030
              : "—"
// HTML 6677 | JS-SCRIPT 7: 3031
          }
// HTML 6678 | JS-SCRIPT 7: 3032
        </strong>
// HTML 6679 | JS-SCRIPT 7: 3033
      </div>
// HTML 6680 | JS-SCRIPT 7: 3034

// HTML 6681 | JS-SCRIPT 7: 3035
      <div class="astromatch-compare-gap">
// HTML 6682 | JS-SCRIPT 7: 3036
        <div>Compatibilité</div>
// HTML 6683 | JS-SCRIPT 7: 3037

// HTML 6684 | JS-SCRIPT 7: 3038
        <strong>
// HTML 6685 | JS-SCRIPT 7: 3039
          ${astromatchV212Escape(
// HTML 6686 | JS-SCRIPT 7: 3040
            global.label ||
// HTML 6687 | JS-SCRIPT 7: 3041
            global.level ||
// HTML 6688 | JS-SCRIPT 7: 3042
            "—"
// HTML 6689 | JS-SCRIPT 7: 3043
          )}
// HTML 6690 | JS-SCRIPT 7: 3044
        </strong>
// HTML 6691 | JS-SCRIPT 7: 3045
      </div>
// HTML 6692 | JS-SCRIPT 7: 3046

// HTML 6693 | JS-SCRIPT 7: 3047
      <div class="astromatch-compare-score">
// HTML 6694 | JS-SCRIPT 7: 3048
        <div>
// HTML 6695 | JS-SCRIPT 7: 3049
          ${astromatchV212Escape(nameB)}
// HTML 6696 | JS-SCRIPT 7: 3050
        </div>
// HTML 6697 | JS-SCRIPT 7: 3051

// HTML 6698 | JS-SCRIPT 7: 3052
        <strong>
// HTML 6699 | JS-SCRIPT 7: 3053
          ${
// HTML 6700 | JS-SCRIPT 7: 3054
            Number.isFinite(score)
// HTML 6701 | JS-SCRIPT 7: 3055
              ? score.toFixed(1)
// HTML 6702 | JS-SCRIPT 7: 3056
              : "—"
// HTML 6703 | JS-SCRIPT 7: 3057
          }
// HTML 6704 | JS-SCRIPT 7: 3058
        </strong>
// HTML 6705 | JS-SCRIPT 7: 3059
      </div>
// HTML 6706 | JS-SCRIPT 7: 3060

// HTML 6707 | JS-SCRIPT 7: 3061
    </div>
// HTML 6708 | JS-SCRIPT 7: 3062

// HTML 6709 | JS-SCRIPT 7: 3063
    <div
// HTML 6710 | JS-SCRIPT 7: 3064
      style="
// HTML 6711 | JS-SCRIPT 7: 3065
        margin:14px 0;
// HTML 6712 | JS-SCRIPT 7: 3066
        font-size:13px;
// HTML 6713 | JS-SCRIPT 7: 3067
        opacity:.7;
// HTML 6714 | JS-SCRIPT 7: 3068
      "
// HTML 6715 | JS-SCRIPT 7: 3069
    >
// HTML 6716 | JS-SCRIPT 7: 3070
      👆 Clique sur un domaine pour voir
// HTML 6717 | JS-SCRIPT 7: 3071
      ses facteurs détaillés.
// HTML 6718 | JS-SCRIPT 7: 3072
    </div>
// HTML 6719 | JS-SCRIPT 7: 3073

// HTML 6720 | JS-SCRIPT 7: 3074
    <div class="astromatch-compare-v2">
// HTML 6721 | JS-SCRIPT 7: 3075

// HTML 6722 | JS-SCRIPT 7: 3076
      ${domains.map(domain => {
// HTML 6723 | JS-SCRIPT 7: 3077

// HTML 6724 | JS-SCRIPT 7: 3078
        const key =
// HTML 6725 | JS-SCRIPT 7: 3079
          domain?.domain ||
// HTML 6726 | JS-SCRIPT 7: 3080
          domain?.key ||
// HTML 6727 | JS-SCRIPT 7: 3081
          domain?.id;
// HTML 6728 | JS-SCRIPT 7: 3082

// HTML 6729 | JS-SCRIPT 7: 3083
        if (!key) return "";
// HTML 6730 | JS-SCRIPT 7: 3084

// HTML 6731 | JS-SCRIPT 7: 3085
        const meta =
// HTML 6732 | JS-SCRIPT 7: 3086
          astromatchV212DomainMeta(key);
// HTML 6733 | JS-SCRIPT 7: 3087

// HTML 6734 | JS-SCRIPT 7: 3088
        const value =
// HTML 6735 | JS-SCRIPT 7: 3089
          Number(domain?.score);
// HTML 6736 | JS-SCRIPT 7: 3090

// HTML 6737 | JS-SCRIPT 7: 3091
        const level =
// HTML 6738 | JS-SCRIPT 7: 3092
          domain?.level ||
// HTML 6739 | JS-SCRIPT 7: 3093
          domain?.label ||
// HTML 6740 | JS-SCRIPT 7: 3094
          "";
// HTML 6741 | JS-SCRIPT 7: 3095

// HTML 6742 | JS-SCRIPT 7: 3096
        return `
// HTML 6743 | JS-SCRIPT 7: 3097
          <button
// HTML 6744 | JS-SCRIPT 7: 3098
            type="button"
// HTML 6745 | JS-SCRIPT 7: 3099
            class="
// HTML 6746 | JS-SCRIPT 7: 3100
              astromatch-compare-domain
// HTML 6747 | JS-SCRIPT 7: 3101
              astromatch-domain-card-v21
// HTML 6748 | JS-SCRIPT 7: 3102
            "
// HTML 6749 | JS-SCRIPT 7: 3103
            onclick="
// HTML 6750 | JS-SCRIPT 7: 3104
              astromatchShowDomainDetail(
// HTML 6751 | JS-SCRIPT 7: 3105
                '${String(key).replace(
// HTML 6752 | JS-SCRIPT 7: 3106
                  /'/g,
// HTML 6753 | JS-SCRIPT 7: 3107
                  "\\'"
// HTML 6754 | JS-SCRIPT 7: 3108
                )}'
// HTML 6755 | JS-SCRIPT 7: 3109
              )
// HTML 6756 | JS-SCRIPT 7: 3110
            "
// HTML 6757 | JS-SCRIPT 7: 3111
          >
// HTML 6758 | JS-SCRIPT 7: 3112

// HTML 6759 | JS-SCRIPT 7: 3113
            <div
// HTML 6760 | JS-SCRIPT 7: 3114
              class="
// HTML 6761 | JS-SCRIPT 7: 3115
                astromatch-compare-section-title
// HTML 6762 | JS-SCRIPT 7: 3116
              "
// HTML 6763 | JS-SCRIPT 7: 3117
            >
// HTML 6764 | JS-SCRIPT 7: 3118
              ${meta.icon}
// HTML 6765 | JS-SCRIPT 7: 3119
              ${astromatchV212Escape(
// HTML 6766 | JS-SCRIPT 7: 3120
                meta.label
// HTML 6767 | JS-SCRIPT 7: 3121
              )}
// HTML 6768 | JS-SCRIPT 7: 3122
            </div>
// HTML 6769 | JS-SCRIPT 7: 3123

// HTML 6770 | JS-SCRIPT 7: 3124
            <div
// HTML 6771 | JS-SCRIPT 7: 3125
              style="
// HTML 6772 | JS-SCRIPT 7: 3126
                display:flex;
// HTML 6773 | JS-SCRIPT 7: 3127
                justify-content:space-between;
// HTML 6774 | JS-SCRIPT 7: 3128
                align-items:center;
// HTML 6775 | JS-SCRIPT 7: 3129
                gap:10px;
// HTML 6776 | JS-SCRIPT 7: 3130
              "
// HTML 6777 | JS-SCRIPT 7: 3131
            >
// HTML 6778 | JS-SCRIPT 7: 3132

// HTML 6779 | JS-SCRIPT 7: 3133
              <strong>
// HTML 6780 | JS-SCRIPT 7: 3134
                ${
// HTML 6781 | JS-SCRIPT 7: 3135
                  Number.isFinite(value)
// HTML 6782 | JS-SCRIPT 7: 3136
                    ? value.toFixed(1)
// HTML 6783 | JS-SCRIPT 7: 3137
                    : "—"
// HTML 6784 | JS-SCRIPT 7: 3138
                }
// HTML 6785 | JS-SCRIPT 7: 3139
              </strong>
// HTML 6786 | JS-SCRIPT 7: 3140

// HTML 6787 | JS-SCRIPT 7: 3141
              <span
// HTML 6788 | JS-SCRIPT 7: 3142
                class="
// HTML 6789 | JS-SCRIPT 7: 3143
                  astromatch-compare-winner
// HTML 6790 | JS-SCRIPT 7: 3144
                "
// HTML 6791 | JS-SCRIPT 7: 3145
              >
// HTML 6792 | JS-SCRIPT 7: 3146
                ${astromatchV212Escape(
// HTML 6793 | JS-SCRIPT 7: 3147
                  level
// HTML 6794 | JS-SCRIPT 7: 3148
                )}
// HTML 6795 | JS-SCRIPT 7: 3149
              </span>
// HTML 6796 | JS-SCRIPT 7: 3150

// HTML 6797 | JS-SCRIPT 7: 3151
            </div>
// HTML 6798 | JS-SCRIPT 7: 3152

// HTML 6799 | JS-SCRIPT 7: 3153
            <div
// HTML 6800 | JS-SCRIPT 7: 3154
              class="astromatch-compare-bar"
// HTML 6801 | JS-SCRIPT 7: 3155
              style="margin-top:10px"
// HTML 6802 | JS-SCRIPT 7: 3156
            >
// HTML 6803 | JS-SCRIPT 7: 3157

// HTML 6804 | JS-SCRIPT 7: 3158
              <div
// HTML 6805 | JS-SCRIPT 7: 3159
                class="
// HTML 6806 | JS-SCRIPT 7: 3160
                  astromatch-compare-bar-fill
// HTML 6807 | JS-SCRIPT 7: 3161
                "
// HTML 6808 | JS-SCRIPT 7: 3162
                style="
// HTML 6809 | JS-SCRIPT 7: 3163
                  width:${
// HTML 6810 | JS-SCRIPT 7: 3164
                    Number.isFinite(value)
// HTML 6811 | JS-SCRIPT 7: 3165
                      ? Math.max(
// HTML 6812 | JS-SCRIPT 7: 3166
                          0,
// HTML 6813 | JS-SCRIPT 7: 3167
                          Math.min(
// HTML 6814 | JS-SCRIPT 7: 3168
                            100,
// HTML 6815 | JS-SCRIPT 7: 3169
                            value
// HTML 6816 | JS-SCRIPT 7: 3170
                          )
// HTML 6817 | JS-SCRIPT 7: 3171
                        )
// HTML 6818 | JS-SCRIPT 7: 3172
                      : 0
// HTML 6819 | JS-SCRIPT 7: 3173
                  }%
// HTML 6820 | JS-SCRIPT 7: 3174
                "
// HTML 6821 | JS-SCRIPT 7: 3175
              ></div>
// HTML 6822 | JS-SCRIPT 7: 3176

// HTML 6823 | JS-SCRIPT 7: 3177
            </div>
// HTML 6824 | JS-SCRIPT 7: 3178

// HTML 6825 | JS-SCRIPT 7: 3179
            <div
// HTML 6826 | JS-SCRIPT 7: 3180
              style="
// HTML 6827 | JS-SCRIPT 7: 3181
                text-align:center;
// HTML 6828 | JS-SCRIPT 7: 3182
                margin-top:8px;
// HTML 6829 | JS-SCRIPT 7: 3183
                font-size:12px;
// HTML 6830 | JS-SCRIPT 7: 3184
                opacity:.6;
// HTML 6831 | JS-SCRIPT 7: 3185
              "
// HTML 6832 | JS-SCRIPT 7: 3186
            >
// HTML 6833 | JS-SCRIPT 7: 3187
              Cliquer pour le détail
// HTML 6834 | JS-SCRIPT 7: 3188
            </div>
// HTML 6835 | JS-SCRIPT 7: 3189

// HTML 6836 | JS-SCRIPT 7: 3190
          </button>
// HTML 6837 | JS-SCRIPT 7: 3191
        `;
// HTML 6838 | JS-SCRIPT 7: 3192
      }).join("")}
// HTML 6839 | JS-SCRIPT 7: 3193

// HTML 6840 | JS-SCRIPT 7: 3194
    </div>
// HTML 6841 | JS-SCRIPT 7: 3195

// HTML 6842 | JS-SCRIPT 7: 3196
    <div id="astromatchDomainDetailV21"></div>
// HTML 6843 | JS-SCRIPT 7: 3197
  `;
// HTML 6844 | JS-SCRIPT 7: 3198
}
// HTML 6845 | JS-SCRIPT 7: 3199

// HTML 6846 | JS-SCRIPT 7: 3200

// HTML 6847 | JS-SCRIPT 7: 3201
async function astromatchV212Run() {
// HTML 6848 | JS-SCRIPT 7: 3202
  const state =
// HTML 6849 | JS-SCRIPT 7: 3203
    window.__astromatchComparatorV212;
// HTML 6850 | JS-SCRIPT 7: 3204

// HTML 6851 | JS-SCRIPT 7: 3205
  const root =
// HTML 6852 | JS-SCRIPT 7: 3206
    document.getElementById(
// HTML 6853 | JS-SCRIPT 7: 3207
      "astromatchCompareV21Results"
// HTML 6854 | JS-SCRIPT 7: 3208
    );
// HTML 6855 | JS-SCRIPT 7: 3209

// HTML 6856 | JS-SCRIPT 7: 3210
  if (!state?.profileA || !state?.profileB || !root) {
// HTML 6857 | JS-SCRIPT 7: 3211
    return;
// HTML 6858 | JS-SCRIPT 7: 3212
  }
// HTML 6859 | JS-SCRIPT 7: 3213

// HTML 6860 | JS-SCRIPT 7: 3214
  const requestId =
// HTML 6861 | JS-SCRIPT 7: 3215
    `${Date.now()}_${Math.random()}`;
// HTML 6862 | JS-SCRIPT 7: 3216

// HTML 6863 | JS-SCRIPT 7: 3217
  state.requestId = requestId;
// HTML 6864 | JS-SCRIPT 7: 3218

// HTML 6865 | JS-SCRIPT 7: 3219
  root.innerHTML = `
// HTML 6866 | JS-SCRIPT 7: 3220
    <div class="astromatch-v211-loading">
// HTML 6867 | JS-SCRIPT 7: 3221
      ⏳ Calcul de la comparaison…
// HTML 6868 | JS-SCRIPT 7: 3222
    </div>
// HTML 6869 | JS-SCRIPT 7: 3223
  `;
// HTML 6870 | JS-SCRIPT 7: 3224

// HTML 6871 | JS-SCRIPT 7: 3225
  try {
// HTML 6872 | JS-SCRIPT 7: 3226

// HTML 6873 | JS-SCRIPT 7: 3227
    const result =
// HTML 6874 | JS-SCRIPT 7: 3228
      await astromatchV212Calculate(
// HTML 6875 | JS-SCRIPT 7: 3229
        state.profileA,
// HTML 6876 | JS-SCRIPT 7: 3230
        state.profileB
// HTML 6877 | JS-SCRIPT 7: 3231
      );
// HTML 6878 | JS-SCRIPT 7: 3232

// HTML 6879 | JS-SCRIPT 7: 3233
    if (
// HTML 6880 | JS-SCRIPT 7: 3234
      window.__astromatchComparatorV212
// HTML 6881 | JS-SCRIPT 7: 3235
        ?.requestId !== requestId
// HTML 6882 | JS-SCRIPT 7: 3236
    ) {
// HTML 6883 | JS-SCRIPT 7: 3237
      return;
// HTML 6884 | JS-SCRIPT 7: 3238
    }
// HTML 6885 | JS-SCRIPT 7: 3239

// HTML 6886 | JS-SCRIPT 7: 3240
    state.result =
// HTML 6887 | JS-SCRIPT 7: 3241
      result;
// HTML 6888 | JS-SCRIPT 7: 3242

// HTML 6889 | JS-SCRIPT 7: 3243
    astromatchV212RenderResult();
// HTML 6890 | JS-SCRIPT 7: 3244

// HTML 6891 | JS-SCRIPT 7: 3245
  } catch (error) {
// HTML 6892 | JS-SCRIPT 7: 3246

// HTML 6893 | JS-SCRIPT 7: 3247
    console.error(
// HTML 6894 | JS-SCRIPT 7: 3248
      "AstroMatch Comparator V2.1.2 :",
// HTML 6895 | JS-SCRIPT 7: 3249
      error
// HTML 6896 | JS-SCRIPT 7: 3250
    );
// HTML 6897 | JS-SCRIPT 7: 3251

// HTML 6898 | JS-SCRIPT 7: 3252
    root.innerHTML = `
// HTML 6899 | JS-SCRIPT 7: 3253
      <div class="astromatch-v211-error">
// HTML 6900 | JS-SCRIPT 7: 3254

// HTML 6901 | JS-SCRIPT 7: 3255
        <strong>
// HTML 6902 | JS-SCRIPT 7: 3256
          Impossible de calculer cette comparaison.
// HTML 6903 | JS-SCRIPT 7: 3257
        </strong>
// HTML 6904 | JS-SCRIPT 7: 3258

// HTML 6905 | JS-SCRIPT 7: 3259
        <div>
// HTML 6906 | JS-SCRIPT 7: 3260
          ${astromatchV212Escape(
// HTML 6907 | JS-SCRIPT 7: 3261
            error?.message ||
// HTML 6908 | JS-SCRIPT 7: 3262
            "Erreur inconnue"
// HTML 6909 | JS-SCRIPT 7: 3263
          )}
// HTML 6910 | JS-SCRIPT 7: 3264
        </div>
// HTML 6911 | JS-SCRIPT 7: 3265

// HTML 6912 | JS-SCRIPT 7: 3266
      </div>
// HTML 6913 | JS-SCRIPT 7: 3267
    `;
// HTML 6914 | JS-SCRIPT 7: 3268
  }
// HTML 6915 | JS-SCRIPT 7: 3269
}
// HTML 6916 | JS-SCRIPT 7: 3270

// HTML 6917 | JS-SCRIPT 7: 3271

// HTML 6918 | JS-SCRIPT 7: 3272
function astromatchBuildProfileSelectorsV211() {
// HTML 6919 | JS-SCRIPT 7: 3273
  const root =
// HTML 6920 | JS-SCRIPT 7: 3274
    document.getElementById(
// HTML 6921 | JS-SCRIPT 7: 3275
      "astromatchCompareSelectorsV21"
// HTML 6922 | JS-SCRIPT 7: 3276
    );
// HTML 6923 | JS-SCRIPT 7: 3277

// HTML 6924 | JS-SCRIPT 7: 3278
  if (!root) return;
// HTML 6925 | JS-SCRIPT 7: 3279

// HTML 6926 | JS-SCRIPT 7: 3280
  const profiles =
// HTML 6927 | JS-SCRIPT 7: 3281
    astromatchV212Profiles();
// HTML 6928 | JS-SCRIPT 7: 3282

// HTML 6929 | JS-SCRIPT 7: 3283
  if (profiles.length < 2) {
// HTML 6930 | JS-SCRIPT 7: 3284
    root.innerHTML = `
// HTML 6931 | JS-SCRIPT 7: 3285
      <div class="astromatch-v211-selector-card">
// HTML 6932 | JS-SCRIPT 7: 3286
        <div class="astromatch-v211-selector-status">
// HTML 6933 | JS-SCRIPT 7: 3287
          Il faut au moins deux profils enregistrés pour comparer.
// HTML 6934 | JS-SCRIPT 7: 3288
        </div>
// HTML 6935 | JS-SCRIPT 7: 3289
      </div>
// HTML 6936 | JS-SCRIPT 7: 3290
    `;
// HTML 6937 | JS-SCRIPT 7: 3291
    return;
// HTML 6938 | JS-SCRIPT 7: 3292
  }
// HTML 6939 | JS-SCRIPT 7: 3293

// HTML 6940 | JS-SCRIPT 7: 3294
  const old =
// HTML 6941 | JS-SCRIPT 7: 3295
    window.__astromatchComparatorV212 || {};
// HTML 6942 | JS-SCRIPT 7: 3296

// HTML 6943 | JS-SCRIPT 7: 3297
  const oldA =
// HTML 6944 | JS-SCRIPT 7: 3298
    astromatchV212ProfileId(old.profileA);
// HTML 6945 | JS-SCRIPT 7: 3299

// HTML 6946 | JS-SCRIPT 7: 3300
  const oldB =
// HTML 6947 | JS-SCRIPT 7: 3301
    astromatchV212ProfileId(old.profileB);
// HTML 6948 | JS-SCRIPT 7: 3302

// HTML 6949 | JS-SCRIPT 7: 3303
  let ia =
// HTML 6950 | JS-SCRIPT 7: 3304
    profiles.findIndex(
// HTML 6951 | JS-SCRIPT 7: 3305
      p =>
// HTML 6952 | JS-SCRIPT 7: 3306
        astromatchV212ProfileId(p) === oldA
// HTML 6953 | JS-SCRIPT 7: 3307
    );
// HTML 6954 | JS-SCRIPT 7: 3308

// HTML 6955 | JS-SCRIPT 7: 3309
  let ib =
// HTML 6956 | JS-SCRIPT 7: 3310
    profiles.findIndex(
// HTML 6957 | JS-SCRIPT 7: 3311
      p =>
// HTML 6958 | JS-SCRIPT 7: 3312
        astromatchV212ProfileId(p) === oldB
// HTML 6959 | JS-SCRIPT 7: 3313
    );
// HTML 6960 | JS-SCRIPT 7: 3314

// HTML 6961 | JS-SCRIPT 7: 3315
  if (ia < 0) ia = 0;
// HTML 6962 | JS-SCRIPT 7: 3316

// HTML 6963 | JS-SCRIPT 7: 3317
  if (ib < 0 || ib === ia) {
// HTML 6964 | JS-SCRIPT 7: 3318
    ib = ia === 0 ? 1 : 0;
// HTML 6965 | JS-SCRIPT 7: 3319
  }
// HTML 6966 | JS-SCRIPT 7: 3320

// HTML 6967 | JS-SCRIPT 7: 3321
  function info(profile) {
// HTML 6968 | JS-SCRIPT 7: 3322
    const birth =
// HTML 6969 | JS-SCRIPT 7: 3323
      profile?.birth_data ||
// HTML 6970 | JS-SCRIPT 7: 3324
      profile?.birthData ||
// HTML 6971 | JS-SCRIPT 7: 3325
      {};
// HTML 6972 | JS-SCRIPT 7: 3326

// HTML 6973 | JS-SCRIPT 7: 3327
    const place =
// HTML 6974 | JS-SCRIPT 7: 3328
      birth?.place ||
// HTML 6975 | JS-SCRIPT 7: 3329
      profile?.place ||
// HTML 6976 | JS-SCRIPT 7: 3330
      {};
// HTML 6977 | JS-SCRIPT 7: 3331

// HTML 6978 | JS-SCRIPT 7: 3332
    const city =
// HTML 6979 | JS-SCRIPT 7: 3333
      place?.raw_input ||
// HTML 6980 | JS-SCRIPT 7: 3334
      profile?.birth_place ||
// HTML 6981 | JS-SCRIPT 7: 3335
      "";
// HTML 6982 | JS-SCRIPT 7: 3336

// HTML 6983 | JS-SCRIPT 7: 3337
    const sign =
// HTML 6984 | JS-SCRIPT 7: 3338
      profile?.natal_chart?.sun?.sign ||
// HTML 6985 | JS-SCRIPT 7: 3339
      profile?.sun_sign ||
// HTML 6986 | JS-SCRIPT 7: 3340
      "";
// HTML 6987 | JS-SCRIPT 7: 3341

// HTML 6988 | JS-SCRIPT 7: 3342
    const signIcon = {
// HTML 6989 | JS-SCRIPT 7: 3343
      "Bélier":"♈",
// HTML 6990 | JS-SCRIPT 7: 3344
      "Taureau":"♉",
// HTML 6991 | JS-SCRIPT 7: 3345
      "Gémeaux":"♊",
// HTML 6992 | JS-SCRIPT 7: 3346
      "Cancer":"♋",
// HTML 6993 | JS-SCRIPT 7: 3347
      "Lion":"♌",
// HTML 6994 | JS-SCRIPT 7: 3348
      "Vierge":"♍",
// HTML 6995 | JS-SCRIPT 7: 3349
      "Balance":"♎",
// HTML 6996 | JS-SCRIPT 7: 3350
      "Scorpion":"♏",
// HTML 6997 | JS-SCRIPT 7: 3351
      "Sagittaire":"♐",
// HTML 6998 | JS-SCRIPT 7: 3352
      "Capricorne":"♑",
// HTML 6999 | JS-SCRIPT 7: 3353
      "Verseau":"♒",
// HTML 7000 | JS-SCRIPT 7: 3354
      "Poissons":"♓"
// HTML 7001 | JS-SCRIPT 7: 3355
    }[sign] || "✨";
// HTML 7002 | JS-SCRIPT 7: 3356

// HTML 7003 | JS-SCRIPT 7: 3357
    return {
// HTML 7004 | JS-SCRIPT 7: 3358
      name:
// HTML 7005 | JS-SCRIPT 7: 3359
        astromatchV212ProfileName(
// HTML 7006 | JS-SCRIPT 7: 3360
          profile,
// HTML 7007 | JS-SCRIPT 7: 3361
          "Profil"
// HTML 7008 | JS-SCRIPT 7: 3362
        ),
// HTML 7009 | JS-SCRIPT 7: 3363
      city,
// HTML 7010 | JS-SCRIPT 7: 3364
      signIcon
// HTML 7011 | JS-SCRIPT 7: 3365
    };
// HTML 7012 | JS-SCRIPT 7: 3366
  }
// HTML 7013 | JS-SCRIPT 7: 3367

// HTML 7014 | JS-SCRIPT 7: 3368
  const aInfo = info(profiles[ia]);
// HTML 7015 | JS-SCRIPT 7: 3369
  const bInfo = info(profiles[ib]);
// HTML 7016 | JS-SCRIPT 7: 3370

// HTML 7017 | JS-SCRIPT 7: 3371
  root.innerHTML = `
// HTML 7018 | JS-SCRIPT 7: 3372
    <div class="astromatch-v211-selector-card">
// HTML 7019 | JS-SCRIPT 7: 3373

// HTML 7020 | JS-SCRIPT 7: 3374
      <div class="astromatch-v211-selector-title">
// HTML 7021 | JS-SCRIPT 7: 3375
        👥 Choisir les personnes à comparer
// HTML 7022 | JS-SCRIPT 7: 3376
      </div>
// HTML 7023 | JS-SCRIPT 7: 3377

// HTML 7024 | JS-SCRIPT 7: 3378
      <div class="astromatch-v211-selector-grid">
// HTML 7025 | JS-SCRIPT 7: 3379

// HTML 7026 | JS-SCRIPT 7: 3380
        <div class="astromatch-v211-person">
// HTML 7027 | JS-SCRIPT 7: 3381

// HTML 7028 | JS-SCRIPT 7: 3382
          <span class="astromatch-v211-person-label">
// HTML 7029 | JS-SCRIPT 7: 3383
            Personne A
// HTML 7030 | JS-SCRIPT 7: 3384
          </span>
// HTML 7031 | JS-SCRIPT 7: 3385

// HTML 7032 | JS-SCRIPT 7: 3386
          <div class="astromatch-v211-person-box">
// HTML 7033 | JS-SCRIPT 7: 3387

// HTML 7034 | JS-SCRIPT 7: 3388
            <select id="astromatchCompareA">
// HTML 7035 | JS-SCRIPT 7: 3389
              ${profiles.map(
// HTML 7036 | JS-SCRIPT 7: 3390
                (profile, index) => `
// HTML 7037 | JS-SCRIPT 7: 3391
                  <option
// HTML 7038 | JS-SCRIPT 7: 3392
                    value="${index}"
// HTML 7039 | JS-SCRIPT 7: 3393
                    ${index === ia ? "selected" : ""}
// HTML 7040 | JS-SCRIPT 7: 3394
                  >
// HTML 7041 | JS-SCRIPT 7: 3395
                    ${astromatchV212Escape(
// HTML 7042 | JS-SCRIPT 7: 3396
                      astromatchV212ProfileName(
// HTML 7043 | JS-SCRIPT 7: 3397
                        profile,
// HTML 7044 | JS-SCRIPT 7: 3398
                        "Profil"
// HTML 7045 | JS-SCRIPT 7: 3399
                      )
// HTML 7046 | JS-SCRIPT 7: 3400
                    )}
// HTML 7047 | JS-SCRIPT 7: 3401
                  </option>
// HTML 7048 | JS-SCRIPT 7: 3402
                `
// HTML 7049 | JS-SCRIPT 7: 3403
              ).join("")}
// HTML 7050 | JS-SCRIPT 7: 3404
            </select>
// HTML 7051 | JS-SCRIPT 7: 3405

// HTML 7052 | JS-SCRIPT 7: 3406
          </div>
// HTML 7053 | JS-SCRIPT 7: 3407

// HTML 7054 | JS-SCRIPT 7: 3408
          <div
// HTML 7055 | JS-SCRIPT 7: 3409
            id="astromatchCompareAInfo"
// HTML 7056 | JS-SCRIPT 7: 3410
            class="astromatch-v211-person-info"
// HTML 7057 | JS-SCRIPT 7: 3411
          >
// HTML 7058 | JS-SCRIPT 7: 3412
            <div class="astromatch-v211-person-main">
// HTML 7059 | JS-SCRIPT 7: 3413
              <span class="astromatch-v211-person-sign">
// HTML 7060 | JS-SCRIPT 7: 3414
                ${aInfo.signIcon}
// HTML 7061 | JS-SCRIPT 7: 3415
              </span>
// HTML 7062 | JS-SCRIPT 7: 3416
              <span class="astromatch-v211-person-name">
// HTML 7063 | JS-SCRIPT 7: 3417
                ${astromatchV212Escape(aInfo.name)}
// HTML 7064 | JS-SCRIPT 7: 3418
              </span>
// HTML 7065 | JS-SCRIPT 7: 3419
            </div>
// HTML 7066 | JS-SCRIPT 7: 3420

// HTML 7067 | JS-SCRIPT 7: 3421
            ${
// HTML 7068 | JS-SCRIPT 7: 3422
              aInfo.city
// HTML 7069 | JS-SCRIPT 7: 3423
                ? `
// HTML 7070 | JS-SCRIPT 7: 3424
                  <div class="astromatch-v211-person-place">
// HTML 7071 | JS-SCRIPT 7: 3425
                    📍 ${astromatchV212Escape(aInfo.city)}
// HTML 7072 | JS-SCRIPT 7: 3426
                  </div>
// HTML 7073 | JS-SCRIPT 7: 3427
                `
// HTML 7074 | JS-SCRIPT 7: 3428
                : ""
// HTML 7075 | JS-SCRIPT 7: 3429
            }
// HTML 7076 | JS-SCRIPT 7: 3430
          </div>
// HTML 7077 | JS-SCRIPT 7: 3431

// HTML 7078 | JS-SCRIPT 7: 3432
        </div>
// HTML 7079 | JS-SCRIPT 7: 3433

// HTML 7080 | JS-SCRIPT 7: 3434
        <button
// HTML 7081 | JS-SCRIPT 7: 3435
          type="button"
// HTML 7082 | JS-SCRIPT 7: 3436
          id="astromatchCompareSwapV211"
// HTML 7083 | JS-SCRIPT 7: 3437
          class="astromatch-v211-swap"
// HTML 7084 | JS-SCRIPT 7: 3438
          aria-label="Inverser les profils"
// HTML 7085 | JS-SCRIPT 7: 3439
          title="Inverser les profils"
// HTML 7086 | JS-SCRIPT 7: 3440
        >
// HTML 7087 | JS-SCRIPT 7: 3441
          ⇄
// HTML 7088 | JS-SCRIPT 7: 3442
        </button>
// HTML 7089 | JS-SCRIPT 7: 3443

// HTML 7090 | JS-SCRIPT 7: 3444
        <div class="astromatch-v211-person">
// HTML 7091 | JS-SCRIPT 7: 3445

// HTML 7092 | JS-SCRIPT 7: 3446
          <span class="astromatch-v211-person-label">
// HTML 7093 | JS-SCRIPT 7: 3447
            Personne B
// HTML 7094 | JS-SCRIPT 7: 3448
          </span>
// HTML 7095 | JS-SCRIPT 7: 3449

// HTML 7096 | JS-SCRIPT 7: 3450
          <div class="astromatch-v211-person-box">
// HTML 7097 | JS-SCRIPT 7: 3451

// HTML 7098 | JS-SCRIPT 7: 3452
            <select id="astromatchCompareB">
// HTML 7099 | JS-SCRIPT 7: 3453
              ${profiles.map(
// HTML 7100 | JS-SCRIPT 7: 3454
                (profile, index) => `
// HTML 7101 | JS-SCRIPT 7: 3455
                  <option
// HTML 7102 | JS-SCRIPT 7: 3456
                    value="${index}"
// HTML 7103 | JS-SCRIPT 7: 3457
                    ${index === ib ? "selected" : ""}
// HTML 7104 | JS-SCRIPT 7: 3458
                  >
// HTML 7105 | JS-SCRIPT 7: 3459
                    ${astromatchV212Escape(
// HTML 7106 | JS-SCRIPT 7: 3460
                      astromatchV212ProfileName(
// HTML 7107 | JS-SCRIPT 7: 3461
                        profile,
// HTML 7108 | JS-SCRIPT 7: 3462
                        "Profil"
// HTML 7109 | JS-SCRIPT 7: 3463
                      )
// HTML 7110 | JS-SCRIPT 7: 3464
                    )}
// HTML 7111 | JS-SCRIPT 7: 3465
                  </option>
// HTML 7112 | JS-SCRIPT 7: 3466
                `
// HTML 7113 | JS-SCRIPT 7: 3467
              ).join("")}
// HTML 7114 | JS-SCRIPT 7: 3468
            </select>
// HTML 7115 | JS-SCRIPT 7: 3469

// HTML 7116 | JS-SCRIPT 7: 3470
          </div>
// HTML 7117 | JS-SCRIPT 7: 3471

// HTML 7118 | JS-SCRIPT 7: 3472
          <div
// HTML 7119 | JS-SCRIPT 7: 3473
            id="astromatchCompareBInfo"
// HTML 7120 | JS-SCRIPT 7: 3474
            class="astromatch-v211-person-info"
// HTML 7121 | JS-SCRIPT 7: 3475
          >
// HTML 7122 | JS-SCRIPT 7: 3476
            <div class="astromatch-v211-person-main">
// HTML 7123 | JS-SCRIPT 7: 3477
              <span class="astromatch-v211-person-sign">
// HTML 7124 | JS-SCRIPT 7: 3478
                ${bInfo.signIcon}
// HTML 7125 | JS-SCRIPT 7: 3479
              </span>
// HTML 7126 | JS-SCRIPT 7: 3480
              <span class="astromatch-v211-person-name">
// HTML 7127 | JS-SCRIPT 7: 3481
                ${astromatchV212Escape(bInfo.name)}
// HTML 7128 | JS-SCRIPT 7: 3482
              </span>
// HTML 7129 | JS-SCRIPT 7: 3483
            </div>
// HTML 7130 | JS-SCRIPT 7: 3484

// HTML 7131 | JS-SCRIPT 7: 3485
            ${
// HTML 7132 | JS-SCRIPT 7: 3486
              bInfo.city
// HTML 7133 | JS-SCRIPT 7: 3487
                ? `
// HTML 7134 | JS-SCRIPT 7: 3488
                  <div class="astromatch-v211-person-place">
// HTML 7135 | JS-SCRIPT 7: 3489
                    📍 ${astromatchV212Escape(bInfo.city)}
// HTML 7136 | JS-SCRIPT 7: 3490
                  </div>
// HTML 7137 | JS-SCRIPT 7: 3491
                `
// HTML 7138 | JS-SCRIPT 7: 3492
                : ""
// HTML 7139 | JS-SCRIPT 7: 3493
            }
// HTML 7140 | JS-SCRIPT 7: 3494
          </div>
// HTML 7141 | JS-SCRIPT 7: 3495

// HTML 7142 | JS-SCRIPT 7: 3496
        </div>
// HTML 7143 | JS-SCRIPT 7: 3497

// HTML 7144 | JS-SCRIPT 7: 3498
      </div>
// HTML 7145 | JS-SCRIPT 7: 3499

// HTML 7146 | JS-SCRIPT 7: 3500
      <div
// HTML 7147 | JS-SCRIPT 7: 3501
        id="astromatchCompareSelectorStatusV21"
// HTML 7148 | JS-SCRIPT 7: 3502
        class="astromatch-v211-selector-status"
// HTML 7149 | JS-SCRIPT 7: 3503
      >
// HTML 7150 | JS-SCRIPT 7: 3504
        <strong>${astromatchV212Escape(aInfo.name)}</strong>
// HTML 7151 | JS-SCRIPT 7: 3505
        ↔
// HTML 7152 | JS-SCRIPT 7: 3506
        <strong>${astromatchV212Escape(bInfo.name)}</strong>
// HTML 7153 | JS-SCRIPT 7: 3507
      </div>
// HTML 7154 | JS-SCRIPT 7: 3508

// HTML 7155 | JS-SCRIPT 7: 3509
    </div>
// HTML 7156 | JS-SCRIPT 7: 3510
  `;
// HTML 7157 | JS-SCRIPT 7: 3511

// HTML 7158 | JS-SCRIPT 7: 3512
  const a =
// HTML 7159 | JS-SCRIPT 7: 3513
    document.getElementById(
// HTML 7160 | JS-SCRIPT 7: 3514
      "astromatchCompareA"
// HTML 7161 | JS-SCRIPT 7: 3515
    );
// HTML 7162 | JS-SCRIPT 7: 3516

// HTML 7163 | JS-SCRIPT 7: 3517
  const b =
// HTML 7164 | JS-SCRIPT 7: 3518
    document.getElementById(
// HTML 7165 | JS-SCRIPT 7: 3519
      "astromatchCompareB"
// HTML 7166 | JS-SCRIPT 7: 3520
    );
// HTML 7167 | JS-SCRIPT 7: 3521

// HTML 7168 | JS-SCRIPT 7: 3522
  const swap =
// HTML 7169 | JS-SCRIPT 7: 3523
    document.getElementById(
// HTML 7170 | JS-SCRIPT 7: 3524
      "astromatchCompareSwapV211"
// HTML 7171 | JS-SCRIPT 7: 3525
    );
// HTML 7172 | JS-SCRIPT 7: 3526

// HTML 7173 | JS-SCRIPT 7: 3527
  if (!a || !b) return;
// HTML 7174 | JS-SCRIPT 7: 3528

// HTML 7175 | JS-SCRIPT 7: 3529
  async function update() {
// HTML 7176 | JS-SCRIPT 7: 3530

// HTML 7177 | JS-SCRIPT 7: 3531
    let indexA =
// HTML 7178 | JS-SCRIPT 7: 3532
      Number(a.value);
// HTML 7179 | JS-SCRIPT 7: 3533

// HTML 7180 | JS-SCRIPT 7: 3534
    let indexB =
// HTML 7181 | JS-SCRIPT 7: 3535
      Number(b.value);
// HTML 7182 | JS-SCRIPT 7: 3536

// HTML 7183 | JS-SCRIPT 7: 3537
    if (
// HTML 7184 | JS-SCRIPT 7: 3538
      indexA === indexB &&
// HTML 7185 | JS-SCRIPT 7: 3539
      profiles.length > 1
// HTML 7186 | JS-SCRIPT 7: 3540
    ) {
// HTML 7187 | JS-SCRIPT 7: 3541
      indexB =
// HTML 7188 | JS-SCRIPT 7: 3542
        indexA === 0
// HTML 7189 | JS-SCRIPT 7: 3543
          ? 1
// HTML 7190 | JS-SCRIPT 7: 3544
          : 0;
// HTML 7191 | JS-SCRIPT 7: 3545

// HTML 7192 | JS-SCRIPT 7: 3546
      b.value =
// HTML 7193 | JS-SCRIPT 7: 3547
        String(indexB);
// HTML 7194 | JS-SCRIPT 7: 3548
    }
// HTML 7195 | JS-SCRIPT 7: 3549

// HTML 7196 | JS-SCRIPT 7: 3550
    const profileA =
// HTML 7197 | JS-SCRIPT 7: 3551
      profiles[indexA];
// HTML 7198 | JS-SCRIPT 7: 3552

// HTML 7199 | JS-SCRIPT 7: 3553
    const profileB =
// HTML 7200 | JS-SCRIPT 7: 3554
      profiles[indexB];
// HTML 7201 | JS-SCRIPT 7: 3555

// HTML 7202 | JS-SCRIPT 7: 3556
    window.__astromatchComparatorV212 = {
// HTML 7203 | JS-SCRIPT 7: 3557
      profileA,
// HTML 7204 | JS-SCRIPT 7: 3558
      profileB,
// HTML 7205 | JS-SCRIPT 7: 3559
      indexA,
// HTML 7206 | JS-SCRIPT 7: 3560
      indexB,
// HTML 7207 | JS-SCRIPT 7: 3561
      result: null
// HTML 7208 | JS-SCRIPT 7: 3562
    };
// HTML 7209 | JS-SCRIPT 7: 3563

// HTML 7210 | JS-SCRIPT 7: 3564
    const ai = info(profileA);
// HTML 7211 | JS-SCRIPT 7: 3565
    const bi = info(profileB);
// HTML 7212 | JS-SCRIPT 7: 3566

// HTML 7213 | JS-SCRIPT 7: 3567
    const aInfoEl =
// HTML 7214 | JS-SCRIPT 7: 3568
      document.getElementById(
// HTML 7215 | JS-SCRIPT 7: 3569
        "astromatchCompareAInfo"
// HTML 7216 | JS-SCRIPT 7: 3570
      );
// HTML 7217 | JS-SCRIPT 7: 3571

// HTML 7218 | JS-SCRIPT 7: 3572
    const bInfoEl =
// HTML 7219 | JS-SCRIPT 7: 3573
      document.getElementById(
// HTML 7220 | JS-SCRIPT 7: 3574
        "astromatchCompareBInfo"
// HTML 7221 | JS-SCRIPT 7: 3575
      );
// HTML 7222 | JS-SCRIPT 7: 3576

// HTML 7223 | JS-SCRIPT 7: 3577
    if (aInfoEl) {
// HTML 7224 | JS-SCRIPT 7: 3578
      aInfoEl.innerHTML = `
// HTML 7225 | JS-SCRIPT 7: 3579
        <div class="astromatch-v211-person-main">
// HTML 7226 | JS-SCRIPT 7: 3580
          <span class="astromatch-v211-person-sign">
// HTML 7227 | JS-SCRIPT 7: 3581
            ${ai.signIcon}
// HTML 7228 | JS-SCRIPT 7: 3582
          </span>
// HTML 7229 | JS-SCRIPT 7: 3583
          <span class="astromatch-v211-person-name">
// HTML 7230 | JS-SCRIPT 7: 3584
            ${astromatchV212Escape(ai.name)}
// HTML 7231 | JS-SCRIPT 7: 3585
          </span>
// HTML 7232 | JS-SCRIPT 7: 3586
        </div>
// HTML 7233 | JS-SCRIPT 7: 3587
        ${
// HTML 7234 | JS-SCRIPT 7: 3588
          ai.city
// HTML 7235 | JS-SCRIPT 7: 3589
            ? `
// HTML 7236 | JS-SCRIPT 7: 3590
              <div class="astromatch-v211-person-place">
// HTML 7237 | JS-SCRIPT 7: 3591
                📍 ${astromatchV212Escape(ai.city)}
// HTML 7238 | JS-SCRIPT 7: 3592
              </div>
// HTML 7239 | JS-SCRIPT 7: 3593
            `
// HTML 7240 | JS-SCRIPT 7: 3594
            : ""
// HTML 7241 | JS-SCRIPT 7: 3595
        }
// HTML 7242 | JS-SCRIPT 7: 3596
      `;
// HTML 7243 | JS-SCRIPT 7: 3597
    }
// HTML 7244 | JS-SCRIPT 7: 3598

// HTML 7245 | JS-SCRIPT 7: 3599
    if (bInfoEl) {
// HTML 7246 | JS-SCRIPT 7: 3600
      bInfoEl.innerHTML = `
// HTML 7247 | JS-SCRIPT 7: 3601
        <div class="astromatch-v211-person-main">
// HTML 7248 | JS-SCRIPT 7: 3602
          <span class="astromatch-v211-person-sign">
// HTML 7249 | JS-SCRIPT 7: 3603
            ${bi.signIcon}
// HTML 7250 | JS-SCRIPT 7: 3604
          </span>
// HTML 7251 | JS-SCRIPT 7: 3605
          <span class="astromatch-v211-person-name">
// HTML 7252 | JS-SCRIPT 7: 3606
            ${astromatchV212Escape(bi.name)}
// HTML 7253 | JS-SCRIPT 7: 3607
          </span>
// HTML 7254 | JS-SCRIPT 7: 3608
        </div>
// HTML 7255 | JS-SCRIPT 7: 3609
        ${
// HTML 7256 | JS-SCRIPT 7: 3610
          bi.city
// HTML 7257 | JS-SCRIPT 7: 3611
            ? `
// HTML 7258 | JS-SCRIPT 7: 3612
              <div class="astromatch-v211-person-place">
// HTML 7259 | JS-SCRIPT 7: 3613
                📍 ${astromatchV212Escape(bi.city)}
// HTML 7260 | JS-SCRIPT 7: 3614
              </div>
// HTML 7261 | JS-SCRIPT 7: 3615
            `
// HTML 7262 | JS-SCRIPT 7: 3616
            : ""
// HTML 7263 | JS-SCRIPT 7: 3617
        }
// HTML 7264 | JS-SCRIPT 7: 3618
      `;
// HTML 7265 | JS-SCRIPT 7: 3619
    }
// HTML 7266 | JS-SCRIPT 7: 3620

// HTML 7267 | JS-SCRIPT 7: 3621
    const status =
// HTML 7268 | JS-SCRIPT 7: 3622
      document.getElementById(
// HTML 7269 | JS-SCRIPT 7: 3623
        "astromatchCompareSelectorStatusV21"
// HTML 7270 | JS-SCRIPT 7: 3624
      );
// HTML 7271 | JS-SCRIPT 7: 3625

// HTML 7272 | JS-SCRIPT 7: 3626
    if (status) {
// HTML 7273 | JS-SCRIPT 7: 3627
      status.innerHTML =
// HTML 7274 | JS-SCRIPT 7: 3628
        `<strong>${astromatchV212Escape(ai.name)}</strong>
// HTML 7275 | JS-SCRIPT 7: 3629
         ↔
// HTML 7276 | JS-SCRIPT 7: 3630
         <strong>${astromatchV212Escape(bi.name)}</strong>`;
// HTML 7277 | JS-SCRIPT 7: 3631
    }
// HTML 7278 | JS-SCRIPT 7: 3632

// HTML 7279 | JS-SCRIPT 7: 3633
    await astromatchV212Run();
// HTML 7280 | JS-SCRIPT 7: 3634
  }
// HTML 7281 | JS-SCRIPT 7: 3635

// HTML 7282 | JS-SCRIPT 7: 3636
  a.addEventListener(
// HTML 7283 | JS-SCRIPT 7: 3637
    "change",
// HTML 7284 | JS-SCRIPT 7: 3638
    () => {
// HTML 7285 | JS-SCRIPT 7: 3639
      update().catch(console.error);
// HTML 7286 | JS-SCRIPT 7: 3640
    }
// HTML 7287 | JS-SCRIPT 7: 3641
  );
// HTML 7288 | JS-SCRIPT 7: 3642

// HTML 7289 | JS-SCRIPT 7: 3643
  b.addEventListener(
// HTML 7290 | JS-SCRIPT 7: 3644
    "change",
// HTML 7291 | JS-SCRIPT 7: 3645
    () => {
// HTML 7292 | JS-SCRIPT 7: 3646
      update().catch(console.error);
// HTML 7293 | JS-SCRIPT 7: 3647
    }
// HTML 7294 | JS-SCRIPT 7: 3648
  );
// HTML 7295 | JS-SCRIPT 7: 3649

// HTML 7296 | JS-SCRIPT 7: 3650
  swap?.addEventListener(
// HTML 7297 | JS-SCRIPT 7: 3651
    "click",
// HTML 7298 | JS-SCRIPT 7: 3652
    () => {
// HTML 7299 | JS-SCRIPT 7: 3653
      const oldA = a.value;
// HTML 7300 | JS-SCRIPT 7: 3654
      a.value = b.value;
// HTML 7301 | JS-SCRIPT 7: 3655
      b.value = oldA;
// HTML 7302 | JS-SCRIPT 7: 3656
      update().catch(console.error);
// HTML 7303 | JS-SCRIPT 7: 3657
    }
// HTML 7304 | JS-SCRIPT 7: 3658
  );
// HTML 7305 | JS-SCRIPT 7: 3659

// HTML 7306 | JS-SCRIPT 7: 3660
  window.__astromatchComparatorV212 = {
// HTML 7307 | JS-SCRIPT 7: 3661
    profileA: profiles[ia],
// HTML 7308 | JS-SCRIPT 7: 3662
    profileB: profiles[ib],
// HTML 7309 | JS-SCRIPT 7: 3663
    indexA: ia,
// HTML 7310 | JS-SCRIPT 7: 3664
    indexB: ib,
// HTML 7311 | JS-SCRIPT 7: 3665
    result: null
// HTML 7312 | JS-SCRIPT 7: 3666
  };
// HTML 7313 | JS-SCRIPT 7: 3667
}
// HTML 7314 | JS-SCRIPT 7: 3668

// HTML 7315 | JS-SCRIPT 7: 3669

// HTML 7316 | JS-SCRIPT 7: 3670
function astromatchInitComparatorV21() {
// HTML 7317 | JS-SCRIPT 7: 3671
  try {
// HTML 7318 | JS-SCRIPT 7: 3672
    astromatchBuildProfileSelectorsV211();
// HTML 7319 | JS-SCRIPT 7: 3673
  } catch (error) {
// HTML 7320 | JS-SCRIPT 7: 3674
    console.warn(
// HTML 7321 | JS-SCRIPT 7: 3675
      "AstroMatch Comparator V2.1.2 init :",
// HTML 7322 | JS-SCRIPT 7: 3676
      error
// HTML 7323 | JS-SCRIPT 7: 3677
    );
// HTML 7324 | JS-SCRIPT 7: 3678
  }
// HTML 7325 | JS-SCRIPT 7: 3679
}
// HTML 7326 | JS-SCRIPT 7: 3680

// HTML 7327 | JS-SCRIPT 7: 3681
window.astromatchInitComparatorV21 =
// HTML 7328 | JS-SCRIPT 7: 3682
  astromatchInitComparatorV21;
// HTML 7329 | JS-SCRIPT 7: 3683

// HTML 7330 | JS-SCRIPT 7: 3684
// ============================================================
// HTML 7331 | JS-SCRIPT 7: 3685
// FIN ASTROMATCH COMPARATOR V2.1.2
// HTML 7332 | JS-SCRIPT 7: 3686
// ============================================================
// HTML 7333 | JS-SCRIPT 7: 3687

// HTML 7334 | JS-SCRIPT 7: 3688

// HTML 7335 | JS-SCRIPT 7: 3689

// HTML 7336 | JS-SCRIPT 7: 3690
async function start() {
// HTML 7337 | JS-SCRIPT 7: 3691
  try {
// HTML 7338 | JS-SCRIPT 7: 3692
    window.__astromatchStatus("Lecture des profils AstroMatch…");
// HTML 7339 | JS-SCRIPT 7: 3693

// HTML 7340 | JS-SCRIPT 7: 3694
    const {
// HTML 7341 | JS-SCRIPT 7: 3695
      primary,
// HTML 7342 | JS-SCRIPT 7: 3696
      targets
// HTML 7343 | JS-SCRIPT 7: 3697
    } = getRealProfiles();
// HTML 7344 | JS-SCRIPT 7: 3698

// HTML 7345 | JS-SCRIPT 7: 3699
    ASTROMATCH_PRIMARY_PROFILE =
// HTML 7346 | JS-SCRIPT 7: 3700
      primary;
// HTML 7347 | JS-SCRIPT 7: 3701

// HTML 7348 | JS-SCRIPT 7: 3702
    renderPrimaryProfileCard(primary);
// HTML 7349 | JS-SCRIPT 7: 3703

// HTML 7350 | JS-SCRIPT 7: 3704
    initializeTargetSelector(
// HTML 7351 | JS-SCRIPT 7: 3705
      targets
// HTML 7352 | JS-SCRIPT 7: 3706
    );
// HTML 7353 | JS-SCRIPT 7: 3707

// HTML 7354 | JS-SCRIPT 7: 3708
    const selectedTarget =
// HTML 7355 | JS-SCRIPT 7: 3709
      ASTROMATCH_SELECTED_TARGET;
// HTML 7356 | JS-SCRIPT 7: 3710

// HTML 7357 | JS-SCRIPT 7: 3711
    const primaryName =
// HTML 7358 | JS-SCRIPT 7: 3712
      primary.identity?.first_name ||
// HTML 7359 | JS-SCRIPT 7: 3713
      primary.first_name ||
// HTML 7360 | JS-SCRIPT 7: 3714
      "Profil principal";
// HTML 7361 | JS-SCRIPT 7: 3715

// HTML 7362 | JS-SCRIPT 7: 3716
    const targetName =
// HTML 7363 | JS-SCRIPT 7: 3717
      selectedTarget?.identity?.first_name ||
// HTML 7364 | JS-SCRIPT 7: 3718
      selectedTarget?.first_name ||
// HTML 7365 | JS-SCRIPT 7: 3719
      "Profil cible";
// HTML 7366 | JS-SCRIPT 7: 3720

// HTML 7367 | JS-SCRIPT 7: 3721
    const primaryElement =
// HTML 7368 | JS-SCRIPT 7: 3722
      document.getElementById("primaryName");
// HTML 7369 | JS-SCRIPT 7: 3723

// HTML 7370 | JS-SCRIPT 7: 3724
    const targetElement =
// HTML 7371 | JS-SCRIPT 7: 3725
      document.getElementById("targetName");
// HTML 7372 | JS-SCRIPT 7: 3726

// HTML 7373 | JS-SCRIPT 7: 3727
    if (primaryElement) {
// HTML 7374 | JS-SCRIPT 7: 3728
      primaryElement.textContent =
// HTML 7375 | JS-SCRIPT 7: 3729
        primaryName;
// HTML 7376 | JS-SCRIPT 7: 3730
    }
// HTML 7377 | JS-SCRIPT 7: 3731

// HTML 7378 | JS-SCRIPT 7: 3732
    if (targetElement) {
// HTML 7379 | JS-SCRIPT 7: 3733
      targetElement.textContent =
// HTML 7380 | JS-SCRIPT 7: 3734
        targetName;
// HTML 7381 | JS-SCRIPT 7: 3735
    }
// HTML 7382 | JS-SCRIPT 7: 3736

// HTML 7383 | JS-SCRIPT 7: 3737
    /*
// HTML 7384 | JS-SCRIPT 7: 3738
     * calculateSelectedTarget() est asynchrone.
// HTML 7385 | JS-SCRIPT 7: 3739
     * On attend réellement le résultat avant
// HTML 7386 | JS-SCRIPT 7: 3740
     * d'accéder à result.global / result.domains.
// HTML 7387 | JS-SCRIPT 7: 3741
     */
// HTML 7388 | JS-SCRIPT 7: 3742
    const result =
// HTML 7389 | JS-SCRIPT 7: 3743
      await calculateSelectedTarget();
// HTML 7390 | JS-SCRIPT 7: 3744

// HTML 7391 | JS-SCRIPT 7: 3745
    if (!result || !result.global) {
// HTML 7392 | JS-SCRIPT 7: 3746
      throw new Error(
// HTML 7393 | JS-SCRIPT 7: 3747
        "RESULTAT_MATCH_INVALIDE"
// HTML 7394 | JS-SCRIPT 7: 3748
      );
// HTML 7395 | JS-SCRIPT 7: 3749
    }
// HTML 7396 | JS-SCRIPT 7: 3750

// HTML 7397 | JS-SCRIPT 7: 3751
    const global = result.global;
// HTML 7398 | JS-SCRIPT 7: 3752

// HTML 7399 | JS-SCRIPT 7: 3753
    window.__astromatchStatus(
// HTML 7400 | JS-SCRIPT 7: 3754
      `Calcul réel terminé — ${Math.round(Number(global.score) || 0)}/100`
// HTML 7401 | JS-SCRIPT 7: 3755
    );
// HTML 7402 | JS-SCRIPT 7: 3756

// HTML 7403 | JS-SCRIPT 7: 3757
    const globalScore =
// HTML 7404 | JS-SCRIPT 7: 3758
      document.getElementById("globalScore");
// HTML 7405 | JS-SCRIPT 7: 3759

// HTML 7406 | JS-SCRIPT 7: 3760
    if (globalScore) {
// HTML 7407 | JS-SCRIPT 7: 3761
      globalScore.textContent =
// HTML 7408 | JS-SCRIPT 7: 3762
        Math.round(Number(global.score) || 0);
// HTML 7409 | JS-SCRIPT 7: 3763
    }
// HTML 7410 | JS-SCRIPT 7: 3764

// HTML 7411 | JS-SCRIPT 7: 3765
    const globalLabel =
// HTML 7412 | JS-SCRIPT 7: 3766
      document.getElementById("globalLabel");
// HTML 7413 | JS-SCRIPT 7: 3767

// HTML 7414 | JS-SCRIPT 7: 3768
    if (globalLabel) {
// HTML 7415 | JS-SCRIPT 7: 3769
      globalLabel.textContent =
// HTML 7416 | JS-SCRIPT 7: 3770
        global.label || "";
// HTML 7417 | JS-SCRIPT 7: 3771
    }
// HTML 7418 | JS-SCRIPT 7: 3772

// HTML 7419 | JS-SCRIPT 7: 3773
    const summary =
// HTML 7420 | JS-SCRIPT 7: 3774
      document.getElementById("summary");
// HTML 7421 | JS-SCRIPT 7: 3775

// HTML 7422 | JS-SCRIPT 7: 3776
    if (summary) {
// HTML 7423 | JS-SCRIPT 7: 3777
      summary.textContent =
// HTML 7424 | JS-SCRIPT 7: 3778
        result.summary ||
// HTML 7425 | JS-SCRIPT 7: 3779
        "Compatibilité calculée par le moteur AstroMatch.";
// HTML 7426 | JS-SCRIPT 7: 3780
    }
// HTML 7427 | JS-SCRIPT 7: 3781

// HTML 7428 | JS-SCRIPT 7: 3782
    /*
// HTML 7429 | JS-SCRIPT 7: 3783
     * Les noms retournés par l'API deviennent
// HTML 7430 | JS-SCRIPT 7: 3784
     * la source de vérité après calcul.
// HTML 7431 | JS-SCRIPT 7: 3785
     */
// HTML 7432 | JS-SCRIPT 7: 3786
    if (result.profiles?.primary?.name && primaryElement) {
// HTML 7433 | JS-SCRIPT 7: 3787
      primaryElement.textContent =
// HTML 7434 | JS-SCRIPT 7: 3788
        result.profiles.primary.name;
// HTML 7435 | JS-SCRIPT 7: 3789
    }
// HTML 7436 | JS-SCRIPT 7: 3790

// HTML 7437 | JS-SCRIPT 7: 3791
    if (result.profiles?.target?.name && targetElement) {
// HTML 7438 | JS-SCRIPT 7: 3792
      targetElement.textContent =
// HTML 7439 | JS-SCRIPT 7: 3793
        result.profiles.target.name;
// HTML 7440 | JS-SCRIPT 7: 3794
    }
// HTML 7441 | JS-SCRIPT 7: 3795

// HTML 7442 | JS-SCRIPT 7: 3796
    renderDomains(result.domains);
// HTML 7443 | JS-SCRIPT 7: 3797

// HTML 7444 | JS-SCRIPT 7: 3798
    if (
// HTML 7445 | JS-SCRIPT 7: 3799
      typeof window.setAstroMatchRelationshipResult ===
// HTML 7446 | JS-SCRIPT 7: 3800
      "function"
// HTML 7447 | JS-SCRIPT 7: 3801
    ) {
// HTML 7448 | JS-SCRIPT 7: 3802
      window.setAstroMatchRelationshipResult(result);
// HTML 7449 | JS-SCRIPT 7: 3803
    }
// HTML 7450 | JS-SCRIPT 7: 3804

// HTML 7451 | JS-SCRIPT 7: 3805
    renderList(
// HTML 7452 | JS-SCRIPT 7: 3806
      "highlights",
// HTML 7453 | JS-SCRIPT 7: 3807
      result.highlights,
// HTML 7454 | JS-SCRIPT 7: 3808
      "Aucun point marquant."
// HTML 7455 | JS-SCRIPT 7: 3809
    );
// HTML 7456 | JS-SCRIPT 7: 3810

// HTML 7457 | JS-SCRIPT 7: 3811
    renderList(
// HTML 7458 | JS-SCRIPT 7: 3812
      "warnings",
// HTML 7459 | JS-SCRIPT 7: 3813
      result.warnings,
// HTML 7460 | JS-SCRIPT 7: 3814
      "Aucun avertissement."
// HTML 7461 | JS-SCRIPT 7: 3815
    );
// HTML 7462 | JS-SCRIPT 7: 3816

// HTML 7463 | JS-SCRIPT 7: 3817
    renderList(
// HTML 7464 | JS-SCRIPT 7: 3818
      "topStrengths",
// HTML 7465 | JS-SCRIPT 7: 3819
      result.top_strengths,
// HTML 7466 | JS-SCRIPT 7: 3820
      "Aucun point fort majeur."
// HTML 7467 | JS-SCRIPT 7: 3821
    );
// HTML 7468 | JS-SCRIPT 7: 3822

// HTML 7469 | JS-SCRIPT 7: 3823
    renderList(
// HTML 7470 | JS-SCRIPT 7: 3824
      "topTensions",
// HTML 7471 | JS-SCRIPT 7: 3825
      result.top_tensions,
// HTML 7472 | JS-SCRIPT 7: 3826
      "Aucune tension majeure."
// HTML 7473 | JS-SCRIPT 7: 3827
    );
// HTML 7474 | JS-SCRIPT 7: 3828

// HTML 7475 | JS-SCRIPT 7: 3829
    renderReliability(
// HTML 7476 | JS-SCRIPT 7: 3830
      result.reliability
// HTML 7477 | JS-SCRIPT 7: 3831
    );
// HTML 7478 | JS-SCRIPT 7: 3832

// HTML 7479 | JS-SCRIPT 7: 3833
    console.log(
// HTML 7480 | JS-SCRIPT 7: 3834
      "ASTROMATCH REAL PROFILE",
// HTML 7481 | JS-SCRIPT 7: 3835
      {
// HTML 7482 | JS-SCRIPT 7: 3836
        primary,
// HTML 7483 | JS-SCRIPT 7: 3837
        target: selectedTarget
// HTML 7484 | JS-SCRIPT 7: 3838
      }
// HTML 7485 | JS-SCRIPT 7: 3839
    );
// HTML 7486 | JS-SCRIPT 7: 3840

// HTML 7487 | JS-SCRIPT 7: 3841
    console.log(
// HTML 7488 | JS-SCRIPT 7: 3842
      "ASTROMATCH API RESULT",
// HTML 7489 | JS-SCRIPT 7: 3843
      result
// HTML 7490 | JS-SCRIPT 7: 3844
    );
// HTML 7491 | JS-SCRIPT 7: 3845

// HTML 7492 | JS-SCRIPT 7: 3846
  } catch (error) {
// HTML 7493 | JS-SCRIPT 7: 3847

// HTML 7494 | JS-SCRIPT 7: 3848
    console.error(
// HTML 7495 | JS-SCRIPT 7: 3849
      "AstroMatch UI error:",
// HTML 7496 | JS-SCRIPT 7: 3850
      error
// HTML 7497 | JS-SCRIPT 7: 3851
    );
// HTML 7498 | JS-SCRIPT 7: 3852

// HTML 7499 | JS-SCRIPT 7: 3853
    const message =
// HTML 7500 | JS-SCRIPT 7: 3854
      error?.message ||
// HTML 7501 | JS-SCRIPT 7: 3855
      String(error);
// HTML 7502 | JS-SCRIPT 7: 3856

// HTML 7503 | JS-SCRIPT 7: 3857
    window.__astromatchStatus(
// HTML 7504 | JS-SCRIPT 7: 3858
      "ERREUR — " +
// HTML 7505 | JS-SCRIPT 7: 3859
      message
// HTML 7506 | JS-SCRIPT 7: 3860
    );
// HTML 7507 | JS-SCRIPT 7: 3861

// HTML 7508 | JS-SCRIPT 7: 3862
    const summary =
// HTML 7509 | JS-SCRIPT 7: 3863
      document.getElementById("summary");
// HTML 7510 | JS-SCRIPT 7: 3864

// HTML 7511 | JS-SCRIPT 7: 3865
    if (summary) {
// HTML 7512 | JS-SCRIPT 7: 3866

// HTML 7513 | JS-SCRIPT 7: 3867
      let readable =
// HTML 7514 | JS-SCRIPT 7: 3868
        "Impossible de calculer ce match.";
// HTML 7515 | JS-SCRIPT 7: 3869

// HTML 7516 | JS-SCRIPT 7: 3870
      if (message === "AUCUN_PROFIL_STOCKE") {
// HTML 7517 | JS-SCRIPT 7: 3871
        readable =
// HTML 7518 | JS-SCRIPT 7: 3872
          "Aucun profil AstroMatch n’est encore enregistré.";
// HTML 7519 | JS-SCRIPT 7: 3873
      }
// HTML 7520 | JS-SCRIPT 7: 3874

// HTML 7521 | JS-SCRIPT 7: 3875
      if (message === "PROFIL_PRINCIPAL_INTRouvable") {
// HTML 7522 | JS-SCRIPT 7: 3876
        readable =
// HTML 7523 | JS-SCRIPT 7: 3877
          "Aucun profil principal trouvé.";
// HTML 7524 | JS-SCRIPT 7: 3878
      }
// HTML 7525 | JS-SCRIPT 7: 3879

// HTML 7526 | JS-SCRIPT 7: 3880
      if (message === "AUCUN_PROFIL_CIBLE") {
// HTML 7527 | JS-SCRIPT 7: 3881
        readable =
// HTML 7528 | JS-SCRIPT 7: 3882
          "Aucun profil cible trouvé.";
// HTML 7529 | JS-SCRIPT 7: 3883
      }
// HTML 7530 | JS-SCRIPT 7: 3884

// HTML 7531 | JS-SCRIPT 7: 3885
      summary.textContent = readable;
// HTML 7532 | JS-SCRIPT 7: 3886
    }
// HTML 7533 | JS-SCRIPT 7: 3887
  }
// HTML 7534 | JS-SCRIPT 7: 3888
}
// HTML 7535 | JS-SCRIPT 7: 3889
window.addEventListener(
// HTML 7536 | JS-SCRIPT 7: 3890
  "error",
// HTML 7537 | JS-SCRIPT 7: 3891
  event => {
// HTML 7538 | JS-SCRIPT 7: 3892
    console.error(
// HTML 7539 | JS-SCRIPT 7: 3893
      "ASTROMATCH WINDOW ERROR",
// HTML 7540 | JS-SCRIPT 7: 3894
      event.error || event.message
// HTML 7541 | JS-SCRIPT 7: 3895
    );
// HTML 7542 | JS-SCRIPT 7: 3896
  }
// HTML 7543 | JS-SCRIPT 7: 3897
);
// HTML 7544 | JS-SCRIPT 7: 3898

// HTML 7545 | JS-SCRIPT 7: 3899
window.addEventListener(
// HTML 7546 | JS-SCRIPT 7: 3900
  "unhandledrejection",
// HTML 7547 | JS-SCRIPT 7: 3901
  event => {
// HTML 7548 | JS-SCRIPT 7: 3902
    console.error(
// HTML 7549 | JS-SCRIPT 7: 3903
      "ASTROMATCH UNHANDLED",
// HTML 7550 | JS-SCRIPT 7: 3904
      event.reason
// HTML 7551 | JS-SCRIPT 7: 3905
    );
// HTML 7552 | JS-SCRIPT 7: 3906
  }
// HTML 7553 | JS-SCRIPT 7: 3907
);
// HTML 7554 | JS-SCRIPT 7: 3908

// HTML 7555 | JS-SCRIPT 7: 3909

// HTML 7556 | JS-SCRIPT 7: 3910

// HTML 7557 | JS-SCRIPT 7: 3911
(function() {
// HTML 7558 | JS-SCRIPT 7: 3912
  function showDiag(title, value) {
// HTML 7559 | JS-SCRIPT 7: 3913
    try {
// HTML 7560 | JS-SCRIPT 7: 3914
      let box = document.getElementById("astromatchDiagBox");
// HTML 7561 | JS-SCRIPT 7: 3915

// HTML 7562 | JS-SCRIPT 7: 3916
      if (!box) {
// HTML 7563 | JS-SCRIPT 7: 3917
        box = document.createElement("pre");
// HTML 7564 | JS-SCRIPT 7: 3918
        box.id = "astromatchDiagBox";
// HTML 7565 | JS-SCRIPT 7: 3919
        box.style.cssText =
// HTML 7566 | JS-SCRIPT 7: 3920
          "position:fixed;z-index:999999;left:8px;right:8px;top:8px;" +
// HTML 7567 | JS-SCRIPT 7: 3921
          "max-height:85vh;overflow:auto;background:#111;color:#fff;" +
// HTML 7568 | JS-SCRIPT 7: 3922
          "padding:14px;border:3px solid red;border-radius:10px;" +
// HTML 7569 | JS-SCRIPT 7: 3923
          "font:13px monospace;white-space:pre-wrap;";
// HTML 7570 | JS-SCRIPT 7: 3924
        document.body.appendChild(box);
// HTML 7571 | JS-SCRIPT 7: 3925
      }
// HTML 7572 | JS-SCRIPT 7: 3926

// HTML 7573 | JS-SCRIPT 7: 3927
      box.textContent +=
// HTML 7574 | JS-SCRIPT 7: 3928
        "\\n===== " + title + " =====\\n" +
// HTML 7575 | JS-SCRIPT 7: 3929
        String(value) + "\\n";
// HTML 7576 | JS-SCRIPT 7: 3930
    } catch (_) {}
// HTML 7577 | JS-SCRIPT 7: 3931
  }
// HTML 7578 | JS-SCRIPT 7: 3932

// HTML 7579 | JS-SCRIPT 7: 3933
  window.addEventListener("error", function(e) {
// HTML 7580 | JS-SCRIPT 7: 3934
    showDiag(
// HTML 7581 | JS-SCRIPT 7: 3935
      "JAVASCRIPT ERROR",
// HTML 7582 | JS-SCRIPT 7: 3936
      e.message +
// HTML 7583 | JS-SCRIPT 7: 3937
      "\\nfile=" + e.filename +
// HTML 7584 | JS-SCRIPT 7: 3938
      "\\nline=" + e.lineno +
// HTML 7585 | JS-SCRIPT 7: 3939
      "\\ncolumn=" + e.colno +
// HTML 7586 | JS-SCRIPT 7: 3940
      "\\nerror=" + (e.error?.stack || e.error || "")
// HTML 7587 | JS-SCRIPT 7: 3941
    );
// HTML 7588 | JS-SCRIPT 7: 3942
  });
// HTML 7589 | JS-SCRIPT 7: 3943

// HTML 7590 | JS-SCRIPT 7: 3944
  window.addEventListener("unhandledrejection", function(e) {
// HTML 7591 | JS-SCRIPT 7: 3945
    showDiag(
// HTML 7592 | JS-SCRIPT 7: 3946
      "PROMISE ERROR",
// HTML 7593 | JS-SCRIPT 7: 3947
      e.reason?.stack || e.reason || "Unknown rejection"
// HTML 7594 | JS-SCRIPT 7: 3948
    );
// HTML 7595 | JS-SCRIPT 7: 3949
  });
// HTML 7596 | JS-SCRIPT 7: 3950

// HTML 7597 | JS-SCRIPT 7: 3951
  window.__astromatchDiag = showDiag;
// HTML 7598 | JS-SCRIPT 7: 3952

// HTML 7599 | JS-SCRIPT 7: 3953
  showDiag(
// HTML 7600 | JS-SCRIPT 7: 3954
    "TRACE",
// HTML 7601 | JS-SCRIPT 7: 3955
    "Traceur actif — attente du démarrage..."
// HTML 7602 | JS-SCRIPT 7: 3956
  );
// HTML 7603 | JS-SCRIPT 7: 3957
})();
// HTML 7604 | JS-SCRIPT 7: 3958

// HTML 7605 | JS-SCRIPT 7: 3959
console.log("ASTROMATCH TRACE2: script chargé");
// HTML 7606 | JS-SCRIPT 7: 3960

// HTML 7607 | JS-SCRIPT 7: 3961

// HTML 7608 | JS-SCRIPT 7: 3962

// HTML 7609 | JS-SCRIPT 7: 3963

// HTML 7610 | JS-SCRIPT 7: 3964

// HTML 7611 | JS-SCRIPT 7: 3965

// HTML 7612 | JS-SCRIPT 7: 3966
(function() {
// HTML 7613 | JS-SCRIPT 7: 3967
  function diag(msg) {
// HTML 7614 | JS-SCRIPT 7: 3968
    let box = document.getElementById("astromatchVisibleClickDiag");
// HTML 7615 | JS-SCRIPT 7: 3969

// HTML 7616 | JS-SCRIPT 7: 3970
    if (!box) {
// HTML 7617 | JS-SCRIPT 7: 3971
      box = document.createElement("pre");
// HTML 7618 | JS-SCRIPT 7: 3972
      box.id = "astromatchVisibleClickDiag";
// HTML 7619 | JS-SCRIPT 7: 3973
      box.style.cssText = `
// HTML 7620 | JS-SCRIPT 7: 3974
        position:fixed;
// HTML 7621 | JS-SCRIPT 7: 3975
        left:8px;
// HTML 7622 | JS-SCRIPT 7: 3976
        right:8px;
// HTML 7623 | JS-SCRIPT 7: 3977
        bottom:8px;
// HTML 7624 | JS-SCRIPT 7: 3978
        max-height:45vh;
// HTML 7625 | JS-SCRIPT 7: 3979
        overflow:auto;
// HTML 7626 | JS-SCRIPT 7: 3980
        z-index:999999;
// HTML 7627 | JS-SCRIPT 7: 3981
        background:#111;
// HTML 7628 | JS-SCRIPT 7: 3982
        color:#00ff88;
// HTML 7629 | JS-SCRIPT 7: 3983
        padding:12px;
// HTML 7630 | JS-SCRIPT 7: 3984
        border-radius:12px;
// HTML 7631 | JS-SCRIPT 7: 3985
        font:12px monospace;
// HTML 7632 | JS-SCRIPT 7: 3986
        white-space:pre-wrap;
// HTML 7633 | JS-SCRIPT 7: 3987
        box-shadow:0 4px 20px rgba(0,0,0,.5);
// HTML 7634 | JS-SCRIPT 7: 3988
      `;
// HTML 7635 | JS-SCRIPT 7: 3989
      document.body.appendChild(box);
// HTML 7636 | JS-SCRIPT 7: 3990
    }
// HTML 7637 | JS-SCRIPT 7: 3991

// HTML 7638 | JS-SCRIPT 7: 3992
    box.textContent += msg + "\\n";
// HTML 7639 | JS-SCRIPT 7: 3993
  }
// HTML 7640 | JS-SCRIPT 7: 3994

// HTML 7641 | JS-SCRIPT 7: 3995
  diag("VISIBLE DIAGNOSTIC START");
// HTML 7642 | JS-SCRIPT 7: 3996

// HTML 7643 | JS-SCRIPT 7: 3997
  setTimeout(function() {
// HTML 7644 | JS-SCRIPT 7: 3998
    const root =
// HTML 7645 | JS-SCRIPT 7: 3999
      document.getElementById(
// HTML 7646 | JS-SCRIPT 7: 4000
        "astromatchCompareV21Results"
// HTML 7647 | JS-SCRIPT 7: 4001
      );
// HTML 7648 | JS-SCRIPT 7: 4002

// HTML 7649 | JS-SCRIPT 7: 4003
    diag(
// HTML 7650 | JS-SCRIPT 7: 4004
      "ROOT = " +
// HTML 7651 | JS-SCRIPT 7: 4005
      (root ? "FOUND" : "ABSENT")
// HTML 7652 | JS-SCRIPT 7: 4006
    );
// HTML 7653 | JS-SCRIPT 7: 4007

// HTML 7654 | JS-SCRIPT 7: 4008
    if (!root) return;
// HTML 7655 | JS-SCRIPT 7: 4009

// HTML 7656 | JS-SCRIPT 7: 4010
    const cards =
// HTML 7657 | JS-SCRIPT 7: 4011
      root.querySelectorAll(
// HTML 7658 | JS-SCRIPT 7: 4012
        "[data-astromatch-domain-key]"
// HTML 7659 | JS-SCRIPT 7: 4013
      );
// HTML 7660 | JS-SCRIPT 7: 4014

// HTML 7661 | JS-SCRIPT 7: 4015
    diag(
// HTML 7662 | JS-SCRIPT 7: 4016
      "CARDS = " +
// HTML 7663 | JS-SCRIPT 7: 4017
      cards.length
// HTML 7664 | JS-SCRIPT 7: 4018
    );
// HTML 7665 | JS-SCRIPT 7: 4019

// HTML 7666 | JS-SCRIPT 7: 4020
    cards.forEach(function(card, i) {
// HTML 7667 | JS-SCRIPT 7: 4021
      diag(
// HTML 7668 | JS-SCRIPT 7: 4022
        "CARD " +
// HTML 7669 | JS-SCRIPT 7: 4023
        i +
// HTML 7670 | JS-SCRIPT 7: 4024
        " = " +
// HTML 7671 | JS-SCRIPT 7: 4025
        card.getAttribute(
// HTML 7672 | JS-SCRIPT 7: 4026
          "data-astromatch-domain-key"
// HTML 7673 | JS-SCRIPT 7: 4027
        ) +
// HTML 7674 | JS-SCRIPT 7: 4028
        " / " +
// HTML 7675 | JS-SCRIPT 7: 4029
        card.tagName
// HTML 7676 | JS-SCRIPT 7: 4030
      );
// HTML 7677 | JS-SCRIPT 7: 4031
    });
// HTML 7678 | JS-SCRIPT 7: 4032
  }, 5000);
// HTML 7679 | JS-SCRIPT 7: 4033

// HTML 7680 | JS-SCRIPT 7: 4034
  document.addEventListener(
// HTML 7681 | JS-SCRIPT 7: 4035
    "click",
// HTML 7682 | JS-SCRIPT 7: 4036
    function(event) {
// HTML 7683 | JS-SCRIPT 7: 4037
      const target = event.target;
// HTML 7684 | JS-SCRIPT 7: 4038

// HTML 7685 | JS-SCRIPT 7: 4039
      const card =
// HTML 7686 | JS-SCRIPT 7: 4040
        target &&
// HTML 7687 | JS-SCRIPT 7: 4041
        target.closest &&
// HTML 7688 | JS-SCRIPT 7: 4042
        target.closest(
// HTML 7689 | JS-SCRIPT 7: 4043
          "[data-astromatch-domain-key]"
// HTML 7690 | JS-SCRIPT 7: 4044
        );
// HTML 7691 | JS-SCRIPT 7: 4045

// HTML 7692 | JS-SCRIPT 7: 4046
      if (!card) return;
// HTML 7693 | JS-SCRIPT 7: 4047

// HTML 7694 | JS-SCRIPT 7: 4048
      const key =
// HTML 7695 | JS-SCRIPT 7: 4049
        card.getAttribute(
// HTML 7696 | JS-SCRIPT 7: 4050
          "data-astromatch-domain-key"
// HTML 7697 | JS-SCRIPT 7: 4051
        );
// HTML 7698 | JS-SCRIPT 7: 4052

// HTML 7699 | JS-SCRIPT 7: 4053
      diag(
// HTML 7700 | JS-SCRIPT 7: 4054
        "CLICK = " +
// HTML 7701 | JS-SCRIPT 7: 4055
        key
// HTML 7702 | JS-SCRIPT 7: 4056
      );
// HTML 7703 | JS-SCRIPT 7: 4057

// HTML 7704 | JS-SCRIPT 7: 4058
      const detail =
// HTML 7705 | JS-SCRIPT 7: 4059
        document.getElementById(
// HTML 7706 | JS-SCRIPT 7: 4060
          "astromatchDomainDetailV21"
// HTML 7707 | JS-SCRIPT 7: 4061
        );
// HTML 7708 | JS-SCRIPT 7: 4062

// HTML 7709 | JS-SCRIPT 7: 4063
      diag(
// HTML 7710 | JS-SCRIPT 7: 4064
        "DETAIL = " +
// HTML 7711 | JS-SCRIPT 7: 4065
        (detail ? "FOUND" : "ABSENT")
// HTML 7712 | JS-SCRIPT 7: 4066
      );
// HTML 7713 | JS-SCRIPT 7: 4067

// HTML 7714 | JS-SCRIPT 7: 4068
      diag(
// HTML 7715 | JS-SCRIPT 7: 4069
        "RENDER = " +
// HTML 7716 | JS-SCRIPT 7: 4070
        typeof astromatchV212RenderDomainDetail
// HTML 7717 | JS-SCRIPT 7: 4071
      );
// HTML 7718 | JS-SCRIPT 7: 4072

// HTML 7719 | JS-SCRIPT 7: 4073
      if (
// HTML 7720 | JS-SCRIPT 7: 4074
        typeof astromatchV212RenderDomainDetail ===
// HTML 7721 | JS-SCRIPT 7: 4075
        "function"
// HTML 7722 | JS-SCRIPT 7: 4076
      ) {
// HTML 7723 | JS-SCRIPT 7: 4077
        try {
// HTML 7724 | JS-SCRIPT 7: 4078
          astromatchV212RenderDomainDetail(key);
// HTML 7725 | JS-SCRIPT 7: 4079
          diag("RENDER CALLED");
// HTML 7726 | JS-SCRIPT 7: 4080

// HTML 7727 | JS-SCRIPT 7: 4081
          setTimeout(function() {
// HTML 7728 | JS-SCRIPT 7: 4082
            diag(
// HTML 7729 | JS-SCRIPT 7: 4083
              "DETAIL HTML LENGTH = " +
// HTML 7730 | JS-SCRIPT 7: 4084
              (
// HTML 7731 | JS-SCRIPT 7: 4085
                detail
// HTML 7732 | JS-SCRIPT 7: 4086
                  ? detail.innerHTML.length
// HTML 7733 | JS-SCRIPT 7: 4087
                  : 0
// HTML 7734 | JS-SCRIPT 7: 4088
              )
// HTML 7735 | JS-SCRIPT 7: 4089
            );
// HTML 7736 | JS-SCRIPT 7: 4090
          }, 100);
// HTML 7737 | JS-SCRIPT 7: 4091
        } catch (e) {
// HTML 7738 | JS-SCRIPT 7: 4092
          diag(
// HTML 7739 | JS-SCRIPT 7: 4093
            "RENDER ERROR = " +
// HTML 7740 | JS-SCRIPT 7: 4094
            e.message
// HTML 7741 | JS-SCRIPT 7: 4095
          );
// HTML 7742 | JS-SCRIPT 7: 4096
        }
// HTML 7743 | JS-SCRIPT 7: 4097
      }
// HTML 7744 | JS-SCRIPT 7: 4098
    },
// HTML 7745 | JS-SCRIPT 7: 4099
    true
// HTML 7746 | JS-SCRIPT 7: 4100
  );
// HTML 7747 | JS-SCRIPT 7: 4101
})();
// HTML 7748 | JS-SCRIPT 7: 4102

// HTML 7749 | JS-SCRIPT 7: 4103

// HTML 7750 | JS-SCRIPT 7: 4104
document.addEventListener("click", function(event) {
// HTML 7751 | JS-SCRIPT 7: 4105
  const el = event.target;
// HTML 7752 | JS-SCRIPT 7: 4106

// HTML 7753 | JS-SCRIPT 7: 4107
  const domain =
// HTML 7754 | JS-SCRIPT 7: 4108
    el &&
// HTML 7755 | JS-SCRIPT 7: 4109
    el.closest &&
// HTML 7756 | JS-SCRIPT 7: 4110
    el.closest("[data-astromatch-domain-key]");
// HTML 7757 | JS-SCRIPT 7: 4111

// HTML 7758 | JS-SCRIPT 7: 4112
  if (domain) {
// HTML 7759 | JS-SCRIPT 7: 4113
    console.log(
// HTML 7760 | JS-SCRIPT 7: 4114
      "CLICK DOMAIN DETECTED",
// HTML 7761 | JS-SCRIPT 7: 4115
      domain.getAttribute("data-astromatch-domain-key"),
// HTML 7762 | JS-SCRIPT 7: 4116
      domain.outerHTML.slice(0, 500)
// HTML 7763 | JS-SCRIPT 7: 4117
    );
// HTML 7764 | JS-SCRIPT 7: 4118

// HTML 7765 | JS-SCRIPT 7: 4119
    const detail =
// HTML 7766 | JS-SCRIPT 7: 4120
      document.getElementById("astromatchDomainDetailV21");
// HTML 7767 | JS-SCRIPT 7: 4121

// HTML 7768 | JS-SCRIPT 7: 4122
    console.log(
// HTML 7769 | JS-SCRIPT 7: 4123
      "DETAIL ROOT =",
// HTML 7770 | JS-SCRIPT 7: 4124
      detail
// HTML 7771 | JS-SCRIPT 7: 4125
    );
// HTML 7772 | JS-SCRIPT 7: 4126

// HTML 7773 | JS-SCRIPT 7: 4127
    console.log(
// HTML 7774 | JS-SCRIPT 7: 4128
      "DETAIL ROOT HTML =",
// HTML 7775 | JS-SCRIPT 7: 4129
      detail ? detail.outerHTML.slice(0, 500) : "ABSENT"
// HTML 7776 | JS-SCRIPT 7: 4130
    );
// HTML 7777 | JS-SCRIPT 7: 4131

// HTML 7778 | JS-SCRIPT 7: 4132
    console.log(
// HTML 7779 | JS-SCRIPT 7: 4133
      "RENDER FUNCTION =",
// HTML 7780 | JS-SCRIPT 7: 4134
      typeof astromatchV212RenderDomainDetail
// HTML 7781 | JS-SCRIPT 7: 4135
    );
// HTML 7782 | JS-SCRIPT 7: 4136

// HTML 7783 | JS-SCRIPT 7: 4137
    try {
// HTML 7784 | JS-SCRIPT 7: 4138
      astromatchV212RenderDomainDetail(
// HTML 7785 | JS-SCRIPT 7: 4139
        domain.getAttribute("data-astromatch-domain-key")
// HTML 7786 | JS-SCRIPT 7: 4140
      );
// HTML 7787 | JS-SCRIPT 7: 4141

// HTML 7788 | JS-SCRIPT 7: 4142
      console.log(
// HTML 7789 | JS-SCRIPT 7: 4143
        "CLICK DOMAIN RENDER CALLED"
// HTML 7790 | JS-SCRIPT 7: 4144
      );
// HTML 7791 | JS-SCRIPT 7: 4145
    } catch (error) {
// HTML 7792 | JS-SCRIPT 7: 4146
      console.error(
// HTML 7793 | JS-SCRIPT 7: 4147
        "CLICK DOMAIN RENDER ERROR",
// HTML 7794 | JS-SCRIPT 7: 4148
        error
// HTML 7795 | JS-SCRIPT 7: 4149
      );
// HTML 7796 | JS-SCRIPT 7: 4150
    }
// HTML 7797 | JS-SCRIPT 7: 4151
  }
// HTML 7798 | JS-SCRIPT 7: 4152
}, true);
// HTML 7799 | JS-SCRIPT 7: 4153

// HTML 7800 | JS-SCRIPT 7: 4154
setTimeout(() => {
// HTML 7801 | JS-SCRIPT 7: 4155
  const root =
// HTML 7802 | JS-SCRIPT 7: 4156
    document.getElementById(
// HTML 7803 | JS-SCRIPT 7: 4157
      "astromatchCompareV21Results"
// HTML 7804 | JS-SCRIPT 7: 4158
    );
// HTML 7805 | JS-SCRIPT 7: 4159

// HTML 7806 | JS-SCRIPT 7: 4160
  console.log(
// HTML 7807 | JS-SCRIPT 7: 4161
    "DOMAIN ROOT DIAGNOSTIC =",
// HTML 7808 | JS-SCRIPT 7: 4162
    root
// HTML 7809 | JS-SCRIPT 7: 4163
  );
// HTML 7810 | JS-SCRIPT 7: 4164

// HTML 7811 | JS-SCRIPT 7: 4165
  if (root) {
// HTML 7812 | JS-SCRIPT 7: 4166
    const cards =
// HTML 7813 | JS-SCRIPT 7: 4167
      root.querySelectorAll(
// HTML 7814 | JS-SCRIPT 7: 4168
        "[data-astromatch-domain-key]"
// HTML 7815 | JS-SCRIPT 7: 4169
      );
// HTML 7816 | JS-SCRIPT 7: 4170

// HTML 7817 | JS-SCRIPT 7: 4171
    console.log(
// HTML 7818 | JS-SCRIPT 7: 4172
      "DOMAIN CARDS FOUND =",
// HTML 7819 | JS-SCRIPT 7: 4173
      cards.length
// HTML 7820 | JS-SCRIPT 7: 4174
    );
// HTML 7821 | JS-SCRIPT 7: 4175

// HTML 7822 | JS-SCRIPT 7: 4176
    cards.forEach((card, index) => {
// HTML 7823 | JS-SCRIPT 7: 4177
      console.log(
// HTML 7824 | JS-SCRIPT 7: 4178
        "DOMAIN CARD",
// HTML 7825 | JS-SCRIPT 7: 4179
        index,
// HTML 7826 | JS-SCRIPT 7: 4180
        card.getAttribute(
// HTML 7827 | JS-SCRIPT 7: 4181
          "data-astromatch-domain-key"
// HTML 7828 | JS-SCRIPT 7: 4182
        ),
// HTML 7829 | JS-SCRIPT 7: 4183
        card.tagName,
// HTML 7830 | JS-SCRIPT 7: 4184
        card.outerHTML.slice(0, 300)
// HTML 7831 | JS-SCRIPT 7: 4185
      );
// HTML 7832 | JS-SCRIPT 7: 4186
    });
// HTML 7833 | JS-SCRIPT 7: 4187
  }
// HTML 7834 | JS-SCRIPT 7: 4188
}, 3000);
// HTML 7835 | JS-SCRIPT 7: 4189

// HTML 7836 | JS-SCRIPT 7: 4190

// HTML 7837 | JS-SCRIPT 7: 4191

// HTML 7838 | JS-SCRIPT 7: 4192
window.addEventListener("error", function(e) {
// HTML 7839 | JS-SCRIPT 7: 4193
  console.error(
// HTML 7840 | JS-SCRIPT 7: 4194
    "ASTROMATCH TRACE2 ERROR:",
// HTML 7841 | JS-SCRIPT 7: 4195
    e.message,
// HTML 7842 | JS-SCRIPT 7: 4196
    e.filename,
// HTML 7843 | JS-SCRIPT 7: 4197
    e.lineno,
// HTML 7844 | JS-SCRIPT 7: 4198
    e.colno,
// HTML 7845 | JS-SCRIPT 7: 4199
    e.error
// HTML 7846 | JS-SCRIPT 7: 4200
  );
// HTML 7847 | JS-SCRIPT 7: 4201
});
// HTML 7848 | JS-SCRIPT 7: 4202

// HTML 7849 | JS-SCRIPT 7: 4203
window.addEventListener("unhandledrejection", function(e) {
// HTML 7850 | JS-SCRIPT 7: 4204
  console.error(
// HTML 7851 | JS-SCRIPT 7: 4205
    "ASTROMATCH TRACE2 UNHANDLED PROMISE:",
// HTML 7852 | JS-SCRIPT 7: 4206
    e.reason
// HTML 7853 | JS-SCRIPT 7: 4207
  );
// HTML 7854 | JS-SCRIPT 7: 4208
});
// HTML 7855 | JS-SCRIPT 7: 4209

// HTML 7856 | JS-SCRIPT 7: 4210
console.log("ASTROMATCH TRACE2: avant start()");
// HTML 7857 | JS-SCRIPT 7: 4211

// HTML 7858 | JS-SCRIPT 7: 4212
start();
// HTML 7859 | JS-SCRIPT 7: 4213
