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

export type TSchedule = {
  key?: string;
  id: string;
  attributes: {
    [index: string]: any;
    name: string;
    monday: {
      timingCategory: string;
    };
    tuesday: {
      timingCategory: string;
    };
    wednesday: {
      timingCategory: string;
    };
    thursday: {
      timingCategory: string;
    };
    friday: {
      timingCategory: string;
    };
    saturday: {
      timingCategory: string;
    };
    sunday: {
      timingCategory: string;
    };
  };
};

export type TSchedulesQueryResponse = {
  schedules: {
    data: TSchedule[];
  };
} | null;
