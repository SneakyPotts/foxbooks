import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.scss'
import BackText from "../shared/common/BackText";
import SearchInput from "../SearchInput";
import BackBtn from "../shared/common/BackBtn";
import classNames from "classnames";
import Book from "../shared/common/book";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import Button from "../shared/common/Button/Button";
import BooksService from "../../http/BookService";
import Loader from "../shared/common/Loader";
import st from "../shared/common/booksFilters/bookFilters.module.scss";
import classnames from "classnames";
import SelectionService from "../../http/SelectionService";
import {useDispatch, useSelector} from "react-redux";
import {addBookToSelection} from "../../store/selectionSlice";

const filters = [
  { id: 1, title: 'Все', value: 'all' },
  { id: 2, title: 'Книги', value: 'books' },
  { id: 3, title: 'Аудиокниги', value: 'audioBooks' }
];

const ChooseBookPopup = ({onClose}) => {
  const dispatch = useDispatch()
  const { selectionById } = useSelector(state => state.selection)

  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const [books, setBooks] = useState([])
  const [audioBooks, setAudioBooks] = useState([])

  const sortedBooks = useMemo(() => {
    return books.length ? books.filter(i => i?.title?.toLowerCase()?.includes(searchValue.toLowerCase())) : []
  }, [books, searchValue])

  const sortedAudioBooks = useMemo(() => {
    return audioBooks.length ? audioBooks.filter(i => i?.title?.toLowerCase()?.includes(searchValue.toLowerCase())) : []
  }, [audioBooks, searchValue])

  const [clickedBook, setClickedBook] = useState(null)

  const handleClick = book => {
    setClickedBook(book)
    setAddPopupIsVisible(true)
  }

  const addBookHandler = async () => {
    await SelectionService.addBookToCompilation({
      compilation_id: selectionById?.compilation?.id,
      book_id: clickedBook?.id,
      book_type: clickedBook?.type
    }).then(() => {
      dispatch(addBookToSelection(clickedBook))
      setAddPopupIsVisible(false)
      setConfirmPopupIsVisible(true)
    })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    (async () => {
      const booksData = await BooksService.getMyBooks({})
      const audioBooksData = await BooksService.getMyAudioBooks({})

      setBooks(booksData.data.data.data)
      setAudioBooks(audioBooksData.data.data.data)
      setIsLoading(false)
    })()

    return () => {
      document.body.style.overflow = 'initial';
    }
  }, [])

  return (
    <div className={styles.chooseBook}>
      <div className={styles.chooseBookContainer}>
        <BackText
          onClick={onClose}
          externalClass={styles.chooseBookBackText}
        />

        <div className={styles.flex}>
          <BackBtn
            externalClass={styles.backBtn}
            onClick={onClose}
          />
          <SearchInput
            placeholder={'Книга или аудиокнига'}
            externalClass={classNames(styles.mobSearch, styles.chooseBookInput)}
            onChange={setSearchValue}
          />
        </div>

        <div>
          {filters?.map(i => (
            <span
              key={i?.id}
              className={classnames(st.abFilter, {
                [st.active]: i?.value === activeFilter,
              })}
              onClick={() => setActiveFilter(i?.value)}
            >
              {i?.title}
            </span>
          ))}
        </div>

        {isLoading ?
          <p className={classNames("empty", styles.searchEmpty)}><Loader /></p> :
          !sortedBooks?.length && !sortedAudioBooks?.length && !sortedAuthors?.length ?
            <p className={classNames("empty", styles.searchEmpty)}>Ничего не найдено</p> :
            <>
              {!!sortedBooks?.length && (activeFilter === 'all' || activeFilter === 'books') && <>
                <h2 className={classNames('title', styles.chooseBookTitle)}>Книги</h2>
                <div className={classNames(styles.grid, styles.chooseBookGrid)}>
                  {sortedBooks.map(i =>
                    <div
                      key={i?.id}
                      className={styles.gridItem}
                      onClick={() => handleClick(i)}
                    >
                      <Book
                        book={i}
                        noLinks
                      />
                    </div>
                  )}
                </div>
              </>}

              {!!sortedAudioBooks?.length && (activeFilter === 'all' || activeFilter === 'audioBooks') && <>
                <h2 className={classNames('title', styles.chooseBookTitle)}>Аудиокниги</h2>
                <div className={classNames(styles.grid, styles.chooseBookGrid)}>
                  {sortedAudioBooks.map(i =>
                    <div
                      className={styles.gridItem}
                      onClick={() => handleClick(i)}
                    >
                      <Book
                        key={i?.id}
                        book={i}
                        noLinks
                        audio
                      />
                    </div>
                  )}
                </div>
              </>}
            </>
        }
      </div>

      {addPopupIsVisible &&
        <ModalWindow
          onClose={() => setAddPopupIsVisible(false)}
        >
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Добавить книгу в подборку “{selectionById?.compilation?.title}”?</h3>

            <Button
              text="Добавить"
              typeButton="button"
              click={addBookHandler}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      }

      {confirmPopupIsVisible &&
        <ModalWindow
          onClose={() => setConfirmPopupIsVisible(false)}
        >
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Книга добавлена в подборку “{selectionById?.compilation?.title}”</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => {
                setConfirmPopupIsVisible(false)
                onClose()
              }}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      }
    </div>
  );
};

export default ChooseBookPopup;
