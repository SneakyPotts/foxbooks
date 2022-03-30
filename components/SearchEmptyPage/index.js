import React from 'react';
import s from './styles.module.scss';
import classNames from "classnames";
import Book from "../shared/common/book";
import Link from 'next/link';

const SearchEmptyPage = () => {
  const mock = new Array(6).fill(1)

  const repeatHandler = () => {
    document.querySelector('header input').click()
    document.querySelector('header input').focus()
  }

  return (
    <div className={classNames("container", s.container)}>
      <div className={s.center}>
        <h2 className="title">Ничего не найдено</h2>
        <p className={s.text}>Извините, не удалось обработать ваш запрос.</p>
        <p className={s.text}>
          Пожалуйста,&nbsp;
          <span
            onClick={repeatHandler}
          >
            повторите еще раз
          </span>&nbsp;
          или воспользуйтесь&nbsp;
          <Link href={'/categories'}>
            <a>
              <span>
                категориями.
              </span>
            </a>
          </Link>
        </p>
      </div>

      <h2 className="title">Книги, которые могут вам понравиться</h2>
      <div className={s.grid}>
        {mock?.length > 0 && mock.map(i =>
          <Book />
        )}
      </div>
    </div>
  );
};

export default SearchEmptyPage;