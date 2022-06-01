import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	title: '',
	image: '',
	chapters: []
};

export const player = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPlayerData: (state, action) => {
			state.title = action.payload.title
			state.image = action.payload.image
			state.chapters = action.payload.chapters
		},
		resetPlayerData: (state) => {
			state.title = ''
			state.image = ''
			state.chapters = []
		},
	}
});

export const { setPlayerData, resetPlayerData } = player.actions;

export default player.reducer;
