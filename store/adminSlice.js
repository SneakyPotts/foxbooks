import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banners: {
    aside: [],
    content: [],
  },
};

const fromAdminPanel = createSlice({
  name: 'fromAdminPanel',
  initialState,
  reducers: {
    setCurrentPageBanners: (state, action) => {
      state.banners = action.payload;
    },
  },
});

export const { setCurrentPageBanners } = fromAdminPanel.actions;
export default fromAdminPanel.reducer;
