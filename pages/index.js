import Head from 'next/head';
import Home from '../components/HomePage';
import HomeService from '../http/HomeService';
import { useDispatch } from 'react-redux';
import { setCategories } from '../store/homeSlice';
import ProfileService from '../http/ProfileService';
import { setProfile } from '../store/profileSlice';
import BookService from '../http/BookService';
import { setBooks } from '../store/bookSlice';

export default function App(props) {
	const dispatch = useDispatch();

	dispatch(setCategories(props.categories));
	dispatch(setBooks(props.books));
	dispatch(setProfile(props.profile));

	return (
		<>
			<Head>
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" >
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin > */}
				<link
					href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Ubuntu:wght@400;500&display=swap"
					rel="stylesheet"
				></link>
				{/* beforeInteractive */}
				{/* <Script src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" /> */}
			</Head>
			<Home />
		</>
	);
}

export async function getServerSideProps ({ req, query }) {
	const { cookies } = req
	const token = cookies.token

	const categories = await HomeService.getHomeCategories()
	const books = await BookService.getBooks(query)

	let profile = {}

	if (token) {
		// profile = await ProfileService.getProfile(token)

		// console.log(profile)
	}

	// 		res.writeHead(302, { Location: '/' });
	// 		res.end();

	return {
		props: {
			categories: categories?.data?.data,
			books: books?.data?.data,
			profile: profile?.data || {},
		}
	}
}

