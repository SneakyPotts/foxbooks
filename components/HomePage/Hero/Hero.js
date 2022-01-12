import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/core';
import classnames from 'classnames';
import ArrowRight from '../../../public/chevron-right.svg';

import css from './hero.module.css';

const Hero = () => {
	const data = [
		{ id: '1' },
		{ id: '2' },
		{ id: '3' },
		{ id: '4' },
		{ id: '5' },
		{ id: '6' },
	];
	return (
		<div className={css.hero}>
			<Swiper
				modules={[Navigation]}
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
					<SwiperSlide key={id} className={css.swiperSlide}>
						<Image src="/hero.png" width="1200" height="400" alt="" />
					</SwiperSlide>
				))}
				<button className={classnames('prevArrow', 'btnBefore')}>
					<ArrowRight className="arrowNext" />
				</button>
				<button className={classnames('nextArrow', 'btnAfter')}>
					<ArrowRight className="arrowNext" />
				</button>
			</Swiper>
		</div>
	);
};
export default Hero;
