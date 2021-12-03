import React, { useState, useEffect } from 'react';
import classnames from 'classnames'
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.css';

const Popular = ({title, data, optionIndex1, index, setpOptionIndex}) => {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState(false)
  const [optionIndex, setOptionIndex] = useState([]);
  console.log(optionIndex);

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);
    
    return (() => {
      body.removeEventListener('click', closeMenu);
    })
  }, [])

  const togleMenu = (e) => {
    e.stopPropagation();

    setMenu(!menu);
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
    console.log(111);
  }
  
  return (
      <>
      <div className={css.dropdown}>
        <button className={`${css.dropBtn} ${menu ? css.open : css.close}`} onClick={(e) => {setpOptionIndex(index)}}>
          <span className={css.dropBtnText}>{ title }</span>{' '}
              <ArrowAll className={`${menu&&css.up}`} />
          </button>
          {menu || index === optionIndex1? (
            <ul className={css.dropContent} onClick={e=>e.stopPropagation()}>
                {data.map((it, index) => (
                  <li key={it.id} onClick={()=>handleOnClick(index)}
                    className={css.dropLink}>
                    <span className={classnames(css.radio, { [css.active]: optionIndex.includes(index) })}></span>
                <span className={css.dropText}>{it}</span>
              </li>
            ))}      
            </ul>
          ) : null}
        </div>
      </>
    );
  
}
export default Popular;
