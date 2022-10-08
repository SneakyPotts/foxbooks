import React from 'react';
import {useDispatch} from "react-redux";
import {setBook, setBookQuotes} from "../../../store/bookSlice";
import BookPage from "../../../components/BookPage";
import BookService from "../../../http/BookService";

const Book = ({ book, bookQuotes, books_type }) => {
  const dispatch = useDispatch()

  dispatch(setBook(book))
  dispatch(setBookQuotes(bookQuotes))

  return <BookPage bookType={books_type}/>
};

export default Book;

export async function getServerSideProps ({req, params}) {
  const { cookies } = req
  const token = cookies.token
  const type = params.books_type === 'audiobooks' ? 'audioBooks' : 'books';

  try {
    const book = type === 'books'
      ? await BookService.getBookBySlug(params?.book_slug)
      : await BookService.getAudioBookBySlug(params.book_slug);
    const similarBooks = await BookService.getSimilarBooks(book.data.data.id, type);

    const bookQuotes = type === 'books' ? await BookService.getBookQuotes(book.data.data.id, token) : null;
    const audioBookChapters = type === 'audioBooks' ? await BookService.audioBookChapters(book.data.data.id) : null;

    return {
      props: {
        book: {
          ...book?.data?.data,
          similarBooks: similarBooks.data.data,
          chapters: audioBookChapters?.data?.data?.chapters || [],
        },
        bookQuotes: bookQuotes?.data?.data || {},
        books_type: type,
        SEO: {
          title: book?.data?.data?.seo_title,
          description: book?.data?.data?.seo_description,
          keywords: book?.data?.data?.seo_keywords,
          og_title: book?.data?.data?.og_title,
          og_description: book?.data?.data?.og_description,
          og_img: book?.data?.data?.og_img,
        }
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
