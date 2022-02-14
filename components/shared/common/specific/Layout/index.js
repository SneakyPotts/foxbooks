import React, { useEffect } from 'react';
import Header from '../../../../Header';
import Footer from '../../../../Footer';
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import {
	setAuth,
	verifyEmail,
	signInWithSocial,
} from '../../../../../store/authSlice';
import Cookies from 'js-cookie';
import {getProfile} from "../../../../../store/profileSlice";
import AudioPlayer from "../../../../AudioPlayer";
import { setBreakPoint } from '../../../../../store/commonSlice';
import debounce from 'lodash.debounce';

const Layout = ({ children }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const {playerIsVisible} = useSelector(state => state.common)

	useEffect(() => {
		dispatch(setBreakPoint(window.innerWidth));
    window.addEventListener('resize', debounce(() => {
      dispatch(setBreakPoint(window.innerWidth));
    }, 100));

		const storageToken = Cookies.get('token');
		const { email, token, id } = router.query;

		if (storageToken) {
		  dispatch(getProfile())
			dispatch(setAuth(true));
		} else if (email && token) {
			dispatch(verifyEmail({ email, token }));
		} else if (token && id) {
			dispatch(signInWithSocial({ id, token }));
		}
	}, []);
 
	return (
		<>
			<Header />
			{children}
			{playerIsVisible && <AudioPlayer/>}
			<Footer />
		</>
	);
};

export default Layout;
