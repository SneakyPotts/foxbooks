import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setQueryString } from '../../utils';
import ClickableSearch from '../ClickableSearch';
import ReviewLogicItem from '../ReviewLogicItem';
import SearchInput from '../SearchInput';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import classNames from 'classnames';

import { setHeaderVisibility } from '../../store/commonSlice';
import { deleteUserReview, getUserReview } from '../../store/reviewSlice';

import BackBtn from '../shared/common/BackBtn';
import Button from '../shared/common/Button/Button';
import Loader from '../shared/common/Loader';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';

import styles from './styles.module.scss';

const Reviews = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { userReviews } = useSelector((state) => state.review);

  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false);
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reqData, setReqData] = useState({ id: '', type: '' });

  const handleIconClick = (i) => {
    setDeletePopupIsVisible(true);

    setReqData({
      id: i.book ? i.book.id : i.audio_book.id,
      type: i.book ? 'book' : 'audio_book',
    });
  };

  const getUserReviews = () => {
    !isLoading && setIsLoading(true);

    dispatch(getUserReview(router.query)).then(() => setIsLoading(false));
  };

  const deleteReview = () => {
    setDeletePopupIsVisible(false);
    dispatch(deleteUserReview(reqData));
    setConfirmPopupIsVisible(true);
  };

  const onChange = (value) => {
    setQueryString(value, 'findByTitle', router);
  };

  useEffect(() => {
    getUserReviews();
  }, [router.query]);

  return (
    <>
      {innerWidthWindow > 768 && (
        <div className={styles.filters}>
          <div className={styles.mlAuto}>
            <ClickableSearch queryName={'findByTitle'} />
          </div>
        </div>
      )}

      {innerWidthWindow <= 768 && (
        <div className={styles.mobFilters}>
          <div className={styles.flex}>
            <BackBtn externalClass={styles.backBtn} onClick={() => dispatch(setHeaderVisibility(true))} />
            <SearchInput placeholder={'Искать книгу'} externalClass={styles.mobSearch} onChange={onChange} />
          </div>

          <h2 className={classNames('title', styles.title)}>Мои рецензии</h2>
        </div>
      )}

      {isLoading ? (
        <div className={classNames('empty', styles.empty)}>
          <Loader />
        </div>
      ) : (
        <div className={classNames(styles.grid, styles.reviewGrid)}>
          {userReviews?.map((i) => (
            <div key={i.id} className={styles.gridItem}>
              <ReviewLogicItem data={i} withControls onDelete={() => handleIconClick(i)} />
            </div>
          ))}
        </div>
      )}

      {deletePopupIsVisible && (
        <ModalWindow onClose={() => setDeletePopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Удалить рецезию</h3>
            <p className={styles.modalText}>Вы действительно хотите удалить рецезию?</p>
            <ButtonGroup text="Удалить" typeButton="button" ClassName={styles.modalBtns} click={deleteReview} cancelClick={() => setDeletePopupIsVisible(false)} />
          </div>
        </ModalWindow>
      )}

      {confirmPopupIsVisible && (
        <ModalWindow onClose={() => setConfirmPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Рецензия удалена</h3>

            <Button text="Закрыть" typeButton="button" click={() => setConfirmPopupIsVisible(false)} classNames={styles.modalBtn} />
          </div>
        </ModalWindow>
      )}
    </>
  );
};

export default Reviews;
