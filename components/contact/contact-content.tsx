'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { contactSchema, type ContactFormData } from '@/lib/schemas'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'ul. Motorowa 15',
    detail: '00-123 Warszawa',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+48 123 456 789',
    detail: 'Pn-Pt: 8:00 - 18:00',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'kontakt@turbomap.pro',
    detail: 'Odpowiadamy w 24h',
  },
  {
    icon: Clock,
    label: 'Godziny otwarcia',
    value: 'Poniedziałek - Piątek',
    detail: '8:00 - 18:00 | Sobota: 9:00 - 14:00',
  },
]

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  function onSubmit(data: ContactFormData) {
    // Simulate sending
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-balance text-3xl font-bold text-foreground md:text-5xl">
          Skontaktuj się z nami
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          Masz pytanie dotyczące tuningu? Potrzebujesz wyceny dla swojego auta?
          Napisz do nas lub zadzwoń - chętnie pomożemy.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Contact Form - 3 cols */}
        <div className="lg:col-span-3">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-foreground">Formularz kontaktowy</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Wiadomość wysłana!
                  </h3>
                  <p className="max-w-sm text-muted-foreground">
                    Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe,
                    zazwyczaj w ciągu 24 godzin.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-border/50 text-foreground"
                    onClick={() => setSubmitted(false)}
                  >
                    Wyślij kolejną wiadomość
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-foreground">
                        Imię i nazwisko
                      </Label>
                      <Input
                        id="name"
                        placeholder="Jan Kowalski"
                        className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jan@example.com"
                        className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="subject" className="text-foreground">
                      Temat
                    </Label>
                    <Input
                      id="subject"
                      placeholder="np. Wycena Stage 2 dla BMW 335d"
                      className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-foreground">
                      Wiadomość
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Opisz swoje pytanie lub potrzeby..."
                      rows={6}
                      className="resize-none border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="gap-2 self-start">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Info - 2 cols */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {contactInfo.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label} className="border-border/50 bg-card/50">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Map placeholder */}
          <Card className="flex-1 overflow-hidden border-border/50 bg-card/50">
            <CardContent className="p-0">
              <div className="flex h-48 items-center justify-center bg-secondary/30 lg:h-full lg:min-h-[200px]">
                <div className="flex flex-col items-center gap-2 text-center">
                  <MapPin className="h-8 w-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">ul. Motorowa 15</p>
                  <p className="text-xs text-muted-foreground">00-123 Warszawa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
