import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tickers: []
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        getTickets: (state, { payload }) => {
            state.tickers = payload;
        }
    }
});

export const counterSelector = {
    getTickers: (state) => state.tickers,
}

export const { getTickets } = counterSlice.actions;
export default counterSlice;
