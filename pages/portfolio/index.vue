<script setup>
// 作品列表：精選大圖區 + 全部作品 grid（分類篩選）
const { data: works } = await useAsyncData('portfolio-list', () =>
    queryContent('portfolio').find()
)

const sorted = computed(() => sortByOrder(works.value || []))
const featuredWorks = computed(() => sorted.value.filter((w) => w.featured))

const categories = ['All', 'Web Design', 'UI Design', 'Branding', 'Publishing', 'Illustration']
const selectedCategory = ref('All')
const filteredWorks = computed(() => filterByCategory(sorted.value, selectedCategory.value))

useServerSeoMeta({
    title: "Portfolio｜The Unlimited｜Hailey's Style",
    description: '網頁設計、UI 設計、品牌與平面作品集，每件作品的設計理念與過程。',
    ogTitle: "Portfolio｜The Unlimited｜Hailey's Style",
    ogDescription: '網頁設計、UI 設計、品牌與平面作品集，每件作品的設計理念與過程。'
})

// 覆寫全站預設的首頁 canonical，避免列表頁被視為首頁的重複內容
useHead({
    link: [{ rel: 'canonical', href: 'https://www.theunlimited.cc/portfolio' }]
})
</script>

<template>
    <main class="portfolio-list-main">
        <Breadcrumb post-title="作品集" />

        <div class="portfolio-list-wrap">
            <h1 class="h2">Portfolio</h1>
            <p class="h6 portfolio-list-intro">每個設計背後，都蘊藏著屬於它的獨特故事</p>

            <!-- 精選作品：大圖左右交錯 -->
            <section class="portfolio-featured" v-if="featuredWorks.length">
                <NuxtLink v-for="work in featuredWorks" :key="work._path" :to="work._path"
                    class="portfolio-featured-item">
                    <div class="portfolio-featured-image">
                        <img :src="work.cover" :alt="work.title" :title="work.title" loading="lazy" />
                    </div>
                    <div class="portfolio-featured-content">
                        <p class="tag">{{ work.category }}</p>
                        <h2 class="h3">{{ work.title }}</h2>
                        <p class="portfolio-featured-desc">{{ work.description }}</p>
                    </div>
                </NuxtLink>
            </section>

            <!-- 全部作品：分類篩選 + grid -->
            <section class="portfolio-all">
                <h2 class="h3">All Works</h2>
                <div class="portfolio-filter">
                    <button v-for="cat in categories" :key="cat" type="button" class="portfolio-filter-pill"
                        :class="{ active: selectedCategory === cat }" @click="selectedCategory = cat">
                        {{ cat }}
                    </button>
                </div>
                <div class="portfolio-grid" v-if="filteredWorks.length">
                    <NuxtLink v-for="work in filteredWorks" :key="work._path" :to="work._path"
                        class="portfolio-card">
                        <div class="portfolio-card-image">
                            <img :src="work.cover" :alt="work.title" :title="work.title" loading="lazy" />
                        </div>
                        <div class="portfolio-card-content">
                            <p class="tag">{{ work.category }}</p>
                            <h3 class="h5">{{ work.title }}</h3>
                        </div>
                    </NuxtLink>
                </div>
                <p v-else class="portfolio-empty">這個分類還沒有作品，換個分類看看吧！</p>
            </section>
        </div>
    </main>
</template>
