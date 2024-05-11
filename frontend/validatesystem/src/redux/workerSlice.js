import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchWorkerData = createAsyncThunk("fetchdata", async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/workers/getallworkers');
    return response.data.user
})
const workerSlice = createSlice({
    name: "workers",
    initialState: {
        workers: [],
        rejected: false,
        pending: false,
        empty: false
    },
    reducers: {
        addWorker: (state, action) => {
            state.workers.unshift(action.payload);
        },
        updateWorker: (state, action) => {
            const filteredData = state.workers.filter((item) => item.adhaar != action.payload.adhaar)
        state.workers = [ ...filteredData, action.payload ]
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWorkerData.fulfilled, (state, action) => {
            // console.log(action.payload)
            if (action.payload.length !== 0) {
                state.empty = false

            }
            else {
                state.empty = true

            }
            state.pending = false
            state.workers = action.payload


        }),
            builder.addCase(fetchWorkerData.pending, (state, action) => {

                state.pending = true
            }),
            builder.addCase(fetchWorkerData.rejected, (state, action) => {

                state.rejected = true
            })
    }
})
export const { addWorker, updateWorker } = workerSlice.actions
export default workerSlice.reducer

