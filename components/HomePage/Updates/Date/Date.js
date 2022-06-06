import { useState } from 'react';
import classnames from 'classnames';
import DropDownArrow from '../../../../public/chevron-down.svg';
import css from './date.module.scss';

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
          {books.map(({ author, book }) => (
            <li key={author} className={css.date}>
              <spann>{book}</spann>
              <spann className={css.dot}></spann>
              <spann className={css.author}>{author}</spann>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Date;
