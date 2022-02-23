import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import MobalModal from '../shared/common/mobalModal';
import st from './books.module.scss';

const Books = () => {
  const router = useRouter();
  const type = router.query?.type

  const { categories } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const cats = categories?.slice(0, 13) || []

  return (
    <div className={classnames('container', st.abContainer)}>
      <Breadcrumbs
        data={[{
          path: `/books?type=${type}&sortBy=1`,
          title: type === 'books' ? 'Книги' : 'Аудиокниги'
        }]}
      />
      <h2 className={st.abTitle}>{type === 'books' ? 'Книги' : 'Аудиокниги'}</h2>
      {innerWidthWindow < 768 && <MobalModal />}
      {innerWidthWindow >= 768 && (
        <>
          {cats?.map(i => (
            <button key={i?.id} className={st.abCateg}>
              <Link href={`/books/${i?.id}?type=${type}&showType=block&sortBy=1`}>
                <a className={st.abCategLink}>
                  {i?.name}
                </a>
              </Link>
            </button>
          ))}
          <ShowAll url="/categories" text="Показать все" />
          <BookFilters />
        </>
      )}

      <BooksMainBlock audio={router.query?.type === 'audioBooks'} />
    </div>
  );
};

export default Books;
