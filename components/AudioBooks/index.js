import Link from 'next/link';
import classnames from 'classnames';
import ShowAll from '../shared/common/showAll/ShowAll';
import BookFilters from '../shared/common/booksFilters/BookFilters';
import BooksMainBlock from '../shared/common/booksMainBlock/BooksMainBlock';
// import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import categories from '../data/categories.json';

import st from './audioBooks.module.scss';

const AudioBooks = () => {
	// const router = useRouter();

	//   const searchBreadcrumb =
	//     router.query.comingFrom === 'home'
	//       ? {}
	//       : {
	//           label: `${router.query.page}`,
	//           path: `${router.pathname}`,
	//         };

	// const breadcrumbsData = [
	//   // searchBreadcrumb,
	//   {
	//     label: `${router.query.page}`,
	//     path: `${router.pathname}`,
	//   },
	// ];

	return (
		<div className={classnames('container', st.abContainer)}>
			{/* <Breadcrumbs data={breadcrumbsData} /> */}

			<h2 className={st.abTitle}>Аудиокниги</h2>
			{categories.map(({ id, category }) => (
				<button key={id} className={st.abCateg}>
					<Link href={`/audiobooks/${id}`}>
						<a className={st.abCategLink}>{category}</a>
					</Link>
				</button>
			))}
			<ShowAll url="#" text="Показать все" />
			<BookFilters />
			<BooksMainBlock audio={true} />
		</div>
	);
};

export default AudioBooks;
