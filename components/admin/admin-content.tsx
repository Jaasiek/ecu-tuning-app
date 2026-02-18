'use client'

import { useState, useMemo } from 'react'
import {
  Gauge,
  Users,
  TrendingUp,
  DollarSign,
  Search,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { sampleOrders } from '@/lib/data'
import type { Order, OrderStatus } from '@/lib/types'
import { formatPower, formatTorque } from '@/lib/types'

const allStatuses: OrderStatus[] = [
  'pending',
  'in-progress',
  'ecu-reading',
  'map-writing',
  'testing',
  'completed',
  'cancelled',
]

const statusLabelMap: Record<OrderStatus, string> = {
  pending: 'Oczekujące',
  'in-progress': 'W trakcie',
  'ecu-reading': 'Odczyt ECU',
  'map-writing': 'Tworzenie mapy',
  testing: 'Testowanie',
  completed: 'Ukończone',
  cancelled: 'Anulowane',
}

const statusVariantMap: Record<OrderStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'outline',
  'in-progress': 'secondary',
  'ecu-reading': 'secondary',
  'map-writing': 'secondary',
  testing: 'default',
  completed: 'default',
  cancelled: 'destructive',
}

type SortField = 'id' | 'customer' | 'vehicle' | 'status' | 'price' | 'date'
type SortDirection = 'asc' | 'desc'

