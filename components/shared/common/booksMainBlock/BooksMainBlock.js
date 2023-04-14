import React from 'react';
import { useSelector } from 'react-redux';

import Banners from '../Banner/Banners';
import MyPagination from '../MyPagination';
import Book from '../book';

import st from './booksMainBlock.module.scss';

const BooksMainBlock = ({ audio }) => {
  const { books } = useSelector((state) => state.book);

  return (
    <div className={st.mainBlock}>
      <div className="booksWrapper">
        {books?.data?.length ? (
          <>
            <div className={st.booksGrid}>
              {books?.data?.map((book) => (
                <Book key={book.id} audio={audio} book={book} />
              ))}
            </div>
            <MyPagination currentPage={books?.current_page} lastPage={books?.last_page} />
          </>
        ) : (
          <p className="empty">Книги не найдены</p>
        )}
      </div>
      <div className={st.advertisingBlok}>
        <Banners />
      </div>
    </div>
  );
};

export default BooksMainBlock;
