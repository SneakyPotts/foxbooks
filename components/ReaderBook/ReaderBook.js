import React, {useEffect, useRef, useState} from 'react';
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
import {loadGetInitialProps} from "next/dist/shared/lib/utils";


const ReaderBook = () => {
    const [controlDrop, setControlDrop] = useState(false)
    const [column, setСolumn] = useState(false)
    const [alignment, setAlignment] = useState(false)
    const [fontSize, setFontSize] = useState(0)
    const [brightness, setBrightness] = useState(5)
    const [Fields, setFields] = useState(2)
    const [line, setLine] = useState(2)
    const [font, setFont] = useState('Ubuntu')
    const [positionPopUp, setPositionPopUp] = useState([{x: 0, y: 0}])
    const [colorSelectText, setColorSelectText] = useState('#A5D5FF')
    const [currentSelectionText, setCurrentSelectionText] = useState('')
    const [dropFont, setDropFont] = useState(false)
    const [textPage, setTextPage] = useState(`Мистер и миссис Дурсль проживали в доме номер четыре по Тисовой улице и всегда с гордостью заявляли,что они, слава богу, абсолютно нормальные люди. Уж от кого-кого, а от них никак нельзя было ожидать,чтобы они попали в какую-нибудь странную или загадочную ситуацию. Мистер и миссис Дурсль весьманеодобрительно относились к любым странностям, загадкам и прочей ерунде.Мистер Дурсль возглавлял фирму под названием «Граннингс», которая специализировалась на производстведрелей. Это был полный мужчина с очень пышными усами и очень короткой шеей. Что же касается миссисДурсль, она была тощей блондинкой с шеей почти вдвое длиннее, чем положено при ее росте. Однако этотнедостаток пришелся ей весьма кстати, поскольку большую часть времени миссис Дурсль следила засоседями и подслушивала их разговоры. А с такой шеей, как у нее, было очень удобно заглядывать зачужие заборы. У мистера и миссис Дурсль был маленький сын по имени Дадли, и, по их мнению, он былсамым чудесным ребенком на свете.Семья Дурсль ей имела все, чего только можно пожелать. Но был у них и один секрет. Причем большевсего на свете они боялись, что кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что с ними будет, если выплывет правда о Поттерах. Миссис Поттер приходилась миссис Дурсль родной сестрой, но они не виделись вот уже несколько лет. Миссис Дурсль даже делала вид, что у нее вовсе нет никакой сестры, потому что сестра и ее никчемный муж были полной противоположностью Дурслям. Дурсли содрогались при одной мысли о том, что скажут соседи, если на Тисовую улицу пожалуют Поттеры. Дурсли знали, что у Поттеров тоже есть маленький сын, но они никогда его не видели. И они категорически не хотели, чтобы их Дадли общался с ребенком таких родителей. Когда во вторник мистер и миссис Дурсль проснулись скучным и серым утром — а именно с этого утраначинается наша история, — ничто, включая покрытое тучами небо, не предвещало, что вскоре по всейстране начнут происходить странные и загадочные вещи. Мистер Дурсль что-то напевал себе под нос,завязывая самый отвратительный из своих галстуков. А миссис Дурсль, с трудом усадивсопротивляющегося и орущего Дадли на высокий детский стульчик, со счастливой улыбкой пересказываламужу последние сплетни.Никто из них не заметил, как за окном пролетела большая сова-неясыть.В половине девятого мистер Дурсль взял свой портфель, клюнул миссис Дурсль в щеку и попытался напрощанье поцеловать Дадли, но промахнулся, потому что Дадли впал в ярость, что с ним происходилодовольно часто. Он раскачивался взад-вперед на стульчике, ловко выуживал из тарелки кашу и заляпывалею стены.— Ух, ты моя крошка, — со смехом выдавил из себя мистер Дурсль, выходя из дома.Он сел в машину и выехал со двора.На углу улицы мистер Дурсль заметил, что происходит что-то странное, — на тротуаре стояла кошка ивнимательно изучала лежащую перед ней карту. В первую секунду мистер Дурсль даже не понял, чтоименно он увидел, но затем, уже миновав кошку, затормозил и резко оглянулся. На углу Тисовой улицыдействительно стояла полосатая кошка, но никакой карты видно не было.— И привидится же такое! — буркнул мистер Дурсль.Наверное, во всем были виноваты мрачное утро и тусклый свет фонаря. На всякий случай мистер Дурсльзакрыл глаза, потом открыл их и уставился на кошку. А кошка уставилась на него.Мистер Дурсль отвернулся и поехал дальше, продолжая следить за кошкой в зеркало заднего вида. Онзаметил, что кошка читает табличку, на которой написано «Тисовая улица». Нет, конечно же, не читает,поспешно поправил он самого себя, а просто смотрит на табличку. Ведь кошки не умеют читать — равнокак и изучать карты.Мистер Дурсль потряс головой и попытался выбросить из нее кошку. И пока его автомобиль ехал кполучить.Но когда он подъехал к Лондону, заполнившие его голову дрели вылетели оттуда в мгновение ока, потому что, попав в обычную утреннюю автомобильную пробку и от нечего делать глядя по сторонам, мистер Дурсль заметил, что на улицах появилось множество очень странно одетых людей. Людей в мантиях.Мистер Дурсль не переносил людей в нелепой одежде, да взять хотя бы нынешнюю молодежь, которая расхаживает черт знает в чем! И вот теперь эти, нарядившиеся по какой-то дурацкой моде. Мистер Дурсль забарабанил пальцами по рулю. Его взгляд упал на сгрудившихся неподалеку странных типов, оживленно шептавшихся друг с другом. Мистер Дурсль пришел в ярость, увидев, что некоторые из них совсем не молоды, — подумать только, один из мужчин выглядел даже старше него, а позволил себе облачиться в изумрудно-зеленую мантию! Ну и тип! Но тут мистера Дурсля осенила мысль, что этинепонятные личности наверняка всего лишь собирают пожертвования или что-нибудь в этом роде… Так онои есть! Стоявшие в пробке машины наконец тронулись с места, и несколько минут спустя мистер Дурсль въехал на парковку фирмы «Граннингс». Его голова снова была забита дрелями. Кабинет мистера Дурсля находился на девятом этаже, где он всегда сидел спиной к окну. Предпочитай он сидеть лицом к окну, ему, скорее всего, трудно было бы этим утром сосредоточиться на дрелях. Но он сидел к окну спиной и не видел пролетающих сов — подумать только, сов, летающих не ночью, когда им и положено, а средь бела дня! И это уже не говоря о том, что совы — лесные птицы, и в городах, тем более таких больших, как Лондон, не живут. В отличие от мистера Дурсля, находившиеся на улице люди отлично видели этих сов, стремительно пролетающих мимо них одна за другой, и широко раскрывали рты от удивления и показывали на них пальцами. Большинство этих людей в жизни своей не видели ни единой совы, даже в ночное время.`)

    const controlData = [
        {textLabel: 'Текст в 2 колонки', value: column, setValue: setСolumn, max: '0', dot: false},
        {textLabel: 'Размер шрифта', value: fontSize, setValue: setFontSize, max: '12', dot: false},
        {textLabel: 'Яркость', value: brightness, setValue: setBrightness, max: '5', dot: false},
        {
            textLabel: 'Шрифт',
            value: font === 'Times New Roman' ? 'Times' : font,
            setValue: setFont,
            max: '',
            dot: false
        },
        {
            textLabel: 'Поля',
            value: Fields,
            setValue: setFields,
            max: '4',
            labelOne: 'узкие',
            labelSecond: 'широкие',
            dot: true
        },
        {
            textLabel: 'Высота Строк',
            value: line,
            setValue: setLine,
            max: '4',
            labelOne: 'маленькая',
            labelSecond: 'большая',
            dot: true
        },
        {textLabel: 'Выравнивание по ширине', value: alignment, setValue: setAlignment, max: '0'},
    ]

    const dataDropDownFonts = [
        {text: 'Times New Roman'},
        {text: 'Georgia'},
        {text: 'Arial'},
        {text: 'Ubuntu'},
        {text: 'Verdana'},
    ]

    const dataColor = [{color: '#A5D5FF'}, {color: '#FFE371'}, {color: '#FED3CA'}, {color: '#B8DF70'},]


    const [arrayQuotes, setArrayQuotes] = useState([
        {text: 'юди. Уж от кого-кого, а от них никак нельзя', color: '#FFE371'},
        {text: 'Дурсль возглавлял фирму под названием «Граннингс», которая специализировалась на', color: '#FED3CA'},
        {text: 'сли о том, что скажут соседи, если на Тисовую улицу пожалуют Поттеры. Дурсли знали, что у Поттеров тоже есть маленький сын,', color: '#B8DF70'},
    ])

    const getTextselection = (arrayQuotes, textBooks) => {
        let newTextBooks = textBooks

        function generateRandomClass() {
            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (let i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function generateSelectionText(selectText, color, textBooks) {
            const positionText = textBooks.indexOf(selectText)
            const textWithMark = textBooks.slice(0, positionText)
            const markText = `<mark class=${generateRandomClass()} style="background-color: ${color}">${textBooks.slice(positionText, positionText + selectText.length)}</mark>`
            const remainderText = textBooks.slice(textBooks.slice(0, positionText).length + selectText.length)
            const lastPieceTextWithMark = textWithMark + markText + remainderText
            newTextBooks = lastPieceTextWithMark
            return lastPieceTextWithMark
        }

        if (arrayQuotes) {
            for(let i = 0; i < arrayQuotes.length; i++) {
                generateSelectionText(arrayQuotes[i].text, arrayQuotes[i].color, newTextBooks)
            }
            setTextPage(newTextBooks)
            // .replace(/<\/?[^>]+(>|$)/g, '')

        }
    }

    useEffect(() => {
        getTextselection(arrayQuotes, textPage)
    }, [])


    return (
        <div
            className={classnames(styles.wrapper,
                {[styles.wrapperDefault]: Number(brightness) === 5},
                {[styles.wrapperFifth]: Number(brightness) === 4},
                {[styles.wrapperFourth]: Number(brightness) === 3},
                {[styles.wrapperThird]: Number(brightness) === 2},
                {[styles.wrapperSecond]: Number(brightness) === 1},
                {[styles.wrapperFirst]: Number(brightness) === 0},
            )}
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
                        click={() => setControlDrop(!controlDrop)}
                        className={styles.iconRight}/>
                    <FullScreen className={styles.iconRight}/>
                    <BookMark className={styles.iconRight}/>
                    {controlDrop &&
                    <div className={styles.control}>
                        {controlData.map(({textLabel, labelOne, labelSecond, value, setValue, max, dot}, i) => {
                            return i === 0 || i === 6 ?
                                <div className={styles.controlBlock}>
                                    <div className={styles.wrapSwitch}>
                                        <span>{textLabel}</span>
                                        <input className={styles.switch}
                                               checked={value}
                                               onChange={() => setValue(!value)}
                                               type="checkbox"/>
                                    </div>
                                </div>
                                : i === 3 ?
                                    <div className={classnames(styles.controlBlock, styles.fontBlock)}>
                                        <span>{textLabel}</span>
                                        <div onClick={() => setDropFont(!dropFont)}
                                             className={classnames(styles.changeFont, {[styles.changeFontActive]: dropFont})}>
                                            <span>{value}</span>
                                            <span className={styles.changeFontSvg}>
                                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L7 7L13 1" stroke="#909190" strokeWidth="2"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                            <div
                                                className={classnames(styles.fontDropDown, {[styles.fontDropDownActive]: dropFont})}>
                                                {dataDropDownFonts.map(({text}) => (
                                                    <button style={{color: font === text && '#ff781d'}}
                                                            onClick={() => setFont(text)} type='button'>
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
                                            labelOne={labelOne && labelOne}
                                            labelSecond={labelSecond && labelSecond}
                                            max={max}
                                        />
                                    </div>
                        })}
                    </div>
                    }
                </div>
            </div>
            <div
                onMouseUp={(e) => {
                    setPositionPopUp([{x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}])
                    // console.log(e.nativeEvent)
                }}
                style={{
                    maxWidth: Number(Fields) === 2 ?
                        '792px' : Number(Fields) === 1 ?
                            '852px' : Number(Fields) === 0 ?
                                '912px' : Number(Fields) === 3 ?
                                    '732px' : '672px'
                }}
                className={styles.wrapText}>
                <h1>Гарри Поттер и философский камень</h1>
                <span>Джоан Роулинг</span>
                <h3>Глава 1. Мальчик, который выжил</h3>
                <p
                    className={styles.containerTextMain}
                    style={{
                        fontSize: `${Number(fontSize) + 16}px`,
                        lineHeight: Number(line) === 2 ?
                            '22px' : Number(line) === 1 ?
                                '21px' : Number(line) === 0 ?
                                    '18px' : Number(line) === 3 ?
                                        '24px' : '26px',
                        fontFamily: font
                    }}

                    onMouseUp={(e) => {
                        let selectText = window.getSelection().toString()
                        if (selectText.length > 0) {
                            setCurrentSelectionText(selectText)
                            getTextselection(selectText)
                        }
                    }} dangerouslySetInnerHTML={{__html: `${textPage}`}}
                />

                <div
                    onMouseUp={e => {
                        e.stopPropagation()
                    }}
                    style={{top: `${positionPopUp[0].y}px`, left: `${positionPopUp[0].x}px`}}
                    className={styles.popUpAddQuotes}>
                    <ul>
                        <li>
                            <div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.51394 8.74213C3.35214 8.74213 3.19054 8.76232 3.10994 8.80272C3.28974 8.08232 3.97134 7.27433 4.61254 6.92533C4.61394 6.92473 4.61494 6.92373 4.61614 6.92313C4.62094 6.92053 4.62574 6.91693 4.63034 6.91433L4.62974 6.91392C4.70074 6.87592 4.75074 6.80353 4.75074 6.71733C4.75026 6.68084 4.74079 6.64504 4.72317 6.61308C4.70556 6.58113 4.68033 6.55401 4.64974 6.53413L4.65474 6.52932L3.81554 5.99933L3.81294 6.00153C3.77498 5.97107 3.728 5.95405 3.67934 5.95312C3.64254 5.95312 3.60934 5.96392 3.57854 5.97952L3.57434 5.97573C2.32234 6.86413 1.49414 8.21692 1.49414 9.73172C1.49414 11.0441 2.34234 11.7911 3.29114 11.7911C4.15954 11.7911 4.88674 11.0643 4.88674 10.1957C4.88694 9.32772 4.28134 8.74213 3.51394 8.74213Z"
                                        fill="#FF781D"/>
                                    <path
                                        d="M7.62332 8.74213C7.46152 8.74213 7.29992 8.76232 7.21932 8.80272C7.39912 8.08232 8.08072 7.27433 8.72192 6.92533C8.72332 6.92473 8.72432 6.92373 8.72552 6.92313C8.73032 6.92053 8.73512 6.91693 8.73972 6.91433L8.73912 6.91392C8.81012 6.87592 8.86012 6.80353 8.86012 6.71733C8.85963 6.68084 8.85016 6.64504 8.83255 6.61308C8.81493 6.58113 8.78971 6.55401 8.75912 6.53413L8.76412 6.52932L7.92492 5.99933L7.92232 6.00153C7.88435 5.97107 7.83737 5.95405 7.78872 5.95312C7.75192 5.95312 7.71872 5.96392 7.68792 5.97952L7.68372 5.97573C6.43172 6.86413 5.60352 8.21692 5.60352 9.73172C5.60352 11.0441 6.45172 11.7911 7.40052 11.7911C8.26892 11.7911 8.99612 11.0643 8.99612 10.1957C8.99632 9.32772 8.39072 8.74213 7.62332 8.74213Z"
                                        fill="#FF781D"/>
                                    <path
                                        d="M12.5995 8.20898C11.7311 8.20898 11.0039 8.93578 11.0039 9.80438C11.0039 10.6726 11.6095 11.2582 12.3769 11.2582C12.5387 11.2582 12.7003 11.238 12.7809 11.1976C12.6011 11.918 11.9195 12.726 11.2783 13.075C11.2769 13.0756 11.2759 13.0766 11.2747 13.0772C11.2699 13.0798 11.2651 13.0834 11.2605 13.086L11.2611 13.0864C11.1901 13.1244 11.1401 13.1968 11.1401 13.283C11.1401 13.3606 11.1817 13.4256 11.2411 13.4662L11.2361 13.471L12.0753 14.001L12.0779 13.9988C12.1157 14.0274 12.1605 14.0472 12.2115 14.0472C12.2483 14.0472 12.2815 14.0364 12.3123 14.0208L12.3165 14.0246C13.5685 13.136 14.3967 11.7834 14.3967 10.2686C14.3965 8.95598 13.5483 8.20898 12.5995 8.20898Z"
                                        fill="#FF781D"/>
                                    <path
                                        d="M16.7069 8.20898C15.8385 8.20898 15.1113 8.93578 15.1113 9.80438C15.1113 10.6726 15.7169 11.2582 16.4843 11.2582C16.6461 11.2582 16.8077 11.238 16.8883 11.1976C16.7085 11.918 16.0269 12.726 15.3857 13.075C15.3843 13.0756 15.3833 13.0766 15.3821 13.0772C15.3773 13.0798 15.3725 13.0834 15.3679 13.086L15.3685 13.0864C15.2975 13.1244 15.2475 13.1968 15.2475 13.283C15.2475 13.3606 15.2891 13.4256 15.3485 13.4662L15.3435 13.471L16.1827 14.001L16.1853 13.9988C16.2231 14.0274 16.2679 14.0472 16.3189 14.0472C16.3557 14.0472 16.3889 14.0364 16.4197 14.0208L16.4239 14.0246C17.6759 13.136 18.5041 11.7834 18.5041 10.2686C18.5039 8.95598 17.6557 8.20898 16.7069 8.20898Z"
                                        fill="#FF781D"/>
                                </svg>
                            </div>
                            <span>Цитата</span>
                        </li>
                        <li>
                            <div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                                        stroke="#FF781D" strokeWidth="1.66667" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <path
                                        d="M4.16602 12.4993H3.33268C2.89065 12.4993 2.46673 12.3238 2.15417 12.0112C1.84161 11.6986 1.66602 11.2747 1.66602 10.8327V3.33268C1.66602 2.89065 1.84161 2.46673 2.15417 2.15417C2.46673 1.84161 2.89065 1.66602 3.33268 1.66602H10.8327C11.2747 1.66602 11.6986 1.84161 12.0112 2.15417C12.3238 2.46673 12.4993 2.89065 12.4993 3.33268V4.16602"
                                        stroke="#FF781D" strokeWidth="1.66667" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span>Скопировать</span>
                        </li>
                        <li>
                            <div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.33398 10V16.6667C3.33398 17.1087 3.50958 17.5326 3.82214 17.8452C4.1347 18.1577 4.55862 18.3333 5.00065 18.3333H15.0007C15.4427 18.3333 15.8666 18.1577 16.1792 17.8452C16.4917 17.5326 16.6673 17.1087 16.6673 16.6667V10"
                                        stroke="#FF781D" strokeWidth="1.66667" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <path d="M13.3327 4.99935L9.99935 1.66602L6.66602 4.99935" stroke="#FF781D"
                                          strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 1.66602V12.4993" stroke="#FF781D" strokeWidth="1.66667"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span>Поделиться</span>
                        </li>
                        <li>
                            <div>
                                <svg width="14" height="20" viewBox="0 0 14 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.66605 4.99939V3.3327C3.66605 2.89067 3.84164 2.46674 4.15421 2.15418C4.46677 1.84161 4.8907 1.66602 5.33273 1.66602H8.66611C9.10814 1.66602 9.53207 1.84161 9.84463 2.15418C10.1572 2.46674 10.3328 2.89067 10.3328 3.3327V4.99939M12.8328 4.99939V16.6662C12.8328 17.1082 12.6572 17.5322 12.3447 17.8447C12.0321 18.1573 11.6082 18.3329 11.1661 18.3329H2.8327C2.39067 18.3329 1.96674 18.1573 1.65418 17.8447C1.34161 17.5322 1.16602 17.1082 1.16602 16.6662V4.99939H12.8328Z"
                                        stroke="#FF781D" strokeWidth="1.66669" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span>Удалить</span>
                        </li>
                    </ul>
                    <div className={styles.selectColor}>
                        {dataColor.map(({color}) => (
                            <button
                                id={color}
                                onClick={() => {
                                    {
                                        setColorSelectText(color)

                                        getTextselection(currentSelectionText)
                                    }
                                }}
                                style={{background: color}} type='button'/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReaderBook;

