import {createSlice} from '@reduxjs/toolkit';

const transmittalSlice = createSlice({
    name:'transmittal',
    initialState:{
        draft_bill_no:null,
        header_id: null,
        header:{
            header_id:null,
            transmitted_by: null,
            transmitted_date:null
        }
    },
    reducers:{
        setDraftBill: (state,action) => {
            state.draft_bill_no = action.payload;
        },
        setHeader: (state,action) => {
            state.header = {
                ...state.header,
                ...action.payload
            };
        }
    }
})

export default transmittalSlice.reducer;
export const {setDraftBill,setHeader} = transmittalSlice.actions;
export const getTransmittalState = (state) => state.transmittal
