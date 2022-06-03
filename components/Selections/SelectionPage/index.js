import React, {useState} from 'react';
import Book from '../../shared/common/book';
import styles from "../../MyBooks/styles.module.scss";
import st from './selectionPage.module.scss';
import Image from "next/image";
import BackBtn from "../../shared/common/BackBtn";
import Button from "../../shared/common/Button/Button";
import classNames from "classnames";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {setAuthPopupVisibility} from "../../../store/commonSlice";
import SelectionService from "../../../http/SelectionService";

const SelectionPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {isAuth} = useSelector(state => state.auth)
    const {selectionById} = useSelector(state => state.selection)

    const [isAdded, setIsAdded] = useState(selectionById?.compilation?.in_favorite)

    const toggleToFavoriteHandler = async () => {
        if (!isAuth) {
            dispatch(setAuthPopupVisibility(true))
        } else {
            if (selectionById?.compilation?.in_favorite) {
                await SelectionService.deleteCompilationFromFavorite(router.query?.id)
                setIsAdded(false)
            } else {
                await SelectionService.addCompilationToFavorite(router.query?.id)
                setIsAdded(true)
            }
        }
    }

    return (
        <>
            <div className={styles.compilationWrapper}>
                <Image
                    src={selectionById?.compilation?.background || '/preview.jpg'}
                    layout={'fill'}
                    placeholder="blur"
                    blurDataURL="/blur.webp"
                    className={styles.compilationImg}
                />

                <BackBtn
                    onClick={() => router.back()}
                    externalClass={styles.compilationBack}
                />
                <h2 className={styles.compilationTitle}>{selectionById?.compilation?.title}</h2>
                <div className={styles.compilationControls}>
                    <Button
                        text={isAdded ? 'Подборка добавлена' : 'Добавить подборку'}
                        classNames={classNames(styles.compilationBtn, {
                            [st.added]: isAdded
                        })}
                        click={toggleToFavoriteHandler}
                    />
                </div>
            </div>
            <div className={classNames("container", styles.compilationContainer, st.selectionContainer)}>
        <span
            className={classNames(styles.compilationBookCount, {
                [styles.empty]: 1
            })}
        >
          <span>{selectionById?.compilation?.generalBooksCount}</span>
          Книги
        </span>

                <Button
                    text={isAdded ? 'Подборка добавлена' : 'Добавить подборку'}
                    classNames={classNames(styles.compilationBtn, st.respBtn, {
                        [st.added]: isAdded
                    })}
                    click={toggleToFavoriteHandler}
                />

                <p className={st.selectionText}>{selectionById?.compilation?.description}</p>

                <div className={st.selectionGrid}>
                    {selectionById?.books?.data?.length ? selectionById?.books?.data.map(i =>
                            <Book
                                key={i?.id}
                                book={i?.book_compilationable}
                                type={i?.book_compilationable?.type}
                                audio={i?.book_compilationable?.type === 'audioBooks'}
                            />
                        ) :
                        <p className="empty">Книг не найдено</p>
                    }
                </div>
            </div>
        </>
    );
};

export default SelectionPage;
