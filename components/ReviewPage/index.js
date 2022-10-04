import ReviewComponent from '../ReviewComponen';
import st from './review.module.scss';
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import React from "react";
import {useRouter} from "next/router";
import MyPagination from "../shared/common/MyPagination";
import {useSelector} from "react-redux";

const ReviewPage = () => {
	const router = useRouter()

	const { authorQuotes, authorReviews } = useSelector(state => state.author)

	const reviews = router.pathname.includes('/reviews');
	const data = reviews ? authorReviews : authorQuotes;

	return (
		<div className="container">
			<Breadcrumbs
				data={[
					{
						title: `Автор «${data[0]?.author}»`,
						path: `/author/${data[0]?.slug}`
					},
					{
						title: reviews ? 'Рецензии' : 'Цитаты',
						path: router.asPath
					}
				]}
			/>

			<h1 className="title">
				{reviews ? 'Рецензии на книги' : 'Цитаты из книг'} автора «{data[0]?.author}»
			</h1>
			<p className={st.amount}>{reviews ? `${data[0]?.author_reviews_count} рецензий` : `${data[0]?.author_quotes_count} цитат`}</p>

			<div className={st.wrapper}>
				<div className={st.main}>
					{data[1]?.data?.map((it, idx) => (
							<ReviewComponent key={idx} it={it} idx={idx} reviews={reviews}/>
						))
					}

					{data[1]?.last_page > 1 && <MyPagination lastPage={data[1]?.last_page}/>}
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
