import React, {useState} from 'react';
import Link from 'next/link';
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
import {useSelector} from "react-redux";

const Header = ({
  showContentPopup,
  showQuotesPopup,
  toggleEditPopup
}) => {
  const router = useRouter()

  const { settings } = useSelector(state => state?.reader)

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [marks, setMarks] = useState([
    {
      title: 'Мальчик, который выжил'
    },
    {
      title: 'Мальчик, который не выжил'
    },
  ])

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

  const addMark = () => {

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
      onClick: addMark
    }
  ]

  return (
    <div className={styles.header}>
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

      {marks?.length ?
        <div className={styles.marksList}>
          {marks?.map((i, index) => (
            <div className={styles.markItem}>
              <BookMark />
              <span className={classNames(styles.tooltip, styles.markTooltip)}>
                <span>Закладка (глава {index + 1} из 17):</span>
                {index + 1}. {i?.title}
              </span>
            </div>
          ))}
        </div> :
        null
      }
    </div>
  );
};

export default Header;
