import React, {useEffect} from 'react';
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

  const [isFullText, setIsFullText] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)

  const [replies, setReplies] = useState({});

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
        page: 1
      })

      if(replies?.data?.length) {
        setReplies({
          ...replies,
          data: [...replies?.data, response?.data?.data]
        })
      } else {
        setReplies(response?.data?.data)
      }
    }
  }

  useEffect(() => {
    if(!isReply) {
      fetchReplies()
    }
  }, []);

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

          {isReply && <span className={styles.reviewInfo}>{replyDate}</span>}
        </span>
      </div>

      {!isReply && <p className={styles.reviewInfo}>{date}</p>}

      {reviews &&
        <h3 className={styles.reviewTitle}>
          Гарри получает похвалы за то, что нарушает запреты
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
          <span className={styles.reviewIcon}>
            <Like />
          </span>
          <span className={styles.reviewLike}>{data?.likes_count || 0}</span>

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

      {replies?.data?.length ?
        replies?.data.map(i =>
          <CommentItem
            key={i?.id}
            data={i}
            isReply
          />
        ) : null
      }
    </div>
  );
};

export default CommentItem;
