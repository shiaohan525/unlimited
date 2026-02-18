<script setup>
const route = useRoute()

// 使用新版語法，指定 'content' 集合
const { data: post } = await useAsyncData(`content-${route.path}`, () => {
    return queryCollection('content').path(route.path).first()
})

// 調試用：將 post 的完整內容打印到 console
console.log('Post data:', post.value)
if (post.value) {
    console.log('Post keywords:', post.value.meta?.keywords)
    console.log('Post title:', post.value.title)
}

// 設置 Head 資訊
useHead({
    title: () => post.value?.title || '部落格文章',
})

// 設置 SEO Meta 標籤
useServerSeoMeta({
    title: () => post.value?.title || '',
    ogTitle: () => post.value?.title || '',
    description: () => post.value?.description || '',
    ogDescription: () => post.value?.description || '',
    keywords: () => post.value?.meta?.keywords || '',
})

// 設置 keywords meta 標籤和其他元數據
if (post.value) {
    useHead({
        meta: [
            {
                name: 'keywords',
                content: post.value.meta?.keywords || ''
            },
            {
                property: 'og:image',
                content: post.value.meta?.image || ''
            }
        ],
        // 部落格文章結構化資料
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    'headline': post.value.title,
                    'description': post.value.description,
                    'image': post.value.meta?.image || '',
                    'author': {
                        '@type': 'Person',
                        'name': post.value.meta?.author || '作者名字'
                    },
                    'datePublished': post.value.meta?.date,
                })
            }
        ]
    })
}
</script>

<template>
    <main>
        <Breadcrumb :post-title="post?.title" />
        <div class="post-wrap">
            <ArticleNav />
            <div class="post-main" v-if="post">
                <h1>{{ post.title }}</h1>
                <ContentRenderer :value="post" />
            </div>
        </div>
        <!-- <div v-else>
            ❌ 依然找不到內容 (路徑: {{ route.path }})
        </div> -->
    </main>
</template>