import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CommentsService from "../http/CommentsService";

const initialState = {
	bookComments: []
};

export const addComment = createAsyncThunk(
	'comments/addComment',
	async data => {
		const response = await CommentsService.addComment(data)
		return response.data.data
	}
)

export const comments = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		setBookComments: (state, action) => {
			state.bookComments = action.payload
		},
	},
	extraReducers: {
		[addComment.fulfilled]: (state, action) => {
			state.bookComments.data.unshift(action.payload)
		},
	}
});

export const { setBookComments } = comments.actions;

export default comments.reducer;
