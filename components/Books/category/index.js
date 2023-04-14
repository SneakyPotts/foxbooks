import { useRouter } from 'next/router';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from '../../BreadCrumps/BreadCrumps';
import Popular from '../../Filter/Popular/Popular';
import SideFilters from '../../SideFilters';
import Switcher from '../../switcher/Switcher';
import MobileFilterModal from './../../MobileFilterModal';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

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

const Category = ({ order }) => {
  const router = useRouter();
  const { books_type, category_slug } = router.query;

  const [stateIndex, setStateIndex] = useState(null);
  const data = [
    {
      title: order?.[0]?.title,
      defaultValue: order?.[0]?.value,
      options: order,
      queryName: 'sortBy',
    },
  ];

  const flagSwitcher = useMemo(() => {
    return router.query['showType'] === 'list';
  }, [router.query]);

  const { categories, books } = useSelector((state) => state.book);
  const { innerWidthWindow } = useSelector((state) => state.common);

  const currentCategory = categories?.find((i) => i?.slug === category_slug)?.name;

  const setQuery = (value, queryName) => {
    router.push({ query: { ...router.query, [queryName]: encodeURI(value) } }, null, { scroll: false });
  };

  const handleChange = debounce(setQuery, 300);

  useEffect(() => {
    books_type === 'audiobooks' && mobileFilters.pop();
  }, []);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            path: `/${books_type}`,
            title: books_type === 'books' ? 'Книги' : 'Аудиокниги',
          },
          { path: router.asPath, title: currentCategory },
        ]}
      />

      <div className={st.container}>
        <div className={st.wrapper}>
          <div className={st.head}>
            <h2 className={st.title}>{currentCategory}</h2>
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
                    <div key={index} className={st.filterItem}>
                      <span className={st.line} />
                      <span className={st.filterTitle}>{i.option}</span>
                      <input placeholder={i?.placeholder} className={st.input} onChange={(ev) => handleChange(ev.target.value, i?.queryName)} />
                    </div>
                  ))}
                </MobileFilterModal>
              )}
              <Switcher flagSwitcher={flagSwitcher} />
            </div>
          </div>
          <div className={st.mainBlock}>
            {innerWidthWindow >= 1024 && <SideFilters />}
            <div className="booksWrapper">
              {books?.data?.length ? (
                <>
                  <div
                    className={classnames({
                      [st.booksGrid]: !flagSwitcher,
                      [st.booksColumn]: flagSwitcher,
                      [cssBook.mobileTitle]: innerWidthWindow <= 768,
                    })}
                  >
                    {books.data.map((book) => (
                      <Book key={book?.id} audio={books_type === 'audiobooks'} flagSwitcher={flagSwitcher} book={book} type={book?.type} />
                    ))}
                  </div>
                  <MyPagination lastPage={books?.last_page} />
                </>
              ) : (
                <p className="empty">Книги не найдены</p>
              )}
            </div>
          </div>
        </div>

        <div className={classnames(st.advertisingBlok, { [st.list]: flagSwitcher })}>
          {/*<div className={st.bannerBlock}>*/}
          {/*  <img src="/banner.png" alt="" className={st.banner} />*/}
          {/*</div>*/}
          <Banners />
        </div>
      </div>
    </div>
  );
};

export default Category;
