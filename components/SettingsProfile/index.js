import React from 'react';
import styles from './index.module.scss'
import Pencil from "../shared/icons/pencil";
import Bell from "../shared/icons/Bell";
import Lock from "../shared/icons/Lock";
import Image from "next/image";

const SettingsProfile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.setting}>
                <div className={styles.settingMenu}>
                    <h1>
                        Настройки пароля
                    </h1>
                    <ul>
                        <li>
                            <Pencil/>
                            <span>Редактировать профиль</span>
                        </li>
                        <li>
                            <Bell/>
                            <span> Настройки уведомлений</span>
                        </li>
                        <li>
                            <Lock/>
                            <span> Настройки пароля</span>
                        </li>
                    </ul>
                </div>
                <div  className={styles.settingContent}>
                    <h1>
                        Редактировать профиль
                    </h1>
                    <form className={styles.formProfile}>
                        <div className={styles.formProfileWrap}>
                            <div className={styles.image}>
                                <Image
                                    src="/horizontalBookCovers/book.png"
                                    alt=""
                                    width="102"
                                    height='102'
                                    placeholder="blur"
                                    blurDataURL="/images/blur.jpg"
                                    layout='responsive'
                                />
                            </div>
                            <div className={styles.file}>
                                <Pencil w='20' h='20' c='#FFFFFF'/>
                                <input type="file" hidden/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsProfile;