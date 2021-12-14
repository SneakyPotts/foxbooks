import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


const initialState = {
    authFlag: false,
    status: 'idle',
    error: ''
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,

    reducers: {
        AuthAccount: (state, action) => {
            state.authFlag = action.payload
        }
    }
})

export const {AuthAccount} = headerSlice.actions


export default headerSlice.reducer
