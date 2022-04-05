import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/core';
import ArrowRight from '../../../../public/chevron-right.svg';
import st from './reviews.module.scss';
import ShowAll from '../../../shared/common/showAll/ShowAll';
import ReviewLogicItem from "../../../ReviewLogicItem";

const Reviews = () => {
  const { innerWidthWindow } = useSelector(state => state.common);
  const { reviews } = useSelector(state => state.review);

  if(!reviews?.length) {
    return null
  }

  return (
    <div className={st.container}>
      <ShowAll title="Рецензии" url="/reviews" text="Показать все" />
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
        // onSwiper={(swiper) => console.log(swiper)}
        className={st.reviewSwiper}
      >
        {reviews.map(review => (
          <SwiperSlide className={st.test} key={review.id}>
            <div className={st.reviewer}>
              <Image
                src={review.reiewer_img}
                alt=""
                width="35"
                height="35"
                className={st.reviewerImg}
              />
              <span className={st.reviewerName}>{review.reviewer_name}</span>
            </div>
            <ReviewLogicItem
              data={review}
            />
          </SwiperSlide>
        ))}
        <button className="prevArrow">
          <ArrowRight className="arrowNext" />
        </button>
        <button className="nextArrow">
          <ArrowRight className="arrowNext" />
        </button>
      </Swiper>
    </div>
  );
};
export default Reviews;
