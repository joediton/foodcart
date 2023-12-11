export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export type TDaysOfWeek = (typeof daysOfWeek)[number];

export const prepTimingOptions = ["quick", "medium", "slow"] as const;
export type TPrepTimingOptions = (typeof prepTimingOptions)[number];

export const metricUnits = ["", "g", "ml", "l", "kg", "pack(s)"] as const;
export type TMetricUnits = (typeof metricUnits)[number];

export type TIngredient = {
  description: string;
  qty: number;
  unit: TMetricUnits | string;
};

export type TMeal = {
  name: string;
  prepTime: TPrepTimingOptions;
  ingredients: TIngredient[];
  mealIndex: number;
};

export type TMealProps = Omit<TMeal, "mealIndex">;

export type TScreens = "meals" | "generatorConfig" | "schedule";
