import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import DrawerPopup from "../shared/common/DrawerPopup";
import Header from './Header'
import TextWithQoutes from './TextWithQoutes'
import ContentPopup from "./ContentPopup";
import QuotesPopup from "./QuotesPopup";
import EditPopup from "./EditPopup";
import MyPagination from "../shared/common/MyPagination";
import BookMark from "../shared/icons/BookMark";

import classNames from 'classnames'
import styles from './styles.module.scss'
import BackBtn from '../shared/common/BackBtn';
import { useRouter } from 'next/router';
import InputRange from '../shared/common/InputRange/InputRange';
import {addBookMark, deleteBookMark} from "../../store/readerSlice";
import MarksPopup from "./MarksPopup";

const ReaderBook = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { innerWidthWindow } = useSelector(state => state.common)
  const { book, settings, bookMarks } = useSelector(state => state.reader)

  const [contentPopupIsVisible, setContentPopupIsVisible] = useState(false)
  const [quotesPopupIsVisible, setQuotesPopupIsVisible] = useState(false)
  const [editPopupIsVisible, setEditPopupIsVisible] = useState(false)
  const [markPopupIsVisible, setMarkPopupIsVisible] = useState(false)
  const [mobileControlsIsVisible, setMobileControlsIsVisible] = useState(false)

  const showContentPopup = () => {
    setContentPopupIsVisible(true)
  }

  const showQuotesPopup = () => {
    setQuotesPopupIsVisible(true)
  }

  const toggleEditPopup = ev => {
    ev.stopPropagation()
    setEditPopupIsVisible(!editPopupIsVisible)
  }

  const toggleMobileControls = () => {
    if (innerWidthWindow <= 768) {
      setMobileControlsIsVisible(prev => !prev)
    } else {
      setEditPopupIsVisible(false)
    }
  }

  const addMarkHandler = ev => {
    ev && ev.stopPropagation()
    const id = bookMarks.find(i => i?.book_id === book?.id && i?.page_id === book?.pages[0]?.id)?.id

    if(id) {
      dispatch(deleteBookMark(id))
    } else {
      dispatch(addBookMark({
        book_id: book?.id,
        page_id: book?.pages[0]?.id
      }))
    }
  }

  const addMarkToggler = () => {
    if (innerWidthWindow <= 768) {
      setMarkPopupIsVisible(true)
    } else {
      addMarkHandler()
    }
  }

  const handleMarkClick = page => {
    router.push({ query: { ...router.query, page } })
  }

  return (
    <div
      className={classNames(
        styles.pageWrapper,
        styles[`brightness${settings?.screenBrightness}`]
      )}
      onClick={toggleMobileControls}
    >
      <div className={classNames('container', styles.pageContainer)}>
        {(innerWidthWindow > 768 || mobileControlsIsVisible) &&
        <>
          <BackBtn
            onClick={() => router.back()}
            externalClass={styles.mobileBack}
          />
          <Header
            showContentPopup={showContentPopup}
            showQuotesPopup={showQuotesPopup}
            toggleEditPopup={toggleEditPopup}
            addMarkToggler={addMarkToggler}
            handleMarkClick={handleMarkClick}
          />
        </>
        }

        <TextWithQoutes />

        <MyPagination
          externalClass={styles.pagination}
          lastPage={book?.pages_count}
        />

        {(innerWidthWindow > 768 || mobileControlsIsVisible) &&
        <div className={styles.progress}>
          <div className={styles.progressWrapper}>
            <span>Глава 1. Мальчик, который выжил</span>
            <span>1%</span>
          </div>
          <InputRange
            value={20}
            barColor={'var(--controls-color)'}
            externalClass={styles.progressInput}
          />
        </div>
        }

        <div className={styles.mobileFooter}>
          <div
            className={styles.mobileFooterMark}
            onClick={addMarkHandler}
          >
            <BookMark />
          </div>
          <span>{router.query?.page} из {book?.pages_count}</span>
        </div>

        {/* Попап с главами */}
        {innerWidthWindow > 768 ?
          contentPopupIsVisible &&
          <ModalWindow
            externalClass={styles.popup}
            onClose={() => setContentPopupIsVisible(false)}
          >
            <ContentPopup />
          </ModalWindow> :
          contentPopupIsVisible &&
          <DrawerPopup
            externalClass={styles.drawer}
            onClose={() => setContentPopupIsVisible(false)}
          >
            <ContentPopup />
          </DrawerPopup>
        }

        {/* Попап с цитатами */}
        {innerWidthWindow > 768 ?
          quotesPopupIsVisible &&
          <ModalWindow
            externalClass={styles.popup}
            onClose={() => setQuotesPopupIsVisible(false)}
          >
            <QuotesPopup />
          </ModalWindow> :
          quotesPopupIsVisible &&
          <DrawerPopup
            externalClass={styles.drawer}
            onClose={() => setQuotesPopupIsVisible(false)}
          >
            <QuotesPopup />
          </DrawerPopup>
        }

        {/* Дропдаун с редактированием */}
        {editPopupIsVisible &&
        <DrawerPopup
          externalClass={styles.editPopup}
          onClose={() => setEditPopupIsVisible(false)}
        >
          <EditPopup />
        </DrawerPopup>
        }

        {/* Попап с закладками */}
        {innerWidthWindow <= 768 && markPopupIsVisible &&
        <DrawerPopup
          externalClass={styles.drawer}
          onClose={() => setMarkPopupIsVisible(false)}
        >
          <MarksPopup
            handleMarkClick={handleMarkClick}
          />
        </DrawerPopup>
        }
      </div>
    </div>
  )
}

export default ReaderBook;