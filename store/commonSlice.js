import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	innerWidthWindow: '',
	error: '',
	showMenu: false,
	playerIsVisible: true
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
