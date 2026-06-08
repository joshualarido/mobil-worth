"use client";

import { FormEvent, useState } from "react";
import { Field } from "@/components/Field";
import { SampleScenarioPicker } from "@/components/SampleScenarioPicker";
import {
  bodyTypeOptions,
  currentYear,
  defaultCarInput,
  fuelTypeOptions,
  transmissionOptions,
} from "@/lib/carFormConfig";
import { validateCarInput } from "@/lib/validateCarInput";
import type { CarInput, FuelType, Transmission } from "@/types/car";

type CarPredictionFormProps = {
  onSubmit: (input: CarInput) => Promise<void> | void;
  isSubmitting: boolean;
};

export function CarPredictionForm({
  onSubmit,
  isSubmitting,
}: CarPredictionFormProps) {
  const [input, setInput] = useState<CarInput>(defaultCarInput);
  const [error, setError] = useState("");

  function updateField<K extends keyof CarInput>(field: K, value: CarInput[K]) {
    setInput((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateCarInput(input);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    await onSubmit(input);
  }

  const inputClass =
    "h-10 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-rose-800 focus:ring-4 focus:ring-rose-800/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold text-neutral-950">Car Details</h2>
        <p className="mt-1 text-xs leading-5 text-neutral-600">
          Enter listing attributes that commonly influence Indonesian used-car
          prices.
        </p>
      </div>

      {error ? (
        <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <SampleScenarioPicker
        onSelect={(scenarioInput) => {
          setInput(scenarioInput);
          setError("");
        }}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Brand">
          <input
            className={inputClass}
            value={input.brand}
            onChange={(event) => updateField("brand", event.target.value)}
          />
        </Field>

        <Field label="Model">
          <input
            className={inputClass}
            value={input.model}
            onChange={(event) => updateField("model", event.target.value)}
          />
        </Field>

        <Field label="Year">
          <input
            className={inputClass}
            type="number"
            min={1990}
            max={currentYear}
            value={input.year}
            onChange={(event) => updateField("year", Number(event.target.value))}
          />
        </Field>

        <Field label="Mileage in kilometers">
          <input
            className={inputClass}
            type="number"
            min={0}
            value={input.mileageKm}
            onChange={(event) =>
              updateField("mileageKm", Number(event.target.value))
            }
          />
        </Field>

        <Field label="Transmission type">
          <select
            className={inputClass}
            value={input.transmission}
            onChange={(event) =>
              updateField("transmission", event.target.value as Transmission)
            }
          >
            {transmissionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Fuel type">
          <select
            className={inputClass}
            value={input.fuelType}
            onChange={(event) =>
              updateField("fuelType", event.target.value as FuelType)
            }
          >
            {fuelTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Engine displacement in CC">
          <input
            className={inputClass}
            type="number"
            min={1}
            value={input.engineDisplacementCc}
            onChange={(event) =>
              updateField("engineDisplacementCc", Number(event.target.value))
            }
          />
        </Field>

        <Field label="Body type">
          <select
            className={inputClass}
            value={input.bodyType}
            onChange={(event) => updateField("bodyType", event.target.value)}
          >
            {bodyTypeOptions.map((bodyType) => (
              <option key={bodyType}>{bodyType}</option>
            ))}
          </select>
        </Field>

        <Field label="Color">
          <input
            className={inputClass}
            value={input.color}
            onChange={(event) => updateField("color", event.target.value)}
          />
        </Field>

        <Field label="Location">
          <input
            className={inputClass}
            value={input.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-rose-800 px-5 text-sm font-semibold text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:bg-rose-700 disabled:opacity-85"
      >
        {isSubmitting ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 rounded-full border-2 border-white/35 border-t-white animate-spin"
            />
            <span>Predicting...</span>
          </>
        ) : (
          "Predict Price"
        )}
      </button>
    </form>
  );
}
