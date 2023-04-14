import { useRouter } from 'next/router';

import React from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import styles from './styles.module.scss';

const ContentPopup = ({ onClose }) => {
  const router = useRouter();
  const { book, bookChapters } = useSelector((state) => state.reader);
  console.log(book);
  const handleClick = (pageNumber) => {
    router.push({ query: { ...router.query, page: pageNumber } }).then(() => {
      onClose && onClose();
    });
  };

  return (
    <>
      <h3 className={styles.popupTitle}>Содержание</h3>
      {bookChapters?.length ? (
        <ul className={classNames(styles.popupList, styles.chapterList)}>
          {bookChapters?.map((i) => (
            <li key={i?.id} className={styles.popupListItem}>
              <span
                className={classNames(styles.chapterLink, {
                  [styles.active]: book?.chapters[0]?.id === i?.id,
                })}
                onClick={() => handleClick(i?.page?.page_number)}
              >
                <span className={styles.chapterName}>{i?.title}</span>
                <span className={styles.chapterProgress}>{`${book?.reading_progress}%`}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Глав нет</p>
      )}
    </>
  );
};

export default ContentPopup;
