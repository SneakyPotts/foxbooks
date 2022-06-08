import { useState } from 'react';
import classnames from 'classnames';
import DropDownArrow from '../../../../public/chevron-down.svg';
import css from './date.module.scss';
import Link from 'next/link'

const Date = ({ date, books }) => {
  const [menu, setMenu] = useState(true);

  const toggle = e => {
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
              <Link href={`/book/${i?.id}?type=${i?.type}`}>
                <a className={css.title}>{i?.title}</a>
              </Link>
              <span className={css.dot}/>
              <Link href={`/author?id=${i?.authors[0]?.id}`}>
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