export function AdminContent() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.price, 0),
    [orders]
  )
  const activeOrders = useMemo(
    () => orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length,
    [orders]
  )
  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === 'completed').length,
    [orders]
  )
  const uniqueCustomers = useMemo(
    () => new Set(orders.map((o) => o.customer.id)).size,
    [orders]
  )

  const filteredOrders = useMemo(() => {
    let result = [...orders]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase().includes(q) ||
          `${o.vehicle.make} ${o.vehicle.model}`.toLowerCase().includes(q) ||
          o.vehicle.vin.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter)
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'id':
          cmp = a.id.localeCompare(b.id)
          break
        case 'customer':
          cmp = `${a.customer.lastName}`.localeCompare(`${b.customer.lastName}`)
          break
        case 'vehicle':
          cmp = `${a.vehicle.make} ${a.vehicle.model}`.localeCompare(
            `${b.vehicle.make} ${b.vehicle.model}`
          )
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
        case 'price':
          cmp = a.price - b.price
          break
        case 'date':
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [orders, searchQuery, statusFilter, sortField, sortDir])

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o
        const progressMap: Record<OrderStatus, number> = {
          pending: 0,
          'in-progress': 20,
          'ecu-reading': 40,
          'map-writing': 60,
          testing: 80,
          completed: 100,
          cancelled: 0,
        }
        return {
          ...o,
          status: newStatus,
          progress: progressMap[newStatus],
          updatedAt: new Date().toISOString(),
        }
      })
    )
  }

  const stats = [
    {
      label: 'Łączny przychód',
      value: `${totalRevenue.toLocaleString('pl-PL')} PLN`,
      icon: DollarSign,
    },
    { label: 'Aktywne zlecenia', value: activeOrders, icon: Gauge },
    { label: 'Ukończone', value: completedOrders, icon: TrendingUp },
    { label: 'Klienci', value: uniqueCustomers, icon: Users },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Panel administracyjny</h1>
        <p className="mt-2 text-muted-foreground">
          Zarządzaj zleceniami, śledź przychody i kontroluj status realizacji.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-primary" />
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

      {/* Filters */}
      <Card className="mb-6 border-border/50 bg-card/50">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Szukaj po ID, kliencie, pojeździe, VIN..."
              className="border-border/50 bg-secondary/50 pl-9 text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full border-border/50 bg-secondary/50 text-foreground sm:w-48">
              <SelectValue placeholder="Filtruj status" />
            </SelectTrigger>
            <SelectContent className="border-border/50 bg-card text-foreground">
              <SelectItem value="all">Wszystkie statusy</SelectItem>
              {allStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabelMap[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-foreground">
            Zlecenia ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <SortableHead field="id" current={sortField} dir={sortDir} onSort={handleSort}>
                    ID
                  </SortableHead>
                  <SortableHead field="customer" current={sortField} dir={sortDir} onSort={handleSort}>
                    Klient
                  </SortableHead>
                  <SortableHead field="vehicle" current={sortField} dir={sortDir} onSort={handleSort}>
                    Pojazd
                  </SortableHead>
                  <TableHead className="text-foreground">Usługi</TableHead>
                  <SortableHead field="status" current={sortField} dir={sortDir} onSort={handleSort}>
                    Status
                  </SortableHead>
                  <TableHead className="text-foreground">Postęp</TableHead>
                  <SortableHead field="price" current={sortField} dir={sortDir} onSort={handleSort}>
                    Cena
                  </SortableHead>
                  <SortableHead field="date" current={sortField} dir={sortDir} onSort={handleSort}>
                    Data
                  </SortableHead>
                  <TableHead className="text-right text-foreground">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                      Brak zleceń pasujących do kryteriów wyszukiwania.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-border/50 hover:bg-secondary/20">
                      <TableCell className="font-mono text-sm font-medium text-foreground">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground">
                            {order.vehicle.make} {order.vehicle.model}
                          </p>
                          <p className="text-xs text-muted-foreground">{order.vehicle.engine}</p>
                        </div>
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
                        <Badge variant={statusVariantMap[order.status]}>
                          {statusLabelMap[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={order.progress} className="h-1.5 w-16" />
                          <span className="font-mono text-xs text-muted-foreground">
                            {order.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {order.price.toLocaleString('pl-PL')} PLN
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Status Change */}
                          <Select
                            value={order.status}
                            onValueChange={(val) =>
                              handleStatusChange(order.id, val as OrderStatus)
                            }
                          >
                            <SelectTrigger className="h-8 w-32 border-border/50 bg-secondary/50 text-xs text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-border/50 bg-card text-foreground">
                              {allStatuses.map((s) => (
                                <SelectItem key={s} value={s} className="text-xs">
                                  {statusLabelMap[s]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {/* Detail Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 border-border/50 text-xs text-foreground">
                                Szczegóły
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-border/50 bg-card text-foreground sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="text-foreground">
                                  Zlecenie {order.id}
                                </DialogTitle>
                              </DialogHeader>
                              <OrderDetailView order={order} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---- Sortable Table Head ---- */
function SortableHead({
  field,
  current,
  dir,
  onSort,
  children,
}: {
  field: SortField
  current: SortField
  dir: SortDirection
  onSort: (f: SortField) => void
  children: React.ReactNode
}) {
  return (
    <TableHead
      className="cursor-pointer select-none text-foreground transition-colors hover:text-primary"
      onClick={() => onSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
        {current === field && (
          <ChevronDown
            className={`h-3 w-3 text-primary transition-transform ${dir === 'asc' ? 'rotate-180' : ''}`}
          />
        )}
      </span>
    </TableHead>
  )
}

/* ---- Order Detail View inside Dialog ---- */
function OrderDetailView({ order }: { order: Order }) {
  return (
    <div className="flex flex-col gap-4 pt-2 text-sm">
      <div className="grid grid-cols-2 gap-3">
        <DetailRow label="Klient" value={`${order.customer.firstName} ${order.customer.lastName}`} />
        <DetailRow label="Email" value={order.customer.email} />
        <DetailRow label="Telefon" value={order.customer.phone} />
        <DetailRow label="Pojazd" value={`${order.vehicle.make} ${order.vehicle.model} (${order.vehicle.year})`} />
        <DetailRow label="Silnik" value={order.vehicle.engine} />
        <DetailRow label="VIN" value={order.vehicle.vin} />
        <DetailRow label="Przebieg" value={`${order.vehicle.mileage.toLocaleString('pl-PL')} km`} />
        <DetailRow label="Typ ECU" value={order.vehicle.ecuType} />
      </div>

      <div className="border-t border-border/50 pt-3">
        <h4 className="mb-2 font-semibold text-foreground">Wyniki tuningu</h4>
        <div className="grid grid-cols-2 gap-3">
          <DetailRow label="Moc oryginalna" value={formatPower(order.vehicle.originalPower)} />
          <DetailRow label="Moment oryginalny" value={formatTorque(order.vehicle.originalTorque)} />
          {order.newPower && (
            <DetailRow label="Nowa moc" value={formatPower(order.newPower)} highlight />
          )}
          {order.newTorque && (
            <DetailRow label="Nowy moment" value={formatTorque(order.newTorque)} highlight />
          )}
        </div>
      </div>

      <div className="border-t border-border/50 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Cena</span>
          <span className="text-lg font-bold text-foreground">
            {order.price.toLocaleString('pl-PL')} PLN
          </span>
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-medium ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
    </div>
  )
}
