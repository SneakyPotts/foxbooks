import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from "../http/AuthService";

const initialState = {
	isAuth: false,
	isLoading: false,
	error: ''
};

export const signUp = createAsyncThunk(
	'auth/signUp',
	async data => {
		const response = await AuthService.signUp(data)
		return response.data
	}
)

export const signIn = createAsyncThunk(
	'auth/signIn',
	async data => {
		const response = await AuthService.signIn(data)
		localStorage.setItem('token', response.data.token)
		return response.data
	}
)

export const verifyEmail = createAsyncThunk(
	'auth/verifyEmail',
	async data => {
		const response = await AuthService.verifyEmail(data)
		return response.data
	}
)

export const signInWithSocial = createAsyncThunk(
	'auth/signInWithSocial',
	async data => {
		const response = await AuthService.signInWithSocial(data)
		localStorage.setItem('token', response.data.accessToken)
		return response.data
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = action.payload
		}
	},
	extraReducers: {
		[signUp.pending]: state => {
			state.isLoading = true
		},
		[signUp.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[signUp.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[signIn.pending]: state => {
			state.isLoading = true
		},
		[signIn.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
			state.isAuth = true
		},
		[signIn.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[verifyEmail.pending]: state => {
			state.isLoading = true
		},
		[verifyEmail.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[verifyEmail.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[signInWithSocial.pending]: state => {
			state.isLoading = true
		},
		[signInWithSocial.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
			state.isAuth = true
		},
		[signInWithSocial.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},
	}
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
