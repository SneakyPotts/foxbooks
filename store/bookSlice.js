import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BookService from "../http/BookService";

const initialState = {
	books: [],
	book: [],
	audioFlag: false,
	isLoading: false,
	isError: false
};

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

export const { setBooks, setBook, audioBook } = bookSlice.actions;

export default bookSlice.reducer;
