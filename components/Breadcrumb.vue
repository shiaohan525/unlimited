<script setup>
import { computed } from 'vue'

const route = useRoute()
const props = defineProps({
    postTitle: {
        type: String,
        default: null
    }
})

// 根據路由路徑生成麵包屑
const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(Boolean)
    const breadcrumbItems = [
        {
            name: 'Home',
            path: '/'
        }
    ]

    let currentPath = ''
    paths.forEach((segment, index) => {
        currentPath += '/' + segment

        // 最後一個段落且有文章標題時，使用文章標題；否則使用 segment
        const isLastSegment = index === paths.length - 1
        let itemName

        if (isLastSegment && props.postTitle) {
            itemName = props.postTitle
        } else if (segment !== 'blog') {
            itemName = segment.replace(/-/g, ' ').charAt(0).toUpperCase() + segment.replace(/-/g, ' ').slice(1)
        } else {
            itemName = 'Blog'
        }

        breadcrumbItems.push({
            name: itemName,
            path: currentPath
        })
    })

    return breadcrumbItems
})
</script>

<template>
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
            <li v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-item"
                :class="{ 'is-active': index === breadcrumbs.length - 1 }">
                <NuxtLink v-if="index !== breadcrumbs.length - 1" :to="item.path" class="breadcrumb-link">
                    {{ item.name }}
                </NuxtLink>
                <span v-else class="breadcrumb-text">
                    {{ item.name }}
                </span>
            </li>
        </ol>
    </nav>
</template>
