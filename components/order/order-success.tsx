'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { VehicleFormData, ModificationsFormData, CustomerFormData } from '@/lib/schemas'

type OrderSuccessProps = {
  data: {
    vehicle: VehicleFormData | null
    modifications: ModificationsFormData | null
    customer: CustomerFormData | null
  }
}

export function OrderSuccess({ data }: OrderSuccessProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <Card className="border-border/50 bg-card/50 text-center">
        <CardContent className="p-10">
          <div className="animate-slide-up">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 neon-border">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Zamówienie wysłane!</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Dziękujemy za złożenie zamówienia. Skontaktujemy się z Tobą w ciągu 24 godzin
              z dokładną wyceną i terminami realizacji.
            </p>

            {data.vehicle && data.modifications && data.customer && (
              <div className="mt-8 rounded-lg border border-border/50 bg-secondary/20 p-6 text-left">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Podsumowanie zamówienia</h3>
                <dl className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Pojazd</dt>
                    <dd className="font-medium text-foreground">
                      {data.vehicle.make} {data.vehicle.model} ({data.vehicle.year})
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Silnik</dt>
                    <dd className="font-medium text-foreground">{data.vehicle.engine}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Stage</dt>
                    <dd className="font-medium text-primary">
                      {data.modifications.stage.toUpperCase()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Docelowa moc</dt>
                    <dd className="font-medium text-foreground font-mono">
                      {data.modifications.targetPower} HP
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Klient</dt>
                    <dd className="font-medium text-foreground">
                      {data.customer.firstName} {data.customer.lastName}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium text-foreground">{data.customer.email}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="gap-2">
                <Link href="/dashboard">
                  Sprawdź status
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Strona główna</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
