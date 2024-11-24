import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import homeSlice from "./homeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movies: movieSlice,
    home: homeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
