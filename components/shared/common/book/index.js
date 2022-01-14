import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import Image from 'next/image';
import Stars from '../stars/Stars';
import Headphones from '../../icons/headphones';
import AddToBooks from '../../icons/add';
import HorizontalDots from '../../../../public/horizontalDots.svg';
import OpenBook from '../../../../public/book-open.svg';
import Like from '../../icons/heart';
import Comment from '../../icons/comment';
import Basket from '../../../../public/trash.svg';
import st from './book.module.scss';
import {audioBook} from "../../../../store/bookSlice";

const Book = ({ audio, flagSwitcher, classNames, similar, book }) => {
	const dispatch = useDispatch();
	// const { audioFlag } = useSelector(state => state.book);

	const [changeIcon, setChangeIcon] = useState(false);
	const [options, setOptions] = useState(false);

	const route = useRouter();
	// console.log(route, 'router');

	const bookLinkClick = () => {
		if (audio) {
			dispatch(audioBook(true));
		} else if (!audio) {
			dispatch(audioBook(false));
		}
	};

	const onChangeIcon = () => {
		setChangeIcon(true);
	};

	const checkOptions = () => {
		setOptions(!options);
	};

	return (
		<div
			className={classnames(classNames, {
				[st.container]: !flagSwitcher,
				[st.containerColumn]: flagSwitcher,
			})}
		>
			<div className={st.wrapper}>
				<Link href={`/book/${book?.id}`}>
					<a onClick={bookLinkClick}>
						<Image
							src="/horizontalBookCovers/book.png"
							alt=""
							width={180}
							height={audio ? '180' : '271'}
							placeholder="blur"
							blurDataURL="/images/blur.jpg"
							layout="responsive"
						/>
					</a>
				</Link>
				{!flagSwitcher && <span className={st.bookCategorie}>{book?.book_genres?.length ? book?.book_genres[0] : ''}</span>}
				{audio && (
					<span className={st.audioIcon}>
						<Headphones />
					</span>
				)}
			</div>
			<div className={classnames({ [st.bookInfo]: flagSwitcher })}>
				<div
					className={classnames(st.bookRating, {
						[st.starOrder]: flagSwitcher,
						[st.starOrderList]: flagSwitcher && !audio,
					})}
				>
					<div className={st.stars}>
						<Stars value={book?.rates_count} />
					</div>
					<div className={classnames({ [st.raitingAmount]: flagSwitcher })}>
						<span>{book?.rates_avg} </span>
						{!similar && <span>({book?.book_likes_count})</span>}
					</div>
				</div>
				<Link href={`/book/${book?.id}`}>
					<a className={classnames(st.bookName, {
						[st.bookNameSmaller]: similar,
					})}>
						{book?.title}
					</a>
				</Link>

				<Link href="/author">
					<a className={st.bookAuthor}>{book?.authors?.length ? book?.authors[0]?.author : ''}</a>
				</Link>
				{flagSwitcher && (
					<div className={classnames(st.extraInfo, { [st.addInfo]: !audio })}>
						<p className={st.bookYear}>
							<span>2021</span>
							<span className={st.bookGenre}>{book?.book_genres?.length ? book?.book_genres[0] : ''}</span>
						</p>
						<p className={classnames(st.aboutBook, { [st.lines]: !audio })}>
							{book?.text}
						</p>
						{!audio && (
							<div className={st.reviewStatistic}>
								<span className={st.reviewIcon}>
									<Like />
								</span>
								<span className={st.reviewLike}>3115</span>
								<span className={st.reviewIcon}>
									<Comment />
								</span>
								<span>700</span>
							</div>
						)}
					</div>
				)}
				{flagSwitcher && (
					<div>
						<span
							className={classnames(st.addIcon, { [st.hide]: changeIcon })}
							onClick={onChangeIcon}
						>
							<AddToBooks />
						</span>
						{changeIcon && (
							<span className={classnames(st.dotsIcon)} onClick={checkOptions}>
								<HorizontalDots />
							</span>
						)}
						{options && (
							<div className={st.optionWindow}>
								<p className={st.optionRead}>
									<span className={st.optionIcon}>
										<OpenBook />
									</span>
                  Читаю
								</p>
								<p className={st.optionDelete}>
									<span className={st.optionIcon}>
										<Basket />
									</span>
                  Удалить из моих книг
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
export default Book;
