import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

import Alphabet from '../HomePage/Alphabet/Alphabet';
import Categories from '../HomePage/Categories';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { getAuthorsByLetter } from '../../store/authorSlice';
import { getBooksByLetter } from '../../store/bookSlice';

import Loader from '../shared/common/Loader';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import Stars from '../shared/common/stars/Stars';

const filters = [
  { id: 1, title: 'Книги', value: 'books' },
  { id: 2, title: 'Аудиокниги', value: 'audioBooks' },
];

const LetterListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isBook = router.query?.type === 'books' || router.query?.type === 'audioBooks';

  const { booksByLetter } = useSelector((state) => state.book);
  const { authorsByLetter } = useSelector((state) => state.author);

  const data = useMemo(() => {
    return isBook ? booksByLetter?.data : authorsByLetter?.data;
  }, [isBook, booksByLetter, authorsByLetter]);

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const lastPage = useMemo(() => {
    return isBook ? booksByLetter?.last_page : authorsByLetter?.last_page;
  }, [isBook, booksByLetter, authorsByLetter]);

  const fetch = (page) => {
    if (isBook) {
      dispatch(
        getBooksByLetter({
          query: router.asPath,
          letter: router.query?.letter,
          type: router.query?.type,
          page,
        }),
      ).then(() => {
        setIsFirstLoading(false);
        setIsLoading(false);
      });
    } else {
      dispatch(
        getAuthorsByLetter({
          query: router.asPath,
          letter: router.query?.letter,
          page,
        }),
      ).then(() => {
        setIsFirstLoading(false);
        setIsLoading(false);
      });
    }
  };

  const dynamicLoad = (inView) => {
    if (inView && page < lastPage) {
      setIsLoading(true);
      setPage(page + 1);
      fetch(page + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    fetch(1);
  }, [router]);

  return (
    <div className={classNames('container', styles.container)}>
      <Categories />
      <div className={styles.block}>
        <Alphabet />

        {isBook && (
          <div className={styles.filters}>
            <BookFilters
              filters={filters}
              queryName={'type'}
            />
          </div>
        )}

        <h2 className={styles.title}>
          {isBook ? 'Названия книг' : 'Имена авторов'}, которые начинаются на букву {decodeURI(router.query?.letter)}
        </h2>

        {isFirstLoading ? (
          <div className="empty">
            <Loader />
          </div>
        ) : data?.length ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                {data?.map((i) =>
                  isBook ? (
                    <tr key={i?.id}>
                      <td>
                        <Link href={`/${i?.type.toLowerCase()}/${i?.genres?.[0]?.slug || i?.genre?.slug}/${i?.slug}`}>
                          <a className={styles.tableLink}>{i?.title}</a>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/author/${i?.authors[0]?.slug}`}>
                          <a className={styles.tableLink}>{i?.authors[0]?.author}</a>
                        </Link>
                      </td>
                      <td>
                        <Stars value={i?.rate_avg} /> {i?.rate_avg} ({i?.rates_count})
                      </td>
                    </tr>
                  ) : (
                    <tr key={i?.id}>
                      <td>
                        <Link href={`/author/${i?.slug}`}>
                          <a className={styles.tableLink}>{i?.author}</a>
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
                <InView
                  as={'tr'}
                  skip={isLoading}
                  onChange={(inView) => dynamicLoad(inView)}
                />
              </tbody>
            </table>
            {isLoading && (
              <div className="empty">
                <Loader />
              </div>
            )}
          </div>
        ) : (
          <p className="empty">{isBook ? 'Книг не найдено' : 'Авторы не найдены'}</p>
        )}
      </div>
    </div>
  );
};

export default LetterListPage;
