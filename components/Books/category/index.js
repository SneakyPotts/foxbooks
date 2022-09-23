import React, {useMemo, useState} from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';
import MyPagination from '../../shared/common/MyPagination';
import Breadcrumbs from '../../BreadCrumps/BreadCrumps';
import MobileFilterModal from './../../MobileFilterModal'
import st from './category.module.scss';
import debounce from 'lodash.debounce';

const data = [
  {
    title: 'Последние поступления',
    defaultValue: 1,
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

const mobileFilters = [
  {
    option: 'Автор',
    placeholder: 'Найти автора',
    queryName: 'findByAuthor'
  },
  {
    option: 'Книга',
    placeholder: 'Найти книгу',
    queryName: 'findByTitle'
  },
  {
    option: 'Издательство',
    placeholder: 'Найти издательство',
    queryName: 'findByPublisher'
  },
]

const Category = () => {
  const router = useRouter();
  const { type, slug } = router.query

  const [stateIndex, setStateIndex] = useState(null);

  const flagSwitcher = useMemo(() => {
    return router.query['showType'] === 'list'
  }, [router.query])

  const { categories, books } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const currentCategory = categories?.find(
    i => i?.slug == slug
  )?.name;

  const setQuery = (value, queryName) => {
    router.push(
      { query: { ...router.query, [queryName]: encodeURI(value) } },
      null,
      { scroll: false }
    );
  };

  const handleChange = debounce(setQuery, 300);

  return (
    <div className="container">
      <Breadcrumbs
        data={[
          {
            path: `/${type}`,
            title: type === 'books' ? 'Книги' : 'Аудиокниги'
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
                ))
              }
              {innerWidthWindow < 1024 &&
                <MobileFilterModal category={true}>
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
                  {mobileFilters.map((i, index) =>
                    <div
                      key={index}
                      className={st.filterItem}
                    >
                      <span className={st.line}/>
                      <span className={st.filterTitle}>{i.option}</span>
                      <input
                        placeholder={i?.placeholder}
                        className={st.input}
                        onChange={ev => handleChange(ev.target.value, i?.queryName)}
                      />
                    </div>
                  )}
                </MobileFilterModal>
              }
              <Switcher
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
                          key={book?.id}
                          audio={type === 'audiobooks'}
                          flagSwitcher={flagSwitcher}
                          book={book}
                          type={book?.type}
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
          </div>
        </div>

        <div
          className={classnames(
            st.advertisingBlok,
            {[st.list]: flagSwitcher}
          )}
        >
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
