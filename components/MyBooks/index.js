import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Book from '../shared/common/book';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import ArrowRight from '../../public/chevron-right.svg';
import Headphones from '../shared/icons/headphones';
import ArrowAll from '../../public/chevron-down.svg';
import All from '../shared/icons/all';
import BookMark from '../../public/bookmark.svg';
import OpenBook from '../../public/book-open.svg';
import Flag from '../../public/flag.svg';
import Delete from '../../public/delete.svg';
import Button from '../shared/common/Button/Button';
import MySelections from './MySelections';
import Selection from './Selection';
import Review from './Review';
import Quotes from './Quotes';
import Authors from './Authors';
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
  const selections = ['Все', 'Мои', 'Fox подборки'];

  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterIdx, setFilterIdx] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Популярные');
  const [showSelections, setShowSelections] = useState(false);
  const [showSelectionsIdx, setShowSelectionsIdx] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [deletePopap, setDeletePopap] = useState(false);
  const [shoudlDelete, setShouldDelete] = useState(null);
  const [tabValue, setTabValue] = useState('Книги');
  const [activeTab, setActiveTab] = useState(0);
  const [activeOption, setActiveOption] = useState('Все');
  const [activeSelections, setActiveSelections] = useState('Все');
  const [createSelection, setCreateSelection] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [books, setBooks] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);

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

  const handleTabClick = (text, idx) => {
    setTabValue(text);
    setActiveTab(idx);
  };

  const handleOptions = (idx, e) => {
    e.stopPropagation();
    setActiveOption(options[idx].option);
  };

  const handleClick = e => {
    e.stopPropagation();
    setFilter(!filter);
  };

  const handleSelections = e => {
    e.stopPropagation();
    setShowSelections(!showSelections);
  };

  const handleSelectionClick = idx => {
    setActiveSelections(selections[idx]);
    setShowSelectionsIdx(idx);
  };

  const filterClick = idx => {
    setActiveFilter(popular[idx].option);
    setFilterIdx(idx);
  };

  const handleInput = e => {
    e.stopPropagation();
    setShowInput(true);
  };

  const handleCreateSelection = () => {
    setCreateSelection(true);
  };

  const close = () => {
    setShowInput(false);
    setFilter(null);
    setMenu(false);
    setShowSelections(false);
  };

  const showDeletePopap = id => {
    setDeletePopap(true);
    setShouldDelete(id);
  };

  const deleteBook = () => {
    setBooks(books.filter(book => book.id !== shoudlDelete));
    setDeletePopap(false);
    setConfirm(true);
  };

  const confirmDeleteBook = () => {
    setConfirm(false);
  };

  return (
    <>
      {!createSelection ? (
        <>
          <div className="container">
            <h2 className={st.title}>Мои книги</h2>
            <div>
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
                    <Link href="/reader">
                      <a>
                        <div className={st.bookProgress}>
                          <span className={st.bookProgressCount}>
                            {book.progress}%
                          </span>
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
                      </a>
                    </Link>
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
              {tab.map(({ text, count }, idx) => (
                <li
                  key={text}
                  className={classnames(st.tab, {
                    [st.activeTab]: activeTab === idx,
                  })}
                  onClick={() => handleTabClick(text, idx)}
                >
                  <h2>{count}</h2>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={classnames('container', st.section)}>
            <div className={st.header}>
              <div className={st.options}>
                {(tabValue === 'Книги' || tabValue === 'Аудиокниги') && (
                  <>
                    <span className={st.optionsLabel}>Статус</span>
                    <div className={st.dropdown}>
                      <button
                        className={classnames(st.dropdownBtn, {
                          [st.active]: menu,
                        })}
                        onClick={togle}
                      >
                        {activeOption}
                        <ArrowAll
                          className={classnames(st.down, {
                            [st.up]: menu,
                          })}
                        />
                      </button>
                      {menu && (
                        <ul className={st.dropdownList}>
                          {options.map((opt, idx) => (
                            <li
                              key={opt.option}
                              className={st.dropdownListItem}
                              onClick={e => handleOptions(idx, e)}
                            >
                              {opt.svg}
                              <span>{opt.option}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
                {tabValue === 'Подборки' && (
                  <div
                    className={classnames(
                      st.dropdownPopular,
                      st.dropdownSelection
                    )}
                  >
                    <button
                      className={classnames(st.dropdownPopularBtn, {
                        [st.active]: showSelections,
                      })}
                      onClick={handleSelections}
                    >
                      {activeSelections}
                      <ArrowAll
                        className={classnames(st.down, {
                          [st.up]: showSelections,
                        })}
                      />
                    </button>
                    {showSelections && (
                      <ul
                        className={classnames(
                          st.dropdownPopularList,
                          st.dropdownSelectionList
                        )}
                        onClick={e => e.stopPropagation()}
                      >
                        {selections.map((opt, idx) => (
                          <li
                            className={st.dropdownPopularListItem}
                            onClick={() => handleSelectionClick(idx)}
                          >
                            <span
                              className={classnames(st.radio, {
                                [st.radioActive]: showSelectionsIdx === idx,
                              })}
                            ></span>
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              {tabValue === 'Подборки' && activeSelections === 'Мои' ? (
                <Button
                  text="Создать новую подборку"
                  click={handleCreateSelection}
                />
              ) : (
                <div className={st.filter}>
                  {tabValue !== 'Цитаты' && (
                    <div className={st.input} onClick={handleInput}>
                      <FiSearch
                        className={classnames(st.inputSvg, {
                          [st.inputSvgIcon]: showInput,
                        })}
                      />
                      {showInput && (
                        <input
                          placeholder="Искать книгу"
                          className={st.inputSearch}
                        />
                      )}
                    </div>
                  )}
                  {tabValue !== 'Рецензии' && tabValue !== 'Авторы' && (
                    <div className={st.dropdownPopular}>
                      <button
                        className={classnames(st.dropdownPopularBtn, {
                          [st.active]: filter,
                        })}
                        onClick={handleClick}
                      >
                        {activeFilter}
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
                  )}
                </div>
              )}
            </div>
            <>
              {tabValue === 'Книги' && (
                <ul className={st.bookList}>
                  {books.map(book => (
                    <li key={book.id} className={st.bookListItem}>
                      <Book />
                      <span
                        className={st.bookListItemDelete}
                        onClick={() => showDeletePopap(book.id)}
                      >
                        <Delete />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {tabValue === 'Аудиокниги' && (
                <ul className={st.bookList}>
                  {books.map(book => (
                    <li key={book.id} className={st.bookListItem}>
                      <Book audio={true} />
                      <span
                        className={st.bookListItemDelete}
                        onClick={() => showDeletePopap(book.id)}
                      >
                        <Delete />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
            {tabValue === 'Подборки' && activeSelections !== 'Мои' && (
              <MySelections />
            )}
            {tabValue === 'Подборки' && activeSelections === 'Мои' && (
              <div className={st.selection}>
                <div className={st.selectionBlock}>
                  <div className={st.selectionImg}>
                    <img src="/horizontalBookCovers/bookCover1.png" alt="" />
                    <div className={st.selectionImgCount}>
                      <span>1 </span>
                      <span>книг</span>
                    </div>
                  </div>

                  <div className={st.selectionTitle}>
                    <h3>Романтическое фэнтези</h3>
                  </div>
                </div>
              </div>
            )}
            {tabValue === 'Рецензии' && <Review />}
            {tabValue === 'Цитаты' && <Quotes />}
            {tabValue === 'Авторы' && <Authors />}
          </div>
          {deletePopap && (
            <ModalWindow modal={deletePopap} setModal={setDeletePopap}>
              <div className={st.modal}>
                <h1 className={st.modalTitle}>Удалить книгу</h1>
                <p className={st.modalText}>
                  Вы действительно хотите удалить книгу “Колдовской мир. Тройка
                  мечей”?
                </p>
                <ButtonGroup
                  text="Удалить"
                  typeButton="button"
                  ClassName={st.modalBtns}
                  click={deleteBook}
                />
              </div>
            </ModalWindow>
          )}
          {confirm && (
            <ModalWindow modal={confirm} setModal={setConfirm}>
              <div className={st.modal}>
                <h1 className={st.modalTitle}>Книга удалена</h1>

                <Button
                  text="Закрыть"
                  typeButton="button"
                  click={confirmDeleteBook}
                  classNames={st.modalBtn}
                />
              </div>
            </ModalWindow>
          )}
        </>
      ) : (
        <Selection />
      )}
    </>
  );
};

export default MyBooks;
