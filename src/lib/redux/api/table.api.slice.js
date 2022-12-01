import {apiSlice} from '../api.slice';

export const paginationSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.query({
            query: (params) => ({
                url:`${params.route}`,
                method:'GET',
                params:{
                    ...params.query
                }
            }),
            providesTags:['Pagination']
        })
    })
})


export const {
    useGetDataQuery
} = paginationSlice;