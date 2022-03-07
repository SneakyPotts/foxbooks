import React, {useRef, useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss'
import classNames from "classnames";
import {useRouter} from "next/router";
import debounce from 'lodash.debounce';

const ClickableSearch = ({ queryName }) => {
  const router = useRouter()
  const input = useRef()
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true)
    input.current.focus()
  }

  const setQuery = value => {
    router.push(
      { query: { ...router.query, [queryName]: encodeURI(value) } },
      null,
      { scroll: false }
    );
  };

  const handleChange = debounce(setQuery, 300);

  return (
    <div className={classNames(styles.wrapper, {[styles.active]: isActive})}>
      <span
        className={styles.icon}
        onClick={handleClick}
      >
        <FiSearch />
      </span>
      <input
        ref={input}
        type="text"
        placeholder={'Искать книгу'}
        className={classNames(styles.input, {[styles.active]: isActive})}
        onChange={ev => handleChange(ev.target.value)}
      />
    </div>
  );
};

export default ClickableSearch;
