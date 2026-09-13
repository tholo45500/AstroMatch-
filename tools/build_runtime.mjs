import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["js/runtime/browser_entry.js"],
  bundle: true,
  platform: "browser",
  format: "iife",
  outfile: "ui/astromatch_runtime.bundle.js"
});

console.log("✅ AstroMatch runtime bundle généré");
