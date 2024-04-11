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
