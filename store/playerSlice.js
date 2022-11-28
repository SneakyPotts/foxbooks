import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import PlayerService from "../http/PlayerService";

const initialState = {
	title: '',
	image: '',
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
			state.chapters = action.payload.chapters
		},
		resetPlayerData: (state) => {
			state.title = ''
			state.image = ''
			state.chapters = []
		},
		setListeningProgress: (state, action) => {
			state.user_progress = action.payload
		}
	},
	extraReducers: {
		[setAudioProgress.fulfilled]: (state, action) => {
			state.user_progress = action.payload
		}
	}
});

export const { setPlayerData, resetPlayerData, setListeningProgress } = player.actions;

export default player.reducer;
