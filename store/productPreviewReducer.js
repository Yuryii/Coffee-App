import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Review: [],
    status: 'idle',
    error: null,
}

const reviewSlice = createSlice({
    name: 'productPreview',
    initialState,
    reducers: {
        ss: (state, action) => {
            // if (state.allReview.length === 0) {
            //     state.allReview.push({
            //         id: action.payload.id,
            //         rate: action.payload.rate,
            //         text: action.payload.text,
            //         email: action.payload.email
            //     })
            // }
            // // else block is empty, you can add logic here if needed
        },
    },
});

export const { sss } = reviewSlice.actions;

export default reviewSlice.reducer;