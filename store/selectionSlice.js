import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BookService from "../http/BookService";

const initialState = {
	selections: [],
	isLoading: false,
	isError: false
};

export const selectionSlice = createSlice({
	name: 'selection',
	initialState,
	reducers: {
		setSelections: (state, action) => {
			state.selections = action.payload
		},
	}
});

export const { setSelections } = selectionSlice.actions;

export default selectionSlice.reducer;
