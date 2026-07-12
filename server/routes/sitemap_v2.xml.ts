import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://www.theunlimited.cc'
  const today = new Date().toISOString().split('T')[0]

  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily', lastmod: today },
    { url: '/blog', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: '/portfolio', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: '/toolbox', priority: '0.8', changefreq: 'monthly', lastmod: today }
  ]

  // 內容頁：blog 文章與 portfolio 作品，自 Nuxt Content 動態取得
  // lastmod 優先用 frontmatter date（支援 YYYY / YYYY-MM-DD，皆為合法 W3C 日期）
  const docs = await serverQueryContent(event).only(['_path', 'date', 'robots']).find()
  const contentRoutes = docs
    .filter((doc) => doc._path && doc._path !== '/')
    .filter((doc) => !String(doc.robots || '').includes('noindex'))
    .map((doc) => ({
      url: doc._path,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: /^\d{4}(-\d{2}){0,2}$/.test(String(doc.date || '')) ? String(doc.date) : today
    }))

  const routes = [...staticRoutes, ...contentRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim()

  setHeader(event, 'Content-Type', 'text/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return xml
})
