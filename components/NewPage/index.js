import Image from 'next/image';
import { useRouter } from 'next/router';

import React from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import MobileFilterModal from '../MobileFilterModal';
import styles from '../Selections/selections.module.scss';
import st from './newPage.module.scss';

import Banners from '../shared/common/Banner/Banners';
import MyPagination from '../shared/common/MyPagination';
import Book from '../shared/common/book';
import BookFilters from '../shared/common/booksFilters/BookFilters';

const sortFilters = [
  { id: 1, title: 'Последние поступления', value: 1 },
  { id: 2, title: 'Популярные', value: 5 },
];

const typeFilters = [
  { id: 1, title: 'Все', value: 'all' },
  { id: 2, title: 'Книги', value: 'books' },
  { id: 3, title: 'Аудиокниги', value: 'audioBooks' },
];

const NewPage = () => {
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { novelties } = useSelector((state) => state.novelties);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            title: 'Новинки',
            path: router.asPath,
          },
        ]}
      />

      <h1 className="title">Новинки</h1>

      <div className={st.wrapper}>
        <div className={st.main}>
          {innerWidthWindow > 768 && (
            <div className={st.filters}>
              <BookFilters filters={sortFilters} queryName={'sortBy'} />
              <BookFilters filters={typeFilters} queryName={'type'} />
            </div>
          )}

          {innerWidthWindow <= 768 && (
            <div className={st.filters}>
              <MobileFilterModal>
                <span className={styles.filterTitle}>Категория</span>
                <BookFilters filters={sortFilters} queryName={'sortBy'} onModal />
                <span className={styles.filterLine} />
                <span className={styles.filterTitle}>Тип</span>
                <BookFilters filters={typeFilters} queryName={'type'} onModal />
              </MobileFilterModal>
            </div>
          )}

          {novelties?.data?.length ? (
            <>
              <div className={st.grid}>
                {novelties?.data?.map((i) => (
                  <div key={i?.id}>
                    <Book book={i} type={i?.type} audio={i?.type === 'audioBooks'} />
                  </div>
                ))}
              </div>
              <MyPagination lastPage={novelties?.last_page} />
            </>
          ) : (
            <p className="empty">Книги не найдены</p>
          )}
        </div>

        <div className={st.advertisingBlok}>
          <Banners />
        </div>
      </div>

      <div className={st.mountains}>
        <Image src="/mountains.png" width={1200} height={400} alt="" />
      </div>
    </div>
  );
};

export default NewPage;
