import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import ArrowAll from '../../../public/chevron-down.svg';
import css from '../Popular/popular.module.css';


const Author =({title, data, filterStateIdx, elIdx, setFilStateIdx})=> {
  const [menu, setMenu] = useState(false)
  const [optionIndex, setOptionIndex] = useState(null);

   useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);
    
    return (() => {
      body.removeEventListener('click', closeMenu);
    })
   }, [])
  
  const togleMenu = (e) => {
    e.stopPropagation();

    setMenu(prevMenu=>!prevMenu);
  }

  const handleOnClick = (e) => {
    setOptionIndex(e.target.value)
  }

  const closeMenu = () => {
    setMenu(false);
  }

    return (
      <>
        <div className={css.dropdown}>
          <button className={`${css.dropBtn} ${menu?css.open:css.close}`} onClick={togleMenu}>
            <span className={css.dropBtnText}>{ title }</span>{' '}
              <ArrowAll className={`${menu&&css.up}`} />
          </button>
          {menu ? (
            <ul className={css.dropContentAuthor}>
              {data.map((it, index) => (
                <Link key={it} href='#' value={index} onClick={handleOnClick}>
                  <a className={css.dropLinkAuthor}>{it}</a>
                </Link>))}
            </ul>
          ) : null}
        </div>
      </>
    );
  }


export default Author;