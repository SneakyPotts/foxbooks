import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import Book from '../../shared/common/book';
import st from './similarBooks.module.scss';

const SimilarBooks = ({ type, data }) => {

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
          {type === 'books' ? 'Похожие книги' : 'Похожие аудиокниги'}
        </h3>
        {/*{innerWidthWindow <= 768 && (*/}
        {/*  <ShowAll externalClass={st.dicardDistance} />*/}
        {/*)}*/}
      </div>
      <Swiper
        spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
        slidesPerView={innerWidthWindow <= 480 ? 3 : 4}
      >
        {data.map(i => (
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
