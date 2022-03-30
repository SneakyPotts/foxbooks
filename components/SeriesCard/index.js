import React from 'react';
import s from './styles.module.scss';
import Link from 'next/link'

const SeriesCard = () => {
  return (
    <div className={s.wrapper}>
      <Link href="/">
        <a className={s.images}>
          <img
            src="reviewsBookCovers/cover2.png"
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
          <img
            src="reviewsBookCovers/cover2.png"
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
          <img
            src="reviewsBookCovers/cover2.png"
            alt="Picture"
            width={146}
            height={221}
            className={s.img}
          />
        </a>
      </Link>

      <Link href={'/'}>
        <a className={s.title}>Гарри Поттер</a>
      </Link>

      <span className={s.count}>7 книг</span>
    </div>
  );
};

export default SeriesCard;