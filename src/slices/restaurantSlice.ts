import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRestaurant, IWebSettings } from '../interfaces/restaurant';
import { getAsyncRestaurant } from '../api/restaurantApi';

const initialWebSettings: IWebSettings = {
  id: 0,
  venueId: 0,
  bannerImage: '',
  backgroundColour: '',
  primaryColour: '',
  primaryColourHover: '',
  navBackgroundColour: ''
};

const initialRestaurant: IRestaurant = {
  id: 0,
  name: '',
  internalName: '',
  description: null,
  liveFlag: 0,
  demoFlag: 0,
  address1: '',
  address2: '',
  address3: null,
  city: '',
  county: '',
  postcode: '',
  country: '',
  timezoneOffset: '',
  locale: '',
  timeZone: '',
  webSettings: initialWebSettings,
  ccy: '',
  ccySymbol: '',
  currency: ''
};

export interface IInitialState {
  isLoadingRestaurant: boolean;
  isSuccessRestaurant: boolean;
  restaurant: IRestaurant;
}

const initialState: IInitialState = {
  isLoadingRestaurant: false,
  isSuccessRestaurant: false,
  restaurant: initialRestaurant
};

export const fetchRestaurant = createAsyncThunk(
  'restaurant/fetchRestaurant',
  async () => {
    const response = await getAsyncRestaurant();
    return response;
  }
);

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRestaurant.pending, (state) => {
      state.isLoadingRestaurant = true;
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.isLoadingRestaurant = false;
      state.isSuccessRestaurant = true;
      state.restaurant = action.payload;
    });
    builder.addCase(fetchRestaurant.rejected, (state) => {
      state.isLoadingRestaurant = false;
      state.isSuccessRestaurant = false;
      state.restaurant = initialRestaurant;
    });
  }
});

export default restaurantSlice.reducer;
