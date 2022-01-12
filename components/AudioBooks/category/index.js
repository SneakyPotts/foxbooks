import { useState } from 'react';
import classnames from 'classnames';
import Switcher from '../../switcher/Switcher';
import Book from '../../shared/common/book';
import SideFilters from '../../SideFilters';
import Popular from '../../Filter/Popular/Popular';

import st from './category.module.scss';

const Category = () => {
	const [stateIndex, setStateIndex] = useState(null);
	const [flagSwitcher, setFlagSwitcher] = useState(false);

	const books = [
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
		{ id: '34' },
		{ id: '35' },
		{ id: '36' },
		{ id: '37' },
		{ id: '38' },
		{ id: '39' },
		{ id: '40' },
		{ id: '41' },
		{ id: '42' },
		{ id: '43' },
		{ id: '44' },
		{ id: '45' },
		{ id: '46' },
		{ id: '47' },
	];
	const data = [
		{
			title: 'Популярные',
			options: [
				'Популярные',
				'Высокий рейтинг',
				'Много отзывов',
				'Сейчас читают',
			],
		},
	];

	return (
		<div className="container">
			<div className={classnames(st.head, { [st.headActive]: flagSwitcher })}>
				<h2 className={st.title}>Category</h2>
				{data.map((it, index) => (
					<Popular
						key={it.title}
						title={it.title}
						data={it.options}
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
					{books.map(book => (
						<Book
							key={book.id}
							audio={true}
							flagSwitcher={flagSwitcher}
							className={st.book}
						/>
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
