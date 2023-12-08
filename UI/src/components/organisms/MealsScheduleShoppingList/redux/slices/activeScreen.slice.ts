import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TScreens } from "../../types";

export interface TActiveScreenSlice {
  value: TScreens;
}

const initialState: TActiveScreenSlice = {
  value: "generatorConfig",
};

export const activeScreenSlice = createSlice({
  name: "activeScreen",
  initialState,
  reducers: {
    updateActiveScreen: (state, action: PayloadAction<TScreens>) => {
      state.value = action.payload;
    },
  },
});

export const { updateActiveScreen } = activeScreenSlice.actions;

export const selectActiveScreen = (state: RootState) =>
  state.activeScreen.value;

export default activeScreenSlice.reducer;
