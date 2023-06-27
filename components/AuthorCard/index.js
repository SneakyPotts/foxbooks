import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import Delete from '../../public/delete.svg';

import styles from './styles.module.scss';

const AuthorCard = ({ data, onDelete, withDelete }) => {
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

      {withDelete && (
        <span
          className={styles.deleteBtn}
          onClick={onDelete}
        >
          <Delete />
        </span>
      )}
    </div>
  );
};

export default AuthorCard;
