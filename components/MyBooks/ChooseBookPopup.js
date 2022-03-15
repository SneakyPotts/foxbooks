import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import BackText from "../shared/common/BackText";
import SearchInput from "../SearchInput";
import BookFilters from "../shared/common/booksFilters/BookFilters";
import BackBtn from "../shared/common/BackBtn";
import classNames from "classnames";
import Book from "../shared/common/book";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import Button from "../shared/common/Button/Button";

const filters = [
  { id: 1, title: 'Все', value: 1 },
  { id: 2, title: 'Книги', value: 3 },
  { id: 3, title: 'Аудиокниги', value: 5 },
  { id: 4, title: 'Авторы', value: 2 },
];

const ChooseBookPopup = ({onClose}) => {
  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
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
            placeholder={'Книга, аудиокнига или автор'}
            externalClass={classNames(styles.mobSearch, styles.chooseBookInput)}
            // onChange={}
          />
        </div>

        <BookFilters
          filters={filters}
          queryName={''}
        />

        <h2 className={classNames('title', styles.chooseBookTitle)}>Книги</h2>
        <div className={classNames(styles.grid, styles.chooseBookGrid)}>
          <div
            className={styles.gridItem}
            onClick={() => setAddPopupIsVisible(true)}
          >
            <Book
              noLinks
            />
          </div>
        </div>

        <h2 className={classNames('title', styles.chooseBookTitle)}>Аудиокниги</h2>
        <div className={classNames(styles.grid, styles.chooseBookGrid)}>
          <div
            className={styles.gridItem}
            onClick={() => setAddPopupIsVisible(true)}
          >
            <Book
              noLinks
              audio
            />
          </div>
        </div>
      </div>

      {addPopupIsVisible &&
        <ModalWindow
          onClose={() => setAddPopupIsVisible(false)}
        >
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Добавить книгу в подборку “Дизайн”?</h3>

            <Button
              text="Добавить"
              typeButton="button"
              click={() => setConfirmPopupIsVisible(true)}
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
            <h3 className={styles.modalTitle}>Книга добавлена в подборку “Дизайн”</h3>

            <Button
              text="Закрыть"
              typeButton="button"
              click={() => setConfirmPopupIsVisible(false)}
              classNames={styles.modalBtn}
            />
          </div>
        </ModalWindow>
      }
    </div>
  );
};

export default ChooseBookPopup;
