import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import Button from '../../shared/common/Button/Button';
import st from './reviews.module.scss';
import Pagination from '../Pagination';

const Reviews = () => {
  const [reviewTyping, setReviewTyping] = useState(false);

  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
    // console.log(1111111111);
  };

  const handleChangeReviewField = e => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleCancelBtn = () => {
    setReviewTyping(false);
  };

  return (
    <div>
      <h2 className={st.reviewTitle}>Рецензии</h2>
      <Button
        typeButton="button"
        text="Написать рецензию"
        classNames={st.submitButton}
        click={() => handleLeaveReviewInput()}
      />
      {reviewTyping && (
        <>
          <p className={st.leaveReviewInputLabel}>
            Если бы ваша рецензия ограничивалась одной фразой, что бы вы
            сказали?
          </p>
          <input
            placeholder="Текст вашей рецензии..."
            // onClick={handleLeaveReviewInput}
            className={st.leaveReviewInput}
          />
          <div>
            <p className={st.leaveReviewFieldLabel}>Ваша рецензия</p>
            <textarea
              className={st.leaveReviewField}
              onChange={handleChangeReviewField}
            ></textarea>
            <div
              className={classnames(st.controllBtn, st.controllBtnsLeaveReview)}
            >
              <Button
                typeButton="submit"
                text="Отправить"
                classNames={st.submitButton}
              />
              <button className={st.cancelBtn} onClick={handleCancelBtn}>
                Отменить
              </button>
            </div>
          </div>
        </>
      )}
      <Pagination />
    </div>
  );
};

export default Reviews;
