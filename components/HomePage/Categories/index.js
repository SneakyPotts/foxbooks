import Link from 'next/link';
import categories from '../../data/categories.json';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './categories.module.css';
import {useSelector} from "react-redux";

const Categories = () => {
	// const { categories } = useSelector(state => state.home)

	// console.log('categories', categories)
	return (
		<>
			<div className={css.categNav}>
				<h3 className={css.title}>Категории книг</h3>
				<ul className={css.categList}>
					{categories.map(({ id, category }) => (
						<li key={id} className={css.categ}>
							{category}
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
		</>
	);
};
export default Categories;
