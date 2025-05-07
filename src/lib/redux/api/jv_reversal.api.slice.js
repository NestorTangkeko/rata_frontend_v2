import { apiSlice } from '../api.slice';
import {saveAs} from 'file-saver';

export const jvReversalSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        reverseJV: builder.mutation({
            query: (data) => ({
                url:'/v2/jv-reversal/reverse',
                method: 'POST',
                body: data,
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            invalidatesTags:['Pagination'],
            transformResponse: (res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        }),
        exportJVC: builder.mutation({
            query: (jv_ref) => ({
                url:`/v2/jv-reversal/export/jvc/${jv_ref}`,
                method: 'GET',
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse: (res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        }),
        exportJVR: builder.mutation({
            query: (jv_ref) => ({
                url:`/v2/jv-reversal/export/jvr/${jv_ref}`,
                method: 'GET',
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse: (res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        })
    })
})

export const {
    useReverseJVMutation,
    useExportJVCMutation,
    useExportJVRMutation
} = jvReversalSlice