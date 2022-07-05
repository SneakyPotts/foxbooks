import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const AuthorCard = ({
  data
}) => {
  return (
    <div>
      <Link href={`/author?id=${data?.id}`}>
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
      <Link href={`/author?id=${data?.id}`}>
        <a className={styles.name}>{data?.author}</a>
      </Link>
      <span className={styles.booksCount}>{data?.books_count} книг</span>
    </div>
  );
};

export default AuthorCard;
