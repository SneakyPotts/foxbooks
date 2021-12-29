import React from 'react';
import Book from '../shared/common/book';

import st from './series.module.scss';

const SeriesPage = () => {
  const books = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
  return (
    <div className="container">
      <h2 className={st.title}>Серия “Гарри Поттер”</h2>
      <p className={st.amount}>7 книг</p>
      <div className={st.wrapper}>
        <div className={st.booksColumn}>
          {books.map(book => (
            <Book key={book.id} flagSwitcher={true} />
          ))}
        </div>
        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;
