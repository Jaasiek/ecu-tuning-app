import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Klienta | TurboMap Pro',
  description: 'Sprawdz status zamowien, historie uslug i wyniki tuningu w panelu klienta.',
}

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <DashboardContent />
      </main>
      <Footer />
    </>
  )
}
