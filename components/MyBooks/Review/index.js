import { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import dataReview from '../../data/reviews.json';
import Like from '../../shared/icons/heart';
import Eye from '../../shared/icons/eye';
import Comment from '../../shared/icons/comment';
import EditPensil from '../../shared/icons/editPencil';
import Bin from '../../../public/trash.svg';
import HorizontalDots from '../../../public/horizontalDots.svg';
import ModalWindow from '../../shared/common/modalWindow/ModalWindow';
import ArrowAll from '../../../public/chevron-down.svg';
import Button from '../../shared/common/Button/Button';
import st from './review.module.scss';

const Review = () => {
  const [dotsMenu, setDotsMenu] = useState(null);
  const [edit, setEdit] = useState(false);
  const [menu, setMenu] = useState(false);
  const [optionIndex, setOptionIndex] = useState(null);
  const [activeOption, setActiveOption] = useState('Тип рецензии');
  const [reviews, setReviews] = useState([...dataReview]);
  const [shoudlDelete, setShouldDelete] = useState(null);

  const options = ['Положительная', 'Отрицательная', 'Нейтральная'];

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);

    return () => {
      body.removeEventListener('click', closeMenu);
    };
  }, []);

  const checkOptions = (idx, e) => {
    e.stopPropagation();
    setDotsMenu(prev => {
      if (prev === idx) {
        dotsMenu;
      } else {
        setDotsMenu(idx);
      }
    });
    setShouldDelete(idx);
  };

  const handleEditPageClick = e => {
    e.stopPropagation();
    setEdit(true);
  };

  const handleDeleteClick = (e, idx) => {
    e.stopPropagation();
    setReviews(reviews.filter((_, index) => index !== idx));
    setDotsMenu(null);
  };

  const togleMenu = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const handleOnClick = index => {
    setOptionIndex(index);
    setActiveOption(options[index]);
  };

  const handleChangeReviewField = e => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleCancelBtn = () => {
    setEdit(false);
  };

  const closeMenu = () => {
    setDotsMenu(null);
    setEdit(false);
  };

  return (
    <div>
      <ul className={st.reviews}>
        {reviews.map((review, idx) => (
          <li key={review.book_title}>
            <div className={st.reviewsCover}>
              <Image src={review.img} alt="" width="86" height="143" />
              <div className={st.bookMainInfo}>
                <h3 className={st.bookTitle}>{review.book_title}</h3>
                <p className={st.bookAuthor}>{review.book_author}</p>
              </div>
            </div>
            <div className={st.reviewInfo}>
              <p className={st.reviewData}>{review.review_data}</p>
              <div className={st.reviewViews}>
                <span className={st.sumReviews}>{review.sum_reviews}</span>
                <Eye />
              </div>
            </div>
            <p className={st.reviewTitle}>{review.review_title}</p>
            <p className={st.reviewText}>{review.review_text}</p>
            <div className={st.reviewBottom}>
              <div className={st.reviewBottomStatistic}>
                <span className={st.reviewIcon}>
                  <Like />
                </span>
                <span className={st.reviewLike}>{review.likes}</span>
                <span className={st.reviewIcon}>
                  <Comment />
                </span>
                <span>{review.comments}</span>
              </div>
              <span
                className={classNames(st.dotsIcon, {
                  [st.active]: dotsMenu === idx,
                })}
                onClick={e => checkOptions(idx, e)}
              >
                <HorizontalDots />
              </span>
              {dotsMenu === idx && (
                <div className={st.editMenu}>
                  <p
                    dotsMenu
                    className={st.editMenuOption}
                    onClick={e => handleEditPageClick(e)}
                  >
                    <EditPensil className={st.editMenuOptionIcon} />
                    <span className={st.editMenuOptionText}>Редактировать</span>
                  </p>

                  <p
                    className={st.editMenuOption}
                    onClick={e => handleDeleteClick(e, idx)}
                  >
                    <Bin className={st.editMenuOptionIcon} />
                    <span className={st.editMenuOptionText}>Удалить</span>
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {edit && (
        <ModalWindow modal={edit} setModal={setEdit}>
          <form className={st.editReview}>
            <p className={st.leaveReviewInputLabel}>
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
                  className={classNames(st.down, {
                    [st.up]: menu,
                  })}
                />
              </button>
              {menu ? (
                <ul
                  className={st.dropContent}
                  onClick={e => e.stopPropagation()}
                >
                  {options.map((it, index) => (
                    <li
                      key={it}
                      onClick={() => handleOnClick(index)}
                      className={st.dropLink}
                    >
                      <span
                        className={classNames(st.radio, {
                          [st.radioActive]: optionIndex === index,
                        })}
                      ></span>
                      <span
                        className={classNames(st.dropText, {
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

            <input className={st.leaveReviewInput} />

            <p className={st.leaveReviewFieldLabel}>Ваша рецензия</p>
            <textarea
              className={st.leaveReviewField}
              onChange={handleChangeReviewField}
            ></textarea>
            <div
              className={classNames(st.controllBtn, st.controllBtnsLeaveReview)}
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
          </form>
        </ModalWindow>
      )}
    </div>
  );
};

export default Review;
