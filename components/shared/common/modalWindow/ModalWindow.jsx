import React from 'react';
import classnames from "classnames";
import styles from './index.module.scss'

const ModalWindow = ({children, modal, setModal}) => {
    return (
        <div className={classnames(styles.wrapper, {[styles.wrapperActive]: modal})}>
            <div onClick={(e)=> e.stopPropagation()} className={styles.wrapperBlock}>
                {children}
                <div onClick={()=>setModal(!modal)} className={styles.wrapperBlockCross}>
                    <span/>
                    <span/>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;