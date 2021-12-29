import React from 'react';
import styles from './index.module.scss'
import {useForm} from "react-hook-form";
import Input from "../shared/common/Input/Input";

const SupportCom = () => {

    const {register, handleSubmit, unregister, formState: {errors}, reset} = useForm();

    const HandleSubmit = data => {
        console.log(data)
    }

    return (
        <div className={styles.container}>
            <div className={styles.helpTitle}>
                <h1>Нужна помощь? </h1>
                <p>Если у вас появились вопросы или проблемы связанные с использованием сайта, напишите нашей службе
                    поддержки, заполнив форму ниже. Ответ технических специалистов может занимать до 24-х часов.</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(HandleSubmit)}>
                <Input
                    register={register}
                    textLabel={'Тема обращения'}
                    name='message'
                />
            </form>
        </div>
    );
};

export default SupportCom;