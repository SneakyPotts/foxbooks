import React from 'react';

import classnames from 'classnames';

import styles from './index.module.scss';

import Button from '../../shared/common/Button/Button';

const ButtonGroup = ({ ClassName, text = 'Сохранить изменения', typeButton, cancelClick, click }) => {
  return (
    <div className={classnames(styles.saveSettings, ClassName)}>
      <span onClick={() => cancelClick()}>Отменить</span>
      <Button classNames={styles.saveButton} text={text} typeButton={typeButton} click={click} />
    </div>
  );
};

export default ButtonGroup;
