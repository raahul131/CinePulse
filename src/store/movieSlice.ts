import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    playingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPlayingMovies: (state, action) => {
      state.playingMovies = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addPlayingMovies } = movieSlice.actions;
export default movieSlice.reducer;
