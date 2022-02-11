import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';

import st from './bookFilters.module.scss';
import { useRouter } from 'next/router';

const initFilters = [
  { id: 1, title: 'Последние поступления', value: 1 },
  { id: 2, title: 'Популярные', value: 3 },
  { id: 3, title: 'Бестселлеры', value: 4 },
  { id: 4, title: 'Сейчас читают', value: 2 },
];

const BookFilters = ({ filters = initFilters, queryName = 'sortBy' }) => {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(router.query[queryName]);

  const handleOnClick = value => {
    router.push({ query: { ...router.query, [queryName]: value } }, null, {
      scroll: false,
    });
    setCurrentIdx(value);
  };

  return (
    <div>
      {filters?.map(i => (
        <button
          key={i?.id}
          className={classnames(st.abFilter, {
            [st.active]: currentIdx == i?.value,
          })}
          onClick={() => handleOnClick(i?.value)}
        >
          {i?.title}
        </button>
      ))}
    </div>
  );
};

export default BookFilters;
