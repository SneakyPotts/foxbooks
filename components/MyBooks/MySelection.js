import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNoun } from '../../utils';
import ClickableSearch from '../ClickableSearch';
import CreateCompilationPopup from '../CreateCompilationPopup';
import DotsDropdown from '../DotsDropdown';
import Popular from '../Filter/Popular/Popular';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import ChooseBookPopup from './ChooseBookPopup';
import classNames from 'classnames';

import st from '../Selections/SelectionPage/selectionPage.module.scss';
import styles from './styles.module.scss';

import { setHeaderVisibility } from '../../store/commonSlice';
import { deleteBookFromSelection } from '../../store/selectionSlice';

import SelectionService from '../../http/SelectionService';

import BackBtn from '../shared/common/BackBtn';
import Button from '../shared/common/Button/Button';
import Book from '../shared/common/book';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import OpenBook from '../shared/icons/bookOpen';
import EditPensil from '../shared/icons/editPencil';
import Flag from '../shared/icons/flag';
import BookMark from '../shared/icons/myBookmark';
import PageIcon from '../shared/icons/page';
import Bin from '../shared/icons/trash';

const filter1 = [
  {
    title: 'Все',
    defaultValue: '0',
    options: [
      { id: 1, title: 'Все', value: '0', icon: <PageIcon /> },
      { id: 2, title: 'Хочу прочитать', value: 1, icon: <BookMark /> },
      { id: 3, title: 'Читаю', value: 2, icon: <OpenBook stroke={'#FF781D'} /> },
      { id: 3, title: 'Прочитано', value: 3, icon: <Flag /> },
    ],
    queryName: 'status',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      { id: 1, title: 'Популярные', value: 3 },
      { id: 2, title: 'По дате добавления', value: 1 },
      { id: 3, title: 'По алфавиту', value: 2 },
    ],
    queryName: 'sortBy',
  },
];

