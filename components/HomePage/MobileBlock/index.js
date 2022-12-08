import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import ShowAll from '../../shared/common/showAll/ShowAll';
import Book from '../../shared/common/book';
import books from '../../data/books.json';
import ArrowRight from '../../../public/chevron-right.svg';
import st from './mobile.module.scss';

const MobileBlock = () => {
  const { innerWidthWindow } = useSelector(state => state.common);
  return (
    <div className={st.container}>
      <div className={st.mainBlock}>
        <ShowAll title="Романы" url="/new" />

        <Swiper
          modules={[Navigation]}
          spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
          slidesPerView={
            (innerWidthWindow <= 500 && 3) || (innerWidthWindow <= 768 && 4)
          }
          navigation={{
            prevEl: '.prevArrow',
            nextEl: '.nextArrow',
          }}
        >
          {books.map(book => (
            <SwiperSlide key={book.id} className={st.swiperSlide}>
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
      <div className={st.secondBlock}>
        <ShowAll title="Научная фантастика" url="/new" />
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

        >
          {books.map(book => (
            <SwiperSlide key={book.id} className={st.swiperSlide}>
              <Book count={innerWidthWindow <= 500 ? 1 : 5} book={book} />
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
  );
};

export default MobileBlock;
