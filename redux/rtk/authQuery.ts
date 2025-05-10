import { forgotType, responseType, signInType, tokenType } from '@/types/auth/query';
import { User } from '@/types/auth/user';
import { baseQuery } from '@/utils/fetchBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react'

export const authQuery = createApi({
    reducerPath: 'authApi',
    baseQuery,
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
        })
    }),
})


export const {
    useSignInUserMutation,
    useForgotPasswdMutation,
    useSignUpUserMutation,
    useVerifyTokenMutation
} = authQuery;