const MySelection = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [stateIndex, setStateIndex] = useState(null);
  const { innerWidthWindow } = useSelector((state) => state.common);
  const { selectionById } = useSelector((state) => state.selection);

  const [choosePopupIsVisible, setChoosePopupIsVisible] = useState(false);
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false);
  const [deleteBookPopupIsVisible, setDeleteBookPopupIsVisible] = useState(false);
  const [confirmBookPopupIsVisible, setConfirmBookPopupIsVisible] = useState(false);
  const [deleteSelectionPopupIsVisible, setDeleteSelectionPopupIsVisible] = useState(false);
  const [confirmSelectionPopupIsVisible, setConfirmSelectionPopupIsVisible] = useState(false);

  const [bookId, setBookId] = useState(null);
  const [bookType, setBookType] = useState(null);
  const [bookTitle, setBookTitle] = useState(null);

  const showDeleteBookPopup = ({ id, type, title }) => {
    setBookId(id);
    setBookType(type);
    setBookTitle(title);
    setDeleteBookPopupIsVisible(true);
  };

  const deleteBookHandler = () => {
    SelectionService.deleteBookFromCompilation(selectionById?.compilation?.id, bookId, bookType).then(() => {
      dispatch(deleteBookFromSelection(bookId));
      setDeleteBookPopupIsVisible(false);
      setConfirmBookPopupIsVisible(true);
    });
  };

  const showDeleteSelectionPopup = () => {
    setDeleteSelectionPopupIsVisible(true);
  };

  const deleteSelectionHandler = () => {
    SelectionService.deleteCompilation(selectionById?.compilation?.id).then(() => {
      setDeleteSelectionPopupIsVisible(false);
      setConfirmSelectionPopupIsVisible(true);
    });
  };

  useEffect(() => {
    if (innerWidthWindow <= 768) {
      dispatch(setHeaderVisibility(false));
    }
  }, []);

  return (
    <>
      <div className={styles.compilationWrapper}>
        <Image
          src={selectionById?.compilation?.background}
          alt={`Подборка ${selectionById?.compilation?.title}`}
          layout={'fill'}
          placeholder="blur"
          blurDataURL="/blur.webp"
          className={styles.compilationImg}
        />

        <BackBtn
          onClick={() => router.push('/mybooks/selections')}
          externalClass={styles.compilationBack}
        />
        <h2 className={styles.compilationTitle}>{selectionById?.compilation?.title}</h2>
        <div className={styles.compilationControls}>
          <Button
            text={'Добавить книгу'}
            classNames={styles.compilationBtn}
            click={() => setChoosePopupIsVisible(true)}
          />
          <DotsDropdown externalClass={styles.compilationDropdown}>
            <div
              className={styles.controlsItem}
              onClick={() => setCreatePopupIsVisible(true)}
            >
              <EditPensil />
              Редактировать
            </div>

            <div
              className={styles.controlsItem}
              onClick={showDeleteSelectionPopup}
            >
              <Bin />
              Удалить
            </div>
          </DotsDropdown>
        </div>
      </div>
      <div className={classNames('container', styles.compilationContainer)}>
        <span
          className={classNames(styles.compilationBookCount, {
            [styles.empty]: 1,
          })}
        >
          <span>{selectionById?.compilation?.total_books_count}</span>
          {!selectionById?.compilation?.books_count && selectionById?.compilation?.audio_books_count
            ? getNoun(selectionById?.compilation?.total_books_count, 'Аудиокнига', 'Аудиокниги', 'Аудиокниг')
            : getNoun(selectionById?.compilation?.total_books_count, 'Книга', 'Книги', 'Книг')}
        </span>

        <p className={st.selectionText}>{selectionById?.compilation?.description}</p>

        {innerWidthWindow > 768 && (
          <div className={styles.filters}>
            <div>
              <span className={styles.filtersText}>Статус</span>
              {filter1?.map((i, index) => (
                <Popular
                  key={index + 1}
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
            <div>
              <ClickableSearch queryName={'search'} />
              {filter2?.map((i, index) => (
                <Popular
                  key={index + 2}
                  title={i?.title}
                  defaultValue={i?.defaultValue}
                  data={i?.options}
                  queryName={i?.queryName}
                  filterStateIdx={stateIndex}
                  elIdx={2}
                  setFilStateIdx={setStateIndex}
                  isRight
                />
              ))}
            </div>
          </div>
        )}

        {selectionById?.books?.data?.length ? (
          <div className={styles.grid}>
            {selectionById?.books?.data?.map((i) => (
              <div
                className={styles.gridItem}
                key={i?.book_compilationable?.id || i?.id}
              >
                <Book
                  withDelete
                  onDelete={() => showDeleteBookPopup(i?.book_compilationable || i)}
                  book={i?.book_compilationable || i}
                  type={i?.book_compilationable?.type || i?.type}
                  audio={i?.book_compilationable?.type === 'audioBooks' || i?.type === 'audioBooks'}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">Пусто</p>
        )}

        <Button
          text={'Добавить книгу'}
          classNames={styles.compilationBtnMob}
          click={() => setChoosePopupIsVisible(true)}
        />
      </div>

      {choosePopupIsVisible && <ChooseBookPopup onClose={() => setChoosePopupIsVisible(false)} />}

      {createPopupIsVisible && (
        <CreateCompilationPopup
          image={selectionById?.compilation?.background}
          title={selectionById?.compilation?.title}
          description={selectionById?.compilation?.description}
          onClose={() => setCreatePopupIsVisible(false)}
          isEdit
        />
      )}

      {deleteBookPopupIsVisible && (
        <ModalWindow onClose={() => setDeleteBookPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Удалить книгу</h3>
            <p className={styles.modalText}>Вы действительно хотите удалить книгу “{bookTitle}”?</p>
            <ButtonGroup
              text="Удалить"
              typeButton="button"
              ClassName={styles.modalBtns}
              click={deleteBookHandler}
              cancelClick={() => setDeleteBookPopupIsVisible(false)}
            />
          </div>
        </ModalWindow>
      )}

      {confirmBookPopupIsVisible && (
        <ModalWindow onClose={() => setConfirmBookPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Книга удалена</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => setConfirmBookPopupIsVisible(false)}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      )}

      {deleteSelectionPopupIsVisible && (
        <ModalWindow onClose={() => setDeleteSelectionPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Удалить подборку</h3>
            <p className={styles.modalText}>Вы действительно хотите удалить подборку?</p>
            <ButtonGroup
              text="Удалить"
              typeButton="button"
              ClassName={styles.modalBtns}
              click={deleteSelectionHandler}
              cancelClick={() => setDeleteSelectionPopupIsVisible(false)}
            />
          </div>
        </ModalWindow>
      )}

      {confirmSelectionPopupIsVisible && (
        <ModalWindow
          onClose={() => {
            setConfirmSelectionPopupIsVisible(false);
            router.push('/mybooks/selections');
          }}
        >
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Подборка удалена</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => {
                setConfirmSelectionPopupIsVisible(false);
                router.push('/mybooks/selections');
              }}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      )}
    </>
  );
};

export default MySelection;
