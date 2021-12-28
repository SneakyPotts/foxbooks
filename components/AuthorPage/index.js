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
    { id: '3', title: 'Что читает Дэниел Рэдклифф' },
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
                  src="/reviewsBookCovers/author.png"
                  width={180}
                  height={275}
                  alt=""
                />
              </div>
            </div>
            <div className={st.authorInfo}>
              <h1 className={st.authorInfoName}>Джоан Кэтлин Роулинг</h1>
              <p className={st.authorInfoCount}>
                <span>11</span>книг
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
                Джоан Роулинг — английская писательница, считается одним из
                самых успешных и высокооплачиваемых англоязычных авторов
                современности. Успех ей принесли книги в жанре фэнтези о Гарри
                Поттере и последующие экранизации этой серии. Джоан Роулинг
                работала секретарем, а затем учительницей английского языка.
                Идея романа о мальчике-волшебнике пришла ей совершенно случайно.
                Законченная рукопись была отправлена в 12 издательств и всеми
                отвергнута. Только через год книгу напечатали. Джоан Роулинг —
                английская писательница, считается одним из самых успешных и
                высокооплачиваемых англоязычных авторов современности. Успех ей
                принесли книги в жанре фэнтези о Гарри Поттере и последующие
                экранизации этой серии. Джоан Роулинг работала секретарем, а
                затем учительницей английского языка. Идея романа о
                мальчике-волшебнике пришла ей совершенно случайно. Законченная
                рукопись была отправлена в 12 издательств и всеми отвергнута.
                Только через год книгу напечатали. Джоан Роулинг — английская
                писательница, считается одним из самых успешных и
                высокооплачиваемых англоязычных авторов современности. Успех ей
                принесли книги в жанре фэнтези о Гарри Поттере и последующие
                экранизации этой серии.
              </p>
              <span
                className={classnames(st.showMoreLink)}
                onClick={onShowMore}
              >
                Показать полностью{' '}
                <DropDownArrow
                  className={classnames(st.dropDownArrow, {
                    [st.up]: showMore,
                  })}
                />
              </span>
            </div>
          </div>
          <div className={st.wrapperMain}>
            <Categories />
            <div className={st.mainBlok}>
              <div className={st.series}>
                <h2 className={st.seriesTitle}>Серия книг: Гарри Поттер</h2>
                <ul className={st.seriesList}>
                  {bookSeries.map(book => (
                    <li key={book.id} className={st.seriesListBook}>
                      <Book classNames={st.seriesListBookItem} similar={true} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={st.selection}>
                <h2 className={st.selectionTitle}>Книги вне серий</h2>
                <ul className={st.selectionList}>
                  {outOfSeries.map(book => (
                    <li key={book.id} className={st.selectionListBook}>
                      <Book
                        classNames={st.selectionListBookItem}
                        similar={true}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={st.selection}>
                <h2 className={st.selectionTitle}>Аудиокниги автора</h2>
                <ul className={st.selectionList}>
                  {outOfSeries.map(it => (
                    <li key={it.id} className={st.selectionListBook}>
                      <Book
                        audio={true}
                        classNames={st.selectionListBookItem}
                        similar={true}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={st.compilBlock}>
                <ShowAll title="Подборки" url="/selections" />
                <Swiper
                  spaceBetween={24}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: '.prevArrow',
                    nextEl: '.nextArrow',
                  }}
                  slidesPerView={3}
                >
                  {compilationsBook.map(book => (
                    <SwiperSlide key={book.id}>
                      <div>
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
                        <h4 className={st.compilBookTitle}>{book.title}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                  <button className={classnames('prevArrow', st.btnCompil)}>
                    <ArrowRight className="arrowNext" />
                  </button>
                  <button className={classnames('nextArrow', st.btnCompil)}>
                    <ArrowRight className="arrowNext" />
                  </button>
                </Swiper>
              </div>
              <div className={st.selection}>
                <Link href="/reviews">
                  <a>
                    <h2 className={st.selectionTitle}>Рецензии</h2>
                  </a>
                </Link>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Рецензии из книг</h3>
                  <p>2199</p>
                </div>
              </div>
              <div className={st.selection}>
                <h2 className={st.selectionTitle}>Цитаты</h2>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Цитаты из книг</h3>
                  <p>27697</p>
                </div>
              </div>
              <div className={st.similarAuthors}>
                <ShowAll title="Похожие авторы" url="#" />
                <ul className={st.selectionList}>
                  {authors.map(it => (
                    <li
                      key={it.id}
                      className={classnames(st.selectionListBook, st.defolt)}
                    >
                      <Image
                        src={it.img}
                        width={129}
                        height={195}
                        alt={it.name}
                      />
                      <h3 className={st.selectionListBookAuthor}>{it.name}</h3>
                      <p className={st.selectionListBookCount}>
                        {it.count}
                        <span> книг</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
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
