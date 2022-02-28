import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import Link from 'next/link'
import classnames from 'classnames';
import Close from '../shared/icons/close'
import st from './categories.module.scss';

const CategoriesPage = () => {
    const {categories, audioCategories} = useSelector(state => state.book);
    const {innerWidthWindow} = useSelector(state => state.common);
    const [isShown, setIsShown] = useState('books');
const router = useRouter()
    console.log(router)
    const handleBooksClick = () => {
        setIsShown('books')
    }
    const handleAudiobooksClick = () => {
        setIsShown('audioBooks')
    }
    const onClose=()=>{
        router.back()
    }

    return (
        <div className={classnames('container', st.container)}>
            <div className={st.mobileHeder}>
                <h2 className={st.mobileHederTitle}>Категории</h2>
                <div onClick={onClose}><Close/></div>
            </div>
            <div className={st.btns}>
                <button className={classnames(st.btnTitle, {[st.active]: isShown === 'books'})}
                        onClick={handleBooksClick}>
                    Книги
                </button>
                <button className={classnames(st.btnTitle, {[st.active]: isShown === 'audioBooks'})}
                        onClick={handleAudiobooksClick}>
                    Аудиокниги
                </button>
            </div>
            <div className={st.mainBlock}>
                {
                    (isShown === 'books' || innerWidthWindow > 767) &&
                    <div className={classnames(st.categories, st.wrapper)}>
                        <h2 className={st.categoriesTitle}>Категории книг</h2>
                        <ul className={st.categoriesList}>
                            {categories.map(cat => (
                                <li key={cat.id} className={st.categoriesListItem}>
                                    <Link href={`/books/${cat.id}?type=books&showType=block&sortBy=1`}>
                                        <a className={st.categoriesLink}>
                                            {cat.name}
                                            <span>{cat.books_count}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {
                    (isShown === 'audioBooks' || innerWidthWindow > 767) &&
                    <div className={st.categories}>
                        <h2 className={st.categoriesTitle}>Категории аудиокниг</h2>
                        <ul className={st.categoriesList}>
                            {audioCategories.map(cat => (
                                <li key={cat.id} className={st.categoriesListItem}>
                                    <Link href={`/books/${cat.id}?type=audioBooks&showType=block&sortBy=1`}>
                                        <a className={st.categoriesLink}>
                                            {cat.name}
                                            <span>{cat.books_count}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            <button className={st.mobileBtn}>Посмотреть</button>
        </div>
    );
};

export default CategoriesPage;
