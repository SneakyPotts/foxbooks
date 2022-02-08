import React, {useEffect, useState, useMemo} from 'react'
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { calcTotalOffset } from '../../utils'

import styles from './styles.module.scss'

const TextWithQoutes = () => {
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

	const [quotes, setQuotes] = useState([
		{
			id: 0,
      startPosition: 100,
			endPosition: 200,
			color: 'coral'
		},
		{
			id: 1,
      startPosition: 600,
			endPosition: 700,
			color: 'cornflowerblue'
		},
		{
			id: 2,
			startPosition: 1000,
			endPosition: 1200,
			color: 'yellow'
		},
		{
			id: 3,
			startPosition: 2700,
			endPosition: 3000,
			color: 'lightgreen'
		},
		{
			id: 4,
			startPosition: 4000,
			endPosition: 4100,
			color: 'blueviolet'
		}		
	]);

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
							onClick={() => deleteQuot(domNode?.attribs['data-id'])}
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
			const x = ev?.clientX || ev?.changedTouches[0]?.clientX
			const y = ev?.clientY || ev?.changedTouches[0]?.clientY
			setToolsCoords({x, y})
			setToolsIsVisible(true)
		} else {
			setToolsIsVisible(false)
		}
	}

	const addQuot = () => {
		const range = window.getSelection().getRangeAt(0)

		const startPosition = calcTotalOffset(range.startContainer, range.startOffset)
		const endPosition = calcTotalOffset(range.endContainer, range.endOffset)

		let isError = false

		quotes?.forEach(i => {
			if(
				(startPosition >= i?.startPosition && startPosition <= i?.endPosition) ||
				(endPosition >= i?.startPosition && endPosition <= i?.endPosition) ||
				(startPosition < i?.startPosition && endPosition > i?.endPosition)
			) {
				isError = true
				return
			}
		})

		if(!isError) {
			setQuotes(prev => [...prev, {
				id: quotes?.length,
				startPosition,
				endPosition,
				color: 'grey'
			}])
		}
	}
	
	const deleteQuot = id => {
		setQuotes(prev => prev?.filter(i => i?.id !== +id))
	}

	useEffect(() => {
		generateQuotes()
	}, [quotes])

	return (
		<>
			<h1 className={styles.bookTitle}>Гарри Поттер и философский камень</h1>
			<span className={styles.bookAuthor}>Джоан Роулинг</span>
			<h2 className={styles.bookSubtitle}>Глава 1. Мальчик, который выжил</h2>

			<div
				id='range-parent'
				className={styles.bookText}
				onMouseUp={ev => mouseUpHandler(ev)}
			>
				<span>{changedFirstColumn}</span>
				<span>{changedSecondColumn}</span>

				{toolsIsVisible &&
					<div
						style={{
							position: 'absolute',
							top: toolsCoords.y + 'px',
							left: toolsCoords.x + 'px',
							background: '#ccc',
							padding: '30px'
						}}
					>
						<button onClick={addQuot}>add quot</button>
					</div>
				}
			</div>
		</>
	)
}

export default TextWithQoutes;