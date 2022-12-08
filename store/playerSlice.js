import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import PlayerService from "../http/PlayerService";

const initialState = {
	title: '',
	image: '',
	link: '',
	chapters: [],
	user_progress: {}
};

export const setAudioProgress = createAsyncThunk(
	'player/setAudioProgress',
	async (data) => {
		await PlayerService.setProgress(data);
		return data;
	}
)

export const player = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPlayerData: (state, action) => {
			state.title = action.payload.title
			state.image = action.payload.image
			state.link = action.payload.link
			state.chapters = action.payload.chapters
			state.user_progress = action.payload.user_progress
		},
		resetPlayerData: (state) => {
			state.title = ''
			state.image = ''
			state.link = ''
			state.chapters = []
			state.user_progress = {}
		}
	},
	extraReducers: {
		[setAudioProgress.fulfilled]: (state, action) => {
			state.user_progress = {...state.user_progress, ...action.payload}
		}
	}
});

export const { setPlayerData, resetPlayerData } = player.actions;

export default player.reducer;
