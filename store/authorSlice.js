import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReaderService from '../http/ReaderService';

const initialState = {
	author: [],
	// isLoading: false,
	// isError: false
};

// export const getBookMarks = createAsyncThunk(
// 	'reader/getBookMarks',
// 	async id => {
// 		const response = await ReaderService.getBookMarks(id)
// 		return response.data
// 	}
// )

export const authorSlice = createSlice({
	name: 'author',
	initialState,
	reducers: {
		setAuthor: (state, action) => {
			state.author = action.payload
		},
	},
	// extraReducers: {
	// 	[getBookMarks.pending]: state => {
	// 		state.isLoading = true
	// 	},
	// 	[getBookMarks.fulfilled]: (state, action) => {
	// 		state.bookMarks = action.payload
	// 		state.isError = false
	// 		state.isLoading = false
	// 	},
	// 	[getBookMarks.rejected]: state => {
	// 		state.isError = true
	// 		state.isLoading = false
	// 	}
	// }
});

export const {
	setAuthor
} = authorSlice.actions;

export default authorSlice.reducer;
