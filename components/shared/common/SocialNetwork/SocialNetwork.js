import React from 'react';
import Yandex from "../../icons/yandex";
import Google from "../../icons/google";
import VK from "../../icons/VK";
import OK from "../../icons/OK";
import styles from './index.module.scss'

const SocialNetwork = () => {
    return (
        <div className={styles.Social}>
            <h4>Войти через аккаунт социальной сети</h4>
            <div className={styles.SocialButtons}>
                <button type='button'><Yandex/></button>
                <button type='button'><Google/></button>
                <button type='button'><VK/></button>
                <button type='button'><OK/></button>
            </div>
        </div>
    );
};

export default SocialNetwork;