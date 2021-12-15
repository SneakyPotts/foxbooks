import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import categories from '../data/categories.json';

import st from './books.module.scss';

const Books = () => {
  return (
    <div className={classnames('container', st.abContainer)}>
      {/* <Breadcrumbs data={breadcrumbsData} /> */}

      <h2 className={st.abTitle}>Книги</h2>
      {categories.map(({ id, category }) => (
        <button key={id} className={st.abCateg}>
          <Link href={`/books/${id}`}>
            <a className={st.abCategLink}>{category}</a>
          </Link>
        </button>
      ))}
      <ShowAll />
      <BookFilters />
      <BooksMainBlock />
    </div>
  );
};

export default Books;
