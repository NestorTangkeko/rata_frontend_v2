import {apiSlice} from '../api.slice';

export const geoSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGeo: builder.query({
            query:(params) => ({
                url: `/select/geography`,
                method:'GET',
                params:{
                    ...params.query
                }
            })
        })
    })
})

export const {
    useGetGeoQuery
} = geoSlice