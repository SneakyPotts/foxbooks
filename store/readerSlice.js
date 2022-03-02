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
	quotes: [
		// {
		// 	startKey:"4",
		// 	startTextIndex:0,
		// 	endKey:"6",
		// 	endTextIndex:0,
		// 	startOffset:529,
		// 	endOffset:85,
		// 	text:"рат, ибо любил он братьев своих и отца своего и не хотел раздор вносить. Ответил сыновьям своим царь: «Вижу, мудры вы стали, ибо разные вы, как ветер небе",
		// 	id:1,
		// 	color:"#FED3CA",
		// }
	],
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

export const addBookMark = createAsyncThunk(
	'reader/getBookMarks',
	async data => {
		const response = await ReaderService.addBookMark(data)
		console.log('response', response.data)
		return response.data
	}
)

export const readerSlice = createSlice({
	name: 'reader',
	initialState,
	reducers: {
		addQuotes: (state, action) => {
			state.quotes.push(action.payload)
		},
		editQuotes: (state, action) => {
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
		deleteQuotes: (state, action) => {
			state.quotes = state.quotes.filter(i => i.id != action.payload)
		},
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
	addQuotes,
	editQuotes,
	deleteQuotes,
	setReaderBook, 
	setBookChapters,
	setSettings 
} = readerSlice.actions;

export default readerSlice.reducer;
