"use client";

import { useEffect, useState } from "react";
import { CarPredictionForm } from "@/components/CarPredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { modelMetrics } from "@/lib/modelInfo";
import { predictPrice } from "@/lib/predictPrice";
import type {
  CarInput,
  PredictionResult as PredictionResultType,
} from "@/types/car";

export default function Home() {
  const [lastInput, setLastInput] = useState<CarInput | null>(null);
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isModelInfoOpen, setIsModelInfoOpen] = useState(false);

  useEffect(() => {
    if (!isModelInfoOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModelInfoOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModelInfoOpen]);

  async function handlePredict(input: CarInput) {
    setLastInput(input);
    setResult(null);
    setIsPredicting(true);

    try {
      const prediction = await predictPrice(input);
      setResult(prediction);
    } finally {
      setIsPredicting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 py-5 md:px-8 lg:px-10">
        <section className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl animate-fade-slide-up">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 md:text-5xl">
              MobilWorth Indonesia
            </h1>
            <p className="mt-2 text-base font-medium text-neutral-800 md:text-lg">
              Used Car Price Estimator for the Indonesian Market
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Estimate used-car prices using structured vehicle attributes from
              Indonesian marketplace listings.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModelInfoOpen(true)}
            className="animate-fade-slide-up animation-delay-100 inline-flex h-10 items-center justify-center rounded-xl border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-800 shadow-sm transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-800/10"
          >
            Model Info
          </button>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="animate-fade-slide-up animation-delay-160">
            <CarPredictionForm
              onSubmit={handlePredict}
              isSubmitting={isPredicting}
            />
          </div>
          <div className="animate-fade-slide-up animation-delay-220">
            <PredictionResult
              result={result}
              input={lastInput}
              isLoading={isPredicting}
            />
          </div>
        </section>

        {isModelInfoOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/35 px-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={() => setIsModelInfoOpen(false)}
          >
            <section
              aria-modal="true"
              className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl shadow-neutral-950/20 animate-result-pop"
              role="dialog"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-950">
                    Model Info
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Current prediction service and evaluation placeholders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModelInfoOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg leading-none text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-4 focus:ring-rose-800/10"
                  aria-label="Close model info"
                >
                  x
                </button>
              </div>

              <dl className="mt-5 grid gap-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">Model</dt>
                  <dd className="font-semibold text-neutral-950">
                    Random Forest
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">Target</dt>
                  <dd className="font-semibold text-neutral-950">Price in IDR</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">Service</dt>
                  <dd className="font-semibold text-neutral-950">
                    Hugging Face Space
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Fallback</dt>
                  <dd className="font-semibold text-neutral-950">
                    Mock prediction
                  </dd>
                </div>
              </dl>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {modelMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase text-rose-800">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-base font-bold text-neutral-950">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}
