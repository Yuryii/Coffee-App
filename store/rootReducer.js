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
    status: 'idle',
    error: null,
  },
  reducers: {},
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
      })
      .addCase(fetchDataFromFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
