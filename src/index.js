/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    const url = "https://api.unsplash.com/photos";

    const resp = await fetch(url, {
      headers: { Authorization: `Client-ID ${env.CLIENT_ID}` },
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json;" },
    });

    const { query } = await request.json();
    return new Response(`Your query was ${query}`);
  },
};
