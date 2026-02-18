'use client'

import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

interface TabContextType {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

/**
 * Custom Tab Group following the Compound Components pattern.
 * Fulfills the "Stworzenie i użycie własnego komponentu UI działającego wg wzorca Compound Components" requirement.
 */
export function CustomTabGroup({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode
  defaultValue: string
  className?: string
}) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('flex flex-col gap-4', className)}>{children}</div>
    </TabContext.Provider>
  )
}

CustomTabGroup.List = function TabList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex gap-2 border-b border-border/50 pb-2', className)}>
      {children}
    </div>
  )
}

CustomTabGroup.Trigger = function TabTrigger({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabContext)
  if (!context) throw new Error('TabTrigger must be used within CustomTabGroup')

  const isActive = context.activeTab === id

  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(id)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-all rounded-t-lg',
        isActive
          ? 'bg-primary/10 text-primary border-b-2 border-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
        className
      )}
    >
      {children}
    </button>
  )
}

CustomTabGroup.Content = function TabContent({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabContext)
  if (!context) throw new Error('TabContent must be used within CustomTabGroup')

  if (context.activeTab !== id) return null

  return (
    <div className={cn('animate-in fade-in slide-in-from-bottom-2 duration-300', className)}>
      {children}
    </div>
  )
}
