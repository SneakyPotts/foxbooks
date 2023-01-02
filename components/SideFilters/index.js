import {useEffect, useRef, useState} from 'react';
import classnames from 'classnames';
import DropDownArrow from '../../public/chevron-down.svg';
import Categories from '../HomePage/Categories';
import alphabet from '../data/alphabet.json';
import st from './sideFilters.module.scss';

import {useRouter} from 'next/router';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import Button from "../shared/common/Button/Button";
import {useSelector} from "react-redux";

const allowedQueryParams = ['books_type', 'category_slug', 'sortBy', 'showType', 'page'];

const SideFilters = () => {
  const router = useRouter();

  const {innerWidthWindow} = useSelector(state => state.common);

  const [resetIsVisible, setResetIsVisible] = useState(false);
  const [filters, setFilters] = useState([
    {
      id: '0',
      ref: useRef(null),
      flag: true,
      option: 'Автор',
      placeholder: 'Найти автора',
      queryName: 'findByAuthor',
      alphabetQuery: 'alphabetAuthorIndex',
    },
    {
      id: '1',
      ref: useRef(null),
      flag: true,
      option: 'Книга',
      placeholder: 'Найти книгу',
      queryName: 'findByTitle',
      alphabetQuery: 'alphabetTitleIndex',
    },
    {
      id: '2',
      ref: useRef(null),
      flag: true,
      option: 'Издательство',
      placeholder: 'Найти издательство',
      queryName: 'findByPublisher',
      alphabetQuery: 'alphabetPublisherIndex',
    },
  ]);

  const filterShow = index => {
    setFilters(prev => {
      return prev.map(({flag, ...rest}, i) => {
        return {
          flag: index === i ? !flag : flag,
          ...rest,
        };
      });
    });
  };

  const setQuery = (value, queryName, ref = null, mainQuery = null) => {
    setResetIsVisible(true);

    if (ref) {
      ref.current.focus();
      ref.current.value = value;

      router.push(
        {query: {...router.query, page: 1, [queryName]: encodeURI(value), [mainQuery]: null}},
        null,
        {scroll: false}
      );

      return;
    }

    router.push(
      {query: {...router.query, page: 1, [queryName]: encodeURI(value)}},
      null,
      {scroll: false}
    );
  };

  const handleChange = debounce(setQuery, 300);

  const setDefaultUrl = () => {
    const { books_type, category_slug, sortBy, showType } = router.query;
    let queryObj = { books_type, category_slug }

    router.push({
      pathname: '/[books_type]/[category_slug]',
      query: Object.assign(queryObj,
        sortBy && {sortBy},
        showType && {showType},
        {page: 1}
      )
    });

    /*close filters*/
    filters.forEach((item, index) => {
      item.ref.current.value = '';

      item.flag = false;
      filterShow(index);
    })
  }


  const handleReset = () => {
    setResetIsVisible(false)
    setDefaultUrl();
  }

  useEffect(() => {
    Object.keys(router.query).forEach((key) => {
      !allowedQueryParams.includes(key) && setResetIsVisible(true);
    });
  }, [router.query])

  useEffect(() => {
    router.query?.books_type === 'audiobooks' &&  setFilters((prev) => prev.slice(0, 2))
  }, []);

  return (
    <div className={st.container}>
      {innerWidthWindow > 1024 && resetIsVisible &&
        <Button
          classNames={st.reset}
          text='Сбросить'
          click={handleReset}
        />}
      <div className={st.inputFilters}>
        <ul className={st.filters}>
          {filters?.map((it, index) => (
            <li
              key={it?.id}
              className={st.filterStatus}
            >
              <button
                className={st.btn}
                onClick={() => filterShow(index)}
              >
                {it?.option}
                <span
                  className={classnames(st.dropDownIcon, {[st.up]: it?.flag})}
                >
                  <DropDownArrow/>
                </span>
              </button>
              <div
                className={classnames(st.dates, {
                  [st.showMenu]: it?.flag,
                })}
                onClick={e => e.stopPropagation()}
              >
                <input
                  placeholder={it?.placeholder}
                  className={st.input}
                  onChange={ev => handleChange(ev.target.value, it?.queryName)}
                  ref={it?.ref}
                />
                <p className={st.alphabetTitle}>Алфавитный указатель</p>
                <div className={st.dropContentAuthor}>
                  {alphabet?.map(i => (
                    <span
                      key={i?.id}
                      className={classNames(st.dropLinkAuthor, {
                        [st.active]:
                        router.query[it?.alphabetQuery] === it?.alphabetQuery,
                      })}
                      onClick={() => setQuery(i?.name, it.alphabetQuery, it?.ref, it?.queryName)}
                    >
                      {i?.name}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Categories booksType={router.query.books_type}/>
    </div>
  );
};

export default SideFilters;
