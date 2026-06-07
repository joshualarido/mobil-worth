import type { CarInput, PredictionResult } from "@/types/car";

const brandBasePrice: Record<string, number> = {
  toyota: 180_000_000,
  honda: 170_000_000,
  suzuki: 130_000_000,
  daihatsu: 120_000_000,
  mitsubishi: 180_000_000,
  nissan: 140_000_000,
  mazda: 190_000_000,
  bmw: 450_000_000,
  mercedes: 500_000_000,
};

const bodyTypeMultiplier: Record<string, number> = {
  hatchback: 0.9,
  sedan: 1,
  mpv: 1.05,
  suv: 1.18,
  pickup: 0.95,
  van: 0.92,
  coupe: 1.12,
  other: 1,
};

const locationMultiplier: Record<string, number> = {
  jakarta: 1.06,
  bandung: 1.02,
  surabaya: 1.03,
  medan: 0.98,
  semarang: 0.97,
  yogyakarta: 0.96,
  bali: 1.04,
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function roundToNearest(value: number, unit: number) {
  return Math.max(unit, Math.round(value / unit) * unit);
}

function calculateConfidence(input: CarInput) {
  let confidence = 86;

  if (!brandBasePrice[normalize(input.brand)]) confidence -= 8;
  if (!locationMultiplier[normalize(input.location)]) confidence -= 5;
  if (input.mileageKm > 150_000) confidence -= 6;
  if (input.year < 2005) confidence -= 5;

  return Math.max(60, Math.min(95, confidence));
}

export function mockPredictPrice(input: CarInput): PredictionResult {
  const brandKey = normalize(input.brand);
  const bodyTypeKey = normalize(input.bodyType);
  const locationKey = normalize(input.location);

  const basePrice = brandBasePrice[brandKey] ?? 145_000_000;
  const age = Math.max(0, new Date().getFullYear() - input.year);
  const ageMultiplier = Math.max(0.42, 1 - age * 0.055);
  const mileageMultiplier = Math.max(0.5, 1 - input.mileageKm / 500_000);
  const transmissionMultiplier = input.transmission === "automatic" ? 1.04 : 0.98;
  const fuelMultiplier =
    input.fuelType === "hybrid" || input.fuelType === "electric" ? 1.08 : 1;
  const engineMultiplier = Math.min(
    1.18,
    Math.max(0.88, input.engineDisplacementCc / 1500),
  );

  const rawEstimate =
    basePrice *
    ageMultiplier *
    mileageMultiplier *
    transmissionMultiplier *
    fuelMultiplier *
    engineMultiplier *
    (bodyTypeMultiplier[bodyTypeKey] ?? 1) *
    (locationMultiplier[locationKey] ?? 1);

  const estimatedPrice = roundToNearest(rawEstimate, 100_000);

  return {
    estimatedPrice,
    lowerBound: Math.round(estimatedPrice * 0.9),
    upperBound: Math.round(estimatedPrice * 1.1),
    confidencePercent: calculateConfidence(input),
    source: "mock",
  };
}
