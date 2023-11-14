import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';

import st from './similarBooks.module.scss';

import Book from '../../shared/common/book';

const SimilarBooks = ({ type, data, bookTitle }) => {
  const { innerWidthWindow } = useSelector((state) => state.common);

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
        <h2 className={st.title}>{type === 'books' ? `Похожие книги на "${bookTitle}"` : `Похожие аудиокниги на "${bookTitle}"`}</h2>
        {/*{innerWidthWindow <= 768 && (*/}
        {/*  <ShowAll externalClass={st.dicardDistance} />*/}
        {/*)}*/}
      </div>
      <Swiper
        spaceBetween={changeSpaceBtwSwiper()}
        slidesPerView={changeSlidesPerView()}
      >
        {data.map((i) => (
          <SwiperSlide key={i?.id}>
            <Book
              classNames={st.slide}
              book={i}
              similar={true}
              audio={i?.type === 'audioBooks'}
              type={i?.type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarBooks;
