import { createSlice } from '@reduxjs/toolkit';

const jvCreationSlice = createSlice({
    name: 'jvCreation',
    initialState: {
        selectedRows: []
    },
    reducers: {
        setJVCSelectedRows: (state, action) => ({
            ...state,
            selectedRows: action.payload
        })
    }
});

export default jvCreationSlice.reducer;
export const { setJVCSelectedRows } = jvCreationSlice.actions;
export const getJVCreationState = (state) => state.jvCreation;