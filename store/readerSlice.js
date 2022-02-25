import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReaderService from '../http/ReaderService';

const initialState = {
	book: [],
	bookChapters: [],
	marks: [],
	settings: {
		isTwoColumns: false,
		fontSize: 0,
		screenBrightness: '2',
		fontName: 'Times New Roman',
		fieldSize: '2',
		rowHeight: '2',
		isCenterAlignment: false
	},
	isLoading: false,
	isError: false
};

export const getBookMarks = createAsyncThunk(
	'reader/getBookMarks',
	async id => {
		const response = await ReaderService.getBookMarks(id)
		return response.data
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
		}
	},
	extraReducers: {
		[getBookMarks.pending]: state => {
			state.isLoading = true
		},
		[getBookMarks.fulfilled]: (state, action) => {
			state.bookMarks = action.payload
			state.isError = false
			state.isLoading = false
		},
		[getBookMarks.rejected]: state => {
			state.isError = true
			state.isLoading = false
		}
	}
});

export const {
	setReaderBook, 
	setBookChapters,
	setSettings 
} = readerSlice.actions;

export default readerSlice.reducer;
