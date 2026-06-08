import type { CarInput, FuelType, Transmission } from "@/types/car";

export const currentYear = new Date().getFullYear();

export const defaultCarInput: CarInput = {
  brand: "Toyota",
  model: "Avanza",
  year: 2020,
  mileageKm: 45000,
  transmission: "automatic",
  fuelType: "gasoline",
  engineDisplacementCc: 1500,
  bodyType: "MPV",
  color: "Black",
  location: "Jakarta",
};

export const transmissionOptions: { label: string; value: Transmission }[] = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
];

export const fuelTypeOptions: { label: string; value: FuelType }[] = [
  { label: "Gasoline", value: "gasoline" },
  { label: "Diesel", value: "diesel" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Electric", value: "electric" },
];

export const bodyTypeOptions = [
  "Hatchback",
  "Sedan",
  "MPV",
  "SUV",
  "Pickup",
  "Van",
  "Coupe",
  "Other",
];
