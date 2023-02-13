import {apiSlice} from '../api.slice';
import {saveAs} from 'file-saver';

export const dataExportSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
        exportData:builder.mutation({
            query:(params) => ({
                url: `/v2/data-export/${params.route}`,
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
            },
        })
    })
})

export const {useExportDataMutation} = dataExportSlice