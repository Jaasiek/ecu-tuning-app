import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PricingContent } from '@/components/pricing/pricing-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cennik | TurboMap Pro',
  description: 'Przejrzysty cennik usług chip tuningowych - Stage 1, Stage 2, Stage 3 i dodatkowe modyfikacje.',
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PricingContent />
      </main>
      <Footer />
    </>
  )
}
