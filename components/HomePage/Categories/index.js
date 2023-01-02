import Link from 'next/link';
import css from './categories.module.scss';
import { useSelector } from 'react-redux';
import ShowAll from "../../shared/common/showAll/ShowAll";
import React from "react";
import {useRouter} from "next/router";

const Categories = ({booksType}) => {
	const router = useRouter();
	const { categories } = useSelector(state => state.book)

	const cats = categories?.slice(0, 12) || []

	return (
		<div className={css.categNav}>
			<h3 className={css.title}>Категории книг</h3>
			<ul className={css.categList}>
				{cats?.map(({ id, name, slug }) => (
					<li key={id} className={css.categ}>
						<Link href={`/${booksType || 'books'}/${slug}${router.query.showType ? `?showType=${router.query.showType}` : ''}`}>
							{name}
						</Link>
					</li>
				))}
			</ul>

			<ShowAll
				url={'/categories'}
				arrowSecondary
			/>
		</div>
  );
};
export default Categories;
