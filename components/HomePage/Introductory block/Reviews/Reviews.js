import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/core';
import ArrowRight from '../../../../public/chevron-right.svg';
import st from './reviews.module.scss';
import ShowAll from '../../../shared/common/showAll/ShowAll';
import ReviewLogicItem from "../../../ReviewLogicItem";
import AvatarWithLetter from "../../../shared/common/AvatarWithLetter";
import React from "react";
import classnames from "classnames";

const Reviews = () => {
  const { innerWidthWindow } = useSelector(state => state.common);
  const { reviews } = useSelector(state => state.review);

  if(!reviews?.length) {
    return null
  }

  return (
    <div className={st.container}>
      {/*<ShowAll title="Рецензии" url="/reviews" text="Показать все" />*/}
      <h2 className={classnames('title', st.titleMain)}>Рецензии</h2>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.prevArrow',
          nextEl: '.nextArrow',
        }}
        spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
        slidesPerView={innerWidthWindow <= 600 ? 1 : 3}
        className={st.reviewSwiper}
      >
        {reviews.map(review => (
          <SwiperSlide className={st.test} key={review.id}>
            <div className={st.reviewer}>
              <div className={st.reviewerImg}>
                {review?.user?.avatar ? (
                  <Image
                    src={review?.user?.avatar}
                    alt="Avatar"
                    width="35"
                    height="35"
                    // placeholder="blur"
                    blurDataURL="/blur.webp"
                  />
                ) : (
                  <AvatarWithLetter
                    letter={
                      review?.user?.nickname?.slice(0, 1) ||
                      review?.user?.name?.slice(0, 1) ||
                      'П'
                    }
                    width={35}
                    id={review?.user?.id}
                  />
                )}
              </div>
              <span className={st.reviewerName}>{review.user?.nickname}</span>
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
