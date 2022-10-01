import React from 'react';
import {useDispatch} from "react-redux";
import {setBook} from "../../../store/bookSlice";
import BookPage from "../../../components/BookPage";
import BookService from "../../../http/BookService";

const Book = ({ book }) => {
  const dispatch = useDispatch()

  dispatch(setBook(book))

  return <BookPage bookType='audioBooks'/>
};

export default Book;

export async function getServerSideProps ({params}) {
  const type = 'audioBooks';

  try {
    const book = await BookService.getAudioBookBySlug(params?.slug)
    const similarBooks = await BookService.getSimilarBooks(book.data.data.id, type)
    const audioBookChapters = await BookService.audioBookChapters(book.data.data.id)

    return {
      props: {
        book: {
          ...book?.data?.data,
          similarBooks: similarBooks.data.data,
          chapters: audioBookChapters?.data?.data?.chapters || []
        },
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
