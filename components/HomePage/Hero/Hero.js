// import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination } from 'swiper/core';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import ArrowRight from '../../../public/chevron-right.svg';
import st from './hero.module.scss';

const Hero = () => {
  const { innerWidthWindow } = useSelector(state => state.common);

  const data = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
  return (
    <div className={st.hero}>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          el: '.custom_pagination',
          clickable: true,
        }}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        spaceBetween={24}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map(id => (
          <SwiperSlide key={id} className={st.swiperTest}>
            <img src="/hero.png" alt="" className={st.swiperImg} />
          </SwiperSlide>
        ))}
        <button className={classnames('prevArrow', 'btnBefore')}>
          <ArrowRight className="arrowNext" />
        </button>
        <button className={classnames('nextArrow', 'btnAfter')}>
          <ArrowRight className="arrowNext" />
        </button>
        <div className="custom_pagination"></div>
      </Swiper>
    </div>
  );
};
export default Hero;
