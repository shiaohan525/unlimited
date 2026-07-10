# 作品集（Portfolio）實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 7 件外連 Adobe Portfolio 的作品搬回站內，建立 `/portfolio` 列表頁（精選大圖＋grid 篩選）與 `/portfolio/[slug]` case study 內頁。

**Architecture:** Nuxt 3 SSG（GitHub Pages）。內容層用 Nuxt Content v2（`queryContent`），每件作品一個 `content/portfolio/<slug>.md`。頁面沿用 blog 的資料存取與 SEO 模式、toolbox 的 pill 篩選模式。純邏輯抽到 `utils/` 以 vitest 做 TDD。

**Tech Stack:** Nuxt 3.19 / @nuxt/content 2.13（v2 API）/ SCSS（`assets/pages/_*.scss`，`main.scss` 註冊）/ vitest

**Spec:** `docs/superpowers/specs/2026-07-10-portfolio-design.md`

## Global Constraints

- Nuxt Content 用 **v2 API**（`queryContent`），不用 v3 的 `queryCollection`
- 分類固定五種＋All：`All / Web Design / UI Design / Branding / Publishing / Illustration`
- 站點絕對網址：`https://www.theunlimited.cc`（SEO meta、JSON-LD 用）
- SCSS 斷點 mixin：`@include mobile` / `@include pad` / `@include desktop`（`assets/libs/_mixins.scss`）
- 色彩與間距一律用現有 CSS 變數（`--colors-*`、`--spacing-*`、`--radius-*`）
- 程式註解風格：繁體中文，跟現有檔案一致
- commit 訊息：繁體中文，結尾加 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- **不要 commit `.output/`、`.nuxt/`、`dist`**（repo 有殘留的 .output 變更，commit 時一律指定路徑）

---

### Task 1: 純函式工具與測試（TDD）

**Files:**
- Create: `utils/portfolioHelpers.ts`
- Test: `tests/portfolioHelpers.test.ts`

**Interfaces:**
- Produces:
  - `sortByOrder<T extends { order?: number }>(items: T[]): T[]` — 依 `order` 小到大排序（無 order 排最後），回傳新陣列
  - `filterByCategory<T extends { category?: string }>(items: T[], category: string): T[]` — `'All'` 回傳全部
  - `getAdjacent<T extends { _path?: string }>(sortedItems: T[], currentPath: string): { prev: T | null, next: T | null }` — 循環取前後件；只有一件時 prev/next 皆為 null

- [ ] **Step 1: 寫失敗測試**

```ts
// tests/portfolioHelpers.test.ts
import { describe, it, expect } from 'vitest'
import { sortByOrder, filterByCategory, getAdjacent } from '../utils/portfolioHelpers'

const items = [
  { _path: '/portfolio/b', title: 'B', category: 'UI Design', order: 2 },
  { _path: '/portfolio/a', title: 'A', category: 'Web Design', order: 1 },
  { _path: '/portfolio/c', title: 'C', category: 'Branding', order: 3 },
  { _path: '/portfolio/d', title: 'D', category: 'Web Design' } // 無 order
]

describe('sortByOrder', () => {
  it('依 order 升冪排序，無 order 排最後', () => {
    expect(sortByOrder(items).map((i) => i.title)).toEqual(['A', 'B', 'C', 'D'])
  })
  it('不改變原陣列', () => {
    const copy = [...items]
    sortByOrder(items)
    expect(items).toEqual(copy)
  })
})

describe('filterByCategory', () => {
  it('All 回傳全部', () => {
    expect(filterByCategory(items, 'All')).toHaveLength(4)
  })
  it('依分類過濾且不改變順序', () => {
    // items 原始順序為 B, A, C, D；Web Design 為 A 與 D
    expect(filterByCategory(items, 'Web Design').map((i) => i.title)).toEqual(['A', 'D'])
  })
})

describe('getAdjacent', () => {
  const sorted = sortByOrder(items)
  it('取得前後件', () => {
    const { prev, next } = getAdjacent(sorted, '/portfolio/b')
    expect(prev?.title).toBe('A')
    expect(next?.title).toBe('C')
  })
  it('第一件的 prev 循環到最後一件', () => {
    const { prev } = getAdjacent(sorted, '/portfolio/a')
    expect(prev?.title).toBe('D')
  })
  it('最後一件的 next 循環到第一件', () => {
    const { next } = getAdjacent(sorted, '/portfolio/d')
    expect(next?.title).toBe('A')
  })
  it('只有一件時回傳 null', () => {
    expect(getAdjacent([items[0]], '/portfolio/b')).toEqual({ prev: null, next: null })
  })
  it('找不到 currentPath 時回傳 null', () => {
    expect(getAdjacent(sorted, '/portfolio/xxx')).toEqual({ prev: null, next: null })
  })
})
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx vitest run tests/portfolioHelpers.test.ts`
Expected: FAIL（模組不存在）

