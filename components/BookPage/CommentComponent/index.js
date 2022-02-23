import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Image from 'next/image';
import DropDownArrow from '../../../public/chevron-down.svg';
import Like from '../../shared/icons/heart';
import Comment from '../../shared/icons/comment';
import Button from '../../shared/common/Button/Button';
import st from './comComp.module.scss';

const CommentComp = ({ idx, type, reviews = false, content, time}) => {

  const [showMore, setShowMore] = useState(false);
  const [mainCommentIdx, setMainCommenIdx] = useState(null);
  const [inputIdx, setInputIdx] = useState(null);

  const { innerWidthWindow } = useSelector(state => state.common);

  const onShowMore = () => {
    setShowMore(!showMore);
  };
  const handleInputMap = idx => {
    setInputIdx(idx);
  };

  const leaveComment = idx => {
    setMainCommenIdx(prev => {
      if (prev === idx) {
        return null;
      } else {
        return idx;
      }
    });
  };
  const handleCancelBtn = () => {
    setInputIdx(null);
    setMainCommenIdx(null);
  };


  return (
    <div
      className={classnames(st.reviewColor, {
        [st.reviewColorPositive]: type === 'positive',
        [st.reviewColorNegative]: type === 'negative',
        [st.reviewColorNeutral]: type === 'neutral',
      })}
    >
      <div>
        <div className={st.reviewer}>
          <div className={st.reviewerIcon}>
            <Image
              src="/horizontalBookCovers/bookCover1.png"
              alt=""
              width="35"
              height="35"
              // placeholder="blur"
              blurDataURL="/images/blur.jpg"
            />
          </div>
          <h3 className={st.reviewerName}>Ник</h3>
        </div>
        <div className={st.reviewInfo}>
          <span className={st.reviewDate}>{time && time}</span>
          {/* <span className={st.reviewView}>
            <span className={st.reviewViewCount}>456</span> <Eye />
          </span> */}
        </div>
        {/*<h3 className={st.reviewTitle}>*/}
        {/*  Гарри получает похвалы за то, что нарушает запреты*/}
        {/*</h3>*/}
        <div>
          <p
            className={classnames(st.reviewText, {
              [st.reviewTextHide]: !showMore,
            })}
          >
            {content && content}
          </p>
          {content?.length > 796 && !showMore ? <span
              className={classnames(st.showMoreLink, { [st.black]: type })}
              onClick={onShowMore}
          >
            Показать полностью
            {innerWidthWindow <= 768 && (
                <DropDownArrow
                    className={classnames(st.dropDownArrow, {
                      [st.up]: showMore,
                      [st.color]: reviews,
                    })}
                />
            )}
          </span> : <></>}

          <div className={st.reviewStatistic}>
            <span className={st.reviewIcon}>
              <Like />
            </span>
            <span className={st.reviewLike}>3115</span>
            <span className={st.reviewIcon} onClick={() => leaveComment(idx)}>
              <Comment />
            </span>
            <span>700</span>
          </div>
        </div>
      </div>
      {mainCommentIdx === idx && (
        <form className={st.userForm}>
          <div className={st.userFormHeader}>
            <div className={st.userIcon}>
              <Image
                src="/horizontalBookCovers/book.png"
                alt=""
                width="35"
                height="35"
                // placeholder="blur"
                blurDataURL="/images/blur.jpg"
              />
            </div>
            <input
              placeholder="Написать комментарий"
              className={st.userInput}
              onClick={() => {
                handleInputMap(idx);
              }}
            />
          </div>
          <div className={st.userComment}>
            {inputIdx === idx && (
              <div className={st.controllBtn}>
                <Button
                  typeButton="submit"
                  text="Отправить"
                  classNames={st.submitButton}
                />
                <button className={st.cancelBtn} onClick={handleCancelBtn}>
                  Отменить
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentComp;
