import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../MealsScheduleShoppingList.store";
import { TMealProps } from "../../MealsSheduleShoppingListApp.types";

export interface TMealsSlice {
  value: TMealProps[] | null;
}

const initialState: TMealsSlice = {
  value: null,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    updateAllMeals: (state, action: PayloadAction<TMealProps[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAllMeals } = mealsSlice.actions;

export const selectMeals = (state: RootState) => state.meals.value;

export default mealsSlice.reducer;
