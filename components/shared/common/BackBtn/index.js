import React from 'react';

import ArrowBack from '../../icons/arrowBack';
import classNames from 'classnames';

import styles from './styles.module.scss';

const BackBtn = ({ onClick, externalClass }) => {
  return (
    <button
      className={classNames(styles.backBtn, externalClass)}
      onClick={onClick}
    >
      <ArrowBack />
    </button>
  );
};

export default BackBtn;
