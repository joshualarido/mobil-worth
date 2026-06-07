# Used Car Price Predictor Web App Implementation Plan

## Goal

Build a simple, good-looking frontend web application for an Indonesian used-car price prediction demo.

The app should:

1. Run as a frontend-first web app.
2. Collect all required car details through form inputs.
3. Show a clean predicted price result in Indonesian Rupiah.
4. Initially work with a mock prediction function.
5. Later integrate with a Hugging Face-hosted model endpoint.
6. Be deployable quickly to Vercel.

This is a demo application. Security is not the priority. Speed and working presentation quality are the priority.

---

## Recommended Stack

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui if already installed or easy to add
* Vercel for deployment

Do not build a custom backend inside this project for now.

The machine learning model will be integrated later through a Hugging Face API endpoint.

---

## App Name

Use:

**MobilWorth Indonesia**

Subtitle:

**Used Car Price Estimator for the Indonesian Market**

---

## Core User Flow

1. User opens the app.
2. User sees a landing/header section explaining the predictor.
3. User fills in car details:

   * Brand
   * Model
   * Year
   * Mileage
   * Transmission type
   * Fuel type
   * Engine displacement
   * Body type
   * Color
   * Location
4. User clicks **Predict Price**.
5. App validates the form.
6. App shows:

   * Estimated price in IDR
   * Input summary
   * Small disclaimer saying the result is only an estimate
7. Later, the mock prediction is replaced with a Hugging Face model call.

---

# Phase 1: Create the Frontend Shell

## Step 1: Initialize the Project

Create a Next.js app using TypeScript and Tailwind.

Suggested command:

```bash
npx create-next-app@latest used-car-price-predictor --typescript --tailwind --eslint --app
```

Then enter the project:

```bash
cd used-car-price-predictor
```

Run locally:

```bash
npm run dev
```

---

## Step 2: Define the Main App Structure

Use a single-page layout.

Recommended structure:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    CarPredictionForm.tsx
    PredictionResult.tsx
    Field.tsx
  lib/
    formatCurrency.ts
    mockPredictPrice.ts
    predictPrice.ts
  types/
    car.ts
```

If the project uses the default `app` directory directly without `src`, that is acceptable. Keep the structure clean either way.

---

## Step 3: Create the Car Input Type

Create a TypeScript type for the form data.

File:

```txt
types/car.ts
```

The type should include:

```ts
export type CarInput = {
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  transmission: "manual" | "automatic";
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
  engineDisplacementCc: number;
  bodyType: string;
  color: string;
  location: string;
};
```

Also create a prediction result type:

```ts
export type PredictionResult = {
  estimatedPrice: number;
  lowerBound?: number;
  upperBound?: number;
  source: "mock" | "huggingface";
};
```

---

## Step 4: Build the Main Page Layout

Create a clean landing page in `app/page.tsx`.

The layout should have:

1. Hero section
2. Form card
3. Prediction result card
4. Explanation/disclaimer section

Suggested visual style:

* Full-page light background
* Centered max-width container
* Large title
* Two-column layout on desktop:

  * Left: form
  * Right: result/explanation
* Single-column layout on mobile
* Rounded cards
* Subtle shadow
* Blue or dark slate accent color

Page content:

Title:

```txt
MobilWorth Indonesia
```

Subtitle:

```txt
Estimate used-car prices using machine learning based on Indonesian marketplace listing patterns.
```

Small disclaimer:

```txt
Demo only. Predictions are estimates and may not reflect exact market value.
```

---

## Step 5: Build the Input Form

Create:

```txt
components/CarPredictionForm.tsx
```

The form should include these inputs.

### Text Inputs

* Brand
* Model
* Color
* Location

### Number Inputs

* Year
* Mileage in KM
* Engine displacement in CC

### Select Inputs

Transmission:

* Manual
* Automatic

Fuel type:

* Gasoline
* Diesel
* Hybrid
* Electric

Body type:

* Hatchback
* Sedan
* MPV
* SUV
* Pickup
* Van
* Coupe
* Other

Use controlled React state.

The form should have a submit button:

```txt
Predict Price
```

While loading, show:

```txt
Predicting...
```

---

## Step 6: Add Form Defaults for Fast Demo

Set useful default values so the presenter does not need to type everything manually.

Default example:

```ts
{
  brand: "Toyota",
  model: "Avanza",
  year: 2020,
  mileageKm: 45000,
  transmission: "automatic",
  fuelType: "gasoline",
  engineDisplacementCc: 1500,
  bodyType: "MPV",
  color: "Black",
  location: "Jakarta"
}
```

This makes the demo faster and safer.

---

## Step 7: Add Basic Validation

Before prediction, validate:

* Brand is required
* Model is required
* Year must be between 1990 and current year
* Mileage must be greater than or equal to 0
* Engine displacement must be greater than 0
* Location is required

If validation fails, show a clear error message near the form.

Example:

```txt
Please enter a valid year between 1990 and 2026.
```

Keep validation simple. Do not overengineer it.

---

# Phase 2: Add Mock Prediction Logic

## Step 8: Create Currency Formatter

Create:

```txt
lib/formatCurrency.ts
```

Implement:

```ts
export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
```

---

## Step 9: Create Mock Prediction Function

Create:

```txt
lib/mockPredictPrice.ts
```

The mock function should generate a believable price based on input.

Important: This is temporary and should be clearly marked as mock/demo logic.

Suggested logic:

1. Start with base price by brand.
2. Adjust by year.
3. Reduce price based on mileage.
4. Adjust by transmission.
5. Adjust by body type.
6. Add location multiplier.

Example brand base prices:

```ts
const brandBasePrice: Record<string, number> = {
  toyota: 180_000_000,
  honda: 170_000_000,
  suzuki: 130_000_000,
  daihatsu: 120_000_000,
  mitsubishi: 180_000_000,
  nissan: 140_000_000,
  mazda: 190_000_000,
  bmw: 450_000_000,
  mercedes: 500_000_000,
};
```

Return a rounded IDR number.

Also return a lower and upper bound:

```ts
lowerBound = estimatedPrice * 0.9
upperBound = estimatedPrice * 1.1
```

This makes the result look more realistic for presentation.

---

## Step 10: Display the Prediction Result

Create:

```txt
components/PredictionResult.tsx
```

When no result exists, show:

```txt
Fill in the car details and click Predict Price to generate an estimate.
```

When result exists, show:

* Estimated price
* Price range
* Source label:

  * `Mock demo prediction`
  * Later: `Hugging Face model prediction`
* Input summary

Example display:

```txt
Estimated Market Price
Rp 178.500.000

