import { useRouter } from 'next/router';

import React, { useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';
import debounce from 'lodash.debounce';

import styles from './styles.module.scss';

import { clearSearch } from '../../store/searchSlice';

import Close from '../shared/icons/close';

const SearchInput = ({ withModal, showMenuFlag, onClick, onChange, onClose, placeholder, externalClass }) => {
  const router = useRouter();
  const input = useRef();
  const dispatch = useDispatch();

  const wrapperClick = () => {
    onClick && onClick();
    input.current.focus();
  };

  const handleClose = (ev) => {
    ev.stopPropagation();
    onClose && onClose();
    input.current.value = '';
    dispatch(clearSearch());
  };

  const handleSearch = debounce((value) => onChange(value), 300);

  useEffect(() => {
    if (!!router.query.books_type || router.pathname.includes('author')) input.current.value = '';
  }, [router.query]);

  return (
    <div
      className={classNames(styles.input, externalClass)}
      onClick={wrapperClick}
    >
      <input
        ref={input}
        type="text"
        placeholder={placeholder}
        className={classNames(styles.inputCastom, {
          [styles.inputCastomOpened]: withModal && showMenuFlag,
        })}
        onChange={(ev) => handleSearch(ev.target.value)}
      />

      <span
        className={classNames(styles.iconSearch, {
          [styles.active]: withModal && showMenuFlag,
        })}
      >
        <FiSearch />
      </span>

      {withModal && showMenuFlag && (
        <span
          className={styles.closeIcon}
          onClick={(ev) => handleClose(ev)}
        >
          <Close />
        </span>
      )}
    </div>
  );
};

export default SearchInput;
