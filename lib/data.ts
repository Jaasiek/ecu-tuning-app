import type {
  Order,
  PowerDataPoint,
  ServiceInfo,
  PricingTier,
  NavItem,
  ServiceCategory,
} from './types'

// ============================================================
// Navigation
// ============================================================
export const navItems: NavItem[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Oferta', href: '/offer' },
  { label: 'Cennik', href: '/pricing' },
  { label: 'Zamówienie', href: '/order' },
  { label: 'Strefa klienta', href: '/dashboard' },
  { label: 'Admin', href: '/admin' },
  { label: 'Kontakt', href: '/contact' },
]

// ============================================================
// Services
// ============================================================
export const services: ServiceInfo[] = [
  {
    id: 'stage1',
    name: 'Stage 1 Tuning',
    description:
      'Optymalizacja mapy ECU dla większej mocy i momentu obrotowego bez modyfikacji mechanicznych.',
    icon: 'Zap',
    features: [
      'Wzrost mocy do 30%',
      'Lepszy moment obrotowy',
      'Optymalizacja zużycia paliwa',
      'Bezpieczne dla silnika',
    ],
    priceFrom: 1500,
  },
  {
    id: 'stage2',
    name: 'Stage 2 Tuning',
    description:
      'Zaawansowana modyfikacja ECU z uwzględnieniem zmodyfikowanego układu dolotowego i wydechowego.',
    icon: 'Flame',
    features: [
      'Wzrost mocy do 50%',
      'Wymaga modyfikacji mechanicznych',
      'Dedykowana mapa ECU',
      'Diagnostyka na hamowni',
    ],
    priceFrom: 2500,
  },
  {
    id: 'stage3',
    name: 'Stage 3 Tuning',
    description:
      'Maksymalna wydajność - turbo upgrade, wtryskiwacze, intercooler i pełna optymalizacja ECU.',
    icon: 'Rocket',
    features: [
      'Wzrost mocy do 100%+',
      'Turbo upgrade / hybrydowe turbo',
      'Zmodyfikowane wtryskiwacze',
      'Pełna diagnostyka i testowanie',
    ],
    priceFrom: 5000,
  },
  {
    id: 'pop-and-bangs',
    name: 'Pop & Bangs',
    description: 'Efektowne strzały z wydechu podczas zwalniania i zmiany biegów.',
    icon: 'Sparkles',
    features: [
      'Burble mode',
      'Regulowana intensywność',
      'Bezpieczne dla katalizatora',
      'Efektowny dźwięk',
    ],
    priceFrom: 800,
  },
  {
    id: 'egr-off',
    name: 'EGR / DPF / AdBlue OFF',
    description: 'Usuwanie systemów ograniczających wydajność silnika.',
    icon: 'Shield',
    features: [
      'Usunięcie EGR',
      'Usunięcie DPF',
      'Wyłączenie AdBlue',
      'Poprawa dynamiki',
    ],
    priceFrom: 1200,
  },
  {
    id: 'eco-tuning',
    name: 'Eco Tuning',
    description:
      'Optymalizacja mapy ECU ukierunkowana na zmniejszenie zużycia paliwa.',
    icon: 'Leaf',
    features: [
      'Oszczędność do 15%',
      'Płynniejsza jazda',
      'Mniejsza emisja CO2',
      'Idealne do flot',
    ],
    priceFrom: 1000,
  },
]

// ============================================================
// Pricing Tiers
// ============================================================
export const pricingTiers: PricingTier[] = [
  {
    id: 'tier-stage1',
    name: 'Stage 1',
    description: 'Podstawowa optymalizacja ECU',
    features: [
      'Wzrost mocy do 30%',
      'Optymalizacja momentu',
      'Diagnostyka pre/post',
      'Gwarancja oprogramowania',
      '14 dni na zwrot',
    ],
    price: 1500,
    popular: false,
    stage: 'stage1',
  },
  {
    id: 'tier-stage2',
    name: 'Stage 2',
    description: 'Zaawansowana modyfikacja ECU',
    features: [
      'Wzrost mocy do 50%',
      'Dedykowana mapa ECU',
      'Test na hamowni',
      'Konsultacja techniczna',
      'Gwarancja 12 miesięcy',
      'Priority support',
    ],
    price: 2500,
    popular: true,
    stage: 'stage2',
  },
  {
    id: 'tier-stage3',
    name: 'Stage 3',
    description: 'Maksymalna wydajnosc',
    features: [
      'Wzrost mocy do 100%+',
      'Custom turbo mapping',
      'Pełna diagnostyka',
      'Test na hamowni',
      'Gwarancja 24 miesiące',
      'Dedykowany opiekun',
      'Darmowe poprawki mapy',
    ],
    price: 5000,
    popular: false,
    stage: 'stage3',
  },
]

// ============================================================
// Dyno Chart Data
// ============================================================
export const powerChartData: PowerDataPoint[] = [
  { rpm: 1000, stockPower: 45, tunedPower: 55, stockTorque: 120, tunedTorque: 150 },
  { rpm: 1500, stockPower: 65, tunedPower: 82, stockTorque: 180, tunedTorque: 225 },
  { rpm: 2000, stockPower: 90, tunedPower: 118, stockTorque: 250, tunedTorque: 315 },
  { rpm: 2500, stockPower: 120, tunedPower: 158, stockTorque: 310, tunedTorque: 390 },
  { rpm: 3000, stockPower: 150, tunedPower: 198, stockTorque: 350, tunedTorque: 430 },
  { rpm: 3500, stockPower: 175, tunedPower: 232, stockTorque: 370, tunedTorque: 450 },
  { rpm: 4000, stockPower: 195, tunedPower: 258, stockTorque: 360, tunedTorque: 440 },
  { rpm: 4500, stockPower: 210, tunedPower: 275, stockTorque: 340, tunedTorque: 415 },
  { rpm: 5000, stockPower: 218, tunedPower: 285, stockTorque: 310, tunedTorque: 380 },
  { rpm: 5500, stockPower: 215, tunedPower: 278, stockTorque: 280, tunedTorque: 345 },
  { rpm: 6000, stockPower: 200, tunedPower: 260, stockTorque: 240, tunedTorque: 300 },
]

