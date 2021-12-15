import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';

import data from '../../../data/popularOptions.json';
import st from './bookFilters.module.scss';

const BookFilters = () => {
  const [currentIdx, setCurrentIdx] = useState(null);

  const handleOnClick = idx => {
    setCurrentIdx(idx);
  };
  return (
    <div>
      {data.map(({ id, filter }, idx) => (
        <button
          key={id}
          className={classnames(st.abFilter, {
            [st.active]: currentIdx === idx,
          })}
          onClick={() => handleOnClick(idx)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default BookFilters;
