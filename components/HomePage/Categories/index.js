import Link from 'next/link';
import css from './categories.module.scss';
import { useSelector } from 'react-redux';
import {useRouter} from "next/router";
import ShowAll from "../../shared/common/showAll/ShowAll";
import React from "react";

const Categories = () => {
	const router = useRouter()
	const { categories } = useSelector(state => state.book)

	const cats = categories?.slice(0, 12) || []

	return (
		<div className={css.categNav}>
			<h3 className={css.title}>Категории книг</h3>
			<ul className={css.categList}>
				{cats?.map(({ id, name }) => (
					<li key={id} className={css.categ}>
						<Link href={`/books/${id}?type=${router.query?.type || 'books'}&showType=block&sortBy=1`}>
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
