import Link from 'next/link';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './categories.module.scss';
import { useSelector } from 'react-redux';
import {useRouter} from "next/router";

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

			<Link href="/categories">
				<a className={css.all}>
					<p className={css.textAll}>Все категории</p>
					<span className={css.iconAll}>
						<ArrowAll className={css.arrowAll} />
					</span>
				</a>
			</Link>
		</div>
  );
};
export default Categories;
