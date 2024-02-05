import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../BreadCrumps/BreadCrumps';
import Popular from '../../Filter/Popular/Popular';
import About from '../../HomePage/About';
import SideFilters from '../../SideFilters';
import Switcher from '../../switcher/Switcher';
import MobileFilterModal from './../../MobileFilterModal';
import classnames from 'classnames';
import debounce from 'lodash.debounce';
import { useLocalStorage } from 'usehooks-ts';

import cssBook from '../../shared/common/book/book.module.scss';
import st from './category.module.scss';

import Banners from '../../shared/common/Banner/Banners';
import MyPagination from '../../shared/common/MyPagination';
import Book from '../../shared/common/book';

const mobileFilters = [
  {
    option: 'Автор',
    placeholder: 'Найти автора',
    queryName: 'findByAuthor',
  },
  {
    option: 'Книга',
    placeholder: 'Найти книгу',
    queryName: 'findByTitle',
  },
  {
    option: 'Издательство',
    placeholder: 'Найти издательство',
    queryName: 'findByPublisher',
  },
];

const Category = ({ order, current }) => {
  const [showType, setShowType] = useLocalStorage('categoryShowType', 'block');

  const router = useRouter();
  const { books_type, page } = router.query;

  const [stateIndex, setStateIndex] = useState(null);
  const data = [
    {
      title: order?.[0]?.title,
      defaultValue: order?.[0]?.value,
      options: order,
      queryName: 'sortBy',
    },
  ];

  const { books, infoBlocks } = useSelector((state) => state.book);
  const { innerWidthWindow } = useSelector((state) => state.common);

  const setQuery = (value, queryName) => {
    router.push({ query: { ...router.query, [queryName]: encodeURI(value) } }, null, { scroll: false });
  };

  const handleChange = debounce(setQuery, 300);

  useEffect(() => {
    setShowType('block');

    books_type === 'audiobooks' && mobileFilters.pop();

    return () => localStorage.removeItem('categoryShowType');
  }, []);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            path: `/${books_type}`,
            title: books_type === 'books' ? 'Книги' : 'Аудиокниги',
          },
          { path: router.asPath, title: current?.name },
        ]}
      />

      <div className={st.container}>
        <div className={st.wrapper}>
          <div className={st.head}>
            <h1 className={st.title}>{current?.name}</h1>
            <div>
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
              {innerWidthWindow < 1024 && (
                <MobileFilterModal>
                  {data.map((it, index) => (
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
                  {mobileFilters.map((i, index) => (
                    <div
                      key={index}
                      className={st.filterItem}
                    >
                      <span className={st.line} />
                      <span className={st.filterTitle}>{i.option}</span>
                      <input
                        placeholder={i?.placeholder}
                        className={st.input}
                        onChange={(ev) => handleChange(ev.target.value, i?.queryName)}
                      />
                    </div>
                  ))}
                </MobileFilterModal>
              )}
              <Switcher
                flagSwitcher={showType === 'list'}
                isCategory
              />
            </div>
          </div>
          <div className={classnames(st.mainBlock, { [st.info]: !!infoBlocks?.length })}>
            {innerWidthWindow >= 1024 && <SideFilters />}
            <div className="booksWrapper">
              {books?.data?.length ? (
                <>
                  <div
                    className={classnames({
                      [st.booksGrid]: showType === 'block',
                      [st.booksColumn]: showType === 'list',
                      [cssBook.mobileTitle]: innerWidthWindow <= 768,
                    })}
                  >
                    {books.data.map((book) => (
                      <Book
                        key={book?.id}
                        audio={books_type === 'audiobooks'}
                        flagSwitcher={showType === 'list'}
                        isCategory
                        book={book}
                        type={book?.type}
                      />
                    ))}
                  </div>

                  {books?.last_page > 1 && (
                    <MyPagination
                      lastPage={books?.last_page}
                      customLink={router.asPath}
                    />
                  )}
                </>
              ) : (
                <p className="empty">Книги не найдены</p>
              )}
            </div>
          </div>
        </div>

        <div className={classnames(st.advertisingBlok, { [st.list]: showType === 'list' })}>
          {/*<div className={st.bannerBlock}>*/}
          {/*  <img src="/banner.png" alt="" className={st.banner} />*/}
          {/*</div>*/}
          <Banners />
        </div>
      </div>

      {!!infoBlocks?.length && !(page > 1) && <About data={infoBlocks} />}
    </div>
  );
};

export default Category;
