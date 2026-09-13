(() => {
  const states = new Map();

  function fields(prefix) {
    return {
      input: document.getElementById(`${prefix}Place`),
      lat: document.getElementById(`${prefix}Latitude`),
      lon: document.getElementById(`${prefix}Longitude`),
      tz: document.getElementById(`${prefix}Timezone`)
    };
  }

  function label(place) {
    return [
      place?.name,
      place?.state,
      place?.country
    ].filter(Boolean).join(", ");
  }

  async function search(query) {
    const response = await fetch(
      window.AstroMatchApi.geocodeUrl(
        "/api/geocode/search"
      ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          limit: 5
        })
      }
    );

    const payload = await response.json();

    if (!response.ok || !payload?.ok) {
      throw new Error(
        payload?.error || "Recherche de ville impossible."
      );
    }

    const seen = new Set();

    return (payload.results || []).filter(place => {
      const key = [
        place?.name,
        place?.state,
        place?.country,
        place?.latitude,
        place?.longitude
      ].join("|");

      if (seen.has(key)) return false;
      seen.add(key);

      return true;
    });
  }

  function select(prefix, place) {
    const f = fields(prefix);

    f.input.value = label(place);
    f.lat.value = place.latitude;
    f.lon.value = place.longitude;
    f.tz.value = place.timezone_id || "";

    f.input.dataset.astromatchResolved = "1";

    const state = states.get(prefix);

    if (state) {
      state.box.style.display = "none";
    }
  }

  function render(prefix, results) {
    const state = states.get(prefix);

    if (!state) return;

    const { box } = state;

    box.innerHTML = "";

    if (!results.length) {
      box.style.display = "none";
      return;
    }

    for (const place of results) {
      const button =
        document.createElement("button");

      button.type = "button";
      button.textContent = label(place);

      Object.assign(button.style, {
        display: "block",
        width: "100%",
        padding: "12px 14px",
        textAlign: "left",
        color: "#f8fafc",
        background: "transparent",
        border: "0",
        borderBottom:
          "1px solid rgba(255,255,255,.08)",
        fontSize: "14px"
      });

      button.addEventListener(
        "click",
        () => select(prefix, place)
      );

      box.appendChild(button);
    }

    box.style.display = "block";
  }

  function install(prefix) {
    if (states.has(prefix)) return;

    const f = fields(prefix);

    if (!f.input) return;

    const box =
      document.createElement("div");

    Object.assign(box.style, {
      display: "none",
      marginTop: "6px",
      overflow: "hidden",
      borderRadius: "14px",
      border:
        "1px solid rgba(168,85,247,.35)",
      background: "rgb(15 23 42)",
      boxShadow:
        "0 14px 35px rgba(0,0,0,.40)"
    });

    f.input.insertAdjacentElement(
      "afterend",
      box
    );

    states.set(prefix, {
      box,
      timer: null
    });

    f.input.addEventListener(
      "input",
      () => {
        const state = states.get(prefix);

        f.input.dataset.astromatchResolved = "";

        f.lat.value = "";
        f.lon.value = "";
        f.tz.value = "";

        clearTimeout(state.timer);

        const query =
          f.input.value.trim();

        if (query.length < 2) {
          box.style.display = "none";
          return;
        }

        state.timer = setTimeout(
          async () => {
            try {
              const results =
                await search(query);

              render(prefix, results);
            } catch {
              box.style.display = "none";
            }
          },
          300
        );
      }
    );
  }

  async function resolve(prefix) {
    install(prefix);

    const f = fields(prefix);

    if (
      f.input.dataset.astromatchResolved === "1" &&
      f.lat.value &&
      f.lon.value &&
      f.tz.value
    ) {
      return;
    }

    const query =
      f.input.value.trim();

    if (query.length < 2) {
      throw new Error(
        "Indique un lieu de naissance."
      );
    }

    const results =
      await search(query);

    if (!results.length) {
      throw new Error(
        `Lieu introuvable : ${query}`
      );
    }

    if (results.length === 1) {
      select(prefix, results[0]);
      return;
    }

    render(prefix, results);

    throw new Error(
      "Choisis le bon lieu dans les propositions."
    );
  }

  window.AstroMatchPlaceAutocomplete = {
    install,
    resolve
  };
})();
