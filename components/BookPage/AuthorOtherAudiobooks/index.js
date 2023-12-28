import { useSelector } from 'react-redux';

import ArrowRight from '../../../public/chevron-right.svg';
import classNames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import st from './otherAudioBooks.module.scss';

import Book from '../../shared/common/book';

const AuthorOtherAudioBooks = ({ data }) => {
  const { innerWidthWindow } = useSelector((state) => state.common);
  const { authors } = useSelector((state) => state.book.book);

  const changeSpaceBtwSwiper = () => {
    if (innerWidthWindow > 768) return 24;
    if (innerWidthWindow <= 768) return 10;
  };

  const changeSlidesPerView = () => {
    if (innerWidthWindow <= 500) return 3;
    if (innerWidthWindow > 500) return 4;
  };

  return (
    <div className={st.container}>
      <h2 className={st.blockTitle}>Аудиокниги автора {authors?.[0]?.author}</h2>
      <Swiper
        spaceBetween={changeSpaceBtwSwiper()}
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        slidesPerView={changeSlidesPerView()}
      >
        {data.map((i) => (
          <SwiperSlide key={i?.id}>
            <Book
              classNames={st.slide}
              book={i}
              similar={true}
              mobalSimilar={true}
              audio={true}
              type={i?.type}
            />
          </SwiperSlide>
        ))}
        <button className={classNames('prevArrow', st.btn)}>
          <ArrowRight className="arrowNext" />
        </button>
        <button className={classNames('nextArrow', st.btn)}>
          <ArrowRight className="arrowNext" />
        </button>
      </Swiper>
    </div>
  );
};

export default AuthorOtherAudioBooks;
