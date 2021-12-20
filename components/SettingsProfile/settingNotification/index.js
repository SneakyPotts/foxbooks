import React from 'react';
import styles from './index.module.scss'

const SettingNotification = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notification}>
                <div className={styles.setting}>
                    <div className={styles.settingIcon}>
                        R
                    </div>
                    <div className={styles.settingDescription}>
                        <h3>Отметка нравится</h3>
                        <p>Уведомления о реакциях к вашим комментариям.</p>
                    </div>
                </div>
                <div className={styles.checkbox}>
                    <div className={styles.group}>
                        <input id='check' className={styles.customCheck} type="checkbox"/>
                        <label htmlFor="check"></label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingNotification;