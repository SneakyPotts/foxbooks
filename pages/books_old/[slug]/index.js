import React from 'react';
import {useDispatch} from "react-redux";
import {setBook, setBookQuotes} from "../../../store/bookSlice";
import BookPage from "../../../components/BookPage";
import BookService from "../../../http/BookService";

const Book = ({ book, bookQuotes }) => {
  const dispatch = useDispatch()

  dispatch(setBook(book))
  dispatch(setBookQuotes(bookQuotes))

  return <BookPage bookType='books'/>
};

export default Book;

export async function getServerSideProps ({req, params}) {
  const { cookies } = req
  const token = cookies.token
  const type = 'books';

  try {
    const book = await BookService.getBookBySlug(params?.slug)
    const similarBooks = await BookService.getSimilarBooks(book.data.data.id, type)
    const bookQuotes = await BookService.getBookQuotes(book.data.data.id, token)

    return {
      props: {
        book: {
          ...book?.data?.data,
          similarBooks: similarBooks.data.data,
        },
        bookQuotes: bookQuotes?.data?.data || {}
      }
    }
  } catch {
    return {
      redirect: {
        destination: "/404",
        parameter: false
      }
    };
  }
}
