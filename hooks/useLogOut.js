import React from 'react';

import Cookies from 'js-cookie';

import { logOut } from '../store/authSlice';
import { setPlayerVisibility } from '../store/commonSlice';
import { resetPlayerData } from '../store/playerSlice';
import { clearNotification, setProfile } from '../store/profileSlice';
import { getDefaultSettings, setBookMarks, setQuotes } from '../store/readerSlice';

const useLogOut = (router, dispatch, socket) => {
  socket && socket.disconnect();

  if (router.pathname.includes('settings') || router.pathname.includes('mybooks')) {
    router.push('/').then(() => {
      dispatch(logOut()).then(() => Cookies.remove('token'));
    });
  } else {
    dispatch(logOut()).then(() => Cookies.remove('token'));
  }

  localStorage.removeItem('avatarColor');

  dispatch(setProfile([]));
  dispatch(clearNotification());
  dispatch(setBookMarks([]));
  dispatch(setQuotes([]));
  dispatch(getDefaultSettings());

  dispatch(setPlayerVisibility(false));
  document.body.removeAttribute('style');
  dispatch(resetPlayerData());
};

export default useLogOut;
