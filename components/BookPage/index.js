import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classnames from 'classnames';
import Stars from '../shared/common/stars/Stars';
import Dots from '../../public/horizontalDots.svg';
import books from '../data/books.json';
import ArrowRight from '../../public/chevron-right.svg';
import Book from '../shared/common/book';
import Reviews from '../Reviews';
import st from './bookpage.module.scss';

const BookPage = () => {
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
      publishing: 'Махаон',
      translater: 'Мария Спивак',
      ganre: 'Фэнтези, зарубежная литература, детские книги',
      copyright_holder: 'Pottermore limited',
      series: 'Гарри Поттер',
    },
  ];

  return (
    <div className={classnames('container', st.wrapper)}>
      <div>
        {dataBook.map(book => (
          <div>
            <div key={book.id} className={st.bookInfo}>
              <div className={st.bookCover}>
                <Image
                  src={book.img}
                  height={406}
                  width={270}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/images/blur.jpg"
                />
              </div>
              <div className={st.aboutBook}>
                <h1 className={st.bookTitle}>{book.title}</h1>
                <p className={st.bookAuthor}>
                  <span className={st.bookAuthorName}>{book.author}</span>
                  <Link href="#">
                    <a className={st.bookAuthorLink}>(все книги автора)</a>
                  </Link>
                </p>
                <div className={st.bookDate}>
                  <span className={st.bookDateYear}>{book.year}год</span>
                  <span>{book.age}</span>
                </div>
                <div className={st.bookRaiting}>
                  <span className={st.bookRaitingCount}>
                    Рейтинг {book.raiting}
                  </span>
                  <Stars />
                </div>
                <div className={st.buttons}>
                  <button className={st.readButton}>Читать</button>
                  <span className={st.dotsButton}>
                    <Dots />
                  </span>
                </div>
                <ul className={st.navLinks}>
                  <li>
                    <Link href="#">
                      <a>О книге</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#reviews">
                      <a>Рецензии 37</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Цитаты 15</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Похожие книги</a>
                    </Link>
                  </li>
                </ul>
                <p>{book.about_book}</p>
                <div className={st.ditalInfo}>
                  <p>
                    Издательство: <span>{book.publishing}</span>
                  </p>
                  <p>
                    Переводчик: <span>{book.translater}</span>
                  </p>
                  <p>
                    Жанр: <span>{book.ganre}</span>
                  </p>
                  <p>
                    Правообладатель: <span>{book.copyright_holder}</span>
                  </p>
                  <p>Серия: {book.series}</p>
                </div>
                <div className={st.starsBlock}>
                  <p>Оцените книгу</p>
                  <Stars activeStart={true} value={0} color={'#4f4f4f'} />
                </div>
                <div className={st.swiper}>
                  <h3>Похожие книги</h3>
                  <Swiper
                    spaceBetween={24}
                    modules={[Navigation]}
                    navigation={{
                      prevEl: '.prevArrow',
                      nextEl: '.nextArrow',
                    }}
                    slidesPerView={4}
                  >
                    {books.map(book => (
                      <SwiperSlide key={book.id}>
                        <Book
                          classNames={st.slide}
                          book={book}
                          similar={true}
                        />
                      </SwiperSlide>
                    ))}
                    <button className="prevArrow">
                      <ArrowRight className="arrowNext" />
                    </button>
                    <button className="nextArrow">
                      <ArrowRight className="arrowNext" />
                    </button>
                  </Swiper>
                </div>
                <Image src="/advertising.png" width={588} height={250} />
                <Reviews />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={st.advertisingBlok}>
        <img src="/banner.png" alt="" className={st.banner} />
        <img src="/banner.png" alt="" className={st.banner} />
      </div>
    </div>
  );
};

export default BookPage;
