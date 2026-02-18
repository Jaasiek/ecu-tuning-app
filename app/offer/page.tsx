import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { OfferContent } from '@/components/offer/offer-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Oferta | TurboMap Pro',
  description: 'Pełna oferta usług chip tuningowych - Stage 1/2/3, Pop & Bangs, EGR/DPF/AdBlue OFF, Eco Tuning.',
}

export default function OfferPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <OfferContent />
      </main>
      <Footer />
    </>
  )
}
