import ReviewComponent from '../ReviewComponen';
import st from './review.module.scss';
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import React from "react";
import {useRouter} from "next/router";
import MyPagination from "../shared/common/MyPagination";

const ReviewPage = () => {
	const router = useRouter()

	const reviews = [
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			raiting: '5',
		},
	];

	return (
		<div className="container">
			<Breadcrumbs
				data={[
					{
						title: `Автор “Джоан Кэтлин Роулинг”`,
						path: '/'
					},
					{
						title: router.pathname.includes('/reviews') ? 'Рецензии' : 'Цитаты',
						path: router.asPath
					}
				]}
			/>

			<h1 className="title">
				{router.pathname.includes('/reviews') ? 'Рецензии на книги' : 'Цитаты из книг'} автора «Джоан Кэтлин Роулинг»
			</h1>
			<p className={st.amount}>2199 рецензий</p>

			<div className={st.wrapper}>
				<div className={st.main}>
					{reviews.map((it, idx) => (
						<ReviewComponent key={idx} it={it} idx={idx} />
					))}

					<MyPagination lastPage={20}/>
				</div>

				<div className={st.advertisingBlok}>
					<img src="/banner.png" alt="" className={st.banner} />
					<img src="/banner.png" alt="" className={st.banner} />
				</div>
			</div>
		</div>
	);
};

export default ReviewPage;
