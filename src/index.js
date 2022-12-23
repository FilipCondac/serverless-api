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
    const { query } = await request.json();

    const resp = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}`,
      {
        headers: { Authorization: `Client-ID ${env.CLIENT_ID}` },
      }
    );
    const data = await resp.json();

    const images = data.results.map((image) => ({
      id: image.id,
      image: image.urls.small,
      link: image.links.html,
    }));

    return new Response(JSON.stringify(images), {
      headers: { "content-type": "application/json;" },
    });
  },
};
