import { useState } from 'react';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';

import st from './category.module.scss';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const data = [
	{
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

	const { books } = useSelector(state => state.book)

	return (
		<div className="container">
			<div className={classnames(st.head, { [st.headActive]: flagSwitcher })}>
				<h2 className={st.title}>Category</h2>
				{data.map((it, index) => (
					<Popular
						key={index}
						data={it.options}
						queryName={it.queryName}
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
