<script setup>
const route = useRoute()

// 使用新版語法，指定 'content' 集合
const { data: post } = await useAsyncData(`content-${route.path}`, () => {
    return queryCollection('content').path(route.path).first()
})
// 當 post 有資料時，自動注入 Meta Tag
if (post.value) {
    useServerSeoMeta({
        title: () => post.value.title,
        ogTitle: () => post.value.title,
        // 這裡就是你要的 Keywords
        keywords: () => post.value.keywords,
        description: () => post.value.description,
        ogDescription: () => post.value.description,
    })
}
// 在 [...slug].vue 的 <script setup> 中
useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                'headline': post.value.title,
                'publisher': {
                    '@type': 'Organization', // 或者用 'Person'
                    'name': '你的網站名稱或公司名稱',
                    'logo': {
                        '@type': 'ImageObject',
                        'url': 'https://你的網址.com/logo.png' // 建議提供 logo 網址
                    }
                },
                'author': {
                    '@type': 'Person',
                    'name': '作者名字'
                },
                'datePublished': post.value.date // 假設你 Markdown 有 date 欄位
            })
        }
    ]
})
</script>

<template>
    <main>
        <div v-if="post">
            <h1>{{ post.title }}</h1>
            <ContentRenderer :value="post" />
        </div>
        <div v-else>
            ❌ 依然找不到內容 (路徑: {{ route.path }})
        </div>
    </main>
</template>