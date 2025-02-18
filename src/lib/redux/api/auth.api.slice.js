import {apiSlice} from 'lib/redux';

export const authSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        accountUpdate: builder.mutation({
            query: (params) => ({
                url: `/v2/authentication`,
                method: 'PUT',
                body:{
                    ...params.body
                }
            }),
            providesTags:['Auth']
        }),
        access: builder.query({
            query: (params) => ({
                url:'/v2/authentication',
                method:'GET',
            }),
            providesTags:['Auth']
        }),
        login: builder.mutation({
            query: ({email,password}) => ({
                url:'/v2/authentication/login',
                method:'POST',
                body: {
                    email,
                    password
                }
            }),
            invalidatesTags:['Auth']
        }),
        logout: builder.mutation({
            query:() => ({
                url:'/v2/authentication/logout',
                method:'POST',
            })
        }),
        getSession: builder.query({
            query:() => ({
                url: '/v2/authentication/session',
                method: 'GET'
            }),
            providesTags:['Auth']
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url:'/v2/authentication/forgot-password',
                method:'POST',
                body: {
                    email
                },
            }),
            invalidatesTags:['Auth']
        })
    })
})

export const {
    useLogoutMutation,
    useLoginMutation,
    useAccountUpdateMutation,
    useAccessQuery,
    useGetSessionQuery,
    useForgotPasswordMutation
} = authSlice