# 作品集（Portfolio）設計規格

日期：2026-07-10
狀態：已與 Hailey 確認設計方向（列表頁 C+A 混合、內頁 A 沉浸置中流）

## 目標

把目前外連 Adobe Portfolio（hsiaohan.myportfolio.com）的 7 件作品完整搬回 theunlimited.cc，
建立站內作品集：列表頁 + 每件作品獨立 case study 內頁。SEO、品牌與流量留在自有網域，
同時作為申請碩士與接案的門面。

**不做（YAGNI）**：資料庫、後台系統（第二階段接 git-based CMS）、sticky 側欄版內頁、留言互動。

## 路由與資訊架構

| 路由 | 內容 |
|---|---|
| `/portfolio` | 列表頁：精選大圖區（featured，左右交錯 2–3 件）＋ 全部作品 grid ＋ 分類 pill 篩選 |
| `/portfolio/[slug]` | Case study 內頁（沉浸置中流） |

- Header 導覽列（`components/TheHeader.vue`）新增 Portfolio 連結
- 首頁作品區塊卡片改連站內 `/portfolio/<slug>`，不再外連 Adobe Portfolio
- 分類：All / Web Design / UI Design / Branding / Publishing / Illustration
- 篩選互動模式沿用 toolbox 頁的 pill 篩選語言

## 資料層

**Markdown 即資料庫**，與 blog 同架構（Nuxt Content v2 `queryContent`）。
每件作品一個檔：`content/portfolio/<slug>.md`。

Frontmatter schema：

```yaml
title: 作品標題
description: 一句話簡介（列表卡片與 SEO meta 共用）
date: 2024-06          # YYYY-MM
category: Web Design    # 單選，篩選用
tags: [RWD, Figma, Vue] # 內頁 meta pill
cover: /images/portfolio/<slug>/cover.png
featured: true          # true 進精選大圖區
order: 1                # 排序權重（小的在前）
externalLink: https://…  # 選填：實際網站連結
```

內文為 case study 圖文（Markdown）。

**Pinia `stores/portfolio.ts` 退役**：首頁作品區改用 `queryContent('portfolio')` 取資料，
資料只維護一份。第二階段的 git-based CMS 後台即對這批 md 檔操作。

## 頁面規格

### 列表頁 `/portfolio`

1. 頁面標題區（h1 + 簡短引言）
2. 精選區：`featured: true` 的作品，大圖＋標題＋description＋分類，左右交錯排列
3. 全部作品區:分類 pill 篩選列 + 卡片 grid（cover、title、category）
4. 篩選無結果時顯示空狀態文案

### 內頁 `/portfolio/[slug]`

1. 全寬 hero（cover 圖）
2. 置中標題 + meta pills（年份／category／tags）+ description
3. Markdown 圖文流（圖片寬度以內容欄為準，重點圖可全寬）
4. `externalLink` 存在時顯示「查看網站」按鈕
5. 底部「上一件／下一件」導覽（依 order 排序循環）
6. 「跟我聊聊」CTA，沿用現有 gtag 埋點（`click-event`）
7. 不存在的 slug 顯示 404

### SEO（每個內頁）

- `<title>`、meta description、canonical
- og:image = 該作品 cover（絕對網址 `https://www.theunlimited.cc/...`）
- 結構化資料：`CreativeWork` + `BreadcrumbList`（JSON-LD）

## 內容搬遷

- 以爬蟲抓取 Adobe Portfolio 上 7 件作品的圖文
- 圖片下載至 `public/images/portfolio/<slug>/`，適度壓縮
- 整理為 7 個 md 檔，Hailey 校稿潤飾
- 首頁現有 `/images/index/worksImg0X.png` 縮圖可沿用或以新 cover 取代
- 精選區初始設定:`1111-event-site`、`teachify-one`、`rigorous` 三件 `featured: true`
  （涵蓋 Web／UI／Branding 三類），Hailey 可隨時改 frontmatter 調整

7 件作品（來自現有 store）：

| slug（暫定） | 標題 | 分類 |
|---|---|---|
| 1111-event-site | Event image site of 1111 Job Bank | Web Design |
| mcu-communication | MCU of Communication | Web Design |
| teachify-one | Teachify One | UI Design |
| nthu-arts-culture | NTHU Center for Arts and Culture | UI Design |
| rigorous | RIGOROUS | Branding |
| intertidal-zone | Intertidal zone exploration | Publishing |
| notice-of-printing | Notice of Printing | Illustration |

## 驗證標準

1. `npm run generate` 成功，所有 `/portfolio/*` 路由均被 prerender（GitHub Pages 純靜態，硬需求）
2. dev server 手動走過:列表頁篩選、精選區、7 件內頁、上下件導覽、首頁作品卡連結、Header 連結
3. 每個內頁 view-source 可見完整 SEO meta 與 JSON-LD
4. 手機寬度（375px）版面正常

## 後續階段（本次不實作）

1. **404 頁面設計**（Hailey 指定的下一項）：Nuxt `error.vue`，設計感的 404 頁
2. git-based CMS 後台（Nuxt Studio / Decap CMS）管理作品與文章
3. 內頁升級敘事三段式（挑戰／解法／成果）— 只需擴充 frontmatter
