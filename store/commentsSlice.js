import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CommentsService from "../http/CommentsService";

const initialState = {
	bookComments: [],
	initRender: true
};

export const getComments = createAsyncThunk(
	'comments/getComments',
	async (data = {}) => {
		const response = await CommentsService.getComments(data)
		return response.data.data
	}
)

export const addComment = createAsyncThunk(
	'comments/addComment',
	async (data ={}) => {
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
			state.initRender = true
		},

		[addComment.fulfilled]: (state, action) => {
			const {parentId, data} = action.payload

			state.initRender = false

			if(!parentId) {
				// state.bookComments.data.length === 3 && state.bookComments.data.pop()
				state.bookComments.data.unshift(data)
			}
		},
	}
});

export const {  } = comments.actions;

export default comments.reducer;
