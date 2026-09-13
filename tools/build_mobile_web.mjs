import {
  rm,
  mkdir,
  cp
} from "node:fs/promises";

await rm(
  "dist-mobile",
  {
    recursive: true,
    force: true
  }
);

await mkdir(
  "dist-mobile",
  {
    recursive: true
  }
);

await cp(
  "ui",
  "dist-mobile",
  {
    recursive: true
  }
);

await cp(
  "js",
  "dist-mobile/js",
  {
    recursive: true
  }
);

console.log(
  "✅ AstroMatch mobile web généré"
);
