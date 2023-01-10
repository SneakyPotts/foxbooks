import React from 'react';
import Cookies from "js-cookie";
import {setAuth} from "../store/authSlice";
import {clearNotification, setProfile} from "../store/profileSlice";
import {getDefaultSettings, setBookMarks, setQuotes} from "../store/readerSlice";
import {setPlayerVisibility} from "../store/commonSlice";
import {resetPlayerData} from "../store/playerSlice";

const useLogOut = (router, dispatch, socket) => {
	socket && socket.disconnect()

	Cookies.remove('token')
	localStorage.removeItem('avatarColor')

	if (router.pathname.includes('settings') || router.pathname.includes('mybooks')) {
		router.push('/')
			.then(() => {
				dispatch(setAuth(false))
			})
	} else {
		dispatch(setAuth(false))
	}

	dispatch(setProfile([]))
	dispatch(clearNotification())
	dispatch(setBookMarks([]))
	dispatch(setQuotes([]))
	dispatch(getDefaultSettings())

	dispatch(setPlayerVisibility(false))
	document.body.removeAttribute('style')
	dispatch(resetPlayerData())
}

export default useLogOut
