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
        })
    })
})

export const {
    useManualTriggerMutation
} = schedulerSlice