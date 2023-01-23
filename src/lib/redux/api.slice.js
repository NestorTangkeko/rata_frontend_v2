import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {isRejectedWithValue} from '@reduxjs/toolkit';

const baseQuery = fetchBaseQuery({
    baseUrl:process.env.REACT_APP_API_DEV,
    //credentials: process.env.NODE_ENV === 'development' ? undefined : 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set('x-access-token',token)
        }
        return headers
    }
})

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: baseQuery,
    tagTypes:['Pagination','Tariff','Contract','Leak'],
    endpoints: builder => ({})
})

//handles the api result 
export const errorHandler = (api) => (next) => (action) => {
    if(isRejectedWithValue(action)){
        console.log(action.payload)
    }

    return next(action)
}


