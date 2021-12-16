import React from 'react';
import Yandex from "../../icons/yandex";
import Google from "../../icons/google";
import VK from "../../icons/VK";
import OK from "../../icons/OK";
import styles from './index.module.scss'
import classnames from "classnames";

const SocialNetwork = ({title = true, connect = false, ClassNames}) => {
    return (
        <div className={classnames(styles.Social, ClassNames) }>
            {title && <h4>Войти через аккаунт социальной сети</h4>}
            <div className={styles.SocialButtons}>
                <div>
                    <button type='button'><Yandex/></button>
                    {connect && <p>Подключить</p>}
                </div>
               <div>
                   <button type='button'><Google/></button>
                   {connect && <p>Подключить</p>}
               </div>
                <div>
                    <button type='button'><VK/></button>
                    {connect && <p>Подключить</p>}
                </div>
                <div>
                    <button type='button'><OK/></button>
                    {connect && <p>Подключить</p>}
                </div>
            </div>
        </div>
    );
};

export default SocialNetwork;