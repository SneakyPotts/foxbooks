import { useState } from 'react'
import classnames from 'classnames'
import DropDownArrow from '../../../../public/dropDownArrow.svg'
import css from './dropDown.module.css'

const DropDownReadOnline = () => {
    const [showText, setShowText] = useState(true)

    const onBtnClick = () => {
        setShowText(prevSetShowText=>!prevSetShowText)
    }
    return <>
        <div className={classnames(css.dropDown,{[css.active]:!showText})}>
            <button onClick={onBtnClick} className={css.dropDownBtn}>
                <span className={css.dropDownTitle}>Читать книги онлайн</span>
                <DropDownArrow className={classnames({[css.activeBtn]:!showText})}/>
            </button >
            {showText||<div>
                <p className={css.dropDownText}>Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.
                    Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.
                    В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.</p>
            </div>}
        </div>
        
    </>
}
export default DropDownReadOnline
