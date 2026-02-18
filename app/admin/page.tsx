import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminContent } from '@/components/admin/admin-content'

export const metadata: Metadata = {
  title: 'Admin Panel | TurboMap Pro',
  description: 'Panel administracyjny - zarzadzanie zleceniami i klientami.',
}

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <AdminContent />
      </main>
      <Footer />
    </>
  )
}
