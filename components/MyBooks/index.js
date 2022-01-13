import Image from 'next/image';
// import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import Book from '../shared/common/book';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import ArrowRight from '../../public/chevron-right.svg';
import Headphones from '../shared/icons/headphones';
import ArrowAll from '../../public/chevron-down.svg';
import All from '../../public/all.svg';
import BookMark from '../../public/bookmark.svg';
import OpenBook from '../../public/book-open.svg';
import Flag from '../../public/flag.svg';
import Delete from '../../public/delete.svg';
import Button from '../shared/common/Button/Button';
import MySelection from './MySelection';
import st from './myBooks.module.scss';

const MyBooks = () => {
	const dataBooks = [
		{
			id: '0',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '23',
		},
		{
			id: '1',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '10',
		},
		{
			id: '2',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '23',
		},
		{
			id: '3',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '13',
		},
		{
			id: '4',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '23',
		},
		{
			id: '5',
			img: '/reviewsBookCovers/cover2.png',
			audio: true,
			progress: '54',
		},
		{
			id: '6',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '1',
		},
		{
			id: '7',
			img: '/reviewsBookCovers/cover2.png',
			audio: true,
			progress: '37',
		},
		{
			id: '8',
			img: '/reviewsBookCovers/cover2.png',
			audio: false,
			progress: '23',
		},
	];
	const tab = [
		{ text: 'Книги', count: 1 },
		{ text: 'Аудиокниги', count: 2 },
		{ text: 'Подборки', count: 3 },
		{ text: 'Рецензии', count: 4 },
		{ text: 'Цитаты', count: 5 },
		{ text: 'Авторы', count: 6 },
	];
	const options = [
		{ option: 'Все', svg: <All /> },
		{ option: 'Хочу прочитать', svg: <BookMark /> },
		{ option: 'Читаю', svg: <OpenBook /> },
		{ option: 'Прочитано', svg: <Flag /> },
	];
	const popular = [
		{ option: 'Популярные' },
		{ option: 'По дате добавления' },
		{ option: 'По алфавиту' },
	];
	const selections = ['Все', 'Мои', 'Fox подборки'];

	const [menu, setMenu] = useState(false);
	const [filter, setFilter] = useState(false);
	const [filterIdx, setFilterIdx] = useState(null);
	const [activeFilter, setActiveFilter] = useState('Популярные');
	const [showSelections, setShowSelections] = useState(false);
	const [showSelectionsIdx, setShowSelectionsIdx] = useState(null);
	const [showInput, setShowInput] = useState(false);
	const [deletePopap, setDeletePopap] = useState(false);
	const [shoudlDelete, setShouldDelete] = useState(null);
	const [tabValue, setTabValue] = useState('Книги');
	const [activeOption, setActiveOption] = useState('Все');
	const [activeSelections, setActiveSelections] = useState('Все');
	const [createSelection, setCreateSelection] = useState(false);
	const [books, setBooks] = useState([
		{ id: 0 },
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
	]);
	// console.log(books);

	useEffect(() => {
		const body = document.querySelector('body');
		body.addEventListener('click', close);

		return () => {
			body.removeEventListener('click', close);
		};
	}, []);

	const togle = e => {
		e.stopPropagation();
		setMenu(!menu);
	};

	const handleClick = e => {
		e.stopPropagation();
		setFilter(!filter);
	};

	e.stopPropagation();
	setShowSelections(!showSelections);
};

const handleSelectionClick = idx => {
	setActiveSelections(selections[idx]);
	setShowSelectionsIdx(idx);
};

const filterClick = idx => {
	setActiveFilter(popular[idx].option);
	setFilterIdx(idx);
};

const handleInput = e => {
	e.stopPropagation();
	setShowInput(true);
};

setShouldDelete(id);
	};

const deleteBook = () => {
	setBooks(books.filter(book => book.id !== shoudlDelete));
	setDeletePopap(false);
};

