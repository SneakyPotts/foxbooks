import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setQueryString } from '../../utils';
import AuthorCard from '../AuthorCard';
import ClickableSearch from '../ClickableSearch';
import SearchInput from '../SearchInput';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import classNames from 'classnames';

import s from '../SearchPage/styles.module.scss';
import styles from './styles.module.scss';

import { setHeaderVisibility } from '../../store/commonSlice';

import AuthorService from '../../http/AuthorService';

import BackBtn from '../shared/common/BackBtn';
import Button from '../shared/common/Button/Button';
import Loader from '../shared/common/Loader';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import ShowAll from '../shared/common/showAll/ShowAll';

const Authors = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false);
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false);
  const [authorId, setAuthorId] = useState(null);
  const [authorName, setAuthorName] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const onChange = (value) => {
    setQueryString(value, 'letter', router);
  };

  const getFavoriteAuthors = async () => {
    return await AuthorService.getUserAuthors(router.query);
  };

  const setCurrentData = (response) => {
    setLastPage(response.data.data.last_page);
    setData(response.data.data.data);
    setIsLoading(false);
  };

  const showDeletePopup = ({ id, author }) => {
    setAuthorId(id);
    setAuthorName(author);
    setDeletePopupIsVisible(true);
  };

  const deleteHandler = () => {
    AuthorService.deleteAuthorFromFavorite(authorId).then(() => {
      getFavoriteAuthors().then(setCurrentData);

      setDeletePopupIsVisible(false);
      setConfirmPopupIsVisible(true);
    });
  };

  useEffect(() => {
    getFavoriteAuthors().then(setCurrentData);
  }, [router.query]);

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      (async () => {
        const response = await AuthorService.getUserAuthors({ ...router.query, page });
        setData((prev) => [...prev, ...response.data.data.data]);
        setIsLoading(false);
      })();
    }
  }, [page]);

  return (
    <>
      {innerWidthWindow > 768 && (
        <div className={styles.filters}>
          <div className={styles.mlAuto}>
            <ClickableSearch queryName={'letter'} />
          </div>
        </div>
      )}

      {innerWidthWindow <= 768 && (
        <div className={styles.mobFilters}>
          <div className={styles.flex}>
            <BackBtn
              externalClass={styles.backBtn}
              onClick={() => dispatch(setHeaderVisibility(true))}
            />
            <SearchInput
              placeholder={'Искать автора'}
              externalClass={styles.mobSearch}
              onChange={onChange}
            />
          </div>

          <h2 className={classNames('title', styles.title)}>Мои авторы</h2>
        </div>
      )}

      {data?.length ? (
        <div className={styles.grid}>
          {data.map((i) => (
            <div
              key={i?.id}
              className={styles.gridItem}
            >
              <AuthorCard
                data={i}
                withDelete={true}
                onDelete={() => showDeletePopup(i)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={classNames('empty', styles.empty)}>Пусто</p>
      )}

      {isLoading ? (
        <div className={classNames('empty', styles.empty)}>
          <Loader />
        </div>
      ) : null}

      {deletePopupIsVisible && (
        <ModalWindow onClose={() => setDeletePopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Удалить Автора</h3>
            <p className={styles.modalText}>Вы действительно хотите удалить автора “{authorName}”?</p>
            <ButtonGroup
              text="Удалить"
              typeButton="button"
              ClassName={styles.modalBtns}
              click={deleteHandler}
              cancelClick={() => setDeletePopupIsVisible(false)}
            />
          </div>
        </ModalWindow>
      )}

      {confirmPopupIsVisible && (
        <ModalWindow onClose={() => setConfirmPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Автор удалён</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => setConfirmPopupIsVisible(false)}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      )}

      {lastPage > 1 && page !== lastPage ? (
        <ShowAll
          text={'Показать ещё'}
          externalClass={s.onlyDesctop}
          arrowSecondary
          showMore={true}
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default Authors;
