import React, {useEffect, useState} from 'react';
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
import BooksService from "./../../http/BookService"
import {useRouter} from "next/router";
import Loader from "../shared/common/Loader";

const Books = ({ isAudio }) => {
  const filter1 = [
    {
      title: 'Все',
      defaultValue: '0',
      options: [
        { id: 1, title: 'Все', value: '0', icon: <PageIcon /> },
        { id: 2, title: isAudio ? 'Хочу прослушать' : 'Хочу прочитать', value: 1, icon: <BookMark /> },
        { id: 3, title: isAudio ? 'Слушаю' : 'Читаю', value: 2, icon: <OpenBook stroke={'#FF781D'} /> },
        { id: 3, title: isAudio ? 'Прослушал' : 'Прочитано', value: 3, icon: <Flag /> }
      ],
      queryName: 'status',
    },
  ];

  const filter2 = [
    {
      title: 'Популярные',
      defaultValue: 5,
      options: [
        { id: 1, title: 'Популярные', value: 5 },
        { id: 2, title: 'По дате добавления', value: 7 },
        { id: 3, title: 'По алфавиту', value: 6 }
      ],
      queryName: 'sortBy',
    },
  ];

  const dispatch = useDispatch()
  const router = useRouter()

  const { innerWidthWindow } = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)
  const [bookId, setBookId] = useState(null)
  const [bookType, setBookType] = useState(null)
  const [bookTitle, setBookTitle] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const onChange = value => {
    router.push(
      { query: { ...router.query, ['letter']: encodeURI(value) } },
      null,
      { scroll: false }
    );
  }

  const showDeletePopup = ({id, type, title}) => {
    setBookId(id)
    setBookType(type)
    setBookTitle(title)
    setDeletePopupIsVisible(true)
  }

  const deleteHandler = () => {
    BooksService.deleteBookFromFavorite({id: bookId, type: bookType}).then(() => {
      setData(prev => prev.filter(i => i.id !== bookId))
      setDeletePopupIsVisible(false)
      setConfirmPopupIsVisible(true)
    })
  }

  useEffect(() => {
    (async () => {
      let response = []
      if(isAudio) {
        response = await BooksService.getMyAudioBooks(router.query)
      } else {
        response = await BooksService.getMyBooks(router.query)
      }
      setData(response.data.data.data)
      setIsLoading(false)
    })()
  }, [router.query])

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
          <ClickableSearch queryName={'findByTitle'}/>
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
            onChange={onChange}
          />
        </div>

        <h2 className={classNames("title", styles.title)}>Мои книги</h2>

        <MobileFilterModal>
          <span className={styles.mobFiltersTitle}>Статус</span>
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
          <span className={styles.line}/>
          <span className={styles.mobFiltersTitle}>Сортировать</span>
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
            />
          ))}
        </MobileFilterModal>
      </div>
    }

    {isLoading ?
      <p className={classNames("empty", styles.empty)}>
        <Loader/>
      </p> :
      data?.length ?
        <div className={styles.grid}>
          {data.map(i =>
            <div className={styles.gridItem}>
              <Book
                key={i?.id}
                book={i}
                withDelete
                type={i?.type}
                audio={isAudio}
                onDelete={() => showDeletePopup(i)}
              />
            </div>
          )}
        </div> :
        <p className={classNames("empty", styles.empty)}>Пусто</p>
    }

    {deletePopupIsVisible &&
      <ModalWindow
        onClose={() => setDeletePopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Удалить книгу</h3>
          <p className={styles.modalText}>
            Вы действительно хотите удалить книгу “{bookTitle}”?
          </p>
          <ButtonGroup
            text="Удалить"
            typeButton="button"
            ClassName={styles.modalBtns}
            click={deleteHandler}
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

export default Books;