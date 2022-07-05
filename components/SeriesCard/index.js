import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link'

const SeriesCard = ({data}) => {
  return (
    <div className={s.wrapper}>
      <Link href={`/series?id=${data?.id}`}>
        <a className={s.images}>
          <img
            src={data?.books[0]?.image?.link || '/preview.jpg'}
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
          <img
            src={data?.books[1]?.image?.link || '/preview.jpg'}
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
          <img
            src={data?.books[2]?.image?.link || '/preview.jpg'}
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
        </a>
      </Link>

      <Link href={`/series?id=${data?.id}`}>
        <a className={s.title}>{data?.series}</a>
      </Link>

      <span className={s.count}>{data?.books_count} книг</span>
    </div>
  );
};

export default SeriesCard;