// ============================================================
// Sample Orders
// ============================================================
export const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-05T14:30:00Z',
    customer: {
      id: 'CUST-001',
      firstName: 'Marek',
      lastName: 'Kowalski',
      email: 'marek@example.com',
      phone: '+48 512 345 678',
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-11-01T10:00:00Z',
    },
    vehicle: {
      id: 'VEH-001',
      make: 'BMW',
      model: '335d E90',
      year: 2019,
      engine: '3.0 TwinTurbo Diesel',
      fuelType: 'diesel',
      ecuType: 'Bosch EDC17',
      vin: 'WBAPH5C55BA123456',
      mileage: 85000,
      originalPower: 286,
      originalTorque: 580,
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    },
    services: ['stage2', 'dpf-off'] as ServiceCategory[],
    status: 'testing',
    estimatedCompletion: '2024-12-08T18:00:00Z',
    progress: 80,
    price: 3500,
    newPower: 380,
    newTorque: 720,
  },
  {
    id: 'ORD-2024-002',
    createdAt: '2024-12-03T08:00:00Z',
    updatedAt: '2024-12-04T12:00:00Z',
    customer: {
      id: 'CUST-002',
      firstName: 'Anna',
      lastName: 'Nowak',
      email: 'anna@example.com',
      phone: '+48 600 111 222',
      createdAt: '2024-11-15T10:00:00Z',
      updatedAt: '2024-11-15T10:00:00Z',
    },
    vehicle: {
      id: 'VEH-002',
      make: 'Volkswagen',
      model: 'Golf R Mk7',
      year: 2021,
      engine: '2.0 TSI',
      fuelType: 'petrol',
      ecuType: 'Bosch MED17.5',
      vin: 'WVWZZZ1KZLW123456',
      mileage: 42000,
      originalPower: 310,
      originalTorque: 400,
      createdAt: '2024-12-03T08:00:00Z',
      updatedAt: '2024-12-03T08:00:00Z',
    },
    services: ['stage1', 'pop-and-bangs'] as ServiceCategory[],
    status: 'in-progress',
    estimatedCompletion: '2024-12-06T16:00:00Z',
    progress: 45,
    price: 2200,
    newPower: 380,
    newTorque: 480,
  },
  {
    id: 'ORD-2024-003',
    createdAt: '2024-11-28T09:00:00Z',
    updatedAt: '2024-12-02T17:00:00Z',
    customer: {
      id: 'CUST-003',
      firstName: 'Piotr',
      lastName: 'Wisniewski',
      email: 'piotr@example.com',
      phone: '+48 700 333 444',
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-01T10:00:00Z',
    },
    vehicle: {
      id: 'VEH-003',
      make: 'Audi',
      model: 'RS3 8V',
      year: 2022,
      engine: '2.5 TFSI',
      fuelType: 'petrol',
      ecuType: 'Bosch MED17.1',
      vin: 'WAUZZZ8V6NA123456',
      mileage: 28000,
      originalPower: 400,
      originalTorque: 480,
      createdAt: '2024-11-28T09:00:00Z',
      updatedAt: '2024-11-28T09:00:00Z',
    },
    services: ['stage3', 'pop-and-bangs', 'egr-off'] as ServiceCategory[],
    status: 'completed',
    estimatedCompletion: '2024-12-02T18:00:00Z',
    progress: 100,
    price: 6200,
    newPower: 550,
    newTorque: 620,
  },
  {
    id: 'ORD-2024-004',
    createdAt: '2024-12-05T11:00:00Z',
    updatedAt: '2024-12-05T11:00:00Z',
    customer: {
      id: 'CUST-004',
      firstName: 'Katarzyna',
      lastName: 'Lewandowska',
      email: 'kasia@example.com',
      phone: '+48 888 555 666',
      createdAt: '2024-12-05T11:00:00Z',
      updatedAt: '2024-12-05T11:00:00Z',
    },
    vehicle: {
      id: 'VEH-004',
      make: 'Mercedes',
      model: 'C220d W205',
      year: 2020,
      engine: '2.0 CDI',
      fuelType: 'diesel',
      ecuType: 'Delphi CRD3',
      vin: 'WDD2050091A123456',
      mileage: 65000,
      originalPower: 194,
      originalTorque: 400,
      createdAt: '2024-12-05T11:00:00Z',
      updatedAt: '2024-12-05T11:00:00Z',
    },
    services: ['eco-tuning'] as ServiceCategory[],
    status: 'pending',
    estimatedCompletion: '2024-12-10T18:00:00Z',
    progress: 0,
    price: 1000,
  },
]

// ============================================================
// Car Makes
// ============================================================
export const carMakes = [
  'Audi', 'BMW', 'Chevrolet', 'Citroen', 'Dacia',
  'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar',
  'Jeep', 'Kia', 'Land Rover', 'Mazda', 'Mercedes',
  'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot',
  'Porsche', 'Renault', 'Seat', 'Skoda', 'Subaru',
  'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'
]

export const ecuTypes = [
  'Bosch EDC17', 'Bosch MED17', 'Bosch ME7', 'Bosch MG1',
  'Siemens SID 807', 'Siemens SID 206', 'Continental SID 807',
  'Delphi CRD3', 'Denso SH72',  'Marelli MJD',
]
