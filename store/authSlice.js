import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from "../http/AuthService";
import Cookies from 'js-cookie'
import {getProfile} from "./profileSlice";

const initialState = {
	isAuth: false,
	isLoading: false,
	isError: false
};

export const signUp = createAsyncThunk(
	'auth/signUp',
	async (data, {rejectWithValue}) => {
		try {
			const response = await AuthService.signUp(data)
			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data.errors.email[0])
		}
	}
)

export const signIn = createAsyncThunk(
	'auth/signIn',
	async data => {
		const response = await AuthService.signIn(data)
		Cookies.set('token', response.data.token, { expires: 7 })
		return response.data
	}
)

export const forgotPassword = createAsyncThunk(
	'auth/forgotPassword',
	async (data, {rejectWithValue}) => {
		try {
			const response = await AuthService.forgotPassword(data)
			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const resetForgotPassword = createAsyncThunk(
	'auth/resetForgotPassword',
	async data => {
		const response = await AuthService.resetForgotPassword(data)
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
	async ( data, thunkApi) => {
		const response = await AuthService.signInWithSocial(data)
		Cookies.set('token', response.data.accessToken, { expires: 7 })
		thunkApi.dispatch(getProfile())
		return response.data
	}
)

export const logOut = createAsyncThunk(
	'auth/logOut',
	async () => {
		return await AuthService.logOut()
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = action.payload
		},
		resetError: (state) => {
			state.isError = false
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


		[logOut.fulfilled]: state => {
			state.isAuth = false
		},

		[forgotPassword.pending]: state => {
			state.isLoading = true
		},
		[forgotPassword.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[forgotPassword.rejected]: state => {
			state.isError = true
			state.isLoading = false
		},


		[resetForgotPassword.pending]: state => {
			state.isLoading = true
		},
		[resetForgotPassword.fulfilled]: state => {
			state.isError = false
			state.isLoading = false
		},
		[resetForgotPassword.rejected]: state => {
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

export const { setAuth, resetError } = authSlice.actions;

export default authSlice.reducer;
