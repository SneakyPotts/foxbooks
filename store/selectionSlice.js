import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import SelectionService from "../http/SelectionService";

const initialState = {
	selections: {},
	selectionById: {},
	userCompilations: {}
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

export const editCompilation = createAsyncThunk(
	'selection/editCompilation',
	async data => {
		const response = await SelectionService.editCompilation(data)
		return response.data?.data
	}
)

export const getUserCompilations = createAsyncThunk(
	'selection/getUserCompilations',
	async (data) => {
		const response = await SelectionService.getUserCompilations(data)
		return response.data.data
	}
)

export const createCompilation = createAsyncThunk(
	'selection/createCompilation',
	async (data) => {
		const response = await SelectionService.createCompilation(data)
		return response.data?.data
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
		[editCompilation.fulfilled]: (state, action) => {
			state.selectionById.compilation = {
				...state.selectionById.compilation,
				...action.payload
			}
		},
		[getUserCompilations.fulfilled]: (state, action) => {
			state.userCompilations = action.payload
		},
		[createCompilation.fulfilled]: (state, action) => {
			state.userCompilations = {
				...state.userCompilations,
				...action.payload
			}
		}
	}
});

export const {
	setSelections,
	setSelectionById,
	deleteBookFromSelection,
	addBookToSelection
} = selectionSlice.actions;

export default selectionSlice.reducer;
