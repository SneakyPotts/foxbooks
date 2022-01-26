import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
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
            title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'}
            url="/new"
          />

          <Swiper
            modules={[Navigation]}
            spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
            slidesPerView={
              (innerWidthWindow <= 500 && 3) ||
              (innerWidthWindow <= 1024 && 4) ||
              (innerWidthWindow >= 1200 && 5)
            }
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
