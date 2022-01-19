import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  innerWidthWindow: '',
  error: '',
  showMenu: false,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,

  reducers: {
    ShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setBreakPoint: (state, action) => {
      state.innerWidthWindow = action.payload;
    },
  },
});

export const { ShowMenu, ShowHeader, setBreakPoint } = headerSlice.actions;

export default headerSlice.reducer;
