import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReviewService from "../http/ReviewService";

const initialState = {
	reviewTypes: [],
	reviews: []
};

export const getReviewTypes = createAsyncThunk(
	'review/getReviewTypes',
	async () => {
		const response = await ReviewService.getReviewTypes()
		return response.data.data
	}
)

export const addReview = createAsyncThunk(
	'review/addReview',
	async data => {
		const response = await ReviewService.addReview(data)
		return response.data.data
	}
)

export const review = createSlice({
	name: 'review',
	initialState,
	reducers: {
		setReviews: (state, action) => {
			state.reviews = action.payload
		},
	},
	extraReducers: {
		[getReviewTypes.fulfilled]: (state, action) => {
			state.reviewTypes = action.payload
		},

		[addReview.fulfilled]: (state, action) => {
			state.reviews.push(action.payload)
		},
	}
});

export const { setReviews } = review.actions;

export default review.reducer;
