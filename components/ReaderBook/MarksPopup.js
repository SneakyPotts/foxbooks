import React from 'react';
import styles from './styles.module.scss'
import {useSelector} from "react-redux";
import classNames from "classnames";

const MarksPopup = ({ handleMarkClick }) => {
  const { bookMarks } = useSelector(state => state.reader)

  return (
    <>
      <h3 className={styles.popupTitle}>Закладки</h3>
      {bookMarks?.length > 0 ?
        <ul className={styles.popupList}>
          {bookMarks?.map((i, index) => (
            <li
              key={i?.page?.page_number}
              className={classNames(styles.popupListItem, styles.markListItem)}
              onClick={() => handleMarkClick(i?.page?.page_number)}
            >
              Закладка (глава {index + 1} из 17): {i?.chapter} Когда во вторник мистер и миссис Дурсль
            </li>
          ))}
        </ul> :
        <p className={styles.empty}>У вас нет добавленных закладок</p>
      }
    </>
  )
}

export default MarksPopup;
