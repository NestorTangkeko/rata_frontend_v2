import {apiSlice} from '../api.slice';

export const tariffApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransportTariff: builder.query({
            query:(params) => ({
                url:`v2/tariff/tariff-id/${params.tariff_id}`,
                method:'GET',
            }),
            transformResponse: (res,meta,arg) =>  {
                console.log(res)
                const {approved_by,approved_date,createdAt,updatedAt,created_by,modified_by,...data} = res
                return data
            },
            providesTags:['Tariff']
        }),
        createTariffIC: builder.mutation({
            query:(data) => ({
                url:`/v2/tariff/tariff-ic`,
                method:'POST',
                body:{
                    ...data
                }
            }),
            invalidatesTags:['Pagination']
        }),
        updateTransportIC: builder.mutation({
            query:(data) => ({
                url:'/v2/tariff/tariff-ic',
                method:'PUT',
                params:{
                    ...data.query
                },
                body:{
                    ...data.body
                }
            }),
            invalidatesTags:['Pagination']
        }),
        createTariff: builder.mutation({
            query:(data) => ({
                url:`/contract-tariff/tariff`,
                method:'POST',
                body:{
                    data
                }
            }),
            invalidatesTags:['Pagination','Tariff']
        }),
        updateTariff: builder.mutation({
            query:(params) => ({
                url:`v2/tariff/tariff-id/${params.tariff_id}`,
                method:'PUT',
                body:{
                    ...params.body
                }
            }),
            invalidatesTags:['Tariff']
        }),
        approveTariff: builder.mutation({
            query:(params) => ({
                url:`v2/tariff/tariff-id/${params.tariff_id}`,
                method:'POST',
                body:{
                    ...params.body
                }
            }),
            invalidatesTags:['Tariff']
        }),
        bulkApproveTariff: builder.mutation({
            query:(data) => ({
                url: 'v2/tariff/status',
                method:'PUT',
                body:{
                    data
                }
            }),
            invalidatesTags:['Pagination']
        })
    })
})

export const {
    useGetTransportTariffQuery,
    useCreateTariffICMutation,
    useCreateTariffMutation,
    useUpdateTariffMutation,
    useUpdateTransportICMutation,
    useBulkApproveTariffMutation,
    useApproveTariffMutation
} = tariffApiSlice;