import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    isTwoColumns: false,
    fontSize: 0,
    screenBrightness: '5',
    fontName: 'Times New Roman',
    fieldSize: '2',
    rowHeight: '2',
    isCenterAlignment: false,
  },
  isLoading: false,
  isError: false,
};

export const setBookStatus = createAsyncThunk(
  'book/setBookStatus',
  async data => {
    const response = await BookService.setBookStatus(data);
    return response.data;
  }
);

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
  extraReducers: {
    [setBookStatus.pending]: state => {
      state.isLoading = true;
    },
    [setBookStatus.fulfilled]: state => {
      state.isError = false;
      state.isLoading = false;
    },
    [setBookStatus.rejected]: state => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const { setSettings } = readerSlice.actions;

export default readerSlice.reducer;
