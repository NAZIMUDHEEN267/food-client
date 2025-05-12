import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    type: 'user',
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.type = 'user'
        },
        addType(state, action) {
            state.type = action.payload;
        }
    }
})

export const { addUser, addType } = authSlice.actions;

export default authSlice.reducer;