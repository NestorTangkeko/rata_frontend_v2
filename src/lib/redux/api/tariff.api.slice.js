import {apiSlice} from '../api.slice';

export const tariffApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransportTariff: builder.query({
            query:(params) => ({
                url:`/contract-tariff/tariff/${params.tariff_id}`,
                method:'GET',
                params:{
                    ...params.query
                }
            }),
            transformResponse: (res,meta,arg) =>  {
                const {approved_by,approved_date,createdAt,updatedAt,created_by,modified_by,...data} = res.data
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
            query:(data) => ({
                url:`/contract-tariff/tariff/${data.tariff_id}`,
                method:'PUT',
                body:{
                    data
                }
            }),
            invalidatesTags:['Tariff']
        }),
        
    })
})

export const {
    useGetTransportTariffQuery,
    useCreateTariffICMutation,
    useCreateTariffMutation,
    useUpdateTariffMutation,
    useUpdateTransportICMutation
} = tariffApiSlice;