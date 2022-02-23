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
		// return str.slice(str?.indexOf('>') + 1, str?.length - 7)
		return str.replace(/<(\/*)(html|body)[^>]*>/g, '')
	}, [book])

	const [changedText, setChangedText] = useState(initialText)

	const [toolsIsVisible, setToolsIsVisible] = useState(false)
	const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 });

	const [selectedText, setSelectedText] = useState('');
	const [startPosition, setStartPosition] = useState(null);
	const [endPosition, setEndPosition] = useState(null);
	const [markId, setMarkId] = useState(null);

	const [isError, setIsError] = useState(false);

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
	]);

	const generateQuotes = () => {
		const mark = (se, quot, el) => {
			const parent = el?.parent?.name

			console.log('quot', quot)
			console.log('el', el)
			console.log('parent', parent)

			if(quot?.startContainer === quot?.endContainer) {
				if (se === 'end') return

				return `<${el?.parent?.parent?.name}><${parent}>${
					el?.data?.slice(0, quot?.startOffset)
				}<mark data-id="${quot?.id}" style="background: ${quot?.color}">${
					el?.data?.slice(quot?.startOffset, quot?.endOffset)
				}</mark>${
					el?.data?.slice(quot?.endOffset)
				}</${parent}></${el?.parent?.parent?.name}>`

			} 
			
			if(se === 'start') {

				return `<${el?.parent?.parent?.name}><${parent}>${
					el?.data?.slice(0, quot?.startOffset)
				}<mark data-id="${quot?.id}" style="background: ${quot?.color}">${
					el?.data?.slice(quot?.startOffset)
				}</mark></${parent}></${el?.parent?.parent?.name}>`

			} else if(se === 'end') {

				return `<${parent}><mark data-id="${quot?.id}" style="background: ${quot?.color}">${
					el?.data?.slice(0, quot?.endOffset)
				}</mark>${
					el?.data?.slice(quot?.endOffset)
				}</${parent}></${el?.parent?.parent?.name}>`

			}
		}

		let html = initialText
		let str = ''

		const perebor = (se, quot, index, node) => {
			const arr = quot?.[se === 'start' ? 'startContainer' : 'endContainer']?.split('/')?.slice(1)
			const tag = arr[index].split(' ')[0]
			const num = +arr[index].split(' ')[1]
			let tagCount = 0
			
			if(node?.children?.length) {
				node?.children?.forEach(i => {
					if((tag === 'text' && i?.type === 'text') || i?.name === tag) {
						tagCount++
						if(tagCount === num) {
							if(index !== arr?.length - 1) {
								perebor(se, quot, index + 1, i)
							} else {
								str += mark(se, quot, i)
							}
						} else {
							concat(i)
						}
					} else {
						concat(i)
					}
				})
			} else {
				concat(node)
			}
		}

		const concat = el => {
			if(el?.children?.length) {
				str += `<${el?.name}>`

				el?.children?.forEach(i => {
					concat(i)
				})

				str += `</${el?.name}>`
			} else {
				if(el?.name === 'img') {
					let attr = ''

					for (const [key, value] of Object.entries(el?.attribs)) {
						attr += ` ${key}="${value}"`
					}

					str += `<${el?.name}${attr} />`
				} else {
					str += el?.data
				}
			}
		}
		
		quotes.forEach(i => {
			let index = 0

			parse(html, {
				replace: domNode => {
					if(index === 0) {
						perebor('start', i, 0, domNode)
						index++
					}
				}
			})

			html = `<div>${str}</div>`
			str = ''
			index = 0

			parse(html, {
				replace: domNode => {
					if(index === 0) {
						perebor('end', i, 0, domNode)
						index++
					}
				}
			})

			html = `<div>${str}</div>`
			str = ''
		})

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

		setChangedText(parse(html.slice(5, -6), options))
	}

	const getXpathParameters = xpath => {
		const startOffset = xpath.startOffset
		const endOffset = xpath.endOffset
		let startContainer = xpath.start
		startContainer = startContainer
			.replace(/\(|\)/g, "")
			.replace(/\[/g, " ")
			.replace(/\]/g, "")
		let endContainer = xpath.end
		endContainer = endContainer
			.replace(/\(|\)/g, "")
			.replace(/\[/g, " ")
			.replace(/\]/g, "")
		return { startOffset, endOffset, startContainer, endContainer }
	}

	function highlight() {
		const sel = window.getSelection();
		const range = sel.getRangeAt(0);
		const {
			commonAncestorContainer,
			startContainer,
			endContainer,
			startOffset,
			endOffset
		} = range;

		console.log('commonAncestorContainer', commonAncestorContainer)
		console.log('startContainer', startContainer)
		console.log('endContainer', endContainer)
		console.log('startOffset', startOffset)
		console.log('endOffset', endOffset)

		const nodes = [];

		if (startContainer === endContainer) {
			const span = document.createElement("span");
			span.className = "highlight";
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
			span.className = "highlight";
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
		console.log(nodes)

		sel.removeRange(range);
	}

	const mouseUpHandler = ev => {
		highlight()
		const text = window.getSelection().toString()

		if(text?.length && text !== ' ') {
			setSelectedText(text)

			const range = window.getSelection().getRangeAt(0)
			// const startPos = calcTotalOffset(range.startContainer, range.startOffset)
			// const endPos = calcTotalOffset(range.endContainer, range.endOffset)
			const xpath = fromRange(range, document.querySelector('#range-parent'))
			const test = getXpathParameters(xpath)

			// console.log('test', test);
			setStartPosition(test)
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
			...startPosition,
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