import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TMeal } from "@/types";

export interface TMealsSlice {
  value: TMeal[] | null;
}

const initialState: TMealsSlice = {
  value: null,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    updateAllMeals: (state, action: PayloadAction<TMeal[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateAllMeals } = mealsSlice.actions;

export const selectMeals = (state: RootState) => state.meals.value;

export default mealsSlice.reducer;
