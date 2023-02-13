import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState: {
        token:null,
        access:[]
    },
    reducers : {
        setLogIn: (state,action) => {
            state.token = action.payload
        },
        setLogOut: (state,action) => {
            state.token = null
        },
        setAccess: (state,action) => {
            state.access = action.payload
        }
    }
})

export const {setLogIn,setLogOut,setAccess} = authSlice.actions;
export const selectToken = state => state.auth.token;
export const selectAcess = state => state.auth.access;
export default authSlice.reducer;

