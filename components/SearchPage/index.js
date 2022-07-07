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
import {useRouter} from "next/router";

const filters = [
  { id: 1, title: 'Все', value: 1 },
  { id: 2, title: 'Книги', value: 2 },
  { id: 3, title: 'Аудиокниги', value: 3 },
  { id: 4, title: 'Авторы', value: 4 },
  { id: 5, title: 'Подборки', value: 5 },
  { id: 6, title: 'Серии', value: 6 },
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
      {id: 6, title: 'Серии', value: 6},
    ],
    queryName: 'sortBy',
  },
];

const SearchPage = ({data}) => {
  const {
    books,
    audio_books,
    authors,
    series,
    compilations
  } = data

  const router = useRouter()
  const { innerWidthWindow } = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)

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
          {(Number(router.query.sortBy) === 1 || Number(router.query.sortBy) === 2) ?
            books?.length > 0 ?
              <section className={s.mainSection}>
                <div className={s.titleWrapper}>
                  <h2 className="title">Книги</h2>
                  {/*<ShowAll*/}
                  {/*  text={'Показать ещё'}*/}
                  {/*  url={'/books?type=books&sortBy=1'}*/}
                  {/*  externalClass={s.onlyMobile}*/}
                  {/*/>*/}
                </div>

                <div className={s.grid}>
                  {books.map(i =>
                    <Book
                      key={i?.id}
                      book={i}
                      type={i?.type}
                    />
                  )}
                </div>

                {/*<ShowAll*/}
                {/*    text={'Показать ещё'}*/}
                {/*  url={'/books?type=books&sortBy=1'}*/}
                {/*  externalClass={s.onlyDesctop}*/}
                {/*  arrowSecondary*/}
                {/*/>*/}
              </section>
              :
              Number(router.query.sortBy) !== 1 && <p className="empty">Нет результатов</p>
            : null
          }

          {(Number(router.query.sortBy) === 1 || Number(router.query.sortBy) === 3) ?
            audio_books?.length > 0 ?
              <section className={s.mainSection}>
                <div className={s.titleWrapper}>
                  <h2 className="title">Аудиокниги</h2>
                  {/*<ShowAll*/}
                  {/*  text={'Показать ещё'}*/}
                  {/*  url={'/books?type=audioBooks&sortBy=1'}*/}
                  {/*  externalClass={s.onlyMobile}*/}
                  {/*/>*/}
                </div>

                <div className={s.grid}>
                  {audio_books.map(i =>
                    <Book
                      key={i?.id}
                      book={i}
                      type={i?.type}
                      audio
                    />
                  )}
                </div>

                {/*<ShowAll*/}
                {/*    text={'Показать ещё'}*/}
                {/*  url={'/books?type=audioBooks&sortBy=1'}*/}
                {/*  externalClass={s.onlyDesctop}*/}
                {/*  arrowSecondary*/}
                {/*/>*/}
              </section>
              :
              Number(router.query.sortBy) !== 1 && <p className="empty">Нет результатов</p>
            : null
          }

          {(Number(router.query.sortBy) === 1 || Number(router.query.sortBy) === 4) ?
            authors?.length > 0 ?
              <section className={s.mainSection}>
                <div className={s.titleWrapper}>
                  <h2 className="title">Авторы</h2>
                </div>

                <div className={s.grid}>
                  {authors.map(i =>
                    <AuthorCard
                      key={i?.id}
                      data={i}
                    />
                  )}
                </div>
              </section>
              :
              Number(router.query.sortBy) !== 1 && <p className="empty">Нет результатов</p>
            : null
          }

          {(Number(router.query.sortBy) === 1 || Number(router.query.sortBy) === 5) ?
            compilations?.length > 0 ?
              <section className={s.mainSection}>
                <div className={s.titleWrapper}>
                  <h2 className="title">Подборки</h2>
                  {/*<ShowAll*/}
                  {/*  text={'Показать ещё'}*/}
                  {/*  url={'/selections?selectionCategory=3&bookType=all&showType=list'}*/}
                  {/*  externalClass={s.onlyMobile}*/}
                  {/*/>*/}
                </div>

                <div className={classNames(s.grid, s.gridFull)}>
                  {compilations.map(i =>
                    <CompilationItem
                      key={i?.id}
                      data={i}
                      path={`/selections/${i?.id}`}
                      isMini
                    />
                  )}
                </div>

                {/*<ShowAll*/}
                {/*    text={'Показать ещё'}*/}
                {/*  url={'/selections?selectionCategory=3&bookType=all&showType=list'}*/}
                {/*  externalClass={s.onlyDesctop}*/}
                {/*  arrowSecondary*/}
                {/*/>*/}
              </section>
              :
              Number(router.query.sortBy) !== 1 && <p className="empty">Нет результатов</p>
            : null
          }

          {(Number(router.query.sortBy) === 1 || Number(router.query.sortBy) === 6) ?
            series?.length > 0 ?
              <section className={s.mainSection}>
                <div className={s.titleWrapper}>
                  <h2 className="title">Cерии</h2>
                </div>

                <div className={s.grid}>
                  {series.map(i =>
                    <SeriesCard
                      key={i?.id}
                      data={i}
                    />
                  )}
                </div>
              </section>
              :
              Number(router.query.sortBy) !== 1 && <p className="empty">Нет результатов</p>
            : null
          }

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