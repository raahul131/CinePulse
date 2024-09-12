// import { createSlice } from "@reduxjs/toolkit";

// export const homeSlice = createSlice({
//   name: "home",
//   initialState: {
//     url: {},
//     genres: {},
//   },
//   reducers: {
//     getApiConfiguration: (state, action) => {
//       state.url = action.payload;
//     },
//     getGenres: (state, action) => {
//       state.genres = action.payload;
//     },
//   },
// });

// export const { getApiConfiguration, getGenres } = homeSlice.actions;

// export default homeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Genre type
interface Genre {
  id: number;
  name: string;
}

// Define the initial state type
interface HomeState {
  url: {
    backdrop?: string;
    poster?: string;
    profile?: string;
  };
  genres: { [key: number]: Genre }; // Genres object with number keys
}

const initialState: HomeState = {
  url: {},
  genres: {}, // Initialize genres as an object
};

export const homeSlice = createSlice({
  name: "home", // Update name from "counter" to "home"
  initialState,
  reducers: {
    getApiConfiguration: (state, action: PayloadAction<HomeState["url"]>) => {
      state.url = action.payload;
    },
    getGenres: (state, action: PayloadAction<{ [key: number]: Genre }>) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
