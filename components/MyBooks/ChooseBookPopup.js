import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchInput from '../SearchInput';
import classNames from 'classnames';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import s from '../SearchPage/styles.module.scss';
import st from '../shared/common/booksFilters/bookFilters.module.scss';
import styles from './styles.module.scss';

import { addBookToSelection } from '../../store/selectionSlice';

import BooksService from '../../http/BookService';
import SelectionService from '../../http/SelectionService';

import BackBtn from '../shared/common/BackBtn';
import BackText from '../shared/common/BackText';
import Button from '../shared/common/Button/Button';
import Loader from '../shared/common/Loader';
import Book from '../shared/common/book';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import ShowAll from '../shared/common/showAll/ShowAll';

const filters = [
  { id: 1, title: 'Все', value: 'all' },
  { id: 2, title: 'Книги', value: 'books' },
  { id: 3, title: 'Аудиокниги', value: 'audioBooks' },
];

const ChooseBookPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { selectionById } = useSelector((state) => state.selection);

  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const [books, setBooks] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);

  const [bookPage, setBookPage] = useState(1);
  const [audioPage, setAudioPage] = useState(1);
  const [lastPage, setLastPage] = useState({ book: 1, audio: 1 });

  const sortedBooks = useMemo(() => {
    return books.length ? books.filter((i) => i?.title?.toLowerCase()?.includes(searchValue.toLowerCase())) : [];
  }, [books, searchValue]);

  const sortedAudioBooks = useMemo(() => {
    return audioBooks.length ? audioBooks.filter((i) => i?.title?.toLowerCase()?.includes(searchValue.toLowerCase())) : [];
  }, [audioBooks, searchValue]);

  const [clickedBook, setClickedBook] = useState(null);

  const handleClick = (book) => {
    setClickedBook(book);
    setAddPopupIsVisible(true);
  };

  const addBookHandler = async () => {
    await SelectionService.addBookToCompilation({
      compilation_id: selectionById?.compilation?.id,
      book_id: clickedBook?.id,
      book_type: clickedBook?.type,
    }).then(() => {
      dispatch(addBookToSelection(clickedBook));
      setAddPopupIsVisible(false);
      setConfirmPopupIsVisible(true);
    });
  };

  const searchValueHandler = debounce(setSearchValue, 300);

  useEffect(() => {
    if (bookPage > 1) {
      (async () => {
        const booksData = await BooksService.getMyBooks({ page: bookPage });
        setBooks([...books, ...booksData.data.data.data]);
      })();
    }
  }, [bookPage]);

  useEffect(() => {
    if (audioPage > 1) {
      (async () => {
        const audioBooksData = await BooksService.getMyAudioBooks({ page: audioPage });
        setBooks([...books, ...audioBooksData.data.data.data]);
      })();
    }
  }, [audioPage]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    (async () => {
      setBookPage(1);
      setAudioPage(1);
      const booksData = await BooksService.getMyBooks({ page: 1, findByTitle: searchValue });
      const audioBooksData = await BooksService.getMyAudioBooks({ page: 1, findByTitle: searchValue });

      setBooks(booksData.data.data.data);
      setAudioBooks(audioBooksData.data.data.data);
      setLastPage({
        book: booksData.data.data.last_page,
        audio: audioBooksData.data.data.last_page,
      });
      setIsLoading(false);
    })();

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [searchValue]);

  return (
    <div className={styles.chooseBook}>
      <div className={styles.chooseBookContainer}>
        <BackText onClick={onClose} externalClass={styles.chooseBookBackText} />

        <div className={styles.flex}>
          <BackBtn externalClass={styles.backBtn} onClick={onClose} />
          <SearchInput placeholder={'Книга или аудиокнига'} externalClass={classNames(styles.mobSearch, styles.chooseBookInput)} onChange={searchValueHandler} />
        </div>

        <div>
          {filters?.map((i) => (
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

        {isLoading ? (
          <div className={classNames('empty', styles.searchEmpty)}>
            <Loader />
          </div>
        ) : !books?.length && !audioBooks?.length ? (
          <p className={classNames('empty', styles.searchEmpty)}>Ничего не найдено</p>
        ) : (
          <>
            {!!books?.length && (activeFilter === 'all' || activeFilter === 'books') && (
              <>
                <h2 className={classNames('title', styles.chooseBookTitle)}>Книги</h2>
                <div className={classNames(styles.grid, styles.chooseBookGrid)}>
                  {books.map((i) => (
                    <div key={i?.id} className={styles.gridItem} onClick={() => handleClick(i)}>
                      <Book book={i} noLinks />
                    </div>
                  ))}
                </div>
                {lastPage.book > 1 && bookPage !== lastPage.book ? (
                  <ShowAll text={'Показать ещё'} externalClass={s.onlyDesctop} arrowSecondary showMore={true} setPage={setBookPage} />
                ) : null}
              </>
            )}

            {!!audioBooks?.length && (activeFilter === 'all' || activeFilter === 'audioBooks') && (
              <>
                <h2 className={classNames('title', styles.chooseBookTitle)}>Аудиокниги</h2>
                <div className={classNames(styles.grid, styles.chooseBookGrid)}>
                  {audioBooks.map((i) => (
                    <div className={styles.gridItem} onClick={() => handleClick(i)}>
                      <Book key={i?.id} book={i} noLinks audio />
                    </div>
                  ))}
                </div>
                {lastPage.audio > 1 && bookPage !== lastPage.audio ? (
                  <ShowAll text={'Показать ещё'} externalClass={s.onlyDesctop} arrowSecondary showMore={true} setPage={setAudioPage} />
                ) : null}
              </>
            )}
          </>
        )}
      </div>

      {addPopupIsVisible && (
        <ModalWindow onClose={() => setAddPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Добавить книгу в подборку “{selectionById?.compilation?.title}”?</h3>

            <Button text="Добавить" typeButton="button" click={addBookHandler} classNames={styles.modalBtn} />
          </div>
        </ModalWindow>
      )}

      {confirmPopupIsVisible && (
        <ModalWindow onClose={() => setConfirmPopupIsVisible(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Книга добавлена в подборку “{selectionById?.compilation?.title}”</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => {
                setConfirmPopupIsVisible(false);
                onClose();
              }}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default ChooseBookPopup;
