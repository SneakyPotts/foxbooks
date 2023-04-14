import Cookies from 'js-cookie';
import moment from 'moment';

const _getExtension = (fileName) => {
  if (!fileName || typeof fileName !== 'string') return false;

  return fileName.split('.').pop();
};

export const isFileImage = (fileName) => {
  const extension = _getExtension(fileName);
  return extension && ['jpg', 'png', 'jpeg', 'webp', 'avif'].indexOf(extension.toLowerCase()) > -1;
};

export const generateFormData = (data) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length) {
        value.forEach((i) => {
          formData.append([`${key}[]`], i);
        });
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
};

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
};

export const keyObj = {
  value: 0,
  get keyValue() {
    return this.value;
  },
  set keyValue(prop) {
    this.value = prop;
  },
};

export const addKey = (el) => {
  if (el?.children?.length > 0) {
    Array.from(el.children).forEach((i) => {
      keyObj.keyValue = keyObj.keyValue + 1;
      i.dataset.key = keyObj.keyValue;
      addKey(i);
    });
  }
};

export const objToRange = (quot) => {
  const range = document.createRange();

  let offset = 0;
  const calcTextIndex = (nodeList, startOffset) => {
    let index = 0;
    for (let i = 0; i < nodeList.length; i++) {
      if (offset + nodeList[i].textContent?.length < startOffset) {
        offset += nodeList[i].textContent?.length;
      } else {
        index = i;
        break;
      }
    }
    return index;
  };

  const startTextIndex = calcTextIndex(document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes, quot.startOffset);
  const startSelector =
    document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes[startTextIndex].nodeType === 1
      ? document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes[startTextIndex].childNodes[0]
      : document.querySelector(`[data-key="${quot.startKey}"]`)?.childNodes[startTextIndex];

  range?.setStart(startSelector, Number(quot.startOffset) - offset);
  offset = 0;

  const endTextIndex = calcTextIndex(document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes, quot.endOffset);
  const endSelector =
    document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes[endTextIndex].nodeType === 1
      ? document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes[endTextIndex].childNodes[0]
      : document.querySelector(`[data-key="${quot.endKey}"]`)?.childNodes[endTextIndex];

  range?.setEnd(endSelector, Number(quot.endOffset) - offset);
  offset = 0;

  return range;
};

export const rangeToObj = (range) => {
  const startKey =
    range.startContainer.parentNode.tagName === 'MARK' ? range.startContainer.parentNode.closest('[data-key]')?.dataset?.key : range.startContainer.parentNode.dataset.key;
  const endKey =
    range.endContainer.parentNode.tagName === 'MARK' ? range.endContainer.parentNode.closest('[data-key]')?.dataset?.key : range.endContainer.parentNode.dataset.key;

  let offset = 0;
  const calcOffset = (node) => {
    if (!node.previousSibling) return;

    offset += node.previousSibling.textContent?.length || 0;
    calcOffset(node.previousSibling);
  };

  calcOffset(range.startContainer.parentNode.dataset.key === startKey ? range.startContainer : range.startContainer.parentNode);
  const startOffset = offset + range.startOffset;

  offset = 0;

  calcOffset(range.endContainer.parentNode.dataset.key === endKey ? range.endContainer : range.endContainer.parentNode);
  const endOffset = offset + range.endOffset;

  return {
    startKey,
    endKey,
    startOffset,
    endOffset,
  };
};

