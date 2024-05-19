import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteMovies: [],
  laterMovies: [],
};

const favoriteAndLaterSlice = createSlice({
  name: 'favoriteAndLater',
  initialState,
  reducers: {
    addFavoriteMovie(state, action) {
      const  movie  = action.payload;
      state.favoriteMovies.push(movie);
    },
    removeFavoriteMovie(state, action) {
      const  movieId  = action.payload;
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== movieId);
    },
    addWatchLaterMovie(state, action) {
      const  movie  = action.payload;
      state.laterMovies.push(movie);
    },
    removeWatchLaterMovie(state, action) {
      const  movieId  = action.payload;
      state.laterMovies = state.laterMovies.filter(movie => movie.id !== movieId);
    },
    
  },
});

export const { addFavoriteMovie, removeFavoriteMovie, addWatchLaterMovie, removeWatchLaterMovie } = favoriteAndLaterSlice.actions;
export default favoriteAndLaterSlice.reducer;