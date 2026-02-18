'use client'

import Link from 'next/link'
import { Zap, Flame, Rocket, Sparkles, Shield, Leaf, ArrowRight, Check } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { services } from '@/lib/data'
import type { ServiceInfo } from '@/lib/types'

const iconMap: Record<string, typeof Zap> = {
  Zap,
  Flame,
  Rocket,
  Sparkles,
  Shield,
  Leaf,
}

function ServiceDetailDialog({ service }: { service: ServiceInfo }) {
  const Icon = iconMap[service.icon] ?? Zap

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          Szczegóły
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/50 bg-card sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <DialogTitle className="text-foreground">{service.name}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="mb-3 text-sm font-semibold text-foreground">Co obejmuje:</h4>
          <ul className="flex flex-col gap-2.5">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between rounded-lg border border-border/50 bg-secondary/50 p-4">
            <span className="text-sm text-muted-foreground">Cena od</span>
            <span className="text-xl font-bold text-foreground">
              {service.priceFrom.toLocaleString('pl-PL')} PLN
            </span>
          </div>
          <Button asChild className="mt-4 w-full gap-2">
            <Link href="/order">
              Zamów teraz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function OfferContent() {
  return (
    <TooltipProvider>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground md:text-5xl">
            Nasza oferta
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Profesjonalne usługi chip tuningu ECU dla każdego typu pojazdu
          </p>
        </div>

        {/* Tuning Stages */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Tuning ECU</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {services.slice(0, 3).map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap
              return (
                <Card
                  key={service.id}
                  className="group relative border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {service.id === 'stage2' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Najpopularniejszy
                    </div>
                  )}
                  <CardHeader>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                          <Icon className="h-6 w-6" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{service.name} - Kliknij po szczegóły</p>
                      </TooltipContent>
                    </Tooltip>
                    <CardTitle className="text-xl text-foreground">{service.name}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      od {service.priceFrom.toLocaleString('pl-PL')} PLN
                    </span>
                    <ServiceDetailDialog service={service} />
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-foreground">Dodatkowe usługi</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(3).map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap
              return (
                <Card
                  key={service.id}
                  className="group border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-foreground">{service.name}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-4 flex flex-col gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">
                      od {service.priceFrom.toLocaleString('pl-PL')} PLN
                    </span>
                    <ServiceDetailDialog service={service} />
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Button asChild size="lg" className="gap-2 neon-border">
            <Link href="/order">
              Rozpocznij zamówienie
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
