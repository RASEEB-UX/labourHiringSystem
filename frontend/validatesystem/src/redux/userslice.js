import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchdata = createAsyncThunk("datafetch", async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/users/employees');

    return response.data.user
})
const userSlice = createSlice({
    name: "workers",
    initialState: {
        users: [],
        rejected: false,
        pending: false,
        empty: false
    },
    reducers: {
        addUser: (state, action) => {
            state.users.unshift(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchdata.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action.payload.length !== 0) {
                state.empty = false

            }
            else {
                state.empty = true

            }
            state.pending = false
            state.users = action.payload


        }),
            builder.addCase(fetchdata.pending, (state, action) => {

                state.pending = true
            }),
            builder.addCase(fetchdata.rejected, (state, action) => {

                state.rejected = true
            })
    }
})
export const { addUser } = userSlice.actions
export default userSlice.reducer

