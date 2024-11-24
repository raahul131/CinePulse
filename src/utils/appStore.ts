import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import moviesReducer from "../store/movieSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default appStore;
