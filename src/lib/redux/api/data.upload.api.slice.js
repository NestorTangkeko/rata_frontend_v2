import { apiSlice } from "../api.slice";
import {saveAs} from 'file-saver';

export const dataUploadSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTemplate: builder.mutation({
            query:(params) => ({
                url:`/v2/data-upload/template`,
                method:'POST',
                body:{
                    type:params.type
                },
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse:(res,meta) => {
                const fileName = meta.response.headers.get('Content-disposition')
                saveAs(res,fileName)
            },
        }),
        uploadData: builder.mutation({
            query: (params) => ({
                url:`/v2/data-upload/${params.route}`,
                method:'POST',
                body:{
                    ...params.body
                }
            })
        })
    })
})  




export const {
    useUploadDataMutation,
    useGetTemplateMutation
} = dataUploadSlice