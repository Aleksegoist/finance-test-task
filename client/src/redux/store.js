import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./state";

const store = configureStore({
    reducer: counterSlice.reducer
})

export default store;