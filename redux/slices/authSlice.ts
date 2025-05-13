import { token, User } from "@/types/auth/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface StateType {
    user: User | null,
    type: 'user' | 'guest',
    token: token | null
}

const initialState: StateType = {
    user: null,
    type: 'user',
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ user: User, token: token }>) => {
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