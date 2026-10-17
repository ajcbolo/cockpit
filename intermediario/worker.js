// Intermediario Cloudflare Worker per Cockpit.
// Serve solo se Safari blocca le chiamate dirette a intervals.icu.
// Impostazioni del Worker: variabile segreta API_KEY = la tua chiave intervals.icu,
// variabile ALLOWED_ORIGIN = https://ajcbolo.github.io
export default {
  async fetch(req, env) {
    const origin = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Accept",
      "Vary": "Origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "GET") return new Response("Solo lettura", { status: 405, headers: cors });
    const url = new URL(req.url);
    if (!/^\/api\/v1\/(athlete|activity)\//.test(url.pathname)) return new Response("Percorso non ammesso", { status: 404, headers: cors });
    const upstream = "https://intervals.icu" + url.pathname + url.search;
    const r = await fetch(upstream, {
      headers: { Authorization: "Basic " + btoa("API_KEY:" + env.API_KEY), Accept: "application/json" },
    });
    return new Response(r.body, { status: r.status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
  },
};
