import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import Categories from '../HomePage/Categories';
import Book from '../shared/common/book';
import DropDownArrow from '../../public/chevron-down.svg';

import st from './author.module.scss';

const AuthorPage = () => {
  const bookSeries = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
  const outOfSeries = [{ id: '0' }, { id: '1' }, { id: '2' }];
  const [showMore, setShowMore] = useState(false);

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="container">
      <div className={st.wrapper}>
        <div className={st.filters}>
          <div className={st.authorImg}>
            <Image
              src="/reviewsBookCovers/author.png"
              width={180}
              height={275}
              alt=""
            />
          </div>
          <Categories />
        </div>
        <div className={st.mainBlok}>
          <div className={st.authorInfo}>
            <h1 className={st.authorInfoName}>Джоан Кэтлин Роулинг</h1>
            <p className={st.authorInfoCount}>
              <span>11</span>книг
            </p>
            <button className={st.authorInfoBtn}>Добавить в избранное</button>
            <p
              className={classnames(st.authorBiography, {
                [st.authorBiographyHide]: !showMore,
              })}
            >
              Джоан Роулинг — английская писательница, считается одним из самых
              успешных и высокооплачиваемых англоязычных авторов современности.
              Успех ей принесли книги в жанре фэнтези о Гарри Поттере и
              последующие экранизации этой серии. Джоан Роулинг работала
              секретарем, а затем учительницей английского языка. Идея романа о
              мальчике-волшебнике пришла ей совершенно случайно. Законченная
              рукопись была отправлена в 12 издательств и всеми отвергнута.
              Только через год книгу напечатали.Джоан Роулинг — английская
              писательница, считается одним из самых успешных и
              высокооплачиваемых англоязычных авторов современности. Успех ей
              принесли книги в жанре фэнтези о Гарри Поттере и последующие
              экранизации этой серии.
            </p>
            <span className={classnames(st.showMoreLink)} onClick={onShowMore}>
              Показать полностью{' '}
              <DropDownArrow
                className={classnames(st.dropDownArrow, {
                  [st.up]: showMore,
                })}
              />
            </span>
          </div>
          <div className={st.series}>
            <h2 className={st.seriesTitle}>Серия книг: Гарри Поттер</h2>
            <ul className={st.seriesList}>
              {bookSeries.map(book => (
                <li key={book.id} className={st.seriesListBook}>
                  <Book classNames={st.seriesListBookItem} similar={true} />
                </li>
              ))}
            </ul>
          </div>
          <div className={st.outOfSeries}>
            <h2 className={st.outOfSeriesTitle}>Книги вне серий</h2>
            <ul className={st.seriesList}>
              {outOfSeries.map(book => (
                <li key={book.id} className={st.seriesListBook}>
                  <Book classNames={st.seriesListBookItem} similar={true} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
