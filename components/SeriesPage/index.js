import React from 'react';
import {useSelector} from "react-redux";
import Book from '../shared/common/book';

import st from './series.module.scss';
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import {useRouter} from "next/router";

const SeriesPage = () => {
	const router = useRouter()
	const { series } = useSelector(state => state.author)

	return (
		<div className="container">
			<Breadcrumbs
				data={[
					{
						title: `Серия “${series?.series}”`,
						path: router.asPath
					}
				]}
			/>

			<h2 className={st.title}>Серия “{series?.series}”</h2>
			<p className={st.amount}>{series?.books_count} книг</p>

			<div className={st.wrapper}>
				<div className={st.booksColumn}>
					{series?.books?.map(i => (
						<Book
							key={i?.id}
							book={i}
							type={i?.type}
							flagSwitcher={true}
						/>
					))}
				</div>

				<div className={st.advertisingBlok}>
					<img src="/banner.png" alt="" className={st.banner} />
					<img src="/banner.png" alt="" className={st.banner} />
				</div>
			</div>
		</div>
	);
};

export default SeriesPage;
