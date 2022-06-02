import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import SelectionService from "../http/SelectionService";
import {search} from "./searchSlice";

const initialState = {
	selections: {},
	selectionById: {},
};

export const addCompilationToFavorite = createAsyncThunk(
	'selection/addCompilationToFavorite',
	async data => {
		const response = await SelectionService.addCompilationToFavorite(data)
		return data
	}
)

export const deleteCompilationFromFavorite = createAsyncThunk(
	'selection/deleteCompilationFromFavorite',
	async data => {
		const response = await SelectionService.deleteCompilationFromFavorite(data)
		return data
	}
)

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
		addBookToSelection: (state, action) => {
			state.selectionById.compilation.generalBooksCount += 1
			state.selectionById.books.data.push(action.payload)
		},
	},
	extraReducers: {
		[addCompilationToFavorite.fulfilled]: (state, action) => {
			state.selections.data = state.selections?.data?.map(i =>
				i?.id === action.payload ?
					{
						...i,
						in_favorite: true
					} :
					i
			)
		},
		[deleteCompilationFromFavorite.fulfilled]: (state, action) => {
			state.selections.data = state.selections?.data?.map(i =>
				i?.id === action.payload ?
					{
						...i,
						in_favorite: false
					} :
					i
			)
		},
	}
});

export const {
	setSelections,
	setSelectionById,
	deleteBookFromSelection,
	addBookToSelection
} = selectionSlice.actions;

export default selectionSlice.reducer;
