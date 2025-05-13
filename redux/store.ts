import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { authQuery } from '@/redux/rtk/authQuery'
import guestMiddleware from '@/utils/guestMiddleware';


const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        [authQuery.reducerPath]: authQuery.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                authQuery.middleware,
                guestMiddleware
            )
})

export default store;