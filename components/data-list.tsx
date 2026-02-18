'use client'

import { type ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// ============================================================
// Generic React Component using TypeScript generics
// ============================================================
type DataListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  loading?: boolean
  skeletonCount?: number
  emptyMessage?: string
  className?: string
}

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  loading = false,
  skeletonCount = 3,
  emptyMessage = 'Brak danych do wyswietlenia',
  className,
}: DataListProps<T>) {
  if (loading) {
    return (
      <div className={className}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={`skeleton-${i}`} className="mb-4">
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}
