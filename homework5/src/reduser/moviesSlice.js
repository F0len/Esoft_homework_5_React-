import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('https://raw.githubusercontent.com/Lanoriya/json-values/main/films.json');
  return response.data;
});

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
       
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
       
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
       
      });
  },
});

export {fetchMovies};
export default moviesSlice.reducer;