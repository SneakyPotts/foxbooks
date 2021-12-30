import React, {useState} from 'react';
import styles from './index.module.scss'
import {useForm} from "react-hook-form";
import Input from "../shared/common/Input/Input";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import Checkbox from "../shared/common/checkbox/checkbox";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import Button from "../shared/common/Button/Button";

const HoldersRight = () => {
    const {register, handleSubmit, unregister, formState: {errors}, reset,} = useForm();
    const [modal, setModal] = useState(false)

    const checkboxData = [
        {text: 'Я даю согласие на обработку и хранение персональных данных.', name: 'first'},
        {text: 'Я являюсь правообладателем или представителем правообладателя спорного контента.', name: 'second'},
        {
            text: 'Я выражаю свое согласие с тем, что моя электронная почта может быть использована администрацией сайта для дальнейшего взаимодействия.',
            name: 'therd'
        }
    ]

    const HandleSubmit = data => {
        setModal(true)
        console.log(data)
    }

    return (
        <div className={styles.container}>
            <div className={styles.holderTitle}>
                <h2>
                    Жалоба на материал
                </h2>
                <p>
                    Информация о спорном контенте авторского права.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(HandleSubmit)}>
                <div className={styles.formInput}>
                    <Input
                        classNames={styles.firstInput}
                        textLabel='Название объекта авторского права'
                        register={register}
                        name='test'
                    />
                    <Input
                        textLabel='Подтверждающие документы (ссылка на первоисточник публикации/ ссылка на сайт-продавец публикации)'
                        register={register}
                        name='test'
                    />
                    <Input
                        textLabel='Ссылка на спорный контент'
                        register={register}
                        name='test'
                    />
                    <Input
                        textLabel='ФИО'
                        register={register}
                        name='test'
                    />
                    <Input
                        textLabel='Электронная почта'
                        register={register}
                        name='test'
                    />
                </div>
                <div className={styles.checkboxContainer}>
                    {checkboxData.map(({text,name})=> (
                            <div key={text} className={styles.checkWrap}>
                                <Checkbox
                                    register={register}
                                    name={name}
                                />
                                <p>
                                    {text}
                                </p>
                            </div>
                        )
                    )}
                </div>
                <ButtonGroup ClassName={styles.buttons} text="Отправить"/>
            </form>
            <ModalWindow modal={modal} setModal={setModal}>
                <div className={styles.modal}>
                    <h2>Отправлено</h2>
                    <p>Наши сотрудники ответят на ваш запрос как можно скорее.</p>
                    <Button
                        classNames={styles.modalClose}
                        text='Закрыть'
                        typeButton='button'
                    />
                </div>
            </ModalWindow>
        </div>
    );
};

export default HoldersRight;