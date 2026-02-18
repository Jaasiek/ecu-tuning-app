"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Fuel } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { vehicleSchema, type VehicleFormData } from "@/lib/schemas";
import { carMakes, ecuTypes } from "@/lib/data";

type StepVehicleProps = {
  defaultValues?: VehicleFormData;
  onSubmit: (data: VehicleFormData) => void;
};

export function StepVehicle({ defaultValues, onSubmit }: StepVehicleProps) {
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: defaultValues ?? {
      make: "",
      model: "",
      year: undefined,
      engine: "",
      fuelType: undefined,
      ecuType: "",
      vin: "",
      mileage: undefined,
      originalPower: undefined,
      originalTorque: undefined,
      fuelLevel: 50,
    },
  });

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-foreground">Dane pojazdu</CardTitle>
        <CardDescription>Podaj informacje o swoim samochodzie</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* Make */}
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marka</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder="Wybierz markę" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Model */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. Golf R Mk7"
                        className="bg-secondary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rok produkcji</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2022"
                        className="bg-secondary/50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Engine */}
              <FormField
                control={form.control}
                name="engine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Silnik</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. 2.0 TDI"
                        className="bg-secondary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fuel Type */}
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rodzaj paliwa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder="Wybierz paliwo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="petrol">Benzyna</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ECU Type */}
              <FormField
                control={form.control}
                name="ecuType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ ECU</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder="Wybierz ECU" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ecuTypes.map((ecu) => (
                          <SelectItem key={ecu} value={ecu}>
                            {ecu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* VIN */}
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Numer VIN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="17-znakowy numer VIN"
                        className="bg-secondary/50 font-mono uppercase"
                        maxLength={17}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mileage */}
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Przebieg (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="85000"
                        className="bg-secondary/50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Original Power */}
              <FormField
                control={form.control}
                name="originalPower"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oryginalna moc (HP)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="150"
                        className="bg-secondary/50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Original Torque */}
              <FormField
                control={form.control}
                name="originalTorque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oryginalny moment obrotowy (Nm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="350"
                        className="bg-secondary/50"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fuel Level - Custom Control using Controller */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="fuelLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-4 rounded-xl border border-border/50 bg-secondary/20 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Fuel className="h-5 w-5 text-primary" />
                          <FormLabel className="text-base">Poziom paliwa w baku</FormLabel>
                        </div>
                        <span className="font-mono text-lg font-bold text-primary">
                          {field.value}%
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Poziom paliwa jest istotny dla procedury hamowni i testów drogowych.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                Dalej
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
