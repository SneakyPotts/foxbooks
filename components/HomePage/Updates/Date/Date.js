import Link from 'next/link';

import { useState } from 'react';

import DropDownArrow from '../../../../public/chevron-down.svg';
import classnames from 'classnames';

import css from './date.module.scss';

const Date = ({ date, books, show }) => {
  const [menu, setMenu] = useState(show);
  const toggle = (e) => {
    e.stopPropagation();
    setMenu(!menu);
  };

  return (
    <>
      <div className={css.releaseDates}>
        <button
          className={classnames(css.btn, { [css.activeBtn]: menu })}
          onClick={toggle}
        >
          {date}
          <span className={classnames(css.dropDownIcon, { [css.active]: menu })}>
            <DropDownArrow />
          </span>
        </button>
        <ul className={classnames(css.dates, { [css.showMenu]: menu })}>
          {books?.map((i) => (
            <li
              key={i?.id}
              className={css.date}
            >
              <Link href={`/books/${i?.genres?.[0]?.slug}/${i?.slug}`}>
                <a className={css.title}>{i?.title}</a>
              </Link>
              <span className={css.dot} />
              <Link href={`/author/${i?.authors[0]?.slug}`}>
                <a className={css.author}>{i?.authors[0]?.author}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Date;
