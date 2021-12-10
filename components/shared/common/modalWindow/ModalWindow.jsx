import React from 'react';
import styles from './index.module.scss'

const ModalWindow = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperBlock}>

                <div className={styles.wrapperBlockCross}>
                    <span/>
                    <span/>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;