import { d as defineEventHandler, s as setHeader } from '../nitro/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const sitemap_v2_xml = defineEventHandler(async (event) => {
  const baseUrl = "https://www.theunlimited.cc";
  const staticRoutes = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/blog", priority: "0.9", changefreq: "weekly" }
  ];
  const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join("")}
</urlset>`.trim();
  setHeader(event, "Content-Type", "text/xml; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600");
  return xml;
});

export { sitemap_v2_xml as default };
//# sourceMappingURL=sitemap_v2.xml.mjs.map
