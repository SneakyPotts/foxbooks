import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BookService from "../http/BookService";

const initialState = {
	categories: [],
	audioCategories: [],
	dailyHotUpdates: [],
	books: [],
	booksByLetter: {},
	book: {},
	booksByAuthor: [],
	audioBooksByAuthor: [],
	audioFlag: false,
};

export const getBooksByAuthor = createAsyncThunk(
	'book/getBooksByAuthor',
	async id => {
		const response = await BookService.getBooksByAuthor(id)
		return response.data
	}
)

export const getBooksByLetter = createAsyncThunk(
	'book/getBooksByLetter',
	async ({query, letter, page}) => {
		const response = await BookService.getBooksByLetter({letter, page})
		return {
			...response.data.data,
			query
		}
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
		return response.data.data[0]
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
		}
	},
	extraReducers: {
		[getBooksByAuthor.fulfilled]: (state, action) => {
			state.booksByAuthor = action.payload?.data?.books
		},


		[getBooksByLetter.fulfilled]: (state, action) => {
			if(!state.booksByLetter?.query || state.booksByLetter?.query !== action.payload.query) {
				state.booksByLetter = action.payload
			} else {
				state.booksByLetter.data = [...state.booksByLetter.data, ...action.payload.data]
			}
		},


		[getAudioBooksByAuthor.fulfilled]: (state, action) => {
			state.audioBooksByAuthor = action.payload?.data?.audio_books
		},


		[setBookRating.fulfilled]: (state, action) => {
			state.book.rates_avg = action.payload?.rate_avg
			state.book.rates_count = action.payload?.rates_count
		}
	}
});

export const {
	setCategories,
	setAudioCategories,
	setDailyHotUpdates,
	setBooks,
	setBook,
	audioBook
} = bookSlice.actions;

export default bookSlice.reducer;
