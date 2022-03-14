import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import ArrowRight from '../../../../public/chevron-right.svg';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ShowAll from '../../../shared/common/showAll/ShowAll';
import CompilationItem from "../../../CompilationItem";

const Compilations = () => {
  const { innerWidthWindow } = useSelector(state => state.common);

  const dataTest = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];

  return (
    <div className={styles.container}>
      <ShowAll title="Подборки" url="/selections" />

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        spaceBetween={24}
        slidesPerView={
          (innerWidthWindow <= 768 && 1) ||
          (innerWidthWindow <= 1024 && 2) ||
          (innerWidthWindow >= 1200 && 3)
        }
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={swiper => console.log(swiper)}
      >
        {dataTest.map((r, i) =>
          <SwiperSlide key={i}>
            <CompilationItem isFull />
          </SwiperSlide>
        )}
        <button className={classnames('prevArrow', styles.positionButton)}>
          <ArrowRight className="arrowNext" />
        </button>
        <button className={classnames('nextArrow', styles.positionButton)}>
          <ArrowRight className="arrowNext" />
        </button>
      </Swiper>
    </div>
  );
};
export default Compilations;
