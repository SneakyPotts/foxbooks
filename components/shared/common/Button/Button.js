import React from 'react';

import styles from './index.module.scss';
import classnames from 'classnames';

const Button = ({ typeButton, text, classNames, click }) => {
  return (
    <>
      <button onClick={click} className={classnames(styles.button, classNames)} type={typeButton}>
        {text}
      </button>
    </>
  );
};

export default Button;
