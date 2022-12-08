import React from 'react';
import styles from "./styles.module.scss";
import Eye from "../shared/icons/eye";
import Image from 'next/image'
import Link from 'next/link'
import moment from "moment";
import 'moment/locale/ru'
import {getNoun} from "../../utils";

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
              src={data?.background || '/preview.jpg'}
              alt="Picture"
              width={isMini ? 180 : 384}
              height={isMini ? 108 : 183}
              layout={'responsive'}
              className={styles.selectionImg}
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
            <span className={styles.selectionCount}>
              {data?.total_books_count || data?.books_count || '0'}{' '}
              {getNoun(data?.total_books_count || data?.books_count || 0, 'книга', 'книги', 'книг')}
            </span>
          </a>
        </Link> :
        <div className={styles.selectionLink}>
          <Image
            src={data?.background || '/preview.jpg'}
            alt="Picture"
            width={isMini ? 180 : 384}
            height={isMini ? 108 : 183}
            layout={'responsive'}
            className={styles.selectionImg}
            placeholder="blur"
            blurDataURL="/blur.webp"
          />
          <span className={styles.selectionCount}>
            {data?.total_books_count}{' '}
            {getNoun(data?.total_books_count, 'книга', 'книги', 'книг')}
          </span>
        </div>
      }

      {isFull &&
        <div className={styles.selectionDate}>
          <span>{moment(data?.created_at).format('D MMMM YYYY в LT')}</span>
          <div className={styles.selectionDateViews}>
            <span>{data?.views_count}</span>
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
        <p className={styles.selectionText}>{data?.description}</p>
      }
    </div>
  );
};

export default CompilationItem;
