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
        increment: (state, action) => {
            state.number += action.payload
        }
    }
})

export const {increment} = testSlice.actions


export default headerSlice.reducer
