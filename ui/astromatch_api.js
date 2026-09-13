(function () {
  const DEFAULT_BASE_URL = "http://127.0.0.1:3000";

  function baseUrl() {
    return String(
      window.ASTROMATCH_API_BASE_URL ||
      DEFAULT_BASE_URL
    ).replace(/\/+$/, "");
  }

  function url(path) {
    const cleanPath =
      String(path || "").startsWith("/")
        ? String(path)
        : `/${path}`;

    return `${baseUrl()}${cleanPath}`;
  }

  window.AstroMatchApi = {
    baseUrl,
    url
  };
})();
