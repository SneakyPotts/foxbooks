import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ArrowRight from '../../public/chevron-right.svg';
import Categories from './Categories/index';
import Alphabet from './Alphabet/Alphabet';
import Hero from './Hero/Hero';
import BookUpdates from './Updates';
import Filters from '../Filter';
import Introductory from './Introductory block';
import About from './About';
import books from '../data/books.json';
import Book from '../book';
import css from './home.module.css';

const HomeView = () => {
  return (
    <div className={css.container}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <div className={css.new}>
            <h2 className={css.newTitle}>Новинки книг</h2>
            <Link href="/new">
              <a className={css.newLink}>
                Смотреть все <ArrowRight className="showAll" />
              </a>
            </Link>
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={5}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
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
        <BookUpdates className={css.updates} />
        <Filters />
      </div>
      <Introductory />
      <About />
    </div>
  );
};
export default HomeView;
