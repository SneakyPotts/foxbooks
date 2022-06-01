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

export async function getServerSideProps ({params, query}) {
	const book = await BookService.getBookById(params?.id, query?.type)
	const bookQuotes = await BookService.getBookQuotes(params?.id)
	const audioBookChapters = await BookService.audioBookChapters(params?.id)

	return {
		props: {
			book: {...book?.data?.data, chapters: audioBookChapters?.data?.data?.chapters},
			bookQuotes: bookQuotes?.data?.data
		}
	}
}
