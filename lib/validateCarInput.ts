import { currentYear } from "@/lib/carFormConfig";
import type { CarInput } from "@/types/car";

export function validateCarInput(input: CarInput) {
  if (!input.brand.trim()) return "Brand is required.";
  if (!input.model.trim()) return "Model is required.";
  if (input.year < 1990 || input.year > currentYear) {
    return `Please enter a valid year between 1990 and ${currentYear}.`;
  }
  if (input.mileageKm < 0) return "Mileage must be 0 km or higher.";
  if (input.engineDisplacementCc <= 0) {
    return "Engine displacement must be greater than 0 CC.";
  }
  if (!input.location.trim()) return "Location is required.";
  return "";
}
