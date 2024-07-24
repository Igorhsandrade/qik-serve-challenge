import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from '../slices/restaurantSlice';
import menuSlice from '../slices/menuSlice';

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    menu: menuSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
