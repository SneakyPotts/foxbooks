import Head from 'next/head';
import Home from '../components/HomePage';
import { useDispatch } from 'react-redux';
import {setBooks, setCategories, setDailyHotUpdates} from '../store/bookSlice';
import HomeService from "../http/HomeService";
import {setSelections} from "../store/selectionSlice";
import {setReviews} from "../store/reviewSlice";

export default function App(props) {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setDailyHotUpdates(props.dailyHotUpdates));
  dispatch(setBooks(props.books));
  dispatch(setSelections(props.compilations));
  dispatch(setReviews(props.reviews));

  return (
    <>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" >
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin > */}
        {/*<link*/}
        {/*  href="https://fonts.googleapis.com/css2?family='Merriweather':wght@300;400;700&family='Fira Sans', sans-serif:wght@400;500&display=swap"*/}
        {/*  rel="stylesheet"*/}
        {/*/>*/}
        {/* beforeInteractive */}
        {/* <Script src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" /> */}
      </Head>
      <Home
        audioBooks={props.audioBooks}
      />
    </>
  );
}

export async function getServerSideProps ({query}) {
	// const { cookies } = req
	// const token = cookies.token

	const { data } = await HomeService.getHomeData(query)

	// let profile = {}
	//
	// if (token) {
	// 	profile = await ProfileService.getProfile(token)
	// }

	return {
		props: {
		  books: data?.data?.mainPageBookFilter,
			categories: data?.data?.genres,
      dailyHotUpdates: data?.data?.dailyHotUpdates,
      compilations: data?.data?.compilations,
      reviews: data?.data?.reviews,
      audioBooks: data?.data?.audioBooksList,
			// profile: profile?.data?.data || {}
		}
	}
}
