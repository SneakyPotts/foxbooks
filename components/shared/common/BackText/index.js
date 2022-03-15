import React from 'react';
import styles from './styles.module.scss'
import Arrow from "../../../../public/chevron-right.svg";
import classNames from "classnames";

const BackText = ({ onClick, externalClass }) => {
  return (
    <div
      className={classNames(styles.wrapper, externalClass)}
      onClick={onClick}
    >
      <span className={styles.icon}>
        <Arrow />
      </span>
      Вернуться назад
    </div>
  );
};

export default BackText;
