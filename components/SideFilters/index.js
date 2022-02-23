import { useState } from 'react';
import classnames from 'classnames';
import DropDownArrow from '../../public/chevron-down.svg';
import Categories from '../HomePage/Categories';
import alphabet from '../data/alphabet.json';
import st from './sideFilters.module.scss';

import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

const SideFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState([
    {
      id: '0',
      flag: false,
      option: 'Автор',
      placeholder: 'Найти автора',
      queryName: 'findByAuthor',
      alphabetQuery: 'alphabetAuthorIndex',
    },
    {
      id: '1',
      flag: false,
      option: 'Книга',
      placeholder: 'Найти книгу',
      queryName: 'findByTitle',
      alphabetQuery: 'alphabetPublisherIndex',
    },
    {
      id: '2',
      flag: false,
      option: 'Издательство',
      placeholder: 'Найти издательство',
      queryName: 'findByPublisher',
      alphabetQuery: 'alphabetTitleIndex',
    },
  ]);

  const filterShow = index => {
    setFilters(prev => {
      const filterMap = prev.map(({ flag, ...rest }, i) => {
        return {
          flag: index === i ? !flag : flag,
          ...rest,
        };
      });
      return filterMap;
    });
  };

  const setQuery = (value, queryName) => {
    router.push(
      { query: { ...router.query, [queryName]: encodeURI(value) } },
      null,
      { scroll: false }
    );
  };

  const handleChange = debounce(setQuery, 300);

  return (
    <div className={st.container}>
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
                  className={classnames(st.dropDownIcon, { [st.up]: it?.flag })}
                >
                  <DropDownArrow />
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
                      onClick={() => setQuery(i?.name, it.alphabetQuery)}
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
      <Categories />
    </div>
  );
};

export default SideFilters;
