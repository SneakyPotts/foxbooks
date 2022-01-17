import React from 'react';
import BooksComponent from '../../components/Books';
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import {setBooks} from "../../store/bookSlice";

const Books = (props) => {
	const dispatch = useDispatch()

	dispatch(setBooks(props.books))

	return (
		<div>
			<BooksComponent />
		</div>
	);
};

export default Books;

export async function getServerSideProps ({ query }) {
	const books = await BookService.getBooks(query)

	return {
		props: {
			books: books?.data?.data,
		}
	}
}