/// <reference types="vite/client" />

declare type TMeal = {
  key?: string;
  id: string;
  attributes: {
    name: string;
    timingCategory: string;
    ingredients: TIngredient[];
  };
  data: TMeal;
};

declare type TMealQueryResponse = {
  meal: {
    data: TMeal;
  };
} | null;

declare type TIngredient = {
  name: string;
  quantity?: number;
  metricUnit?: string;
};

declare type TMealsQueryResponse = {
  meals: {
    data: TMeal[];
  };
} | null;

declare type TScheduleDay = {
  timingCategory: string;
  meal: TMeal;
};

declare type TSchedule = {
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

declare type TSchedulesQueryResponse = {
  schedules: {
    data: TSchedule[];
  };
} | null;

declare type TShoppingList = {
  key?: string;
  id: string;
  attributes: {
    name: string;
  };
  data: TShoppingList;
};

declare type TShoppingListsQueryResponse = {
  shoppingLists: {
    data: TMeal[];
  };
} | null;
