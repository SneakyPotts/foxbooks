import React from 'react';
import Book from '../shared/common/book';
import Image from 'next/image';
import st from './newPage.module.scss';
import {useSelector} from "react-redux";
import MyPagination from "../shared/common/MyPagination";
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import {useRouter} from "next/router";
import BookFilters from "../shared/common/booksFilters/BookFilters";

const sortFilters = [
	{ id: 1, title: 'Последние поступления', value: 1 },
	{ id: 2, title: 'Популярные', value: 5 },
];

const typeFilters = [
	{ id: 1, title: 'Все', value: 'all' },
	{ id: 2, title: 'Книги', value: 'books' },
	{ id: 3, title: 'Аудиокниги', value: 'audioBooks' }
];

const NewPage = () => {
	const router = useRouter()

	const { novelties } = useSelector(state => state.novelties)

	return (
		<div className="container">
			<Breadcrumbs
				data={[{
					title: 'Новинки',
					path: router.asPath
				}]}
			/>

			<h2 className={st.newsTitle}>Новинки</h2>

			<div className={st.filtersBtns}>
				<BookFilters
					filters={sortFilters}
					queryName={'sortBy'}
				/>
				<BookFilters
					filters={typeFilters}
					queryName={'type'}
				/>
			</div>

			<div className={st.mainBlock}>
				{novelties?.data?.length ?
					<div>
						<div className={st.booksGrid}>
							{novelties?.data?.map(i => (
								<div key={i?.id}>
									<Book
										book={i}
										audio={i?.type}
									/>
								</div>
							))}
						</div>
						<MyPagination
							lastPage={novelties?.last_page}
						/>
					</div> :
					<p className="empty">Книги не найдены</p>
				}

				<div className={st.advertisingBlok}>
					<div className={st.bannerBlock}>
						<img src="/banner.png" alt="" className={st.banner} />
					</div>
					<div className={st.bannerBlock}>
						<img src="/banner.png" alt="" className={st.banner} />
					</div>
				</div>
			</div>

			<div className={st.mountains}>
				<Image src="/mountains.png" width={1200} height={400} alt="" />
			</div>
		</div>
	);
};

export default NewPage;
