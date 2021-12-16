import React from 'react';
import styles from "./index.module.scss";
import Button from "../../shared/common/Button/Button";

const ButtonGroup = () => {
    return (
        <div className={styles.saveSettings}>
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