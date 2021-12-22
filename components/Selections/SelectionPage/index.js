import { useState } from 'react';
import classnames from 'classnames';
import Book from '../../shared/common/book';
import st from './selectionPage.module.scss';

const SelectionPage = () => {
  const data = [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' },
    { id: '13' },
    { id: '14' },
    { id: '15' },
    { id: '16' },
    { id: '17' },
    { id: '18' },
    { id: '19' },
  ];
  const [add, setAdd] = useState(false);
  const addSelect = () => {
    setAdd(true);
  };

  return (
    <div>
      <div className={st.selectionCover}>
        <h1 className={st.selectionTitle}>
          Что читать на карантине? Лучшие книги о любви 2021
        </h1>
        <button
          className={classnames(st.selectionBtn, {
            [st.selectionBtnAdded]: add,
          })}
          onClick={addSelect}
        >
          {!add ? (
            <span>Добавить подборку</span>
          ) : (
            <span>Подборка добавлена</span>
          )}
        </button>
      </div>
      <div className={classnames(st.selection, 'container')}>
        <div className={st.selectionBooksAmount}>
          <span className={st.selectionBooksCount}>60</span>
          <span className={st.selectionBooksItems}>Книг</span>
        </div>
        <p className={st.selectionAbout}>
          Young Adult без рамок и границ. Никаких неудобных вопросов и запретных
          тем. Только искренние эмоции.
        </p>
        <div className={st.selectionBooks}>
          {data.map(it => (
            <div key={it.id} className={st.selectionBooksItem}>
              <Book />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
