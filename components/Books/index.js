import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import Filters from '../shared/icons/filters';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import Popular from '../Filter/Popular/Popular';
import Button from '../shared/common/Button/Button';
import CrossInCircle from '../shared/icons/crossInCircle';
import Grid from '../shared/icons/navMenu/grid';

import st from './books.module.scss';

import categories from '../data/categories.json';

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

const Books = () => {
  const router = useRouter();
  // const { categories } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);
  const [showFilters, setShowFilters] = useState(false);
  const [stateIndex, setStateIndex] = useState(null);
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

  return (
    <div className={classnames('container', st.abContainer)}>
      <Breadcrumbs
        data={[{ path: '/books?type=books&sortBy=1', title: 'Книги' }]}
      />
      <h2 className={st.abTitle}>Книги</h2>
      {innerWidthWindow < 768 && (
        <div onClick={() => setShowFilters(true)} className={st.mobalModal}>
          <div className={st.mobalModalFiltersMenu}>
            <div className={st.filters}>
              <Link href="/categories">
                <a>
                  Категории
                  <div className={st.icon}>
                    <Grid />
                  </div>
                </a>
              </Link>
              <div>
                <span>Фильтры</span>
                <Filters />
              </div>
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
      {innerWidthWindow >= 768 && (
        <>
          {categories?.map(i => (
            <button key={i?.id} className={st.abCateg}>
              <Link href={`/books/${i?.id}?type=books&showType=block&sortBy=3`}>
                <a className={st.abCategLink}>
                  {/* {i?.name} */}
                  {i.category}
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
