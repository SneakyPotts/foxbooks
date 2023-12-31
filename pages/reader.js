import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReaderBook from '../components/ReaderBook/ReaderBook';
import { cookiesSettings } from '../utils';

import { getBookMarks, getBookQuotes, setBookChapters, setReaderBook, setServerSettings } from '../store/readerSlice';

import ReaderService from '../http/ReaderService';

const Reader = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);

  dispatch(setReaderBook(props.bookRead));
  dispatch(setBookChapters(props.bookChapters));
  dispatch(setServerSettings(props.readerSettings));

  useEffect(() => {
    if (isAuth) {
      dispatch(getBookMarks(router.query?.id));
      dispatch(
        getBookQuotes({
          id: router.query?.id,
          my: 1,
          search: '',
        }),
      );
    }
  }, [isAuth]);

  return <ReaderBook />;
};

export default Reader;

export async function getServerSideProps({ req, query }) {
  const { cookies } = req;
  const token = cookies.token;
  const settings = cookies.settings;

  try {
    const bookRead = await ReaderService.getBookRead({ ...query, token });
    const bookChapters = await ReaderService.getBookChapters(query?.id);

    const readerSettings = token ? await ReaderService.getUserSettings(token) : await ReaderService.getDefaultSettings();

    return {
      props: {
        bookRead: bookRead?.data?.data,
        bookChapters: bookChapters?.data?.data,
        readerSettings: settings ? cookiesSettings(settings) : readerSettings?.data?.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
