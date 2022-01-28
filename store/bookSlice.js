import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BookService from "../http/BookService";

const initialState = {
	categories: [],
	books: [],
	book: [],
	audioFlag: false,
	isLoading: false,
	isError: false
};

export const setBookStatus = createAsyncThunk(
	'book/setBookStatus',
	async data => {
		const response = await BookService.setBookStatus(data)
		return response.data
	}
)

export const setBookRating = createAsyncThunk(
	'book/setBookRating',
	async data => {
		const response = await BookService.setBookRating(data)
		return response.data
	}
)

export const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		},
		setBooks: (state, action) => {
			state.books = action.payload
		},
		setBook: (state, action) => {
			state.book = action.payload
		},
		audioBook: (state, action) => {
			state.audioFlag = action.payload;
		},
	},
	extraReducers: {
		[setBookStatus.pending]: state => {
			state.isLoading = true
		},
		[setBookStatus.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[setBookStatus.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[setBookRating.pending]: state => {
			state.isLoading = true
		},
		[setBookRating.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[setBookRating.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},
	}
});

export const { setCategories, setBooks, setBook, audioBook } = bookSlice.actions;

export default bookSlice.reducer;
