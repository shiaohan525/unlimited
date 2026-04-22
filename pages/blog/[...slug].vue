<script setup>
const route = useRoute()

// 1. 改回 v2 語法：使用 queryContent().where() 根據路徑尋找
const { data: post } = await useAsyncData(`content-${route.path}`, () => {
    return queryContent().where({ _path: route.path }).findOne()
})

// 調試用
console.log('Post data:', post.value)

// 2. 設置 SEO Meta
useServerSeoMeta({
    title: () => post.value?.title || '部落格文章',
    ogTitle: () => post.value?.title || '部落格文章',
    description: () => post.value?.description || '',
    ogDescription: () => post.value?.description || '',
    ogImage: () => post.value?.image || '',
    twitterCard: () => 'summary_large_image',
    twitterTitle: () => post.value?.title || '部落格文章',
    twitterDescription: () => post.value?.description || '',
    twitterImage: () => post.value?.image || '',
})

// 3. 設置動態 Head 與 JSON-LD
watchEffect(() => {
    if (post.value) {
        useHead({
            meta: [
                { name: 'keywords', content: post.value.keywords || '' },
                { property: 'og:image', content: post.value.image || '' },
                { property: 'og:type', content: 'article' },
                { name: 'twitter:image', content: post.value.image || '' }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    children: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        'headline': post.value.title,
                        'description': post.value.description,
                        'image': post.value.image || '',
                        'author': {
                            '@type': 'Person',
                            'name': post.value.author || '校友會'
                        },
                        'datePublished': post.value.date,
                    })
                }
            ]
        })
    }
})
</script>

<template>
    <main class="blog-post-main">
        <Breadcrumb :post-title="post?.title" />

        <div class="post-wrap">
            <ArticleNav />

            <div class="post-main" v-if="post">
                <h1>{{ post.title }}</h1>

                <ContentRenderer :value="post">
                    <template #empty>
                        <p>文章內容空白</p>
                    </template>
                </ContentRenderer>
            </div>

            <div v-else-if="!post" class="error-msg">
                <p>🔍 找不到文章 (路徑: {{ route.path }})</p>
                <p>請確認 content/ 目錄下有對應的 .md 檔案</p>
            </div>
        </div>
    </main>
</template>