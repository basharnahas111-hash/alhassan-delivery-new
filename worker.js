export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/shops") {
      const data = await env.ALHASSAN_DATA.get("shops");
      return new Response(data || "[]", {
        headers: { "Content-Type": "application/json" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
