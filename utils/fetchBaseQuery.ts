import { BaseQueryFn, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import Toast from 'react-native-toast-message'
import { router } from "expo-router";
import RootState from "@/types/rootState";
import { ApiError } from "@/types/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


export const rawBasequery = fetchBaseQuery({
    baseUrl: 'http://192.168.193.107:5000/api/auth',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Content-Type', 'application/json');
        return headers;
    }
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await rawBasequery(args, api, extraOptions);

    if (result?.error) {
        const { status, data } = result.error as ApiError;

        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: typeof data === 'string' ? data : data.message || 'Something went wrong'
        });

        if (status === 401) {
            router.replace('/(auth)')
        }
    }
    
    return result;
}