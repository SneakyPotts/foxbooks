import React, {useMemo, useState} from 'react';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';

import st from './category.module.scss';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import MyPagination from "../../shared/common/MyPagination";
import Breadcrumbs from "../../BreadCrumps/BreadCrumps";

const data = [
	{
		title: 'Популярные',
		defaultValue: 3,
		options: [
			{id: 1, title: 'Популярные', value: 3},
			{id: 2, title: 'Высокий рейтинг', value: 3},
			{id: 3, title: 'Много отзывов', value: 1},
			{id: 4, title: 'Сейчас читают', value: 2}
		],
		queryName: 'sortBy'
	},
];

const Category = () => {
	const router = useRouter()
	const [stateIndex, setStateIndex] = useState(null);
	const [flagSwitcher, setFlagSwitcher] = useState(router.query['showType'] === 'list');

	const { categories, books } = useSelector(state => state.book)

	const currentCategory = categories?.find(i => i?.id == router?.query?.id)?.name

	return (
		<div className="container">
			<Breadcrumbs
				data={[
					{path: '/books?sortBy=1', title: 'Книги'},
					{path: router.asPath, title: currentCategory}
				]}
			/>
			<div className={classnames(st.head, { [st.headActive]: flagSwitcher })}>
				<h2 className={st.title}>{currentCategory}</h2>
				{data.map((it, index) => (
					<Popular
						key={index}
						title={it?.title}
						defaultValue={it?.defaultValue}
						data={it?.options}
						queryName={it?.queryName}
						filterStateIdx={stateIndex}
						elIdx={index}
						setFilStateIdx={setStateIndex}
					/>
				))}
				<Switcher
					setFlagSwitcher={setFlagSwitcher}
					flagSwitcher={flagSwitcher}
				/>
			</div>

			<div className={st.mainBlock}>
				<div>
					<SideFilters />
				</div>
				<div className="booksWrapper">
					{books?.data?.length ?
						<>
							<div
								className={classnames({
									[st.booksGrid]: !flagSwitcher,
									[st.booksColumn]: flagSwitcher,
								})}
							>
								{books?.data?.map(book => (
									<Book key={book.id} flagSwitcher={flagSwitcher} book={book} />
								))}
							</div>
							<MyPagination lastPage={books?.last_page} />
						</> :
						<p className="empty">Книги не найдены</p>
					}					
				</div>
				<div className={st.advertisingBlok}>
					<div className={st.bannerBlock}>
						<img src="/banner.png" alt="" className={st.banner} />
					</div>
					<div className={st.bannerBlock}>
						<img src="/banner.png" alt="" className={st.banner} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category;
