import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classNames from 'classnames';
import books from '../../data/books.json';
import Book from '../../shared/common/book';
import ArrowRight from '../../../public/chevron-right.svg';
import st from './otherAudioBooks.module.scss';

const AuthorOtherAudioBooks = () => {
  const { innerWidthWindow } = useSelector(state => state.common);

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
      <h2 className={st.blockTitle}>
        Другие аудиокниги автора
      </h2>
      <Swiper
        spaceBetween={changeSpaceBtwSwiper()}
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        slidesPerView={changeSlidesPerView()}
      >
        {books.map(book => (
          <SwiperSlide key={book.id}>
            <Book
              classNames={st.slide}
              book={book}
              similar={true}
              mobalSimilar={true}
              audio={true}
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
