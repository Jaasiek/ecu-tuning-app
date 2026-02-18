import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactContent } from '@/components/contact/contact-content'

export const metadata: Metadata = {
  title: 'Kontakt | TurboMap Pro',
  description: 'Skontaktuj się z nami - formularz kontaktowy, telefon, email i mapa dojazdu.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
