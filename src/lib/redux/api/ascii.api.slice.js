import {apiSlice} from '../api.slice';
import {saveAs} from 'file-saver';

export const asciiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDraftBill: builder.query({
            query: (draft_bill) => ({
                url:'/v2/ascii/draft-bill/'+draft_bill,
                method:'GET',
            }),
            providesTags:['Transmittal']
        }),
        confirmWarehouse: builder.mutation({
            query: (params) => ({
                url:`/v2/ascii/warehouse`,
                method: 'POST',
                params:{
                    ...params.query
                },
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse:(res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            },
        }),
        confirmTransport: builder.mutation({
            query: (params) => ({
                url:`/v2/ascii/transport`,
                method: 'POST',
                params:{
                    ...params
                },
                responseHandler:(res) => res.blob(),
                cache: 'no-cache',
            }),
            transformResponse:(res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                console.log(res,fileName)
                saveAs(res,fileName)
            },
            invalidatesTags:['Transmittal']
            
        }) 
    })
})

export const {
    useConfirmWarehouseMutation,
    useConfirmTransportMutation,
    useGetDraftBillQuery
} = asciiSlice
