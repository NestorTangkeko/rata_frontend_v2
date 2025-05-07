import { createSlice } from '@reduxjs/toolkit';

const jvReversalSlice = createSlice({
    name: 'jvReversal',
    initialState: {
        selectedRows: []
    },
    reducers: {
        setJVRSelectedRows: (state, action) => ({
            ...state,
            selectedRows: action.payload
        })
    }
});

export default jvReversalSlice.reducer;
export const { setJVRSelectedRows } = jvReversalSlice.actions;
export const getJVReversalState = (state) => state.jvReversal;