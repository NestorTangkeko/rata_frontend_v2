import {apiSlice} from '../api.slice';

export const dataManagementSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateData: builder.mutation({
            query: (params) => ({
                url:`/v2/data-management/${params.route}`,
                method:'PUT',
                params:{
                    ...params.query
                },
                body: {
                    ...params.body
                }
            }),
            invalidatesTags:['Pagination']
        })
    })
})

export const {
    useUpdateDataMutation
} = dataManagementSlice