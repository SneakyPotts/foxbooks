import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classNames from 'classnames';
import books from '../../data/books.json';
import Book from '../../shared/common/book';
import ArrowRight from '../../../public/chevron-right.svg';

import st from './otherBooks.module.scss';

const AuthorOtherBooks = () => {
	return (
		<div className={st.container}>
			<h2 id="quotes" className={st.blockTitle}>
        Другие книги автора
			</h2>
			<Swiper
				spaceBetween={24}
				modules={[Navigation]}
				navigation={{
					prevEl: '.prevArrow',
					nextEl: '.nextArrow',
				}}
				slidesPerView={4}
			>
				{books.map(book => (
					<SwiperSlide key={book.id}>
						<Book classNames={st.slide} book={book} similar={true} />
					</SwiperSlide>
				))}
				<button className={classNames('prevArrow', st.btn)}>
					<ArrowRight className="arrowNext" />
				</button>
				<button className={classNames('nextArrow', st.btn)}>
					<ArrowRight className="arrowNext" />
				</button>
			</Swiper>
		</div>
	);
};

export default AuthorOtherBooks;
