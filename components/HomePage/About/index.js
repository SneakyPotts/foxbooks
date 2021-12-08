import { useState } from 'react'
import DropDownArrow from '../../../public/chevron-down.svg'
import classnames from 'classnames'
import css from './about.module.css'

const About = () => {
    const data = [
        { title: 'Читать книги онлайн', text: `Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.` },
        { title: 'Книги онлайн', text: 'Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.' },
        { title: 'Книги на IPhone, IPad и Android онлайн', text: 'Понимание сути ресурсосберегающих технологий влечет за собой процесс внедрения и модернизации благоприятных перспектив.Современные технологии достигли такого уровня, что выбранный нами инновационный путь прекрасно подходит для реализации соответствующих условий активизации.В целом, конечно, новая модель организационной деятельности влечет за собой процесс внедрения и модернизации глубокомысленных рассуждений.' }
    ]

    const [currentIndex, setCurrentIndex] = useState(null)


    const handleClick = (index) => {
        setCurrentIndex((prev) => {
            if (prev === index) {
                console.log(1);
            return null
            } else {
                return index
            }})
    }
    return (
        <div className={css.container}>
        {data.map(({title,text}, index) => {
            return (
                <>
                     <div key={index}>
                        <div className={classnames(css.dropDown, { [css.active]: currentIndex === index })}>
                            <button onClick={()=>handleClick(index)} className={css.dropDownBtn}>
                            <span className={css.dropDownTitle}>{title}</span>
                            <span className={classnames(css.dropDownIcon, { [css.activeBtn]: currentIndex === index })}>
                                <DropDownArrow />
                            </span>
                            </button >
                            {currentIndex === index  && <p className={css.dropDownText}>{text}</p>}
                        </div>
                     </div>
                </>
            )
        })}
        
        </div>
    
    )
}
export default About;