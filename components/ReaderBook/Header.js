import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ArrowIcon from './../../public/chevron-right.svg';
import Logo from "../shared/icons/Logo";
import ReaderGambgurger from "../shared/icons/ReadderGambgurger";
import Quote from "../shared/icons/quote";
import FullScreen from "../shared/icons/FullScreen";
import Letter from "../shared/icons/Letter";
import BookMark from "../shared/icons/BookMark";

import styles from './styles.module.scss'

const Header = () => {
  const router = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <span
          className={styles.backBtn}
          onClick={() => router.back()}
        >
          <ArrowIcon />
        </span>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <div className={styles.controls}>
        <div>
          <ReaderGambgurger />
        </div>
        <div>
          <Quote />
        </div>
        <div>
          <Letter />
        </div>
        <div>
          <FullScreen />
        </div>
        <div>
          <BookMark />
        </div>
      </div>
    </header>
  );
};

export default Header;
