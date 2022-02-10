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
import st from './category.module.scss';

const data = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      { id: 1, title: 'Популярные', value: 3 },
      { id: 2, title: 'Высокий рейтинг', value: 3 },
      { id: 3, title: 'Много отзывов', value: 1 },
      { id: 4, title: 'Сейчас читают', value: 2 },
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

  const { categories, books } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);
  console.log(innerWidthWindow, 'innerWidthWindow');

  const currentCategory = categories?.find(
    i => i?.id == router?.query?.id
  )?.name;

  const BlokRef = useRef();

  useEffect(() => {
    setWidthBlock(BlokRef);
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
        {innerWidthWindow < 768 && (
          <div onClick={() => setShowFilters(true)}>
            <div>
              <span>Фильтры</span>
              <Filters />
            </div>
            <ModalWindow modal={showFilters} setModal={setShowFilters}>
              <p className={st.titleModal}>Фильтры</p>
              <p>Очистить фильтры</p>
            </ModalWindow>
          </div>
        )}
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
        <Switcher
          setFlagSwitcher={setFlagSwitcher}
          flagSwitcher={flagSwitcher}
        />
        <div
          style={{
            width: widthBlock?.current && `${widthBlock.current.clientWidth}px`,
            marginLeft: '24px',
          }}
        />
      </div>

      <div className={st.mainBlock}>
        {innerWidthWindow >= 768 && <SideFilters />}
        <div className="booksWrapper">
          {books?.data?.length ? (
            <>
              <div
                className={classnames({
                  [st.booksGrid]: !flagSwitcher,
                  [st.booksColumn]: flagSwitcher,
                })}
              >
                {books?.data?.map(book => (
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
          )}
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
