import Head from 'next/head';
import Home from '../components/HomePage';
import BookService from '../http/BookService';
import { useDispatch } from 'react-redux';
import {setBooks, setCategories, setDailyHotUpdates} from '../store/bookSlice';
import CategoriesService from "../http/CategoriesService";
import HomeService from "../http/HomeService";

export default function App(props) {
  const dispatch = useDispatch();

  console.log(props.data)

  dispatch(setCategories(props.categories));
  dispatch(setDailyHotUpdates(props.dailyHotUpdates));
  // dispatch(setBooks(props.books));

  return (
    <>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" >
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin > */}
        {/*<link*/}
        {/*  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Fira Sans, sans-serif:wght@400;500&display=swap"*/}
        {/*  rel="stylesheet"*/}
        {/*/>*/}
        {/* beforeInteractive */}
        {/* <Script src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" /> */}
      </Head>
      <Home />
    </>
  );
}

export async function getServerSideProps () {
	// const { cookies } = req
	// const token = cookies.token

	const { data } = await HomeService.getHomeData()

	// let profile = {}
	//
	// if (token) {
	// 	profile = await ProfileService.getProfile(token)
	// }

	return {
		props: {
		  data: data?.data,
			categories: data?.data?.genres?.original?.data,
      dailyHotUpdates: data?.data?.dailyHotUpdates
			// profile: profile?.data?.data || {}
		}
	}
}
