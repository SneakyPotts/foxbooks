import { useSelector } from 'react-redux';

import ArrowRight from '../../../../public/chevron-right.svg';
import CompilationItem from '../../../CompilationItem';
import styles from './index.module.scss';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import ShowAll from '../../../shared/common/showAll/ShowAll';

const Compilations = () => {
  const { innerWidthWindow } = useSelector((state) => state.common);
  const { selections } = useSelector((state) => state.selection);

  if (!selections?.length) {
    return null;
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
        spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
        slidesPerView={innerWidthWindow <= 600 ? 1 : 3}
      >
        {selections.map((i) => (
          <SwiperSlide key={i?.id}>
            <CompilationItem data={i} isFull path={`/selections/${i?.slug}`} />
          </SwiperSlide>
        ))}
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
