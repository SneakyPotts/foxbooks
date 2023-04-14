import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ProfileService from '../http/ProfileService';

const initialState = {
  profile: [],
  notifications: [],
  newNotification: false,
};

export const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const response = await ProfileService.getProfile();
  return response.data;
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (data) => {
  const response = await ProfileService.updateProfile(data);
  return response.data;
});

export const resetPassword = createAsyncThunk('profile/resetPassword', async (data) => {
  const response = await ProfileService.resetPassword(data);
  return response.data;
});

export const setNotificationSettings = createAsyncThunk('profile/setNotificationSettings', async (data) => {
  const response = await ProfileService.setNotificationSettings(data);
  return response.data;
});

export const deleteUser = createAsyncThunk('profile/deleteUser', async () => {
  const response = await ProfileService.deleteUser();
  return response.data;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setNewNotification: (state, action) => {
      state.newNotification = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    clearNotification: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload.data;
    },

    [updateProfile.fulfilled]: (state, action) => {
      state.profile = action.payload.data;
    },

    [deleteUser.fulfilled]: (state) => {
      state.isError = false;
      state.isLoading = false;
    },
  },
});

export const { setProfile, setNewNotification, addNotification, clearNotification } = profileSlice.actions;

export default profileSlice.reducer;
