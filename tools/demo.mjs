import fs from "node:fs";
import { createProfile, compatibility, engineCapabilities } from "../js/engine.js";

const input = JSON.parse(fs.readFileSync(new URL("../examples/sample_profiles.json", import.meta.url), "utf8"));
const primary = createProfile(input.primary);
const target = createProfile(input.target);
const result = compatibility(primary, target);

console.log(JSON.stringify({
  capabilities: engineCapabilities(),
  primary: { id: primary.profile_id, name: primary.identity.first_name },
  target: { id: target.profile_id, name: target.identity.first_name },
  score: result.score,
  interpretation: result.interpretation,
  narrative: result.narrative
}, null, 2));
