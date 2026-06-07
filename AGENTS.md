# AGENTS.md

## Project Summary

This project is a frontend-first demo web application for predicting Indonesian used-car prices.

The app should let users enter structured car listing attributes and receive an estimated price in IDR.

This is a demo shell first. The real machine learning model will be integrated later through Hugging Face.

Do not overbuild this project.

---

## Important Docs

All planning and reference documents must be placed inside the `docs/` folder.

Expected structure:

```txt
docs/
  timeline.md
  design_system.md
```

Use these docs as the source of truth:

* `docs/IMPLEMENTATION_PLAN.md`
  Main build plan, project phases, feature scope, and implementation order.

* `docs/DESIGN_SYSTEM.md`
  Visual style, colors, spacing, typography, layout, and component styling rules.

* `docs/MODEL_INTEGRATION.md`
  Hugging Face request/response contract and later model integration notes.

* `docs/PROJECT_PROPOSAL.md`
  Original machine learning project description, dataset fields, model plan, and evaluation metrics.

If a document is missing, create it inside `docs/`. Do not scatter planning notes across the root folder.

---

## Project Scope

Build only the demo web application shell.

Included:

* Landing page
* Car input form
* Mock prediction logic
* Prediction result display
* IDR currency formatting
* Sample scenario buttons
* Hugging Face-ready prediction abstraction
* Clean responsive UI

Excluded:

* Authentication
* Database
* Admin dashboard
* Persistent history
* User accounts
* Real backend unless needed for Hugging Face model serving
* Complex analytics
* Payment or marketplace features

---

## Required Input Fields

The form must include:

1. Brand
2. Model
3. Year
4. Mileage in kilometers
5. Transmission type
6. Fuel type
7. Engine displacement in CC
8. Body type
9. Color
10. Location

These fields should match the expected model feature columns as closely as possible.

---

## Implementation Outline

Follow this order:

1. Set up the Next.js frontend project.
2. Add TypeScript types for car input and prediction result.
3. Build the page layout.
4. Build the car input form.
5. Add form validation.
6. Add mock prediction logic.
7. Format output price as IDR.
8. Build the prediction result card.
9. Add sample scenario buttons.
10. Apply the red/maroon design system.
11. Add the prediction abstraction in `lib/predictPrice.ts`.
12. Prepare Hugging Face endpoint integration.
13. Test locally.
14. Deploy to Vercel.

---

## Coding Rules

Keep the code simple.

Prefer:

* Clear component names
* Small reusable components
* Typed form data
* Simple validation
* Stable demo behavior
* No unnecessary dependencies

Avoid:

* Overengineering
* Complex state management
* Unused abstractions
* Large nested components
* Backend work before the frontend shell is complete

---

## File Organization

Recommended structure:

```txt
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

docs/
  IMPLEMENTATION_PLAN.md
  DESIGN_SYSTEM.md
  MODEL_INTEGRATION.md
  PROJECT_PROPOSAL.md
```

If using a `src/` directory, keep the same structure under `src/`.

---

## Design Rules

Use the design system in:

```txt
docs/DESIGN_SYSTEM.md
```

Primary color should be red/maroon.

The UI should feel:

* Clean
* Serious
* Trustworthy
* Presentation-ready
* Simple

The predicted price should be the strongest visual element.

---

## Model Integration Rule

For now, use mock prediction.

The UI must call:

```ts
predictPrice(input)
```

Do not call `mockPredictPrice()` directly from components.

Later, `predictPrice()` will switch between:

* Mock prediction
* Hugging Face model endpoint

This keeps the UI independent from the model implementation.

---

## Hugging Face Integration Contract

The future model endpoint should receive JSON like:

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

Expected response:

```json
{
  "estimated_price": 178500000,
  "lower_bound": 160650000,
  "upper_bound": 196350000
}
```

If the endpoint fails, the app should fall back to mock prediction.

---

## Demo Behavior

The app must always work during presentation.

That means:

* Missing Hugging Face endpoint should not crash the app.
* Mock mode should remain available.
* Form should have default values.
* Sample scenario buttons should be available.
* Prediction result should display clearly.

---

## Completion Criteria

The project is acceptable when:

* The app runs with `npm run dev`.
* The page looks clean.
* The form has all required fields.
* The mock prediction works.
* Price is shown in IDR.
* The UI follows the red/maroon design system.
* The prediction logic is isolated in `lib/predictPrice.ts`.
* Important docs are inside `docs/`.
* The project can be deployed to Vercel.
