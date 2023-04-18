import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowIcon from './../../public/chevron-right.svg';
import { ReactComponent as Settings } from './../../public/settings-new.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';

import BookMark from '../shared/icons/BookMark';
import FullScreen from '../shared/icons/FullScreen';
import Letter from '../shared/icons/Letter';
import Logo from '../shared/icons/Logo';
import ReaderGambgurger from '../shared/icons/ReadderGambgurger';
import Quote from '../shared/icons/quote';

const Header = ({ showContentPopup, showQuotesPopup, toggleEditPopup, addMarkToggler, showMarksPopup }) => {
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state?.common);
  const { book, settings, bookMarks, bookChapters } = useSelector((state) => state?.reader);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const setFullScreen = () => {
    const el = document.documentElement;
    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        /* Safari */
        el.webkitRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const controls = [
    {
      icon: <ReaderGambgurger />,
      tooltip: 'Содержание',
      onClick: showContentPopup,
      visible: true,
    },
    {
      icon: <Quote />,
      tooltip: 'Цитаты',
      onClick: showQuotesPopup,
      visible: true,
    },
    {
      icon: <Letter />,
      tooltip: 'Редактирование',
      onClick: toggleEditPopup,
      visible: true,
    },
    {
      icon: <FullScreen />,
      tooltip: 'На весь экран',
      onClick: setFullScreen,
      visible: true,
    },
    {
      icon: <BookMark />,
      tooltip: 'Добавить закладку',
      onClick: addMarkToggler,
      visible: true,
    },
  ];

  const mobileControls = [
    {
      icon: <BookMark />,
      tooltip: 'Добавить закладку',
      onClick: addMarkToggler,
      visible: true,
    },
    {
      icon: (
        <>
          <BookMark />
          <span className={styles.counter}>{bookMarks.length}</span>
        </>
      ),
      tooltip: 'Список закладок',
      onClick: showMarksPopup,
      visible: !!bookMarks.length,
    },
    {
      icon: <ReaderGambgurger />,
      tooltip: 'Содержание',
      onClick: showContentPopup,
      visible: true,
    },
    {
      icon: <Settings />,
      tooltip: 'Редактирование',
      onClick: toggleEditPopup,
      visible: true,
    },
  ];

  return (
    <div className={styles.header} onClick={(ev) => innerWidthWindow <= 768 && ev.stopPropagation()}>
      <div className={styles.logoWrapper}>
        <Link href={`/books/${book?.genres?.[0]?.slug}/${book?.slug}`}>
          <a className={styles.backBtn}>
            <ArrowIcon />
          </a>
        </Link>
        <Link href="/">
          <a className={+settings?.screenBrightness <= 2 ? styles.logo : null}>
            <Logo />
          </a>
        </Link>
      </div>

      <div className={styles.controls}>
        {(innerWidthWindow > 768 ? controls : mobileControls)?.map((i, index) => (
          <div key={index} className={classNames(styles.controlsBtn, { [styles.mobile]: innerWidthWindow <= 768, [styles.hidden]: !i.visible })} onClick={i?.onClick}>
            {i?.icon}
            <span className={styles.tooltip}>{i?.tooltip}</span>
          </div>
        ))}
      </div>

      {bookMarks?.length > 0 && (
        <div className={styles.marksList}>
          {bookMarks?.map((i) => (
            <Link
              href={{
                query: { ...router.query, page: i?.page?.page_number },
              }}
            >
              <a key={i?.page?.page_number || i?.page[0]?.page_number} className={styles.markItem}>
                <BookMark />
                <span className={classNames(styles.tooltip, styles.markTooltip)}>
                  <span>
                    Закладка (глава {bookChapters?.findIndex((j) => j?.id === i?.chapter?.id) + 1} из {bookChapters?.length}):
                  </span>
                  {i?.chapter?.title}
                </span>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
