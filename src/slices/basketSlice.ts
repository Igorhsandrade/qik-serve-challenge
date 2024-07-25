import { createSlice } from '@reduxjs/toolkit';
import { ISelectedModifiers } from '../containers/itemModal';
import { ISection } from '../interfaces/menu';

export interface IBasket {
  items: {
    [itemId: string]: IBasketItem[];
  };
  totalItems: number;
  total: number;
}

export interface IBasketItem {
  itemId: string;
  modifiers: ISelectedModifiers;
  quantity: number;
  price: number;
}

const getBasketItem = (item: IBasketItem, basket: IBasket) => {
  if (item.itemId in basket.items) {
    return basket.items[item.itemId];
  }
  return undefined;
};

const isItemSame = (item1: IBasketItem, item2: IBasketItem) => {
  if (item1.itemId === item2.itemId && item1.modifiers && item2.modifiers) {
    const item1Modifiers = item1.modifiers;
    const item1ModifiersKeys = Object.keys(item1Modifiers);
    const item2Modifiers = item2.modifiers;
    const item2ModifiersKeys = Object.keys(item2Modifiers);
    const hasSameModifier =
      item1ModifiersKeys.length === item2ModifiersKeys.length &&
      item1ModifiersKeys.every((item1ModifiersKey) => {
        if (item1ModifiersKey in item2Modifiers) {
          const item1ModifiersValues = item1Modifiers[item1ModifiersKey];
          const item1ModifiersValuesKeys = Object.keys(item1ModifiersValues);
          const item2ModifiersValues = item2Modifiers[item1ModifiersKey];
          const item2ModifiersValuesKeys = Object.keys(item2ModifiersValues);
          const hasSameModifierItems =
            item1ModifiersValuesKeys.length ===
              item2ModifiersValuesKeys.length &&
            item1ModifiersValuesKeys.every((item1ModifiersValuesKey) => {
              return (
                item1ModifiersValues[item1ModifiersValuesKey] ===
                item2ModifiersValues[item1ModifiersValuesKey]
              );
            });
          return hasSameModifierItems;
        }
        return false;
      });
    return hasSameModifier;
  }
  return false;
};

export const getTotalBasketPrice = (basket: IBasket) => {
  return Object.values(basket.items).reduce((total, item) => {
    return (
      item.reduce((total, item) => total + item.price * item.quantity, 0) +
      total
    );
  }, 0);
};

const initialState: IBasket = {
  items: {},
  total: 0,
  totalItems: 0
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      // Verify if the item is already in the basket
      const basketItems = getBasketItem(action.payload, state);
      if (basketItems) {
        //Verify if the modified item is already in the basket
        const basketModifiedItem = basketItems.find((basketItem) =>
          isItemSame(basketItem, action.payload)
        );
        if (basketModifiedItem) {
          //If modified item exists update quantity
          basketModifiedItem.quantity += action.payload.quantity;
        } else {
          //If modified item doesn't exist add to item with modifiers
          basketItems.push({ ...action.payload });
        }
      } else {
        //If item doesn't exist add to item to basket
        state.items[action.payload.itemId] = [{ ...action.payload }];
      }
      state.totalItems += action.payload.quantity;
      state.total = getTotalBasketPrice(state);
      return;
    },
    removeItemFromBasket: (state, action) => {
      const basketItems = getBasketItem(action.payload, state);
      if (basketItems) {
        const basketModifiedItem = basketItems.find((basketItem) =>
          isItemSame(basketItem, action.payload)
        );
        if (basketModifiedItem) {
          if (basketModifiedItem.quantity > action.payload.quantity) {
            basketModifiedItem.quantity -= action.payload.quantity;
          } else {
            if (basketItems.length == 1) {
              delete state.items[action.payload.itemId];
            } else {
              basketItems.splice(basketItems.indexOf(basketModifiedItem), 1);
            }
          }
        }
      }
      state.totalItems -= action.payload.quantity;
      state.total = getTotalBasketPrice(state);
      return;
    }
  }
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;

export default basketSlice.reducer;
