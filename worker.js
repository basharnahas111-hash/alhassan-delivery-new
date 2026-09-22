export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      return new Response("WORKER OK");
    }

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

        return new Response("OK");
      }

      return new Response("Method Not Allowed", { status: 405 });
    }

    return new Response("ALHASSAN API WORKER OK");
  }
};
