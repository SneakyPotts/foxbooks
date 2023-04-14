import Link from 'next/link';

import React from 'react';

import Logo from '../Logo';
import st from './error.module.scss';

import Button from '../shared/common/Button/Button';

const Error = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.lineV} />
      <div className={st.lineH} />

      <div className={st.main}>
        <Logo />
        <div className={st.book}>
          <div className={st.bookLetters}>B</div>
          <div className={st.bookNumber}>
            4<span>O</span>
            <span>4</span>
          </div>
          <div className={st.bookLetters}>O</div>
          <div className={st.bookLetters}>K</div>
        </div>
        <h2 className={st.errorTitle}>Упс... страница не найдена</h2>
        <p className={st.errorText}>
          К сожалению, запрашиваемая страница потерялась. <br />
          Мы обязательно разберемся с этим недоразумением.
        </p>
        <Link href="/">
          <a className={st.btn}>Вернуться на главную</a>
        </Link>
      </div>
    </div>
  );
};

export default Error;
