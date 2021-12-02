import React, { useState } from 'react';
import ArrowAll from '../../../public/chevron-down.svg';
import css from './popular.module.css';

const Popular= ()=> {
  const [menu, setMenu] = useState(false)
  // const [optionIndex, setOptionIndex] = useState(null);

  const togleMenu=(event)=> {
    event.preventDefault();
    setMenu(prevMenu=>!prevMenu);
    console.log('showMenu',menu)
  }
const handleOnClick = (e) => {
    setOptionIndex(e.target.value)
    console.log('handleOnClick', optionIndex)
  }
      return (
      <>
        <div className={css.dropdown}>
          <button className={`${css.dropBtn} ${menu?css.open:css.close}`} onClick={togleMenu}>
            <span className={css.dropBtnText}>Популярные</span>{' '}
              <ArrowAll className={`${menu&&css.up}`} />
          </button>
          {menu ? (
            <ul className={css.dropContent}>
                <li onClick={handleOnClick} className={css.dropLink}><span className={css.dropText}>
                  Популярные</span>
                </li>
                <li onClick={handleOnClick} className={css.dropLink}><span className={css.dropText}>Высокий рейтинг</span></li>
            
                <li onClick={handleOnClick} className={css.dropLink}><span className={css.dropText}>
                  Много отзывов</span></li>
                <li onClick={handleOnClick} className={css.dropLink}><span className={css.dropText}>
                  Сейчас читают</span></li>
            </ul>
          ) : null}
        </div>
      </>
    );
  
}
export default Popular;
