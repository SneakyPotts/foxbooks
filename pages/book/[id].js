import React from 'react';
import BookPage from '../../components/BookPage';
import BookService from "../../http/BookService";
import {setBook} from "../../store/bookSlice";
import {useDispatch} from "react-redux";
import {setReviews} from "../../store/reviewSlice";

const Book = ({ book, reviews }) => {
	const dispatch = useDispatch()

	dispatch(setBook(book))
	dispatch(setReviews(reviews))

	return <BookPage />
};

export default Book;

export async function getServerSideProps ({params, query}) {
	const book = await BookService.getBookById(params?.id, query?.type)

	return {
		props: {
			book: book?.data?.data,
			reviews: book?.data?.data?.reviews,
		}
	}
}
