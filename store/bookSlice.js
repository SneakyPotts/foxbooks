import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BookService from "../http/BookService";

const initialState = {
	categories: [],
	audioCategories: [],
	dailyHotUpdates: [],
	books: [],
	book: [],
	booksByAuthor: [],
	audioBooksByAuthor: [],
	audioFlag: false,
	isLoading: false,
	isError: false
};

export const getBooksByAuthor = createAsyncThunk(
	'book/getBooksByAuthor',
	async id => {
		const response = await BookService.getBooksByAuthor(id)
		return response.data
	}
)

export const getAudioBooksByAuthor = createAsyncThunk(
	'book/getAudioBooksByAuthor',
	async id => {
		const response = await BookService.getAudioBooksByAuthor(id)
		return response.data
	}
)

export const setBookStatus = createAsyncThunk(
	'book/setBookStatus',
	async data => {
		const response = await BookService.setBookStatus(data)
		return response.data
	}
)

export const deleteBookFromFavorite = createAsyncThunk(
	'book/deleteBookFromFavorite',
	async data => {
		const response = await BookService.deleteBookFromFavorite(data)
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
		setAudioCategories: (state, action) => {
			state.audioCategories = action.payload
		},
		setDailyHotUpdates: (state, action) => {
			state.dailyHotUpdates = action.payload
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
		commentBook:(state, action) => {
			console.log(action.payload)
			state.book?.comments.unshift(action.payload);
		}
	},
	extraReducers: {
		[getBooksByAuthor.pending]: state => {
			state.isLoading = true
		},
		[getBooksByAuthor.fulfilled]: (state, action) => {
			state.booksByAuthor = action.payload?.data?.books
			state.isError = false
			state.isLoading = false
		},
		[getBooksByAuthor.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[getAudioBooksByAuthor.pending]: state => {
			state.isLoading = true
		},
		[getAudioBooksByAuthor.fulfilled]: (state, action) => {
			state.audioBooksByAuthor = action.payload?.data?.audio_books
			state.isError = false
			state.isLoading = false
		},
		[getAudioBooksByAuthor.rejected]: state => {
			state.isError = true
			state.isLoading = false
		}
	}
});

export const {
	setCategories,
	setAudioCategories,
	setDailyHotUpdates,
	setBooks,
	setBook,
	audioBook,
	commentBook
} = bookSlice.actions;

export default bookSlice.reducer;
