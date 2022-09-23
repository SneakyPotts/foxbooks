import React, {useState} from 'react';
import st from "../bookpage.module.scss";
import {useForm} from "react-hook-form";
import BookService from "../../../http/BookService";
import {useRouter} from "next/router";
import ModalWindow from "../../shared/common/modalWindow/ModalWindow";
import styles from "../../MyBooks/styles.module.scss";
import Button from "../../shared/common/Button/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import schema from "./schema";
import {useSelector} from "react-redux";

const Form = ({title}) => {
    const router = useRouter()

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  const {book} = useSelector(state => state.book)

    const submitHandler = data => {
        BookService.recommendBook({
            id: book.id,
            type: book.type === 'books' ? 'book' : 'audio_book',
            content: data.content
        }).then(() => {
            reset()
            setConfirmPopupIsVisible(true)
        })
    }

    return (
        <>
            <p className={st.recommendations}>
                Порекомендуйте книги, похожие на “{title}”
            </p>
            <p className={st.recommendationsLabel}>
                по жанру, сюжету, авторам и т.д.
            </p>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input
                    {...register("content")}
                    placeholder="Поделитесь книгой"
                    className={st.recomInput}
                />
                <p className={st.error}>{errors.content?.message}</p>
                <Button
                    text="Отправить"
                    typeButton="submit"
                    classNames={st.submitBtn}
                />
            </form>
            <p className={st.recomInputLabel}>
                Убедительная просьба найти соответствующую книгу на сайте FoxBook и
                вставить на нее ссылку, за отсутствием книги на нашем сайте, укажите
                автора или название книги
            </p>

            {confirmPopupIsVisible &&
                <ModalWindow
                    onClose={() => setConfirmPopupIsVisible(false)}
                >
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Ваша рекомендация отправлена</h3>

                        <Button
                            text="Закрыть"
                            typeButton="button"
                            click={() => setConfirmPopupIsVisible(false)}
                            classNames={styles.modalBtn}
                        />
                    </div>
                </ModalWindow>
            }
        </>
    );
};

export default Form;