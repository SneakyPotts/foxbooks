import React, { useRef, useState } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

import useOnClickOutside from '../../hooks/useOnClickOutside';

import DrawerPopup from '../shared/common/DrawerPopup';
import Dots from '../shared/icons/horizontalDots';

const DotsDropdown = ({ children, direction, externalClass, externalDrawerClass, isSmall }) => {
  const modalRef = useRef(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  useOnClickOutside(modalRef, closeMenu);

  return (
    <div
      ref={modalRef}
      className={classNames(styles.dropdown, externalClass)}
      onClick={(ev) => ev.stopPropagation()}
    >
      <span
        className={classNames(styles.dotsButton, {
          [styles.active]: menuIsOpen,
          [styles.small]: isSmall,
        })}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <Dots />
      </span>

      {menuIsOpen && (
        <DrawerPopup
          externalClass={externalDrawerClass}
          onClose={closeMenu}
          direction={direction}
        >
          {children}
        </DrawerPopup>
      )}
    </div>
  );
};

export default DotsDropdown;
