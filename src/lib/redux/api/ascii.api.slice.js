import {apiSlice} from '../api.slice';
import {saveAs} from 'file-saver';

export const asciiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
                    ...params.query
                },
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse:(res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                console.log(res,fileName)
                saveAs(res,fileName)
            },
            
        }) 
    })
})

export const {
    useConfirmWarehouseMutation,
    useConfirmTransportMutation
} = asciiSlice
