export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    const asset = await (globalThis as any).ASSETS.fetch(request);
    if (asset.status !== 404) {
      return asset;
    }

    return new Response(
      `
      <html>
      <head>
      <title>Loading...</title>
      </head>
      <body>
      <app-root></app-root>
      <script src="/main.js"></script>
      </body>
</html>
      `,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
