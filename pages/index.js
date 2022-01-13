import Head from 'next/head';
import Home from '../components/HomePage';
import HomeService from "../http/HomeService";
import {useDispatch} from "react-redux";
import {setCategories} from "../store/homeSlice";

export default function App(props) {
	const dispatch = useDispatch()

	dispatch(setCategories(props.categories))

	return (
		<>
			<Head>
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crosorigin /> */}
				<link
					href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Ubuntu:wght@400;500&display=swap"
					rel="stylesheet"
				/>
				{/* beforeInteractive */}
				{/* <Script src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" /> */}
			</Head>
			<Home />
		</>
	);
}

export async function getServerSideProps () {
	const categories = await HomeService.getHomeCategories()

	return {
		props: {categories: categories.data}
	}
}

