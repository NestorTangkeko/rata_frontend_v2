import {createSlice} from '@reduxjs/toolkit';

const geoSlice = createSlice({
    name:'geo',
    initialState:{
        from_geo_type:null,
        to_geo_type:null
    },
    reducers : {
        setGeoType: (state,action) => {
            const {name,value} = action.payload;
            state[name] = value
        }
    }
})

export default geoSlice.reducer;
export const {setGeoType} = geoSlice.actions;
