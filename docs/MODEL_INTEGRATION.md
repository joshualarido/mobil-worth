# Model Integration

The app calls the live Hugging Face-hosted model endpoint through
`lib/predictPrice.ts`. If the endpoint is unavailable, returns an error, or
responds with an unexpected payload, the app falls back to `mockPredictPrice()`
so the presentation remains reliable.

Default endpoint:

```txt
https://rryayaw-mobilworth.hf.space/predict
```

The URL can be overridden with:

```txt
NEXT_PUBLIC_HF_PREDICT_URL
```

## Request Payload

```json
{
  "brand": "Toyota",
  "model": "Avanza",
  "year": 2020,
  "mileage_km": 45000,
  "transmission": "automatic",
  "fuel_type": "gasoline",
  "engine_cc": 1500,
  "body_type": "MPV",
  "color": "Black",
  "location": "Jakarta"
}
```

## Expected Response

```json
{
  "predicted_price_idr": 158345968,
  "predicted_price_pretty": "Rp 158.3 juta",
  "confidence_pct": 57.3,
  "confidence_label": "Low",
  "price_range_idr": {
    "low": 103753061,
    "high": 307444385
  },
  "price_range_pretty": "Rp 103.8 juta - Rp 307.4 juta",
  "note": "Low confidence: the model's trees disagree on this car (rare spec or sparse training data). Treat the estimate as a rough guide and verify against live listings."
}
```

## Deployment Notes

This remains a frontend-only Vercel deployment. No separate backend deployment is
required because the Hugging Face Space is the external model service.

Direct browser calls are supported because the Hugging Face Space currently
returns CORS headers for Vercel-style origins and allows `POST` requests with
the `content-type` header. If that CORS behavior changes later, add a small
Next.js API route as a proxy and keep the same `predictPrice(input)` UI
interface.
