import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getHistoryData from '../data/data/getHistoryData';

export const fetchHistoryFromFirebase = createAsyncThunk(
    'data/historyData',
    async (email) => {
        const response = await getHistoryData(email);
        return response;
    }
);

const initialState = {
    history: [],
    deleteHistory: [],
    status: 'idle',
    error: null,
}

const historySlice = createSlice({
    name: 'historyReducer',
    initialState,
    reducers: {
        resetHistory: () => initialState,
        addHistory: (state, action) => {
            state.history.push(action.payload.history);
            console.log(state.history);
        },
        addCheckedHistory: (state, action) => {
            if (state.deleteHistory.includes(action.payload.id)) {
                state.deleteHistory = state.deleteHistory.filter((item) => item !== action.payload.id);
                return;
            }
            state.deleteHistory.push(action.payload.id);
            console.log(state.deleteHistory);
        },
        removeCheckedHistory: (state, action) => {
            console.log(state.deleteHistory);
            state.history = state.history.map((item) => {
                return {
                    ...item,
                    history: item.history.filter((historyItem) => !state.deleteHistory.includes(historyItem.id))
                }
            }).filter((item) => item.history.length > 0);


            state.deleteHistory = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistoryFromFirebase.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHistoryFromFirebase.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('action payloadddddddddddddddd' + JSON.stringify(action.payload, null, 2));
                state.history = action.payload[0].history; // Set history based on the fetched data
            })
            .addCase(fetchHistoryFromFirebase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Set error message
            });
    },
});

export const { addHistory, resetHistory, addCheckedHistory, removeCheckedHistory } = historySlice.actions;

export default historySlice.reducer;
