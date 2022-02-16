import React, {useEffect, useState, useMemo} from 'react'
import {useSelector} from "react-redux";
import Link from 'next/link';
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { calcTotalOffset } from '../../utils'
import AddQout from "./AddQout";
import { fromRange } from "xpath-range"
import styles from './styles.module.scss'

const TextWithQoutes = () => {
	const { book, settings } = useSelector(state => state?.reader)

	const initialText = useMemo(() => (
		book?.pages[0]?.content
			// .replaceAll(/<\/?(?!img(?:\s|>))[a-z][^>]*(>|$)/gi, "")
			// .replaceAll('\n \n', ' ')
	), [book])

	const [changedText, setChangedText] = useState(initialText)

	//========= ПЕРЕДЕЛАТЬ ПРОПС currColor !!!!!!!!!!!! =========================
	const [quotes, setQuotes] = useState([
		// {
		// 	id: 0,
    //   startPosition: 0,
		// 	endPosition: 200,
		// 	text: 'и, что они, слава богу, абсолютно нормальные люди. Уж от кого-кого, а от них никак нельзя было ожида',
		// 	color: '#A5D5FF'
		// },
		// {
		// 	id: 1,
    //   startPosition: 600,
		// 	endPosition: 700,
		// 	text: 'ондинкой с шеей почти вдвое длиннее, чем положено при ее росте. Однако этот недостаток пришелся ей в',
		// 	color: '#FFE371'
		// },
		// {
		// 	id: 2,
		// 	startPosition: 1000,
		// 	endPosition: 1200,
		// 	text: '\t\tСемья Дурсль ей имела все, чего только можно пожелать. Но был у них и один секрет. Причем больше всего на свете они боялись, что кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что ',
		// 	color: '#FED3CA'
		// },
		// {
		// 	id: 3,
		// 	startPosition: 2700,
		// 	endPosition: 3000,
		// 	text: 'ль, выходя из дома.\n' +
		// 			'\t\tОн сел в машину и выехал со двора.\n' +
		// 			'\t\tНа углу улицы мистер Дурсль заметил, что происходит что-то странное, — на тротуаре стояла кошка и внимательно изучала лежащую перед ней карту. В первую секунду мистер Дурсль даже не понял, что именно он увидел, но затем, уже миновав кошку, з',
		// 	color: '#B8DF70'
		// },
		// {
		// 	id: 4,
		// 	startPosition: 4000,
		// 	endPosition: 4100,
		// 	text: ' утреннюю автомобильную пробку и от нечего делать глядя по сторонам, мистер Дурсль заметил, что на у',
		// 	color: '#A5D5FF'
		// }		
	]);

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 });

	const [selectedText, setSelectedText] = useState('');
	const [startPosition, setStartPosition] = useState(null);
	const [endPosition, setEndPosition] = useState(null);
	const [markId, setMarkId] = useState(null);

	const [isError, setIsError] = useState(false);

	const generateQuotes = () => {
		const sortedQuotes = quotes?.sort((a, b) => a?.startPosition - b?.startPosition)

		let pos = 0	
		const textWithQuotes = []

		sortedQuotes.forEach(i => {
			textWithQuotes.push(
				initialText.slice(pos, i?.startPosition),
				`<mark data-id="${i?.id}" style="background: ${i?.color}">${
					initialText.slice(i?.startPosition, i?.endPosition)
				}</mark>`
			)
			pos = i?.endPosition
		})

		textWithQuotes.push(initialText.slice(pos))

		const options = {
			replace: domNode => {
				if(domNode?.type === 'tag' && domNode?.name === 'img') {
					return (
						<img
							{...attributesToProps({
								...domNode?.attribs,
								src: `http://loveread.webnauts.pw/${domNode?.attribs?.src}`
							})}
						/>
					)
				} else if(domNode?.type === 'tag' && domNode?.name === 'mark') {
					return (
						<mark
							onClick={ev => handleMarkClick(ev, domNode?.attribs['data-id'])}
							{...attributesToProps(domNode?.attribs)}
						>
							{domToReact(domNode?.children, options)}
						</mark>
					)
				} 
			}
		}

		setChangedText(parse(textWithQuotes.join(''), options))
	}

	const getXpathParameters = xpath => {
		const startOffset = xpath.startOffset
		const endOffset = xpath.endOffset
		let startContainer = xpath.start
		startContainer = startContainer.replace(/\(|\)/g, "")
		let endContainer = xpath.end
		endContainer = endContainer.replace(/\(|\)/g, "")
		return { startOffset, endOffset, startContainer, endContainer }
	}

	const mouseUpHandler = ev => {
		const text = window.getSelection().toString()

		if(text?.length && text !== ' ') {
			setSelectedText(text)

			const range = window.getSelection().getRangeAt(0)
			console.log('range', range);
			// const startPos = calcTotalOffset(range.startContainer, range.startOffset)
			// const endPos = calcTotalOffset(range.endContainer, range.endOffset)
			const xpath = fromRange(range, document.querySelector('#range-parent'))
			const test = getXpathParameters(xpath)

			console.log('test', test);
			// setStartPosition(startPos)
			// setEndPosition(endPos)

			// const err = quotes?.some(i => 
			// 	(startPos >= i?.startPosition && startPos <= i?.endPosition) ||
			// 	(endPos >= i?.startPosition && endPos <= i?.endPosition) ||
			// 	(startPos < i?.startPosition && endPos > i?.endPosition)
			// )

			// setIsError(err);

			const x = ev?.nativeEvent.layerX
			const y = ev?.nativeEvent.layerY
			setToolsCoords({x, y})
			setToolsIsVisible(true)
		} else {
			setToolsIsVisible(false)
			setMarkId(null)
			setIsError(false)
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
		setMarkId(quotes?.length + 1)
		setQuotes(prev => [...prev, {
			id: quotes?.length + 1,
			startPosition,
			endPosition,
			text: selectedText,
			color: color
		}])
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

	// useEffect(() => {
	// 	let range = new Range();

  //   range.setStart(t, 2);
  //   range.setEnd(t, 24);
  //   document.getSelection().removeAllRanges();
  //   document.getSelection().addRange(range);
	// }, [])

	useEffect(() => {
		generateQuotes()
	}, [quotes, book])

	useEffect(() => {
		setMarkId(null)
	}, [selectedText])

	return (
		<>
			<h1 className={styles.bookTitle}>{book?.title}</h1>

			<Link href={`author?id=${book?.authors[0]?.id}`}>
				<a className={styles.bookAuthor}>{book?.authors[0]?.author}</a>
			</Link>

			<h2 className={styles.bookSubtitle}>Глава 1. Мальчик, который выжил</h2>

			<article
				id='range-parent'
				className={styles.bookText}
				onMouseUp={ev => mouseUpHandler(ev)}
				onTouchEnd={ev => mouseUpHandler(ev)}
				style={{
					fontFamily: settings?.fontName,
					fontSize: `${+settings?.fontSize + 16}px`,
					maxWidth: settings?.isTwoColumns ? '100%' : width + 'px',
					lineHeight: lineHeight + 'px',
					textAlign: settings?.isCenterAlignment ? 'justify' : 'left',
					columnCount: settings?.isTwoColumns ? 2 : 1,
					columnGap: settings?.isTwoColumns ? '104px' : 0
				}}
			>
				{changedText}

				{toolsIsVisible &&
					<AddQout
						style={{
							top: toolsCoords.y + 'px',
							left: toolsCoords.x + 'px',
						}}
						isError={isError}
						markId={markId}
						currColor={quotes?.find(i => i?.id == markId)?.color}
						addQuot={addQuot}
						changeColor={changeColor}
						deleteQuot={deleteQuot}
						copyText={copyText}
					/>
				}
			</article>
		</>
	)
}

export default TextWithQoutes;