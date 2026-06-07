import assert from "node:assert/strict";
import test from "node:test";
import { mockPredictPrice } from "@/lib/mockPredictPrice";
import { predictPrice } from "@/lib/predictPrice";
import type { CarInput } from "@/types/car";

const baseInput: CarInput = {
  brand: "Toyota",
  model: "Avanza",
  year: 2020,
  mileageKm: 45000,
  transmission: "automatic",
  fuelType: "gasoline",
  engineDisplacementCc: 1500,
  bodyType: "MPV",
  color: "Black",
  location: "Jakarta",
};

test("mockPredictPrice returns a rounded mock result with a 10 percent range", () => {
  const result = mockPredictPrice(baseInput);

  assert.equal(result.source, "mock");
  assert.equal(result.estimatedPrice % 100_000, 0);
  assert.equal(result.lowerBound, Math.round(result.estimatedPrice * 0.9));
  assert.equal(result.upperBound, Math.round(result.estimatedPrice * 1.1));
});

test("mockPredictPrice returns a confidence percentage", () => {
  const result = mockPredictPrice(baseInput);

  assert.equal(typeof result.confidencePercent, "number");
  assert.ok(result.confidencePercent >= 60);
  assert.ok(result.confidencePercent <= 95);
});

test("mockPredictPrice lowers the estimate for older high-mileage cars", () => {
  const newerLowMileage = mockPredictPrice({
    ...baseInput,
    year: 2022,
    mileageKm: 15000,
  });
  const olderHighMileage = mockPredictPrice({
    ...baseInput,
    year: 2012,
    mileageKm: 180000,
  });

  assert.ok(olderHighMileage.estimatedPrice < newerLowMileage.estimatedPrice);
});

test("predictPrice sends the Hugging Face request contract and maps the response", async () => {
  const originalFetch = globalThis.fetch;
  let requestBody: unknown;

  globalThis.fetch = (async (_url, init) => {
    requestBody = JSON.parse(String(init?.body));

    return new Response(
      JSON.stringify({
        predicted_price_idr: 158_345_968,
        predicted_price_pretty: "Rp 158.3 juta",
        confidence_pct: 57.3,
        confidence_label: "Low",
        price_range_idr: {
          low: 103_753_061,
          high: 307_444_385,
        },
        price_range_pretty: "Rp 103.8 juta - Rp 307.4 juta",
        note: "Low confidence: verify against live listings.",
      }),
      { status: 200 },
    );
  }) as typeof fetch;

  try {
    const result = await predictPrice(baseInput);

    assert.deepEqual(requestBody, {
      brand: "Toyota",
      model: "Avanza",
      year: 2020,
      mileage_km: 45000,
      transmission: "automatic",
      fuel_type: "gasoline",
      engine_cc: 1500,
      body_type: "MPV",
      color: "Black",
      location: "Jakarta",
    });
    assert.equal(result.source, "huggingface");
    assert.equal(result.estimatedPrice, 158_345_968);
    assert.equal(result.predictedPricePretty, "Rp 158.3 juta");
    assert.equal(result.confidencePercent, 57.3);
    assert.equal(result.confidenceLabel, "Low");
    assert.equal(result.lowerBound, 103_753_061);
    assert.equal(result.upperBound, 307_444_385);
    assert.equal(result.priceRangePretty, "Rp 103.8 juta - Rp 307.4 juta");
    assert.equal(result.note, "Low confidence: verify against live listings.");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("predictPrice falls back to mock prediction when the endpoint fails", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    throw new Error("network unavailable");
  }) as typeof fetch;

  try {
    const result = await predictPrice(baseInput);

    assert.equal(result.source, "mock");
    assert.ok(result.estimatedPrice > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("predictPrice falls back to mock prediction for malformed responses", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    return new Response(JSON.stringify({ predicted_price_pretty: "missing" }), {
      status: 200,
    });
  }) as typeof fetch;

  try {
    const result = await predictPrice(baseInput);

    assert.equal(result.source, "mock");
    assert.ok(result.estimatedPrice > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
