'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Order, StatusColorMap } from '@/lib/types'

type ServiceHistoryProps = {
  orders: Order[]
  statusColorMap: StatusColorMap
  statusLabelMap: Record<string, string>
}

export function ServiceHistory({ orders, statusColorMap, statusLabelMap }: ServiceHistoryProps) {
  return (
    <Card className="border-border/50 bg-card/50 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-foreground">Historia usług</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-foreground">ID</TableHead>
                <TableHead className="text-foreground">Pojazd</TableHead>
                <TableHead className="text-foreground">Usługi</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-right text-foreground">Cena</TableHead>
                <TableHead className="text-right text-foreground">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-border/50 hover:bg-secondary/20">
                  <TableCell className="font-mono text-sm font-medium text-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.vehicle.make} {order.vehicle.model}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {order.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium ${statusColorMap[order.status]}`}
                    >
                      {statusLabelMap[order.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {order.price.toLocaleString('pl-PL')} PLN
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
