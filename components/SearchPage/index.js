import React, {useState} from 'react';
import s from './styles.module.scss';
import BookFilters from "../shared/common/booksFilters/BookFilters";
import {useSelector} from "react-redux";
import Popular from "../Filter/Popular/Popular";
import st from "../NewPage/newPage.module.scss";
import classNames from "classnames";
import Book from "../shared/common/book";
import AuthorCard from "../AuthorCard";
import CompilationItem from "../CompilationItem";
import ShowAll from "../shared/common/showAll/ShowAll";
import SeriesCard from "../SeriesCard";

const filters = [
  { id: 1, title: 'Все', value: 1 },
  { id: 2, title: 'Книги', value: 2 },
  { id: 3, title: 'Аудиокниги', value: 3 },
  { id: 4, title: 'Авторы', value: 4 },
  { id: 5, title: 'Подборки', value: 5 },
];

const mobileFilters = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      {id: 1, title: 'Все', value: 1},
      {id: 2, title: 'Книги', value: 2},
      {id: 3, title: 'Аудиокниги', value: 3},
      {id: 4, title: 'Авторы', value: 4},
      {id: 5, title: 'Подборки', value: 5},
    ],
    queryName: 'sortBy',
  },
];

const SearchPage = () => {
  const { innerWidthWindow } = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)

  const mock = new Array(8).fill(1)

  return (
    <div className={classNames("container", s.container)}>
      <h1 className="title">Результаты поиска</h1>

      <div className={s.filters}>
        {innerWidthWindow > 768 &&
          <BookFilters
            filters={filters}
            queryName={'sortBy'}
          />
        }

        {innerWidthWindow <= 768 &&
          mobileFilters?.map((i, index) => (
            <Popular
              key={index + 1}
              title={i?.title}
              defaultValue={i?.defaultValue}
              data={i?.options}
              queryName={i?.queryName}
              filterStateIdx={stateIndex}
              elIdx={1}
              setFilStateIdx={setStateIndex}
            />
          ))
        }
      </div>

      <div className={s.wrapper}>
        <div className={s.main}>
          <section className={s.mainSection}>
            <div className={s.titleWrapper}>
              <h2 className="title">Книги</h2>
              <ShowAll
                url={'/'}
                externalClass={s.onlyMobile}
              />
            </div>

            <div className={s.grid}>
              {/*{mock?.length > 0 && mock.map(i =>*/}
              {/*  <Book />*/}
              {/*)}*/}
            </div>

            <ShowAll
              url={'/'}
              externalClass={s.onlyDesctop}
              arrowSecondary
            />
          </section>

          <section className={s.mainSection}>
            <div className={s.titleWrapper}>
              <h2 className="title">Аудиокниги</h2>
              <ShowAll
                url={'/'}
                externalClass={s.onlyMobile}
              />
            </div>

            <div className={s.grid}>
              {/*{mock?.length > 0 && mock.map(i =>*/}
              {/*  <Book*/}
              {/*    audio*/}
              {/*  />*/}
              {/*)}*/}
            </div>

            <ShowAll
              url={'/'}
              externalClass={s.onlyDesctop}
              arrowSecondary
            />
          </section>

          <section className={s.mainSection}>
            <div className={s.titleWrapper}>
              <h2 className="title">Авторы</h2>
              <ShowAll
                url={'/'}
                externalClass={s.onlyMobile}
              />
            </div>

            <div className={s.grid}>
              {mock?.length > 0 && mock.map(i =>
                <AuthorCard

                />
              )}
            </div>

            <ShowAll
              url={'/'}
              externalClass={s.onlyDesctop}
              arrowSecondary
            />
          </section>

          <section className={s.mainSection}>
            <div className={s.titleWrapper}>
              <h2 className="title">Подборки</h2>
              <ShowAll
                url={'/'}
                externalClass={s.onlyMobile}
              />
            </div>

            <div className={classNames(s.grid, s.gridFull)}>
              {/*{mock?.length > 0 && mock.map(i =>*/}
              {/*  <CompilationItem*/}
              {/*    path={'/'}*/}
              {/*    isMini*/}
              {/*  />*/}
              {/*)}*/}
            </div>

            <ShowAll
              url={'/'}
              externalClass={s.onlyDesctop}
              arrowSecondary
            />
          </section>

          <section className={s.mainSection}>
            <div className={s.titleWrapper}>
              <h2 className="title">Cерии</h2>
              <ShowAll
                url={'/'}
                externalClass={s.onlyMobile}
              />
            </div>

            <div className={s.grid}>
              {mock?.length > 0 && mock.map(i =>
                <SeriesCard />
              )}
            </div>

            <ShowAll
              url={'/'}
              externalClass={s.onlyDesctop}
              arrowSecondary
            />
          </section>
        </div>

        <div className={classNames(st.advertisingBlok, s.advertisingBlok)}>
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

export default SearchPage;