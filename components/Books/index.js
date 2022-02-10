import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import st from './books.module.scss';

const Books = () => {
  const router = useRouter();
  const { categories } = useSelector(state => state.book);

  return (
    <div className={classnames('container', st.abContainer)}>
      <Breadcrumbs
        data={[{ path: '/books?type=books&sortBy=1', title: 'Книги' }]}
      />
      <h2 className={st.abTitle}>Книги</h2>
      {categories?.map(i => (
        <button key={i?.id} className={st.abCateg}>
          <Link href={`/books/${i?.id}?type=books&showType=block&sortBy=3`}>
            <a className={st.abCategLink}>{i?.name}</a>
          </Link>
        </button>
      ))}
      <ShowAll url="/categories" text="Показать все" />
      <BookFilters />
      <BooksMainBlock audio={router.query?.type === 'audioBooks'} />
    </div>
  );
};

export default Books;
