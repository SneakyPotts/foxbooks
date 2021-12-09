import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/core';
import classnames from "classnames";
import ArrowRight from '../../../../public/chevron-right.svg'
<<<<<<< HEAD
import css from './reviews.module.scss'
=======
import css from '../AudioBooks/audioBooks.module.scss'
>>>>>>> c83194239a16ff3d1431ce426f3e9612f50ced03

const Reviews = () => {
  const data = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' },{ id: '7' }, { id: '8' }]
  
  return <> <div className={css.containerReviews}>
    <h2 className={css.title}>Рецензии</h2>
    <Link href="/reviews">
      <a className={css.newLink}>
        Смотреть все <ArrowRight />
      </a>
    </Link>
  </div>
  <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        spaceBetween={24}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
      {data.map(id => (<SwiperSlide key={id}>
        <div className={css.reviewsCover}><Image src="/reviewsBookCovers/cover1.png" alt="" width="86" height="143" /></div>
      </SwiperSlide>))}
        <button className={classnames("prevArrow", 'btnBefore')}>
          <ArrowRight className='arrowNext' />
        </button>
        <button className={classnames("nextArrow", 'btnAfter')}>
          <ArrowRight className='arrowNext' />
        </button>
      </Swiper></>
    
}
export default Reviews