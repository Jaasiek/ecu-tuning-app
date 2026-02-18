'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="border-t border-border/50 py-20 lg:py-28" aria-label="Rozpocznij">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-10 text-center neon-border md:p-16">
          {/* Background glow */}
          <div className="absolute left-1/2 top-0 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Gotowy na więcej mocy?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Zamów profesjonalny chip tuning już dziś. Bezpłatna wycena i konsultacja.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2 neon-border">
                <Link href="/order">
                  Rozpocznij zamówienie
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Skontaktuj się</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
