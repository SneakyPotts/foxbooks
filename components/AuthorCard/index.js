import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Delete from "../../public/delete.svg";

const AuthorCard = ({
  data,
  onDelete,
  withDelete
}) => {
  return (
    <div className={styles.authorItem}>
      <Link href={`/author/${data?.slug}`}>
        <a className={styles.img}>
          <Image
            src={data?.avatar || '/preview.jpg'}
            alt={data?.author}
            width={180}
            height={272}
            placeholder="blur"
            blurDataURL="/blur.webp"
          />
        </a>
      </Link>
      <Link href={`/author/${data?.slug}`}>
        <a className={styles.name}>{data?.author}</a>
      </Link>
      <span className={styles.booksCount}>{data?.books_count} книг</span>

      {withDelete &&
        <span
          className={styles.deleteBtn}
          onClick={onDelete}
        >
          <Delete />
        </span>
      }
    </div>
  );
};

export default AuthorCard;
