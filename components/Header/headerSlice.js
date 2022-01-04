import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authFlag: false,
  status: 'idle',
  error: '',
  showMenu: false,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,

  reducers: {
    AuthAccount: (state, action) => {
      state.authFlag = action.payload;
    },
    ShowMenu: (state, action) => {
      state.showMenu = action.payload;
    }
  },
});

export const { AuthAccount, ShowMenu, ShowHeader } = headerSlice.actions;

export default headerSlice.reducer;
