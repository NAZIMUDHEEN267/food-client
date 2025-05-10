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
        },
        addType(state, action) {
            state.type = action.payload;
        }
    }
})

export const { addUser } = authSlice.actions;

export default authSlice.reducer;