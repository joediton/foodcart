import { configureStore } from "@reduxjs/toolkit";
import activeScreenReducer from "./slices/activeScreen.slice";
import mealsReducer from "./slices/meals.slice";

const store = configureStore({
  reducer: {
    activeScreen: activeScreenReducer,
    meals: mealsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
