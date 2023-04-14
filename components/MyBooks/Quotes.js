import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Popular from '../Filter/Popular/Popular';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import QuoteItem from './QuoteItem';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { setHeaderVisibility } from '../../store/commonSlice';

import ReaderService from '../../http/ReaderService';

import BackBtn from '../shared/common/BackBtn';
import Button from '../shared/common/Button/Button';
import Loader from '../shared/common/Loader';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';

const filter = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      { id: 1, title: 'Все', value: 1 },
      { id: 2, title: 'По книгам', value: 2 },
      { id: 3, title: 'По авторам', value: 3 },
    ],
    queryName: 'sortBy',
  },
];

const Quotes = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { innerWidthWindow } = useSelector((state) => state.common);

  const [stateIndex, setStateIndex] = useState(null);
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false);
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [quoteId, setQuoteId] = useState([]);

  const showDeletePopup = (id) => {
    setQuoteId(id);
    setDeletePopupIsVisible(true);
  };

  const deleteHandler = () => {
    ReaderService.deleteBookQuote(quoteId).then(() => {
      setData((prev) => prev.filter((i) => i.id !== quoteId));
      setDeletePopupIsVisible(false);
      setConfirmPopupIsVisible(true);
    });
  };

  useEffect(() => {
    (async () => {
      const response = await ReaderService.getMyQuotes(router.query?.sortBy);
      setData(response.data?.data);
      setIsLoading(false);
    })();
  }, [router.query]);

  return (
    <>
      {innerWidthWindow > 768 && (
        <div className={styles.filters}>
          <div className={styles.mlAuto}>
            {filter?.map((i, index) => (
              <Popular
                key={index + 2}
                title={i?.title}
                defaultValue={i?.defaultValue}
                data={i?.options}
                queryName={i?.queryName}
                filterStateIdx={stateIndex}
                elIdx={1}
                setFilStateIdx={setStateIndex}
                isRight
              />
            ))}
          </div>
        </div>
      )}

      {innerWidthWindow <= 768 && (
        <div className={styles.mobFilters}>
          <div className={styles.flex}>
            <BackBtn externalClass={styles.backBtn} onClick={() => dispatch(setHeaderVisibility(true))} />
          </div>

          <h2 className={classNames('title', styles.title)}>Мои цитаты</h2>

          {filter?.map((i, index) => (
            <Popular
              key={index + 2}
              title={i?.title}
              defaultValue={i?.defaultValue}
              data={i?.options}
              queryName={i?.queryName}
              filterStateIdx={stateIndex}
              elIdx={1}
              setFilStateIdx={setStateIndex}
            />
          ))}
        </div>
      )}

      {isLoading ? (
        <div className={classNames('empty', styles.empty)}>
          <Loader />
        </div>
      ) : data?.length ? (
        <div className={classNames(styles.grid, styles.quotesGrid)}>
          {data.map((i) => (
            <div key={i?.id} className={styles.gridItem}>
              <QuoteItem data={i} onDelete={() => showDeletePopup(i?.id)} />
            </div>
          ))}
        </div>
      ) : (
        <p className={classNames('empty', styles.empty)}>Пусто</p>
      )}

      {deletePopupIsVisible && (
        <ModalWindow onClose={() => setDeletePopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Удалить цитату</h3>
            <p className={styles.modalText}>Вы действительно хотите удалить цитату?</p>
            <ButtonGroup text="Удалить" typeButton="button" ClassName={styles.modalBtns} click={deleteHandler} cancelClick={() => setDeletePopupIsVisible(false)} />
          </div>
        </ModalWindow>
      )}

      {confirmPopupIsVisible && (
        <ModalWindow onClose={() => setConfirmPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Цитата удалена</h3>

            <Button text="Закрыть" typeButton="button" click={() => setConfirmPopupIsVisible(false)} classNames={styles.modalBtn} />
          </div>
        </ModalWindow>
      )}
    </>
  );
};

export default Quotes;
