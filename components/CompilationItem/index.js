import React from 'react';
import styles from "./styles.module.scss";
import Eye from "../shared/icons/eye";
import Image from 'next/image'
import Link from 'next/link'

const CompilationItem = ({ isFull }) => {
  return (
    <div>
      <Link href={'/'}>
        <a className={styles.selectionLink}>
          <Image
            src="/horizontalBookCovers/bookCover1.png"
            alt=""
            width={384}
            height={183}
            layout={'responsive'}
            className={styles.selectionImg}
          />
          <span className={styles.selectionCount}>65 книг</span>
        </a>
      </Link>

      {isFull &&
        <div className={styles.selectionDate}>
          <span>20 октября 2021</span>
          <div className={styles.selectionDateViews}>
            <span>456</span>
            <Eye/>
          </div>
        </div>
      }

      <Link href={'/'}>
        <a className={styles.selectionTitle}>Романтическое фэнтези</a>
      </Link>

      {isFull &&
        <p className={styles.selectionText}>
          А также действия представителей оппозиции представлены в
          исключительно положительном свете. Прежде всего, курс на
          социально-ориентированный национальный проект
          способствует повышению. А также действия представителей
          оппозиции представлены в исключительно
        </p>
      }
    </div>
  );
};

export default CompilationItem;
