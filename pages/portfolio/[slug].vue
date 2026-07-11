<script setup>
// 作品內頁：沉浸置中流（hero → meta → 圖文 → 前後件 → CTA）
// 同一路由參數切換（上一件/下一件）需以 fullPath 為 key 重新掛載，
// 否則 setup 不會重跑，內容與 SEO meta 會殘留上一件作品
definePageMeta({
    key: (route) => route.fullPath
})

const route = useRoute()
const siteUrl = 'https://www.theunlimited.cc'

// 正規化尾斜線，避免 /portfolio/xxx/ 這種網址讀不到預渲染資料
const path = route.path.replace(/\/+$/, '') || '/'

const { data: work } = await useAsyncData(`portfolio-${path}`, () =>
    queryContent('portfolio').where({ _path: path }).findOne()
)

// 不存在的 slug 回 404
if (!work.value) {
    throw createError({ statusCode: 404, statusMessage: '找不到這件作品', fatal: true })
}

// 前後件導覽（依 order 循環）
const { data: allWorks } = await useAsyncData('portfolio-nav', () =>
    queryContent('portfolio').only(['_path', 'title', 'order']).find()
)
const adjacent = computed(() => getAdjacent(sortByOrder(allWorks.value || []), path))

// SEO（useSeoMeta 於 client 端也會更新，確保前後件切換時分頁標題同步）
useSeoMeta({
    title: () => `${work.value.title}｜Portfolio｜The Unlimited`,
    description: () => work.value.description || '',
    ogTitle: () => work.value.title,
    ogDescription: () => work.value.description || '',
    ogImage: () => `${siteUrl}${work.value.cover}`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => work.value.title,
    twitterDescription: () => work.value.description || '',
    twitterImage: () => `${siteUrl}${work.value.cover}`
})

useHead({
    link: [{ rel: 'canonical', href: `${siteUrl}${path}` }],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                'name': work.value.title,
                'description': work.value.description,
                'image': `${siteUrl}${work.value.cover}`,
                'datePublished': work.value.date,
                'author': { '@type': 'Person', 'name': 'Hailey Hsu' },
                'url': `${siteUrl}${path}`
            })
        },
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Portfolio', 'item': `${siteUrl}/portfolio` },
                    { '@type': 'ListItem', 'position': 3, 'name': work.value.title, 'item': `${siteUrl}${path}` }
                ]
            })
        }
    ]
})
</script>

<template>
    <main class="portfolio-post-main">
        <Breadcrumb :post-title="work?.title" />

        <article class="portfolio-post" v-if="work">
            <!-- 標題與 meta（div 而非 header：header 元素會吃到 _header.scss 的全域 fixed 定位） -->
            <div class="portfolio-post-header">
                <h1 class="h2">{{ work.title }}</h1>
                <div class="portfolio-meta">
                    <span class="tag-pill">{{ work.date }}</span>
                    <span class="tag-pill">{{ work.category }}</span>
                    <span class="tag-pill" v-for="tag in work.tags" :key="tag">{{ tag }}</span>
                </div>
                <p class="portfolio-post-desc">{{ work.description }}</p>
            </div>

            <!-- Hero -->
            <div class="portfolio-hero">
                <img :src="work.cover" :alt="work.title" :title="work.title" />
            </div>

            <!-- 圖文內容 -->
            <div class="portfolio-post-body">
                <ContentRenderer :value="work">
                    <template #empty>
                        <p>內容準備中</p>
                    </template>
                </ContentRenderer>
            </div>

            <!-- 前後件導覽 -->
            <nav class="portfolio-post-nav" v-if="adjacent.prev || adjacent.next">
                <NuxtLink v-if="adjacent.prev" :to="adjacent.prev._path" class="portfolio-post-nav-item prev">
                    <span class="tag">← 上一件</span>
                    <p class="h6">{{ adjacent.prev.title }}</p>
                </NuxtLink>
                <NuxtLink v-if="adjacent.next" :to="adjacent.next._path" class="portfolio-post-nav-item next">
                    <span class="tag">下一件 →</span>
                    <p class="h6">{{ adjacent.next.title }}</p>
                </NuxtLink>
            </nav>
        </article>
    </main>
</template>
