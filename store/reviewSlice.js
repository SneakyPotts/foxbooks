import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ReviewService from "../http/ReviewService";

const initialState = {
  reviewTypes: [],
  userReviews: [],
  error: ''
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
  async (data, {rejectWithValue}) => {
    try {
      const response = await ReviewService.addReview(data)
      return response.data.data
    } catch (err) {
      return rejectWithValue(err.response.data.errors.id[0])
    }
  }
)

export const getUserReview = createAsyncThunk(
  'review/getUserReview',
  async (query) => {
    const response = await ReviewService.getUserReview(query)
    return response.data.data;
  }
)

export const deleteUserReview = createAsyncThunk(
  'review/deleteUserReview',
  async (query) => {
    await ReviewService.deleteUserReview(query)
    return query.id;
  }
)

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async (query) => {
    const response = await ReviewService.updateReview(query)
    return response.data.data;
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

    [getUserReview.fulfilled]: (state, action) => {
      state.userReviews = action.payload
    },

    [updateReview.fulfilled]: (state, action) => {
      state.userReviews = state.userReviews.map((item) => {
        const {content, title} = action.payload;

        return item.id === action.payload.id
                ? {...item, content, title}
                : item
      })
    },

    [deleteUserReview.fulfilled]: (state, action) => {
      state.userReviews = state.userReviews.filter((item) => {
        return item.book
                ? item.book.id !== action.payload
                : item.audio_book.id !== action.payload
      })
    }
  }
});

export const {setReviews} = review.actions;

export default review.reducer;
