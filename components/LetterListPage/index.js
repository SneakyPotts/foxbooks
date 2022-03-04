import React, {useEffect, useMemo, useState} from 'react';
import Alphabet from "../HomePage/Alphabet/Alphabet";
import Categories from "../HomePage/Categories";
import classNames from "classnames";
import styles from './styles.module.scss';
import BookFilters from "../shared/common/booksFilters/BookFilters";
import {useDispatch, useSelector} from "react-redux";
import Stars from "../shared/common/stars/Stars";
import {useRouter} from "next/router";
import Link from 'next/link'
import { InView } from 'react-intersection-observer';
import {getBooksByLetter} from "../../store/bookSlice";
import {getAuthorsByLetter} from "../../store/authorSlice";
import Loader from "../shared/common/Loader";

const filters = [
  {id: 1, title: 'Книги', value: 'books'},
  {id: 2, title: 'Аудиокниги', value: 'audioBooks'}
]

const LetterListPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const isBook = router.query?.type === 'books' || router.query?.type === 'audioBooks'

  const { booksByLetter } = useSelector(state => state.book)
  const { authorsByLetter } = useSelector(state => state.author)

  const data = useMemo(() => {
    return isBook ? booksByLetter?.data : authorsByLetter?.data
  }, [isBook, booksByLetter, authorsByLetter])

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)

  const lastPage = useMemo(() => {
    return isBook ? booksByLetter?.last_page : authorsByLetter?.last_page
  }, [isBook, booksByLetter, authorsByLetter])

  const dynamicLoad = inView => {
    if(inView && page < lastPage) {
      setIsLoading(true)
      setPage(page + 1)
    }
  }

  useEffect(() => {
    if(isBook) {
      dispatch(getBooksByLetter({
        letter: router.query?.letter,
        page
      })).then(() => {
        setIsFirstLoading(false)
        setIsLoading(false)
      })
    } else {
      dispatch(getAuthorsByLetter({
        letter: router.query?.letter,
        page
      })).then(() => {
        setIsFirstLoading(false)
        setIsLoading(false)
      })
    }
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [router])

  return (
    <div className={classNames('container', styles.container)}>
      <Categories />
      <div className={styles.block}>
        <Alphabet />

        {isBook &&
          <div className={styles.filters}>
            <BookFilters
              filters={filters}
              queryName={'type'}
            />
          </div>
        }

        <h2 className={styles.title}>
          {isBook ? 'Названия книг' : 'Имена авторов'}, которые начинаются на букву {decodeURI(router.query?.letter)}
        </h2>

        {isFirstLoading ?
          <p className="empty"><Loader /></p> :
          data?.length ?
            <table className={styles.table}>
              {data?.map(i =>
                <tr key={i?.id}>
                  <td>
                    <Link
                      href={
                        isBook ?
                          `/book/${i?.id}?type=${i?.type}` :
                          `/author?id=${i?.id}`
                      }
                    >
                      <a className={styles.tableLink}>{isBook? i?.title : i?.author}</a>
                    </Link>
                  </td>
                  <td>Саймон Стронг</td>
                  <td><Stars /> 8,1 (450)</td>
                </tr>
              )}
              <InView
                as={'tr'}
                skip={isLoading}
                onChange={inView => dynamicLoad(inView)}
              />
            </table> :
            <p className="empty">{isBook ? 'Книг не найдено' : 'Авторы не найдены'}</p>
        }
      </div>
    </div>
  );
};

export default LetterListPage;
