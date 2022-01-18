import React from 'react';
import BookComponent from '../../../components/Books/category';
import BookService from "../../../http/BookService";
import {useDispatch} from "react-redux";
import {setBooks} from "../../../store/bookSlice";

const Categories = (props) => {
	const dispatch = useDispatch()

	dispatch(setBooks(props.books))

	return (
		<div>
			<BookComponent />
		</div>
	);
};

export default Categories;

export async function getServerSideProps ({ query }) {
	const books = await BookService.getBooks(query)

	return {
		props: {
			books: books?.data?.data,
		}
	}
}