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

export const timingCategories = ["quick", "normal", "slow"] as const;
export type TTimingCategories = (typeof timingCategories)[number];

export const metricUnits = ["", "g", "ml", "l", "kg", "pack(s)"] as const;
export type TMetricUnits = (typeof metricUnits)[number];

export type TMeal = {
  attributes: {
    name: string;
    timingCategory: string;
    ingredients: TIngredient[];
  };
  mealIndex: number;
};

export type TIngredient = {
  name: string;
  quantity?: number;
  metricUnit?: string;
};
