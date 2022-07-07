import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const Popular = ({
  title,
  defaultValue,
  data,
  queryName,
  isAlphabet,
  filterStateIdx,
  elIdx,
  setFilStateIdx,
  isRight,
  onClick,
  externalClassName
}) => {
  const router = useRouter();

  const [menu, setMenu] = useState(false);
  const [activeTitle, setActiveTitle] = useState(
    data?.find(i => i?.value === +router.query[queryName])?.title || title
  );
  const [activeEl, setActiveEl] = useState(
    +router.query[queryName] || defaultValue
  );

  useEffect(() => {
    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  const toggleMenu = e => {
    e.stopPropagation();
    if (setFilStateIdx) {
      setFilStateIdx(prev => {
        if (prev === elIdx) {
          return null;
        } else {
          return elIdx;
        }
      });
    } else {
      setMenu(!menu);
    }
  };

  const handleOnClick = (value, title) => {
    if(onClick) {
      onClick(value)
    } else {
      router.push(
        {
          query: {
            ...router.query,
            [queryName]: typeof value === 'string' ? encodeURI(value) : value,
          },
        },
        null,
        { scroll: false }
      )
    }
    setActiveEl(typeof value === 'object' ? defaultValue : value);
    title && setActiveTitle(title);
    closeMenu();
  };

  const closeMenu = () => {
    setMenu(false);
    setFilStateIdx && setFilStateIdx(null);
  };

  return (
    <div className={classNames(css.dropdown, externalClassName)}>
      <button
        type="button"
        className={`${css.dropBtn} ${
          menu || (
            elIdx !== undefined && 
            filterStateIdx !== undefined && 
            elIdx === filterStateIdx
          ) ? css.open : css.close
        }`}
        onClick={toggleMenu}
      >
        <span className={css.dropBtnText}>{activeTitle}</span>
        <div>
          <ArrowAll
            className={classnames(css.down, {
              [css.up]: menu || (
                elIdx !== undefined &&
                filterStateIdx !== undefined &&
                elIdx === filterStateIdx
              ),
            })}
          />
        </div>
      </button>
      {menu || (
        elIdx !== undefined &&
        filterStateIdx !== undefined &&
        elIdx === filterStateIdx
      ) ? (
        <ul
          className={classNames(css.dropContent, {
            [css.dropWord]: isAlphabet,
            [css.dropRight]: isRight
          })}
          onClick={e => e.stopPropagation()}
        >
          {data?.map(i => (
            <li
              key={i?.id || i}
              onClick={() => handleOnClick(i?.value || i, i?.title)}
              className={classNames(css.dropItem, {[css.withIcon]: i?.icon})}
            >
              {isAlphabet ? (
                <span
                  className={classNames({ [css.activeWord]: i === activeEl })}
                >
                  {i}
                </span>
              ) : (
                <>
                  {i?.icon ?
                    i?.icon :
                    <span
                      className={classnames(css.radio, {
                        [css.radioActive]: activeEl === i?.value,
                      })}
                    />
                  }
                  <span
                    className={classnames(css.dropText, {
                      [css.active]: activeEl === i?.value
                    })}
                  >
                    {i?.title}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Popular;
