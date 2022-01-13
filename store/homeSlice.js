import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categories: []
};

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload
		}
	}
});

export const { setCategories } = homeSlice.actions;

export default homeSlice.reducer;
