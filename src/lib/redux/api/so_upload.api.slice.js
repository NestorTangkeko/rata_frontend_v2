import { apiSlice } from '../api.slice';
import {saveAs} from 'file-saver';

export const soUploadSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSOTemplate: builder.mutation({
            query: (params) => ({
                url: 'v2/so-upload/template',
                method:'POST',
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse: (res, meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            }
        }),
        uploadSO: builder.mutation({
            query: (data) => ({
                url:'v2/so-upload',
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
        getSoHeader: builder.query({
            query: (id) => ({
                url:'v2/so-upload/header/'+id,
                method:'GET'
            })
        }),
        exportSo: builder.mutation({
            query: (params) => ({
                url: '/v2/so-upload/export',
                method: 'POST',
                params: {
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
    useGetSOTemplateMutation,
    useUploadSOMutation,
    useGetSoHeaderQuery,
    useExportSoMutation
} = soUploadSlice