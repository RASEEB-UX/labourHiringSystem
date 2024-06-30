import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchWorkerData = createAsyncThunk("fetchdata", async () => {
    const response = await axios.get('https://labourhiringsystem-1.onrender.com/api/workers/getallworkers');
    return response.data.user
})
const workerSlice = createSlice({
    name: "workers",
    initialState: {
        workers: [],
        rejected: false,
        pending: true,
        empty: false
    },
    reducers: {
        addWorker: (state, action) => {
            state.workers.unshift(action.payload);
            state.empty=false
            state.pending=false
        },
        updateWorker: (state, action) => {
            console.log('update payload is', action.payload)
            const filteredData = state.workers.filter((item) => item.mobile != action.payload.oldNumber)
            state.workers = [...filteredData, action.payload.data]
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWorkerData.fulfilled, (state, action) => {
            // console.log(action.payload)
            if (action.payload.length !== 0) {
                state.empty = false

            }
            else {
                console.log('it is empty')
                state.empty = true

            }
            state.pending = false
            state.workers = action.payload
        }),
            builder.addCase(fetchWorkerData.pending, (state, action) => {

                state.pending = true
            }),
            builder.addCase(fetchWorkerData.rejected, (state, action) => {

                state.rejected = true,
                state.pending=false
            })
    }
})
export const { addWorker, updateWorker } = workerSlice.actions
export default workerSlice.reducer