export const highlight = (id, color, func) => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const { commonAncestorContainer, startContainer, endContainer, startOffset, endOffset } = range;

  const nodes = [];

  if (startContainer === endContainer) {
    const mark = document.createElement('mark');
    mark.style.backgroundColor = color;
    mark.dataset.id = id;
    mark.addEventListener('click', (ev) => func(ev, id));
    range.surroundContents(mark);
    nodes.push(startContainer);
    return;
  }

  // get all posibles selected nodes
  function getNodes(childList) {
    childList.forEach((node) => {
      const nodeSel = sel.containsNode(node, true);

      // if is not selected
      if (!nodeSel) return;

      const tempStr = node.nodeValue;

      if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, '') !== '') {
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

    const mark = document.createElement('mark');
    mark.style.backgroundColor = color;
    mark.dataset.id = id;
    mark.addEventListener('click', (ev) => func(ev, id));

    mark.append(document.createTextNode(text));
    const { parentNode } = node;

    parentNode.replaceChild(mark, node);

    if (prevText) {
      const prevDOM = document.createTextNode(prevText);
      parentNode.insertBefore(prevDOM, mark);
    }

    if (nextText) {
      const nextDOM = document.createTextNode(nextText);
      parentNode.insertBefore(nextDOM, mark.nextSibling);
    }
  });

  sel.removeRange(range);
};

export const setQueryString = (value, queryName, router) => {
  let currentQuery = {};
  const { query, pathname } = router;

  if (!value) {
    for (const queryKey in query) {
      if (queryKey !== queryName && !!query[queryKey]) {
        currentQuery = {
          ...currentQuery,
          [queryKey]: query[queryKey],
        };
      }
    }
    router.replace({ pathname, query: currentQuery }, undefined, { shallow: true });
  } else {
    router.push({ query: { ...query, [queryName]: encodeURI(value) } }, null, { scroll: false });
  }
};

export const calcCoordinates = (ev) => {
  const x = ev?.pageX || ev?.changedTouches[0]?.pageX;
  const y = ev?.pageY || ev?.changedTouches[0]?.pageY;

  const toolsWidth = 291;
  const toolsHeight = 162;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight + window.scrollY;
  const deltaX = windowWidth - x;
  const deltaY = windowHeight - y;

  return {
    x: toolsWidth >= deltaX ? x - toolsWidth : x,
    y: toolsHeight >= deltaY ? y - toolsHeight : y,
  };
};

export const calcQuotePosition = (data) => {
  const x = data.x;
  const y = data.y + window.scrollY + data.height;

  const toolsWidth = 291;
  const toolsHeight = 162;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const deltaX = windowWidth - x;
  const deltaY = windowHeight - y;

  return {
    x: toolsWidth >= deltaX ? x - toolsWidth : x,
    y: toolsHeight >= deltaY ? y - toolsHeight - data.height : y,
  };
};

export const formatDate = (date) => {
  const now = moment();
  const formatted = moment(date.split('-').reverse().join('-'));
  const delta = now - formatted;

  /*86400000 - ms in day*/
  if (delta < 86400000) return `Сегодня (${formatted.format('DD MMMM YYYY')})`;
  if (delta > 86400000 && delta < 2 * 86400000) return `Вчера (${formatted.format('DD MMMM YYYY')})`;

  return formatted.format('DD MMMM YYYY');
};

export const wordsForCount = (count, word = 'оцен') => {
  switch (count % 10) {
    case 1:
      return `${word}ка`;
    case 2 || 3 || 4:
      return `${word}ки`;
    default:
      return `${word}ок`;
  }
};

export const durationString = (duration) => {
  return +duration / 60 / 60 > 1 ? `${Math.floor(+duration / 60 / 60)} ч. ${Math.round((+duration / 60) % 60)} мин.` : `${Math.round((+duration / 60) % 60)} мин.`;
};

export const cookiesSettings = (data, status = '') => {
  switch (status) {
    case 'set':
      const settings = {
        field_size: data.fieldSize,
        font_name: data.fontName,
        font_size: data.fontSize,
        is_center_alignment: data.isCenterAlignment,
        is_two_columns: data.isTwoColumns,
        row_height: data.rowHeight,
        screen_brightness: data.screenBrightness,
      };
      Cookies.set('settings', JSON.stringify(settings), { expires: 7 });
      break;
    case 'remove':
      Cookies.remove('settings');
      break;
    default:
      return JSON.parse(data);
  }
};
