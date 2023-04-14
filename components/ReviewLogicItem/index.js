import Image from 'next/image';
import Link from 'next/link';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DotsDropdown from '../DotsDropdown';
import ReviewForm from '../ReviewForm';
import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';

import { setAuthPopupVisibility } from '../../store/commonSlice';

import CommentsService from '../../http/CommentsService';

import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import Comment from '../shared/icons/comment';
import EditPensil from '../shared/icons/editPencil';
import Eye from '../shared/icons/eye';
import Like from '../shared/icons/heart';
import Bin from '../shared/icons/trash';

import styles from './styles.module.scss';

const ReviewLogicItem = ({ data, withControls, onDelete }) => {
  const dispatch = useDispatch();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { isAuth } = useSelector((state) => state.auth);

  const [editFormIsVisible, setEditFormIsVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(data?.likes_count || 0);
  const [isLiked, setIsLiked] = useState(data?.is_liked);

  const likeHandler = async () => {
    if (isAuth) {
      const obj = {
        id: data?.id,
        type: data?.book?.type === 'books' ? 'book_review' : 'audio_book_review',
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

  const onClose = () => {
    setEditFormIsVisible(false);
  };

  return (
    <div className={styles.review}>
      <div className={styles.reviewCover}>
        <Link href={`/${data?.book?.type || 'audiobooks'}/${data?.book?.genres?.[0].slug || data?.audio_book?.genre?.slug}/${data?.book?.slug || data?.audio_book?.slug}`}>
          <a>
            <Image
              src={data?.book?.cover_url || data?.audio_book?.cover_url || '/preview.jpg'}
              alt="Picture"
              width="86"
              height="143"
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
          </a>
        </Link>
        <div className={styles.bookWrapper}>
          <Link href={`/${data?.book?.type || 'audiobooks'}/${data?.book?.genres?.[0].slug || data?.audio_book?.genre?.slug}/${data?.book?.slug || data?.audio_book?.slug}`}>
            <a className={styles.bookTitle}>{data?.book?.title || data?.audio_book?.title}</a>
          </Link>
          <Link href={`/author/${data?.book?.authors[0].slug || data?.audio_book?.authors[0].slug}`}>
            <a className={styles.bookAuthor}>{data?.book?.authors[0].author || data?.audio_book?.authors[0].author}</a>
          </Link>
        </div>
      </div>

      <div className={styles.reviewInfo}>
        <span className={styles.reviewDate}>{moment(data?.created_at).format('D MMMM YYYY в LT')}</span>
        <div className={styles.reviewViews}>
          <span className={styles.sumReviews}>{data?.views_count}</span>
          <Eye />
        </div>
      </div>

      <p className={styles.reviewTitle}>{data?.title}</p>
      <p className={styles.reviewText}>{data?.content}</p>

      <div className={styles.reviewBottom}>
        <div className={styles.reviewBottomStatistic}>
          <span
            className={classnames(styles.reviewIcon, { [styles.active]: isLiked })}
            // onClick={likeHandler}
          >
            <Like />
          </span>
          <span className={styles.reviewLike}>{likesCount}</span>
          <span className={styles.reviewIcon}>
            <Comment />
          </span>
          <span>{data?.comments_count}</span>
        </div>

        {withControls && (
          <div>
            <DotsDropdown isSmall direction={'up'}>
              <div className={styles.controlsItem} onClick={() => setEditFormIsVisible(true)}>
                <EditPensil />
                Редактировать
              </div>

              <div className={styles.controlsItem} onClick={onDelete}>
                <Bin />
                Удалить
              </div>
            </DotsDropdown>
          </div>
        )}
      </div>

      {editFormIsVisible && (
        <ModalWindow isFullScreen={innerWidthWindow <= 768} onClose={() => setEditFormIsVisible(false)}>
          <ReviewForm
            bookId={data?.book_id || data?.audio_book_id}
            title={data?.title}
            text={data?.content}
            myReviewType={data?.book?.type || data?.audio_book?.type}
            onCancel={() => setEditFormIsVisible(false)}
            onClose={onClose}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default ReviewLogicItem;
