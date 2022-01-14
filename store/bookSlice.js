import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	books: [],
	audioFlag: false,
};

export const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setBooks: (state, action) => {
			state.books = action.payload
		},
		audioBook: (state, action) => {
			state.audioFlag = action.payload;
		},
	}
});

export const { setBooks, audioBook } = bookSlice.actions;

export default bookSlice.reducer;
