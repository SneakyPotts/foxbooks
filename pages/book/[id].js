import React from 'react';
import BookPage from '../../components/BookPage';
import BookService from "../../http/BookService";
import {setBook} from "../../store/bookSlice";
import {useDispatch} from "react-redux";

const Book = ({book}) => {
	const dispatch = useDispatch()

	dispatch(setBook(book))

	return (
		<div>
			<BookPage />
		</div>
	);
};

export default Book;

export async function getServerSideProps ({params}) {
	const book = await BookService.getBookById(params?.id)

	return {
		props: {
			book: book?.data?.data,
		}
	}
}
