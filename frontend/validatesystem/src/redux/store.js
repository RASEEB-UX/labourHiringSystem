import { configureStore } from "@reduxjs/toolkit";
import workerReducer from './workerSlice'
import userReducer from "./userSlice";
import feedBackSlice from "./feedBackSlice";
import advertisementSlice from "./advertisementSlice";
const store = configureStore({
    reducer: {
        workerStore: workerReducer,
        userStore: userReducer,
        advertisementStore:advertisementSlice,
        feedBackStore:feedBackSlice
    }

})
export default store;