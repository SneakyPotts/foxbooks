import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Book from '../shared/common/book';
import ArrowRight from '../../public/chevron-right.svg';
import Headphones from '../shared/icons/headphones';
import ArrowAll from '../../public/chevron-down.svg';
import All from '../../public/all.svg';
import BookMark from '../../public/bookmark.svg';
import OpenBook from '../../public/book-open.svg';
import Flag from '../../public/flag.svg';
import Delete from '../../public/delete.svg';

import st from './myBooks.module.scss';

const MyBooks = () => {
  const dataBooks = [
    {
      id: '0',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '10',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '13',
    },
    {
      id: '4',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '5',
      img: '/reviewsBookCovers/cover2.png',
      audio: true,
      progress: '54',
    },
    {
      id: '6',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '1',
    },
    {
      id: '7',
      img: '/reviewsBookCovers/cover2.png',
      audio: true,
      progress: '37',
    },
    {
      id: '8',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
  ];
  const tab = [
    { text: 'Книги', count: 1 },
    { text: 'Аудиокниги', count: 2 },
    { text: 'Подборки', count: 3 },
    { text: 'Рецензии', count: 4 },
    { text: 'Цитаты', count: 5 },
    { text: 'Авторы', count: 6 },
  ];
  const options = [
    { option: 'Все', svg: <All /> },
    { option: 'Хочу прочитать', svg: <BookMark /> },
    { option: 'Читаю', svg: <OpenBook /> },
    { option: 'Прочитано', svg: <Flag /> },
  ];
  const popular = [
    { option: 'Популярные' },
    { option: 'По дате добавления' },
    { option: 'По алфавиту' },
  ];
  // const books = [
  //   { id: '0' },
  //   { id: '1' },
  //   { id: '2' },
  //   { id: '3' },
  //   { id: '4' },
  //   { id: '5' },
  //   { id: '6' },
  // ];

  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterIdx, setFilterIdx] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', close);

    return () => {
      body.removeEventListener('click', close);
    };
  }, []);

  const togle = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const handleClick = e => {
    e.stopPropagation();
    setFilter(!filter);
  };

  const filterClick = idx => {
    setFilterIdx(idx);
  };

  const handleInput = e => {
    e.stopPropagation();
    setShowInput(true);
  };

  const close = () => {
    setShowInput(false);
    setFilter(null);
    setMenu(false);
  };
  const [books, setBooks] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);
  console.log(books);

  const deleteBook = idx => {
    console.log(idx, 'deleteBookIndx');
    setBooks(books.filter((book, index) => book.id !== idx));
  };

  return (
    <>
      <div className="container">
        <h2 className={st.title}>Мои книги</h2>
        <div>
          {' '}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            spaceBetween={24}
            slidesPerView={7}
          >
            {dataBooks.map(book => (
              <SwiperSlide
                className={classnames({
                  [st.slider]: !book.audio,
                  [st.sliderAudio]: book.audio,
                })}
                key={book.id}
              >
                <div className={st.bookProgress}>
                  <span className={st.bookProgressCount}>{book.progress}%</span>
                  <div>
                    <img
                      src={book.img}
                      className={classnames({
                        [st.bookCover]: !book.audio,
                        [st.audioBookCover]: book.audio,
                      })}
                    />
                  </div>
                  {book.audio && (
                    <div className={st.bookIcon}>
                      <Headphones />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
            <button className={classnames('prevArrow', st.positionButton)}>
              <ArrowRight className="arrowNext" />
            </button>
            <button className={classnames('nextArrow', st.positionButton)}>
              <ArrowRight className="arrowNext" />
            </button>
          </Swiper>
        </div>
      </div>
      <div className={st.myMenu}>
        <ul className={st.tabList}>
          {tab.map(({ text, count }) => (
            <li key={text} className={st.tab}>
              <h2>{count}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="container">
        <div className={st.header}>
          <div className={st.options}>
            <span className={st.optionsLabel}>Статус</span>
            <div className={st.dropdown}>
              <button
                className={classnames(st.dropdownBtn, { [st.active]: menu })}
                onClick={togle}
              >
                Все
                <ArrowAll
                  className={classnames(st.down, {
                    [st.up]: menu,
                  })}
                />
              </button>
              {menu && (
                <ul className={st.dropdownList}>
                  {options.map(opt => (
                    <li className={st.dropdownListItem}>
                      {opt.svg}
                      <span>{opt.option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={st.filter}>
            <div className={st.input} onClick={handleInput}>
              <FiSearch
                className={classnames(st.inputSvg, {
                  [st.inputSvgIcon]: showInput,
                })}
              />
              {showInput && (
                <input placeholder="Искать книгу" className={st.inputSearch} />
              )}
            </div>
            <div className={st.dropdownPopular}>
              <button
                className={classnames(st.dropdownPopularBtn, {
                  [st.active]: filter,
                })}
                onClick={handleClick}
              >
                Популярные
                <ArrowAll
                  className={classnames(st.down, {
                    [st.up]: filter,
                  })}
                />
              </button>
              {filter && (
                <ul
                  className={st.dropdownPopularList}
                  onClick={e => e.stopPropagation()}
                >
                  {popular.map((opt, idx) => (
                    <li
                      className={st.dropdownPopularListItem}
                      onClick={() => filterClick(idx)}
                    >
                      <span
                        className={classnames(st.radio, {
                          [st.radioActive]: filterIdx === idx,
                        })}
                      ></span>
                      <span>{opt.option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={st.bookList}>
          {books.map((book, idx) => (
            <div key={book.id} className={st.bookListItem}>
              <Book />
              <span
                className={st.bookListItemDelete}
                onClick={() => deleteBook(book.id)}
              >
                <Delete />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBooks;
