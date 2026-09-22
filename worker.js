export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/shops") {

        if (request.method === "GET") {
          const data = await env.ALHASSAN_DATA.get("shops");

          return new Response(data || "[]", {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

        if (request.method === "POST") {
          const data = await request.text();

          await env.ALHASSAN_DATA.put("shops", data);

          return new Response("OK", {
            headers: {
              "Content-Type": "text/plain"
            }
          });
        }

        return new Response("Method Not Allowed", { status: 405 });
      }

      if (url.pathname === "/admin") {
        return env.ASSETS.fetch(
          new Request(new URL("/admin.html", request.url), request)
        );
      }

      return env.ASSETS.fetch(request);

    } catch (error) {
      return new Response(
        "KV ERROR: " + error.message,
        {
          status: 500,
          headers: {
            "Content-Type": "text/plain"
          }
        }
      );
    }
  }
};
