import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classnames from 'classnames';
import books from '../../data/books.json';
import Book from '../../shared/common/book';
import ArrowRight from '../../../public/chevron-right.svg';

import st from './similarBooks.module.scss';

const SimilarBooks = ({ audio }) => {
	const { audioFlag } = useSelector(state => state.bookSlice);

	return (
		<div className={st.swiper}>
			<h3 id="similar" className={st.title}>
        Похожие книги
			</h3>
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
						<Book
							classNames={st.slide}
							book={book}
							similar={true}
							audio={audioFlag}
						/>
					</SwiperSlide>
				))}
				<button
					className={classnames('prevArrow', {
						[st.btn]: !audioFlag,
						[st.btnAudio]: audioFlag,
					})}
				>
					<ArrowRight className="arrowNext" />
				</button>
				<button
					className={classnames('nextArrow', {
						[st.btn]: !audioFlag,
						[st.btnAudio]: audioFlag,
					})}
				>
					<ArrowRight className="arrowNext" />
				</button>
			</Swiper>
		</div>
	);
};

export default SimilarBooks;
