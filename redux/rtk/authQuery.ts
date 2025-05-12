import { forgotType, responseType, SignInResponse, signInType, tokenType, versionResponse, versionType } from '@/types/auth/query';
import { baseQuery } from '@/utils/fetchBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react'

export const authQuery = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (build) => ({
        signInUser: build.mutation<SignInResponse, signInType>({
            query: (data) => ({
                url: '/sign-in',
                method: 'post',
                body: data
            })
        }),
        signUpUser: build.mutation<responseType, FormData>({
            query: (data) => ({
                url: '/sign-up',
                method: 'post',
                body: data,
            }),
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