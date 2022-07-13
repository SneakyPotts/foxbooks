import React from 'react';
import { useState } from 'react';
import classnames from 'classnames';

import st from './bookFilters.module.scss';
import { useRouter } from 'next/router';

const initFilters = [
  { id: 1, title: 'Последние поступления', value: 1 },
  { id: 2, title: 'Популярные', value: 3 },
  { id: 3, title: 'Бестселлеры', value: 5 },
  { id: 4, title: 'Сейчас читают', value: 2 },
];

const BookFilters = ({
                       filters = initFilters,
                       queryName = 'sortBy',
                       onModal,
                       resetFlag = false
                     }) => {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(router.query[queryName]);

  const handleOnClick = value => {
    if (resetFlag) {
      router.push(
        {query: {
            'sortBy': router.query['sortBy'],
            [queryName]: value
          }},
        null,
        {scroll: false}
      )
    } else {
      router.push(
        { query: { ...router.query, [queryName]: value } },
        null,
        {scroll: false}
      );
    }
    setCurrentIdx(value);
  };

  return (
    <div className={onModal && st.wrapper}>
      {filters?.map(i => (
        <span
          key={i?.id}
          className={classnames(st.abFilter, {
            [st.active]: currentIdx == i?.value,
            [st.onModal]: onModal
          })}
          onClick={() => handleOnClick(i?.value)}
        >
          {i?.title}
        </span>
      ))}
    </div>
  );
};

export default BookFilters;
