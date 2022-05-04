import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
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
import MobileBlock from './MobileBlock';
import css from './home.module.scss';

const HomeView = ({ audioBooks, newBooks }) => {
  const { innerWidthWindow } = useSelector(state => state.common);

  console.log(newBooks)

  return (
    <div className={classNames('container', css.container)}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <ShowAll
            title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'}
            url={`/new?sortBy=1&type=all`}
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
            {newBooks.map(book => (
              <SwiperSlide key={book?.id} className={css.swiperSlide}>
                <Book
                  book={book}
                  type={book?.type}
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
      </div>
      {innerWidthWindow <= 768 && <MobileBlock />}
      <Hero />
      <div className={css.wrapper}>
        <BookUpdates />
        <Filters />
      </div>
      <Introductory audioBooks={audioBooks} />
      <About />
    </div>
  );
};
export default HomeView;
