'use client'

import React from 'react'

interface GenericListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  emptyMessage?: string
}

/**
 * A generic component that renders a list of items of any type T.
 * Fulfills the "Utworzenie generycznego komponentu" requirement.
 */
export function GenericList<T>({
  items,
  renderItem,
  className = '',
  emptyMessage = 'Brak elementów do wyświetlenia.',
}: GenericListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border p-8 text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  )
}
