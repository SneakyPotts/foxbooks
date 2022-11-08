import React, {useEffect} from 'react';
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
  onModal
}) => {
  const router = useRouter();
  const { query } = router;
  const [currentIdx, setCurrentIdx] = useState(null);

  const handleOnClick = value => {
    router.push({ query: {
        ...router.query,
        [queryName]: value,
        ['page']: 1
    } }, null, {
      scroll: false,
    });
    setCurrentIdx(value);
  };

  useEffect(() => {
    let currQuery = typeof query[queryName] === "string" ? query[queryName] : Number(query[queryName]);

    setCurrentIdx(currQuery || filters?.[0]?.value);
  }, [filters]);

  return (
    <div className={onModal && st.wrapper}>
      {filters?.map((i, index) => (
        <span
          key={i.id || index}
          className={classnames(st.abFilter, {
            [st.active]: currentIdx === i?.value,
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
