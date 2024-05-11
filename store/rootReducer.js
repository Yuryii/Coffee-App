import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData, updateReviewField, updateReview } from '../data/data/itemdata';
export const fetchDataFromFirebase = createAsyncThunk(
  'data/coffeeAndBeanData',
  async () => {
    const response = await getData();
    return response;
  }
);
// This function is just for testing purposes
export const updateReviewInFirebase = createAsyncThunk(
  'data/addReviewForEachProduct',
  async (idList) => {
    const response = await updateReviewField(idList);
    return response;
  }
);
// ------------------------------------------------------------
export const updateRevieww = createAsyncThunk(
  'data/updateReview',
  async (data) => {
    const response = await updateReview(data);
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
    statusReview: 'idle',
    errorReview: null,
  },
  reducers: {
    searchItem: (state, action) => {
      if (action.payload.text === 'All') {
        state.coffeData = state.data.filter((item) => item.type === 'Coffee');
        return;
      }
      state.coffeData = state.data.filter((item) => item.type === 'Coffee' && item.name.toLowerCase().includes(action.payload.text.toLowerCase()));
    },
    resetStatusReview: (state) => {
      state.statusReview = 'idle';
    },
    resetErrorReview: (state) => {
      state.errorReview = null;
    }
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
      .addCase(updateReviewInFirebase.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(updateRevieww.fulfilled, (state, action) => {
        state.statusReview = 'succeeded';
      })
      .addCase(updateRevieww.pending, (state, action) => {
        state.statusReview = 'loading';
      })
      .addCase(updateRevieww.rejected, (state, action) => {
        state.statusReview = 'failed';
        state.errorReview = action.error.message;
      });
  },
});

export const { searchItem, resetErrorReview, resetStatusReview } = dataSlice.actions;
export default dataSlice.reducer;
