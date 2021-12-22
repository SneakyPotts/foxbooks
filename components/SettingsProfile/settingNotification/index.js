import React, {useState} from 'react';
import styles from './index.module.scss'

const SettingNotification = () => {
    const [checked, setChecked] = useState(true)

    console.log(checked)

    return (
        <div className={styles.container}>
            <div className={styles.notification}>
                <form className={styles.formContainer}>
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
                        <label>
                            <input
                                className={styles.checkboxInput}
                                onChange={(e) => setChecked(!checked) }
                                checked={checked}
                                type="checkbox"/>
                            <span/>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingNotification;