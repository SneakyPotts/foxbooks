import React, {useEffect, useState, useMemo, useRef} from 'react'
import {useSelector} from "react-redux";
import Link from 'next/link';
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import AddQout from "./AddQout";
import { highlight, rangeToObj, objToRange, addKey } from './../../utils'
import styles from './styles.module.scss'
import { addQuotes, deleteQuotes, editQuotes } from '../../store/readerSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const options = {
	replace: domNode => {
		if(domNode?.name === 'a' || domNode?.name === 'html' || domNode?.name === 'body') {
			return <>
				{domToReact(domNode?.children, options)}
			</>
		} else if(domNode?.name === 'img') {
			return (
				<img
					{...attributesToProps({
						...domNode?.attribs,
						src: `https://loveread.webnauts.pro${domNode?.attribs?.src}`
					})}
				/>
			)
		}
	}
}

const TextWithQoutes = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const article = useRef()

	const { innerWidthWindow } = useSelector(state => state?.common)
	const { book, settings, quotes } = useSelector(state => state?.reader)

	const text = useMemo(() => {
		const str = book?.pages[0]?.content
			.replace(/<(\/*)(html|body)[^>]*>/g, '')
			.replace('<div class="MsoNormal" style="margin:15px; text-align:left; width:800px; color:#333333;">', '')
			.slice(0, -7)

		return parse(str, options)
	}, [book])

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 })

	const [selectedText, setSelectedText] = useState('')
	const [rangeObj, setRangeObj] = useState(null)
	const [markId, setMarkId] = useState(null)

	const [isError, setIsError] = useState(false)

	const mouseUpHandler = ev => {
		setMarkId(null)
		const text = window.getSelection().toString()

		if(text?.length && text !== ' ') {
			ev.preventDefault()
			setSelectedText(text)

			const range = window.getSelection().getRangeAt(0)
			const obj = rangeToObj(range)
			setRangeObj(obj)

			const err = quotes?.some(() => !obj.startKey || !obj.endKey)
			setIsError(err);

			const x = ev?.pageX || ev?.changedTouches[0]?.pageX 
			const y = ev?.pageY || ev?.changedTouches[0]?.pageY
			setToolsCoords({x, y})
			setToolsIsVisible(true)
		} else {
			setToolsIsVisible(false)			
			setIsError(false)
		}
	}

	const handleMarkClick = (ev, id) => {
		ev.stopPropagation()
		setMarkId(id)
		const x = ev?.pageX || ev?.changedTouches[0]?.pageX 
		const y = ev?.pageY || ev?.changedTouches[0]?.pageY
		setToolsCoords({x, y})
		setToolsIsVisible(true)
	}

	const addQuot = color => {
		const id = quotes?.length + 1
		const quot = {
			...rangeObj,
			text: selectedText,
			id,
			color
		}

		setMarkId(id)

		const sel = window.getSelection()
		sel.removeAllRanges()

		sel.addRange(objToRange(rangeObj))
		highlight(id, color, handleMarkClick)

		dispatch(addQuotes(quot))

		sel.removeAllRanges()
		setToolsIsVisible(false)
	}

	const changeColor = color => {
		const marks = document.querySelectorAll(`[data-id="${markId}"]`)
		marks.forEach(i => i.style.backgroundColor = color)
		
		dispatch(editQuotes({id: markId, color}))
	}
	
	const deleteQuot = () => {
		const marks = document.querySelectorAll(`[data-id="${markId}"]`)
		marks.forEach(i => {
			const html = document.createTextNode(i.innerHTML)
			i.parentNode.insertBefore(html, i)
			i.remove()
		})

		dispatch(deleteQuotes(markId))
		setMarkId(null)
		setToolsIsVisible(false)
	}

	const copyText = () => {
		const text = quotes?.find(i => i?.id == markId)?.text || selectedText
		navigator.clipboard.writeText(text?.trim())
	}

	const shareQuot = () => {
		let query = quotes?.find(i => i.id === markId) || rangeObj

		let str = `http://localhost:3000${router.asPath}
			&startKey=${query.startKey}
			&startTextIndex=${query.startTextIndex}
			&startOffset=${query.startOffset}
			&endKey=${query.endKey}
			&endTextIndex=${query.endTextIndex}
			&endOffset=${query.endOffset}`

		navigator.clipboard.writeText(str)
	}

	const width = useMemo(() => {
		switch (settings?.fieldSize ) {
			case 0:
				return 672
			case 1:
				return 732
			case 2:
				return 792
			case 3:
				return 852
			case 4:
				return 912
		}
	}, [settings?.fieldSize])

	const lineHeight = useMemo(() => {
		switch (settings?.rowHeight  ) {
			case 0:
				return 18
			case 1:
				return 20
			case 2:
				return 22
			case 3:
				return 24
			case 4:
				return 25
		}
	}, [settings?.rowHeight ])

	useEffect(() => {
		addKey(article.current)

		const sel = window.getSelection()
    	sel.removeAllRanges()

		if(quotes?.length) {
			quotes?.forEach(i => {
				sel.addRange(objToRange(i))
				highlight(i.id, i.color, handleMarkClick)
			})
		}

		const query = router.query

		if(query.hasOwnProperty('startKey')) {
			sel.addRange(objToRange(query))

			setTimeout(() => {
				document.querySelector(`[data-key="${query.startKey}"]`).scrollIntoView({behavior: 'smooth'})
			}, 300)

			router.replace(`http://localhost:3000/reader?id=${query.id}&page=${query.page}`, null, {scroll: false})
		}
	}, [])

	return (
		<>
			<h1 className={styles.bookTitle}>{book?.title}</h1>

			<Link href={`author?id=${book?.authors[0]?.id}`}>
				<a className={styles.bookAuthor}>{book?.authors[0]?.author}</a>
			</Link>

			<h2 className={styles.bookSubtitle}>Глава 1. Мальчик, который выжил</h2>

			<article
				ref={article}
				className={styles.bookText}
				onMouseUp={ev => mouseUpHandler(ev)}
				onTouchEnd={ev => mouseUpHandler(ev)}
				style={{
					fontFamily: settings?.fontName,
					fontSize: `${+settings?.fontSize + 16}px`,
					maxWidth: settings?.isTwoColumns ? '100%' : width + 'px',
					lineHeight: lineHeight + 'px',
					textAlign: settings?.isCenterAlignment ? 'justify' : 'left',
					columnCount: settings?.isTwoColumns && innerWidthWindow ? 2 : 1,
					columnGap: settings?.isTwoColumns ? '104px' : 0
				}}
			>
				{text}

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
						shareQuot={shareQuot}
					/>
				}
			</article>
		</>
	)
}

export default TextWithQoutes