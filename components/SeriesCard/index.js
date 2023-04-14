import Link from 'next/link';

import React from 'react';

import s from './styles.module.scss';

const SeriesCard = ({ data }) => {
  return (
    <div className={s.wrapper}>
      <Link href={`/series/${data?.type}/${data?.slug}`}>
        <a className={s.images}>
          <img src={data?.books[0]?.cover_url || '/preview.jpg'} alt="Picture" width={146} height={221} className={s.img} />
          <img src={data?.books[1]?.cover_url || '/preview.jpg'} alt="Picture" width={146} height={221} className={s.img} />
          <img src={data?.books[2]?.cover_url || '/preview.jpg'} alt="Picture" width={146} height={221} className={s.img} />
        </a>
      </Link>

      <Link href={`/series/${data?.type}/${data?.slug}`}>
        <a className={s.title}>{data?.series || data?.name}</a>
      </Link>

      <span className={s.count}>{data?.books_count} книг</span>
    </div>
  );
};

export default SeriesCard;
