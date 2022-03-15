import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from './styles.module.scss'
import Dots from "../shared/icons/horizontalDots";
import DrawerPopup from "../shared/common/DrawerPopup";

const DotsDropdown = ({
  children,
  direction,
  externalClass,
  externalDrawerClass,
  isSmall
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', closeMenu)

    return () => {
      document.body.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <div
      className={classNames(styles.dropdown, externalClass)}
      onClick={ev => ev.stopPropagation()}
    >
      <span
        className={classNames(styles.dotsButton, {
          [styles.active]: menuIsOpen,
          [styles.small]: isSmall
        })}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <Dots/>
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
