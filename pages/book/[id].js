import React from 'react';
import BookPage from '../../components/BookPage';
import BookService from "../../http/BookService";
import {setBook, setBookQuotes} from "../../store/bookSlice";
import {useDispatch} from "react-redux";

const Book = ({ book, bookQuotes }) => {
	const dispatch = useDispatch()

	dispatch(setBook(book))
	dispatch(setBookQuotes(bookQuotes))

	return <BookPage />
};

export default Book;

export async function getServerSideProps ({req, params, query}) {
	const { cookies } = req
	const token = cookies.token

	const book = await BookService.getBookById(params?.id, query?.type)
	const similarBooks = await BookService.getSimilarBooks(params?.id, query?.type)
	const bookQuotes = query?.type === 'books' ? await BookService.getBookQuotes(params?.id, token) : null
	const audioBookChapters = query?.type === 'audioBooks' ? await BookService.audioBookChapters(params?.id) : null

	return {
		props: {
			book: {
				...book?.data?.data,
				similarBooks: similarBooks.data.data,
				chapters: audioBookChapters?.data?.data?.chapters || []
			},
			bookQuotes: bookQuotes?.data?.data || {}
		}
	}
}
