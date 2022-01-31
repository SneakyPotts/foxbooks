import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';

import st from './bookFilters.module.scss';
import { useRouter } from 'next/router';

const filters = [
  { id: 1, title: 'Последние поступления', value: 1 },
  { id: 2, title: 'Популярные', value: 3 },
  { id: 3, title: 'Бестселлеры', value: 4 },
  { id: 3, title: 'Сейчас читают', value: 2 },
];

const BookFilters = () => {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(+router.query['sortBy'] || 1);

  const handleOnClick = value => {
    router.push({ query: { ['sortBy']: value } }, null, { scroll: false });
    setCurrentIdx(value);
  };

  return (
    <div className={st.filters}>
      {filters?.map(i => (
        <button
          key={i?.id}
          className={classnames(st.abFilter, {
            [st.active]: currentIdx === i?.value,
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
