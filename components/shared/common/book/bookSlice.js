import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioFlag: false,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,

  reducers: {
    AudioBook: (state, action) => {
      state.audioFlag = action.payload;
    },
  },
});

export const { AudioBook } = bookSlice.actions;

export default bookSlice.reducer;
