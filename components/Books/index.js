import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';

import st from './books.module.scss';
import {useSelector} from "react-redux";

const Books = () => {
	const { categories } = useSelector(state => state.home)

	return (
		<div className={classnames('container', st.abContainer)}>
			{/* <Breadcrumbs data={breadcrumbsData} /> */}

			<h2 className={st.abTitle}>Книги</h2>
			{categories?.map(i => (
				<button key={i?.id} className={st.abCateg}>
					<Link href={`/books/${i?.id}?showType=block&sortBy=3`}>
						<a className={st.abCategLink}>{i?.name}</a>
					</Link>
				</button>
			))}
			<ShowAll url="#" text="Показать все" />
			<BookFilters />
			<BooksMainBlock />
		</div>
	);
};

export default Books;
