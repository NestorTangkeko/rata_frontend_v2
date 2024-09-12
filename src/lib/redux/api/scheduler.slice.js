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
        }),
        createEmail: builder.mutation({
            query: (params) => ({
                url: '/v2/scheduler/email',
                method:'POST',
                body:{
                    data: params.data
                }
            }),
            invalidatesTags:['Pagination']
        }),
        updateEmail: builder.mutation({
            query: (params) => ({
                url:'/v2/scheduler/email',
                method: 'PUT',
                params:{
                    ...params.query
                },
                body:{
                    data: params.data
                }
            }),
            invalidatesTags:['Pagination']
        }),
        manualReportTrigger: builder.mutation({
            query:({report_name, ...data}) => ({
                url:'/v2/scheduler/'+report_name,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Pagination']
        }),
    })
    

})

export const {
    useManualTriggerMutation,
    useManualReportTriggerMutation,
    useUpdateSchedulerMutation,
    useCreateEmailMutation,
    useUpdateEmailMutation
} = schedulerSlice