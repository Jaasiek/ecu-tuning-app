import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { OrderWizard } from '@/components/order/order-wizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zamowienie | TurboMap Pro',
  description: 'Zamow profesjonalny chip tuning ECU - wypelnij formularz i otrzymaj wycene.',
}

export default function OrderPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <OrderWizard />
      </main>
      <Footer />
    </>
  )
}
