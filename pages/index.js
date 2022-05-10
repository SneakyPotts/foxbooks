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

  console.log(props)

  return (
    <Home
      audioBooks={props.audioBooks?.audio_books}
      newBooks={props.newBooks?.books}
    />
  )
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
      newBooks: data?.data?.newBooksCompilations
			// profile: profile?.data?.data || {}
		}
	}
}
