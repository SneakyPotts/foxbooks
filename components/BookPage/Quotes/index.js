import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classnames from 'classnames';
import Cookies from 'js-cookie';
import moment from 'moment';
import 'moment/locale/ru';

import st from './quotes.module.scss';

import { setBookQuotes } from '../../../store/bookSlice';
import { setAuthPopupVisibility } from '../../../store/commonSlice';

import BookService from '../../../http/BookService';
import CommentsService from '../../../http/CommentsService';

import AvatarWithLetter from '../../shared/common/AvatarWithLetter';
import MyPagination from '../../shared/common/MyPagination';
import Eye from '../../shared/icons/eye';
import Like from '../../shared/icons/heart';

const Quotes = () => {
  const dispatch = useDispatch();
  const {
    query: { books_type },
  } = useRouter();
  const quote = useRef(null);

  const { book } = useSelector((state) => state.book);
  const { bookQuotes } = useSelector((state) => state.book);

  const [currentPage, setCurrentPage] = useState(1);

  const token = Cookies.get('token');

  useEffect(async () => {
    if (books_type === 'books') {
      const data = await BookService.getBookQuotes(book.id, token, currentPage);
      dispatch(setBookQuotes(data?.data?.data));
    }
  }, [currentPage]);

  return (
    <>
      {bookQuotes?.data?.length ? (
        <div ref={quote} id="quotes" className={st.container}>
          <h2 className={st.quotesTitle}>Цитаты</h2>

          {bookQuotes?.data.map((i) => (
            <QuoteItem key={i.id} data={i} />
          ))}

          {bookQuotes?.last_page > 1 ? (
            <MyPagination currentPage={bookQuotes?.current_page} lastPage={bookQuotes?.last_page} onClick={setCurrentPage} scrollTo={quote} />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

const QuoteItem = ({ data }) => {
  const [likesCount, setLikesCount] = useState(data?.likes_count);
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    if (isAuth) {
      const obj = {
        id: data.id,
        type: 'quote',
      };

      if (isLiked) {
        await CommentsService.deleteLikeFromComment(obj);
        setLikesCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await CommentsService.addLikeToComment(obj);
        setLikesCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } else {
      dispatch(setAuthPopupVisibility(true));
    }
  };

  return (
    <div className={st.quote}>
      <div className={st.user}>
        <div className={st.userIcon}>
          {data?.user?.avatar ? (
            <Image
              src={data?.user?.avatar}
              alt="Avatar"
              width="35"
              height="35"
              // placeholder="blur"
              blurDataURL="/blur.webp"
            />
          ) : (
            <AvatarWithLetter letter={data?.user?.nickname?.slice(0, 1) || data?.user?.name?.slice(0, 1) || 'П'} width={35} id={data?.user?.id} isProfile />
          )}
        </div>
        <h3 className={st.userName}>{data?.user?.nickname || data?.user?.name || 'Пользователь'}</h3>
      </div>

      <div className={st.quoteInfo}>
        <span>{moment(data?.updated_at).format('Do MMMM YYYY в HH:mm').replace('-го', '')}</span>
        <span className={st.quoteView}>
          <span className={st.quoteViewCount}>{data?.views_count}</span> <Eye />
        </span>
      </div>

      <div className={st.quoteContainer}>
        <p className={st.commentText}>{data?.text}</p>
        <div className={st.quoteStatistic}>
          <span
            className={classnames(st.quoteIcon, {
              [st.active]: isLiked,
            })}
            // className={st.quoteIcon}
            onClick={likeHandler}
          >
            <Like />
          </span>
          <span className={st.quoteLike}>{likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
