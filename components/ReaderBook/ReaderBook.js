import React, {useState} from 'react';
import styles from './index.module.scss'
import Logo from "../shared/icons/Logo";
import ArrowRight from '../../public/chevron-right.svg'
import ReaderGambgurger from "../shared/icons/ReadderGambgurger";
import Quote from "../shared/icons/quote";
import Letter from "../shared/icons/Letter";
import FullScreen from "../shared/icons/FullScreen";
import BookMark from "../shared/icons/BookMark";
import InputRange from "../shared/common/InputRange/InputRange";
import classnames from "classnames";




const ReaderBook = () => {
    const [ controlDrop, setControlDrop ] = useState(false)
    const [ column, setСolumn ] = useState(false)
    const [ alignment, setAlignment ] = useState(false)
    const [ fontSize, setFontSize ] = useState(0)
    const [ brightness, setBrightness ] = useState(5)
    const [ Fields, setFields ] = useState(2)
    const [ line, setLine ] = useState(2)
    const [ font, setFont ] = useState('Ubuntu')
    const [dropFont, setDropFont] = useState(false)

    const controlData = [
        {textLabel:'Текст в 2 колонки', value: column, setValue: setСolumn, max:'0', dot: false},
        {textLabel:'Размер шрифта', value: fontSize, setValue: setFontSize, max:'12', dot: false},
        {textLabel:'Яркость', value: brightness, setValue: setBrightness, max:'5', dot: false},
        {textLabel:'Шрифт', value: font, setValue: setFont, max:'', dot: false},
        {textLabel:'Поля', value: Fields, setValue: setFields, max:'4', dot: true},
        {textLabel:'Высота Строк', value: line, setValue: setLine, max:'4', dot: true},
        {textLabel:'Выравнивание по ширине', value: alignment, setValue: setAlignment, max:'0'},
    ]

    const dataDropDownFonts = [
        {text: 'Times New Roman'},
        {text: 'Georgia'},
        {text: 'Arial'},
        {text: 'Ubuntu'},
        {text: 'Verdana'},
    ]


    return (
        <div
            className={classnames(styles.wrapper,
                {[styles.wrapperDefault] : Number(brightness) === 5},
                {[styles.wrapperFifth] : Number(brightness) === 4},
                {[styles.wrapperFourth] : Number(brightness) === 3},
                {[styles.wrapperThird] : Number(brightness) === 2},
                {[styles.wrapperSecond] : Number(brightness) === 1},
                {[styles.wrapperFirst] : Number(brightness) === 0},
            ) }
        >
            <div className={styles.containerHeader}>
                <div className={styles.logoWrap}>
                    <ArrowRight className={styles.arrow}/>
                    <Logo className={3 > brightness && styles.svgChange}/>
                </div>
                <div className={styles.iconGroup}>
                    <ReaderGambgurger
                        className={styles.iconRight}
                    />
                    <Quote className={styles.iconRight}/>
                    <Letter
                        click={()=>setControlDrop(!controlDrop)}
                        className={styles.iconRight}/>
                    <FullScreen className={styles.iconRight}/>
                    <BookMark className={styles.iconRight}/>
                    {controlDrop &&
                    <div className={styles.control}>
                        {controlData.map(({textLabel, value, setValue, max, dot},i)=> {
                            return i === 0 || i === 5 ?
                                <div className={styles.controlBlock}>
                                    <div className={styles.wrapSwitch}>
                                        <span>{textLabel}</span>
                                        <input className={styles.switch}
                                               checked={value}
                                               onChange={()=>setValue(!value)}
                                               type="checkbox"/>
                                    </div>
                                </div>
                                : i === 3 ?
                                    <div className={classnames(styles.controlBlock, styles.fontBlock)}>
                                        <span>{textLabel}</span>
                                        <div onClick={()=>setDropFont(!dropFont)} className={styles.changeFont}>
                                            <span>{value}</span>
                                            <span className={styles.changeFontSvg}>
                                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L7 7L13 1" stroke="#909190" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                            <div className={classnames(styles.fontDropDown, {[styles.fontDropDownActive]: dropFont})}>
                                                {dataDropDownFonts.map(({text})=> (
                                                    <button type='button'>
                                                        {text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                <div className={styles.controlBlock}>
                                    <InputRange
                                        dot={dot}
                                        brightness={brightness}
                                        value={value}
                                        setValue={setValue}
                                        textLabel={textLabel}
                                        max={max}
                                    />
                                </div>

                        })}
                    </div>
                    }
                </div>
            </div>
            <div
                style={{maxWidth:Number(Fields) === 2 ?
                        '792px' : Number(Fields) === 1 ?
                            '852px' : Number(Fields) === 0 ?
                                '912px' : Number(Fields) === 3 ?
                                    '732px': '672px'}}
                className={styles.wrapText}>
                <h1>Гарри Поттер и философский камень</h1>
                <span>Джоан Роулинг</span>
                <h3>Глава 1. Мальчик, который выжил</h3>
                <p
                style={{fontSize: `${Number(fontSize) + 16}px`,
                    lineHeight:Number(line) === 2 ?
                        '22px' : Number(line) === 1 ?
                            '21px' : Number(line) === 0 ?
                                '18px' : Number(line) === 3 ?
                                    '24px': '26px'}}
                >
                    Мистер и миссис Дурсль проживали в доме номер четыре по Тисовой улице и всегда с гордостью заявляли,
                    что они, слава богу, абсолютно нормальные люди. Уж от кого-кого, а от них никак нельзя было ожидать,
                    чтобы они попали в какую-нибудь странную или загадочную ситуацию. Мистер и миссис Дурсль весьма
                    неодобрительно относились к любым странностям, загадкам и прочей ерунде.
                    Мистер Дурсль возглавлял фирму под названием «Граннингс», которая специализировалась на производстве
                    дрелей. Это был полный мужчина с очень пышными усами и очень короткой шеей. Что же касается миссис
                    Дурсль, она была тощей блондинкой с шеей почти вдвое длиннее, чем положено при ее росте. Однако этот
                    недостаток пришелся ей весьма кстати, поскольку большую часть времени миссис Дурсль следила за
                    соседями и подслушивала их разговоры. А с такой шеей, как у нее, было очень удобно заглядывать за
                    чужие заборы. У мистера и миссис Дурсль был маленький сын по имени Дадли, и, по их мнению, он был
                    самым чудесным ребенком на свете.
                    Семья Дурсль ей имела все, чего только можно пожелать. Но был у них и один секрет. Причем больше
                    всего на свете они боялись, что кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что
                    с ними будет, если выплывет правда о Поттерах. Миссис Поттер приходилась миссис Дурсль родной
                    сестрой, но они не виделись вот уже несколько лет. Миссис Дурсль даже делала вид, что у нее вовсе
                    нет никакой сестры, потому что сестра и ее никчемный муж были полной противоположностью Дурслям.
                    Дурсли содрогались при одной мысли о том, что скажут соседи, если на Тисовую улицу пожалуют Поттеры.
                    Дурсли знали, что у Поттеров тоже есть маленький сын, но они никогда его не видели. И они
                    категорически не хотели, чтобы их Дадли общался с ребенком таких родителей.
                    Когда во вторник мистер и миссис Дурсль проснулись скучным и серым утром — а именно с этого утра
                    начинается наша история, — ничто, включая покрытое тучами небо, не предвещало, что вскоре по всей
                    стране начнут происходить странные и загадочные вещи. Мистер Дурсль что-то напевал себе под нос,
                    завязывая самый отвратительный из своих галстуков. А миссис Дурсль, с трудом усадив
                    сопротивляющегося и орущего Дадли на высокий детский стульчик, со счастливой улыбкой пересказывала
                    мужу последние сплетни.
                    Никто из них не заметил, как за окном пролетела большая сова-неясыть.
                    В половине девятого мистер Дурсль взял свой портфель, клюнул миссис Дурсль в щеку и попытался на
                    прощанье поцеловать Дадли, но промахнулся, потому что Дадли впал в ярость, что с ним происходило
                    довольно часто. Он раскачивался взад-вперед на стульчике, ловко выуживал из тарелки кашу и заляпывал
                    ею стены.
                    — Ух, ты моя крошка, — со смехом выдавил из себя мистер Дурсль, выходя из дома.
                    Он сел в машину и выехал со двора.
                    На углу улицы мистер Дурсль заметил, что происходит что-то странное, — на тротуаре стояла кошка и
                    внимательно изучала лежащую перед ней карту. В первую секунду мистер Дурсль даже не понял, что
                    именно он увидел, но затем, уже миновав кошку, затормозил и резко оглянулся. На углу Тисовой улицы
                    действительно стояла полосатая кошка, но никакой карты видно не было.
                    — И привидится же такое! — буркнул мистер Дурсль.
                    Наверное, во всем были виноваты мрачное утро и тусклый свет фонаря. На всякий случай мистер Дурсль
                    закрыл глаза, потом открыл их и уставился на кошку. А кошка уставилась на него.
                    Мистер Дурсль отвернулся и поехал дальше, продолжая следить за кошкой в зеркало заднего вида. Он
                    заметил, что кошка читает табличку, на которой написано «Тисовая улица». Нет, конечно же, не читает,
                    поспешно поправил он самого себя, а просто смотрит на табличку. Ведь кошки не умеют читать — равно
                    как и изучать карты.
                    Мистер Дурсль потряс головой и попытался выбросить из нее кошку. И пока его автомобиль ехал к
                    Лондону из пригорода, мистер Дурсль думал о крупном заказе на дрели, который рассчитывал сегодня
                    получить.
                    Но когда он подъехал к Лондону, заполнившие его голову дрели вылетели оттуда в мгновение ока, потому
                    что, попав в обычную утреннюю автомобильную пробку и от нечего делать глядя по сторонам, мистер
                    Дурсль заметил, что на улицах появилось множество очень странно одетых людей. Людей в мантиях.
                    Мистер Дурсль не переносил людей в нелепой одежде, да взять хотя бы нынешнюю молодежь, которая
                    расхаживает черт знает в чем! И вот теперь эти, нарядившиеся по какой-то дурацкой моде.
                    Мистер Дурсль забарабанил пальцами по рулю. Его взгляд упал на сгрудившихся неподалеку странных
                    типов, оживленно шептавшихся друг с другом. Мистер Дурсль пришел в ярость, увидев, что некоторые из
                    них совсем не молоды, — подумать только, один из мужчин выглядел даже старше него, а позволил себе
                    облачиться в изумрудно-зеленую мантию! Ну и тип! Но тут мистера Дурсля осенила мысль, что эти
                    непонятные личности наверняка всего лишь собирают пожертвования или что-нибудь в этом роде… Так оно
                    и есть! Стоявшие в пробке машины наконец тронулись с места, и несколько минут спустя мистер Дурсль
                    въехал на парковку фирмы «Граннингс». Его голова снова была забита дрелями.
                    Кабинет мистера Дурсля находился на девятом этаже, где он всегда сидел спиной к окну. Предпочитай он
                    сидеть лицом к окну, ему, скорее всего, трудно было бы этим утром сосредоточиться на дрелях. Но он
                    сидел к окну спиной и не видел пролетающих сов — подумать только, сов, летающих не ночью, когда им и
                    положено, а средь бела дня! И это уже не говоря о том, что совы — лесные птицы, и в городах, тем
                    более таких больших, как Лондон, не живут.
                    В отличие от мистера Дурсля, находившиеся на улице люди отлично видели этих сов, стремительно
                    пролетающих мимо них одна за другой, и широко раскрывали рты от удивления и показывали на них
                    пальцами. Большинство этих людей в жизни своей не видели ни единой совы, даже в ночное время.
                </p>
            </div>
        </div>

    );
};

export default ReaderBook;