'use client'

const stats = [
  { value: '2,150+', label: 'Zrealizowanych projektów' },
  { value: '98%', label: 'Zadowolonych klientów' },
  { value: '8+', label: 'Lat doświadczenia' },
  { value: '350+', label: 'Modeli aut w bazie' },
]

export function Stats() {
  return (
    <section className="border-y border-border/50 bg-card/30 @container" aria-label="Statystyki firmy">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 @lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-count-up text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary @md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
