import { configureStore } from '@reduxjs/toolkit';
import restaurantSlice from '../slices/restaurantSlice';
import menuSlice from '../slices/menuSlice';
import itemSelectionSlice from '../slices/itemSelectionSlice';
import basketSlice from '../slices/basketSlice';

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    menu: menuSlice,
    itemSelection: itemSelectionSlice,
    basket: basketSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
