import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRight from '../../../../public/chevron-right.svg';
import Book from '../../../shared/common/book';
import css from './audioBooks.module.scss';
import ShowAll from '../../../shared/common/showAll/ShowAll';

const AudioBooks = ({ audioBooks }) => {
  const { innerWidthWindow } = useSelector(state => state.common);

  return (
    <div className={css.container}>
      <ShowAll title="Некогда читать - слушайте!" url="/audiobooks" />

      <Swiper
        modules={[Navigation]}
        spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
        slidesPerView={
          (innerWidthWindow <= 500 && 3) ||
          (innerWidthWindow <= 1024 && 4) ||
          (innerWidthWindow >= 1200 && 6)
        }
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}

        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {audioBooks.map(i =>
          <SwiperSlide
            key={i?.id}
            className={css.slideAudio}
          >
            <Book
              book={i}
              audio={true}
              type={i?.type}
            />
          </SwiperSlide>
        )}
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
