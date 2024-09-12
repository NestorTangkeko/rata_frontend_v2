import {apiSlice} from '../api.slice';
import {saveAs} from 'file-saver';

export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateReport: builder.mutation({
            query:({report_name, data}) => ({
                url:'/v2/reports/'+report_name,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Pagination']
        }),
        downloadReport: builder.mutation({
            query:({report,path,fileName}) => ({
                url: '/v2/reports/'+report,
                body: {
                    filePath: path,
                    fileName: fileName
                },
                method:'POST',
                responseHandler:(res) => res.blob(),
                cache: 'no-cache'
            }),
            transformResponse: (res,meta,arg) => {   
                saveAs(res,arg.fileName)
            }
        })
    })
})

export const {
    useUpdateReportMutation,
    useDownloadReportMutation,
} = reportApiSlice