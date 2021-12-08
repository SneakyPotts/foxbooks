import { useState } from 'react'
// import DropDownArrow from '../../../public/chevron-down.svg'
import classnames from 'classnames'
import css from './about.module.css'

const About = () => {
    const data = [
        { title: 'Читать книги онлайн', text: 'Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.' },
        { title: 'Книги онлайн', text: 'Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.' },
        { title: 'Книги на IPhone, IPad и Android онлайн', text: 'Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.' }
    ]

        const [showText, setShowText] = useState(false);


    const onBtnClick = () => {
        setShowText(prevSetShowText=>!prevSetShowText)
    }
    return (
        <div className={css.container}>
         <div className={classnames(css.dropDown, { [css.active]: showText })}>
        <button onClick={onBtnClick} className={css.dropDownBtn}>
            <span className={css.dropDownTitle}>{title}</span>
            <span className={classnames(css.dropDownIcon, { [css.activeBtn]: showText })}>
                {/* <DropDownArrow /> */}
            </span>
            </button >
            {showText &&
                <p className={css.dropDownText}>{text}</p>
            }
        </div>
        </div>
    )
}
export default About;