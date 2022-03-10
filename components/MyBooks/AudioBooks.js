import React, {useState} from 'react';
import styles from './styles.module.scss'
import Popular from "../Filter/Popular/Popular";
import BookMark from '../shared/icons/myBookmark';
import OpenBook from '../shared/icons/bookOpen';
import Flag from '../shared/icons/flag';
import PageIcon from '../shared/icons/page';
import ClickableSearch from "../ClickableSearch";
import Book from "../shared/common/book";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import Button from "../shared/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";
import MobileFilterModal from "../MobileFilterModal";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      {id: 1, title: 'Все', value: 1, icon: <PageIcon/>},
      {id: 2, title: 'Хочу прочитать', value: 2, icon: <BookMark/>},
      {id: 3, title: 'Читаю', value: 3, icon: <OpenBook stroke={'#FF781D'}/>},
      {id: 3, title: 'Прочитано', value: 4, icon: <Flag/>}
    ],
    queryName: 'sortBy',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      {id: 1, title: 'Популярные', value: 3},
      {id: 2, title: 'По дате добавления', value: 2},
      {id: 3, title: 'По алфавиту', value: 2}
    ],
    queryName: 'sortBy',
  },
];

const AudioBooks = () => {
  const dispatch = useDispatch()
  const {innerWidthWindow} = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)
  const [bookTitle, setBookTitle] = useState('')

  const handleIconClick = id => {
    setDeletePopupIsVisible(true)
  }

  return <>
    {innerWidthWindow > 768 &&
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
        <ClickableSearch queryName={'search'}/>
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
    }

    {innerWidthWindow <= 768 &&
    <div className={styles.mobFilters}>
      <div className={styles.flex}>
        <BackBtn
          externalClass={styles.backBtn}
          onClick={() => dispatch(setHeaderVisibility(true))}
        />
        <SearchInput
          placeholder={'Искать книгу'}
          externalClass={styles.mobSearch}
          // onChange={}
        />
      </div>

      <h2 className={classNames("title", styles.title)}>Мои аудиокниги</h2>

      <MobileFilterModal>
        df
      </MobileFilterModal>
    </div>
    }

    <div className={styles.grid}>
      <div className={styles.gridItem}>
        <Book
          audio
          withDelete
          onDelete={() => handleIconClick()}
        />
      </div>
    </div>

    {deletePopupIsVisible &&
      <ModalWindow
        onClose={() => setDeletePopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Удалить книгу</h3>
          <p className={styles.modalText}>
            Вы действительно хотите удалить книгу “Колдовской мир. Тройка
            мечей”?
          </p>
          <ButtonGroup
            text="Удалить"
            typeButton="button"
            ClassName={styles.modalBtns}
            click={() => setConfirmPopupIsVisible(true)}
            cancelClick={() => setDeletePopupIsVisible(false)}
          />
        </div>
      </ModalWindow>
    }

    {confirmPopupIsVisible &&
      <ModalWindow
        onClose={() => setConfirmPopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Книга удалена</h3>

          <Button
            text="Закрыть"
            typeButton="button"
            click={() => setConfirmPopupIsVisible(false)}
            classNames={styles.modalBtn}
          />
        </div>
      </ModalWindow>
    }
  </>
};

export default AudioBooks;