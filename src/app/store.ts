import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import characterReducer from "../features/character/characterSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
