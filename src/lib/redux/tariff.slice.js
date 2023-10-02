import {createSlice} from '@reduxjs/toolkit';

const tariffSlice = createSlice({
    name:'tariff',
    initialState:{
        selectedRows: []
    },
    reducers:{
        setSelectedRows: (state,action) => ({
            ...state,
            selectedRows: action.payload
        })
    }
})

export default tariffSlice.reducer;
export const {setSelectedRows} = tariffSlice.actions;
export const getTariffState = (state) => state.tariff;