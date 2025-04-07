import { apiSlice } from '../api.slice';

export const administrationSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdminData: builder.query({
            query: (params) => ({
                url: `v2/administration/${params.route}`,
                method:'GET',
                params:{
                    ...params.query
                }
            }),
            providesTags:['Administration']
        }),
        createAdminData: builder.mutation({
            query: (params) => ({
                url: `v2/administration/${params.route}`,
                method:'POST',
                body:{
                    ...params.body
                }
            }),
            invalidatesTags:['Administration','Pagination']
        }),
        updateAdminData: builder.mutation({
            query: (params) => ({
                url: `v2/administration/${params.route}`,
                method:'PUT',
                params:{
                    ...params.query
                },
                body:{
                    ...params.body
                }
            }),
            invalidatesTags:['Administration','Pagination']
        }),
        updateUserPassword: builder.mutation({
            query: (params) => ({
                url: `v2/administration/user/password`,
                method:'PUT',
                body:{
                    ...params.body
                }
            })
        })
        
    })
})

export const {
    useGetAdminDataQuery,
    useCreateAdminDataMutation,
    useUpdateAdminDataMutation,
    useUpdateUserPasswordMutation
} = administrationSlice