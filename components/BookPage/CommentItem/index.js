import React, {useCallback, useEffect, useMemo} from 'react';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classnames from 'classnames';
import Image from 'next/image';
import DropDownArrow from '../../../public/chevron-down.svg';
import Like from '../../shared/icons/heart';
import styles from './comComp.module.scss';
import 'moment/locale/ru'
import moment from "moment";
import CommentForm from "../../CommentForm";
import AvatarWithLetter from "../../shared/common/AvatarWithLetter";
import {addComment} from "../../../store/commentsSlice";
import {useRouter} from "next/router";
import CommentsService from "../../../http/CommentsService";
import {setAuthPopupVisibility} from "../../../store/commonSlice";

const CommentItem = ({
  data,
  type,
  reviews,
  isReply
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const date = moment(data?.updated_at)
    .format('Do MMMM YYYY в HH:mm')
    .replace('-го', '')

  const replyDate = moment(data?.updated_at).from(moment())

  const [likesCount, setLikesCount] = useState(data?.likes_count || 0)

  const [isFullText, setIsFullText] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)

  const [replies, setReplies] = useState({});
  const [page, setPage] = useState(1);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false)

  const { innerWidthWindow } = useSelector(state => state.common)
  const { isAuth } = useSelector(state => state.auth)

  const sortedReplies = useMemo(() => {
    return [...new Set(replies?.data)].sort((a, b) => moment(a?.updated_at).diff(moment(b?.updated_at)))
  }, [replies])

  const toggleMoreText = () => {
    setIsFullText(prev => !prev);
  }

  const toggleFormVisibility = () => {
    setFormIsVisible(prev => !prev);
  }

  const showMore = () => {
    if(isReply) {
      if(isShowMore && page < replies?.last_page) {
        setPage(page + 1)
      }
      setIsShowMore(true)
    } else {
      setPage(page + 1)
    }
  }

  const submitFunc = formData => {
    let t = type

    if(router.query?.type === 'books') {
      t = 'book'
    } else if(router.query?.type === 'audioBooks') {
      t = 'audio_book'
    }

    const dataObj = {
      id: router.query?.id,
      text: formData?.text,
      type: t,
      parent_comment_id: data?.id,
    }

    dispatch(addComment(dataObj)).then(res => {
      setReplies({
        ...replies,
        data: replies?.data?.length ? [...replies?.data, res.payload.data] : [res.payload.data]
      })
    })
  }

  const fetchReplies = async () => {
    if(data?.id) {
      const response = await CommentsService.getReplyComments({
        id: data?.id,
        type: router.query?.type,
        page
      })

      if(replies?.data?.length) {
        setReplies({
          ...replies,
          data: [...replies?.data, ...response?.data?.data?.data]
        })
      } else {
        setReplies(response?.data?.data)
      }
    }
  }

  const setTypes = useCallback((routeType) => {
      const typeMatching = {
        'books': reviews ? 'book_review' : 'book_comment',
        'audioBooks': reviews ? 'audio_book_review' : 'audio_book_comment'
      }

      return typeMatching[routeType]
    },[reviews]);


  const likeHandler = async () => {
    if(isAuth) {
      const type = setTypes(router.query?.type);

      const obj = {
        id: data?.id,
        type
      }

      if(isLiked) {
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

  useEffect(() => {
    fetchReplies()
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

        <span className={styles.reviewerName}>
          {data?.user?.nickname || data?.user?.name || 'Пользователь'}

          {isReply && <span className={styles.reviewInfo}>{replyDate}</span>}
        </span>
      </div>

      {!isReply && <p className={styles.reviewInfo}>{date}</p>}

      {reviews &&
        <h3 className={styles.reviewTitle}>
          {data.title}
        </h3>
      }

      <div className={classnames({[styles.reviewWrapper]: isReply})}>
        <p
          className={classnames(styles.reviewText, {
            [styles.reviewTextHide]: !isFullText,
          })}
        >
          {data?.content}
        </p>

        {data?.content?.length > 796 ?
          <span
            className={classnames(styles.showMoreLink, {
              [styles.black]: type
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
          </span> : null
        }

        <div className={styles.reviewStatistic}>
          <span
            className={classnames(styles.reviewIcon, {
              [styles.active]: isLiked
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

      {formIsVisible &&
        <div className={styles.userForm}>
          <CommentForm
            submitFunc={submitFunc}
            onCancel={toggleFormVisibility}
            isTextarea={isReply}
            rows={3}
          />
        </div>
      }

      {sortedReplies?.length && (!isReply || (isReply && isShowMore)) ?
        sortedReplies.map(i =>
          <CommentItem
            key={i?.id}
            data={i}
            isReply
            reviews={reviews}
          />
        ) : null
      }

      {(!isReply && page < replies?.last_page) || ((isReply && sortedReplies?.length) && (!isShowMore || page < replies?.last_page)) ?
        <p
          className={classnames(styles.reviewShowMore, {
            [styles.isReply]: isReply
          })}
          onClick={showMore}
        >
          {isReply ? 'Показать ещё ответы' : 'Показать следующие комментарии'}
        </p> : null
      }
    </div>
  );
};

export default CommentItem;