- [ ] **Step 3: 實作**

```ts
// utils/portfolioHelpers.ts
// 作品集純邏輯：排序、分類過濾、前後件導覽

export function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  )
}

export function filterByCategory<T extends { category?: string }>(
  items: T[],
  category: string
): T[] {
  if (category === 'All') return items
  return items.filter((item) => item.category === category)
}

export function getAdjacent<T extends { _path?: string }>(
  sortedItems: T[],
  currentPath: string
): { prev: T | null; next: T | null } {
  const index = sortedItems.findIndex((item) => item._path === currentPath)
  if (index === -1 || sortedItems.length <= 1) return { prev: null, next: null }
  const len = sortedItems.length
  return {
    prev: sortedItems[(index - 1 + len) % len],
    next: sortedItems[(index + 1) % len]
  }
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx vitest run tests/portfolioHelpers.test.ts`
Expected: PASS（8 tests）

- [ ] **Step 5: Commit**

```bash
git add utils/portfolioHelpers.ts tests/portfolioHelpers.test.ts
git commit -m "新增作品集排序、篩選、前後件導覽工具函式" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: 內容搬遷 — 7 件作品 md ＋ 圖片

**Files:**
- Create: `content/portfolio/<slug>.md` × 7
- Create: `public/images/portfolio/<slug>/` 圖片（cover.png ＋ 內文圖）

**Interfaces:**
- Produces: 7 個 md 檔，frontmatter schema 供 Task 3–5 的 `queryContent('portfolio')` 使用：
  `title` `description` `date`(YYYY-MM 字串) `category` `tags`(string[]) `cover` `featured`(boolean) `order`(number) `externalLink`(選填)

**來源對照表（slug / 分類 / featured / order / Adobe URL）：**

| slug | category | featured | order | 來源 |
|---|---|---|---|---|
| 1111-event-site | Web Design | true | 1 | https://hsiaohan.myportfolio.com/web-designevent-image-site-of-1111-job-bank |
| mcu-communication | Web Design | false | 2 | https://hsiaohan.myportfolio.com/web-designmcu-of-communication |
| teachify-one | UI Design | true | 3 | https://hsiaohan.myportfolio.com/teachify-oneside-project-of-ui-competition |
| nthu-arts-culture | UI Design | false | 4 | https://hsiaohan.myportfolio.com/web-ui-design-proposalnthu-center-for-arts-and-culture |
| rigorous | Branding | true | 5 | https://hsiaohan.myportfolio.com/brandingrigorous |
| intertidal-zone | Publishing | false | 6 | https://hsiaohan.myportfolio.com/publishingintertidal-zone-exploration |
| notice-of-printing | Illustration | false | 7 | https://hsiaohan.myportfolio.com/social-media-marketing-notice-of-printing |

- [ ] **Step 1: 逐件抓取內容**

用 firecrawl 的 `firecrawl_scrape`（formats: markdown）抓上表 7 個 URL。沒有 firecrawl 時改用 `curl -sL <url>` 取 HTML 再手動整理。每件記下：標題、說明文字、所有 `<img>` 圖片網址（Adobe CDN，通常是 `cdn.myportfolio.com`）。

- [ ] **Step 2: 下載圖片**

每件作品建立 `public/images/portfolio/<slug>/`，用 curl 下載該頁所有作品圖：

```bash
mkdir -p public/images/portfolio/1111-event-site
curl -sL "<adobe-cdn-image-url>" -o public/images/portfolio/1111-event-site/01.png
# 第一張主視覺另存為 cover：
cp public/images/portfolio/1111-event-site/01.png public/images/portfolio/1111-event-site/cover.png
```

單檔超過 800KB 時用 sips 壓縮：`sips -Z 1600 <file>`（等比縮到長邊 1600px）。

- [ ] **Step 3: 寫 md 檔（範例，7 件同格式）**

```markdown
---
title: Event image site of 1111 Job Bank
description: 1111 人力銀行形象活動網站——（從抓到的內容整理一句話簡介）
date: 2024-01
category: Web Design
tags: [RWD, Web Design]
cover: /images/portfolio/1111-event-site/cover.png
featured: true
order: 1
externalLink: https://hsiaohan.myportfolio.com/web-designevent-image-site-of-1111-job-bank
---

