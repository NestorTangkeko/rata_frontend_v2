import {apiSlice} from '../api.slice';

export const schedulerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        manualTrigger: builder.mutation({
            query:(body) => ({
                url: `/v2/scheduler`,
                method:'POST',
                body:{
                    ...body
                }
            }),
            invalidatesTags:['Pagination']
        }),
        updateScheduler: builder.mutation({
            query: (params) => ({
                url:'/v2/scheduler',
                method:'PUT',
                params:{
                    ...params.query
                },
                body:{
                    data: params.data
                }
            }),
            invalidatesTags:['Pagination']
        })
    })
})

export const {
    useManualTriggerMutation,
    useUpdateSchedulerMutation
} = schedulerSlice