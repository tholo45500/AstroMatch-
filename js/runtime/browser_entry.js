import {
  AstroMatchRuntime
} from "./astromatch_runtime.js";

import {
  createProfile,
  getPrimaryProfile,
  getTargetProfiles
} from "../profiles/profile_service.js";

globalThis.AstroMatchRuntime =
  AstroMatchRuntime;

globalThis.AstroMatchProfiles =
  Object.freeze({
    createProfile,
    getPrimaryProfile,
    getTargetProfiles
  });

export {
  AstroMatchRuntime,
  createProfile,
  getPrimaryProfile,
  getTargetProfiles
};
