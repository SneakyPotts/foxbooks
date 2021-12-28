import React from 'react';
import styles from "./index.module.scss";
import Button from "../../shared/common/Button/Button";
import classnames from "classnames";

const ButtonGroup = ({ClassName, text = 'Сохранить изменения', cancelClick}) => {
    return (
        <div className={classnames(styles.saveSettings, ClassName)}>
            <span onClick={()=>cancelClick()}>
                Отменить
            </span>
            <Button
                classNames={styles.saveButton}
                text={text}
                typeButton='submit'
            />
        </div>
    );
};

export default ButtonGroup;