Expected Range
Rp 160.650.000 - Rp 196.350.000
```

Add a disclaimer:

```txt
This estimate is generated from available vehicle attributes only. Real prices may differ due to condition, accident history, service record, negotiation, and market demand.
```

---

# Phase 3: Make the App Look Good

## Step 11: Visual Design Requirements

The app should look presentation-ready.

Use:

* Clean modern card layout
* Rounded corners
* Soft shadows
* Clear labels
* Large result number
* Consistent spacing
* Mobile responsiveness

Suggested layout:

```txt
--------------------------------------------------
MobilWorth Indonesia
Used Car Price Estimator for the Indonesian Market

[ Form Card ]        [ Prediction Result Card ]
[ Inputs    ]        [ Big estimated price    ]
[ Button    ]        [ Range + summary        ]

[ How it works / disclaimer section ]
--------------------------------------------------
```

---

## Step 12: Add Explanation Section

Below the form/result area, add a short explanation.

Title:

```txt
How the Prediction Works
```

Content:

```txt
The model estimates used-car price from listing attributes such as brand, model, year, mileage, transmission, fuel type, engine displacement, body type, color, and location. These fields were selected because they commonly influence used-car valuation in Indonesian marketplace listings.
```

Also add:

```txt
Current mode: frontend demo shell. Model integration will be connected through Hugging Face.
```

---

## Step 13: Add Sample Scenario Buttons

Add optional quick-fill buttons above the form.

Examples:

1. Toyota Avanza 2020
2. Honda Brio 2019
3. Mitsubishi Pajero 2021
4. Daihatsu Xenia 2018

When clicked, these buttons should populate the form.

This helps during presentation because the presenter can quickly test multiple car scenarios.

---

# Phase 4: Prepare for Hugging Face Integration

## Step 14: Create Prediction Abstraction

Create:

```txt
lib/predictPrice.ts
```

This file should export one function:

```ts
export async function predictPrice(input: CarInput): Promise<PredictionResult>
```

For now, this function should call the mock prediction.

Later, only this file should change when connecting to Hugging Face.

This keeps the UI clean.

---

## Step 15: Define the Hugging Face Request Format

The frontend should send JSON to the Hugging Face endpoint.

Use this payload format:

```json
{
  "brand": "Toyota",
  "model": "Avanza",
  "year": 2020,
  "mileage_km": 45000,
  "transmission": "automatic",
  "fuel_type": "gasoline",
  "engine_displacement_cc": 1500,
  "body_type": "MPV",
  "color": "Black",
  "location": "Jakarta"
}
```

Expected response format:

```json
{
  "estimated_price": 178500000,
  "lower_bound": 160650000,
  "upper_bound": 196350000
}
```

The frontend should convert between camelCase internal fields and snake_case API fields.

---

## Step 16: Add Environment Variable for Hugging Face Endpoint

Add `.env.local`:

```txt
NEXT_PUBLIC_HF_ENDPOINT_URL=
NEXT_PUBLIC_USE_MOCK_MODEL=true
```

Because this is a demo, using `NEXT_PUBLIC_` is acceptable.

When the model is ready:

```txt
NEXT_PUBLIC_HF_ENDPOINT_URL=https://your-huggingface-space-or-endpoint-url/predict
NEXT_PUBLIC_USE_MOCK_MODEL=false
```

Do not block development waiting for the real model.

---

## Step 17: Implement Hugging Face Fetch Logic

Update `lib/predictPrice.ts`.

Logic:

1. If `NEXT_PUBLIC_USE_MOCK_MODEL === "true"`, use mock prediction.
2. Otherwise, call the Hugging Face endpoint.
3. If the Hugging Face call fails, fall back to mock prediction and show a warning.

Pseudo-logic:

```ts
if (process.env.NEXT_PUBLIC_USE_MOCK_MODEL === "true") {
  return mockPredictPrice(input);
}

