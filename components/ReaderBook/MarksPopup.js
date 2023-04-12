import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import BookMark from "../shared/icons/BookMark";
import Bin from "../shared/icons/trash";
import {deleteBookMark} from "../../store/readerSlice";

const MarksPopup = ({ handleMarkClick }) => {
  const dispatch = useDispatch();

  const { bookMarks, bookChapters } = useSelector(state => state.reader)

  const handleDeleteMark = (id) => {
    dispatch(deleteBookMark(id))
  }

  return (
    <>
      <h3 className={styles.popupTitle}>Закладки</h3>
      {bookMarks?.length > 0 ?
        <ul className={styles.popupList}>
          {bookMarks?.map((i) => (
            <li
              key={i?.id}
              className={classNames(styles.popupListItem, styles.markListItem)}
              onClick={() => handleMarkClick(i?.page?.page_number || i?.page[0]?.page_number)}
            >
              <div className={styles.iconMark}>
                <BookMark/>
              </div>
              <div>
                <p className={styles.caption}>{`Закладка (глава ${bookChapters?.findIndex(j => j?.id === i?.chapter?.id) + 1} из ${bookChapters?.length}): ${i?.page?.page_number} страница`}</p>
                <p className={styles.text}>В закладке прописывается часть первого предложения на странице</p>
              </div>
              <div onClick={() => handleDeleteMark(i?.id)} className={styles.iconDelete}>
                <Bin />
              </div>
            </li>
          ))}
        </ul> :
        <p className={styles.empty}>У вас нет добавленных закладок</p>
      }
    </>
  )
}

export default MarksPopup;
