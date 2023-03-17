import authReducer from '@redux/slices/auth.slice';
import movieReducer from '@redux/slices/movies.slice';
import ratingReducer from '@redux/slices/ratings.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    ratings: ratingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