// console.log(tabValue);
return (
	<>
		{!createSelection ? (
			<>
				<div className="container">
					<h2 className={st.title}>Мои книги</h2>
					<div>
						{' '}
						<Swiper
							modules={[Navigation]}
							navigation={{
								prevEl: '.prevArrow',
								nextEl: '.nextArrow',
							}}
							// onSlideChange={() => console.log('slide change')}
							// onSwiper={(swiper) => console.log(swiper)}
							spaceBetween={24}
							slidesPerView={7}
						>
							{dataBooks.map(book => (
								<SwiperSlide
									className={classnames({
										[st.slider]: !book.audio,
										[st.sliderAudio]: book.audio,
									})}
									key={book.id}
								>
									<div className={st.bookProgress}>
										<span className={st.bookProgressCount}>
											{book.progress}%
										</span>
										<div>
											<img
												src={book.img}
												className={classnames({
													[st.bookCover]: !book.audio,
													[st.audioBookCover]: book.audio,
												})}
											/>
										</div>
										{book.audio && (
											<div className={st.bookIcon}>
												<Headphones />
											</div>
										)}
									</div>
								</SwiperSlide>
							))}
							<button className={classnames('prevArrow', st.positionButton)}>
								<ArrowRight className="arrowNext" />
							</button>
							<button className={classnames('nextArrow', st.positionButton)}>
								<ArrowRight className="arrowNext" />
							</button>
						</Swiper>
					</div>
				</div>
				<div className={st.myMenu}>
					<ul className={st.tabList}>
						{tab.map(({ text, count }) => (
							<li
								key={text}
								className={st.tab}
								onClick={() => setTabValue(text)}
							>
								<h2>{count}</h2>
								<p>{text}</p>
							</li>
						))}
					</ul>
				</div>
				<div className={classnames('container', st.section)}>
					<div className={st.header}>
						<div className={st.options}>
							{(tabValue === 'Книги' || tabValue === 'Аудиокниги') && (
								<>
									<span className={st.optionsLabel}>Статус</span>
									<div className={st.dropdown}>
										<button
											className={classnames(st.dropdownBtn, {
												[st.active]: menu,
											})}
											onClick={togle}
										>
											{activeOption}
											<ArrowAll
												className={classnames(st.down, {
													[st.up]: menu,
												})}
											/>
										</button>
										{menu && (
											<ul className={st.dropdownList}>
												{options.map((opt, idx) => (
													<li
														className={st.dropdownListItem}
														onClick={() => handleOptions(idx)}
													>
														{opt.svg}
														<span>{opt.option}</span>
													</li>
												))}
											</ul>
										)}
									</div>
								</>
							)}
							{tabValue === 'Подборки' && (
								<div
									className={classnames(
										st.dropdownPopular,
										st.dropdownSelection
									)}
								>
									<button
										className={classnames(st.dropdownPopularBtn, {
											[st.active]: showSelections,
										})}
										onClick={handleSelections}
									>
										{activeSelections}
										<ArrowAll
											className={classnames(st.down, {
												[st.up]: showSelections,
											})}
										/>
									</button>
									{showSelections && (
										<ul
											className={classnames(
												st.dropdownPopularList,
												st.dropdownSelectionList
											)}
											onClick={e => e.stopPropagation()}
										>
											{selections.map((opt, idx) => (
												<li
													className={st.dropdownPopularListItem}
													onClick={() => handleSelectionClick(idx)}
												>
													<span
														className={classnames(st.radio, {
															[st.radioActive]: showSelectionsIdx === idx,
														})}
													></span>
													<span>{opt}</span>
												</li>
											))}
										</ul>
									)}
								</div>
							)}
						</div>
						{tabValue === 'Подборки' && activeSelections === 'Мои' ? (
							<Button
								text="Создать новую подборку"
								click={handleCreateSelection}
							/>
						) : (
							<div className={st.filter}>
								<div className={st.input} onClick={handleInput}>
									<FiSearch
										className={classnames(st.inputSvg, {
											[st.inputSvgIcon]: showInput,
										})}
									/>
									{showInput && (
										<input
											placeholder="Искать книгу"
											className={st.inputSearch}
										/>
									)}
								</div>
								<div className={st.dropdownPopular}>
									<button
										className={classnames(st.dropdownPopularBtn, {
											[st.active]: filter,
										})}
										onClick={handleClick}
									>
										{activeFilter}
										<ArrowAll
											className={classnames(st.down, {
												[st.up]: filter,
											})}
										/>
									</button>
									{filter && (
										<ul
											className={st.dropdownPopularList}
											onClick={e => e.stopPropagation()}
										>
											{popular.map((opt, idx) => (
												<li
													className={st.dropdownPopularListItem}
													onClick={() => filterClick(idx)}
												>
													<span
														className={classnames(st.radio, {
															[st.radioActive]: filterIdx === idx,
														})}
													></span>
													<span>{opt.option}</span>
												</li>
											))}
										</ul>
									)}
								</div>
							</div>
						)}
					</div>
					<>
						{tabValue === 'Книги' && (
							<div className={st.bookList}>
								{books.map(book => (
									<div key={book.id} className={st.bookListItem}>
										<Book />
										<span
											className={st.bookListItemDelete}
											onClick={() => showDeletePopap(book.id)}
										>
											<Delete />
										</span>
									</div>
								))}
							</div>
						)}
						{tabValue === 'Аудиокниги' && (
							<div className={st.bookList}>
								{books.map(book => (
									<div key={book.id} className={st.bookListItem}>
										<Book audio={true} />
										<span
											className={st.bookListItemDelete}
											onClick={() => showDeletePopap(book.id)}
										>
											<Delete />
										</span>
									</div>
								))}
							</div>
						)}
					</>
					{tabValue === 'Подборки' && activeSelections !== 'Мои' && (
						<div className={st.selectionsList}>
							{books.map(book => (
								<div key={book.id}>
									<div className={st.selection}>
										<div className={st.selectionBlock}>
											<div className={st.selectionImg}>
												<img
													src="/horizontalBookCovers/bookCover1.png"
													alt=""
												/>
												<div className={st.selectionImgCount}>
													<span>65 </span>
													<span>книг</span>
												</div>
											</div>

											<div className={st.selectionDescription}>
												<h3>Романтическое фэнтези</h3>
											</div>
										</div>
									</div>
									<span
										className={st.bookListItemDelete}
										onClick={() => showDeletePopap(book.id)}
									>
										<Delete />
									</span>
								</div>
							))}
						</div>
					)}
					{tabValue === 'Подборки' && activeSelections === 'Мои' && (
						<div className={st.mySelection}>
							<Image
								src="/createSelectionCover.png"
								width={56}
								height={56}
								alt="selectionCover"
								className={st.selectionIcon}
							/>
							<div className={st.mySelectionData}>
								<p className={st.mySelectionDataName}>Дизайн</p>
								<p>
									<span>1</span>книга
								</p>
							</div>
						</div>
					)}
				</div>
				{deletePopap && (
					<ModalWindow
						modal={deletePopap}
						setModal={setDeletePopap}
						click={deleteBook}
					>
						<div className={st.modal}>
							<h1 className={st.modalTitle}>Удалить книгу</h1>
							<p className={st.modalText}>
								Вы действительно хотите удалить книгу “Колдовской мир. Тройка
								мечей”?
							</p>
							<ButtonGroup
								text="Удалить"
								typeButton="button"
								ClassName={st.modalBtns}
								click={deleteBook}
							/>
						</div>
					</ModalWindow>
				)}
			</>
		) : (
			<MySelection />
		)}
	</>
);
};

export default MyBooks;
