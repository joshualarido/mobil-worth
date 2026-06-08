"use client";

import { useEffect, useState } from "react";
import { CarPredictionForm } from "@/components/CarPredictionForm";
import { ModelInfoDialog } from "@/components/ModelInfoDialog";
import { PredictionResult } from "@/components/PredictionResult";
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
          <ModelInfoDialog onClose={() => setIsModelInfoOpen(false)} />
        ) : null}
      </div>
    </main>
  );
}
