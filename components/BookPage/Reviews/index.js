import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Button from '../../shared/common/Button/Button';
import ArrowAll from '../../../public/chevron-down.svg';
import CommentComp from '../CommentComponent';
import st from './reviews.module.scss';
import MyPagination from '../../shared/common/MyPagination';

const Reviews = () => {
  const options = ['Положительная', 'Отрицательная', 'Нейтральная'];

  const reviewsAmount = [
    { id: '0', type: 'positive' },
    { id: '1', type: 'negative' },
    { id: '2', type: 'neutral' },
  ];

  const [menu, setMenu] = useState(false);
  const [reviewTyping, setReviewTyping] = useState(false);
  const [optionIndex, setOptionIndex] = useState(null);

  const [activeOption, setActiveOption] = useState('Тип рецензии');
  // const [mainCommentIdx, setMainCommenIdx] = useState(null);
  const { innerWidthWindow } = useSelector(state => state.common);

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);

    return () => {
      body.removeEventListener('click', closeMenu);
    };
  }, []);

  const togleMenu = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const handleOnClick = index => {
    setOptionIndex(index);
    setActiveOption(options[index]);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLeaveReviewInput = () => {
    setReviewTyping(true);
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
      {!reviewTyping && (
        <Button
          typeButton="button"
          text="Написать рецензию"
          classNames={st.submitButton}
          click={() => handleLeaveReviewInput()}
        />
      )}
      {reviewTyping && (
        <form>
          <p className={classnames(st.leaveReviewInputLabel, st.hide)}>
            Выберите тип вашей рецензии
          </p>

          <div className={st.dropdown}>
            <button
              type="button"
              className={`${st.dropBtn} ${menu && st.open}`}
              onClick={togleMenu}
            >
              <span className={st.dropBtnText}>{activeOption}</span>
              <ArrowAll
                className={classnames(st.down, {
                  [st.up]: menu,
                })}
              />
            </button>
            {menu ? (
              <ul className={st.dropContent} onClick={e => e.stopPropagation()}>
                {options.map((it, index) => (
                  <li
                    key={index}
                    onClick={() => handleOnClick(index)}
                    className={st.dropLink}
                  >
                    <span
                      className={classnames(st.radio, {
                        [st.radioActive]: optionIndex === index,
                      })}
                    ></span>
                    <span
                      className={classnames(st.dropText, {
                        [st.active]: optionIndex === index,
                      })}
                    >
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p className={st.leaveReviewInputLabel}>
            Если бы ваша рецензия ограничивалась одной фразой, что бы вы
            сказали?
          </p>

          {innerWidthWindow < 768 ? (
            <textarea
              className={st.leaveReviewField}
              onChange={handleChangeReviewField}
            ></textarea>
          ) : (
            <input className={st.leaveReviewInput} />
          )}

          <p className={st.leaveReviewFieldLabel}>Ваша рецензия</p>
          <textarea
            className={st.leaveReviewField}
            onChange={handleChangeReviewField}
          ></textarea>
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
        </form>
      )}
      {reviewsAmount.map((it, idx) => (
        <div key={it.id} className={st.review}>
          <CommentComp content='Рицензии' idx={idx} type={it.type} reviews={true} />
        </div>
      ))}
      {innerWidthWindow > 768 ? (
        <MyPagination />
      ) : (
        <div className={st.pagination}>Показать еще</div>
      )}
    </div>
  );
};

export default Reviews;
