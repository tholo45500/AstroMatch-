(function () {
  const LOCAL_BASE_URL =
    "http://127.0.0.1:3000";

  /*
   * Sera renseigné quand on déploiera
   * le mini-backend de géocodage.
   */
  const MOBILE_GEOCODE_BASE_URL =
    String(
      window.ASTROMATCH_GEOCODE_API_BASE_URL ||
      "https://astromatch-2fj3n7ykezzh.tholo45500.deno.net"
    ).replace(/\/+$/, "");

  function isNative() {
    try {
      if (
        window.Capacitor &&
        typeof window.Capacitor.isNativePlatform === "function"
      ) {
        return window.Capacitor.isNativePlatform();
      }

      if (
        window.Capacitor &&
        typeof window.Capacitor.getPlatform === "function"
      ) {
        return window.Capacitor.getPlatform() !== "web";
      }
    } catch {}

    return false;
  }

  function baseUrl() {
    return String(
      window.ASTROMATCH_API_BASE_URL ||
      LOCAL_BASE_URL
    ).replace(/\/+$/, "");
  }

  function geocodeBaseUrl() {
    if (!isNative()) {
      return baseUrl();
    }

    if (MOBILE_GEOCODE_BASE_URL) {
      return MOBILE_GEOCODE_BASE_URL;
    }

    throw new Error(
      "ASTROMATCH_MOBILE_GEOCODE_BACKEND_REQUIRED"
    );
  }

  function join(base, path) {
    const cleanPath =
      String(path || "").startsWith("/")
        ? String(path)
        : `/${path}`;

    return `${base}${cleanPath}`;
  }

  function url(path) {
    return join(baseUrl(), path);
  }

  function geocodeUrl(path) {
    return join(
      geocodeBaseUrl(),
      path
    );
  }

  window.AstroMatchApi = {
    isNative,
    baseUrl,
    geocodeBaseUrl,
    url,
    geocodeUrl
  };
})();
