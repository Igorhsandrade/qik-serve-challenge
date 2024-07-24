import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IImage,
  IMenu,
  IMenuItem,
  IModifier,
  IModifierItem,
  ISection
} from '../interfaces/menu';
import { getAsyncMenuDetails } from '../api/restaurantApi';

const initialImage: IImage = {
  id: 0,
  image: ''
};

const initialModifierItem: IModifierItem = {
  id: 0,
  name: '',
  price: 0,
  maxChoices: 0,
  position: 0,
  visible: 0,
  availabilityType: '',
  available: false,
  qty: 0 // Assuming default value for optional qty
};

const initialModifier: IModifier = {
  id: 0,
  name: '',
  minChoices: 0,
  maxChoices: 0,
  items: [initialModifierItem]
};

const initialMenuItem: IMenuItem = {
  id: 0,
  name: '',
  description: '', // Assuming empty string for optional description
  alcoholic: 0,
  price: 0,
  position: 0,
  visible: 0,
  availabilityType: '',
  sku: '', // Assuming empty string for optional sku
  images: [initialImage], // Assuming empty array for optional images
  modifiers: [initialModifier], // Assuming empty array for optional modifiers
  available: false
};

const initialSection: ISection = {
  id: 0,
  name: '',
  description: null, // Assuming null for optional description
  position: 0,
  visible: 0,
  images: [initialImage],
  items: [initialMenuItem]
};

const initialMenu: IMenu = {
  id: 0,
  name: '',
  type: '',
  collapse: 0,
  sections: [initialSection]
};

export interface IInitialState {
  isLoadingMenu: boolean;
  isSuccessMenu: boolean;
  menu: IMenu;
}

const initialState: IInitialState = {
  isLoadingMenu: false,
  isSuccessMenu: false,
  menu: initialMenu
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await getAsyncMenuDetails();
  return response;
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.isLoadingMenu = true;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.isLoadingMenu = false;
      state.isSuccessMenu = true;
      state.menu = action.payload;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.isLoadingMenu = false;
      state.isSuccessMenu = false;
      state.menu = initialMenu;
    });
  }
});

export default menuSlice.reducer;
