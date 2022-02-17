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

	const initialText = useMemo(() => {
		const str = book?.pages[0]?.content
		return str.slice(str?.indexOf('>') + 1, str?.length - 7)
	}, [book])

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
		{
			// endContainer: "/p 7/i 1/text 1",
			// endOffset: 12,
			// startContainer: "/p 7/text 1",
			// startOffset: 251
			endContainer: "/p 5/i 1/text 1",
endOffset: 18,
startContainer: "/p 5/text 1",
startOffset: 226
		}
	]);

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 });

	const [selectedText, setSelectedText] = useState('');
	const [startPosition, setStartPosition] = useState(null);
	const [endPosition, setEndPosition] = useState(null);
	const [markId, setMarkId] = useState(null);

	const [isError, setIsError] = useState(false);

	const generateQuotes = () => {
		// const sortedQuotes = quotes?.sort((a, b) => a?.startPosition - b?.startPosition)

		// let pos = 0	
		// const textWithQuotes = []

		// sortedQuotes.forEach(i => {
		// 	textWithQuotes.push(
		// 		initialText.slice(pos, i?.startPosition),
		// 		`<mark data-id="${i?.id}" style="background: ${i?.color}">${
		// 			initialText.slice(i?.startPosition, i?.endPosition)
		// 		}</mark>`
		// 	)
		// 	pos = i?.endPosition
		// })

		// textWithQuotes.push(initialText.slice(pos))

		let arr = []
		parse(initialText, {
			replace: domNode => {
				arr.push(domNode)
			}
		})


		const perebor = (arr, index, nodes) => {
			const tag = arr[index].split(' ')[0]
			const num = +arr[index].split(' ')[1]
			let tagCount = 0
			let str = ''

			nodes.forEach(i => {
				if((tag === 'text' && i?.type === 'text') || i?.name === tag) {
					tagCount++
					if(tagCount === num) {
						if(index !== arr?.length - 1) {
							perebor(arr, index + 1, i?.children)
						} else {
							str = i?.data
						}
					}
				}
			})
		}
		
		quotes.forEach(i => {
			const start = i?.startContainer?.split('/')?.slice(1)
			const end = i?.endContainer?.split('/')?.slice(1)

			// console.log('start', start);
			// console.log('end', end);			
			
			const str1 = perebor(start, 0, arr)			
			const str2 = perebor(end, 0, arr)
			console.log(str1);	
			console.log(str2);	
		})


		const options = {
			replace: domNode => {
				if(domNode?.name === 'a') {
					return <>
						{domToReact(domNode?.children, options)}
					</>
				} else if(domNode?.name === 'img') {
					return (
						<img
							{...attributesToProps({
								...domNode?.attribs,
								src: `http://loveread.webnauts.pw/${domNode?.attribs?.src}`
							})}
						/>
					)
				} else if(domNode?.name === 'mark') {
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

		// setChangedText(parse(textWithQuotes.join(''), options))
		setChangedText(parse(initialText, options))
	}

	const getXpathParameters = xpath => {
		const startOffset = xpath.startOffset
		const endOffset = xpath.endOffset
		let startContainer = xpath.start
		startContainer = startContainer.replace(/\(|\)/g, "").replace(/\[/g, " ").replace(/\]/g, "")
		let endContainer = xpath.end
		endContainer = endContainer.replace(/\(|\)/g, "").replace(/\[/g, " ").replace(/\]/g, "")
		return { startOffset, endOffset, startContainer, endContainer }
	}

	const mouseUpHandler = ev => {
		const text = window.getSelection().toString()

		if(text?.length && text !== ' ') {
			setSelectedText(text)

			const range = window.getSelection().getRangeAt(0)
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