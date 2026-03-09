// src/index.js
export default {
  async fetch(request, env) {
    if (request.method === 'POST' && new URL(request.url).pathname === '/upload') {
      const formData = await request.formData();
      const file = formData.get('media');
      const visibilityTime = formData.get('visibilityTime');

      if (!file) {
        return new Response('Geen bestand geüpload.', { status: 400 });
      }

      // Sla het bestand op in R2
      const fileName = `${Date.now()}-${file.name}`;
      await env.MY_BUCKET.put(fileName, await file.arrayBuffer());

      return new Response('Bestand succesvol geüpload!', {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Voeg hier andere routes toe (bijv. GET /media)
    return new Response('Not found', { status: 404 });
  }
};
