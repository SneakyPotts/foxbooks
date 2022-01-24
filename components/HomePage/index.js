// import Link from 'next/link';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBreakPoint } from '../Header/headerSlice';
import ArrowRight from '../../public/chevron-right.svg';
import Categories from './Categories/index';
import Alphabet from './Alphabet/Alphabet';
import Hero from './Hero/Hero';
import BookUpdates from './Updates';
import Filters from '../Filter';
import Introductory from './Introductory block';
import About from './About';
import books from '../data/books.json';
import Book from '../shared/common/book';
import ShowAll from '../shared/common/showAll/ShowAll';
import css from './home.module.scss';

const HomeView = () => {
  const { innerWidthWindow } = useSelector(state => state.headerSlice);

  return (
    <div className={'container'}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <ShowAll
            title={innerWidthWindow >= 798 ? 'Новинки книг' : 'Новинки'}
            url="/new"
          />

          <Swiper
            modules={[Navigation]}
            spaceBetween={innerWidthWindow <= 798 ? 10 : 24}
            // slidesPerView={(innerWidthWindow === 798 && 3) || (innerWidthWindow >== 798 && <==1200 && 4) || (innerWidthWindow >==1200 && 5)}

            //   slidesPerView={innerWidthWindow === 798 && 3 innerWidthWindow >== 798 && <==1200 && 4 innerWidthWindow >==1200 && 5}

            //   slidesPerView={`${${innerWidthWindow === 798 && 3} ${innerWidthWindow >== 798 && <==1200 && 4} ${innerWidthWindow >==1200 && 5}}`}

            slidesPerView={innerWidthWindow === 798 && 3}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}

            // onSlideChange={() => console.log('slide change')}
            // onSwiper={swiper => console.log(swiper)}
          >
            {books.map(book => (
              <SwiperSlide key={book.id} className={css.swiperSlide}>
                <Book book={book} />
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
      <Hero />
      <div className={css.wrapper}>
        <BookUpdates />
        <Filters />
      </div>
      <Introductory />
      <About />
    </div>
  );
};
export default HomeView;
