import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReviewService from "../http/ReviewService";

const initialState = {
	reviewTypes: [],
	reviews: [],
	isLoading: false,
	isError: false
};

export const getReviewTypes = createAsyncThunk(
	'review/getReviewTypes',
	async () => {
		const response = await ReviewService.getReviewTypes()
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
		[getReviewTypes.pending]: state => {
			state.isLoading = true
		},
		[getReviewTypes.fulfilled]: (state, action) => {
			state.reviewTypes = action.payload
			state.isError = false
			state.isLoading = false
		},
		[getReviewTypes.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},
	}
});

export const { setReviews } = review.actions;

export default review.reducer;
