import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classnames from 'classnames';
import Book from '../../shared/common/book';
import ArrowRight from '../../../public/chevron-right.svg';
import ShowAll from '../../shared/common/showAll/ShowAll';
import st from './similarBooks.module.scss';

const SimilarBooks = ({ data }) => {
  const { audioFlag } = useSelector(state => state.book);
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
    <div
      id="similar"
      className={st.swiper}
    >
      <div className={st.swiperTitle}>
        <h3 className={st.title}>
          Похожие книги
        </h3>
        {innerWidthWindow <= 768 && (
          <ShowAll externalClass={st.dicardDistance} />
        )}
      </div>
      <Swiper
        spaceBetween={changeSpaceBtwSwiper()}
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        slidesPerView={changeSlidesPerView()}
      >
        {data.map(i => (
          <SwiperSlide key={i?.id}>
            <Book
              classNames={st.slide}
              book={i}
              similar={true}
              audio={audioFlag}
            />
          </SwiperSlide>
        ))}
        <button
          className={classnames('prevArrow', {
            [st.btn]: !audioFlag,
            [st.btnAudio]: audioFlag,
          })}
        >
          <ArrowRight className="arrowNext" />
        </button>
        <button
          className={classnames('nextArrow', {
            [st.btn]: !audioFlag,
            [st.btnAudio]: audioFlag,
          })}
        >
          <ArrowRight className="arrowNext" />
        </button>
      </Swiper>
    </div>
  );
};

export default SimilarBooks;
