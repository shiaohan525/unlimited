export default defineEventHandler(async (event) => {
  const baseUrl = 'https://www.theunlimited.cc'

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' }
  ]

  const date = new Date().toISOString().split('T')[0]

  // 使用 .trim() 確保 XML 宣告的前後完全沒有空行
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`.trim()

  setHeader(event, 'Content-Type', 'text/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return xml
})
