import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setBreakPoint } from '../../../Header/commonSlice';
import Link from 'next/link';
import classnames from 'classnames';
// import { AudioBook } from './bookSlice';
import Image from 'next/image';
import Stars from '../stars/Stars';
import AddToBooks from '../../icons/add';
import HorizontalDots from '../../icons/horizontalDots';
import OpenBook from '../../icons/bookOpen';
import Like from '../../icons/heart';
import Comment from '../../icons/comment';
import Basket from '../../icons/trash';
import st from './book.module.scss';
import Headphones from '../../icons/headphones';
import Eye from '../../icons/eye';

import { audioBook } from '../../../../store/bookSlice';

const Book = ({
  audio,
  flagSwitcher,
  classNames,
  similar,
  mobalSimilar = false,
  noLinks = false,
  book,
  count,
}) => {
  const dispatch = useDispatch();

  // const { audioFlag } = useSelector(state => state.bookSlice);

  const [changeIcon, setChangeIcon] = useState(false);
  const [options, setOptions] = useState(false);

  const route = useRouter();
  const { innerWidthWindow } = useSelector(state => state.common);

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
      <div
        className={classnames(st.wrapper, { [st.wrapperList]: flagSwitcher })}
      >
        {!noLinks ? (
          <Link href={`/book/${book?.id}`}>
            <a onClick={bookLinkClick}>
              <Image
                src={book?.image?.link || '/images/blur.jpg'}
                alt=""
                width={innerWidthWindow >= 768 ? 180 : 108}
                height={
                  audio
                    ? innerWidthWindow >= 768
                      ? 180
                      : 108
                    : innerWidthWindow >= 768
                    ? 271
                    : 160
                }
                placeholder="blur"
                blurDataURL="/images/blur.jpg"
                layout="responsive"
              />
            </a>
          </Link>
        ) : (
          <Image
            src={book?.image?.link || '/images/blur.jpg'}
            alt=""
            width={180}
            height={audio ? 180 : 271}
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
            {similar ? (
              <div className={st.starsBlock}>
                <Stars count={1} value={book?.rates_count} />
                <span>{book?.rates_count}</span>
              </div>
            ) : (
              <div className={st.starsBlock}>
                <Stars count={count} value={book?.rates_count} />
                {innerWidthWindow <= 768 && <span>{book?.rates_count}4</span>}
              </div>
            )}
          </div>
          {!flagSwitcher && (
            <div
              className={classnames(st.selectionDateViews, {
                [st.hide]: mobalSimilar,
              })}
            >
              <span>456</span>
              <Eye />
            </div>
          )}

          {flagSwitcher && (
            <div className={st.raitingAmount}>
              <span>{book?.rates_avg}</span>
              {!similar && <span>(2{book?.book_likes_count})</span>}
            </div>
          )}
        </div>
        {noLinks ? (
          <h3
            className={classnames(st.bookName, {
              [st.bookNameSmaller]: similar,
            })}
          >
            {book?.title}
          </h3>
        ) : (
          <Link href={`/book/${book?.id}`}>
            <a
              className={classnames(st.bookName, {
                [st.bookNameSmaller]: similar,
              })}
            >
              {book?.title}
            </a>
          </Link>
        )}

        {noLinks ? (
          <span className={st.bookAuthor}>
            {book?.authors?.length ? book?.authors[0]?.author : ''}
          </span>
        ) : (
          <Link href="/author">
            <a className={st.bookAuthor}>
              {book?.authors?.length ? book?.authors[0]?.author : ''}
            </a>
          </Link>
        )}
        {flagSwitcher && (
          <div className={classnames(st.extraInfo, { [st.addInfo]: !audio })}>
            <p className={st.bookYear}>
              <span>2021</span>
              <span className={st.bookGenre}>
                Жанр
                {book?.book_genres?.length ? book?.book_genres[0] : ''}
              </span>
            </p>
            {innerWidthWindow >= 768 && (
              <p className={classnames(st.aboutBook, { [st.lines]: !audio })}>
                {book?.text}
              </p>
            )}
            {!audio && (
              <div className={st.reviewStatistic}>
                {!flagSwitcher ? (
                  <>
                    <span className={st.reviewIcon}>
                      <Like />
                    </span>
                    <span className={st.reviewLike}>3115</span>
                  </>
                ) : (
                  <div className={st.selectionDateViews}>
                    <span>456</span>
                    <Eye />
                  </div>
                )}
                <span
                  className={classnames(st.reviewIcon, {
                    [st.distance]: flagSwitcher,
                  })}
                >
                  <Comment /> 700
                </span>
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
