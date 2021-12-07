import { useState } from 'react'
import classnames from 'classnames'
import DropDownArrow from '../../../../public/chevron-down.svg'
import css from './dropDown.module.css'

const DropDownBooksOnline = ({title, text}) => {
    const [showText, setShowText] = useState(false);
        console.log('books', showText);


    const onBtnClick = () => {
        setShowText(prevSetShowText=>!prevSetShowText)
    }

    return (
        <div className={classnames(css.dropDown, { [css.active]: showText })}>
        <button onClick={onBtnClick} className={css.dropDownBtn}>
            <span className={css.dropDownTitle}>{title}</span>
            <span className={classnames(css.dropDownIcon, { [css.activeBtn]: showText })}>
                <DropDownArrow />
            </span>
            </button >
            {showText &&
                <p className={css.dropDownText}>{text}</p>
            }
        </div>
    )
}
export default DropDownBooksOnline;
