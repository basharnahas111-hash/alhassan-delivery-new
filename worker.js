export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/shops") {
      if (request.method === "GET") {
        return new Response(
          await env.ALHASSAN_DATA.get("shops") || "[]",
          {headers:{"Content-Type":"application/json"}}
        );
      }

      if (request.method === "POST") {
        const data = await request.text();
        await env.ALHASSAN_DATA.put("shops", data);
        return new Response("OK");
      }
    }

    if (url.pathname === "/admin")
      return env.ASSETS.fetch(
        new Request(new URL("/admin.html", request.url), request)
      );

    return env.ASSETS.fetch(request);
  }
};
