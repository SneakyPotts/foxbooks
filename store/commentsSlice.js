import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CommentsService from "../http/CommentsService";

const initialState = {
	bookComments: []
};

export const getComments = createAsyncThunk(
	'comments/getComments',
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

	},
	extraReducers: {
		[getComments.fulfilled]: (state, action) => {
			state.bookComments = action.payload
		},

		[addComment.fulfilled]: (state, action) => {
			const {parentId, data} = action.payload

			if(!parentId) {
				state.bookComments.data.push(data)
			}
		},
	}
});

export const {  } = comments.actions;

export default comments.reducer;
