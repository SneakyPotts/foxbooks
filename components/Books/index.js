import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import MobileFilterModal from '../MobileFilterModal';
import st from './books.module.scss';
import classnames from 'classnames';

import Button from '../shared/common/Button/Button';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import ShowAll from '../shared/common/showAll/ShowAll';
import Grid from '../shared/icons/navMenu/grid';

const Books = ({ booksType, order }) => {
  const router = useRouter();
  const type = booksType;

  const [catsIsVisible, setCatsIsVisible] = useState(false);

  const { categories } = useSelector((state) => state.book);
  const { innerWidthWindow } = useSelector((state) => state.common);

  const cats = categories; /*?.slice(0, 13)*/

  const showCategories = () => {
    setCatsIsVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const hideCategories = () => {
    setCatsIsVisible(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={classnames('container', st.abContainer)}>
      <Breadcrumbs
        data={[
          {
            path: type === 'books' ? `/books` : '/audiobooks',
            title: type === 'books' ? 'Книги' : 'Аудиокниги',
          },
        ]}
      />

      <h1 className={st.abTitle}>{type === 'books' ? 'Книги' : 'Аудиокниги'}</h1>

      <div className={st.mobWrapper}>
        {innerWidthWindow > 768 && (
          <>
            {cats?.map((i) => (
              <span key={i?.id} className={st.abCateg}>
                <Link href={`/${type === 'books' ? type : 'audiobooks'}/${i?.slug}`}>
                  <a className={st.abCategLink}>{i?.name}</a>
                </Link>
              </span>
            ))}
            {/*<ShowAll url="/categories" text="Показать все"/>*/}
            <BookFilters filters={order} />
          </>
        )}

        {innerWidthWindow <= 768 && (
          <>
            <div className={st.mobCateg} onClick={showCategories}>
              Категории
              <span>
                <Grid />
              </span>
            </div>

            <MobileFilterModal>
              <BookFilters onModal />
            </MobileFilterModal>
          </>
        )}
      </div>

      <BooksMainBlock audio={type === 'audioBooks'} />

      {innerWidthWindow <= 768 && catsIsVisible && (
        <ModalWindow onClose={hideCategories} isFullScreen>
          <h2 className={classnames(st.abTitle, st.modalTitle)}>Категории</h2>
          <ul className={st.mobCategList}>
            {cats?.map((cat) => (
              <li key={cat?.id} className={st.mobCategListItem}>
                <Link href={`/${type === 'books' ? type : 'audiobooks'}/${cat?.slug}`}>
                  <a className={st.mobCategLink}>
                    {cat?.name}
                    <span>{cat?.books_count}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="modalMobileWrapper">
            <Button text={'Посмотреть'} click={() => router.push('/categories')} classNames="modalMobileBtn" />
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default Books;
