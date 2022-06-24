const _getExtension = fileName => {
	if (!fileName || typeof fileName !== 'string') return false;

	return fileName.split('.').pop();
}

export const isFileImage = fileName => {
	const extension = _getExtension(fileName);
	return (
		extension &&
      ['jpg', 'png', 'jpeg', 'webp', 'avif'].indexOf(extension.toLowerCase()) > -1
	);
}

export const generateFormData = data => {
	const formData = new FormData()

	for (const [key, value] of Object.entries(data)) {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value) && value.length) {
				value.forEach(i => {
					formData.append([`${key}[]`], i)
				})
			} else {
				formData.append(key, value)
			}
		}
	}

	return formData
}

export const getNoun = (number, one, two, five) => {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return five;
	}
	n %= 10;
	if (n === 1) {
		return one;
	}
	if (n >= 2 && n <= 4) {
		return two;
	}
	return five;
}

export const keyObj = {
	value: 0,
	get keyValue() {
		return this.value
	},
	set keyValue(prop) {
		this.value = prop
	}
}

export const addKey = el => {
	if (el?.children?.length > 0) {
		Array.from(el.children).forEach(i => {
			keyObj.keyValue = keyObj.keyValue + 1
			i.dataset.key = keyObj.keyValue
			addKey(i)
		})
	}
}

export const objToRange = quot => {
	const range = document.createRange()

	let offset = 0
	const calcTextIndex = (nodeList, startOffset) => {
		let index = 0
		for (let i = 0; i < nodeList.length; i++) {
			if(offset + nodeList[i].textContent?.length < startOffset) {
				offset += nodeList[i].textContent?.length
			} else {
				index = i
				break
			}
		}
		return index
	}

	const startTextIndex = calcTextIndex(document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes, quot.startOffset)
	offset = 0
	const endTextIndex = calcTextIndex(document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes, quot.endOffset)
	offset = 0

	console.log(startTextIndex)
	console.log(endTextIndex)

	range?.setStart(
		document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes[startTextIndex],
		quot.startOffset - offset
	)
	range?.setEnd(
		document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes[endTextIndex],
		quot.endOffset - offset
	)
	return range
}

export const rangeToObj = range => {
	const startKey = range.startContainer.parentNode.tagName === 'MARK' ?
		range.startContainer.parentNode.closest('[data-key]')?.dataset?.key :
		range.startContainer.parentNode.dataset.key
	const endKey = range.endContainer.parentNode.tagName === 'MARK' ?
		range.endContainer.parentNode.closest('[data-key]')?.dataset?.key :
		range.endContainer.parentNode.dataset.key

	let offset = 0
	const calcOffset = node => {
		if(!node.previousSibling) return

		offset += node.previousSibling.textContent?.length || 0
		calcOffset(node.previousSibling)
	}

	calcOffset(range.startContainer.parentNode.dataset.key === startKey ? range.startContainer : range.startContainer.parentNode)
	const startOffset = offset + range.startOffset

	offset = 0

	calcOffset(range.endContainer.parentNode.dataset.key === endKey ? range.endContainer : range.endContainer.parentNode)
	const endOffset = offset + range.endOffset

	return {
		startKey,
		endKey,
		startTextIndex:0,
		endTextIndex:0,
		startOffset,
		endOffset
	}
}

export const highlight = (id, color, func) => {
	const sel = window.getSelection()
	const range = sel.getRangeAt(0)
	const {
		commonAncestorContainer,
		startContainer,
		endContainer,
		startOffset,
		endOffset
	} = range

	const nodes = []

	if (startContainer === endContainer) {
		const mark = document.createElement('mark')
		mark.style.backgroundColor = color
		mark.dataset.id = id
		mark.addEventListener('click', ev => func(ev, id))
		range.surroundContents(mark)
		nodes.push(startContainer)
		return
	}

	// get all posibles selected nodes
	function getNodes(childList) {
		childList.forEach(node => {
			const nodeSel = sel.containsNode(node, true)

			// if is not selected
			if (!nodeSel) return

			const tempStr = node.nodeValue

			if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, "") !== "") {
				nodes.push(node)
			}

			if (node.nodeType === 1) {
				if (node.childNodes) getNodes(node.childNodes)
			}
		});
	}

	getNodes(commonAncestorContainer.childNodes)

	nodes.forEach((node, index, listObj) => {
		const { nodeValue } = node
		let text, prevText, nextText

		if (index === 0) {
			prevText = nodeValue.substring(0, startOffset)
			text = nodeValue.substring(startOffset)
		} else if (index === listObj.length - 1) {
			text = nodeValue.substring(0, endOffset)
			nextText = nodeValue.substring(endOffset)
		} else {
			text = nodeValue
		}

		const mark = document.createElement('mark')
		mark.style.backgroundColor = color
		mark.dataset.id = id
		mark.addEventListener('click', ev => func(ev, id))

		mark.append(document.createTextNode(text))
		const { parentNode } = node

		parentNode.replaceChild(mark, node)

		if (prevText) {
			const prevDOM = document.createTextNode(prevText)
			parentNode.insertBefore(prevDOM, mark)
		}

		if (nextText) {
			const nextDOM = document.createTextNode(nextText)
			parentNode.insertBefore(nextDOM, mark.nextSibling)
		}
	})

	sel.removeRange(range)
}