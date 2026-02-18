import Link from 'next/link'
import { Gauge } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Gauge className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                Turbo<span className="text-primary">Map</span> Pro
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Profesjonalny serwis chip tuningowy z wieloletnim doświadczeniem.
              Najwyższa jakość map ECU i pełna diagnostyka.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Usługi</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/offer" className="transition-colors hover:text-primary">
                  Stage 1 / 2 / 3 Tuning
                </Link>
              </li>
              <li>
                <Link href="/offer" className="transition-colors hover:text-primary">
                  Pop & Bangs
                </Link>
              </li>
              <li>
                <Link href="/offer" className="transition-colors hover:text-primary">
                  EGR / DPF / AdBlue OFF
                </Link>
              </li>
              <li>
                <Link href="/offer" className="transition-colors hover:text-primary">
                  Eco Tuning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Firma</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/pricing" className="transition-colors hover:text-primary">
                  Cennik
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-primary">
                  Panel klienta
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Kontakt</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>ul. Motorowa 15, Warszawa</li>
              <li>+48 123 456 789</li>
              <li>kontakt@turbomap.pro</li>
              <li>Pn-Pt: 8:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          {'© '}{new Date().getFullYear()}{' TurboMap Pro. Wszelkie prawa zastrzeżone.'}
        </div>
      </div>
    </footer>
  )
}
