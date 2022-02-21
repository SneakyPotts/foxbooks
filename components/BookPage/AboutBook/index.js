import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Image from 'next/image';
import { setBookRating, setBookStatus } from '../../../store/bookSlice';
import Stars from '../../shared/common/stars/Stars';
import Dots from '../../shared/icons/horizontalDots';
import BookMark from '../../shared/icons/BookMark';
import OpenBook from '../../shared/icons/bookOpen';
import Flag from '../../shared/icons/flag';
import Add from '../../../public/plus.svg';
import Headphones from '../../shared/icons/headphones';
import Basket from '../../shared/icons/trash';
import Eye from '../../shared/icons/eye';

import st from './aboutBook.module.scss';

const AboutBook = ({ book, audio }) => {
  const dataBook = [
    {
      id: '0',
      img: '/horizontalBookCovers/book.png',
      title: 'Гарри Поттер и философский камень',
      author: 'Джоан Роулинг',
      year: '1997',
      age: '6+',
      raiting: '5',
      about_book:
        'Книга, покорившая мир, эталон литературы для читателей всех возрастов, синоним успеха. Книга, сделавшая Джоан Роулинг самым читаемым писателем современности. Книга, ставшая культовой уже для нескольких поколений. "Гарри Поттер и Философский камень" - история начинается.',
      reader: 'Дмитрий Быков',
      publishing: 'Махаон',
      translater: 'Мария Спивак',
      ganre: 'Фэнтези, зарубежная литература, детские книги',
      copyright_holder: 'Pottermore limited',
      series: 'Гарри Поттер',
    },
  ];

  const dataOptions = [
    { id: '0', svg: <BookMark />, option: 'Хочу прочитать', value: 1 },
    { id: '1', svg: <OpenBook />, option: 'Читаю', value: 2 },
    { id: '2', svg: <Flag />, option: 'Прочитано', value: 3 },
    { id: '3', svg: <Add />, option: 'В мои подборки' },
    { id: '4', svg: <Basket />, option: 'Удалить из моих книг' },
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const { audioFlag } = useSelector(state => state.book);

  const [openMenu, setOpenMenu] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const { innerWidthWindow } = useSelector(state => state.common);

  const showPopup = res => {
    if (res.meta.requestStatus === 'fulfilled') {
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 5000);
    }
  };

  const changeBookStatus = value => {
    setOpenMenu(false);
    dispatch(setBookStatus({ id: router.query?.id, value })).then(res =>
      showPopup(res)
    );
  };

  const setRating = value => {
    dispatch(setBookRating({ id: router.query.id, value }));
  };

  return (
    <div>
      <div key={book.id} className={st.bookInfo}>
        <div className={st.infoBlockBook}>
          <div
            className={classnames(st.bookCover, {
              [st.bookCoverAudio]: audioFlag,
            })}
          >
            <Image
              src="/horizontalBookCovers/book.png"
              bookTitle
              height={
                audioFlag
                  ? innerWidthWindow > 768
                    ? 270
                    : 108
                  : innerWidthWindow > 768
                  ? 406
                  : 160
              }
              width={innerWidthWindow > 768 ? 270 : 108}
              layout="fill"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
            />

            {audioFlag && (
              <div className={st.bookCoverIcon}>
                <Headphones />
              </div>
            )}
          </div>

          <div className={st.blockBookTitle}>
            <div className={st.wrapperBookTitle}>
              <h1 className={st.bookTitle}>{book?.title}</h1>
              <p className={st.bookAuthor}>
                <Link href="/author">
                  <a className={st.bookAuthorName}>
                    {book?.authors[0]?.author}
                  </a>
                </Link>
                {innerWidthWindow >= 768 && (
                  <Link href="#">
                    <a className={st.bookAuthorLink}>(все книги автора)</a>
                  </Link>
                )}
              </p>
              <div className={st.bookDate}>
                {audioFlag && (
                  <div>
                    <span className={st.audioInfo}>
                      <span>40</span>мин.
                    </span>
                    <span className={st.audioInfo}>
                      <span>42</span> Мбайт
                    </span>
                  </div>
                )}
                <span className={st.bookDateYear}>{book?.year}2020 год</span>
                {/* <span className={st.bookDateAge}>{book.age}8</span> */}
                <div className={st.selectionDateViews}>
                  <span>456</span>
                  <Eye />
                </div>
              </div>
              <div className={st.raiting}>
                <div className={st.bookRaiting}>
                  <Stars count={1} />
                  <p className={st.bookRaitingCount}>
                    {book?.rates_count} ({book?.rates_avg} оценок)
                  </p>
                </div>
                {innerWidthWindow >= 768 && (
                  <div className={st.starsBlock}>
                    <p>Оцените книгу</p>
                    <Stars
                      activeStart={true}
                      value={0}
                      color={'#4f4f4f'}
                      onChange={value => setRating(value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={st.aboutBook}>
              {innerWidthWindow < 768 && (
                <div className={classnames(st.starsBlock, st.addDistance)}>
                  <p>Оцените книгу</p>
                  <Stars
                    activeStart={true}
                    value={0}
                    color={'#4f4f4f'}
                    onChange={value => setRating(value)}
                  />
                </div>
              )}
              <div className={st.buttons}>
                {audioFlag ? (
                  <button className={st.readButton}>Начать слушать</button>
                ) : (
                  <Link href={`/reader?id=${book?.id}&page=1`}>
                    <a className={st.readButton}>Читать</a>
                  </Link>
                )}
                <div className={st.dropdown}>
                  <span
                    className={classnames(st.dotsButton, {
                      [st.activBtn]: openMenu,
                    })}
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <Dots />
                  </span>
                  {openMenu && (
                    <ul className={st.menu}>
                      {dataOptions.map((it, index) => (
                        <li
                          key={it?.id}
                          onClick={() => changeBookStatus(it?.value)}
                          className={st.menuItem}
                        >
                          {it?.svg}
                          <span>{it?.option}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <ul className={st.navLinks}>
                <li>
                  <Link href="#">
                    <a>О книге</a>
                  </Link>
                </li>
                <li>
                  <Link href="#reviews">
                    <a>
                      Рецензии <span className={st.number}>37</span>
                    </a>
                  </Link>
                </li>
                <li>
                  {audioFlag ? (
                    <Link href="#quotes">
                      <a>
                        Слушают <span className={st.number}>129</span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="#quotes">
                      <a>
                        Цитаты <span className={st.number}>15</span>
                      </a>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="#similar">
                    <a>Похожие книги</a>
                  </Link>
                </li>
              </ul>
              <p>
                {book?.text}
                {/* Книга, покорившая мир, эталон литературы для
                читателей всех возрастов, синоним успеха. Книга, сделавшая Джоан
                Роулинг самым читаемым писателем современности. Книга, ставшая
                культовой уже для нескольких поколений. "Гарри Поттер и
                Философский камень" - история начинается. */}
              </p>
              <div className={st.ditalInfo}>
                {audioFlag ? (
                  <p>
                    Чтец: <span>{book.reader}</span>
                  </p>
                ) : (
                  <>
                    <p>
                      Издательство: <span>Ddfghjdx{book.publishing}</span>
                    </p>
                    <p>
                      Переводчик: <span>{book.translater}</span>
                    </p>
                  </>
                )}

                <p>
                  Жанр: <span>{book.ganre}</span>
                </p>
                <p>
                  Правообладатель: <span>{book.copyright_holder}</span>
                </p>
                <p>Серия: {book.series}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopUp && (
        <div className={st.popUp}>
          <p>
            Книга “Гарри Поттер и философский камень” добавлена{' '}
            <Link href="#">
              <a className={st.popUpLink}>в вашу библиотеку</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutBook;
