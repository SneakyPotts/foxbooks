import React, {useEffect} from 'react';
import Header from "../../../../Header";
import Footer from "../../../../Footer";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setAuth, verifyEmail, signInWithSocial} from "../../../../../store/authSlice";

const Layout = ({children}) => {
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		const storageToken = localStorage.getItem('token')
		const { email, token, id } = router.query

		if(storageToken) {
			dispatch(setAuth(true))
		} else if (email && token) {
			dispatch(verifyEmail({email, token}))
		} else if (token && id) {
			dispatch(signInWithSocial({id, token}))
		}
	}, []);

	return (
		<>
			<Header />
			{children}
			<Footer/>
		</>
	);
};

export default Layout;