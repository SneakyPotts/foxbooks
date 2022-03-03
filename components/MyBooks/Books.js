import React from 'react';
import styles from './styles.module.scss'
import Popular from "../Filter/Popular/Popular";

const data = [
  {
    title: 'Популярные',
    defaultValue: 4,
    options: [
      { id: 2, title: 'Популярные', value: 3 },
      { id: 5, title: 'По дате добавления', value: 2 },
      { id: 5, title: 'По алфавиту', value: 2 }
    ],
    queryName: 'sortBy',
  },
];

const Books = () => {
  return <>
    <div className={styles.filters}>
      <div>
        <span className={styles.filtersText}>Статус</span>
        <Popular />
      </div>
      <div>
        search
        <Popular

        />
      </div>
    </div>
  </>
};

export default Books;