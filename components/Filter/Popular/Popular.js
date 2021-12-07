import React, { useState, useEffect } from 'react';
import classnames from 'classnames'
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.css';

const Popular = ({title, data, filterStateIdx, elIdx, setFilStateIdx}) => {
  const [menu, setMenu] = useState(false);
  const [optionIndex, setOptionIndex] = useState([]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);
    
    return (() => {
      body.removeEventListener('click', closeMenu);
    })
  }, [])

  const togleMenu = (e) => {
    e.stopPropagation();
    if (setFilStateIdx) {
      setFilStateIdx((prev) => {
        if (prev === elIdx) {
          return null
        } else {
          return elIdx
        }
      });
    } else {
      setMenu(!menu);
    }
  }

  const handleOnClick = (index) => {
    if (optionIndex.includes(index)) {
      setOptionIndex(optionIndex.filter(it => it !== index))
    } else {
      setOptionIndex([...optionIndex, index])
    }
  }
  
  const closeMenu = () => {
    setMenu(false);
    setFilStateIdx(null);
  }

  return (
    <div className={css.dropdown}>
      <button className={`${css.dropBtn} ${menu || elIdx === filterStateIdx  ? css.open : css.close}`}
        onClick={togleMenu}>
        <span className={css.dropBtnText}>{ title }</span>{' '}
        <ArrowAll className={`${menu || elIdx === filterStateIdx && css.up}`} />
      </button>
      {menu || elIdx === filterStateIdx ? (
        <ul className={css.dropContent} onClick={e=>e.stopPropagation()}>
          {data.map((it, index) => (
            <li key={index} onClick={()=>handleOnClick(index)}
              className={css.dropLink}>
              <span className={classnames(css.radio, { [css.radioActive]: optionIndex.includes(index) })}></span>
              <span className={classnames(css.dropText, { [css.active]: optionIndex.includes(index) })}>{it}</span>
            </li>
          ))}      
        </ul>
      ) : null}
    </div>
  );
}
export default Popular;
