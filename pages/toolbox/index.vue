<script setup>
import tools from '~/assets/data/toolbox.json'

useHead({
    title: '工具箱｜The Unlimited'
})

// 標籤分組（依 Notion 資源庫的色系分類）
const tagGroups = [
    { label: '理論知識', tags: ['理論法則', '專案解析', '設計系統'] },
    { label: '設計領域', tags: ['品牌設計', 'UX 設計', 'UI 設計'] },
    { label: '素材資源', tags: ['插畫', '圖樣', '圖表', '頁面版型', '背景', '動態效果', '漸層', '元件', 'Mockup', 'Icon'] },
    { label: '程式開發', tags: ['前端開發', '原始碼', 'UI Library', 'Python'] },
    { label: '靈感類型', tags: ['APP', '網頁', 'SaaS產品', '活動頁', '遊戲'] },
    { label: '實用工具', tags: ['生成器', '開發工具', '配色工具', '擴充工具', 'Figma'] },
    { label: '其他', tags: ['線上教學', '含付費內容'] }
]

const searchQuery = ref('')
const selectedTags = ref([])

const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag)
    if (index === -1) {
        selectedTags.value.push(tag)
    } else {
        selectedTags.value.splice(index, 1)
    }
}

const clearFilters = () => {
    selectedTags.value = []
    searchQuery.value = ''
}

const hasFilters = computed(() => selectedTags.value.length > 0 || searchQuery.value.trim() !== '')

// 篩選邏輯：選取的標籤全部符合（AND）＋ 關鍵字比對名稱、說明、標籤
const filteredTools = computed(() => {
    const keyword = searchQuery.value.trim().toLowerCase()
    return tools.filter((tool) => {
        const matchTags = selectedTags.value.every((tag) => tool.tags.includes(tag))
        if (!matchTags) return false
        if (!keyword) return true
        return (
            tool.name.toLowerCase().includes(keyword) ||
            tool.description.toLowerCase().includes(keyword) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(keyword))
        )
    })
})

// 用 Google favicon 服務抓網站圖示
const getFavicon = (url) => {
    try {
        const { hostname } = new URL(url)
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
    } catch {
        return ''
    }
}
</script>

<template>
    <main class="toolbox-main">
        <Breadcrumb />

        <div class="toolbox-wrap">
            <h1 class="h2">工具箱</h1>
            <h2 class="h6">
                共收錄 {{ tools.length }} 個工具
                <template v-if="hasFilters">，符合條件 {{ filteredTools.length }} 個</template>
            </h2>

            <div class="toolbox-filter">
                <div class="toolbox-search">
                    <svg class="toolbox-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                            stroke="currentColor" stroke-width="1.5" />
                        <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <input v-model="searchQuery" type="search" class="toolbox-search-input"
                        placeholder="搜尋工具名稱、說明或標籤" />
                </div>

                <div v-for="group in tagGroups" :key="group.label" class="toolbox-tag-group">
                    <span class="toolbox-tag-group-label tag">{{ group.label }}</span>
                    <div class="toolbox-tag-chips">
                        <button v-for="tag in group.tags" :key="tag" type="button" class="toolbox-tag-chip tag"
                            :class="{ 'is-active': selectedTags.includes(tag) }" @click="toggleTag(tag)">
                            {{ tag }}
                        </button>
                    </div>
                </div>

                <button v-if="hasFilters" type="button" class="toolbox-clear button-S" @click="clearFilters">
                    清除篩選
                </button>
            </div>

            <div v-if="filteredTools.length > 0" class="toolbox-grid">
                <a v-for="tool in filteredTools" :key="tool.url" :href="tool.url" target="_blank"
                    rel="noopener noreferrer" class="tool-card">
                    <div class="tool-card-header">
                        <img class="tool-card-favicon" :src="getFavicon(tool.url)" :alt="`${tool.name} icon`"
                            loading="lazy" />
                        <h3 class="tool-card-title">{{ tool.name }}</h3>
                        <svg class="tool-card-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p class="tool-card-description">{{ tool.description }}</p>
                    <div class="tool-card-tags">
                        <span v-for="tag in tool.tags" :key="tag" class="tool-card-tag tag">{{ tag }}</span>
                    </div>
                </a>
            </div>

            <div v-else class="toolbox-empty">
                <p>沒有符合條件的工具，換個關鍵字或標籤試試</p>
                <button type="button" class="toolbox-clear button-S" @click="clearFilters">清除篩選</button>
            </div>
        </div>
    </main>
</template>
