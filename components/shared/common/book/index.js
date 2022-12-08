import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import Image from 'next/image';
import Stars from '../stars/Stars';
import AddToBooks from '../../icons/add';
import OpenBook from '../../icons/bookOpen';
import Like from '../../icons/heart';
import Comment from '../../icons/comment';
import Basket from '../../icons/trash';
import st from './book.module.scss';
import aboutBookStyles from './../../../BookPage/AboutBook/aboutBook.module.scss';
import Headphones from '../../icons/headphones';
import Eye from '../../icons/eye';
import {audioBook, deleteBookFromFavorite, setBookStatus} from '../../../../store/bookSlice';
import Delete from "../../../../public/delete.svg";
import DotsDropdown from "../../../DotsDropdown";

const Book = ({
  audio,
  flagSwitcher,
  classNames,
  similar,
  mobalSimilar = false,
  noLinks = false,
  book,
  count,
  type,
  withDelete,
  onDelete,
  inReview
}) => {
  const dispatch = useDispatch();

  const { innerWidthWindow } = useSelector(state => state.common);
  const { isAuth } = useSelector(state => state.auth);

  const changeData = {
    wantRead: {
      link: audio ? '/mybooks/audio' : '/mybooks',
      message: 'в вашу библиотеку'
    },
    read: {
      link: audio ? '/mybooks/audio' : '/mybooks',
      message: `в список ${audio ? 'слушаемых' : 'читаемых'}`
    },
    delete: {
      link: null,
      message: 'из вашей библиотеки'
    }
  }

  const [changeIcon, setChangeIcon] = useState(book?.in_favorite);
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState({status: '', text: '', link: null});

  const bookLinkClick = () => {
    if (audio) {
      dispatch(audioBook(true));
    } else if (!audio) {
      dispatch(audioBook(false));
    }
  };

  const changeStatus = (res) => {
    if (res.meta.requestStatus === 'fulfilled') {
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 5000);
    }
  };

  const handleWantReadClick = () => {
    dispatch(setBookStatus({
      id: book?.id,
      value: 1,
      type
    })).then((res) => {
      setChangeIcon(true)
      setMessage({
        status: 'добавлена',
        text: changeData.wantRead.message,
        link: changeData.wantRead.link
      })
      changeStatus(res)
    })
  }

  const handleReadClick = () => {
    dispatch(setBookStatus({
      id: book?.id,
      value: 2,
      type
    })).then((res) => {
      setMessage({
        status: 'добавлена',
        text: changeData.read.message,
        link: changeData.read.link
      })
      changeStatus(res)
    })
  }

  const deleteFromFavorite = () => {
    dispatch(deleteBookFromFavorite({
      id: book?.id,
      type
    })).then((res) => {
      setMessage({
        status: 'удалена',
        text: changeData.delete.message,
        link: null
      })
      changeStatus(res)
    })
    setChangeIcon(false)
  }

  return (
    <div
      className={classnames(classNames, st.book, {
        [st.container]: !flagSwitcher,
        [st.containerColumn]: flagSwitcher,
        [st.inReview]: inReview
      })}
    >
      <div
        className={classnames(st.wrapper, { [st.wrapperList]: flagSwitcher, [st.audioBook]: audio })}
      >
        {!noLinks ? (
          <Link href={`/${book?.type?.toLowerCase()}/${book?.genres?.[0]?.slug || book?.genre?.slug}/${book?.slug}`}>
            <a onClick={bookLinkClick}>
              <Image
                src={book?.cover_url || '/preview.jpg'}
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
                blurDataURL="/blur.webp"
                layout="responsive"
              />
            </a>
          </Link>
        ) : (
          <Image
            src={book?.cover_url || '/preview.jpg'}
            alt=""
            width={180}
            height={audio ? 180 : 271}
            placeholder="blur"
            blurDataURL="/blur.webp"
            layout="responsive"
          />
        )}

        {/*{!flagSwitcher && !inReview &&*/}
        {/*}*/}
        <span className={st.bookCategorie}>
          {book?.genres?.length ? book?.genres[0]?.name : null}
          {book?.genre?.name || null}
        </span>

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
                <Stars count={1} value={book?.rate_avg} />
                <span>{book?.rate_avg}</span>
              </div>
            ) : (
              <div className={st.starsBlock}>
                <Stars count={count} value={book?.rate_avg} />
                {innerWidthWindow <= 768 && <span>{book?.rate_avg}</span>}
              </div>
            )}
          </div>
          {!flagSwitcher && (
            <div
              className={classnames(st.selectionDateViews, {
                [st.hide]: mobalSimilar,
              })}
            >
              <span>{book?.views_count}</span>
              <Eye />
            </div>
          )}

          {flagSwitcher && (
            <div className={st.raitingAmount}>
              <span>{book?.rate_avg}</span>
              {!similar && <span>({book?.rates_count})</span>}
            </div>
          )}
          {flagSwitcher && audio && (
            <div
              className={classnames(st.selectionDateViews, {
                [st.farView]: innerWidthWindow > 768,
                [st.hide]: mobalSimilar,
              })}
            >
              <span>{book?.views_count}</span>
              <Eye />
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
          <Link href={`/${book?.type?.toLowerCase()}/${book?.genres?.[0]?.slug || book?.genre?.slug}/${book?.slug}`}>
            <a
              className={classnames(st.bookName, {
                [st.bookNameSmaller]: similar,
                [st.bookNameMargin]: flagSwitcher,
              })}
            >
              {book?.title}
            </a>
          </Link>
        )}

        {noLinks ? (
          <span className={st.bookAuthor}>
            {book?.authors?.length ? book?.authors[0]?.author : 'Нет автора'}
          </span>
        ) : (
          book?.authors?.length ?
            <Link href={book?.authors?.length ? `/author/${book?.authors[0]?.slug}` : ''}>
              <a className={st.bookAuthor}>
                {book?.authors[0]?.author}
              </a>
            </Link> :
            <span className={st.bookAuthor}>Нет автора</span>
        )}
        {flagSwitcher && (
          <div className={classnames(st.extraInfo, { [st.addInfo]: !audio }, {[st.addInfoAudio]: audio})}>
            <p className={st.bookYear}>
              <span>{audio ? book?.year : book?.year?.year}</span>
              <span className={st.bookGenre}>
                {book?.genres?.length ? book?.genres?.[0]?.name : null}
                {book?.genre?.name || null}
              </span>
            </p>
            {innerWidthWindow >= 768 && (
              <p className={classnames(st.aboutBook, { [st.lines]: !audio })}>
                {book?.text || book?.description}
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
                    <span>{book?.views_count}</span>
                    <Eye />
                  </div>
                )}
                <span
                  className={classnames(st.reviewIcon, {
                    [st.distance]: flagSwitcher,
                  })}
                >
                  <Comment /> {book?.comments_count}
                </span>
              </div>
            )}
          </div>
        )}

        {(flagSwitcher && isAuth) && (
          <div>
            <span
                className={classnames(st.addIcon, {[st.hide]: changeIcon})}
                onClick={handleWantReadClick}
            >
              <AddToBooks/>
            </span>

            {changeIcon &&
              <DotsDropdown
                isSmall
                externalClass={st.dotsIcon}
              >
                <div className={st.optionWindow}>
                  <p
                    className={st.optionRead}
                    onClick={handleReadClick}
                  >
                    <span className={st.optionIcon}>
                      <OpenBook />
                    </span>
                    {type === 'books' ? 'Читаю' : 'Слушаю'}
                  </p>
                  <p
                    className={st.optionDelete}
                    onClick={deleteFromFavorite}
                  >
                    <span className={st.optionIcon}>
                      <Basket />
                    </span>
                    Удалить из моих книг
                  </p>
                </div>
              </DotsDropdown>
            }
          </div>
        )}

      </div>

      {withDelete &&
        <span
          className={st.deleteBtn}
          onClick={onDelete}
        >
          <Delete />
        </span>
      }

      {showPopUp && (
        <div className={aboutBookStyles.popUp}>
          <p>
            Книга “{book?.title}” {message?.status}{' '}
            {message?.link
              ? <Link href={message?.link}>
                <a className={aboutBookStyles.popUpLink}>{message?.text}</a>
              </Link>
              : message?.text}
          </p>
        </div>
      )}
    </div>
  );
};
export default Book;
