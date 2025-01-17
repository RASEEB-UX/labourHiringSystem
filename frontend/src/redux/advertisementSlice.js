import { createSlice } from '@reduxjs/toolkit'
const advertisementSlice = createSlice({
    name: "user",
    initialState: {
        advertisementObj: {},
        rejected: false,
        pending: false,
        empty: false,
        advertisementPresent: false
    },
    reducers: {
        addAdvertisement: (state, action) => {
            if (!action.payload || action.payload.length == 0) {
                state.advertisementObj = {}
            }
            if (action.payload && action.payload.length !== 0) {
                console.log('action payload is',action.payload)
                state.advertisementPresent = true
                state.advertisementObj = action.payload
            }
        },
        removeAdvertisement: (state, action) => {
            state.advertisementObj = {}
            state.advertisementPresent = false
        },


    },

})
export const { addAdvertisement, removeAdvertisement } = advertisementSlice.actions
export default advertisementSlice.reducer

