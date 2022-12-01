import {apiSlice} from '../api.slice';

export const selectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSelectOptions: builder.query({
            query:(params) => ({
                url: `/select/${params.route}`,
                method:'GET',
                params:{
                    ...params.query
                }
            })
        })
    })
})

export const {
    useGetSelectOptionsQuery
} = selectApiSlice