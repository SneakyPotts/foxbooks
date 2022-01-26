import React, { useState } from 'react';
import Popular from './Popular/Popular';
import Author from './Author/Author';
import ClearAll from './Clear/Clear';
import Book from '../shared/common/book';

import css from './filter.module.css';
import {useSelector} from "react-redux";
import MyPagination from "../shared/common/MyPagination";

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
	{
		title: 'Категории',
		isCategory: true,
		queryName: 'findByCategory'
	},
	{
		title: 'Автор',
		isAlphabet: true,
		options: [
			'А',
			'Б',
			'В',
			'Г',
			'Д',
			'Е',
			'Ё',
			'Ж',
			'З',
			'И',
			'Й',
			'К',
			'Л',
			'М',
			'Н',
			'О',
			'П',
			'Р',
			'С',
			'Т',
			'У',
			'Ф',
			'Х',
			'Ц',
			'Ч',
			'Ш',
			'Щ',
			'Э',
			'Ю',
			'Я',
		],
		queryName: 'alphabetAuthorIndex'
	},
	{
		title: 'Книга',
		isAlphabet: true,
		options: [
			'А',
			'Б',
			'В',
			'Г',
			'Д',
			'Е',
			'Ё',
			'Ж',
			'З',
			'И',
			'Й',
			'К',
			'Л',
			'М',
			'Н',
			'О',
			'П',
			'Р',
			'С',
			'Т',
			'У',
			'Ф',
			'Х',
			'Ц',
			'Ч',
			'Ш',
			'Щ',
			'Э',
			'Ю',
			'Я',
		],
		queryName: 'alphabetTitleIndex'
	},
];

const Filters = () => {
	const [stateIndex, setStateIndex] = useState(null);
	const { categories, books } = useSelector(state => state.book)

	const categoryOptions = categories?.map((i, index) => ({
		id: index + 1,
		title: i?.name,
		value: i?.id
	}))

	categoryOptions?.unshift({id: 0, title: 'Все категории'})

	return (
		<div className={css.wrapper}>
			<div className={css.container}>
				<div className={css.options}>
					{data?.map((it, index) =>
						<Popular
							key={it?.title}
							title={it?.title}
							defaultValue={it?.defaultValue}
							data={it?.isCategory ? categoryOptions : it?.options}
							queryName={it?.queryName}
							isAlphabet={it?.isAlphabet}
							setFilStateIdx={setStateIndex}
							elIdx={index}
							filterStateIdx={stateIndex}
						/>
					)}
				</div>
				<div>
					<ClearAll />
				</div>
			</div>
			{books?.data?.length ?
				<>
					<ul className={css.bookList}>
						{books?.data?.map(book => (
							<li key={book?.id} className={css.book}>
								<Book book={book} />
							</li>
						))}
					</ul>
					<MyPagination lastPage={books?.last_page} />
				</> :
				<p className="empty">Книги не найдены</p>
			}
		</div>
	);
};
export default Filters;
