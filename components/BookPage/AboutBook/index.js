import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import Image from 'next/image';
import Stars from '../../shared/common/stars/Stars';
import Dots from '../../../public/horizontalDots.svg';
import BookMark from '../../../public/bookmark.svg';
import OpenBook from '../../../public/book-open.svg';
import Flag from '../../../public/flag.svg';
import Add from '../../../public/plus.svg';
import Headphones from '../../shared/icons/headphones';
import Basket from '../../../public/trash.svg';

import st from './aboutBook.module.scss';
import {setBookRating, setBookStatus} from "../../../store/bookSlice";
import {useRouter} from "next/router";

const AboutBook = ({ book, audio }) => {
	const dataBook = [
		{
			id: '0',
			img: '/horizontalBookCovers/book.png',
			title: 'Гарри Поттер и философский камень',
			author: 'Джоан Роулинг',
			year: '1997',
			age: '6+',
			raiting: '5',
			about_book:
        'Книга, покорившая мир, эталон литературы для читателей всех возрастов, синоним успеха. Книга, сделавшая Джоан Роулинг самым читаемым писателем современности. Книга, ставшая культовой уже для нескольких поколений. "Гарри Поттер и Философский камень" - история начинается.',
			reader: 'Дмитрий Быков',
			publishing: 'Махаон',
			translater: 'Мария Спивак',
			ganre: 'Фэнтези, зарубежная литература, детские книги',
			copyright_holder: 'Pottermore limited',
			series: 'Гарри Поттер',
		},
	];

	const dataOptions = [
		{ id: '0', svg: <BookMark />, option: 'Хочу прочитать', value: 1 },
		{ id: '1', svg: <OpenBook />, option: 'Читаю', value: 2 },
		{ id: '2', svg: <Flag />, option: 'Прочитано', value: 3 },
		{ id: '3', svg: <Add />, option: 'В мои подборки' },
		{ id: '4', svg: <Basket />, option: 'Удалить из моих книг' },
	];

	const dispatch = useDispatch()
	const router = useRouter()

	const { audioFlag } = useSelector(state => state.book);

	const [openMenu, setOpenMenu] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);

	const showPopup = res => {
		if (res.meta.requestStatus === "fulfilled") {
			setShowPopUp(true);
			setTimeout(() => setShowPopUp(false), 5000);
		}
	}

	const changeBookStatus = value => {
		setOpenMenu(false)
		dispatch(setBookStatus({id: router.query?.id, value})).then(res => showPopup(res))
	}

	const setRating = value => {
		dispatch(setBookRating({id: router.query.id, value}))
	}

	return (
		<div>
			<div key={book.id} className={st.bookInfo}>
				<div className={st.bookMainInfo}>
					<div
						className={classnames(st.bookCover, {
							[st.bookCoverAudio]: audioFlag,
						})}
					>
						<Image
							src="/horizontalBookCovers/book.png"
							height={audioFlag ? 270 : 406}
							width={270}
							layout="fill"
							placeholder="blur"
							blurDataURL="/images/blur.jpg"
						/>

						{audioFlag && (
							<div className={st.bookCoverIcon}>
								<Headphones />
							</div>
						)}
					</div>
					<div className={st.aboutBook}>
						<h1 className={st.bookTitle}>{book?.title}</h1>
						<p className={st.bookAuthor}>
							<Link href="/author">
								<a className={st.bookAuthorName}>{book?.authors[0]?.author}</a>
							</Link>
							<Link href="#">
								<a className={st.bookAuthorLink}>(все книги автора)</a>
							</Link>
						</p>
						<div className={st.bookDate}>
							{audioFlag && (
								<div>
									<span className={st.audioInfo}>
										<span>40</span>мин.
									</span>
									<span className={st.audioInfo}>
										<span>42</span> Мбайт
									</span>
								</div>
							)}
							<span className={st.bookDateYear}>{book?.year}год</span>
							<span>{book.age}</span>
						</div>
						<div className={st.bookRaiting}>
							<p className={st.bookRaitingCount}>Рейтинг {book?.rates_count}</p>
							<Stars value={book?.rates_count} />
						</div>
						<div className={st.buttons}>
							{audioFlag ? (
								<button className={st.readButton}>Начать слушать</button>
							) : (
								<button className={st.readButton}>Читать</button>
							)}
							<div className={st.dropdown}>
								<span
									className={classnames(st.dotsButton, {
										[st.activBtn]: openMenu,
									})}
									onClick={() => setOpenMenu(!openMenu)}
								>
									<Dots />
								</span>
								{openMenu && (
									<ul className={st.menu}>
										{dataOptions.map((it, index) => (
											<li
												key={it?.id}
												onClick={() => changeBookStatus(it?.value)}
												className={st.menuItem}
											>
												{it?.svg}
												<span>{it?.option}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>

						<ul className={st.navLinks}>
							<li>
								<Link href="#">
									<a>О книге</a>
								</Link>
							</li>
							<li>
								<Link href="#reviews">
									<a>Рецензии 37</a>
								</Link>
							</li>
							<li>
								{audioFlag ? (
									<Link href="#quotes">
										<a>Слушают 129</a>
									</Link>
								) : (
									<Link href="#quotes">
										<a>Цитаты 15</a>
									</Link>
								)}
							</li>
							<li>
								<Link href="#similar">
									<a>Похожие книги</a>
								</Link>
							</li>
						</ul>
						<p>{book?.text}</p>
						<div className={st.ditalInfo}>
							{audioFlag ? (
								<p>
                    Чтец: <span>{book.reader}</span>
								</p>
							) : (
								<>
									<p>
                      Издательство: <span>{book.publishing}</span>
									</p>
									<p>
                      Переводчик: <span>{book.translater}</span>
									</p>
								</>
							)}

							<p>
                  Жанр: <span>{book.ganre}</span>
							</p>
							<p>
                  Правообладатель: <span>{book.copyright_holder}</span>
							</p>
							<p>Серия: {book.series}</p>
						</div>
						<div className={st.starsBlock}>
							<p>Оцените книгу</p>
							<Stars
								activeStart={true}
								value={0}
								color={'#4f4f4f'}
								onChange={value => setRating(value)}
							/>
						</div>
					</div>
				</div>
			</div>
			{showPopUp && (
				<div className={st.popUp}>
					<p>
            Книга “Гарри Поттер и философский камень” добавлена{' '}
						<Link href="#">
							<a className={st.popUpLink}>в вашу библиотеку</a>
						</Link>
					</p>
				</div>
			)}
		</div>
	);
};

export default AboutBook;
