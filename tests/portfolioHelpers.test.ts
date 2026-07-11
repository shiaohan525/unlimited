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
