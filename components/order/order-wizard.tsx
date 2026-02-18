'use client'

import { useState, type ReactNode } from 'react'
import { Car, Wrench, User, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StepVehicle } from './step-vehicle'
import { StepModifications } from './step-modifications'
import { StepCustomer } from './step-customer'
import { OrderSuccess } from './order-success'
import type { VehicleFormData, ModificationsFormData, CustomerFormData } from '@/lib/schemas'

type WizardStep = {
  id: number
  label: string
  icon: ReactNode
}

const steps: WizardStep[] = [
  { id: 1, label: 'Dane auta', icon: <Car className="h-4 w-4" /> },
  { id: 2, label: 'Modyfikacje', icon: <Wrench className="h-4 w-4" /> },
  { id: 3, label: 'Dane klienta', icon: <User className="h-4 w-4" /> },
]

// Partial state for the wizard
type WizardData = {
  vehicle: VehicleFormData | null
  modifications: ModificationsFormData | null
  customer: CustomerFormData | null
}

export function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [wizardData, setWizardData] = useState<WizardData>({
    vehicle: null,
    modifications: null,
    customer: null,
  })

  function handleVehicleSubmit(data: VehicleFormData) {
    setWizardData((prev) => ({ ...prev, vehicle: data }))
    setCurrentStep(2)
  }

  function handleModificationsSubmit(data: ModificationsFormData) {
    setWizardData((prev) => ({ ...prev, modifications: data }))
    setCurrentStep(3)
  }

  function handleCustomerSubmit(data: CustomerFormData) {
    setWizardData((prev) => ({ ...prev, customer: data }))
    setSubmitted(true)
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  if (submitted) {
    return <OrderSuccess data={wizardData} />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
          Zamów chip tuning
        </h1>
        <p className="mt-3 text-muted-foreground">
          Wypełnij formularz krok po kroku, a przygotujemy dla Ciebie wycenę
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                disabled={step.id > currentStep}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all md:px-4',
                  step.id === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.id < currentStep
                      ? 'bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer'
                      : 'bg-secondary text-muted-foreground cursor-not-allowed'
                )}
                aria-label={`Krok ${step.id}: ${step.label}`}
                aria-current={step.id === currentStep ? 'step' : undefined}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  step.icon
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'h-px w-6 md:w-12',
                    step.id < currentStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-fade-in">
        {currentStep === 1 && (
          <StepVehicle
            defaultValues={wizardData.vehicle ?? undefined}
            onSubmit={handleVehicleSubmit}
          />
        )}
        {currentStep === 2 && (
          <StepModifications
            defaultValues={wizardData.modifications ?? undefined}
            originalPower={wizardData.vehicle?.originalPower}
            onSubmit={handleModificationsSubmit}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <StepCustomer
            defaultValues={wizardData.customer ?? undefined}
            onSubmit={handleCustomerSubmit}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
