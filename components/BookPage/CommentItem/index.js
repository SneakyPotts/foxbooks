import React from 'react';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classnames from 'classnames';
import Image from 'next/image';
import DropDownArrow from '../../../public/chevron-down.svg';
import Like from '../../shared/icons/heart';
import Comment from '../../shared/icons/comment';
import styles from './comComp.module.scss';
import 'moment/locale/ru'
import moment from "moment";
import CommentForm from "../../CommentForm";
import AvatarWithLetter from "../../shared/common/AvatarWithLetter";
import {addComment} from "../../../store/commentsSlice";
import {useRouter} from "next/router";
import UnderCom from "../UnderCommentComp";

const CommentItem = ({ data, type, reviews }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const date = moment(data?.updated_at)
    .format('Do MMMM YYYY в HH:mm')
    .replace('-го', '')

  const [isFullText, setIsFullText] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)

  const { innerWidthWindow } = useSelector(state => state.common)

  const toggleMoreText = () => {
    setIsFullText(prev => !prev);
  }

  const toggleFormVisibility = () => {
    setFormIsVisible(prev => !prev);
  }

  const submitFunc = formData => {
    let t = type

    if(router.query?.type === 'books') {
      t = 'book'
    } else if(router.query?.type === 'audioBooks') {
      t = 'audio_books'
    }

    const dataObj = {
      id: router.query?.id,
      text: formData?.text,
      type: t,
      parent_comment_id: data?.id,
    }

    dispatch(addComment(dataObj))
  }

  return (
    <div
      className={classnames(styles.reviewColor, {
        [styles.reviewColorPositive]: type === 'positive',
        [styles.reviewColorNegative]: type === 'negative',
        [styles.reviewColorNeutral]: type === 'neutral',
      })}
    >
      <div className={styles.reviewer}>
        <div className={styles.reviewerIcon}>
          {data?.users?.avatar ? (
            <Image
              src={data?.users?.avatar}
              alt="Avatar"
              width="35"
              height="35"
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
          ) : (
            <AvatarWithLetter
              letter={
                data?.users?.nickname?.slice(0, 1) ||
                data?.users?.name?.slice(0, 1) ||
                'П'
              }
              width={35}
              id={data?.users?.id}
              isProfile
            />
          )}
        </div>

        <span className={styles.reviewerName}>
          {data?.users?.nickname || data?.users?.name || 'Пользователь'}
        </span>
      </div>

      <p className={styles.reviewInfo}>{date}</p>

      {reviews &&
        <h3 className={styles.reviewTitle}>
          Гарри получает похвалы за то, что нарушает запреты
        </h3>
      }

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
        <span className={styles.reviewIcon}>
          <Like />
        </span>
        <span className={styles.reviewLike}>{data?.likes_count || 0}</span>

        <span
          className={styles.reviewIcon}
          onClick={toggleFormVisibility}
        >
          <Comment />
        </span>
        <span>{data?.replies_count || 0}</span>
      </div>

      {formIsVisible &&
        <div className={styles.userForm}>
          <CommentForm
            submitFunc={submitFunc}
          />
        </div>
      }
    </div>
  );
};

export default CommentItem;
