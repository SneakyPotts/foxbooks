import React from 'react';
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import classNames from "classnames";
import {useRouter} from "next/router";

const ContentPopup = ({onClose}) => {
  const router = useRouter()
  const { bookChapters } = useSelector(state => state.reader)

  const handleClick = (pageNumber) => {
      router.push({ query: { ...router.query, page: pageNumber } }).then(() => {
        onClose && onClose()
      })
  }

  return (
      <>
        <h3 className={styles.popupTitle}>Содержание</h3>
        {bookChapters?.length ?
          <ul className={classNames(styles.popupList, styles.chapterList)}>
            {bookChapters?.map(i =>
              <li
                key={i?.id}
                className={styles.popupListItem}
              >
                <span
                    className={styles.chapterLink}
                    onClick={() => handleClick(i?.page?.page_number)}
                >
                    {i?.title}
                </span>
              </li>
            )}
          </ul> :
          <p className={styles.empty}>Глав нет</p>
        }
      </>
  )
};

export default ContentPopup;
