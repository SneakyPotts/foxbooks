import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReviewService from "../http/ReviewService";

const initialState = {
  reviewTypes: [],
  reviews: [],
  error: ''
};

export const getCurrentReviews = createAsyncThunk(
  'review/getCurrentReviews',
  async (data) => {
    const response = await ReviewService.getCurrentReviews(data)
    return response.data.data
  }
)

export const getReviewTypes = createAsyncThunk(
  'review/getReviewTypes',
  async () => {
    const response = await ReviewService.getReviewTypes()
    return response.data.data
  }
)

export const addReview = createAsyncThunk(
  'review/addReview',
  async (data, {rejectWithValue}) => {
    try {
      const response = await ReviewService.addReview(data)
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response.data.errors.id[0])
    }
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
      state.reviews.data.push(action.payload)
    },
    [addReview.rejected]: (state, action) => {
      state.error = action.payload
    },

    [getCurrentReviews.fulfilled]: (state, action) => {
      state.reviews = action.payload
    }
  }
});

export const {setReviews} = review.actions;

export default review.reducer;
