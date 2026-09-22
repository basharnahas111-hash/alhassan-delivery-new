export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/shops") {
      const data = await env.ALHASSAN_DATA.get("shops");
      return new Response(data || "[]", {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/admin") {
      return env.ASSETS.fetch(
        new Request(new URL("/admin.html", request.url), request)
      );
    }

    return env.ASSETS.fetch(request);
  }
};
