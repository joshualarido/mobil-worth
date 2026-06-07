import { mockPredictPrice } from "@/lib/mockPredictPrice";
import type {
  CarInput,
  HuggingFacePredictionRequest,
  HuggingFacePredictionResponse,
  PredictionResult,
} from "@/types/car";

const defaultPredictUrl = "https://rryayaw-mobilworth.hf.space/predict";
const requestTimeoutMs = 12_000;

function toHuggingFaceRequest(input: CarInput): HuggingFacePredictionRequest {
  return {
    brand: input.brand,
    model: input.model,
    year: input.year,
    mileage_km: input.mileageKm,
    transmission: input.transmission,
    fuel_type: input.fuelType,
    engine_cc: input.engineDisplacementCc,
    body_type: input.bodyType,
    color: input.color,
    location: input.location,
  };
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseHuggingFaceResponse(
  value: unknown,
): HuggingFacePredictionResponse | null {
  if (!isRecord(value) || !isRecord(value.price_range_idr)) {
    return null;
  }

  if (
    !isFiniteNumber(value.predicted_price_idr) ||
    typeof value.predicted_price_pretty !== "string" ||
    !isFiniteNumber(value.confidence_pct) ||
    typeof value.confidence_label !== "string" ||
    !isFiniteNumber(value.price_range_idr.low) ||
    !isFiniteNumber(value.price_range_idr.high) ||
    typeof value.price_range_pretty !== "string" ||
    typeof value.note !== "string"
  ) {
    return null;
  }

  return {
    predicted_price_idr: value.predicted_price_idr,
    predicted_price_pretty: value.predicted_price_pretty,
    confidence_pct: value.confidence_pct,
    confidence_label: value.confidence_label,
    price_range_idr: {
      low: value.price_range_idr.low,
      high: value.price_range_idr.high,
    },
    price_range_pretty: value.price_range_pretty,
    note: value.note,
  };
}

function toPredictionResult(
  response: HuggingFacePredictionResponse,
): PredictionResult {
  return {
    estimatedPrice: response.predicted_price_idr,
    predictedPricePretty: response.predicted_price_pretty,
    lowerBound: response.price_range_idr.low,
    upperBound: response.price_range_idr.high,
    confidencePercent: response.confidence_pct,
    confidenceLabel: response.confidence_label,
    priceRangePretty: response.price_range_pretty,
    note: response.note,
    source: "huggingface",
  };
}

export async function predictPrice(input: CarInput): Promise<PredictionResult> {
  const predictUrl = process.env.NEXT_PUBLIC_HF_PREDICT_URL ?? defaultPredictUrl;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(predictUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toHuggingFaceRequest(input)),
      signal: controller.signal,
    });

    if (!response.ok) {
      return mockPredictPrice(input);
    }

    const parsed = parseHuggingFaceResponse(await response.json());

    if (!parsed) {
      return mockPredictPrice(input);
    }

    return toPredictionResult(parsed);
  } catch {
    return mockPredictPrice(input);
  } finally {
    clearTimeout(timeoutId);
  }
}
