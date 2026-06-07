import type { CarInput } from "@/types/car";

export type SampleScenario = {
  label: string;
  input: CarInput;
};

export const sampleScenarios: SampleScenario[] = [
  {
    label: "Toyota Avanza 2020",
    input: {
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
    },
  },
  {
    label: "Honda Brio 2019",
    input: {
      brand: "Honda",
      model: "Brio",
      year: 2019,
      mileageKm: 62000,
      transmission: "automatic",
      fuelType: "gasoline",
      engineDisplacementCc: 1200,
      bodyType: "Hatchback",
      color: "White",
      location: "Bandung",
    },
  },
  {
    label: "Mitsubishi Pajero 2021",
    input: {
      brand: "Mitsubishi",
      model: "Pajero Sport",
      year: 2021,
      mileageKm: 38000,
      transmission: "automatic",
      fuelType: "diesel",
      engineDisplacementCc: 2400,
      bodyType: "SUV",
      color: "Silver",
      location: "Surabaya",
    },
  },
  {
    label: "Daihatsu Xenia 2018",
    input: {
      brand: "Daihatsu",
      model: "Xenia",
      year: 2018,
      mileageKm: 85000,
      transmission: "manual",
      fuelType: "gasoline",
      engineDisplacementCc: 1300,
      bodyType: "MPV",
      color: "Gray",
      location: "Semarang",
    },
  },
];
