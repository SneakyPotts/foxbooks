import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ProfileService from "../http/ProfileService";

const initialState = {
	profile: [],
	isLoading: false,
	isError: false
};

export const getProfile = createAsyncThunk(
	'profile/getProfile',
	async () => {
		const response = await ProfileService.getProfile()
		return response.data
	}
)

export const resetPassword = createAsyncThunk(
	'profile/resetPassword',
	async data => {
		const response = await ProfileService.resetPassword(data)
		return response.data
	}
)

export const setNotificationSettings = createAsyncThunk(
	'profile/setNotificationSettings',
	async data => {
		const response = await ProfileService.setNotificationSettings(data)
		return response.data
	}
)

export const deleteUser = createAsyncThunk(
	'profile/deleteUser',
	async () => {
		const response = await ProfileService.deleteUser()
		return response.data
	}
)

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload
		}
	},
	extraReducers: {
		[getProfile.pending]: state => {
			state.isLoading = true
		},
		[getProfile.fulfilled]: (state, action) => {
			state.profile = action.payload
			state.isError = false
			state.isLoading = false
		},
		[getProfile.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[resetPassword.pending]: state => {
			state.isLoading = true
		},
		[resetPassword.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[resetPassword.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[setNotificationSettings.pending]: state => {
			state.isLoading = true
		},
		[setNotificationSettings.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[setNotificationSettings.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[deleteUser.pending]: state => {
			state.isLoading = true
		},
		[deleteUser.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[deleteUser.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},
	}
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
