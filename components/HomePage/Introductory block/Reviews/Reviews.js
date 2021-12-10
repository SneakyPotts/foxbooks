import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/core';
import classnames from "classnames";
import Eye from "../../../shared/icons/eye";
import ArrowRight from '../../../../public/chevron-right.svg'
import Like from '../../../shared/icons/heart';
import Comment from '../../../shared/icons/comment';
import dataReview from '../../../data/reviews.json'
import st from './reviews.module.scss'


const Reviews = () => {
  
  return <> <div className={st.containerReviews}>
    <h2 className={st.title}>Рецензии</h2>
    <Link href="/reviews">
      <a className={st.newLink}>
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
      {dataReview.map(review => (<SwiperSlide key={review.id}>
        <div className={st.reviewsCover}>
          <Image src={review.img} alt="" width="86" height="143" />
          <div className={st.bookMainInfo}>
            <h3 className={st.bookTitle}>{review.book_title}</h3>
            <p className={st.bookAuthor}>{review.book_author}</p>
          </div>
        </div>
        <div className={st.reviewInfo}>
          <p className={st.reviewData}>{review.review_data}</p>
          <div className={st.reviewViews}>
            <span className={st.sumReviews}>{review.sum_reviews}</span>
            <Eye />
          </div>
        </div>
        <p className={st.reviewTitle}>{review.review_title}</p>
        <p className={st.reviewText}>{review.review_text}</p>
        <div>
          <Like className={st.reviewIcon}/>
          <span className={st.reviewLike}>{review.likes}</span>
          <Comment className={st.reviewIcon}/>
          <span>{review.comments}</span>
        </div>
      </SwiperSlide>))}
        <button className={classnames("prevArrow", st.btn)}>
          <ArrowRight className='arrowNext' />
        </button>
        <button className={classnames("nextArrow", st.btn)}>
          <ArrowRight className='arrowNext' />
        </button>
      </Swiper></>
    
}
export default Reviews