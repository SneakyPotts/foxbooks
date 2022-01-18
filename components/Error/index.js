import React from 'react';

import Logo from '../Logo';
import Button from '../shared/common/Button/Button';
import st from './error.module.scss';

const Error = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.lineV}></div>
      <div className={st.lineH}></div>
      <div className={st.centralBlok}>
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
          К сожалению, запрашиваемая страница потерялась. Мы обязательно
          разберемся с этим недоразумением.
        </p>
        <Button text="Вернуться на главную" />
      </div>
    </div>
  );
};

export default Error;
