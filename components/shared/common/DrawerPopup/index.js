import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import {useSelector} from "react-redux";

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
    const y = ev?.clientY

    if (isFocus && yPos < y - 20) {
      setDrawerHeight(`calc(100vh - ${y}px)`);
    }
  };

  const upHandler = ev => {
    const y = ev?.clientY

    setIsFocus(false);
    if (isFocus && yPos < y - 20) {
      setIsClosed(true);
      setTimeout(() => onClose(), 300);
    }
  };

  useEffect(() => {
    setYPos(ref.current.offsetTop);
    setDrawerHeight(ref.current.offsetHeight);

    if(innerWidthWindow <= 768) document.body.style.overflow = 'hidden'

    return () => {
      if(innerWidthWindow <= 768) document.body.style.overflow = 'initial'
    }
  }, []);

  return (
    <div
      className={classNames(styles.wrapper, { [styles.hide]: isClosed })}
      // onClick={ev => ev.stopPropagation()}
      onPointerUp={upHandler}
      onPointerMove={moveHandler}
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
          animation: `${direction === 'up' ? 'dropUp' : 'dropDown'} .2s`,
        }}
      >
        <div
          className={styles.close}
          onPointerDown={() => setIsFocus(true)}
        />
        {children}
      </div>
    </div>
  );
};

export default DrawerPopup;
