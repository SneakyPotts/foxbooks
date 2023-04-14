import { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowRight from '../../public/chevron-right.svg';
import Filters from '../Filter';
import About from './About';
import Alphabet from './Alphabet/Alphabet';
import Categories from './Categories/index';
import Hero from './Hero/Hero';
import Introductory from './Introductory block';
import MobileBlock from './MobileBlock';
import BookUpdates from './Updates';
import css from './home.module.scss';
import classNames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import Book from '../shared/common/book';
import ShowAll from '../shared/common/showAll/ShowAll';
import cssBook from './../shared/common/book/book.module.scss';

const HomeView = ({ audioBooks, newBooks, order }) => {
  const hotUpdates = useRef();
  const { query } = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);

  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (Object.keys(query).length !== 0 && !firstVisit) {
      window.scrollTo({
        top: hotUpdates.current.offsetTop - 10,
        left: 0,
        // behavior: "smooth",
      });
    }
    setFirstVisit(false);
  }, [query]);

  return (
    <div className={classNames('container', css.container)}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <ShowAll title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'} url={`/new`} />

          <Swiper
            modules={[Navigation]}
            spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
            slidesPerView={innerWidthWindow <= 480 ? 3 : 5}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
          >
            {newBooks.map((book) => (
              <SwiperSlide key={book?.id} className={cssBook.swiperSlide}>
                <Book book={book} type={book?.type} />
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
      </div>
      {/*{innerWidthWindow <= 768 && <MobileBlock />}*/}
      <Hero />
      <div ref={hotUpdates} className={css.wrapper}>
        <BookUpdates />
        <Filters order={order} />
      </div>
      <Introductory audioBooks={audioBooks} />
      <About />
    </div>
  );
};
export default HomeView;
