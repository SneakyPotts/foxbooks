import React from 'react';
import styles from "./index.module.scss";
import Button from "../../shared/common/Button/Button";
import classnames from "classnames";

const ButtonGroup = ({ClassName}) => {
    return (
        <div className={classnames(styles.saveSettings, ClassName)}>
            <span>Отменить</span>
            <Button
                classNames={styles.saveButton}
                text='Сохранить изменения'
                typeButton='submit'
            />
        </div>
    );
};

export default ButtonGroup;