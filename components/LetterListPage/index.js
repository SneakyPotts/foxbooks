import React from 'react';
import Alphabet from "../HomePage/Alphabet/Alphabet";
import Categories from "../HomePage/Categories";
import classNames from "classnames";
import styles from './styles.module.scss';
import BookFilters from "../shared/common/booksFilters/BookFilters";
import {useSelector} from "react-redux";
import Stars from "../shared/common/stars/Stars";
import {useRouter} from "next/router";

const filters = [
  {id: 1, title: 'Книги', value: 'books'},
  {id: 2, title: 'Аудиокниги', value: 'audioBooks'}
]

const LetterListPage = () => {
  const router = useRouter()
  const isBook = router.query?.type === 'books' || router.query?.type === 'audioBooks'

  const {books} = useSelector(state => state.book)

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

        {books?.length ?
          <table className={styles.table}>
            {books?.map(i =>
              <tr key={i?.id}>
                <td>{i?.title}</td>
                <td>Саймон Стронг</td>
                <td><Stars /> 8,1 (450)</td>
              </tr>
            )}
          </table> :
          <p className="empty">{isBook ? 'Книг не найдено' : 'Автора не найдены'}</p>
        }
      </div>
    </div>
  );
};

export default LetterListPage;
