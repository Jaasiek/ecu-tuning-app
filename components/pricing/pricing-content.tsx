'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { pricingTiers, services } from '@/lib/data'
import { cn } from '@/lib/utils'
import { CustomTabGroup } from '@/components/ui/custom-tabs'
import { GenericList } from '@/components/ui/generic-list'
import { PricingTier } from '@/lib/types'

export function PricingContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-balance text-3xl font-bold text-foreground md:text-5xl">
          Przejrzysty cennik
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Wybierz pakiet dopasowany do Twoich potrzeb
        </p>
      </div>

      {/* Pricing with Custom Compound Component */}
      <div className="mb-20">
        <CustomTabGroup defaultValue="tier-stage2">
          <CustomTabGroup.List className="justify-center">
            {pricingTiers.map((tier) => (
              <CustomTabGroup.Trigger key={tier.id} id={tier.id}>
                {tier.name}
              </CustomTabGroup.Trigger>
            ))}
          </CustomTabGroup.List>

          <div className="mt-8">
            {pricingTiers.map((tier, i) => (
              <CustomTabGroup.Content key={tier.id} id={tier.id}>
                <div className="mx-auto max-w-lg">
                  <Card
                    className={cn(
                      'relative border-border/50 bg-card/50 transition-all duration-300 hover:bg-card',
                      tier.popular && 'border-primary/40 neon-border'
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                        Najpopularniejszy
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-foreground">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-foreground">
                          {tier.price.toLocaleString('pl-PL')}
                        </span>
                        <span className="ml-1 text-muted-foreground">PLN</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="flex flex-col gap-3">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className={cn(
                          'w-full gap-2',
                          tier.popular ? 'neon-border' : ''
                        )}
                        variant={tier.popular ? 'default' : 'outline'}
                      >
                        <Link href="/order">
                          Wybierz {tier.name}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CustomTabGroup.Content>
            ))}
          </div>
        </CustomTabGroup>
      </div>

      {/* Additional Services Table */}
      <div>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          Dodatkowe usługi
        </h2>
        <Card className="border-border/50 bg-card/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-foreground">Usługa</TableHead>
                <TableHead className="text-foreground">Opis</TableHead>
                <TableHead className="text-right text-foreground">Cena od</TableHead>
                <TableHead className="text-right text-foreground">Akcja</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.slice(3).map((service) => (
                <TableRow key={service.id} className="border-border/50 hover:bg-secondary/30">
                  <TableCell className="font-medium text-foreground">{service.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs">{service.description}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">
                    {service.priceFrom.toLocaleString('pl-PL')} PLN
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
                      <Link href="/order">Zamów</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* FAQ / Note */}
      <div className="mt-16 rounded-xl border border-border/50 bg-card/30 p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Potrzebujesz indywidualnej wyceny?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Każdy pojazd jest inny. Skontaktuj się z nami po dokładną wycenę dopasowaną do Twojego auta.
        </p>
        <Button asChild variant="outline" className="mt-6 gap-2">
          <Link href="/contact">
            Skontaktuj się
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
