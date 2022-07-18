import React, {useState} from 'react';
import styles from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import SearchInput from "../SearchInput";
import Popular from "../Filter/Popular/Popular";
import ReaderService from "../../http/ReaderService";
import {useRouter} from "next/router";
import All from "../shared/icons/all";
import Share from "../shared/icons/share";
import Bin from "../shared/icons/trash";
import {deleteBookQuote} from "../../store/readerSlice";
import {objToRange} from "../../utils";

const filter = {
  title: 'Мои цитаты',
  defaultValue: '1',
  options: [
    { id: 1, title: 'Мои цитаты', value: '1' },
    { id: 2, title: 'Общие', value: '0' },
  ],
}

const QuotesPopup = ({onClose}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { quotes } = useSelector(state => state.reader)

  const [sortedQuotes, setSortedQuotes] = useState(quotes)
  const [query, setQuery] = useState({
    id: router.query?.id,
    my: 1,
    search: ''
  })

  const handleSearch = async value => {
    const newQuery = { ...query, search: value }
    setQuery(newQuery)
    const response = await ReaderService.getBookQuotes(newQuery)
    setSortedQuotes(response.data?.data)
  }

  const handleClick = async value => {
    const newQuery = { ...query, my: value }
    setQuery(newQuery)
    const response = await ReaderService.getBookQuotes(newQuery)
    setSortedQuotes(response.data?.data)
  }

  const handleShow = quot => {
    onClose && onClose()
    router.push({ query: { ...router.query, page: quot?.page?.page_number } }).then(() => {
        const interval = setInterval(() => {
            if(!!document?.querySelector(`[data-key="${quot?.start_key}"]`)) {
                const q = {
                  startKey: quot.start_key,
                  startOffset: quot.start_offset,
                  endKey: quot.end_key,
                  endOffset: quot.end_offset
                }
                const sel = window.getSelection()
                sel.addRange(objToRange(q))
                document.querySelector(`[data-key="${quot.start_key}"]`).scrollIntoView({behavior: 'smooth'})
                clearInterval(interval)
            }
        }, 100)
    })
  }

  const handleShare = quot => {
    let str = `${window.location.origin}/reader?id=${router.query?.id}&page=${quot?.page?.page_number}&startKey=${quot.start_key}&startOffset=${quot.start_offset}&endKey=${quot.end_key}&endOffset=${quot.end_offset}`
    navigator.clipboard.writeText(str)
  }

  const handleDelete = id => {
    const marks = document.querySelectorAll(`[data-id="${id}"]`)
    marks.forEach(i => {
      const html = document.createTextNode(i.innerHTML)
      i.parentNode.insertBefore(html, i)
      i.remove()
    })

    dispatch(deleteBookQuote(id))
    setSortedQuotes(prev => prev.filter(i => i?.id !== id))
  }

  return (
    <>
      <h3 className={styles.popupTitle}>Цитаты</h3>
      <SearchInput
        placeholder={'Введите слово из цитаты'}
        externalClass={styles.quotesSearch}
        onChange={handleSearch}
      />
      <Popular
        title={filter?.title}
        defaultValue={filter?.defaultValue}
        data={filter?.options}
        onClick={handleClick}
        externalClassName={classNames(styles.quotesFilter, query.my === '0' && styles.quotesFilterActive)}
      />
      {sortedQuotes?.length ?
        <ul className={classNames(styles.popupList, styles.quotesList)}>
          {sortedQuotes?.map(i =>
            <li
              key={i?.id}
              className={classNames(styles.popupListItem, styles.quotesListItem)}
            >
              {i?.text}
              <div className={styles.quotesListWrapper}>
                <div onClick={() => handleShow(i)}>
                  <All />
                  <span>Показать в книге</span>
                </div>
                <div onClick={() => handleShare(i)}>
                  <Share />
                  <span>Поделиться</span>
                </div>
                {!!parseInt(query?.my) &&
                  <div onClick={() => handleDelete(i?.id)}>
                    <Bin/>
                    <span>Удалить</span>
                  </div>
                }
              </div>
            </li>
          )}
        </ul> :
        <p className={styles.empty}>У Вас нет добавленных цитат</p>
      }
    </>
  );
};

export default QuotesPopup;
