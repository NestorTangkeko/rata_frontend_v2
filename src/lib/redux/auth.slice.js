import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState: {
        token:null
    },
    reducers : {
        setLogIn: (state,action) => {
            state.token = action.payload
        },
        setLogOut: (state,action) => {
            state.token = null
        }
    }
})

export const {setLogIn,setLogOut} = authSlice.actions;
export const selectToken = state => state.auth.token;
export default authSlice.reducer;

