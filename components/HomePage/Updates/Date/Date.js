import { useState } from 'react';
import classnames from 'classnames';
import DropDownArrow from '../../../../public/chevron-down.svg';
import css from './date.module.scss';
import Link from 'next/link'
import moment from "moment";

const Date = ({ date, books }) => {
  const [menu, setMenu] = useState(true);

  const toggle = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const formatDate = (date) => {
    const now = moment();
    const formatted = moment(date.split('-').reverse().join('-'));
    const delta = now - formatted;

    /*86400000 - ms in day*/
    if (delta < 86400000) return `Сегодня (${formatted.format('DD MMMM YYYY')})`
    if (delta > 86400000 && delta < (2 * 86400000)) return `Вчера (${formatted.format('DD MMMM YYYY')})`

    return formatted.format('DD MMMM YYYY');
  }

  return (
    <>
      <div className={css.releaseDates}>
        <button
          className={classnames(css.btn, { [css.activeBtn]: menu })}
          onClick={toggle}
        >
          {formatDate(date)}
          <span
            className={classnames(css.dropDownIcon, { [css.active]: menu })}
          >
            <DropDownArrow />
          </span>
        </button>
        <ul className={classnames(css.dates, { [css.showMenu]: menu })}>
          {books?.map(i =>
            <li
                key={i?.id}
                className={css.date}
            >
              <Link href={`/books/${i?.genres?.[0]?.slug}/${i?.slug}`}>
                <a className={css.title}>{i?.title}</a>
              </Link>
              <span className={css.dot}/>
              <Link href={`/author/${i?.authors[0]?.slug}`}>
                <a className={css.author}>{i?.authors[0]?.author}</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Date;
