// ============================================================
// Advanced TypeScript: Union, Intersection, Generics, Utility Types
// ============================================================

// --- Tuning Stage Union Type ---
export type TuningStage = 'stage1' | 'stage2' | 'stage3'

// --- Modification Union Type ---
export type Modification =
  | 'pop-and-bangs'
  | 'egr-off'
  | 'dpf-off'
  | 'adblue-off'
  | 'eco-tuning'
  | 'ecu-diagnostics'

// --- Service Category Union ---
export type ServiceCategory = TuningStage | Modification

// --- Order Status Union ---
export type OrderStatus =
  | 'pending'
  | 'in-progress'
  | 'ecu-reading'
  | 'map-writing'
  | 'testing'
  | 'completed'
  | 'cancelled'

// --- Fuel Type ---
export type FuelType = 'diesel' | 'petrol' | 'hybrid'

// --- Base Entity with Intersection ---
type BaseEntity = {
  id: string
  createdAt: string
  updatedAt: string
}

// Intersection type: Vehicle & Base
export type Vehicle = BaseEntity & {
  make: string
  model: string
  year: number
  engine: string
  fuelType: FuelType
  ecuType: string
  vin: string
  mileage: number
  originalPower: number
  originalTorque: number
}

// Intersection type: Customer & Base
export type Customer = BaseEntity & {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
}

// Intersection type: Order & Base
export type Order = BaseEntity & {
  customer: Customer
  vehicle: Vehicle
  services: ServiceCategory[]
  status: OrderStatus
  estimatedCompletion: string
  progress: number
  notes?: string
  price: number
  newPower?: number
  newTorque?: number
}

// --- Using Partial<T> ---
export type OrderUpdate = Partial<Order>

// --- Using Pick<T, K> ---
export type OrderSummary = Pick<Order, 'id' | 'status' | 'progress' | 'price' | 'estimatedCompletion'>

// --- Using Omit<T, K> ---
export type NewOrder = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'progress'>

// --- Using Readonly<T> ---
export type ReadonlyVehicle = Readonly<Vehicle>

// --- Using Record<K, V> ---
export type ServicePricing = Record<ServiceCategory, number>

export type StatusColorMap = Record<OrderStatus, string>

// --- Chart Data ---
export type PowerDataPoint = {
  rpm: number
  stockPower: number
  tunedPower: number
  stockTorque: number
  tunedTorque: number
}

// --- Service info ---
export type ServiceInfo = {
  id: ServiceCategory
  name: string
  description: string
  icon: string
  features: string[]
  priceFrom: number
}

// --- Pricing Tier ---
export type PricingTier = {
  id: string
  name: string
  description: string
  features: string[]
  price: number
  popular: boolean
  stage: TuningStage
}

// --- Navigation Item ---
export type NavItem = {
  label: string
  href: string
}

// --- Dashboard Stats ---
export type DashboardStat = {
  label: string
  value: string | number
  change?: number
  icon: string
}

// --- Type Predicate ---
export function isValidOrder(value: unknown): value is Order {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    typeof obj.status === 'string' &&
    typeof obj.progress === 'number' &&
    Array.isArray(obj.services)
  )
}

export function isCompletedOrder(order: Order): order is Order & { status: 'completed' } {
  return order.status === 'completed'
}

// --- Function Overloads ---
export function formatPower(value: number): string
export function formatPower(value: number, unit: 'hp' | 'kw'): string
export function formatPower(value: number, unit?: 'hp' | 'kw'): string {
  const u = unit ?? 'hp'
  if (u === 'kw') {
    return `${Math.round(value * 0.7457)} kW`
  }
  return `${value} HP`
}

export function formatTorque(value: number): string
export function formatTorque(value: number, unit: 'nm' | 'lbft'): string
export function formatTorque(value: number, unit?: 'nm' | 'lbft'): string {
  const u = unit ?? 'nm'
  if (u === 'lbft') {
    return `${Math.round(value * 0.7376)} lb-ft`
  }
  return `${value} Nm`
}

// --- Generic API Response ---
export type ApiResponse<T> = {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

// --- Generic Paginated Response ---
export type PaginatedResponse<T> = ApiResponse<T[]> & {
  total: number
  page: number
  pageSize: number
}
