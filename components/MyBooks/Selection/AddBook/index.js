import { useState } from 'react';
import Image from 'next/dist/client/image';
import { FiSearch } from 'react-icons/fi';
import classnames from 'classnames';
import ArrowRight from '../../../../public/chevron-right.svg';
import Book from '../../../shared/common/book';
import ModalWindow from '../../../shared/common/modalWindow/ModalWindow';
import Button from '../../../shared/common/Button/Button';
import st from './addBook.module.scss';

const AddBook = ({ setAddBookPage }) => {
  const [activeBookSel, setActiveBookSel] = useState(0);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // const [closeMosal, setCloseModal] = useState(false)

  const books = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];

  const booksSelections = [
    { id: '0', option: 'Все' },
    { id: '1', option: 'Книги' },
    { id: '2', option: 'Аудиокниги' },
    { id: '3', option: 'Авторы' },
  ];

  const onBookClick = () => {
    console.log(111111);
    setModal(true);
  };

  const handleClick = () => {
    setModal(false);
    setConfirm(true);
  };

  const handleCloseModal = () => {
    setConfirm(false);
  };

  return (
    <div className={classnames('container', st.wrapper)}>
      <p
        className={st.goBack}
        onClick={() => {
          setAddBookPage(false);
        }}
      >
        <ArrowRight className={st.goBackArrow} /> Вернуться назад
      </p>
      <div className={st.input}>
        <input
          type="text"
          placeholder="Книга, аудиокнига или автор "
          className={st.inputCastom}
          //   onClick={onSearchInput}
        />
        <FiSearch className={st.iconSearch} />
      </div>
      <div>
        {booksSelections.map((select, idx) => (
          <button
            key={idx * 0.2}
            className={classnames(st.selectFilters, {
              [st.selectFiltersActive]: activeBookSel === idx,
            })}
            onClick={() => {
              setActiveBookSel(idx);
            }}
          >
            {select.option}
          </button>
        ))}
      </div>
      <h2 className={st.title}>Книги</h2>
      <div className={st.myBooks}>
        {books.map((book, ind) => (
          <div key={ind * 2} className={st.myBooksItem} onClick={onBookClick}>
            <Book noLinks={true} />
          </div>
        ))}
      </div>
      <h2 className={st.title}>Аудиокниги</h2>
      <div className={st.myBooks}>
        {books.map((book, inx) => (
          <div key={inx * 3} className={st.myBooksItem} onClick={onBookClick}>
            <Book noLinks={true} audio={true} />
          </div>
        ))}
      </div>
      <h2 className={st.title}>Авторы</h2>
      <div className={classnames(st.selectionListBook, st.defolt)}>
        <Image src="/reviewsBookCovers/author.png" width={129} height={195} />
        <h3 className={st.selectionListBookAuthor}>Name</h3>
        <p className={st.selectionListBookCount}>
          count
          <span> книг</span>
        </p>
      </div>
      {modal && (
        <ModalWindow modal={modal} setModal={setModal}>
          <div className={st.modalContent}>
            <h1 className={st.modalContentTitle}>
              Добавить книгу в подборку “Дизайн”?
            </h1>
            <Button
              text="Добавить"
              typeButton="button"
              click={handleClick}
              classNames={st.modalContentBtn}
            />
          </div>
        </ModalWindow>
      )}
      {confirm && (
        <ModalWindow modal={confirm} setModal={setConfirm}>
          <div className={st.modalContent}>
            <h1 className={st.modalContentTitle}>
              Книга добавлена в подборку “Дизайн”
            </h1>
            <Button
              text="Закрыть"
              typeButton="button"
              click={handleCloseModal}
              classNames={st.modalContentBtn}
            />
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default AddBook;
