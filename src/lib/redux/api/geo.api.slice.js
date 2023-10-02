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
        }),
        getGeography: builder.query({
            query:(params) => ({
                url:'/v2/select/'+params.type,
                method:'GET',
                params:{
                    ...params.query
                }
            })
        })
    })
})

export const {
    useGetGeoQuery,
    useGetGeographyQuery
} = geoSlice