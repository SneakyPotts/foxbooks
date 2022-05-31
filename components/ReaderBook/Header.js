import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import ArrowIcon from './../../public/chevron-right.svg';
import Logo from "../shared/icons/Logo";
import ReaderGambgurger from "../shared/icons/ReadderGambgurger";
import Quote from "../shared/icons/quote";
import FullScreen from "../shared/icons/FullScreen";
import Letter from "../shared/icons/Letter";
import BookMark from "../shared/icons/BookMark";

import classNames from "classnames";
import styles from './styles.module.scss'

const Header = ({
  showContentPopup,
  showQuotesPopup,
  toggleEditPopup,
  addMarkToggler,
  handleMarkClick
}) => {
  const router = useRouter()

  const { innerWidthWindow } = useSelector(state => state?.common)
  const { settings, bookMarks, bookChapters } = useSelector(state => state?.reader)

  const [isFullScreen, setIsFullScreen] = useState(false)

  const setFullScreen = () => {
    const el = document.documentElement
    if(isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false)
    } else {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) { /* Safari */
        el.webkitRequestFullscreen();
      }
      setIsFullScreen(true)
    }
  }

  const controls = [
    {
      icon: <ReaderGambgurger />,
      tooltip: 'Содержание',
      onClick: showContentPopup
    },
    {
      icon: <Quote />,
      tooltip: 'Цитаты',
      onClick: showQuotesPopup
    },
    {
      icon: <Letter />,
      tooltip: 'Редактирование',
      onClick: toggleEditPopup
    },
    {
      icon: <FullScreen />,
      tooltip: 'На весь экран',
      onClick: setFullScreen
    },
    {
      icon: <BookMark />,
      tooltip: 'Добавить закладку',
      onClick: addMarkToggler
    }
  ]

  return (
    <div
      className={styles.header}
      onClick={ev => innerWidthWindow <= 768 && ev.stopPropagation()}
    >
      <div className={styles.logoWrapper}>
        <span
          className={styles.backBtn}
          onClick={() => router.back()}
        >
          <ArrowIcon />
        </span>
        <Link href="/">
          <a className={+settings?.screenBrightness <= 2 ? styles.logo : null}>
            <Logo />
          </a>
        </Link>
      </div>

      <div className={styles.controls}>
        {controls?.map((i, index) => (
          <div
            key={index}
            className={styles.controlsBtn}
            onClick={i?.onClick}
          >
            {i?.icon}
            <span className={styles.tooltip}>{i?.tooltip}</span>
          </div>
        ))}
      </div>

      {bookMarks?.length > 0 &&
        <div className={styles.marksList}>
          {bookMarks?.map(i => (
            <div
              key={i?.page?.page_number || i?.page[0]?.page_number}
              className={styles.markItem}
              onClick={() => handleMarkClick(i?.page?.page_number || i?.page[0]?.page_number)}
            >
              <BookMark />
              <span className={classNames(styles.tooltip, styles.markTooltip)}>
                <span>Закладка (глава {bookChapters?.findIndex(j => j?.id === i?.chapter?.id) + 1} из {bookChapters?.length}):</span>
                {i?.chapter?.title}
              </span>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Header;
