import React, {useEffect, useState, useMemo} from 'react'
import {useSelector} from "react-redux";
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { calcTotalOffset } from '../../utils'
import AddQout from "./AddQout";

import styles from './styles.module.scss'

const TextWithQoutes = () => {
	const { settings } = useSelector(state => state?.reader)

	const initialText = `		Мистер и миссис Дурсль проживали в доме номер четыре по Тисовой улице и всегда с гордостью заявляли, что они, слава богу, абсолютно нормальные люди. Уж от кого-кого, а от них никак нельзя было ожидать, чтобы они попали в какую-нибудь странную или загадочную ситуацию. Мистер и миссис Дурсль весьма неодобрительно относились к любым странностям, загадкам и прочей ерунде.
		Мистер Дурсль возглавлял фирму под названием «Граннингс», которая специализировалась на производстве дрелей. Это был полный мужчина с очень пышными усами и очень короткой шеей. Что же касается миссис Дурсль, она была тощей блондинкой с шеей почти вдвое длиннее, чем положено при ее росте. Однако этот недостаток пришелся ей весьма кстати, поскольку большую часть времени миссис Дурсль следила за соседями и подслушивала их разговоры. А с такой шеей, как у нее, было очень удобно заглядывать за чужие заборы. У мистера и миссис Дурсль был маленький сын по имени Дадли, и, по их мнению, он был самым чудесным ребенком на свете.
		Семья Дурсль ей имела все, чего только можно пожелать. Но был у них и один секрет. Причем больше всего на свете они боялись, что кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что с ними будет, если выплывет правда о Поттерах. Миссис Поттер приходилась миссис Дурсль родной сестрой, но они не виделись вот уже несколько лет. Миссис Дурсль даже делала вид, что у нее вовсе нет никакой сестры, потому что сестра и ее никчемный муж были полной противоположностью Дурслям.
		Дурсли содрогались при одной мысли о том, что скажут соседи, если на Тисовую улицу пожалуют Поттеры. Дурсли знали, что у Поттеров тоже есть маленький сын, но они никогда его не видели. И они категорически не хотели, чтобы их Дадли общался с ребенком таких родителей.
		Когда во вторник мистер и миссис Дурсль проснулись скучным и серым утром — а именно с этого утра начинается наша история, — ничто, включая покрытое тучами небо, не предвещало, что вскоре по всей стране начнут происходить странные и загадочные вещи. Мистер Дурсль что-то напевал себе под нос, завязывая самый отвратительный из своих галстуков. А миссис Дурсль, с трудом усадив сопротивляющегося и орущего Дадли на высокий детский стульчик, со счастливой улыбкой пересказывала мужу последние сплетни.
		Никто из них не заметил, как за окном пролетела большая сова-неясыть.
		В половине девятого мистер Дурсль взял свой портфель, клюнул миссис Дурсль в щеку и попытался на прощанье поцеловать Дадли, но промахнулся, потому что Дадли впал в ярость, что с ним происходило довольно часто. Он раскачивался взад-вперед на стульчике, ловко выуживал из тарелки кашу и заляпывал ею стены.
		— Ух, ты моя крошка, — со смехом выдавил из себя мистер Дурсль, выходя из дома.
		Он сел в машину и выехал со двора.
		На углу улицы мистер Дурсль заметил, что происходит что-то странное, — на тротуаре стояла кошка и внимательно изучала лежащую перед ней карту. В первую секунду мистер Дурсль даже не понял, что именно он увидел, но затем, уже миновав кошку, затормозил и резко оглянулся. На углу Тисовой улицы действительно стояла полосатая кошка, но никакой карты видно не было.
		— И привидится же такое! — буркнул мистер Дурсль.
		Наверное, во всем были виноваты мрачное утро и тусклый свет фонаря. На всякий случай мистер Дурсль закрыл глаза, потом открыл их и уставился на кошку. А кошка уставилась на него.
		Мистер Дурсль отвернулся и поехал дальше, продолжая следить за кошкой в зеркало заднего вида. Он заметил, что кошка читает табличку, на которой написано «Тисовая улица». Нет, конечно же, не читает, поспешно поправил он самого себя, а просто смотрит на табличку. Ведь кошки не умеют читать — равно как и изучать карты.
		Мистер Дурсль потряс головой и попытался выбросить из нее кошку. И пока его автомобиль ехал к Лондону из пригорода, мистер Дурсль думал о крупном заказе на дрели, который рассчитывал сегодня получить.
		Но когда он подъехал к Лондону, заполнившие его голову дрели вылетели оттуда в мгновение ока, потому что, попав в обычную утреннюю автомобильную пробку и от нечего делать глядя по сторонам, мистер Дурсль заметил, что на улицах появилось множество очень странно одетых людей. Людей в мантиях. Мистер Дурсль не переносил людей в нелепой одежде, да взять хотя бы нынешнюю молодежь, которая расхаживает черт знает в чем! И вот теперь эти, нарядившиеся по какой-то дурацкой моде.
		Мистер Дурсль забарабанил пальцами по рулю. Его взгляд упал на сгрудившихся неподалеку странных типов, оживленно шептавшихся друг с другом. Мистер Дурсль пришел в ярость, увидев, что некоторые из них совсем не молоды, — подумать только, один из мужчин выглядел даже старше него, а позволил себе облачиться в изумрудно-зеленую мантию! Ну и тип! Но тут мистера Дурсля осенила мысль, что эти непонятные личности наверняка всего лишь собирают пожертвования или что-нибудь в этом роде… Так оно и есть! Стоявшие в пробке машины наконец тронулись с места, и несколько минут спустя мистер Дурсль въехал на парковку фирмы «Граннингс». Его голова снова была забита дрелями.
		Кабинет мистера Дурсля находился на девятом этаже, где он всегда сидел спиной к окну. Предпочитай он сидеть лицом к окну, ему, скорее всего, трудно было бы этим утром сосредоточиться на дрелях. Но он сидел к окну спиной и не видел пролетающих сов — подумать только, сов, летающих не ночью, когда им и положено, а средь бела дня! И это уже не говоря о том, что совы — лесные птицы, и в городах, тем более таких больших, как Лондон, не живут.
		В отличие от мистера Дурсля, находившиеся на улице люди отлично видели этих сов, стремительно пролетающих мимо них одна за другой, и широко раскрывали рты от удивления и показывали на них пальцами. Большинство этих людей в жизни своей не видели ни единой совы, даже в ночное время.`

	const firstColumn = useMemo(() => initialText?.slice(0, initialText?.length / 2), [initialText])
	const secondColumn = useMemo(() => initialText?.slice(initialText?.length / 2), [initialText])

	const [changedFirstColumn, setChangedFirstColumn] = useState(firstColumn)
	const [changedSecondColumn, setChangedSecondColumn] = useState(secondColumn)

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 });

	//========= ПЕРЕДЕЛАТЬ ПРОПС currColor !!!!!!!!!!!! =========================
	const [quotes, setQuotes] = useState([
		{
			id: 0,
      startPosition: 100,
			endPosition: 200,
			text: 'и, что они, слава богу, абсолютно нормальные люди. Уж от кого-кого, а от них никак нельзя было ожида',
			color: '#A5D5FF'
		},
		{
			id: 1,
      startPosition: 600,
			endPosition: 700,
			text: 'ондинкой с шеей почти вдвое длиннее, чем положено при ее росте. Однако этот недостаток пришелся ей в',
			color: '#FFE371'
		},
		{
			id: 2,
			startPosition: 1000,
			endPosition: 1200,
			text: '\t\tСемья Дурсль ей имела все, чего только можно пожелать. Но был у них и один секрет. Причем больше всего на свете они боялись, что кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что ',
			color: '#FED3CA'
		},
		{
			id: 3,
			startPosition: 2700,
			endPosition: 3000,
			text: 'ль, выходя из дома.\n' +
					'\t\tОн сел в машину и выехал со двора.\n' +
					'\t\tНа углу улицы мистер Дурсль заметил, что происходит что-то странное, — на тротуаре стояла кошка и внимательно изучала лежащую перед ней карту. В первую секунду мистер Дурсль даже не понял, что именно он увидел, но затем, уже миновав кошку, з',
			color: '#B8DF70'
		},
		{
			id: 4,
			startPosition: 4000,
			endPosition: 4100,
			text: ' утреннюю автомобильную пробку и от нечего делать глядя по сторонам, мистер Дурсль заметил, что на у',
			color: '#A5D5FF'
		}		
	]);

	const [selectedText, setSelectedText] = useState('');
	const [startPosition, setStartPosition] = useState(null);
	const [endPosition, setEndPosition] = useState(null);
	const [markId, setMarkId] = useState(null);

	const generateQuotes = () => {
		const sortedQuotes = quotes
			?.sort((a, b) => a?.startPosition - b?.startPosition)
			?.map(i => {
				if(i?.startPosition < firstColumn?.length && i?.endPosition > firstColumn?.length) {
					return [
						{
							...i,
							endPosition: firstColumn?.length
						},
						{
							...i,
							startPosition: 0
						}
					]
				} else {
					return i
				}
			})
			?.flat()

		let firstColumnQuotes = sortedQuotes?.filter(i => i?.startPosition < firstColumn?.length && i?.endPosition <= firstColumn?.length)
		let secondColumnQuotes = sortedQuotes?.filter(i => i?.endPosition > firstColumn?.length)

		let pos = 0
		let firstColumnArr = []
		let secondColumnArr = []		

		firstColumnQuotes.forEach(i => {
			firstColumnArr.push(
				firstColumn.slice(pos, i?.startPosition),
				`<mark data-id="${i?.id}" style="background: ${i?.color}">${
					firstColumn.slice(i?.startPosition, i?.endPosition)
				}</mark>`
			)
			pos = i?.endPosition
		})

		firstColumnArr.push(firstColumn.slice(pos))
		pos = 0

		secondColumnQuotes.forEach(i => {
			secondColumnArr.push(
				secondColumn.slice(pos, i?.startPosition - firstColumn?.length),
				`<mark data-id="${i?.id}" style="background: ${i?.color}">${
					secondColumn.slice(
						i?.startPosition - firstColumn?.length,
						i?.endPosition - firstColumn?.length
					)
				}</mark>`
			)
			pos = i?.endPosition - firstColumn?.length
		})

		secondColumnArr.push(secondColumn.slice(pos))

		const options = {
			replace: domNode => {
				if(domNode?.type === 'tag' && domNode?.name === 'mark') {
					return (
						<mark
							onClick={ev => handleMarkClick(ev, domNode?.attribs['data-id'])}
							{...attributesToProps(domNode?.attribs)}
						>
							{domToReact(domNode?.children)}
						</mark>
					)
				}
			}
		}

		setChangedFirstColumn(parse(firstColumnArr.join(''), options))
		setChangedSecondColumn(parse(secondColumnArr.join(''), options))
	}

	const mouseUpHandler = ev => {
		const text = window.getSelection().toString()

		if(text?.length && text !== ' ') {
			setSelectedText(text)
			const range = window.getSelection().getRangeAt(0)

			setStartPosition(calcTotalOffset(range.startContainer, range.startOffset))
			setEndPosition(calcTotalOffset(range.endContainer, range.endOffset))

			const x = ev?.nativeEvent.layerX
			const y = ev?.nativeEvent.layerY
			setToolsCoords({x, y})
			setToolsIsVisible(true)
		} else {
			setMarkId(null)
			setToolsIsVisible(false)
		}
	}

	const handleMarkClick = (ev, id) => {
		setMarkId(id)
		const x = ev?.pageX
		const y = ev?.pageY
		setToolsCoords({x, y})
		setToolsIsVisible(true)
	}

	const addQuot = color => {
		let isError = false

		quotes?.forEach(i => {
			if(
				(startPosition >= i?.startPosition && startPosition <= i?.endPosition) ||
				(endPosition >= i?.startPosition && endPosition <= i?.endPosition) ||
				(startPosition < i?.startPosition && endPosition > i?.endPosition)
			) {
				isError = true
				setToolsIsVisible(false)
			}
		})

		if(!isError) {
			setMarkId(quotes?.length)
			setQuotes(prev => [...prev, {
				id: quotes?.length,
				startPosition,
				endPosition,
				text: selectedText,
				color: color
			}])
		}
	}

	const changeColor = color => {
		setQuotes(prev => prev.map(i => {
			return i?.id == markId ?
				{
					...i,
					color
				} :
				i
		}))
	}
	
	const deleteQuot = () => {
		setQuotes(prev => prev?.filter(i => i?.id !== +markId))
		setMarkId(null)
		setToolsIsVisible(false)
	}

	const copyText = () => {
		const text = quotes?.find(i => i?.id == markId)?.text || selectedText
		navigator.clipboard.writeText(text?.trim())
	}

	const width = useMemo(() => {
		switch (settings?.fieldSize ) {
			case '0':
				return 672
			case '1':
				return 732
			case '2':
				return 792
			case '3':
				return 852
			case '4':
				return 912
		}
	}, [settings?.fieldSize])

	const lineHeight = useMemo(() => {
		switch (settings?.rowHeight  ) {
			case '0':
				return 18
			case '1':
				return 20
			case '2':
				return 22
			case '3':
				return 24
			case '4':
				return 25
		}
	}, [settings?.rowHeight ])

	useEffect(() => {
		generateQuotes()
	}, [quotes])

	useEffect(() => {
		setMarkId(null)
	}, [selectedText])

	return (
		<>
			<h1 className={styles.bookTitle}>Гарри Поттер и философский камень</h1>
			<span className={styles.bookAuthor}>Джоан Роулинг</span>
			<h2 className={styles.bookSubtitle}>Глава 1. Мальчик, который выжил</h2>

			<div
				id='range-parent'
				className={styles.bookText}
				onMouseUp={ev => mouseUpHandler(ev)}
				style={{
					display: settings?.isTwoColumns ? 'flex' : 'block',
					fontFamily: settings?.fontName,
					fontSize: `${+settings?.fontSize + 16}px`,
					width: settings?.isTwoColumns ? '100%' : width + 'px',
					lineHeight: lineHeight + 'px',
					textAlign: settings?.isCenterAlignment ? 'justify' : 'left',
					whiteSpace: settings?.isCenterAlignment ? 'normal' : 'break-spaces'
				}}
			>
				<span
					style={{marginRight: settings?.isTwoColumns ? '104px' : 0}}
				>
					{changedFirstColumn}
				</span>
				<span>{changedSecondColumn}</span>

				{toolsIsVisible &&
					<AddQout
						style={{
							top: toolsCoords.y + 'px',
							left: toolsCoords.x + 'px',
						}}
						markId={markId}
						currColor={quotes?.find(i => i?.id == markId)?.color}
						addQuot={addQuot}
						changeColor={changeColor}
						deleteQuot={deleteQuot}
						copyText={copyText}
					/>
				}
			</div>
		</>
	)
}

export default TextWithQoutes;