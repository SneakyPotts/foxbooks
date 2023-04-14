import React from 'react';

import Arrow from '../../../../public/chevron-right.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';

const BackText = ({ onClick, externalClass }) => {
  return (
    <div className={classNames(styles.wrapper, externalClass)} onClick={onClick}>
      <span className={styles.icon}>
        <Arrow />
      </span>
      Вернуться назад
    </div>
  );
};

export default BackText;
