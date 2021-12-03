import React, { useState } from 'react';
import Popular from './Popular/Popular';
import Author from './Author/Author';
import ClearAll from './Clear/Clear';
import Categories from '../data/categories.json'
import PopularOptions from '../data/popularOptions.json'
import Alphabet from '../data/alphabet.json'
import css from './filter.module.css';
const data = [
  { title: 'Популярные', options: ['Популярные', "Высокий рейтинг", "Много отзывов", "Сейчас читают"] },
  { title: 'Категории', options: ['Популярные', "Высокий рейтинг", "Много отзывов", "Сейчас читают"] },
  { title: 'Популярные', isAuthor: true, options: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split('') },
  { title: 'Книга', options: ['Популярные', "Высокий рейтинг", "Много отзывов", "Сейчас читают"] }
]

const Filters = () => {
  const [active, setActive] = useState(false);
  const [optionIndex, setpOptionIndex] = useState(null)

  const handleOnClick = () => {
    setActive(!active);
    console.log(active);
  }

  return (
    <div className={css.container}>
      <div className={css.options}>
        {data.map((it, index) => 
          it.isAuthor ?
            <Author setpOptionIndex={setpOptionIndex} index={index}  optionIndex1={optionIndex} title={it.title} data={it.options} /> :
            <Popular setpOptionIndex={setpOptionIndex} index={index} optionIndex1={optionIndex} title={it.title} data={it.options} />
        )}
      </div>
      <div><ClearAll /></div>
    </div>
  );
};
export default Filters;
