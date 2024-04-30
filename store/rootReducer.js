import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getData from '../data/data/itemdata';
import getCartData from '../data/data/getCartData';
export const fetchDataFromFirebase = createAsyncThunk(
  'data/coffeeAndBeanData',
  async () => {
    const response = await getData();
    return response;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    coffeData: [],
    beansData: [],
    coffeeDataSearched: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    searchItem: (state, action) => {
      if (action.payload.text === 'All') {
        state.coffeData = state.data.filter((item) => item.type === 'Coffee');
        return;
      }
      state.coffeData = state.data.filter((item) => item.type === 'Coffee' && item.name.toLowerCase().includes(action.payload.text.toLowerCase()));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromFirebase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataFromFirebase.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.coffeData = state.data.filter((item) => item.type === 'Coffee');
        state.beansData = state.data.filter((item) => item.type === 'Bean');
        state.coffeeDataSearched = state.coffeData;
      })
      .addCase(fetchDataFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { searchItem } = dataSlice.actions;
export default dataSlice.reducer;
