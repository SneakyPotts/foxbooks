import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ArrowAll from '../../public/chevron-down.svg';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { setAuthPopupVisibility } from '../../store/commonSlice';
import { addReview, getReviewTypes, updateReview } from '../../store/reviewSlice';

import Input from '../shared/common/Input/Input';

const ReviewForm = ({ bookId, title, text, bookType, myReviewType, onCancel, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { isAuth } = useSelector((state) => state.auth);
  const { reviewTypes } = useSelector((state) => state.review);
  const { book } = useSelector((state) => state.book);

  const [optionsIsVisible, setOptionsIsVisible] = useState(false);
  const [errorAlreadyAdded, setErrorAlreadyAdded] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      title,
      text,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (!isAuth) {
      dispatch(setAuthPopupVisibility(true));
    } else {
      const obj = {
        ...data,
        id: book.id,
        type: bookType === 'books' ? 'book' : 'audio_book',
        review_type: getValues('review_type'),
      };

      router.pathname === '/mybooks/reviews'
        ? dispatch(updateReview({ ...obj, id: bookId, type: myReviewType === 'books' ? 'book' : 'audio_book' })).then(() => {
            reset();
            onClose();
          })
        : dispatch(addReview(obj)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              reset();
              onClose();
              setValue('review_type', null);
            } else if (res.meta.requestStatus === 'rejected') {
              reset();
              setErrorAlreadyAdded(res.payload);
            }
          });
    }
  };

  const openDropdown = (ev) => {
    ev.stopPropagation();
    setOptionsIsVisible(true);
  };

  const closeDropdown = () => {
    setOptionsIsVisible(false);
  };

  const chooseOption = (id) => {
    setValue('review_type', id);
    closeDropdown();
  };

  useEffect(() => {
    document.body.addEventListener('click', closeDropdown);

    dispatch(getReviewTypes());

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p
        className={styles.label}
        onClick={openDropdown}
      >
        Выберите тип вашей рецензии
      </p>

      <div
        className={styles.dropdown}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div
          className={classNames(styles.dropdownBtn, {
            [styles.active]: optionsIsVisible,
          })}
          onClick={() => setOptionsIsVisible((prev) => !prev)}
        >
          <span className={styles.dropBtnText}>{reviewTypes.find((i) => i?.id === getValues('review_type'))?.type || 'Тип рецензии'}</span>
          <span
            className={classNames(styles.arrow, {
              [styles.active]: optionsIsVisible,
            })}
          >
            <ArrowAll />
          </span>
        </div>

        {optionsIsVisible && (
          <ul className={styles.dropdownList}>
            {reviewTypes?.map((i) => (
              <li
                key={i?.id}
                onClick={() => chooseOption(i?.id)}
                className={classNames(styles.dropdownItem, {
                  [styles.active]: i?.id === getValues('review_type'),
                })}
              >
                {i?.type}
              </li>
            ))}
          </ul>
        )}
        {errors?.review_type && <p className={styles.error}>{errors?.review_type?.message}</p>}
      </div>

      <Input
        register={register}
        name={'title'}
        textLabel={'Если бы ваша рецензия ограничивалась одной фразой, что бы вы сказали?'}
        isTextarea
        rows={1}
        classNames={styles.textarea}
        err={errors?.title?.message}
        maxlength={150}
      />

      <Input
        register={register}
        name={'text'}
        textLabel={'Ваша рецензия'}
        isTextarea
        rows={innerWidthWindow > 768 ? 4 : 1}
        err={errors?.text?.message}
      />

      {errorAlreadyAdded && <p className={styles.error}>{errorAlreadyAdded}</p>}

      <ButtonGroup
        text={'Отправить'}
        ClassName={styles.btns}
        typeButton={'submit'}
        cancelClick={onCancel}
      />
    </form>
  );
};

export default ReviewForm;
