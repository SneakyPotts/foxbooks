import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  innerWidthWindow: '',
  showMenuFlag: false,
  playerIsVisible: false,
  headerIsVisible: true,
  authPopupIsVisible: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showMenu: (state, action) => {
      state.showMenuFlag = action.payload;
    },
    setBreakPoint: (state, action) => {
      state.innerWidthWindow = action.payload;
    },
    setPlayerVisibility: (state, action) => {
      state.playerIsVisible = action.payload;
    },
    setHeaderVisibility: (state, action) => {
      state.headerIsVisible = action.payload;
    },
    setAuthPopupVisibility: (state, action) => {
      state.authPopupIsVisible = action.payload;
    },
  },
});

export const { showMenu, setBreakPoint, setPlayerVisibility, setHeaderVisibility, setAuthPopupVisibility } = commonSlice.actions;

export default commonSlice.reducer;
