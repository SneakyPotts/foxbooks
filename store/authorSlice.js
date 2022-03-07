import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthorService from '../http/AuthorService';

const initialState = {
	author: [],
	authorsByLetter: {},
	isFavorite: false,
	series: {},
};

export const getAuthorsByLetter = createAsyncThunk(
	'author/getAuthorsByLetter',
	async ({query, letter, page}) => {
		const response = await AuthorService.getAuthorsByLetter({letter, page})
		return {
			...response.data.data,
			query
		}
	}
)

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
		setSeries: (state, action) => {
			state.series = action.payload
		}
	},
	extraReducers: {
		[getAuthorsByLetter.pending]: state => {
			// state.isLoading = true
		},
		[getAuthorsByLetter.fulfilled]: (state, action) => {
			if(!state.authorsByLetter?.query || state.authorsByLetter?.query !== action.payload.query) {
				state.authorsByLetter = action.payload
			} else {
				state.authorsByLetter.data = [...state.authorsByLetter.data, ...action.payload.data]
			}
			// state.isError = false
			// state.isLoading = false
		},
		[getAuthorsByLetter.rejected]: state => {
			// state.isError = true
			// state.isLoading = false
		},


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
	setAuthor,
	setSeries
} = authorSlice.actions;

export default authorSlice.reducer;
