'use client'

import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Upload, FileText, X, ShieldCheck } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { customerSchema, type CustomerFormData } from '@/lib/schemas'

type StepCustomerProps = {
  defaultValues?: CustomerFormData
  onSubmit: (data: CustomerFormData) => void
  onBack: () => void
}

export function StepCustomer({ defaultValues, onSubmit, onBack }: StepCustomerProps) {
  const [fileName, setFileName] = useState<string>(defaultValues?.ecuFile ?? '')
  const [isMounted, setIsMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValues ?? {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      acceptTerms: false,
      ecuFile: '',
      captchaToken: '',
    },
  })

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      form.setValue('ecuFile', file.name)
    }
  }

  function handleRemoveFile() {
    setFileName('')
    form.setValue('ecuFile', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-foreground">Dane klienta</CardTitle>
        <CardDescription>Podaj swoje dane kontaktowe i załaduj plik ECU</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan" className="bg-secondary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Kowalski" className="bg-secondary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jan@example.com"
                        className="bg-secondary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+48 123 456 789"
                        className="bg-secondary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>
                      Firma <span className="text-muted-foreground">(opcjonalnie)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nazwa firmy"
                        className="bg-secondary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ECU File Upload - Custom Control */}
            <div>
              <FormLabel>Plik ECU (opcjonalnie)</FormLabel>
              <FormDescription className="mb-3">
                Załaduj plik oryginalnej mapy ECU (.bin, .ori, .mod)
              </FormDescription>
              <input
                ref={fileInputRef}
                type="file"
                accept=".bin,.ori,.mod,.hex"
                onChange={handleFileChange}
                className="sr-only"
                id="ecu-file-upload"
                aria-label="Załaduj plik ECU"
              />
              {fileName ? (
                <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="flex-1 text-sm font-medium text-foreground font-mono">
                    {fileName}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Usuń plik"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="ecu-file-upload"
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border/50 p-8 text-center transition-colors hover:border-primary/30 hover:bg-secondary/20"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Kliknij aby załadować plik
                  </span>
                  <span className="text-xs text-muted-foreground">
                    .bin, .ori, .mod, .hex (max 10MB)
                  </span>
                </label>
              )}
            </div>

            {/* Terms */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Akceptuję regulamin serwisu i wyrażam zgodę na przetwarzanie moich
                        danych osobowych w celu realizacji zamówienia.
                      </span>
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* reCAPTCHA */}
            <FormField
              control={form.control}
              name="captchaToken"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-3 rounded-lg border border-border/50 bg-secondary/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Weryfikacja bezpieczeństwa
                  </div>
                  <FormControl>
                    {isMounted ? (
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                        onChange={(value) => field.onChange(value || '')}
                        theme="dark"
                      />
                    ) : (
                      <div className="h-[78px] w-full max-w-[304px] animate-pulse rounded bg-secondary/20" />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Navigation */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Wstecz
              </Button>
              <Button type="submit" className="gap-2 neon-border">
                Złóż zamówienie
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
