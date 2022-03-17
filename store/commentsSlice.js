import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CommentsService from "../http/CommentsService";

const initialState = {
	bookComments: []
};

export const getComments = createAsyncThunk(
	'comments/addComment',
	async data => {
		const response = await CommentsService.getComments(data)
		return response.data.data
	}
)

export const addComment = createAsyncThunk(
	'comments/addComment',
	async data => {
		const response = await CommentsService.addComment(data)
		return {
			parentId: data?.parent_comment_id,
			data: response.data.data
		}
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
			const {parentId, data} = action.payload

			if(!parentId) {
				state.bookComments.data.push(data)
			}
		},
	}
});

export const { setBookComments } = comments.actions;

export default comments.reducer;
