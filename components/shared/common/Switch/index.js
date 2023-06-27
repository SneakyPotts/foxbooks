import React from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

const Switch = ({ value, setValue, externalClass }) => {
  return (
    <label className={classNames(styles.wrapper, { [styles.active]: value }, externalClass)}>
      <input
        type="checkbox"
        className="visually-hidden"
        checked={value}
        onChange={() => setValue(!value)}
      />
      <span />
    </label>
  );
};

export default Switch;
