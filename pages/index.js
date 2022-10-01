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
    <Home
      audioBooks={props.audioBooks?.audio_books}
      newBooks={props.newBooks?.books}
    />
  )
}

export async function getServerSideProps ({query}) {
	const { data } = await HomeService.getHomeData(query)

	return {
		props: {
      SEO: {
        title: 'Онлайн-библиотека книг FoxBooks 🦊 | Читать книги онлайн бесплатно',
        description: 'Онлайн-библиотека зарубежной и отечественной литературы FoxBooks — место, где каждый может бесплатно слушать и читать книги онлайн с любого доступного устройства. Все новинки только у нас!',
        image: '',
        keywords: ['онлайн библиотека книг', 'читать книги онлайн бесплатно']
      },
		  books: data?.data?.mainPageBookFilter,
            categories: data?.data?.genres,
            dailyHotUpdates: data?.data?.dailyHotUpdates,
            compilations: data?.data?.compilations,
            reviews: data?.data?.reviews,
            audioBooks: data?.data?.audioBooksList,
            newBooks: data?.data?.newBooksCompilations
		}
	}
}
