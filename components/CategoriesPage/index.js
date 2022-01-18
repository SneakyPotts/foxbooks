import React from 'react';
import classnames from 'classnames';
import categories from '../data/categories.json';
import st from './categories.module.scss';

const CategoriesPage = () => {
  return (
    <div className={classnames('container', st.container)}>
      <div className={classnames(st.categories, st.wrapper)}>
        <h2 className={st.categoriesTitle}>Категории книг</h2>
        <ul className={st.categoriesList}>
          {categories.map(cat => (
            <li key={cat.id} className={st.categoriesListItem}>
              {cat.category}
              <span>7892</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={st.categories}>
        <h2 className={st.categoriesTitle}>Категории аудиокниг</h2>
        <ul className={st.categoriesList}>
          {categories.map(cat => (
            <li key={cat.id} className={st.categoriesListItem}>
              {cat.category}
              <span>715</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
