import React from 'react';
import styles from "./styles.module.scss";
import Eye from "../shared/icons/eye";
import Image from 'next/image'
import Link from 'next/link'

const CompilationItem = ({
  data,
  isFull,
  path,
  isMini
}) => {
  return (
    <div className={styles.mini}>
      {path ?
        <Link href={path}>
          <a className={styles.selectionLink}>
            <Image
              src={"/horizontalBookCovers/bookCover1.png"}
              alt=""
              width={isMini ? 180 : 384}
              height={isMini ? 108 : 183}
              layout={'responsive'}
              className={styles.selectionImg}
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
            <span className={styles.selectionCount}>{data?.books_count} книг</span>
          </a>
        </Link> :
        <div className={styles.selectionLink}>
          <Image
            src={"/horizontalBookCovers/bookCover1.png"}
            alt=""
            width={isMini ? 180 : 384}
            height={isMini ? 108 : 183}
            layout={'responsive'}
            className={styles.selectionImg}
            placeholder="blur"
            blurDataURL="/blur.webp"
          />
          <span className={styles.selectionCount}>{data?.books_count} книг</span>
        </div>
      }

      {isFull &&
        <div className={styles.selectionDate}>
          <span>20 октября 2021</span>
          <div className={styles.selectionDateViews}>
            <span>456</span>
            <Eye/>
          </div>
        </div>
      }

      {path ?
        <Link href={path}>
          <a className={styles.selectionTitle}>{data?.title}</a>
        </Link> :
        <p className={styles.selectionTitle}>{data?.title}</p>
      }

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
