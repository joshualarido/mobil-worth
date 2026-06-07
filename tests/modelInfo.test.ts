import assert from "node:assert/strict";
import test from "node:test";
import { modelMetrics } from "@/lib/modelInfo";

test("model info exposes replaceable mock metric values", () => {
  assert.deepEqual(modelMetrics, [
    { label: "MAE", value: "Rp 18.750.000" },
    { label: "RMSE", value: "Rp 27.400.000" },
    { label: "R2", value: "0.82" },
  ]);
});
