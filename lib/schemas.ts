import { z } from "zod";

// ============================================================
// Step 1: Vehicle Data Schema
// ============================================================
export const vehicleSchema = z.object({
  make: z.string().min(2, "Marka jest wymagana (min. 2 znaki)"),
  model: z.string().min(1, "Model jest wymagany"),
  year: z
    .number({ invalid_type_error: "Podaj rok produkcji" })
    .int()
    .min(1990, "Rok musi wynosić co najmniej 1990")
    .max(new Date().getFullYear() + 1, "Niepoprawny rok"),
  engine: z.string().min(2, "Podaj typ silnika (np. 2.0 TDI)"),
  fuelType: z.enum(["diesel", "petrol", "hybrid"], {
    required_error: "Wybierz rodzaj paliwa",
  }),
  ecuType: z.string().optional(),
  vin: z
    .string()
    .length(17, "VIN musi miec dokladnie 17 znakow")
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/i, "Niepoprawny format VIN"),
  mileage: z
    .number({ invalid_type_error: "Podaj przebieg" })
    .int()
    .min(0, "Przebieg nie może być ujemny"),
  originalPower: z
    .number({ invalid_type_error: "Podaj moc oryginalna" })
    .min(1, "Moc musi być większa od 0"),
  originalTorque: z
    .number({ invalid_type_error: "Podaj moment obrotowy" })
    .min(1, "Moment musi być większy od 0"),
  fuelLevel: z.number().min(0).max(100).default(50),
});

// ============================================================
// Step 2: Modifications Schema
// ============================================================
export const modificationsSchema = z
  .object({
    stage: z.enum(["stage1", "stage2", "stage3"], {
      required_error: "Wybierz stage tuningu",
    }),
    modifications: z
      .array(
        z.enum([
          "pop-and-bangs",
          "egr-off",
          "dpf-off",
          "adblue-off",
          "eco-tuning",
          "ecu-diagnostics",
        ])
      )
      .optional()
      .default([]),
    targetPower: z
      .number({ invalid_type_error: "Podaj docelową moc" })
      .min(50, "Minimalna moc to 50 HP")
      .max(2000, "Maksymalna moc to 2000 HP"),
    notes: z.string().max(500, "Maksymalnie 500 znaków").optional().default(""),
  })
  .refine(
    (data) => {
      // Stage 3 requires at least one additional modification
      if (data.stage === "stage3" && data.modifications.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "Stage 3 wymaga co najmniej jednej dodatkowej modyfikacji",
      path: ["modifications"],
    }
  );

// ============================================================
// Step 3: Customer Data Schema
// ============================================================
export const customerSchema = z
  .object({
    firstName: z.string().min(2, "Imię jest wymagane (min. 2 znaki)"),
    lastName: z.string().min(2, "Nazwisko jest wymagane (min. 2 znaki)"),
    email: z.string().email("Podaj poprawny adres email"),
    phone: z
      .string()
      .regex(
        /^(\+48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/,
        "Podaj poprawny numer telefonu (np. +48 123 456 789)"
      ),
    company: z.string().optional().default(""),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Musisz zaakceptowac regulamin",
    }),
    ecuFile: z.string().optional().default(""),
    captchaToken: z.string().min(1, "Potwierdź że nie jesteś robotem"),
  })
  .refine(
    (data) => {
      // Verify that email domain is not a disposable provider
      const disposable = [
        "tempmail.com",
        "throwaway.email",
        "guerrillamail.com",
      ];
      const domain = data.email.split("@")[1];
      return !disposable.includes(domain);
    },
    {
      message: "Prosimy o używanie permanentnego adresu email",
      path: ["email"],
    }
  );

// ============================================================
// Combined Order Schema
// ============================================================
export const orderSchema = z.object({
  vehicle: vehicleSchema,
  modifications: modificationsSchema,
  customer: customerSchema,
});

// ============================================================
// Contact Form Schema
// ============================================================
export const contactSchema = z.object({
  name: z.string().min(2, "Imię jest wymagane"),
  email: z.string().email("Podaj poprawny adres email"),
  subject: z.string().min(5, "Temat musi mieć min. 5 znaków"),
  message: z
    .string()
    .min(20, "Wiadomość musi mieć min. 20 znaków")
    .max(2000, "Maksymalnie 2000 znaków"),
});

// ============================================================
// Inferred Types
// ============================================================
export type VehicleFormData = z.infer<typeof vehicleSchema>;
export type ModificationsFormData = z.infer<typeof modificationsSchema>;
export type CustomerFormData = z.infer<typeof customerSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
