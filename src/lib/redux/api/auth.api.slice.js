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
    })
})

export const {
    useLogoutMutation,
    useLoginMutation,
    useAccountUpdateMutation,
    useAccessQuery
} = authSlice