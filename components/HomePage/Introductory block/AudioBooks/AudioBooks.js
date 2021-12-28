// import Link from 'next/link';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ArrowRight from '../../../../public/chevron-right.svg';
import Book from '../../../shared/common/book';
import css from './audioBooks.module.scss';
import ShowAll from '../../../shared/common/showAll/ShowAll';

const AudioBooks = () => {
  const testData = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
  ];

  return (
    <div className={css.container}>
      <ShowAll title="Некогда читать - слушайте!" url="/audiobooks" />

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        spaceBetween={24}
        slidesPerView={6}
      >
        {testData.map((r, i) => {
          return (
            <SwiperSlide key={i}>
              <Book audio={true} />
            </SwiperSlide>
          );
        })}
        <button className={classnames('prevArrow', css.positionButton)}>
          <ArrowRight className="arrowNext" />
        </button>
        <button className={classnames('nextArrow', css.positionButton)}>
          <ArrowRight className="arrowNext" />
        </button>
      </Swiper>
    </div>
  );
};
export default AudioBooks;
