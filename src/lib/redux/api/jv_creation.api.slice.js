import { apiSlice } from '../api.slice';
import {saveAs} from 'file-saver';

export const jvCreationSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        generateJV: builder.mutation({
            query: (data) => ({
                url:'/v2/jv-creation/generate',
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
        })
    })
})

export const {
    useGenerateJVMutation
} = jvCreationSlice