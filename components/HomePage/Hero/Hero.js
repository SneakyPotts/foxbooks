import Image from 'next/image';
import Link from 'next/link';

import ArrowRight from '../../../public/chevron-right.svg';
import classnames from 'classnames';
import { Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import st from './hero.module.scss';

const Hero = ({ bannersList }) => {
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
      >
        {bannersList.map(({ id, image, alt, link }) => (
          <SwiperSlide
            key={id}
            className={st.swiperWrapper}
          >
            {link ? (
              <Link href={link}>
                <a>
                  <Image
                    src={image || '/hero.png'}
                    width={1200}
                    height={400}
                    alt={alt || 'banner image'}
                    className={st.swiperImg}
                  />
                </a>
              </Link>
            ) : (
              <Image
                src={image || '/hero.png'}
                width={1200}
                height={400}
                alt={alt || 'banner image'}
                className={st.swiperImg}
              />
            )}
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
