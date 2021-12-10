import { useState } from "react"
import classnames from "classnames"
import Book from '../book'
import ArrowRight from '../../public/chevron-right.svg'
// import Breadcrumbs from "../BreadCrumps/BreadCrumps"
import categories from '../data/categories.json'
import st from './audioBooks.module.scss'

const AudioBooks = () => {
    const data = [
        { id: '0', filter: 'Последние поступления' }, { id: '1', filter: 'Популярные' },
        { id: '2', filter: 'Бестселлеры' }, { id: '3', filter: 'Сейчас слушают' }
    ]
    const books = [
        { id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' },
        { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }, { id: '13' }, { id: '14' }, { id: '15' },
        { id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' },
        { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }, { id: '13' }, { id: '14' }, { id: '15' },
        { id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' },
        { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }, { id: '13' }, { id: '14' }, { id: '15' }
    ]

    const [currentIdx, setCurrentIdx] = useState(null)

    const handleOnClick = idx => {
         setCurrentIdx(idx)
    }

    return (
        <div className={classnames('container', st.abContainer)}>
            {/* <Breadcrumbs /> */}
            <h2 className={st.abTitle}>Аудиокниги</h2>
            {categories.map(({ id, name }) => (<button key={id} className={st.abCateg}>{name}</button>))}
            <p className={st.showAll}>Показать все<ArrowRight className='showAll' /></p>
            {data.map(({ id, filter }, idx) => (<button key={id} className={classnames(st.abFilter, {[st.active] : currentIdx===idx})} onClick={() => handleOnClick(idx)}>{filter}</button>))}
            <div className={st.mainBlock}>
                <div className={st.booksGrid}>
                    {books.map((book) => (<Book key={book.id} audio={true} className={st.book}/>))}
                </div>
                <div className={st.advertisingBlok}>
                    <img src='/banner.png' alt='' className={st.banner} />
                    <img src='/banner.png' alt='' />
                </div>
            </div>
        </div>
    )
}

export default AudioBooks

