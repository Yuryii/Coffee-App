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
        resetDeleteHistory: (state) => {
            state.deleteHistory = []
        },
        resetHistory: () => initialState,
        addHistory: (state, action) => {
            state.history.push(action.payload.history);
            console.log(state.history);
        },
        addCheckedHistory: (state, action) => {
            if (state.deleteHistory.length === 0) {
                state.deleteHistory.push({ date: action.payload.date, id: [action.payload.id] });
            } else {
                const indexDate = state.deleteHistory.findIndex(item => item.date === action.payload.date);
                if (indexDate === -1) {
                    state.deleteHistory.push({ date: action.payload.date, id: [action.payload.id] });
                } else {
                    if (!state.deleteHistory[indexDate].id.includes(action.payload.id)) {
                        state.deleteHistory[indexDate].id.push(action.payload.id);
                    } else {
                        state.deleteHistory[indexDate].id = state.deleteHistory[indexDate].id.filter(id => id !== action.payload.id);
                        if (state.deleteHistory[indexDate].id.length === 0) {
                            //delete this object
                            state.deleteHistory.splice(indexDate, 1);
                        }
                    }
                }
            }
            console.log(state.deleteHistory);
        },
        removeCheckedHistory: (state, action) => {
            state.history = state.history.map(historyItem => {
                const filteredHistory = historyItem.history.filter(subHistoryItem =>
                    !state.deleteHistory.some(deleteHistoryItem =>
                        deleteHistoryItem.date = historyItem.date && deleteHistoryItem.id.includes(subHistoryItem.id)
                    )
                )
                return { date: historyItem.date, history: filteredHistory };
            }).filter(item => item.history.length > 0);
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

export const { addHistory, resetHistory, addCheckedHistory, removeCheckedHistory, resetDeleteHistory } = historySlice.actions;

export default historySlice.reducer;