（抓到的專案說明文字，整理成通順段落）

![設計主視覺](/images/portfolio/1111-event-site/01.png)

（後續圖文交錯）
```

規則：
- `date` 從頁面內容判斷；判斷不出來就填 `2024-01` 並在**交付報告中列出**請 Hailey 校正
- `tags` 從內容中的工具／技法關鍵字挑 2–4 個
- `externalLink` 暫填 Adobe 原頁（實際網站上線連結由 Hailey 之後補）
- 文字用繁體中文整理，**不要自行創作沒有依據的專案細節**；來源太少就只放圖＋簡短說明

- [ ] **Step 4: 驗證**

```bash
ls content/portfolio/*.md | wc -l    # 預期 7
ls public/images/portfolio/          # 預期 7 個資料夾，各含 cover.png
grep -L "featured" content/portfolio/*.md   # 預期無輸出（每檔都有 featured）
```

- [ ] **Step 5: Commit**

```bash
git add content/portfolio public/images/portfolio
git commit -m "搬遷 7 件作品內容至站內（來源：Adobe Portfolio）" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: 列表頁 `/portfolio`

**Files:**
- Create: `pages/portfolio/index.vue`
- Create: `assets/pages/_portfolio-list.scss`
- Modify: `assets/main.scss`（註冊新 scss）

**Interfaces:**
- Consumes: Task 1 的 `sortByOrder` / `filterByCategory`（Nuxt 自動 import `utils/`）；Task 2 的 md frontmatter
- Produces: 內頁與首頁連入的 `/portfolio` 路由

- [ ] **Step 1: 建立頁面**

```vue
<!-- pages/portfolio/index.vue -->
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
                    <button v-for="cat in categories" :key="cat" class="portfolio-filter-pill"
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
```

- [ ] **Step 2: 建立樣式**

```scss
// assets/pages/_portfolio-list.scss
@use '../libs/mixins' as *;

.portfolio-list-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-7) var(--spacing-4);
}

.portfolio-list-intro {
    color: var(--colors-gray-600);
    margin-top: var(--spacing-2);
}

// 精選區：大圖左右交錯
.portfolio-featured {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-7);
    margin: var(--spacing-7) 0;

    &-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-6);
        text-decoration: none;
        color: inherit;

        // 偶數件左右交錯
        &:nth-child(even) {
            flex-direction: row-reverse;
        }

        @include mobile {
            flex-direction: column !important;
            gap: var(--spacing-3);
        }
    }

    &-image {
        flex: 0 0 58%;
        border-radius: var(--radius-lg);
        overflow: hidden;

        img {
            width: 100%;
            display: block;
            transition: transform 0.4s;
        }
    }

    &-item:hover &-image img {
        transform: scale(1.03);
    }

    &-content {
        flex: 1;

        .tag {
            color: var(--colors-brand-primary);
        }

        h2 {
            margin: var(--spacing-2) 0;
        }
    }

    &-desc {
        color: var(--colors-gray-600);
    }
}

// 篩選 pill
.portfolio-filter {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin: var(--spacing-4) 0;

    &-pill {
        border: 1px solid var(--colors-gray-400);
        border-radius: var(--radius-max);
        background: transparent;
        color: var(--colors-gray-600);
        padding: var(--spacing-1) var(--spacing-3);
        cursor: pointer;
        transition: 0.25s;

        &:hover {
            border-color: var(--colors-brand-primary);
            color: var(--colors-brand-primary);
        }

        &.active {
            background: var(--colors-brand-primary);
            border-color: var(--colors-brand-primary);
            color: var(--colors-gray-white);
        }
    }
}

// 作品 grid
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-5);

    @include pad {
        grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
        grid-template-columns: 1fr;
    }
}

.portfolio-card {
    text-decoration: none;
    color: inherit;

    &-image {
        border-radius: var(--radius-md);
        overflow: hidden;
        aspect-ratio: 4 / 3;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s;
        }
    }

    &:hover &-image img {
        transform: scale(1.05);
    }

    &-content {
        padding: var(--spacing-2) 0;

        .tag {
            color: var(--colors-brand-primary);
        }
    }
}

.portfolio-empty {
    color: var(--colors-gray-600);
    padding: var(--spacing-6) 0;
}
```

- [ ] **Step 3: 註冊 scss**

在 `assets/main.scss` 的 `@use 'pages/toolbox' as *;` 之後加：

```scss
@use 'pages/portfolio-list' as *;
```

- [ ] **Step 4: 驗證**

Run: `npm run dev`（背景），開 `http://localhost:3000/portfolio`
Expected: 精選區 3 件左右交錯；grid 7 件；點「UI Design」pill 剩 2 件；點「Publishing」剩 1 件；手機寬度（375px）單欄

- [ ] **Step 5: Commit**

```bash
git add pages/portfolio/index.vue assets/pages/_portfolio-list.scss assets/main.scss
git commit -m "新增作品集列表頁：精選大圖區與分類篩選 grid" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 內頁 `/portfolio/[slug]`

**Files:**
- Create: `pages/portfolio/[slug].vue`
- Create: `assets/pages/_portfolio.scss`
- Modify: `assets/main.scss`

**Interfaces:**
- Consumes: Task 1 的 `sortByOrder` / `getAdjacent`；Task 2 的 md 內容

- [ ] **Step 1: 建立頁面**

```vue
<!-- pages/portfolio/[slug].vue -->
<script setup>
// 作品內頁：沉浸置中流（hero → meta → 圖文 → 前後件 → CTA）
const route = useRoute()
const siteUrl = 'https://www.theunlimited.cc'

const { data: work } = await useAsyncData(`portfolio-${route.path}`, () =>
    queryContent('portfolio').where({ _path: route.path }).findOne()
)

// 不存在的 slug 回 404
if (!work.value) {
    throw createError({ statusCode: 404, statusMessage: '找不到這件作品', fatal: true })
}

// 前後件導覽（依 order 循環）
const { data: allWorks } = await useAsyncData('portfolio-nav', () =>
    queryContent('portfolio').only(['_path', 'title', 'order']).find()
)
const adjacent = computed(() => getAdjacent(sortByOrder(allWorks.value || []), route.path))

// SEO
useServerSeoMeta({
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
    link: [{ rel: 'canonical', href: `${siteUrl}${route.path}` }],
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
                'url': `${siteUrl}${route.path}`
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
                    { '@type': 'ListItem', 'position': 3, 'name': work.value.title, 'item': `${siteUrl}${route.path}` }
                ]
            })
        }
    ]
})

// 沿用首頁的聯絡埋點
import { useGtag } from 'vue-gtag-next'
const trackButtonClick = () => {
    const { event } = useGtag()
    event('click-event')
}
</script>

<template>
    <main class="portfolio-post-main">
        <Breadcrumb :post-title="work?.title" />

        <article class="portfolio-post" v-if="work">
            <!-- Hero -->
            <div class="portfolio-hero">
                <img :src="work.cover" :alt="work.title" :title="work.title" />
            </div>

            <!-- 標題與 meta -->
            <header class="portfolio-post-header">
                <h1 class="h2">{{ work.title }}</h1>
                <div class="portfolio-meta">
                    <span class="portfolio-meta-pill">{{ work.date }}</span>
                    <span class="portfolio-meta-pill">{{ work.category }}</span>
                    <span class="portfolio-meta-pill" v-for="tag in work.tags" :key="tag">{{ tag }}</span>
                </div>
                <p class="portfolio-post-desc">{{ work.description }}</p>
                <a v-if="work.externalLink" class="button-CTA h5" :href="work.externalLink" target="_blank"
                    rel="noopener">查看網站</a>
            </header>

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

            <!-- CTA -->
            <div class="portfolio-post-cta">
                <p class="h6">喜歡這件作品，或有想合作的想法嗎？</p>
                <a class="button-CTA vibrate h5" @click="trackButtonClick"
                    href="mailto:o134888@gmail.com">跟我聊聊</a>
            </div>
        </article>
    </main>
</template>
```

- [ ] **Step 2: 建立樣式**

```scss
// assets/pages/_portfolio.scss
@use '../libs/mixins' as *;

.portfolio-post-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-7) var(--spacing-4);
}

.portfolio-hero {
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: var(--spacing-6);

    img {
        width: 100%;
        display: block;
    }
}

.portfolio-post-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto var(--spacing-7);

    h1 {
        margin-bottom: var(--spacing-3);
    }
}

.portfolio-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);

    &-pill {
        border: 1px solid var(--colors-gray-400);
        border-radius: var(--radius-max);
        color: var(--colors-gray-600);
        padding: var(--spacing-1) var(--spacing-3);
        font-size: 14px;
    }
}

.portfolio-post-desc {
    color: var(--colors-gray-600);
    margin-bottom: var(--spacing-4);
}

// 內文：置中單欄，圖片撐滿內容欄
.portfolio-post-body {
    max-width: 840px;
    margin: 0 auto;

    p {
        line-height: 1.9;
        margin: var(--spacing-4) 0;
    }

    img {
        width: 100%;
        border-radius: var(--radius-md);
        margin: var(--spacing-4) 0;
    }
}

.portfolio-post-nav {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-4);
    max-width: 840px;
    margin: var(--spacing-7) auto 0;
    border-top: 1px solid var(--colors-gray-200);
    padding-top: var(--spacing-5);

    &-item {
        text-decoration: none;
        color: inherit;

        &.next {
            margin-left: auto;
            text-align: right;
        }

        .tag {
            color: var(--colors-brand-primary);
        }
    }
}

.portfolio-post-cta {
    text-align: center;
    margin-top: var(--spacing-7);

    .button-CTA {
        margin-top: var(--spacing-3);
        display: inline-block;
    }
}
```

- [ ] **Step 3: 註冊 scss**

在 `assets/main.scss` 的 `@use 'pages/portfolio-list' as *;` 之後加：

```scss
@use 'pages/portfolio' as *;
```

- [ ] **Step 4: 驗證**

dev server 開 `http://localhost:3000/portfolio/rigorous`：
- hero、meta pill（date／category／tags）、描述、圖文、前後件（prev=nthu-arts-culture、next=intertidal-zone）、CTA 都正常
- `view-source:` 可見 og:image 絕對網址與兩段 JSON-LD
- 開 `http://localhost:3000/portfolio/not-exist` → 404 頁
- 375px 寬版面正常

- [ ] **Step 5: Commit**

```bash
git add pages/portfolio/[slug].vue assets/pages/_portfolio.scss assets/main.scss
git commit -m "新增作品內頁：沉浸置中流、SEO 結構化資料與前後件導覽" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Header 導覽＋首頁整合、store 退役

**Files:**
- Modify: `components/TheHeader.vue`（pc-menu 與 menu-main 兩處）
- Modify: `pages/index.vue`（作品區改 queryContent＋站內連結）
- Delete: `stores/portfolio.ts`

- [ ] **Step 1: Header 加 Portfolio 連結**

`components/TheHeader.vue` 兩處選單（`.pc-menu` 約 87 行、`.menu-main` 約 130 行），在 Blog 前各加一行：

```html
<RouterLink to="/portfolio" class="">Portfolio</RouterLink>
```

- [ ] **Step 2: 首頁作品區改接 content**

`pages/index.vue`：

刪除（約 10–13 行）：

```js
import { usePortfolioStore } from '~/stores/portfolio';
import { storeToRefs } from 'pinia';
const portfolioStore = usePortfolioStore();
const portfolioItems = portfolioStore.portfolioItems;
```

改為：

```js
// 首頁作品區：直接讀作品集 content，資料只維護一份
const { data: portfolioData } = await useAsyncData('index-portfolio', () =>
    queryContent('portfolio').only(['_path', 'title', 'category', 'cover', 'order']).find()
)
const portfolioItems = computed(() => sortByOrder(portfolioData.value || []))
```

模板（約 199–227 行）：
- 「Works」旁的 `button-next` 連結 `https://hsiaohan.myportfolio.com/work` 改為 `<NuxtLink class="button-next" to="/portfolio">`（內部 svg 不動，結尾標籤同步改）
- 作品卡片外層 `<a :href="item.link" target="_blank">` 改為 `<NuxtLink :to="item._path">`（拿掉 target），`item.src`→`item.cover`、`item.tag`→`item.category`、`item.alt`→`item.title`

- [ ] **Step 3: 刪除 store**

```bash
rm stores/portfolio.ts
grep -rn "usePortfolioStore" pages components   # 預期無輸出
```

- [ ] **Step 4: 驗證**

dev server 開 `http://localhost:3000/`：
- Header（桌機＋手機選單）出現 Portfolio
- 首頁 Works 區 7 張卡片、點卡片進站內內頁、箭頭按鈕進 /portfolio
- console 無錯誤

- [ ] **Step 5: Commit**

```bash
git add components/TheHeader.vue pages/index.vue
git rm stores/portfolio.ts
git commit -m "首頁與導覽整合站內作品集，退役 portfolio store" -m "Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: SSG 產出驗證

**Files:** 無新檔案（驗證任務）

- [ ] **Step 1: 全站測試與建置**

```bash
npx vitest run          # 預期全數通過
npm run generate        # 預期成功結束
```

- [ ] **Step 2: 確認 prerender 完整**

```bash
ls .output/public/portfolio/                    # 預期 index.html + 7 個 slug 資料夾
for s in 1111-event-site mcu-communication teachify-one nthu-arts-culture rigorous intertidal-zone notice-of-printing; do
  test -f ".output/public/portfolio/$s/index.html" && echo "OK $s" || echo "MISSING $s"
done
grep -l "application/ld+json" .output/public/portfolio/rigorous/index.html   # 預期命中
```

7 件若有缺漏：檢查 `nuxt.config.ts` 加 `nitro.prerender.routes` 明列 7 條路由後重跑。

- [ ] **Step 3: 回報**

不 commit build 產物。整理交付報告：完成項目、date 待校正清單、externalLink 待補清單。

---

## 交付後續（不在本計畫）

1. 404 頁面設計（Hailey 指定下一項，另開 brainstorm）
2. git-based CMS 後台
3. 清理 repo 中被 track 的 `.output/`
