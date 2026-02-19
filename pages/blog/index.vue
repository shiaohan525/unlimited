<script setup>
// 使用 useAsyncData 配合 queryContent
// 'blog' 對應到你的 content/blog 資料夾
const { data: posts } = await useAsyncData('blog-posts', () =>
    queryContent('blog').find()
)

// 格式化日期
const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}
</script>

<template>
    <main class="blog-list-main">
        <Breadcrumb post-title="文章列表" />

        <div v-if="posts && posts.length > 0" class="blog-list-wrap">
            <h1 class="h2">文章列表</h1>
            <h2 class="h6">共有 {{ posts.length }} 篇文章</h2>
            <div class="blog-grid">
                <NuxtLink v-for="post in posts" :key="post._path" :to="post._path" class="blog-card">
                    <div class="blog-card-image">
                        <img v-if="post.image" :src="post.image" :alt="post.title" />
                        <div v-else class="blog-card-image-placeholder">
                            <span>無圖片</span>
                        </div>
                    </div>
                    <div class="blog-card-content">
                        <div class="blog-card-meta">
                            <span class="blog-card-category" v-if="post.tags && post.tags[0]">
                                {{ post.tags[0] }}
                            </span>
                            <span class="blog-card-date" v-if="post.date">
                                {{ formatDate(post.date) }}
                            </span>
                        </div>
                        <h3 class="blog-card-title">{{ post.title || '無標題' }}</h3>
                        <p class="blog-card-description">{{ post.description }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div v-else style="color: orange; margin-top: 20px;">
            <p>目前抓不到文章，請檢查：</p>
            <ul>
                <li>確認路徑是 <code>content/blog/xxxx.md</code></li>
                <li>確認 .md 檔案內有寫 title</li>
            </ul>
            <p>API 偵測結果：{{ posts }}</p>
        </div>
    </main>
</template>