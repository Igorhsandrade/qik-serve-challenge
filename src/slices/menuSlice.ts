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
  itemIdsToNames: { [key: number]: string };
  modifierIdsToNames: {
    [key: number]: { modifierItemName: string; modifierItemPrice: number };
  };
}

const initialState: IInitialState = {
  isLoadingMenu: false,
  isSuccessMenu: false,
  menu: initialMenu,
  itemIdsToNames: {},
  modifierIdsToNames: {}
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  try {
    const response = await getAsyncMenuDetails();
    const sortedResponse = { ...response };
    const sortedSections = [...sortedResponse.sections].sort(
      (a, b) => a.position - b.position
    );
    const sortedSectionsAndItems: ISection[] = sortedSections.map((section) => {
      const sortedSection = { ...section };
      const sortedItems = [...sortedSection.items].sort(
        (a, b) => a.position - b.position
      );
      sortedSection.items = sortedItems;
      return sortedSection;
    });
    sortedResponse.sections = sortedSectionsAndItems;
    return sortedResponse;
  } catch (err) {
    console.log(err);
    throw new Error(err as string);
  }
});

export const getItemIdsToNames = (sections: ISection[]) => {
  return sections.reduce((acc, section) => {
    return {
      ...acc,
      ...section.items.reduce((acc, item) => {
        return {
          ...acc,
          [item.id]: item.name
        };
      }, {})
    };
  }, {});
};

export const getModifierIdsToNames = (sections: ISection[]) => {
  return sections.reduce((acc, section) => {
    return {
      ...acc,
      ...section.items.reduce((acc, item) => {
        if (item.modifiers) {
          return {
            ...acc,
            ...item.modifiers.reduce((acc, modifier) => {
              return {
                ...acc,
                ...modifier.items.reduce((acc, item) => {
                  return {
                    ...acc,
                    [item.id]: {
                      modifierItemName: item.name,
                      modifierItemPrice: item.price
                    }
                  };
                }, {})
              };
            }, {})
          };
        }
        return {
          ...acc
        };
      }, {})
    };
  }, {});
};

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
      state.itemIdsToNames = getItemIdsToNames(action.payload.sections);
      state.modifierIdsToNames = getModifierIdsToNames(action.payload.sections);
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.isLoadingMenu = false;
      state.isSuccessMenu = false;
      state.menu = initialMenu;
    });
  }
});

export default menuSlice.reducer;
