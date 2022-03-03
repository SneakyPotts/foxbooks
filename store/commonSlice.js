import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  innerWidthWindow: '',
  showMenu: false,
  playerIsVisible: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setBreakPoint: (state, action) => {
      state.innerWidthWindow = action.payload;
    },
    togglePlayer: (state, action) => {
      state.playerIsVisible = action.payload;
    },
  },
});

export const { showMenu, setBreakPoint, togglePlayer } = commonSlice.actions;

export default commonSlice.reducer;
