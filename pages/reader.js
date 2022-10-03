import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReaderBook from "../components/ReaderBook/ReaderBook";
import ReaderService from '../http/ReaderService';
import {setReaderBook, setBookChapters, getBookMarks, getSettings, getBookQuotes, setSettings, getDefaultSettings} from '../store/readerSlice';
import useLocalSettings from "../hooks/useLocalSettings";

const Reader = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { isAuth } = useSelector(state => state.auth)

  dispatch(setReaderBook(props.bookRead))
  dispatch(setBookChapters(props.bookChapters))

  useEffect(() => {
    if(isAuth) {
      dispatch(getSettings())
      dispatch(getBookMarks(router.query?.id))
      dispatch(getBookQuotes({
        id: router.query?.id,
        my: 1,
        search: ''
      }))
    } else {
      useLocalSettings()
        ? dispatch(setSettings(useLocalSettings()))
        : dispatch(getDefaultSettings())
    }
  }, [isAuth])

  return (
    <ReaderBook />
  );
};

export default Reader;

export async function getServerSideProps ({ req, query }) {
  const { cookies } = req
  const token = cookies.token

  try {
    const bookRead = await ReaderService.getBookRead(query?.id, query?.page, token)
    const bookChapters = await ReaderService.getBookChapters(query?.id)

    return {
      props: {
        bookRead: bookRead?.data?.data,
        bookChapters: bookChapters?.data?.data
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
