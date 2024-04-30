import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import getUserData from '../data/data/getUserData';

export const fetchUserFromFirebase = createAsyncThunk(
    'data/userData',
    async (email) => {
        const response = await getUserData(email);
        return response;
    }
);
const initialState = {
    userEmail: '',
    userMoney: 0,
    status: 'idle',
    error: null,
};
const userDetails = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        addMoney: (state, action) => {
            state.userMoney += parseFloat(action.payload.money);
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload.email;
        },
        subtractMoney: (state, action) => {
            state.userMoney -= parseFloat(action.payload.totalPrice);
        },
        resetUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserFromFirebase.fulfilled, (state, action) => {
                state.userMoney = action.payload[0].money;
            })
            .addCase(fetchUserFromFirebase.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUserFromFirebase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addMoney, setUserEmail, resetUser, subtractMoney } = userDetails.actions;
export default userDetails.reducer;
