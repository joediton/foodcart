import { ContentDto, SchemaDto } from "@squidex/squidex/api";

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

export type TMeal = ContentDto & {
  data: {
    name: TMealName;
    timingCategory: TimingCategory;
    ingredients: TIngredients;
  };
  mealIndex: number;
};

export type TMealName = {
  iv: string;
};

export type TimingCategory = {
  iv: TTimingCategoryIv;
};

export type TTimingCategoryIv = SchemaDto & {
  name: string;
};

export type TIngredients = {
  iv: TIngredient[];
};

export type TIngredient = SchemaDto & {
  name: string;
  quantity: number;
  metricUnit: null | string;
};
