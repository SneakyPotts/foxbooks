import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import ReaderBook from "../components/ReaderBook/ReaderBook";
import ReaderService from '../http/ReaderService';
import {setReaderBook, setBookChapters, getBookMarks, getSettings} from '../store/readerSlice';

const Reader = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  dispatch(setReaderBook(props.bookRead))
  dispatch(setBookChapters(props.bookChapters))

  useEffect(() => {
    dispatch(getSettings())
    dispatch(getBookMarks(router.query?.id))
  }, [])

  return (
    <ReaderBook />
  );
};

export default Reader;

export async function getServerSideProps ({ query }) {
	const bookRead = await ReaderService.getBookRead(query?.id, query?.page)
	const bookChapters = await ReaderService.getBookChapters(query?.id)

  return {
		props: {
			bookRead: bookRead?.data?.data,
			bookChapters: bookChapters?.data?.data
		}
	}
}