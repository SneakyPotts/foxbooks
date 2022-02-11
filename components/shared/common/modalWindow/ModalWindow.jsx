import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

const ModalWindow = ({
  children,
  modal,
  setModal,
  isFullScreen = false,
  click,
}) => {
  return (
    <div
      className={classnames(styles.wrapper, { [styles.wrapperActive]: modal })}
    >
      <div
        onClick={e => {
          !isFullScreen && e.stopPropagation();
          click && click();
        }}
        className={classnames(styles.wrapperBlock, {
          [styles.wrapperBlockFullScreen]: isFullScreen,
        })}
      >
        {children}
        <div
          onClick={e => {
            e.stopPropagation();
            setModal(!modal);
          }}
          className={classnames(styles.wrapperBlockCross, {
            [styles.wrapperBlockFullScreenCross]: isFullScreen,
          })}
        >
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
