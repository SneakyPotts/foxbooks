import React, {useEffect, useState, useMemo, useLayoutEffect, useRef} from 'react'
import {useSelector} from "react-redux";
import Link from 'next/link';
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import AddQout from "./AddQout";
import styles from './styles.module.scss'

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
						src: `http://loveread.webnauts.pw/${domNode?.attribs?.src}`
					})}
				/>
			)
		}
		// else if(domNode?.name === 'mark') {
		// 	return (
		// 		<mark
		// 			onClick={ev => handleMarkClick(ev, domNode?.attribs['data-id'])}
		// 			{...attributesToProps(domNode?.attribs)}
		// 		>
		// 			{domToReact(domNode?.children, options)}
		// 		</mark>
		// 	)
		// } 
	}
}

const TextWithQoutes = () => {
	//========= ПЕРЕДЕЛАТЬ ПРОПС currColor !!!!!!!!!!!! =========================
	const [quotes, setQuotes] = useState([
		// {
		// 	id: 0,
		// 	color: '#A5D5FF',
		// 	endContainer: "/p 9/text 1",
		// 	endOffset: 241,
		// 	startContainer: "/p 6/i 1/text 1",
		// 	startOffset: 231
		// }
		{
			id: 0,
			color: '#A5D5FF',
			endKey: '16',
			endOffset: 14,
			endTextIndex: 0,
			startKey: '12',
			startOffset: 221,
			startTextIndex: 0
		},
		{
			id: 1,
			color: '#A5D5FF',
			startKey:"8",
			startTextIndex:0,
			endKey:"8",
			endTextIndex:0,
			startOffset:146,
			endOffset:274
		},
	]);

	const { book, settings } = useSelector(state => state?.reader)

	const text = useMemo(() => {
		const str = book?.pages[0]?.content
			.replace(/<(\/*)(html|body)[^>]*>/g, '')
			.replace('<div class="MsoNormal" style="margin:15px; text-align:left; width:800px; color:#333333;">', '')
			.slice(0, -7)

		return parse(str, options)
	}, [book])

	const article = useRef()

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 })

	const [selectedText, setSelectedText] = useState('')
	const [rangeObj, setRangeObj] = useState(null)
	const [markId, setMarkId] = useState(null)

	const [isError, setIsError] = useState(false)

	function highlight(id, color, func) {
		const sel = window.getSelection();
		const range = sel.getRangeAt(0);
		const {
			commonAncestorContainer,
			startContainer,
			endContainer,
			startOffset,
			endOffset
		} = range;

		const nodes = [];

		if (startContainer === endContainer) {
			const span = document.createElement("mark");
			span.style.backgroundColor = color;
			// span.addEventListener('click', func)
			range.surroundContents(span);
			nodes.push(startContainer);
			return;
		}

		// get all posibles selected nodes
		function getNodes(childList) {
			childList.forEach((node) => {
				const nodeSel = sel.containsNode(node, true);

				// if is not selected
				if (!nodeSel) return;

				const tempStr = node.nodeValue

				if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, "") !== "") {
					nodes.push(node);
				}

				if (node.nodeType === 1) {
					if (node.childNodes) getNodes(node.childNodes);
				}
			});
		}

		getNodes(commonAncestorContainer.childNodes);

		nodes.forEach((node, index, listObj) => {
			const { nodeValue } = node;
			let text, prevText, nextText;

			if (index === 0) {
				prevText = nodeValue.substring(0, startOffset);
				text = nodeValue.substring(startOffset);
			} else if (index === listObj.length - 1) {
				text = nodeValue.substring(0, endOffset);
				nextText = nodeValue.substring(endOffset);
			} else {
				text = nodeValue;
			}

			const span = document.createElement("mark");
			span.style.backgroundColor = color;
			// span.addEventListener('click', func)

			span.append(document.createTextNode(text));
			const { parentNode } = node;

			parentNode.replaceChild(span, node);

			if (prevText) {
				const prevDOM = document.createTextNode(prevText);
				parentNode.insertBefore(prevDOM, span);
			}

			if (nextText) {
				const nextDOM = document.createTextNode(nextText);
				parentNode.insertBefore(nextDOM, span.nextSibling);
			}
		});

		sel.removeRange(range);
	}

	const mouseUpHandler = ev => {
		const text = window.getSelection().toString()
		
		if(text?.length && text !== ' ') {
			const range = window.getSelection().getRangeAt(0)
			setRangeObj(rangeToObj(range))
			setSelectedText(text)

			// const err = quotes?.some(i => 
			// 	(startPos >= i?.startPosition && startPos <= i?.endPosition) ||
			// 	(endPos >= i?.startPosition && endPos <= i?.endPosition) ||
			// 	(startPos < i?.startPosition && endPos > i?.endPosition)
			// )

			// setIsError(err);

			const x = ev?.pageX || ev?.changedTouches[0]?.pageX 
			const y = ev?.pageY || ev?.changedTouches[0]?.pageY
			setToolsCoords({x, y})
			setToolsIsVisible(true)
		} else {
			setToolsIsVisible(false)
			setMarkId(null)
			setIsError(false)
		}
	}
	
	const objToRange = quot => {
		const range = document.createRange()
		
		try {
			range.setStart(
				document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes[quot.startTextIndex], 
				quot.startOffset
			)
			range.setEnd(
				document.querySelector(`[data-key="${quot.endKey}"]`).childNodes[quot.endTextIndex], 
				quot.endOffset
			)
		} catch {
			console.log('error');
		}
		return range
	}

	const rangeToObj = range => {
		return {
			startKey: range.startContainer.parentNode.dataset.key,
			startTextIndex: Array.prototype.indexOf.call(range.startContainer.parentNode.childNodes, range.startContainer),
			endKey: range.endContainer.parentNode.dataset.key,
			endTextIndex: Array.prototype.indexOf.call(range.endContainer.parentNode.childNodes, range.endContainer),
			startOffset: range.startOffset,
			endOffset: range.endOffset
		}
	}

	const test = () => {
		console.log('test');
		const sel = window.getSelection()
    sel.removeAllRanges()

		quotes?.forEach(i => {
			sel.addRange(objToRange(i))
			highlight(i.id, i.color, handleMarkClick)
		})
	}

	const handleMarkClick = (ev, id) => {
		setMarkId(id)
		const x = ev?.pageX
		const y = ev?.pageY
		setToolsCoords({x, y})
		setToolsIsVisible(true)
	}

	const addQuot = color => {
		setMarkId(quotes?.length)

		// const sel = window.getSelection()
    // sel.removeAllRanges()

		// sel.addRange(objToRange(rangeObj))
		// highlight(quotes?.length, color, handleMarkClick)

		setQuotes(prev => [...prev, {
			...rangeObj,
			id: quotes?.length,
			text: selectedText,
			color: color
		}])

		setToolsIsVisible(false)
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
		let key = 0
		const addKey = el => {
			if (el?.children?.length > 0) {
				Array.from(el.children).forEach(i => {
					i.dataset.key = key++
					addKey(i)
				})
			}
		}	
		
		addKey(article.current)
		test()
	}, [text])

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
					columnCount: settings?.isTwoColumns ? 2 : 1,
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
					/>
				}
			</article>
		</>
	)
}

export default TextWithQoutes