try {
  const response = await fetch(process.env.NEXT_PUBLIC_HF_ENDPOINT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toApiPayload(input)),
  });

  if (!response.ok) {
    throw new Error("Prediction request failed");
  }

  const data = await response.json();

  return {
    estimatedPrice: data.estimated_price,
    lowerBound: data.lower_bound,
    upperBound: data.upper_bound,
    source: "huggingface",
  };
} catch (error) {
  console.error(error);
  return mockPredictPrice(input);
}
```

---

# Phase 5: Hugging Face Model Integration Plan

## Important Note

A scikit-learn `.pkl` or `.joblib` model usually cannot run directly inside the browser.

For a fast demo, do not try to load the model file in the frontend.

Instead, deploy the trained model to Hugging Face as a small API service, then call that API from the frontend.

Recommended options:

1. Hugging Face Space with a Python API.
2. Hugging Face Inference Endpoint.
3. Hugging Face Space using Gradio/FastAPI-style prediction endpoint.

For this project, use a Hugging Face Space because it is faster and easier for a student demo.

---

## Step 18: Expected Hugging Face Space Structure

The Hugging Face Space should contain:

```txt
app.py
model.joblib
requirements.txt
README.md
```

The frontend does not need these files, but the API must expose a prediction route.

The endpoint should accept the same JSON structure defined earlier.

---

## Step 19: Hugging Face API Contract

The model API should receive:

```json
{
  "brand": "Toyota",
  "model": "Avanza",
  "year": 2020,
  "mileage_km": 45000,
  "transmission": "automatic",
  "fuel_type": "gasoline",
  "engine_displacement_cc": 1500,
  "body_type": "MPV",
  "color": "Black",
  "location": "Jakarta"
}
```

The model API should return:

```json
{
  "estimated_price": 178500000,
  "lower_bound": 160650000,
  "upper_bound": 196350000
}
```

The frontend must not care whether the backend model is Random Forest, Gradient Boosting, or Linear Regression.

The frontend only cares about the request and response format.

---

# Phase 6: Final Presentation Features

## Step 20: Add Demo Mode Indicator

Add a small badge near the result card.

If mock mode:

```txt
Demo Mode
```

If Hugging Face mode:

```txt
Live Model
```

This avoids awkward questions if the real model is not connected yet.

---

## Step 21: Add Model Info Card

Add a small card explaining the intended model.

Content:

```txt
Planned model: Random Forest Regressor
Comparison models: Linear Regression and Gradient Boosting Regressor
Target output: Used-car listing price in IDR
Input type: Structured vehicle listing attributes
```

Keep this concise.

---

## Step 22: Add Evaluation Info Card

Add another small card:

```txt
Planned evaluation metrics:
- MAE: average prediction error in IDR
- RMSE: penalizes large errors
- R²: explains how much price variance the model captures
```

This helps connect the application to the machine learning proposal.

---

# Phase 7: Deployment

## Step 23: Push to GitHub

Initialize Git if needed:

```bash
git init
git add .
git commit -m "Initial used car price predictor frontend"
```

Push to GitHub.

---

## Step 24: Deploy to Vercel

Deploy the Next.js app to Vercel.

Set environment variables in Vercel:

```txt
NEXT_PUBLIC_USE_MOCK_MODEL=true
NEXT_PUBLIC_HF_ENDPOINT_URL=
```

After Hugging Face integration:

```txt
NEXT_PUBLIC_USE_MOCK_MODEL=false
NEXT_PUBLIC_HF_ENDPOINT_URL=https://your-huggingface-endpoint-url/predict
```

---

# Phase 8: Acceptance Criteria

The app is complete when:

* The app runs locally with `npm run dev`.
* The app has a clean landing page.
* The form contains all required car fields.
* The user can submit the form.
* The app displays a formatted IDR price.
* The app displays a lower and upper estimated range.
* The app works even before the ML model is connected.
* The prediction logic is isolated in `lib/predictPrice.ts`.
* Hugging Face integration can be added by changing only the prediction function and environment variables.
* The app is deployable to Vercel.
* The UI is clean enough for a class presentation.

---

# Codex Implementation Priority

Implement in this order:

1. Project setup
2. Types
3. Currency formatter
4. Mock prediction function
5. Main page layout
6. Form component
7. Result component
8. Sample scenario buttons
9. Hugging Face prediction abstraction
10. UI polish
11. Deployment cleanup

Do not spend time on authentication, database, user accounts, admin pages, or persistent history.

This is a demo shell, not a production system.

---

# Final Notes for Codex

Prioritize speed and stability.

The app should not crash if the model endpoint is missing.

If the Hugging Face endpoint is unavailable, fall back to mock prediction.

Keep the UI simple, clean, and presentation-ready.

Avoid unnecessary complexity.
