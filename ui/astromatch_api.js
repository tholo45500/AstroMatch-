(function () {

  const LOCAL_BASE_URL =
    "http://127.0.0.1:3000";

  const LOCAL_GEOCODE_URL =
    "astromatch-local://places/api/geocode/search";

  let placesPromise = null;


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
    return "astromatch-local://places";
  }


  function join(base, path) {
    const cleanPath =
      String(path || "").startsWith("/")
        ? String(path)
        : "/" + String(path || "");

    return base + cleanPath;
  }


  function url(path) {
    return join(
      baseUrl(),
      path
    );
  }


  function geocodeUrl(path) {
    return join(
      geocodeBaseUrl(),
      path
    );
  }


  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .toLocaleLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }


  function countryName(code) {
    try {
      return new Intl.DisplayNames(
        ["fr"],
        { type: "region" }
      ).of(code) || code;
    } catch {
      return code;
    }
  }


  function loadPlaces() {

    if (
      window.ASTROMATCH_LOCAL_PLACES
        ?.places
    ) {
      return Promise.resolve(
        window.ASTROMATCH_LOCAL_PLACES
      );
    }

    if (placesPromise) {
      return placesPromise;
    }

    placesPromise =
      new Promise(
        (resolve, reject) => {

          const script =
            document.createElement(
              "script"
            );

          script.src =
            "./data/places_local.js";

          script.onload = () => {

            if (
              window
                .ASTROMATCH_LOCAL_PLACES
                ?.places
            ) {
              resolve(
                window
                  .ASTROMATCH_LOCAL_PLACES
              );
            } else {
              reject(
                new Error(
                  "BASE_LOCALE_INVALIDE"
                )
              );
            }
          };

          script.onerror = () =>
            reject(
              new Error(
                "BASE_LOCALE_INTROUVABLE"
              )
            );

          document.head.appendChild(
            script
          );
        }
      );

    return placesPromise;
  }


  async function searchLocalPlaces(
    rawQuery,
    limit = 5
  ) {

    const query =
      normalize(rawQuery);

    if (query.length < 2) {
      return [];
    }

    const safeLimit =
      Math.max(
        1,
        Math.min(
          10,
          Number(limit) || 5
        )
      );

    const data =
      await loadPlaces();

    const starts = [];
    const contains = [];
    const seen = new Set();

    for (const row of data.places) {

      const key =
        String(row[7] || "");

      const asciiKey =
        String(row[8] || "");

      const isStart =
        key.startsWith(query) ||
        asciiKey.startsWith(query);

      const isContains =
        !isStart &&
        (
          key.includes(query) ||
          asciiKey.includes(query)
        );

      if (
        !isStart &&
        !isContains
      ) {
        continue;
      }

      const unique = [
        row[0],
        row[1],
        row[2],
        row[3],
        row[4]
      ].join("|");

      if (seen.has(unique)) {
        continue;
      }

      seen.add(unique);

      const country =
        countryName(row[2]);

      const item = {
        display_name:
          [
            row[0],
            row[1],
            country
          ]
            .filter(Boolean)
            .join(", "),

        name: row[0],
        state: row[1],
        country,
        country_code: row[2],

        latitude: row[3],
        longitude: row[4],

        timezone_id: row[5],

        population: row[6],

        provider:
          "astromatch-local",

        resolution_status:
          "resolved"
      };

      if (isStart) {
        starts.push(item);
      } else {
        contains.push(item);
      }

      if (
        starts.length >= safeLimit &&
        contains.length >= safeLimit
      ) {
        break;
      }
    }

    return [
      ...starts,
      ...contains
    ].slice(
      0,
      safeLimit
    );
  }


  /*
   * Intercepte uniquement le géocodage AstroMatch.
   * Tous les autres fetch restent normaux.
   */
  if (
    !window
      .__ASTROMATCH_API_LOCAL_FETCH__
  ) {

    const nativeFetch =
      window.fetch.bind(window);

    window.fetch =
      async function(
        input,
        options = {}
      ) {

        const requestUrl =
          typeof input === "string"
            ? input
            : input?.url || "";

        if (
          String(requestUrl) !==
          LOCAL_GEOCODE_URL
        ) {
          return nativeFetch(
            input,
            options
          );
        }

        try {

          let body = {};

          try {
            body =
              JSON.parse(
                options?.body || "{}"
              );
          } catch {}

          const results =
            await searchLocalPlaces(
              body.query,
              body.limit
            );

          return new Response(
            JSON.stringify({
              ok: true,
              source:
                "astromatch-local",
              results
            }),
            {
              status: 200,
              headers: {
                "Content-Type":
                  "application/json"
              }
            }
          );

        } catch (error) {

          console.error(
            "ASTROMATCH LOCAL GEOCODE",
            error
          );

          return new Response(
            JSON.stringify({
              ok: false,
              error:
                error?.message ||
                "LOCAL_GEOCODE_ERROR"
            }),
            {
              status: 500,
              headers: {
                "Content-Type":
                  "application/json"
              }
            }
          );
        }
      };

    window
      .__ASTROMATCH_API_LOCAL_FETCH__ =
      true;
  }


  window.AstroMatchApi = {
    isNative,
    baseUrl,
    geocodeBaseUrl,
    url,
    geocodeUrl,

    searchLocalPlaces
  };

})();
