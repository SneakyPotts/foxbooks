import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthorService from '../http/AuthorService';

const initialState = {
	author: [],
	isFavorite: false
	// isLoading: false,
	// isError: false
};

export const addAuthorToFavorite = createAsyncThunk(
	'author/addAuthorToFavorite',
	async id => {
		const response = await AuthorService.addAuthorToFavorite(id)
		return response.data
	}
)

export const deleteAuthorFromFavorite = createAsyncThunk(
	'author/deleteAuthorFromFavorite',
	async id => {
		const response = await AuthorService.deleteAuthorFromFavorite(id)
		return response.data
	}
)

export const authorSlice = createSlice({
	name: 'author',
	initialState,
	reducers: {
		setAuthor: (state, action) => {
			state.author = action.payload
		},
	},
	extraReducers: {
		[addAuthorToFavorite.pending]: state => {
			// state.isLoading = true
		},
		[addAuthorToFavorite.fulfilled]: (state, action) => {
			state.isFavorite = true
			// state.isError = false
			// state.isLoading = false
		},
		[addAuthorToFavorite.rejected]: state => {
			// state.isError = true
			// state.isLoading = false
		},


		[deleteAuthorFromFavorite.pending]: state => {
			// state.isLoading = true
		},
		[deleteAuthorFromFavorite.fulfilled]: (state, action) => {
			state.isFavorite = false
			// state.isError = false
			// state.isLoading = false
		},
		[deleteAuthorFromFavorite.rejected]: state => {
			// state.isError = true
			// state.isLoading = false
		}
	}
});

export const {
	setAuthor
} = authorSlice.actions;

export default authorSlice.reducer;
