import React from 'react';
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import classNames from "classnames";

const MarksPopup = ({ handleMarkClick }) => {
  const { bookMarks, bookChapters } = useSelector(state => state.reader)

  return (
    <>
      <h3 className={styles.popupTitle}>Закладки</h3>
      {bookMarks?.length > 0 ?
        <ul className={styles.popupList}>
          {bookMarks?.map((i, index) => (
            <li
              key={i?.id}
              className={classNames(styles.popupListItem, styles.markListItem)}
              onClick={() => handleMarkClick(i?.page?.page_number)}
            >
              Закладка (глава {bookChapters?.findIndex(j => j?.id === i?.chapter?.id) + 1} из {bookChapters?.length}): {i?.chapter?.title}
            </li>
          ))}
        </ul> :
        <p className={styles.empty}>У вас нет добавленных закладок</p>
      }
    </>
  )
}

export default MarksPopup;
