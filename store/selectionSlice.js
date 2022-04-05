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
	}
});

export const { setSelections, setSelectionById } = selectionSlice.actions;

export default selectionSlice.reducer;
