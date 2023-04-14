import Link from 'next/link';

import React, { useEffect } from 'react';

import classNames from 'classnames';

import s from './styles.module.scss';

import Book from '../shared/common/book';

const SearchEmptyPage = ({ books }) => {
  const repeatHandler = () => {
    document.querySelector('header input').click();
    document.querySelector('header input').focus();
  };

  useEffect(() => {
    repeatHandler();
  }, []);

  return (
    <div className={classNames('container', s.container)}>
      <div className={s.center}>
        <h2 className="title">Ничего не найдено</h2>
        <p className={s.text}>Извините, не удалось обработать ваш запрос.</p>
        <p className={s.text}>
          Пожалуйста,&nbsp;
          <span onClick={repeatHandler}>повторите еще раз</span>&nbsp; или воспользуйтесь&nbsp;
          <Link href={'/categories'}>
            <a>
              <span>категориями.</span>
            </a>
          </Link>
        </p>
      </div>

      <h2 className="title">Книги, которые могут вам понравиться</h2>
      <div className={s.grid}>{books?.length > 0 && books.map((i) => <Book key={i?.id} book={i} type={i?.type} />)}</div>
    </div>
  );
};

export default SearchEmptyPage;
