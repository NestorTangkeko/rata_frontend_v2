import {apiSlice} from '../api.slice';

export const leakSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDetails: builder.query({
            query:(br_no) => ({
                url:'/v2/revenue-leak/'+br_no,
                method:'GET'
            })
        }),
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
    useReplanMutation,
    useLazyGetDetailsQuery
} = leakSlice