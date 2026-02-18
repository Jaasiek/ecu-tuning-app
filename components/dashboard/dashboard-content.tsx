'use client'

import { Gauge, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PowerChart } from './power-chart'
import { OrderStatusCard } from './order-status-card'
import { ServiceHistory } from './service-history'
import { sampleOrders } from '@/lib/data'
import type { StatusColorMap } from '@/lib/types'

const statusColorMap: StatusColorMap = {
  'pending': 'text-chart-4',
  'in-progress': 'text-chart-2',
  'ecu-reading': 'text-chart-2',
  'map-writing': 'text-chart-2',
  'testing': 'text-primary',
  'completed': 'text-chart-3',
  'cancelled': 'text-destructive',
}

const statusLabelMap: Record<string, string> = {
  'pending': 'Oczekujące',
  'in-progress': 'W trakcie',
  'ecu-reading': 'Odczyt ECU',
  'map-writing': 'Tworzenie mapy',
  'testing': 'Testowanie',
  'completed': 'Ukończone',
  'cancelled': 'Anulowane',
}

const stats = [
  {
    label: 'Aktywne zlecenia',
    value: sampleOrders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length,
    icon: Gauge,
    color: 'text-primary',
  },
  {
    label: 'Średni zysk mocy',
    value: '+32%',
    icon: TrendingUp,
    color: 'text-chart-3',
  },
  {
    label: 'Czas realizacji',
    value: '3-5 dni',
    icon: Clock,
    color: 'text-chart-2',
  },
  {
    label: 'Ukończone',
    value: sampleOrders.filter((o) => o.status === 'completed').length,
    icon: CheckCircle2,
    color: 'text-chart-3',
  },
]

export function DashboardContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Panel klienta</h1>
        <p className="mt-2 text-muted-foreground">
          Witaj, Marek! Sprawdź status swoich zamówień i wyniki tuningu.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts & Active Orders */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Power / Torque Chart */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-foreground">Wykres mocy / momentu</CardTitle>
          </CardHeader>
          <CardContent>
            <PowerChart />
          </CardContent>
        </Card>

        {/* Active Order Status */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-foreground">Aktywne zlecenia</h2>
          {sampleOrders
            .filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
            .map((order) => (
              <OrderStatusCard
                key={order.id}
                order={order}
                statusColor={statusColorMap[order.status]}
                statusLabel={statusLabelMap[order.status]}
              />
            ))}
        </div>
      </div>

      {/* Service History Table */}
      <ServiceHistory
        orders={sampleOrders}
        statusColorMap={statusColorMap}
        statusLabelMap={statusLabelMap}
      />
    </div>
  )
}
