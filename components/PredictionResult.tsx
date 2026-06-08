import type {
  CarInput,
  PredictionResult as PredictionResultType,
} from "@/types/car";
import { formatIDR } from "@/lib/formatCurrency";

type PredictionResultProps = {
  result: PredictionResultType | null;
  input: CarInput | null;
  isLoading: boolean;
};

export function PredictionResult({
  result,
  input,
  isLoading,
}: PredictionResultProps) {
  const priceText =
    result?.predictedPricePretty ??
    (result ? formatIDR(result.estimatedPrice) : "");
  const rangeText =
    result?.priceRangePretty ??
    (result?.lowerBound && result.upperBound
      ? `${formatIDR(result.lowerBound)} - ${formatIDR(result.upperBound)}`
      : "");

  return (
    <aside className="rounded-2xl border border-rose-200 bg-white p-5 shadow-md shadow-rose-900/5">
      <h2 className="text-lg font-bold text-neutral-950">Prediction Result</h2>

      {isLoading ? (
        <div className="mt-5 animate-result-pop" aria-live="polite">
          <p className="text-sm font-medium text-neutral-500">
            Estimating market price
          </p>
          <div className="mt-3 h-11 rounded-xl animate-shimmer" />
          <div className="mt-4 rounded-xl bg-rose-50 p-4">
            <div className="h-4 w-32 rounded-full animate-shimmer" />
            <div className="mt-3 h-4 w-56 max-w-full rounded-full animate-shimmer" />
          </div>
          <div className="mt-4 rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-24 rounded-full animate-shimmer" />
              <div className="h-5 w-14 rounded-full animate-shimmer" />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-2 w-2/3 rounded-full animate-shimmer" />
            </div>
          </div>
        </div>
      ) : result ? (
        <div
          key={`${result.source}-${result.estimatedPrice}`}
          className="mt-5 animate-result-pop"
        >
          <p className="text-sm font-medium text-neutral-500">
            Estimated Market Price
          </p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-rose-800 md:text-5xl">
            {priceText}
          </p>

          {rangeText ? (
            <div className="mt-4 rounded-xl bg-rose-50 p-4">
              <p className="text-sm font-semibold text-neutral-950">
                Expected Range
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-700">
                {rangeText}
              </p>
            </div>
          ) : null}

          <div className="mt-4 rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-neutral-950">
                Confidence
              </p>
              <div className="text-right">
                <p className="text-lg font-bold text-rose-800">
                  {result.confidencePercent}%
                </p>
                {result.confidenceLabel ? (
                  <p className="text-xs font-semibold text-neutral-500">
                    {result.confidenceLabel}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-neutral-100">
              <div
                className="h-2 rounded-full bg-rose-800 animate-confidence-fill"
                style={{
                  width: `${Math.max(0, Math.min(100, result.confidencePercent))}%`,
                }}
              />
            </div>
          </div>

          {result.note ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {result.note}
            </p>
          ) : null}

          {input ? (
            <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm leading-6 text-neutral-700">
              <p className="font-semibold text-neutral-950">
                {input.brand} {input.model} {input.year}
              </p>
              <p>
                {input.bodyType} - {input.transmission} -{" "}
                {input.mileageKm.toLocaleString("id-ID")} km
              </p>
              <p>
                {input.fuelType} -{" "}
                {input.engineDisplacementCc.toLocaleString("id-ID")} CC
              </p>
              <p>{input.location}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-sm leading-6 text-neutral-600">
          Fill in the car details and click Predict Price to generate an
          estimate.
        </p>
      )}
    </aside>
  );
}
