// content.config.ts
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // 定義一個叫 content 的集合，掃描所有目錄下的檔案
    content: defineCollection({
      source: '**/*.md', // 掃描所有子目錄
      type: 'page'
    })
  }
})
