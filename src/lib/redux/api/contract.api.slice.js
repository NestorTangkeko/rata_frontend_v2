import {apiSlice} from '../api.slice';

export const contractApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransportContract: builder.query({
            query:(params) => ({
                url:`v2/contract/contract-id/${params.contract_id}`,
                method:'GET',
            }),
            providesTags:['Contract']
        }),
        getExtendedRate: builder.query({
            query:({contract_id,...params}) => ({
                url: `v2/contract/contract-tariff/${contract_id}`,
                method:'GET',
                params: {
                    ...params
                }
            })
        }),
        extendRates: builder.mutation({
            query:({contract_id,...params}) => ({
                url: `v2/contract/contract-tariff/${contract_id}`,
                method:'PUT',
                body:{
                    ...params
                },
            }),
            invalidatesTags: ['Contract']
        }),
        updateTransportContract: builder.mutation({
            query:(params) => ({
                url: `v2/contract/contract-id/${params.contract_id}`,
                method:'PUT'
            }),
            invalidatesTags:['Contract']
        }),
        updateTransportContractTariff: builder.mutation({
            query:(params) => ({
                url: `v2/contract/contract-tariff`,
                method:'PUT',
                params:{
                    ...params.query
                }
            }),
            invalidatesTags:['Pagination']
        }),
        updateTransportContractValidity: builder.mutation({
            query:({contract_id,...data}) => ({
                url: 'v2/contract/validity/'+contract_id,
                method: 'POST',
                body: {
                    ...data
                }
            }),
            invalidatesTags: ['Contract'] 
        })
    })
})


export const {
    useGetTransportContractQuery,
    useUpdateTransportContractMutation,
    useUpdateTransportContractTariffMutation,
    useUpdateTransportContractValidityMutation,
    useLazyGetExtendedRateQuery,
    useExtendRatesMutation
} = contractApiSlice;