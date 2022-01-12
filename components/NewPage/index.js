import { useState } from 'react';
import Book from '../shared/common/book';
import Image from 'next/image';
import classNames from 'classnames';
import st from './newPage.module.scss';

const NewPage = () => {
	const popularSelections = [
		{ id: '0', option: 'Последние поступления' },
		{ id: '1', option: 'Популярные' },
	];

	const booksSelections = [
		{ id: '0', option: 'Все' },
		{ id: '1', option: 'Книги' },
		{ id: '2', option: 'Аудиокниги' },
	];

	const newBooks = [
		{ id: '0' },
		{ id: '1' },
		{ id: '2' },
		{ id: '3' },
		{ id: '4' },
		{ id: '5' },
		{ id: '6' },
		{ id: '7' },
		{ id: '8' },
		{ id: '9' },
		{ id: '10' },
		{ id: '11' },
		{ id: '12' },
		{ id: '13' },
		{ id: '14' },
		{ id: '15' },
		{ id: '16' },
		{ id: '17' },
		{ id: '18' },
		{ id: '19' },
		{ id: '20' },
		{ id: '21' },
		{ id: '22' },
		{ id: '23' },
		{ id: '24' },
		{ id: '25' },
		{ id: '26' },
		{ id: '27' },
		{ id: '28' },
		{ id: '29' },
		{ id: '30' },
		{ id: '31' },
		{ id: '32' },
		{ id: '33' },
	];

	const [activePopSel, setActivPopSel] = useState(0);
	const [activeBookSel, setActiveBookSel] = useState(0);

	return (
		<div className="container">
			<h2 className={st.newsTitle}>Новинки</h2>
			<div className={st.filtersBtns}>
				<div className={st.popularSelections}>
					{popularSelections.map((select, index) => (
						<button
							key={select.id}
							className={classNames(st.selectFilters, {
								[st.selectFiltersActive]: index === activePopSel,
							})}
							onClick={() => setActivPopSel(index)}
						>
							{select.option}
						</button>
					))}
				</div>
				<div className={st.booksSelections}>
					{booksSelections.map((select, index) => (
						<button
							key={select.id}
							className={classNames(st.selectFilters, {
								[st.selectFiltersActive]: index === activeBookSel,
							})}
							onClick={() => {
								setActiveBookSel(index);
							}}
						>
							{select.option}
						</button>
					))}
				</div>
			</div>
			<div className={st.mainBlock}>
				<div className={st.booksGrid}>
					{newBooks.map(it => (
						<div key={it.id}>
							<Book />
						</div>
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
			<p className={st.pagination}>1 2 3 4</p>
			<div className={st.mountains}>
				<Image src="/mountains.png" width={1200} height={400} alt="" />
			</div>
		</div>
	);
};

export default NewPage;
