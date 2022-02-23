import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';
import MyPagination from '../../shared/common/MyPagination';
import Breadcrumbs from '../../BreadCrumps/BreadCrumps';
import MobalModal from '../../shared/common/mobalModal';
import st from './category.module.scss';

const data = [
  {
    title: 'Последние поступления',
    defaultValue: 4,
    options: [
      { id: 1, title: 'Последние поступления', value: 1 },
      { id: 2, title: 'Популярные', value: 3 },
      { id: 3, title: 'Бестселлеры', value: 5 },
      { id: 4, title: 'По отзывам', value: 4 },
      { id: 5, title: 'Сейчас читают', value: 2 },
    ],
    queryName: 'sortBy',
  },
];

const Category = () => {
  const router = useRouter();
  const type = router.query?.type

  const [stateIndex, setStateIndex] = useState(null);
  const [flagSwitcher, setFlagSwitcher] = useState(
    router.query['showType'] === 'list'
  );

  const { categories, books } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const currentCategory = categories?.find(
    i => i?.id == router?.query?.id
  )?.name;

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            path: `/books?type=${type}&sortBy=1`,
            title: type === 'books' ? 'Книги' : 'Аудиокниги'
          },
          { path: router.asPath, title: currentCategory },
        ]}
      />
      <div className={classnames(st.head, { [st.headActive]: flagSwitcher })}>
        <h2 className={st.title}>{currentCategory}</h2>
        <div>
          {innerWidthWindow < 1024 && <MobalModal />}
          {innerWidthWindow >= 1024 &&
            data.map((it, index) => (
              <Popular
                key={index}
                title={it?.title}
                defaultValue={it?.defaultValue}
                data={it?.options}
                queryName={it?.queryName}
                filterStateIdx={stateIndex}
                elIdx={index}
                setFilStateIdx={setStateIndex}
              />
            ))}
          <Switcher
            setFlagSwitcher={setFlagSwitcher}
            flagSwitcher={flagSwitcher}
          />
        </div>
      </div>

      <div className={st.mainBlock}>
        {innerWidthWindow >= 1024 && <SideFilters />}
        <div className="booksWrapper">
          {
            books?.data?.length ? (
              <>
                <div
                  className={classnames({
                    [st.booksGrid]: !flagSwitcher,
                    [st.booksColumn]: flagSwitcher,
                  })}
                >
                  {books.data.map(book => (
                    <Book
                      key={book.id}
                      audio={router.query?.type === 'audioBooks'}
                      flagSwitcher={flagSwitcher}
                      book={book}
                    />
                  ))}
                </div>
                <MyPagination lastPage={books?.last_page} />
              </>
            ) : (
              <p className="empty">Книги не найдены</p>
            )
          }
        </div>
        <div className={st.advertisingBlok}>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
