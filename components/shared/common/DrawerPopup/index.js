import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import {useSelector} from "react-redux";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

const DrawerPopup = ({
  direction = 'down',
  children,
  onClose,
  externalClass,
}) => {
  const ref = useRef();

  const { innerWidthWindow } = useSelector(state => state.common)

  const [yPos, setYPos] = useState(0);
  const [drawerHeight, setDrawerHeight] = useState('auto');
  const [isFocus, setIsFocus] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const moveHandler = ev => {
    const y = ev?.clientY || ev?.changedTouches[0]?.clientY

    if (isFocus && yPos < y - 20) {
      setDrawerHeight(`calc(100vh - ${y}px)`)
    }
  };

  const closeDropdown = () => {
    setIsClosed(true)
    setTimeout(() => onClose(), 250)
  }

  const upHandler = ev => {
    const y = ev?.clientY || ev?.changedTouches[0]?.clientY

    if (isFocus && yPos < y - 20) {
      closeDropdown()
    }
    setIsFocus(false)
  };

  useEffect(() => {
    setYPos(ref.current.offsetTop);
    setDrawerHeight(ref.current.offsetHeight);

    if(innerWidthWindow <= 768) document.body.style.overflow = 'hidden'

    return () => {
      if(innerWidthWindow <= 768) document.body.style.overflow = 'initial'
    }
  }, []);

  useOnClickOutside(ref, closeDropdown)

  return (
    <div
      className={classNames(styles.wrapper, { [styles.hide]: isClosed })}
      onMouseUp={upHandler}
      onTouchEnd={upHandler}
      onMouseMove={moveHandler}
      onTouchMove={moveHandler}
    >
      <div
        ref={ref}
        className={classNames(
          'dropdown',
          { ['dropdown--up']: direction === 'up' },
          styles.drawer,
          externalClass
        )}
        style={{
          height: drawerHeight,
          // animation: `${direction === 'up' ? 'dropUp' : 'dropDown'} .2s`,
        }}
        onClick={ev => ev.stopPropagation()}
      >
        <div
          className={styles.close}
          onMouseDown={() => setIsFocus(true)}
          onTouchStart={() => setIsFocus(true)}
        />
        {children}
      </div>
    </div>
  );
};

export default DrawerPopup;
