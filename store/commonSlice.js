import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  innerWidthWindow: '',
  showMenuFlag: false,
  playerIsVisible: false,
  headerIsVisible: true
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
    togglePlayer: (state, action) => {
      state.playerIsVisible = action.payload;
    },
    setHeaderVisibility: (state, action) => {
      state.headerIsVisible = action.payload;
    }
  },
});

export const {
  showMenu,
  setBreakPoint,
  togglePlayer,
  setHeaderVisibility
} = commonSlice.actions;

export default commonSlice.reducer;
