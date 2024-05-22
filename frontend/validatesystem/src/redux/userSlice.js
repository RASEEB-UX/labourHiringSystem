import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: [],
        rejected: false,
        pending: false,
        empty: false,
        authStatus: false,
        userType: '',
        userEmail: '',
        userMobile:''
    },
    reducers: {
        addUser: (state, action) => {
            console.log(action.payload)
            state.user = action.payload
            state.userMobile=action.payload.mobile;
            
        },
        addAuthStatus: (state, action) => {
            state.authStatus = action.payload
        },
        addUserType: (state, action) => {
            state.userType = action.payload
        },
        addUserEmail: (state, action) => {
            state.userEmail = action.payload//because you need email in otp form so save email as user logs in
        },
        addUserMobile:(state,action) => {
            state.userMobile= action.payload//because you need email in otp form so save email as user logs in
        },

    },

})
export const { addUser, addAuthStatus, addUserType,addUserMobile, addUserEmail } = userSlice.actions
export default userSlice.reducer

