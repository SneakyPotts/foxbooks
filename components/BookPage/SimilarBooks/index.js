import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import Book from '../../shared/common/book';
import st from './similarBooks.module.scss';
import {useState} from "react";

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

  const [state, setState] = useState('initState');

  if (data.length < 1)
    return null

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
      {state}
      <Swiper
        spaceBetween={changeSpaceBtwSwiper()}
        slidesPerView={changeSlidesPerView()}
        loop={true}
        onInit={(params) => {
          setState(`uje init - ${params?.browser?.isSafari}`)
        }}
        onSwiper={(params) => {
          console.log(params)
        }}
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
