import React, {useState} from 'react';
import styles from './styles.module.scss'
import Popular from "../Filter/Popular/Popular";
import BookMark from '../shared/icons/myBookmark';
import OpenBook from '../shared/icons/bookOpen';
import Flag from '../shared/icons/flag';
import PageIcon from '../shared/icons/page';
import ClickableSearch from "../ClickableSearch";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      { id: 1, title: 'Все', value: 1, icon: <PageIcon /> },
      { id: 2, title: 'Хочу прочитать', value: 2, icon: <BookMark /> },
      { id: 3, title: 'Читаю', value: 3, icon: <OpenBook stroke={'#FF781D'} /> },
      { id: 3, title: 'Прочитано', value: 4, icon: <Flag /> }
    ],
    queryName: 'sortBy',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      { id: 1, title: 'Популярные', value: 3 },
      { id: 2, title: 'По дате добавления', value: 2 },
      { id: 3, title: 'По алфавиту', value: 2 }
    ],
    queryName: 'sortBy',
  },
];

const Books = () => {
  const [stateIndex, setStateIndex] = useState(null)

  return <>
    <div className={styles.filters}>
      <div>
        <span className={styles.filtersText}>Статус</span>
        {filter1?.map((i, index) => (
          <Popular
            key={index + 1}
            title={i?.title}
            defaultValue={i?.defaultValue}
            data={i?.options}
            queryName={i?.queryName}
            filterStateIdx={stateIndex}
            elIdx={1}
            setFilStateIdx={setStateIndex}
          />
        ))}
      </div>
      <div>
        <ClickableSearch queryName={'search'} />
        {filter2?.map((i, index) => (
          <Popular
            key={index + 2}
            title={i?.title}
            defaultValue={i?.defaultValue}
            data={i?.options}
            queryName={i?.queryName}
            filterStateIdx={stateIndex}
            elIdx={2}
            setFilStateIdx={setStateIndex}
            isRight
          />
        ))}
      </div>
    </div>
  </>
};

export default Books;