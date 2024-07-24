import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from '../slices/restaurantSlice';
import menuSlice from '../slices/menuSlice';
import itemSelectionSlice from '../slices/itemSelectionSlice';

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    menu: menuSlice,
    itemSelection: itemSelectionSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
