import {apiSlice} from '../api.slice';

export const leakSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        replan: builder.mutation({
            query:(params) => ({
                url:`/v2/revenue-leak/transport/${String(params.contract_type).toLowerCase()}`,
                method:'POST',
                params:{
                    ...params.query
                },
            }),
            invalidatesTags:['Leak','Pagination']
        })
    })
})

export const {
    useReplanMutation
} = leakSlice