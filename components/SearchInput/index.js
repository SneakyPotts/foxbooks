import React, {useEffect, useRef} from 'react';
import classNames from "classnames";
import {FiSearch} from "react-icons/fi";
import Close from "../shared/icons/close";
import styles from './styles.module.scss'
import debounce from 'lodash.debounce';

const SearchInput = ({
  withModal,
  showMenuFlag,
  onClick,
  onChange,
  onClose,
  placeholder,
  externalClass
}) => {
  const input = useRef()

  const wrapperClick = () => {
    onClick && onClick()
    input.current.focus()
  }

  const handleClose = ev => {
    ev.stopPropagation()
    onClose && onClose()
    input.current.value = ''
  }

  const handleSearch = debounce(value => onChange(value), 300)

  useEffect(() => {
    const keyClose = ev => {
      if(ev.code === 'Escape' && showMenuFlag === true) {
        onClose && onClose()
        input.current.value = ''
      }
    }
    document.body.addEventListener('keydown', keyClose)

    return () => {
      document.body.removeEventListener('keydown', keyClose)
    }
  }, [])

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
        onChange={ev => handleSearch(ev.target.value)}
      />

      <span
        className={classNames(styles.iconSearch, {
          [styles.active]: withModal &&  showMenuFlag,
        })}
      >
        <FiSearch/>
      </span>

      {withModal && showMenuFlag && (
        <span
          className={styles.closeIcon}
          onClick={ev => handleClose(ev)}
        >
          <Close/>
        </span>
      )}
    </div>
  );
};

export default SearchInput;
