import React from 'react';
import classnames from "classnames";
import styles from './index.module.scss'

const Button = ({typeButton, text, classNames, click}) => {
    return (
        <>
            <button onClick={click} className={classnames(styles.button, classNames)}
                    type={typeButton}>
                {text}
            </button>
        </>
    );
};

export default Button;