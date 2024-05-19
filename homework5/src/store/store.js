import { configureStore } from '@reduxjs/toolkit'

import moviesSlice from '../reduser/moviesSlice'
import favoriteAndLaterMovieSlice from '../reduser/favoriteAndLaterMovieSlice'
import commentsSlice from '../reduser/commentsSlice'

export default configureStore({

  reducer: {
    movies: moviesSlice,
    favoriteAndLater: favoriteAndLaterMovieSlice,
    comments: commentsSlice,
  }
  
})