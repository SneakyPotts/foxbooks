import { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Stars from '../../shared/common/stars/Stars';
import Like from '../../shared/icons/heart';
import HorizontalDots from '../../../public/horizontalDots.svg';
import All from '../../shared/icons/all';
import Bin from '../../../public/trash.svg';

import st from './quotes.module.scss';

const Quotes = () => {
  const [dotsMenu, setDotsMenu] = useState(null);
  const [quotes, setQuotes] = useState([{ id: 0 }, { id: 1 }]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.addEventListener('click', closeMenu);

    return () => {
      body.removeEventListener('click', closeMenu);
    };
  }, []);

  const checkOptions = (idx, e) => {
    e.stopPropagation();
    setDotsMenu(prev => {
      if (prev === idx) {
        dotsMenu;
      } else {
        setDotsMenu(idx);
      }
    });
  };

  const handleEditPageClick = e => {
    e.stopPropagation();
    setEdit(true);
  };

  const handleDeleteClick = (e, idx) => {
    e.stopPropagation();
    setQuotes(quotes.filter((_, index) => index !== idx));
    setDotsMenu(null);
  };

  const closeMenu = () => {
    setDotsMenu(false);
  };

  return (
    <ul className={st.quotes}>
      {quotes.map((q, idx) => (
        <li key={q.id} className={st.quoteBlock}>
          <div className={st.quoteBlockHeader}>
            <Image
              src="/horizontalBookCovers/book.png"
              alt=""
              width={41}
              height={64}
              className={st.quoteBlockImg}
            />
            <div className={st.quoteBlockHeaderInfo}>
              <h3 className={st.quoteBlockTitle}>
                Гарри Поттер и философский камень
              </h3>
              <p className={st.quoteBlockAuthor}>Джоан Роулинг</p>
              <div className={st.quoteBlockStars}>
                <Stars />
                <div className={st.quoteBlockStarsRaiting}>5,3 (450)</div>
              </div>
            </div>
          </div>
          <p className={st.quoteBlockText}>
            Семья Дурсль ей имела все, чего только можно пожелать. Но был у них
            и один секрет. Причем больше всего на свете они боялись, что
            кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что
            с ними будет, если выплывет правда о Поттерах. Миссис Поттер
            приходилась миссис Дурсль
          </p>
          <div className={st.reviewBottom}>
            <div className={st.reviewBottomStatistic}>
              <span className={st.reviewIcon}>
                <Like />
              </span>
              <span className={st.reviewLike}>3115</span>
            </div>
            <span
              className={classNames(st.dotsIcon, {
                [st.active]: dotsMenu === idx,
              })}
              onClick={e => checkOptions(idx, e)}
            >
              <HorizontalDots />
            </span>
          </div>
          {dotsMenu === idx && (
            <div className={st.editMenu}>
              <p
                dotsMenu
                className={st.editMenuOption}
                onClick={e => handleEditPageClick(e)}
              >
                <All className={st.editMenuOptionIcon} />
                <span className={st.editMenuOptionText}>Показать в книге</span>
              </p>

              <p
                className={st.editMenuOption}
                onClick={e => handleDeleteClick(e, idx)}
              >
                <Bin className={st.editMenuOptionIcon} />
                <span className={st.editMenuOptionText}>Удалить</span>
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Quotes;
