export type Transmission = "manual" | "automatic";

export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";

export type CarInput = {
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  transmission: Transmission;
  fuelType: FuelType;
  engineDisplacementCc: number;
  bodyType: string;
  color: string;
  location: string;
};

export type HuggingFacePredictionRequest = {
  brand: string;
  model: string;
  year: number;
  mileage_km: number;
  transmission: Transmission;
  fuel_type: FuelType;
  engine_cc: number;
  body_type: string;
  color: string;
  location: string;
};

export type HuggingFacePredictionResponse = {
  predicted_price_idr: number;
  predicted_price_pretty: string;
  confidence_pct: number;
  confidence_label: string;
  price_range_idr: {
    low: number;
    high: number;
  };
  price_range_pretty: string;
  note: string;
};

export type PredictionResult = {
  estimatedPrice: number;
  predictedPricePretty?: string;
  lowerBound?: number;
  upperBound?: number;
  confidencePercent: number;
  confidenceLabel?: string;
  priceRangePretty?: string;
  note?: string;
  source: "mock" | "huggingface";
};
