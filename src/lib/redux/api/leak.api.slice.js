import {apiSlice} from '../api.slice';

export const leakSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDetails: builder.query({
            query:(args) => ({
                url:'/v2/revenue-leak/'+args.tms_reference_no,
                params:{
                    draft_bill_type: args.draft_bill_type
                },
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