import React, {useRef, useState} from 'react';
import styles from './index.module.scss'
import Pencil from "../shared/icons/pencil";
import Bell from "../shared/icons/Bell";
import Lock from "../shared/icons/Lock";
import Image from "next/image";
import {useForm} from "react-hook-form";
import Input from "../shared/common/Input/Input";
import SocialNetwork from "../shared/common/SocialNetwork/SocialNetwork";


const SettingsProfile = () => {

    const inputFile = useRef()
    const [file64, setFile64] = useState(null)

    const {register, handleSubmit, unregister,  formState: {errors}, reset} = useForm();

    const HandleClick = () => {
        inputFile.current.click()
    }

    const onChange = e => {
        let reader = new FileReader();
        const files = e.target.files;
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
            setFile64(reader.result)
        };
    };

    const HandleSubmit = data => {
        console.log(data)
    }


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
                    <form
                        onSubmit={handleSubmit(HandleSubmit)}
                        className={styles.formProfile}>
                        <div className={styles.formProfileWrap}>
                            <div className={styles.image}>
                                <Image
                                    src={file64 === null ? "/horizontalBookCovers/book.png" : file64}
                                    alt=""
                                    width="102"
                                    height='102'
                                    placeholder="blur"
                                    blurDataURL="/images/blur.jpg"
                                    layout='responsive'
                                />
                            </div>
                            <div onClick={HandleClick} className={styles.file}>
                                <Pencil w='20' h='20' c='#FFFFFF'/>
                                <input onChange={onChange} ref={inputFile} type="file" hidden/>
                            </div>
                        </div>
                        <Input
                            classNames={styles.inputNik}
                            err={errors.name?.message}
                            textLabel='Ник'
                            name='name'
                            register={register}
                        />

                        <Input
                            err={errors.email?.message}
                            textLabel='Электронная почта'
                            name='email'
                            register={register}
                        />
                        <div className={styles.social}>
                            <span>
                                Социальные сети
                            </span>
                            <p>
                                Подключите социальные сети, чтобы входить через них в FoxBooks
                            </p>
                        </div>
                        <SocialNetwork/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsProfile;