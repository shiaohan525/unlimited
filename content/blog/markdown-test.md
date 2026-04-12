---
title: 'Markdown 完整語法測試文章'
description: '這是一份用於測試 Nuxt Content 渲染效果的全功能範例，包含 SEO、格式與組件。'
keywords: 'Markdown, 語法測試, SEO'
date: 2024-02-18
image: '/images/article/article_test.jpg'
tags:
  - Markdown
  - Frontend
---

這裡是一段標準的文字內容。測試**粗體 (Bold)**、_斜體 (Italic)_、**_粗斜體_** 以及 ~~刪除線 (Strikethrough)~~。

你可以檢查 HTML 屬性：

- 語言：`lang="zh-Hant-TW"` (需在 nuxt.config 設定)
- SEO：檢查 Head 標籤中的 `keywords` 與 `description`。

---

## 二級標題 (H2) - 測試自動錨點與連結

### 三級標題 (H3)

#### 四級標題 (H4)

---

## 列表測試

**無序列表：**

- 項目 A
- 項目 B
  - 子項目 B1
  - 子項目 B2
- 項目 C

**有序列表：**

1. 第一步驟
2. 第二步驟
3. 第三步驟

**任務列表 (Task List)：**

- [x] 已完成事項
- [ ] 待辦事項 1
- [ ] 待辦事項 2

---

## 引用與分隔線

> 這是一段引用區塊 (Blockquote)。
> 常用於標記重點資訊或他人語錄。

---

## 連結與圖片測試

**外部連結：**
歡迎造訪 [Nuxt Content 官方文件](https://content.nuxt.com/) 了解更多資訊。

**圖片測試：**
以下是一張來自網路的測試圖片：
![隨機測試圖片](https://picsum.photos/800/400)
_圖片說明：這是一張自動生成的測試圖。_

---

## 表格測試 (Tables)

表格在呈現資料時非常有用，你可以測試對齊方式：

| 項目名稱           |   狀態    |              備註 |
| :----------------- | :-------: | ----------------: |
| 標籤 (Lang)        | ✅ 已完成 | 設定為 zh-Hant-TW |
| 出版者 (Publisher) | ✅ 已完成 |    已加入 JSON-LD |
| 關鍵字 (Keywords)  | ✅ 已完成 |    透過 YAML 注入 |
| 樣式美化           | 🏗️ 進行中 |       調整 CSS 中 |

> _表格說明：冒號在左邊表示左對齊，兩邊都有表示居中，右邊表示右對齊。_

---

## 程式碼區塊 (Code Blocks)

**行內程式碼：** 使用 `npm run dev` 啟動專案。

**區塊程式碼 (帶語法高亮)：**

```javascript [app.vue]
export default {
  data() {
    return {
      message: 'Hello Nuxt Content!'
    }
  }
}
```
