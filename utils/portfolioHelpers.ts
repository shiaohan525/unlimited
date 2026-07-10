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
