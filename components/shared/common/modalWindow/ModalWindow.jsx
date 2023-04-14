import React, { useEffect } from 'react';

import styles from './index.module.scss';
import classNames from 'classnames';

const ModalWindow = ({ children, onClose, click, isFullScreen = false, externalClass }) => {
  useEffect(() => {
    const closeHandler = (ev) => {
      if (ev.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', closeHandler);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('keydown', closeHandler);
    };
  }, []);

  return (
    <div className={classNames(styles.wrapper)} onClick={() => onClose()}>
      <div
        className={classNames(styles.wrapperBlock, { [styles.wrapperBlockFullScreen]: isFullScreen }, externalClass)}
        onClick={(e) => {
          e.stopPropagation();
          // click && click();
        }}
      >
        <div
          onClick={(ev) => {
            ev.stopPropagation();
            onClose();
          }}
          className={classNames(styles.wrapperBlockCross, {
            [styles.wrapperBlockFullScreenCross]: isFullScreen,
          })}
        >
          <span />
          <span />
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
