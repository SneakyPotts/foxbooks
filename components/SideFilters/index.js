import { useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import DropDownArrow from '../../public/chevron-down.svg';
import Categories from '../HomePage/Categories';
import alphabet from '../data/alphabet.json';
import st from './sideFilters.module.scss';

const SideFilters = () => {
  const [menu, setMenu] = useState(false);
  const [optionIndex, setOptionIndex] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterIdx, setFilterIdx] = useState(null);

  const options = [
    { id: '0', option: 'Бестселлеры' },
    { id: '1', option: 'Новинки' },
  ];

  const filters = [
    { id: '0', option: 'Автор', placeholder: 'Найти автора' },
    { id: '1', option: 'Аудиокнига', placeholder: 'Найти книгу' },
    { id: '2', option: 'Издательство', placeholder: 'Найти издательство' },
  ];

  const toggle = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const filterShow = index => {
    console.log('filterShow');
    // e.stopPropagation();
    if (setFilterIdx) {
      setFilterIdx(prev => {
        if (prev === index) {
          return null;
        } else {
          return index;
        }
      });
    } else {
      setShowFilter(!showFilter);
      console.log(showFilter, 'showFilter');
    }
    // console.log(filterIdx, 'filterIdx');
    // console.log(index, 'index');
    // console.log(showFilter, 'showFilter');
  };

  const handleOnClick = index => {
    if (optionIndex.includes(index)) {
      setOptionIndex(optionIndex.filter(it => it !== index));
    } else {
      setOptionIndex([...optionIndex, index]);
    }
  };

  return (
    <div className={st.container}>
      <div className={st.filterStatus}>
        <button className={st.btn} onClick={toggle}>
          Статус
          <span className={st.dropDownIcon}>
            <DropDownArrow />
          </span>
        </button>
        <ul
          className={classnames(st.dates, { [st.showMenu]: menu })}
          onClick={e => e.stopPropagation()}
        >
          {options.map((opt, index) => (
            <li
              key={index}
              onClick={() => handleOnClick(index)}
              className={st.dropLink}
            >
              <span
                className={classnames(st.radio, {
                  [st.radioActive]: optionIndex.includes(index),
                })}
              ></span>
              <span
                className={classnames(st.dropText, {
                  [st.active]: optionIndex.includes(index),
                })}
              >
                {opt.option}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={st.inputFilters}>
        <ul className={st.filters}>
          {filters.map((it, index) => (
            <li key={it.id} className={st.filterStatus}>
              <button className={st.btn} onClick={() => filterShow(index)}>
                {it.option}
                <span className={st.dropDownIcon}>
                  <DropDownArrow />
                </span>
              </button>
              <div
                className={classnames(st.dates, { [st.showMenu]: showFilter })}
                onClick={e => e.stopPropagation()}
              >
                <input placeholder={it.placeholder} className={st.input} />
                <p>Алфавитный указатель</p>
                <div className={st.dropContentAuthor}>
                  {alphabet.map((it, index) => (
                    <Link
                      key={it.id}
                      href="#"
                      value={index}
                      //   onClick={handleOnClick}
                    >
                      <a className={st.dropLinkAuthor}>{it.name}</a>
                    </Link>
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
