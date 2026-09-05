
window.addEventListener("DOMContentLoaded", function() {
  const box = document.getElementById("jsDiagnostic");
  if (box) box.textContent = "JavaScript : page chargée, module en attente…";
});

window.addEventListener("error", function(e) {
  const box = document.getElementById("jsDiagnostic");
  if (box) {
    box.textContent =
      "ASTROMATCH JS DIAGNOSTIC — " +
      (e.message || "Erreur JavaScript inconnue");
  }
});

window.addEventListener("unhandledrejection", function(e) {
  const box = document.getElementById("jsDiagnostic");
  if (box) {
    box.textContent =
      "ASTROMATCH JS DIAGNOSTIC — " +
      (e.reason?.message || String(e.reason));
  }
});
