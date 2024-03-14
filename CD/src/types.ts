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

export const metricUnits = ["items", "packs", "g", "kg", "l", "ml"] as const;
export type TMetricUnits = (typeof metricUnits)[number];

export type TMeal = {
  key?: string;
  id: string;
  attributes: {
    name: string;
    timingCategory: string;
    ingredients: TIngredient[];
  };
};

export type TIngredient = {
  name: string;
  quantity?: number;
  metricUnit?: string;
};

export type TMealsQueryResponse = {
  meals: {
    data: TMeal[];
  };
} | null;

export type TScheduleDay = {
  timingCategory: string;
  meal: TMeal;
};

export type TSchedule = {
  key?: string;
  id: string;
  attributes: {
    [index: string]: any;
    name: string;
    monday: TScheduleDay;
    tuesday: TScheduleDay;
    wednesday: TScheduleDay;
    thursday: TScheduleDay;
    friday: TScheduleDay;
    saturday: TScheduleDay;
    sunday: TScheduleDay;
  };
};

export type TSchedulesQueryResponse = {
  schedules: {
    data: TSchedule[];
  };
} | null;
