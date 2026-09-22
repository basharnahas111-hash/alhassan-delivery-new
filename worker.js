export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      return new Response("WORKER OK");
    }

    return env.ASSETS.fetch(request);
  }
};
