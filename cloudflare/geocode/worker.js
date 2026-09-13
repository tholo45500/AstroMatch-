function headers() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: headers()
  });
}

function normalize(item) {
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
    latitude: Number(item?.latitude),
    longitude: Number(item?.longitude),
    timezone_id: item?.timezone || "",
    provider: "open-meteo",
    resolution_status: "resolved",
    osm_type: null,
    osm_id: null
  };
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: headers()
      });
    }

    const url = new URL(request.url);

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
      const input = await request.json();

      const query = String(
        input?.query || input?.place || ""
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
          Math.min(5, Number(input?.limit) || 5)
        );

      const target = new URL(
        "https://geocoding-api.open-meteo.com/v1/search"
      );

      target.searchParams.set("name", query);
      target.searchParams.set("count", String(limit));
      target.searchParams.set("language", "fr");
      target.searchParams.set("format", "json");

      const response = await fetch(target);

      if (!response.ok) {
        return json({
          ok: false,
          error: `GEOCODE_PROVIDER_${response.status}`
        }, 502);
      }

      const payload = await response.json();

      const results =
        Array.isArray(payload?.results)
          ? payload.results
              .map(normalize)
              .filter(x =>
                Number.isFinite(x.latitude) &&
                Number.isFinite(x.longitude) &&
                x.timezone_id
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
          error?.message || "GEOCODING_ERROR"
      }, 500);
    }
  }
};
