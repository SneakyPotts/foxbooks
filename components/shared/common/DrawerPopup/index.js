import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from './styles.module.scss';

const DrawerPopup = ({
  direction = 'down',
  children,
  onClose,
  externalClass
}) => {
  const ref = useRef()

  const [yPos, setYPos ] = useState(0)
  const [drawerHeight, setDrawerHeight] = useState('auto')
  const [isFocus, setIsFocus] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const moveHandler = ev => {
    if(isFocus && yPos < ev.clientY - 20) {
      setDrawerHeight(`calc(100vh - ${ev.clientY}px)`)
    }
  }

  const mouseUpHandler = ev => {
    if(isFocus && yPos < ev.clientY - 20) {
      setIsFocus(false)
      setIsClosed(true)
      setTimeout(() => onClose(), 300)      
    }
  }

  useEffect(() => {
    setYPos(ref.current.offsetTop)
    setDrawerHeight(ref.current.offsetHeight)
  }, [])

  return (
    <div
      className={classNames(
        styles.wrapper, 
        {[styles.hide]: isClosed}
      )}
      onClick={ev => ev.stopPropagation()}
      onMouseMove={moveHandler}
      onMouseUp={mouseUpHandler}
      onTouchMove={moveHandler}
      onTouchEnd={mouseUpHandler}
    >
      <div
        ref={ref}
        className={classNames(
          "dropdown",
          {["dropdown--up"]: direction === 'up'},
          styles.drawer,
          externalClass
        )}
        style={{height: drawerHeight}}
      >
        <div
          className={styles.close}
          onMouseDown={() => setIsFocus(true)}  
          onTouchStart={() => setIsFocus(true)}       
        />
        {children}
      </div>
    </div>
  )
}

export default DrawerPopup;