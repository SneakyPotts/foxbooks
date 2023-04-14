import React from 'react';

import styles from './index.module.scss';

const Checkbox = ({ register, name, text }) => {
  return (
    <label>
      <input {...register(name)} className={styles.checkboxInput} type="checkbox" />
      <span />
    </label>
  );
};

export default Checkbox;
