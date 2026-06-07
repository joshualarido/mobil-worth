import assert from "node:assert/strict";
import test from "node:test";
import { sampleScenarios } from "@/lib/sampleScenarios";

test("sample scenarios provide the four presentation presets", () => {
  assert.deepEqual(
    sampleScenarios.map((scenario) => scenario.label),
    [
      "Toyota Avanza 2020",
      "Honda Brio 2019",
      "Mitsubishi Pajero 2021",
      "Daihatsu Xenia 2018",
    ],
  );
});

test("sample scenarios include complete car inputs", () => {
  for (const scenario of sampleScenarios) {
    assert.ok(scenario.input.brand);
    assert.ok(scenario.input.model);
    assert.ok(scenario.input.year >= 1990);
    assert.ok(scenario.input.mileageKm >= 0);
    assert.ok(scenario.input.engineDisplacementCc > 0);
    assert.ok(scenario.input.location);
  }
});
