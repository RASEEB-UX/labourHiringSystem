import { configureStore } from "@reduxjs/toolkit";
import workerReducer from './workerSlice'
import userReducer from "./userSlice";
const store = configureStore({
    reducer: {
        workerStore: workerReducer,
        userStore: userReducer,
    }

})
export default store;