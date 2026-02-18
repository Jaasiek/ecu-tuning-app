'use client'

import { useRef, type RefObject } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const containerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Sekcja powitalna"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" />
            <span>Profesjonalny Chip Tuning ECU</span>
          </div>

          {/* Heading */}
          <h1
            className="animate-slide-up text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            Odblokuj pełną moc
            <br />
            <span className="text-primary neon-glow">Twojego silnika</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={{ animationDelay: '0.2s' }}
          >
            Specjalizujemy się w profesjonalnym tworzeniu i modyfikowaniu map ECU.
            Stage 1, 2, 3 - Pop & Bangs - EGR/DPF/AdBlue OFF - Eco Tuning.
          </p>

          {/* CTA */}
          <div
            className="animate-slide-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.3s' }}
          >
            <Button asChild size="lg" className="gap-2 neon-border">
              <Link href="/order">
                Zamów tuning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/offer">Sprawdź ofertę</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div
            className="animate-slide-up mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>Gwarancja bezpieczeństwa</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-5 w-5 text-primary" />
              <span>{'2000+ zadowolonych klientów'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-5 w-5 text-primary" />
              <span>Certyfikowani specjaliści</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
