import { modelMetrics } from "@/lib/modelInfo";

type ModelInfoDialogProps = {
  onClose: () => void;
};

export function ModelInfoDialog({ onClose }: ModelInfoDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/35 px-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl shadow-neutral-950/20 animate-result-pop"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-950">Model Info</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">
              Current prediction service and evaluation placeholders.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg leading-none text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-4 focus:ring-rose-800/10"
            aria-label="Close model info"
          >
            x
          </button>
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
            <dt className="text-neutral-500">Model</dt>
            <dd className="font-semibold text-neutral-950">Random Forest</dd>
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
            <dd className="font-semibold text-neutral-950">Mock prediction</dd>
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
  );
}
