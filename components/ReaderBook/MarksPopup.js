import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import styles from './styles.module.scss';

import { deleteBookMark } from '../../store/readerSlice';

import BookMark from '../shared/icons/BookMark';
import Bin from '../shared/icons/trash';

const MarksPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { bookMarks, bookChapters } = useSelector((state) => state.reader);

  const handleDeleteMark = (id) => {
    dispatch(deleteBookMark(id));
  };

  const sortedBookMarks = useMemo(() => {
    return [...bookMarks].sort((a, b) => a.page.page_number - b.page.page_number);
  }, [bookMarks]);

  return (
    <>
      <h3 className={styles.popupTitle}>Закладки</h3>
      {sortedBookMarks?.length > 0 ? (
        <ul className={styles.popupList}>
          {sortedBookMarks?.map((i) => (
            <li key={i?.id} className={classNames(styles.popupListItem, styles.markListItem)}>
              <div className={styles.iconMark}>
                <BookMark />
              </div>
              <Link
                href={{
                  query: { ...router.query, page: i?.page?.page_number },
                }}
              >
                <a>
                  <p className={styles.caption}>
                    {`Закладка (глава ${bookChapters?.findIndex((j) => j?.id === i?.chapter?.id) + 1} из ${bookChapters?.length}): ${i?.page?.page_number} страница`}
                  </p>
                  <p className={styles.text}>{`${i?.page?.content}...`}</p>
                </a>
              </Link>
              <div onClick={() => handleDeleteMark(i?.id)} className={styles.iconDelete}>
                <Bin />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>У вас нет добавленных закладок</p>
      )}
    </>
  );
};

export default MarksPopup;
