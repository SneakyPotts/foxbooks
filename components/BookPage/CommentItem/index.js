import Image from 'next/image';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropDownArrow from '../../../public/chevron-down.svg';
import CommentForm from '../../CommentForm';
import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';

import styles from './comComp.module.scss';

import { addComment } from '../../../store/commentsSlice';
import { setAuthPopupVisibility } from '../../../store/commonSlice';

import CommentsService from '../../../http/CommentsService';

import AvatarWithLetter from '../../shared/common/AvatarWithLetter';
import Like from '../../shared/icons/heart';

const CommentItem = ({
  data,
  type,
  reviews,
  isReply,
  parentReviewId = null, //ID сущности родительской рецензии, пробрасывается вглубь ветки ответов
}) => {
  const dispatch = useDispatch();

  const date = moment(data?.updated_at).format('Do MMMM YYYY в HH:mm').replace('-го', '');

  const replyDate = moment(data?.updated_at).from(moment());

  const [isFullText, setIsFullText] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const [replies, setReplies] = useState({});
  const [page, setPage] = useState(1);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const [likesCount, setLikesCount] = useState(data?.likes_count || 0);

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { isAuth } = useSelector((state) => state.auth);
  const { book } = useSelector((state) => state.book);
  const { initRender } = useSelector((state) => state.comments);

  const sortedReplies = useMemo(() => {
    return [...new Set(replies?.data)]; /*.sort((a, b) => moment(a?.updated_at).diff(moment(b?.updated_at)))*/
  }, [replies]);

  const toggleMoreText = () => {
    setIsFullText((prev) => !prev);
  };

  const toggleFormVisibility = () => {
    setFormIsVisible((prev) => !prev);
  };

  const showMore = () => {
    if (isReply) {
      if (isShowMore && page < replies?.last_page) {
        setPage(page + 1);
      }
      setIsShowMore(true);
    } else {
      setPage(page + 1);
    }
  };

  const submitFunc = (formData) => {
    let t = type;

    /** если рецензия или есть родительский ID рецензии - ветка рецензий
     * иначе комментарии книги */
    if (book.type === 'books') {
      t = reviews || parentReviewId ? 'book_review' : 'book';
    } else if (book.type === 'audioBooks') {
      t = reviews || parentReviewId ? 'audio_book_review' : 'audio_book';
    }

    /** если ответ на рецензию, то ID сущности = ID рецензии
     * если передан родительский ID рецензии - это ветка ответов на рецензию и ID сущности = ID рецензии родителя
     * если ответ не в ветке рецензий ID сущности = ID книги */
    const varId = reviews ? data?.id : parentReviewId ? parentReviewId : book.id;

    const dataObj = {
      id: varId,
      text: formData?.text,
      type: t,
      parent_comment_id: reviews ? null : data?.id, //если ответ на рецензию - комментарий не имеет родителя
    };

    dispatch(addComment(dataObj)).then((res) => {
      setReplies({
        ...replies,
        data: replies?.data?.length ? [res.payload?.data, ...replies?.data] : [res.payload?.data],
      });
    });
  };

  const fetchCurrentReplies = async () => {
    const typeMatching = reviews ? 'getReplyReviews' : 'getReplyComments';

    if (data?.id) {
      const response = await CommentsService[typeMatching]({
        id: data?.id,
        type: book.type,
        page,
        reviewBranch: !!parentReviewId, // если передан родительский ID рецензии - ветка ответов рецензии
      });

      if (replies?.data?.length) {
        setReplies({
          ...replies,
          data: [...replies?.data, ...response?.data?.data?.data],
        });
      } else {
        setReplies(response?.data?.data);
      }
    }
  };

  const setTypes = useCallback(
    (routeType) => {
      const typeMatching = {
        books: reviews ? 'book_review' : parentReviewId ? 'book_review_comment' : 'book_comment',
        audioBooks: reviews ? 'audio_book_review' : parentReviewId ? 'audio_book_review_comment' : 'audio_book_comment',
      };

      return typeMatching[routeType];
    },
    [reviews],
  );

  const likeHandler = async () => {
    if (isAuth) {
      const type = setTypes(book.type);

      const obj = {
        id: data?.id,
        type,
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

  useEffect(() => {
    initRender && fetchCurrentReplies();
  }, [page]);

  return (
    <div
      className={classnames(styles.reviewColor, {
        [styles.reviewReplyItem]: isReply,
        [styles.reviewColorPositive]: type === 'positive',
        [styles.reviewColorNegative]: type === 'negative',
        [styles.reviewColorNeutral]: type === 'neutral',
      })}
    >
      <div className={styles.reviewer}>
        <div className={styles.reviewerIcon}>
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
            <AvatarWithLetter
              letter={data?.user?.nickname?.slice(0, 1) || data?.user?.name?.slice(0, 1) || 'П'}
              width={35}
              id={data?.user?.id}
              isProfile
            />
          )}
        </div>

        <span className={styles.reviewerName}>
          {data?.user?.nickname || data?.user?.name || 'Пользователь'}

          {isReply && <span className={styles.reviewInfo}>{replyDate}</span>}
        </span>
      </div>

      {!isReply && <p className={styles.reviewInfo}>{date}</p>}

      {reviews && <h3 className={styles.reviewTitle}>{data.title}</h3>}

      <div className={classnames({ [styles.reviewWrapper]: isReply })}>
        <p
          className={classnames(styles.reviewText, {
            [styles.reviewTextHide]: !isFullText,
          })}
        >
          {data?.content}
        </p>

        {data?.content?.length > 796 ? (
          <span
            className={classnames(styles.showMoreLink, {
              [styles.black]: type,
            })}
            onClick={toggleMoreText}
          >
            {isFullText ? 'Скрыть' : 'Показать полностью'}

            {innerWidthWindow <= 768 && (
              <DropDownArrow
                className={classnames(styles.dropDownArrow, {
                  [styles.up]: isFullText,
                  [styles.color]: reviews,
                })}
              />
            )}
          </span>
        ) : null}

        <div className={styles.reviewStatistic}>
          <span
            className={classnames(styles.reviewIcon, {
              [styles.active]: isLiked,
            })}
            onClick={likeHandler}
          >
            <Like />
          </span>
          <span className={styles.reviewLike}>{likesCount}</span>

          <span
            className={styles.reviewReply}
            onClick={toggleFormVisibility}
          >
            Ответить
          </span>
        </div>
      </div>

      {formIsVisible && (
        <div className={styles.userForm}>
          <CommentForm
            submitFunc={submitFunc}
            onCancel={toggleFormVisibility}
            // isTextarea={isReply}
            rows={3}
          />
        </div>
      )}

      {sortedReplies?.length && (!isReply || (isReply && isShowMore))
        ? sortedReplies.map((i) => (
            <CommentItem
              key={i?.id}
              data={i}
              isReply
              parentReviewId={reviews ? data?.id : parentReviewId}
            />
          ))
        : null}

      {(!isReply && page < replies?.last_page) || (isReply && sortedReplies?.length && (!isShowMore || page < replies?.last_page)) ? (
        <p
          className={classnames(styles.reviewShowMore, {
            [styles.isReply]: isReply,
          })}
          onClick={showMore}
        >
          {isReply ? 'Показать ещё ответы' : 'Показать следующие комментарии'}
        </p>
      ) : null}
    </div>
  );
};

export default CommentItem;
