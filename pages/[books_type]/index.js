import React from 'react';
import BooksComponent from '../../components/Books';
import BookService from '../../http/BookService';
import { useDispatch } from 'react-redux';
import { setBooks, setCategories } from '../../store/bookSlice';
import CategoriesService from "../../http/CategoriesService";

const Books = props => {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books));

  return (
    <div>
      <BooksComponent booksType={props.books.books_type}/>
    </div>
  );
};

export default Books;

export async function getServerSideProps({ query, params }) {
  const categories = await CategoriesService.getCategoriesWithCount();
  const books = await BookService.getBooks(query);

  return {
    props: {
      categories: categories?.data?.data,
      books: books?.data?.data,
      books_type: params.books_type,
    },
  };
}
