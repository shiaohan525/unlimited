export default defineEventHandler((event) => {
  // 1. 定義內容（確保 <?xml ... ?> 是第一行，沒有空格）
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.theunlimited.cc/</loc>
    <lastmod>2026-04-12</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.theunlimited.cc/blog</loc>
    <lastmod>2026-04-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`.trim();

  // 2. 強制設定 Header 為 XML
  setHeader(event, 'Content-Type', 'text/xml; charset=utf-8');
  
  // 3. 移除任何可能影響的快取（測試階段建議加上）
  setHeader(event, 'Cache-Control', 'no-store');

  return xml;
});