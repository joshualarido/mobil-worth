import { sampleScenarios } from "@/lib/sampleScenarios";
import type { CarInput } from "@/types/car";

type SampleScenarioPickerProps = {
  onSelect: (input: CarInput) => void;
};

export function SampleScenarioPicker({ onSelect }: SampleScenarioPickerProps) {
  return (
    <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50/60 p-3">
      <p className="text-sm font-semibold text-neutral-950">
        Sample scenarios
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {sampleScenarios.map((scenario) => (
          <button
            key={scenario.label}
            type="button"
            onClick={() => onSelect(scenario.input)}
            className="h-8 rounded-lg border border-rose-200 bg-white px-2.5 text-xs font-semibold text-rose-800 shadow-sm transition hover:bg-rose-100"
          >
            {scenario.label}
          </button>
        ))}
      </div>
    </div>
  );
}
