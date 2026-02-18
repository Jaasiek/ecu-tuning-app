'use client'

import Link from 'next/link'
import { Zap, Flame, Rocket, Sparkles, Shield, Leaf, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GenericList } from '@/components/ui/generic-list'
import { services } from '@/lib/data'
import { ServiceInfo } from '@/lib/types'

const iconMap: Record<string, typeof Zap> = {
  Zap,
  Flame,
  Rocket,
  Sparkles,
  Shield,
  Leaf,
}

export function ServicesPreview() {
  return (
    <section className="py-20 lg:py-28" aria-label="Nasze usługi">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Nasze usługi
          </h2>
          <p className="mt-3 text-muted-foreground">
            Kompleksowe rozwiązania chip tuningowe dla każdego pojazdu
          </p>
        </div>

        <GenericList<ServiceInfo>
          items={services.slice(0, 3)}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          renderItem={(service: ServiceInfo, i: number) => (
            <Card
              key={service.id}
              className="group relative border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <span className="h-6 w-6">🔧</span>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {service.name}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2.5">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-4 w-4 shrink-0 text-primary">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-2xl font-bold text-foreground">
                  od {service.priceFrom.toLocaleString("pl-PL")} PLN
                </span>
              </CardFooter>
            </Card>
          )}
        />

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/offer">
              Zobacz pełną ofertę
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
