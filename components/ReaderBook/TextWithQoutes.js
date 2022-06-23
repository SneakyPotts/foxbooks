import React, {useEffect, useState, useMemo, useRef} from 'react'
import {useSelector} from "react-redux";
import Link from 'next/link';
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import AddQout from "./AddQout";
import {highlight, rangeToObj, objToRange, addKey, key, keyObj} from './../../utils'
import styles from './styles.module.scss'
import {addBookQuote, deleteBookQuote, editBookQuote} from '../../store/readerSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {setAuthPopupVisibility} from "../../store/commonSlice";

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
	const { isAuth } = useSelector(state => state?.auth)
	const { book, settings, quotes, quotesIsLoading } = useSelector(state => state?.reader)

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
			// ev.stopPropagation()
			setSelectedText(text)

			const range = window.getSelection().getRangeAt(0)
			const obj = rangeToObj(range)
			setRangeObj(obj)

			const err = quotes?.some(() => !obj.startKey || !obj.endKey) || text?.length > 300
			setIsError(err);

			const x = ev?.pageX || ev?.changedTouches[0]?.pageX
			const y = ev?.pageY || ev?.changedTouches[0]?.pageY

			const toolsWidth = 291
			const windowWidth = window.innerWidth
			const deltaX = windowWidth - x

			setToolsCoords({x: toolsWidth >= deltaX ? x - toolsWidth : x, y})
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

		const toolsWidth = 291
		const windowWidth = window.innerWidth
		const deltaX = windowWidth - x

		setToolsCoords({x: toolsWidth >= deltaX ? x - toolsWidth : x, y})
		setToolsIsVisible(true)
	}

	const addQuot = async color => {
		if(!isAuth) {
			dispatch(setAuthPopupVisibility(true))
		} else {
			const quot = {
				...rangeObj,
				book_id: book?.pages[0]?.book_id,
				page_id: book?.pages[0]?.id,
				text: selectedText,
				color
			}

			const { payload } = await dispatch(addBookQuote(quot))
			const id = payload?.id

			setMarkId(id)

			const sel = window.getSelection()
			sel.removeAllRanges()

			sel.addRange(objToRange(rangeObj))
			highlight(id, color, handleMarkClick)

			sel.removeAllRanges()
			setToolsIsVisible(false)
            setSelectedText('')
		}
	}

	const changeColor = color => {
		if(!isAuth) {
			dispatch(setAuthPopupVisibility(true))
		} else {
			const marks = document.querySelectorAll(`[data-id="${markId}"]`)
			marks.forEach(i => i.style.backgroundColor = color)

			dispatch(editBookQuote({id: markId, color}))
		}
	}
	
	const deleteQuot = () => {
		if(!isAuth) {
			dispatch(setAuthPopupVisibility(true))
		} else {
			const marks = document.querySelectorAll(`[data-id="${markId}"]`)
			marks.forEach(i => {
				const html = document.createTextNode(i.innerHTML)
				i.parentNode.insertBefore(html, i)
				i.remove()
			})

			dispatch(deleteBookQuote(markId))
			setMarkId(null)
			setToolsIsVisible(false)
		}
	}

	const copyText = () => {
		const text = quotes?.find(i => i?.id == markId)?.text || selectedText
		navigator.clipboard.writeText(text?.trim())
		setToolsIsVisible(false)
        setSelectedText('')
	}

	const shareQuot = () => {
		let quot = selectedText?.length ? rangeObj : quotes?.find(i => i.id === markId)

		const isQuot = quot.hasOwnProperty('id')

        console.log(quot)

		let str = `${window.location.origin}${router.asPath}
			&startKey=${!isQuot ? quot.startKey : quot.start_key}
			&startTextIndex=${!isQuot ? quot.startTextIndex : quot.start_text_index}
			&startOffset=${!isQuot ? quot.startOffset : quot.start_offset}
			&endKey=${!isQuot ? quot.endKey : quot.end_key}
			&endTextIndex=${!isQuot ? quot.endTextIndex : quot.end_text_index}
			&endOffset=${!isQuot ? quot.endOffset : quot.end_offset}`

		navigator.clipboard.writeText(str.replace(/\s/g, ''))
		setToolsIsVisible(false)
        setSelectedText('')
	}

	const changePage = ev => {
		if(innerWidthWindow <= 768 && !toolsIsVisible) {
			const x = ev?.pageX || ev?.changedTouches[0]?.pageX
			const w = innerWidthWindow / 3

			const pages = book?.pages_count
			const currentPage = Number(router.query.page)

			if(x > 0 && x <= w) {
				if(currentPage - 1 >= 1) {
					console.log('prev')
					router.push({ query: { ...router.query, page: currentPage - 1 } })
					window.scrollTo({top: 0, behavior: 'smooth'})
				}
			} else if((innerWidthWindow - x) < w) {
				if(currentPage + 1 <= pages) {
					console.log('next')
					router.push({ query: { ...router.query, page: currentPage + 1 } })
					window.scrollTo({top: 0, behavior: 'smooth'})
				}
			}
		} else {
			ev.stopPropagation()
		}
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
	}, [settings?.rowHeight])

	const filterAndCreateQuotes = () => {
		if(!quotes?.length) return

		const filteredQuotes = quotes
			.filter(i => i?.page_id === book?.pages[0]?.id)
			.sort((a, b) => a?.start_key - b?.start_key)

		if(!filteredQuotes?.length) return

		const sel = window.getSelection()
		sel.removeAllRanges()

		filteredQuotes?.forEach(i => {
			const quot = {
				...i,
				startKey: i.start_key,
				startTextIndex: i.start_text_index,
				startOffset: i.start_offset,
				endKey: i.end_key,
				endTextIndex: i.end_text_index,
				endOffset: i.end_offset
			}
			sel.addRange(objToRange(quot))
			highlight(i.id, i.color, handleMarkClick)
			sel.removeAllRanges()
		})
	}

	useEffect(() => {
		const hideTools = () => setToolsIsVisible(false)

		document.body.addEventListener('click', hideTools)

		return () => {
			document.body.removeEventListener('click', hideTools)
		}
	}, [])

	useEffect(() => {
		if(isAuth && quotesIsLoading) return

		addKey(article.current)
		keyObj.keyValue = 0
		filterAndCreateQuotes()

		const query = router.query
		const sel = window.getSelection()

		// select share quot
		if(query.hasOwnProperty('startKey')) {
			sel.addRange(objToRange(query))
			// document.querySelector(`[data-key="${query.startKey}"]`).scrollIntoView({behavior: 'smooth'})
			// router.replace(`/reader?id=${query.id}&page=${query.page}`, null, {scroll: false})
		}
	}, [book?.pages[0]?.id, quotesIsLoading])

	return (
		<>
			<h1 className={styles.bookTitle}>{book?.title}</h1>

			<Link href={`author?id=${book?.authors[0]?.id}`}>
				<a className={styles.bookAuthor}>{book?.authors[0]?.author}</a>
			</Link>

			{/*<h2 className={styles.bookSubtitle}>Глава 1. Мальчик, который выжил</h2>*/}

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
				onClick={changePage}
			>
				{text}

				{toolsIsVisible &&
					<AddQout
						style={{
							top: toolsCoords.y + 'px',
							left: toolsCoords.x + 'px'
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