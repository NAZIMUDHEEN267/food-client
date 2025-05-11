import { forgotType, responseType, signInType, tokenType, versionResponse, versionType } from '@/types/auth/query';
import { User } from '@/types/auth/user';
import { baseQuery, rawBasequery } from '@/utils/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authQuery = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.193.107:8081/api/auth' }),
    endpoints: (build) => ({
        signInUser: build.mutation<User, signInType>({
            query: (data) => ({
                url: '/sign-in',
                method: 'post',
                body: { ...data, role: 'user' }
            })
        }),
        signUpUser: build.mutation<responseType, User>({
            query: (data) => ({
                url: '/sign-up',
                method: 'post',
                body: data
            })
        }),
        forgotPasswd: build.mutation<responseType, forgotType>({
            query: (data) => ({
                method: 'post',
                url: '/forgot-password',
                body: data,
            })
        }),
        verifyToken: build.mutation<responseType, tokenType>({
            query: data => ({
                method: 'post',
                url: '/verify-token',
                body: data
            })
        }),
        versionCheck: build.mutation<versionResponse, versionType>({
            query: (data) => ({
                url: '/version',
                method: 'post',
                body: data
            })
        })
    }),
})


export const {
    useSignInUserMutation,
    useForgotPasswdMutation,
    useSignUpUserMutation,
    useVerifyTokenMutation,
    useVersionCheckMutation
} = authQuery;