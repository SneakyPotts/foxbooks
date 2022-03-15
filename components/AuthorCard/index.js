import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const AuthorCard = ({
  data
}) => {
  return (
    <div>
      <Link href={''}>
        <a className={styles.img}>
          <Image
            src={'/reviewsBookCovers/author.png'}
            alt={data?.name}
            width={180}
            height={272}
            placeholder="blur"
            blurDataURL="/blur.webp"
          />
        </a>
      </Link>
      <Link href={''}>
        <a className={styles.name}>{data?.name}</a>
      </Link>
      <span className={styles.booksCount}>{data?.books} книг</span>
    </div>
  );
};

export default AuthorCard;
