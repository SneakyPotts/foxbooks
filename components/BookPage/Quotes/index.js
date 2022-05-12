import { useSelector } from 'react-redux';
import Image from 'next/image';
import Eye from '../../shared/icons/eye';
import Like from '../../shared/icons/heart';
import MyPagination from '../../shared/common/MyPagination';
import st from './quotes.module.scss';
import 'moment/locale/ru'
import moment from "moment";
import AvatarWithLetter from "../../shared/common/AvatarWithLetter";
import React from "react";

const Quotes = () => {
  const { bookQuotes } = useSelector(state => state.book);

  if(!bookQuotes?.data?.length) return null

  return (
    <div
      id="quotes"
      className={st.container}
    >
      <h2 className={st.quotesTitle}>Цитаты</h2>

      {bookQuotes?.data.map(i =>
        <div
          key={i.id}
          className={st.quote}
        >
          <div className={st.user}>
            <div className={st.userIcon}>
              {i?.user?.avatar ? (
                <Image
                  src={i?.user?.avatar}
                  alt="Avatar"
                  width="35"
                  height="35"
                  placeholder="blur"
                  blurDataURL="/blur.webp"
                />
              ) : (
                <AvatarWithLetter
                  letter={
                    i?.user?.nickname?.slice(0, 1) ||
                    i?.user?.name?.slice(0, 1) ||
                    'П'
                  }
                  width={35}
                  id={i?.user?.id}
                  isProfile
                />
              )}
            </div>
            <h3 className={st.userName}>{i?.user?.nickname || i?.user?.name || 'Пользователь'}</h3>
          </div>

          <div className={st.quoteInfo}>
            <span>{moment(i?.updated_at).format('Do MMMM YYYY в HH:mm').replace('-го', '')}</span>
            <span className={st.quoteView}>
              <span className={st.quoteViewCount}>{i?.views_count}</span> <Eye />
            </span>
          </div>

          <div className={st.quoteContainer}>
            <p className={st.commentText}>{i?.text}</p>
            <div className={st.quoteStatistic}>
              <span className={st.quoteIcon}>
                <Like />
              </span>
              <span className={st.quoteLike}>{i?.likes_count}</span>
            </div>
          </div>
        </div>
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

export default Quotes;
