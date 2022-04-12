import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
	selections: {},
	selectionById: {},
};

export const selectionSlice = createSlice({
	name: 'selection',
	initialState,
	reducers: {
		setSelections: (state, action) => {
			state.selections = action.payload
		},
		setSelectionById: (state, action) => {
			state.selectionById = action.payload
		},
		deleteBookFromSelection: (state, action) => {
			state.selectionById.compilation.generalBooksCount -= 1
			state.selectionById.books.data = state.selectionById.books.data.filter(i =>
				i.compilationable_id !== action.payload
			)
		},
	}
});

export const {
	setSelections,
	setSelectionById,
	deleteBookFromSelection
} = selectionSlice.actions;

export default selectionSlice.reducer;
