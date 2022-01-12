import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	error: '',
	showMenu: false,
};

export const headerSlice = createSlice({
	name: 'header',
	initialState,

	reducers: {
		ShowMenu: (state, action) => {
			state.showMenu = action.payload;
		}
	},
});

export const { ShowMenu, ShowHeader } = headerSlice.actions;

export default headerSlice.reducer;
