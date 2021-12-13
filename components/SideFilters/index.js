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

  const toggle = e => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const handleOnClick = index => {
    if (optionIndex.includes(index)) {
      setOptionIndex(optionIndex.filter(it => it !== index));
    } else {
      setOptionIndex([...optionIndex, index]);
    }
  };

  const options = [
    { id: '0', option: 'Бестселлеры' },
    { id: '1', option: 'Новинки' },
  ];

  const filters = [
    { id: '0', option: 'Автор' },
    { id: '1', option: 'Аудиокнига' },
    { id: '2', option: 'Издательство' },
  ];

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
      <div>
        <ul className={st.filters}>
          {filters.map((it, index) => (
            <li key={it.id}>
              <button className={st.btn} onClick={toggle}>
                {it.option}
                <span className={st.dropDownIcon}>
                  <DropDownArrow />
                </span>
              </button>
              <div
                className={classnames(st.dates, { [st.showMenu]: menu })}
                onClick={e => e.stopPropagation()}
              >
                <input />
                <p>Алфавитный указатель</p>
                <div className={st.dropContentAuthor}>
                  {alphabet.map((it, index) => (
                    <Link
                      key={it.id}
                      href="#"
                      value={index}
                      onClick={handleOnClick}
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
