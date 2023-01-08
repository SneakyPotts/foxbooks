import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from "next/router";
import {Navigation} from 'swiper/core';
import ShowAll from '../shared/common/showAll/ShowAll';
import Alphabet from './Alphabet/Alphabet';
import Hero from './Hero/Hero';
import Categories from './Categories/index';
import BookUpdates from './Updates';
import Filters from '../Filter';
import Introductory from './Introductory block';
import About from './About';
import Book from '../shared/common/book';
import MobileBlock from './MobileBlock';
import ArrowRight from '../../public/chevron-right.svg';
import css from './home.module.scss';
import cssBook from './../shared/common/book/book.module.scss';

const HomeView = ({audioBooks, order}) => {
	const hotUpdates = useRef();
	const {query} = useRouter();

	const {innerWidthWindow} = useSelector(state => state.common);
	const {novelties} = useSelector(state => state.novelties)

	const [firstVisit, setFirstVisit] = useState(true);

	useEffect(() => {
		if (Object.keys(query).length !== 0 && !firstVisit) {
			window.scrollTo({
				top: hotUpdates.current.offsetTop - 10,
				left: 0,
				// behavior: "smooth",
			});
		}
		setFirstVisit(false)
		console.log('newBooks',);
	}, [query]);

	return (
		<div className={classNames('container', css.container)}>
			<div className={css.mainContainer}>
				<Categories/>
				<div className={css.mainBlock}>
					<Alphabet/>
					<ShowAll
						title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'}
						url={`/new`}
					/>

					<Swiper
						modules={[Navigation]}
						spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
						slidesPerView={innerWidthWindow <= 480 ? 3 : 5}
						navigation={{
							prevEl: '.prevArrow',
							nextEl: '.nextArrow',
						}}
					>
						{novelties.map(book => (
							<SwiperSlide key={book?.id} className={cssBook.swiperSlide}>
								<Book
									book={book}
									type={book?.type}
								/>
							</SwiperSlide>
						))}
						<button className="prevArrow">
							<ArrowRight className="arrowNext"/>
						</button>
						<button className="nextArrow">
							<ArrowRight className="arrowNext"/>
						</button>
					</Swiper>
				</div>
			</div>
			{/*{innerWidthWindow <= 768 && <MobileBlock />}*/}
			<Hero/>
			<div ref={hotUpdates} className={css.wrapper}>
				<BookUpdates/>
				<Filters order={order}/>
			</div>
			<Introductory audioBooks={audioBooks}/>
			<About/>
		</div>
	);
};
export default HomeView;
