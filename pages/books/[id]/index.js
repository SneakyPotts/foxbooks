import React from 'react';
import BookComponent from '../../../components/Books/category';
import BookService from "../../../http/BookService";
import {useDispatch} from "react-redux";
import {setBooks, setCategories} from "../../../store/bookSlice";

const Categories = (props) => {
	const dispatch = useDispatch()

	dispatch(setCategories(props.categories));
	dispatch(setBooks(props.books))

	return (
		<div>
			<BookComponent />
		</div>
	);
};

export default Categories;

export async function getServerSideProps ({ params, query }) {
	const categories = await BookService.getCategories()
	const books = await BookService.getBooks({...query, findByCategory: params?.id})

	return {
		props: {
			categories: categories?.data?.data,
			books: books?.data?.data,
		}
	}
}