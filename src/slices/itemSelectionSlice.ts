import { createSlice } from '@reduxjs/toolkit';
import {
  IImage,
  IMenuItem,
  IModifier,
  IModifierItem
} from '../interfaces/menu';

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
  visible: 1,
  availabilityType: '',
  available: true,
  qty: 1
};

const initialModifier: IModifier = {
  id: 0,
  name: '',
  minChoices: 0,
  maxChoices: 0,
  items: [initialModifierItem]
};

export interface IInitialState {
  isItemSelected: boolean;
  selectedItem: IMenuItem;
}

export const initialState: IInitialState = {
  isItemSelected: false,
  selectedItem: {
    id: 0,
    name: '',
    alcoholic: 0,
    price: 0,
    position: 0,
    availabilityType: '',
    available: true,
    description: '',
    visible: 1,
    sku: '',
    images: [initialImage],
    modifiers: [initialModifier]
  }
};

export const itemSelectionSlice = createSlice({
  name: 'itemSelection',
  initialState,
  reducers: {
    selectItem(state, action) {
      state.isItemSelected = true;
      state.selectedItem = action.payload;
    },
    resetSelectedItem(state) {
      state.isItemSelected = false;
      state.selectedItem = initialState.selectedItem;
    }
  }
});

export const { selectItem, resetSelectedItem } = itemSelectionSlice.actions;

export default itemSelectionSlice.reducer;
