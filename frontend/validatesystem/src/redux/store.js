import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userslice'
const store = configureStore({
    reducer: {
        workers: userReducer
    }

})
export default store;