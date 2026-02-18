'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import type { Order } from '@/lib/types'
import { formatPower, formatTorque } from '@/lib/types'

type OrderStatusCardProps = {
  order: Order
  statusColor: string
  statusLabel: string
}

export function OrderStatusCard({ order, statusColor, statusLabel }: OrderStatusCardProps) {
  const estimatedDate = new Date(order.estimatedCompletion)
  const now = new Date()
  const daysLeft = Math.max(0, Math.ceil((estimatedDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

  return (
    <Card className="border-border/50 bg-card/50 transition-colors hover:bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-foreground">{order.id}</span>
              <span className={`rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                {statusLabel}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.vehicle.make} {order.vehicle.model} - {order.vehicle.engine}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Szczegóły zlecenia</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 border-border/50 bg-card" align="end">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moc oryginalna</span>
                  <span className="font-medium text-foreground">
                    {formatPower(order.vehicle.originalPower)}
                  </span>
                </div>
                {order.newPower && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nowa moc</span>
                    <span className="font-medium text-primary">
                      {formatPower(order.newPower)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moment oryginalny</span>
                  <span className="font-medium text-foreground">
                    {formatTorque(order.vehicle.originalTorque)}
                  </span>
                </div>
                {order.newTorque && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nowy moment</span>
                    <span className="font-medium text-primary">
                      {formatTorque(order.newTorque)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cena</span>
                  <span className="font-medium text-foreground">
                    {order.price.toLocaleString('pl-PL')} PLN
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Postęp realizacji</span>
            <span className="font-mono font-medium text-foreground">{order.progress}%</span>
          </div>
          <Progress value={order.progress} className="h-2" />
        </div>

        {/* Estimated time */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Estymowane ukończenie</span>
          <span className="font-medium text-foreground">
            {daysLeft > 0 ? `${daysLeft} dni` : 'Dziś'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
