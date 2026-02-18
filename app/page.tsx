import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/landing/hero'
import { Stats } from '@/components/landing/stats'
import { ServicesPreview } from '@/components/landing/services-preview'
import { CTA } from '@/components/landing/cta'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <Hero />
        <Stats />
        <ServicesPreview />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
