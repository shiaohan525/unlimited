<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const activeHeading = ref(null)
const headings = ref([])

// 提取文章中的標題
const extractHeadings = () => {
    const headingElements = document.querySelectorAll('main h2, main h3, main h4, main h5, main h6')
    const items = []

    headingElements.forEach((el, index) => {
        // 如果沒有 id，則添加一個
        if (!el.id) {
            el.id = `heading-${index}`
        }

        const level = parseInt(el.tagName[1])
        items.push({
            id: el.id,
            text: el.textContent,
            level: level,
            element: el
        })
    })

    headings.value = items
}

// 計算結構化的目錄（支持多層級）
const structuredHeadings = computed(() => {
    const structured = []
    const stack = []

    headings.value.forEach((heading) => {
        // 移除更高層級的項目（返回到較高的層級）
        while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
            stack.pop()
        }

        if (stack.length === 0) {
            structured.push({
                ...heading,
                children: []
            })
            stack.push(structured[structured.length - 1])
        } else {
            const parent = stack[stack.length - 1]
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push({
                ...heading,
                children: []
            })
            stack.push(parent.children[parent.children.length - 1])
        }
    })

    return structured
})

// 監聽滾動事件
const handleScroll = () => {
    let closestHeading = null
    let closestDistance = Infinity

    headings.value.forEach((heading) => {
        const element = heading.element
        if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top - 100) // 距離視口頂部 100px 時視為 active

            if (distance < closestDistance) {
                closestDistance = distance
                closestHeading = heading.id
            }
        }
    })

    activeHeading.value = closestHeading
}

// 點擊標題導航
const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        activeHeading.value = id
    }
}

onMounted(() => {
    // 延遲抽取標題，確保 ContentRenderer 已渲染
    setTimeout(() => {
        extractHeadings()
    }, 100)

    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
    <nav v-if="headings.length > 0" class="article-nav">
        <div class="article-nav-title">
            <p>本頁內容</p>
        </div>
        <ul class="article-nav-list">
            <li v-for="heading in headings" :key="heading.id" :class="`level-${heading.level}`">
                <a :href="`#${heading.id}`" :class="{ active: activeHeading === heading.id }"
                    @click.prevent="scrollToHeading(heading.id)">
                    {{ heading.text }}
                </a>
            </li>
        </ul>
    </nav>
</template>
