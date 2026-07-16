import { cp, mkdir, readFile, writeFile } from "node:fs/promises";

const indexPath = "dist/index.html";
let html = await readFile(indexPath, "utf8");
const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/);
if (cssMatch) {
  const css = (await readFile(`dist${cssMatch[1]}`, "utf8")).replaceAll("</style", "<\\/style");
  html = html.replace(cssMatch[0], `<style>${css}</style>`);
}
const jsMatch = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
if (jsMatch) {
  const js = (await readFile(`dist${jsMatch[1]}`, "utf8")).replaceAll("</script", "<\\/script");
  html = html.replace(jsMatch[0], `<script type="module">${js}</script>`);
}
await writeFile(indexPath, html);

await mkdir("dist/client", { recursive: true });
await cp("dist/index.html", "dist/client/index.html");
await cp("dist/assets", "dist/client/assets", { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes(".")) {
      response = await env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
    }

    return response;
  },
};
`;

await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/index.js", worker);
