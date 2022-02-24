import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '../../public/chevron-right.svg';
import Categories from '../HomePage/Categories';
import Book from '../shared/common/book';
import DropDownArrow from '../../public/chevron-down.svg';
import ShowAll from '../shared/common/showAll/ShowAll';

import st from './author.module.scss';
import {useSelector} from "react-redux";

const AuthorPage = () => {
  const bookSeries = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
  const compilationsBook = [
    { id: '0', title: 'Что читает Дэниел Рэдклифф' },
    {
      id: '1',
      title:
        'Ход королевы: книги, в которых фигурируют Ход королевы: книги, в которых фигурируют',
    },
    { id: '2', title: 'Дружба в книгах' },
    // { id: '3', title: 'Что читает Дэниел Рэдклифф' },
  ];
  const outOfSeries = [{ id: '0' }, { id: '1' }, { id: '2' }];

  const authors = [
    {
      id: '0',
      img: '/reviewsBookCovers/author.png',
      name: 'Дэн Браун',
      count: '17',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/author.png',
      name: 'Джордж Мартин',
      count: '28',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/author.png',
      name: 'Нил Гейман',
      count: '23',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/author.png',
      name: 'Дмитрий Глуховницкий',
      count: '17',
    },
  ];

  const { author } = useSelector(state => state.author)

  const [showMore, setShowMore] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  const setTimeOut = () => {
    setTimeout(() => setShowPopUp(false), 5000);
  };

  const handleClick = () => {
    setShowPopUp(true);
    setTimeOut();
  };

  return (
    <div className="container">
      <div className={st.wrapper}>
        <div className={st.centralBlock}>
          <div className={st.wrapper}>
            <div className={st.filters}>
              <div className={st.authorImg}>
                <Image
                  src={author?.avatar || '/preview.jpg'}
                  width={180}
                  height={275}
                  alt=""
                />
              </div>
            </div>
            <div className={st.authorInfo}>
              <h1 className={st.authorInfoName}>{author?.author}</h1>
              <p className={st.authorInfoCount}>
                <span>{author?.books_count}</span> книг
              </p>
              <button className={st.authorInfoBtn} onClick={handleClick}>
                {showPopUp ? (
                  <span>В моих книгах</span>
                ) : (
                  <span>Добавить в избранное</span>
                )}
              </button>
              <p
                className={classnames(st.authorBiography, {
                  [st.authorBiographyHide]: !showMore,
                })}
              >
                {author?.about || 'Нет информации'}
              </p>
              {author?.about?.length > 550 &&
                <span
                  className={st.showMoreLink}
                  onClick={onShowMore}
                >
                  Показать полностью
                  <DropDownArrow
                    className={classnames(st.dropDownArrow, {
                      [st.up]: showMore,
                    })}
                  />
                </span>
              }
            </div>
          </div>
          <div className={st.wrapperMain}>
            <Categories />

            <div className={st.mainBlok}>
              {author?.series?.length ? 
                author?.series?.map(i => (
                  <div
                    key={i?.id}
                    className={st.series}
                  >
                    <Link href={`/series?id=${i?.id}`}>
                      <a>
                        <h2 className={st.seriesTitle}>Серия книг: {i?.series}</h2>
                      </a>
                    </Link>
                    <ul className={st.seriesList}>
                      {i?.books?.map(i => (
                        <li
                          key={i?.id} 
                          className={st.seriesListBook}
                        >
                          <Book
                            book={i}
                            type={i?.type}
                            classNames={st.seriesListBookItem}
                            similar={true} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )) : null
              }

              {author?.books?.length ? 
                <div className={st.selection}>
                  <h2 className={st.selectionTitle}>Книги вне серий</h2>
                  <ul className={st.selectionList}>
                    {author?.books?.map(i => (
                      <li
                        key={i?.id}
                        className={st.selectionListBook}
                      >
                        <Book
                          book={i}
                          type={i?.type}
                          classNames={st.selectionListBookItem}
                          similar={true}
                        />
                      </li>
                    ))}
                  </ul>
                </div> : null
              }

              {author?.audio_books?.length ? 
                <div className={st.selection}>
                  <h2 className={st.selectionTitle}>Аудиокниги автора</h2>
                  <ul className={st.selectionList}>
                    {author?.audio_books?.map(i => (
                      <li
                        key={i?.id}
                        className={st.selectionListBook}
                      >
                        <Book
                          book={i}
                          type={i?.type}
                          audio={true}
                          classNames={st.selectionListBookItem}
                          similar={true}
                        />
                      </li>
                    ))}
                  </ul>
                </div> : null
              }

              {author?.compilation?.length ? 
                <div className={st.compil}>
                  <ShowAll title="Подборки" url="/selections" />
                  <div className={st.compilBlock}>
                    {author?.compilation?.map(i => (
                      <div key={i?.id}>
                        <div className={st.compilBookCover}>
                          <Image
                            src="/horizontalBookCovers/bookCover2.png"
                            width={180}
                            height={108}
                            alt=""
                          />
                          <div className={st.compilBookCoverStat}>
                            <span>15</span>
                            <span>книг</span>
                          </div>
                        </div>
                        <h4 className={st.compilBookTitle}>{i?.title}</h4>
                      </div>
                    ))}
                  </div>
                </div> : null
              }

              <div className={st.selection}>
                <Link href="/reviews">
                  <a>
                    <h2 className={st.seriesTitle}>Рецензии</h2>
                  </a>
                </Link>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Рецензии из книг</h3>
                  <p>{author?.author_reviews_count}</p>
                </div>
              </div>

              <div className={classnames(st.selection, st.quotes)}>
                <Link href="/quotes">
                  <a>
                    <h2 className={st.seriesTitle}>Цитаты</h2>
                  </a>
                </Link>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Цитаты из книг</h3>
                  <p>{author?.author_quotes_count}</p>
                </div>
              </div>

              {author?.similar_authors?.length ?
                <div className={st.similarAuthors}>
                  <ShowAll title="Похожие авторы" url="#" />
                  <ul className={st.selectionList}>
                    {author?.similar_authors?.map(i => (
                      <li
                        key={i?.id}
                        className={classnames(st.selectionListBook, st.defolt)}
                      >
                        <Image
                          src={i?.img}
                          width={129}
                          height={195}
                          alt={i?.name}
                        />
                        <h3 className={st.selectionListBookAuthor}>{i?.name}</h3>
                        <p className={st.selectionListBookCount}>
                          {i?.count}
                          <span> книг</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div> : null
              }
            </div>
          </div>
        </div>
        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
      {showPopUp && (
        <div className={st.popUp}>
          <p>
            Вы можете найти автора в разделе{' '}
            <Link href="#">
              <a className={st.popUpLink}>Мои Книги</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
