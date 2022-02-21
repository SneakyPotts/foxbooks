import React from 'react';
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import {setBooks, setCategories,} from "../../store/bookSlice";
import BooksListPage from "../../components/BooksListPage";
import CategoriesService from "../../http/CategoriesService";

const BooksList = (props) => {
  const dispatch = useDispatch()

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books))

  return <BooksListPage />;
};

export default BooksList;

export async function getServerSideProps ({ query }) {
  const categories = await CategoriesService.getCategories()
  const books = await BookService.getBooksByLetter(query?.letter)

  return {
    props: {
      categories: categories?.data?.data,
      books: books?.data?.data,
    }
  }
}