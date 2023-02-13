import {apiSlice} from '../api.slice';

export const dataManagementSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateData: builder.mutation({
            query: (params) => ({
                url:`v2/data-management/${params.route}`,
                method:'PUT',
                params:{
                    ...params.query
                },
                body: {
                    ...params.body
                }
            }),
            invalidatesTags:['Pagination']
        }),
        createData: builder.mutation({
            query: (params) => ({
                url:`v2/data-management/${params.route}`,
                method:'POST',
                params:{
                    ...params.query
                },
                body: {
                    ...params.body
                }
            })
        }),
        getDataDetails: builder.query({
            query:(params) => ({
                url: `v2/data-management/${params.route}`,
                method:'GET'
            }),
            // providesTags:['Pagination']
        })
    })

})

export const {
    useUpdateDataMutation,
    useCreateDataMutation,   
    useGetDataDetailsQuery                              
} = dataManagementSlice