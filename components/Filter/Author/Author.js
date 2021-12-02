import React, { useState } from 'react';
import ArrowAll from '../../../public/chevron-down.svg';
import categories from '../../HomePage/Categories/categories.json';
import css from '../Popular/popular.module.css';


const Author =()=> {
    const [menu, setMenu] = useState(false)
  const [optionIndex, setOptionIndex] = useState(null);

  const togleMenu=(e)=> {
    e.preventDefault();

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
            <span className={css.dropBtnText}>Автор</span>{' '}
              <ArrowAll className={`${menu&&css.up}`} />
          </button>
          {menu ? (
                    <ul className={css.dropContent}>
                        {categories.map((it, index) => (
                            <li key={it.id} value={index} onClick={handleOnClick} className={css.dropLink}>
                                <span className={css.dropText}>
                  {it.name}</span>
                </li>))}
               
            </ul>
          ) : null}
        </div>
      </>
    );
  }


export default Author;