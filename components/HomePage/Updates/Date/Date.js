import { useState } from 'react';
import classnames from 'classnames'
import DropDownArrow from '../../../../public/chevron-down.svg'
import css from './date.module.css'

const Date = ({ date, books }) => {
    const [menu, setMenu] = useState(false);

    const toggle = (e) => {
        e.stopPropagation();
        setMenu(!menu)
    }

    return (
        <>
            <div className={css.releaseDates}>
            <button className={css.btn} onClick={toggle}>{date}
                <span  className={ css.dropDownIcon}
                >
                    <DropDownArrow/>
                </span>
            </button>
            <ul className={classnames(css.dates, {[css.showMenu]: menu})}>
                {books.map(({author, book}) => (
                    <li key={author} className={css.date}>
                        <spann>{book}</spann>
                        <spann className={css.dot}></spann>
                        <spann className={css.author}>{author}</spann>
                    </li>
                ))}
            </ul>
        </div></>
        
    )
}
export default Date;