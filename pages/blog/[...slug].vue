<script setup>
const route = useRoute()

// 使用新版語法，指定 'content' 集合
const { data: post } = await useAsyncData(`content-${route.path}`, () => {
    return queryCollection('content').path(route.path).first()
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