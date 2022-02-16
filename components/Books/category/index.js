import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';
import MyPagination from '../../shared/common/MyPagination';
import Breadcrumbs from '../../BreadCrumps/BreadCrumps';
import ModalWindow from '../../shared/common/modalWindow/ModalWindow';
import Filters from '../../shared/icons/filters';
import Button from '../../shared/common/Button/Button';
import CrossInCircle from '../../shared/icons/crossInCircle';
import st from './category.module.scss';

import books from '../../data/books.json';
import categories from '../../data/categories.json';

const data = [
  {
    title: 'Последние поступления',
    defaultValue: 4,
    options: [
      { id: 1, title: 'Последние поступления', value: 4 },
      { id: 2, title: 'Популярные', value: 3 },
      { id: 3, title: 'Бестселлеры', value: 5 },
      { id: 4, title: 'По отзывам', value: 1 },
      { id: 5, title: 'Сейчас читают', value: 2 },
    ],
    queryName: 'sortBy',
  },
];

const Category = () => {
  const router = useRouter();
  const [stateIndex, setStateIndex] = useState(null);
  const [widthBlock, setWidthBlock] = useState(null);
  const [flagSwitcher, setFlagSwitcher] = useState(
    router.query['showType'] === 'list'
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState([
    {
      id: '0',
      flag: false,
      option: 'Автор',
      placeholder: 'Найти автора',
      queryName: 'findByAuthor',
      alphabetQuery: 'alphabetAuthorIndex',
    },
    {
      id: '1',
      flag: false,
      option: 'Книга',
      placeholder: 'Найти книгу',
      queryName: 'findByTitle',
      alphabetQuery: 'alphabetPublisherIndex',
    },
    {
      id: '2',
      flag: false,
      option: 'Издательство',
      placeholder: 'Найти издательство',
      queryName: 'findByPublisher',
      alphabetQuery: 'alphabetTitleIndex',
    },
  ]);

  // const { categories } = useSelector(state => state.book);
  // const {books } = useSelector(state => state.book);

  const { innerWidthWindow } = useSelector(state => state.common);

  const currentCategory = categories?.find(
    i => i?.id == router?.query?.id
  )?.name;

  const BlokRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setWidthBlock(BlokRef);
    }, 0);
  }, []);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          { path: '/books?sortBy=1', title: 'Книги' },
          { path: router.asPath, title: currentCategory },
        ]}
      />
      <div className={classnames(st.head, { [st.headActive]: flagSwitcher })}>
        <h2 className={st.title}>{currentCategory}</h2>
        <div>
          {innerWidthWindow <= 1024 && (
            <div onClick={() => setShowFilters(true)} className={st.mobalModal}>
              <div className={st.mobalModalFiltersMenu}>
                <div className={st.filters}>
                  <span>Фильтры</span>
                  <Filters />
                </div>
                <button>
                  Популярные
                  <CrossInCircle />
                </button>
              </div>
              {showFilters && (
                <ModalWindow
                  onClose={() => setShowFilters(false)}
                  isFullScreen={true}
                >
                  <div className={st.mobalModalHead}>
                    <p className={st.mobalModalTitle}>Фильтры</p>
                    <span className={st.filterCount}>2</span>
                    <p className={st.mobalModalFilters}>Очистить фильтры</p>
                  </div>
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
                  <ul className={st.filters}>
                    {filters?.map(it => (
                      <li key={it?.id} className={st.filterStatus}>
                        <button className={st.btn}>{it?.option}</button>
                        <div
                          className={st.dates}
                          onClick={e => e.stopPropagation()}
                        >
                          <input
                            placeholder={it?.placeholder}
                            className={st.input}
                            onChange={ev =>
                              handleChange(ev.target.value, it?.queryName)
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button
                    text="Посмотреть 262 предложения"
                    classNames={st.filtersBtn}
                  />
                </ModalWindow>
              )}
            </div>
          )}
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
          {innerWidthWindow >= 768 && (
            <div
              style={{
                width:
                  widthBlock?.current && `${widthBlock.current.clientWidth}px`,
                marginLeft: '24px',
              }}
            />
          )}
        </div>
      </div>

      <div className={st.mainBlock}>
        {innerWidthWindow >= 1024 && <SideFilters />}
        <div className="booksWrapper">
          {
            // books?.data?.length
            books ? (
              <>
                <div
                  className={classnames({
                    [st.booksGrid]: !flagSwitcher,
                    [st.booksColumn]: flagSwitcher,
                  })}
                >
                  {
                    // books?.data ?
                    books.map(book => (
                      <Book
                        key={book.id}
                        audio={router.query?.type === 'audioBooks'}
                        flagSwitcher={flagSwitcher}
                        book={book}
                      />
                    ))
                  }
                </div>
                <MyPagination lastPage={books?.last_page} />
              </>
            ) : (
              <p className="empty">Книги не найдены</p>
            )
          }
        </div>
        <div className={st.advertisingBlok} ref={BlokRef}>
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
