import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	books: [],
	book: [],
	audioFlag: false,
};

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
	}
});

export const { setBooks, setBook, audioBook } = bookSlice.actions;

export default bookSlice.reducer;
