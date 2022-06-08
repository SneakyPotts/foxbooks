import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import Eye from '../../shared/icons/eye';
import Like from '../../shared/icons/heart';
import MyPagination from '../../shared/common/MyPagination';
import st from './quotes.module.scss';
import 'moment/locale/ru'
import moment from "moment";
import AvatarWithLetter from "../../shared/common/AvatarWithLetter";
import React, {useState} from "react";
import CommentsService from "../../../http/CommentsService";
import {setAuthPopupVisibility} from "../../../store/commonSlice";
import classnames from "classnames";

const Quotes = () => {
  const {bookQuotes} = useSelector(state => state.book);

  if (!bookQuotes?.data?.length) return null

  return (
    <div
      id="quotes"
      className={st.container}
    >
      <h2 className={st.quotesTitle}>Цитаты</h2>

      {bookQuotes?.data.map(i =>
        <QuoteItem key={i.id} data={i} />
      )}

      {bookQuotes?.last_page > 1 ?
        <MyPagination
          currentPage={bookQuotes?.current_page}
          lastPage={bookQuotes?.last_page}
        />
        : null
      }
    </div>
  );
};

const QuoteItem = ({data}) => {
  const [likesCount, setLikesCount] = useState(data.likes_count);
  const [isLiked, setIsLiked] = useState(false);
  const {isAuth} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    if (isAuth) {
      const obj = {
        id: data.id,
        type: "quote"
      }

      if (isLiked) {
        await CommentsService.deleteLikeFromComment(obj)
        setLikesCount(prev => prev - 1)
        setIsLiked(false)
      } else {
        await CommentsService.addLikeToComment(obj)
        setLikesCount(prev => prev + 1)
        setIsLiked(true)
      }
    } else {
      dispatch(setAuthPopupVisibility(true))
    }
  }

  return (
    <div
      className={st.quote}
    >
      <div className={st.user}>
        <div className={st.userIcon}>
          {data?.user?.avatar ? (
            <Image
              src={data?.user?.avatar}
              alt="Avatar"
              width="35"
              height="35"
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
          ) : (
            <AvatarWithLetter
              letter={
                data?.user?.nickname?.slice(0, 1) ||
                data?.user?.name?.slice(0, 1) ||
                'П'
              }
              width={35}
              id={data?.user?.id}
              isProfile
            />
          )}
        </div>
        <h3 className={st.userName}>{data?.user?.nickname || data?.user?.name || 'Пользователь'}</h3>
      </div>

      <div className={st.quoteInfo}>
        <span>{moment(data?.updated_at).format('Do MMMM YYYY в HH:mm').replace('-го', '')}</span>
        <span className={st.quoteView}>
              <span className={st.quoteViewCount}>{data?.views_count}</span> <Eye/>
            </span>
      </div>

      <div className={st.quoteContainer}>
        <p className={st.commentText}>{data?.text}</p>
        <div className={st.quoteStatistic}>
              <span
                className={classnames(st.quoteIcon, {
                  [st.active]: isLiked
                })}
                // className={st.quoteIcon}
                onClick={likeHandler}
              >
                <Like/>
              </span>
          <span className={st.quoteLike}>{likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Quotes;
