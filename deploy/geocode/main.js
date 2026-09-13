function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: cors()
    }
  );
}

function normalize(item) {
  const latitude = Number(item?.latitude);
  const longitude = Number(item?.longitude);

  return {
    display_name: [
      item?.name,
      item?.admin1,
      item?.country
    ].filter(Boolean).join(", "),

    name: item?.name || "",
    country: item?.country || "",
    country_code:
      String(item?.country_code || "").toUpperCase(),

    state: item?.admin1 || "",

    latitude,
    longitude,

    timezone_id:
      item?.timezone || "",

    provider: "open-meteo",
    resolution_status: "resolved",

    osm_type: null,
    osm_id: null
  };
}

Deno.serve(async request => {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: cors()
    });
  }

  if (
    request.method === "GET" &&
    url.pathname === "/health"
  ) {
    return json({
      ok: true,
      service: "astromatch-geocode"
    });
  }

  if (
    request.method !== "POST" ||
    url.pathname !== "/api/geocode/search"
  ) {
    return json({
      ok: false,
      error: "NOT_FOUND"
    }, 404);
  }

  try {
    const input =
      await request.json();

    const query =
      String(
        input?.query ||
        input?.place ||
        ""
      ).trim();

    if (query.length < 2) {
      return json({
        ok: false,
        error: "QUERY_REQUIRED"
      }, 400);
    }

    const limit =
      Math.max(
        1,
        Math.min(
          5,
          Number(input?.limit) || 5
        )
      );

    const target =
      new URL(
        "https://geocoding-api.open-meteo.com/v1/search"
      );

    target.searchParams.set(
      "name",
      query
    );

    target.searchParams.set(
      "count",
      String(limit)
    );

    target.searchParams.set(
      "language",
      "fr"
    );

    target.searchParams.set(
      "format",
      "json"
    );

    const response =
      await fetch(target);

    if (!response.ok) {
      return json({
        ok: false,
        error:
          `GEOCODE_PROVIDER_${response.status}`
      }, 502);
    }

    const payload =
      await response.json();

    const results =
      Array.isArray(payload?.results)
        ? payload.results
            .map(normalize)
            .filter(place =>
              Number.isFinite(
                place.latitude
              ) &&
              Number.isFinite(
                place.longitude
              ) &&
              place.timezone_id
            )
        : [];

    return json({
      ok: true,
      results
    });

  } catch (error) {
    return json({
      ok: false,
      error:
        error?.message ||
        "GEOCODING_ERROR"
    }, 500);
  }
});
