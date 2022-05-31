import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReaderService from '../http/ReaderService';

const initialState = {
	book: [],
	bookChapters: [],
	bookMarks: [],
	settings: {
		isTwoColumns: false,
		fontSize: 0,
		screenBrightness: 5,
		fontName: 'Times New Roman',
		fieldSize: 2,
		rowHeight: 2,
		isCenterAlignment: false
	},
	quotes: [],
	quotesIsLoading: true
};

export const getBookMarks = createAsyncThunk(
	'reader/getBookMarks',
	async id => {
		const response = await ReaderService.getBookMarks(id)
		return response.data?.data
	}
)

export const addBookMark = createAsyncThunk(
	'reader/addBookMark',
	async data => {
		const response = await ReaderService.addBookMark(data)
		return response.data?.data
	}
)

export const deleteBookMark = createAsyncThunk(
	'reader/deleteBookMark',
	async id => {
		const response = await ReaderService.deleteBookMark(id)
		return id
	}
)

export const getSettings = createAsyncThunk(
	'reader/getSettings',
	async () => {
		const response = await ReaderService.getSettings()
		return response.data?.data
	}
)

export const getBookQuotes = createAsyncThunk(
	'reader/getBookQuotes',
	async data => {
		const response = await ReaderService.getBookQuotes(data)
		return response.data?.data
	}
)

export const addBookQuote = createAsyncThunk(
	'reader/addBookQuote',
	async data => {
		const response = await ReaderService.addBookQuote(data)
		return response.data?.data
	}
)

export const editBookQuote = createAsyncThunk(
	'reader/editBookQuote',
	async data => {
		const response = await ReaderService.editBookQuote(data)
		return response.data?.data
	}
)

export const deleteBookQuote = createAsyncThunk(
	'reader/deleteBookQuote',
	async id => {
		const response = await ReaderService.deleteBookQuote(id)
		return id
	}
)

export const readerSlice = createSlice({
	name: 'reader',
	initialState,
	reducers: {
		setReaderBook: (state, action) => {
			state.book = action.payload
		},
		setBookChapters: (state, action) => {
			state.bookChapters = action.payload
		},
		setSettings: (state, action) => {
			state.settings = action.payload
		},
		setBookMarks: (state, action) => {
			state.bookMarks = action.payload
		},
		setQuotes: (state, action) => {
			state.quotes = action.payload
		}
	},
	extraReducers: {
		[getBookMarks.fulfilled]: (state, action) => {
			state.bookMarks = action.payload
		},

		[addBookMark.fulfilled]: (state, action) => {
			state.bookMarks.push(action.payload)
		},

		[deleteBookMark.fulfilled]: (state, action) => {
			state.bookMarks = state.bookMarks.filter(i => i?.id !== action.payload)
		},

		[getSettings.fulfilled]: (state, action) => {
			const obj = {
				isTwoColumns: action.payload.is_two_columns,
				fontSize: action.payload.font_size,
				screenBrightness: action.payload.screen_brightness,
				fontName: action.payload.font_name,
				fieldSize: action.payload.field_size,
				rowHeight: action.payload.row_height,
				isCenterAlignment: action.payload.is_center_alignment
			}
			state.settings = obj
		},

		[getBookQuotes.fulfilled]: (state, action) => {
			state.quotes = action.payload
			state.quotesIsLoading = false
		},
		[getBookQuotes.rejected]: (state, action) => {
			state.quotesIsLoading = false
		},

		[addBookQuote.fulfilled]: (state, action) => {
			state.quotes.push(action.payload)
		},

		[editBookQuote.fulfilled]: (state, action) => {
			const quotes = state.quotes.map(i => {
				return i?.id == action.payload.id ?
					{
						...i,
						color: action.payload.color
					} :
					i
			})

			state.quotes = quotes
		},

		[deleteBookQuote.fulfilled]: (state, action) => {
			state.quotes = state.quotes.filter(i => i.id != action.payload)
		},
	}
});

export const {
	setReaderBook, 
	setBookChapters,
	setSettings,
	setBookMarks,
	setQuotes
} = readerSlice.actions;

export default readerSlice.reducer;
