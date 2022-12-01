import {apiSlice} from 'lib/redux';

export const authSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: ({email,password}) => ({
                url:'/auth/token',
                method:'POST',
                body: {
                    email,
                    password
                }
            })
        }),
        logout: builder.mutation({
            query:({email}) => ({
                url:'/auth/sign-out',
                method:'POST',
                body:{
                    email
                }
            })
        }),
    })
})

export const {useLogoutMutation,useLoginMutation} = authSlice