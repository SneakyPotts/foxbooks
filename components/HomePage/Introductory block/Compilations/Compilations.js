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
  const { selections } = useSelector(state => state.selection);

  if(!selections?.length) {
    return null
  }

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
        {selections.map((r, i) =>
          <SwiperSlide key={i}>
            <CompilationItem
              data={r}
              isFull
            />
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
