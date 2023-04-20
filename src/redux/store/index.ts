import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '@redux/slices/auth.slice';
import movieReducer from '@redux/slices/movies.slice';
import ratingReducer from '@redux/slices/ratings.slice';
import scheduleReducer from '@redux/slices/schedules.slice';
import statusSeatReducer from '@redux/slices/statusSeats.slice';
import invoiceDataReducer from '@redux/slices/invoiceData.slice';
import foodReducer from '@redux/slices/foods.slice';
import accountReducer from '@redux/slices/accounts.slice';
import cinemaReducer from '@redux/slices/cinemas.slice';
import roomReducer from '@redux/slices/rooms.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['invoiceData'],
};

const persistedReducer = persistReducer(persistConfig, invoiceDataReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    ratings: ratingReducer,
    schedules: scheduleReducer,
    statusSeats: statusSeatReducer,
    invoiceData: persistedReducer,
    foods: foodReducer,
    accounts: accountReducer,
    cinemas: cinemaReducer,
    rooms: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
