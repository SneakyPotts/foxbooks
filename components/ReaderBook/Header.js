import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowIcon from './../../public/chevron-right.svg';
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
            logo
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
