import Head from 'next/head';
import Home from '../components/HomePage';
import BookService from '../http/BookService';
import { useDispatch } from 'react-redux';
import { setBooks, setCategories } from '../store/bookSlice';

export default function App(props) {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books));

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

// export async function getServerSideProps ({ req, query }) {
// 	// const { cookies } = req
// 	// const token = cookies.token

// 	const categories = await BookService.getCategories()
// 	const books = await BookService.getBooks(query)

// 	// let profile = {}
// 	//
// 	// if (token) {
// 	// 	profile = await ProfileService.getProfile(token)
// 	// }

// 	return {
// 		props: {
// 			categories: categories?.data?.data,
// 			books: books?.data?.data,
// 			// profile: profile?.data?.data || {}
// 		}
// 	}
// }
