import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GroupForms from '../Header/groupForms/GroupForms';
import ContentPopup from './ContentPopup';
import EditPopup from './EditPopup';
import Header from './Header';
import MarksPopup from './MarksPopup';
import PageProgress from './PageProgress';
import QuotesPopup from './QuotesPopup';
import TextWithQuotes from './TextWithQuotes';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { setAuthPopupVisibility } from '../../store/commonSlice';
import { addBookMark, deleteBookMark } from '../../store/readerSlice';

import BackBtn from '../shared/common/BackBtn';
import DrawerPopup from '../shared/common/DrawerPopup';
import MyPagination from '../shared/common/MyPagination';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import BookMark from '../shared/icons/BookMark';

const ReaderBook = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { innerWidthWindow, authPopupIsVisible } = useSelector((state) => state.common);
  const { isAuth } = useSelector((state) => state.auth);
  const { book, settings, bookMarks } = useSelector((state) => state.reader);

  const [contentPopupIsVisible, setContentPopupIsVisible] = useState(false);
  const [quotesPopupIsVisible, setQuotesPopupIsVisible] = useState(false);
  const [editPopupIsVisible, setEditPopupIsVisible] = useState(false);
  const [markPopupIsVisible, setMarkPopupIsVisible] = useState(false);
  const [mobileControlsIsVisible, setMobileControlsIsVisible] = useState(false);

  const showContentPopup = () => {
    setContentPopupIsVisible(true);
  };

  const showQuotesPopup = () => {
    if (!isAuth) {
      dispatch(setAuthPopupVisibility(true));
    } else {
      setQuotesPopupIsVisible(true);
    }
  };

  const toggleEditPopup = (ev) => {
    ev.stopPropagation();
    // if(!isAuth) {
    //   dispatch(setAuthPopupVisibility(true))
    // } else {
    setEditPopupIsVisible(!editPopupIsVisible);
    // }
  };

  const toggleMobileControls = () => {
    if (innerWidthWindow <= 768) {
      // setMobileControlsIsVisible((prev) => !prev);
    } else {
      setEditPopupIsVisible(false);
    }
  };

  const addMarkHandler = (ev) => {
    ev && ev.stopPropagation();
    if (!isAuth) {
      dispatch(setAuthPopupVisibility(true));
    } else {
      const id = bookMarks.find((i) => i?.book_id === book?.id && i?.page_id === book?.page?.id)?.id;

      if (id) {
        dispatch(deleteBookMark(id));
      } else {
        dispatch(
          addBookMark({
            book_id: book?.id,
            page_id: book?.page?.id,
          }),
        );
      }
    }
  };

  const addMarkToggler = () => {
    // if (innerWidthWindow <= 768) {
    //   setMarkPopupIsVisible(true);
    // } else {
    addMarkHandler();
    // }
  };

  const showMarkPopup = () => {
    setMarkPopupIsVisible(true);
  };

  useEffect(() => {
    const closeHandler = (ev) => {
      if (ev.key === 'Escape') {
        setEditPopupIsVisible(false);
      }
    };

    document.body.addEventListener('keydown', closeHandler);

    return () => {
      document.body.removeEventListener('keydown', closeHandler);
    };
  }, []);

  return (
    <div className={classNames(styles.pageWrapper, styles[`brightness${settings?.screenBrightness}`])} onClick={toggleMobileControls}>
      <div className={classNames('container', styles.pageContainer)}>
        {/*{(innerWidthWindow > 768 || mobileControlsIsVisible) && (*/}
        {/*  <>*/}
        {/*    <BackBtn onClick={() => router.back()} externalClass={styles.mobileBack} />*/}
        {/*    <Header showContentPopup={showContentPopup} showQuotesPopup={showQuotesPopup} toggleEditPopup={toggleEditPopup} addMarkToggler={addMarkToggler} />*/}
        {/*  </>*/}
        {/*)}*/}
        <Header
          showContentPopup={showContentPopup}
          showQuotesPopup={showQuotesPopup}
          toggleEditPopup={toggleEditPopup}
          addMarkToggler={addMarkToggler}
          showMarksPopup={showMarkPopup}
        />

        <TextWithQuotes />

        <MyPagination externalClass={styles.pagination} lastPage={book?.pages_count} />

        {(innerWidthWindow > 768 || mobileControlsIsVisible) && <PageProgress />}

        {/*<div className={styles.mobileFooter}>*/}
        {/*  <div className={styles.mobileFooterMark} onClick={addMarkHandler}>*/}
        {/*    <BookMark />*/}
        {/*  </div>*/}
        {/*  <span>*/}
        {/*    {router.query?.page} из {book?.pages_count}*/}
        {/*  </span>*/}
        {/*</div>*/}

        {/* Попап с главами */}
        {innerWidthWindow > 768
          ? contentPopupIsVisible && (
              <ModalWindow externalClass={styles.popup} onClose={() => setContentPopupIsVisible(false)}>
                <ContentPopup onClose={() => setContentPopupIsVisible(false)} />
              </ModalWindow>
            )
          : contentPopupIsVisible && (
              <DrawerPopup externalClass={styles.drawer} onClose={() => setContentPopupIsVisible(false)}>
                <ContentPopup onClose={() => setContentPopupIsVisible(false)} />
              </DrawerPopup>
            )}

        {/* Попап с цитатами */}
        {innerWidthWindow > 768
          ? quotesPopupIsVisible && (
              <ModalWindow externalClass={styles.popup} onClose={() => setQuotesPopupIsVisible(false)}>
                <QuotesPopup onClose={() => setQuotesPopupIsVisible(false)} />
              </ModalWindow>
            )
          : quotesPopupIsVisible && (
              <DrawerPopup externalClass={styles.drawer} onClose={() => setQuotesPopupIsVisible(false)}>
                <QuotesPopup onClose={() => setQuotesPopupIsVisible(false)} />
              </DrawerPopup>
            )}

        {/* Дропдаун с редактированием */}
        {editPopupIsVisible && (
          <div className={classNames('container', styles.editPopupContainer)}>
            <DrawerPopup externalClass={styles.editPopup} onClose={() => setEditPopupIsVisible(false)}>
              <EditPopup />
            </DrawerPopup>
          </div>
        )}

        {/* Попап с закладками */}
        {innerWidthWindow <= 768 && markPopupIsVisible && (
          <DrawerPopup externalClass={styles.drawer} onClose={() => setMarkPopupIsVisible(false)}>
            <MarksPopup />
          </DrawerPopup>
        )}
      </div>

      <GroupForms setModal={() => dispatch(setAuthPopupVisibility(false))} modal={authPopupIsVisible} />
    </div>
  );
};

export default ReaderBook;
