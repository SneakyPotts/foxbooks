import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import { AudioBook } from './bookSlice';
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

<<<<<<< HEAD
const Book = ({ audio, flagSwitcher, classNames, similar }) => {
	const dispatch = useDispatch();
	// const { audioFlag } = useSelector(state => state.bookSlice);
=======
const Book = ({
  audio,
  flagSwitcher,
  classNames,
  similar,
  noLinks = false,
}) => {
  const dispatch = useDispatch();
  // const { audioFlag } = useSelector(state => state.bookSlice);
>>>>>>> origin/test

	const [changeIcon, setChangeIcon] = useState(false);
	const [options, setOptions] = useState(false);

	const route = useRouter();
	// console.log(route, 'router');

	const bookLinkClick = () => {
		if (audio) {
			dispatch(AudioBook(true));
		} else if (!audio) {
			dispatch(AudioBook(false));
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
        {!noLinks ? (
          <Link href="/book">
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
        ) : (
          <Image
            src="/horizontalBookCovers/book.png"
            alt=""
            width={180}
            height={audio ? '180' : '271'}
            placeholder="blur"
            blurDataURL="/images/blur.jpg"
            layout="responsive"
          />
        )}

        {!flagSwitcher && <span className={st.bookCategorie}>Фентези</span>}
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
            <Stars />
          </div>
          <div className={classnames({ [st.raitingAmount]: flagSwitcher })}>
            <span>4,9 </span>
            {!similar && <span>(450)</span>}
          </div>
        </div>
        {noLinks ? (
          <h3
            className={classnames(st.bookName, {
              [st.bookNameSmaller]: similar,
            })}
          >
            Искатели неба: Холодные берега Искатели неба: Холодные берега
          </h3>
        ) : (
          <Link href="/book">
            <a>
              <h3
                className={classnames(st.bookName, {
                  [st.bookNameSmaller]: similar,
                })}
              >
                Искатели неба: Холодные берега Искатели неба: Холодные берега
              </h3>
            </a>
          </Link>
        )}

        {noLinks ? (
          <span className={st.bookAuthor}>Сергей Лукьяненко</span>
        ) : (
          <Link href="/author">
            <a className={st.bookAuthor}>Сергей Лукьяненко</a>
          </Link>
        )}

        {flagSwitcher && (
          <div className={classnames(st.extraInfo, { [st.addInfo]: !audio })}>
            <p className={st.bookYear}>
              <span>2021</span>
              <span className={st.bookGenre}>Фэнтези</span>
            </p>
            <p className={classnames(st.aboutBook, { [st.lines]: !audio })}>
              Я — Макеева Кира Александровна. И я окончательно запуталась. Жизнь
              сложилась не так радужно, как Я — Макеева Кира Александровна. И я
              окончательно запуталась. Жизнь сложилась не так радужно, как Я —
              Макеева Кира Александровна. И я окончательно запуталась. Жизнь
              сложилась не так радужно, как Я — Макеева Кира Александровна.
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
