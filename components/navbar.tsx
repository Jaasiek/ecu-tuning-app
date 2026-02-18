'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Gauge } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/data'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          aria-label="TurboMap Pro - Strona główna"
        >
          <Gauge className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
          <span className="text-lg font-bold tracking-tight">
            Turbo<span className="text-primary">Map</span> Pro
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground',
                  pathname === item.href
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/order">Zamów tuning</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="glass animate-slide-up border-t border-border/50 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground',
                    pathname === item.href
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild className="w-full" size="sm">
                <Link href="/order" onClick={() => setMobileOpen(false)}>
                  Zamów tuning
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
