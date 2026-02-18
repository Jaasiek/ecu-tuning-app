'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Zap, Flame, Rocket } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { modificationsSchema, type ModificationsFormData } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import type { TuningStage, Modification } from '@/lib/types'

type StepModificationsProps = {
  defaultValues?: ModificationsFormData
  originalPower?: number
  onSubmit: (data: ModificationsFormData) => void
  onBack: () => void
}

const stageOptions: { value: TuningStage; label: string; icon: typeof Zap; desc: string }[] = [
  { value: 'stage1', label: 'Stage 1', icon: Zap, desc: 'Do +30% mocy' },
  { value: 'stage2', label: 'Stage 2', icon: Flame, desc: 'Do +50% mocy' },
  { value: 'stage3', label: 'Stage 3', icon: Rocket, desc: 'Do +100% mocy' },
]

const modificationOptions: { value: Modification; label: string }[] = [
  { value: 'pop-and-bangs', label: 'Pop & Bangs' },
  { value: 'egr-off', label: 'EGR OFF' },
  { value: 'dpf-off', label: 'DPF OFF' },
  { value: 'adblue-off', label: 'AdBlue OFF' },
  { value: 'eco-tuning', label: 'Eco Tuning' },
  { value: 'ecu-diagnostics', label: 'Diagnostyka ECU' },
]

export function StepModifications({
  defaultValues,
  originalPower,
  onSubmit,
  onBack,
}: StepModificationsProps) {
  const form = useForm<ModificationsFormData>({
    resolver: zodResolver(modificationsSchema),
    defaultValues: defaultValues ?? {
      stage: undefined,
      modifications: [],
      targetPower: 200,
      notes: '',
    },
  })

  const selectedStage = form.watch('stage')
  const targetPower = form.watch('targetPower')

  // Automatically update targetPower based on stage and originalPower
  useEffect(() => {
    if (originalPower === undefined) return

    let multiplier = 1
    switch (selectedStage) {
      case 'stage1':
        multiplier = 1.3
        break
      case 'stage2':
        multiplier = 1.5
        break
      case 'stage3':
        multiplier = 2.0
        break
      default:
        multiplier = 1
    }

    const calculatedPower = Math.round((originalPower * multiplier) / 5) * 5
    form.setValue('targetPower', calculatedPower)
  }, [selectedStage, originalPower, form])

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-foreground">Wybór modyfikacji</CardTitle>
        <CardDescription>Wybierz zakres tuningu i dodatkowe modyfikacje</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* Stage Selection - Custom Control */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage tuningu</FormLabel>
                  <FormControl>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {stageOptions.map((option) => {
                        const Icon = option.icon
                        const isSelected = field.value === option.value
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              'group flex flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all duration-200',
                              isSelected
                                ? 'border-primary bg-primary/10 neon-border'
                                : 'border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'
                            )}
                            aria-pressed={isSelected}
                          >
                            <div
                              className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary text-muted-foreground group-hover:text-foreground'
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className={cn(
                              'text-sm font-semibold',
                              isSelected ? 'text-primary' : 'text-foreground'
                            )}>
                              {option.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{option.desc}</span>
                          </button>
                        )
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Target Power - Custom Slider */}
            <FormField
              control={form.control}
              name="targetPower"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Docelowa moc</FormLabel>
                    <span className="text-lg font-bold text-primary font-mono">
                      {targetPower} HP
                    </span>
                  </div>
                  <FormControl>
                    <Slider
                      min={50}
                      max={2000}
                      step={10}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <FormDescription>
                    Przesun suwak aby ustawic docelowa moc silnika
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Modifications */}
            <FormField
              control={form.control}
              name="modifications"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Dodatkowe modyfikacje
                    {selectedStage === 'stage3' && (
                      <span className="ml-2 text-xs text-primary">(wymagana min. 1)</span>
                    )}
                  </FormLabel>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {modificationOptions.map((mod) => (
                      <FormField
                        key={mod.value}
                        control={form.control}
                        name="modifications"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <label
                                className={cn(
                                  'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                                  field.value?.includes(mod.value)
                                    ? 'border-primary/40 bg-primary/5'
                                    : 'border-border/50 bg-secondary/20 hover:border-border hover:bg-secondary/30'
                                )}
                              >
                                <Checkbox
                                  checked={field.value?.includes(mod.value)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value ?? []
                                    if (checked) {
                                      field.onChange([...current, mod.value])
                                    } else {
                                      field.onChange(current.filter((v) => v !== mod.value))
                                    }
                                  }}
                                />
                                <span className="text-sm font-medium text-foreground">
                                  {mod.label}
                                </span>
                              </label>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dodatkowe uwagi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opisz dodatkowe wymagania lub pytania..."
                      className="min-h-[100px] resize-none bg-secondary/50"
                      {...field}
                    />
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
              <Button type="submit" className="gap-2">
                Dalej
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
