import { apiSlice } from '../api.slice';
import {saveAs} from 'file-saver';

export const crUploadSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCRTemplate: builder.mutation({
            query: (params) => ({
                url: `v2/cr-upload/template`,
                method: 'POST',
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse: (res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        }),
        uploadCR: builder.mutation({
            query: (data) => ({
                url: 'v2/cr-upload',
                method:'POST',
                body:data,
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            invalidatesTags:['Pagination'],
            transformResponse: (res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        }),
        getCrHeader: builder.query({
            query: (id) => ({
                url: 'v2/cr-upload/header/'+id,
                method:'GET'
            })
        }),
        exportCr: builder.mutation({
            query:(params) => ({
                url: `/v2/cr-upload/export`,
                method:'POST',
                params:{
                    ...params.query
                },
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse:(res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        })
       
    })
})

export const {
    useGetCRTemplateMutation,
    useUploadCRMutation,
    useGetCrHeaderQuery,
    useExportCrMutation
} = crUploadSlice