import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  novelties: [],
  isLoading: false,
  isError: false,
};

export const noveltiesSlice = createSlice({
  name: 'novelties',
  initialState,
  reducers: {
    setNovelties: (state, action) => {
      state.novelties = action.payload;
    },
  },
});

export const { setNovelties } = noveltiesSlice.actions;

export default noveltiesSlice.reducer;
