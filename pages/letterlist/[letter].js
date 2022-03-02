import React from 'react';
import BookService from "../../http/BookService";
import {useDispatch} from "react-redux";
import {setBooks, setCategories,} from "../../store/bookSlice";
import LetterListPage from "../../components/LetterListPage";
import CategoriesService from "../../http/CategoriesService";

const LetterList = (props) => {
  const dispatch = useDispatch()

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books))

  return <LetterListPage />;
};

export default LetterList;

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