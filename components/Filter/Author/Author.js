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

  const handleOnClick = (e) => {
    setOptionIndex(e.target.value)
  }

  const closeMenu = () => {
    setMenu(false);
    setFilStateIdx(null);
  }

    return (
      <>
        <div className={css.dropdown}>
          <button className={`${css.dropBtn} ${menu || elIdx === filterStateIdx ? css.open : css.close}`} onClick={togleMenu}>
            <span className={css.dropBtnText}>{ title }</span>{' '}
              <ArrowAll className={`${menu || elIdx === filterStateIdx && css.up}`} />
          </button>
          {menu  || elIdx === filterStateIdx ? (
            <ul className={css.dropContentAuthor} onClick={e=>e.stopPropagation()}>
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