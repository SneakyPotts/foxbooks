import React from 'react';
import {useSelector} from "react-redux";
import Link from 'next/link'
import classnames from 'classnames';
import st from './categories.module.scss';

const CategoriesPage = () => {
  const { categories, audioCategories } = useSelector(state => state.book)

  return (
    <div className={classnames('container', st.container)}>
      <div className={classnames(st.categories, st.wrapper)}>
        <h2 className={st.categoriesTitle}>Категории книг</h2>
        <ul className={st.categoriesList}>
          {categories.map(cat => (
            <li key={cat.id} className={st.categoriesListItem}>
              <Link href={`/books/${cat.id}?type=books&showType=block&sortBy=1`}>
                <a className={st.categoriesLink}>
                  {cat.name}
                  <span>{cat.books_count}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={st.categories}>
        <h2 className={st.categoriesTitle}>Категории аудиокниг</h2>
        <ul className={st.categoriesList}>
          {audioCategories.map(cat => (
            <li key={cat.id} className={st.categoriesListItem}>
              <Link href={`/books/${cat.id}?type=audioBooks&showType=block&sortBy=1`}>
                <a className={st.categoriesLink}>
                  {cat.name}
                  <span>{cat.books_count}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
