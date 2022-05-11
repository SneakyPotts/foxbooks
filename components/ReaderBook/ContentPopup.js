import React from 'react';
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import Link from 'next/link'
import classNames from "classnames";

const ContentPopup = () => {
  const { bookChapters } = useSelector(state => state.reader)

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
                <Link href={''}>
                  <a className={styles.chapterLink}>{i?.title}</a>
                </Link>
              </li>
            )}
          </ul> :
          <p className={styles.empty}>Глав нет</p>
        }
      </>
  )
};

export default ContentPopup;
