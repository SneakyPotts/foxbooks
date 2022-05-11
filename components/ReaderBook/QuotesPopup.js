import React from 'react';
import styles from "./styles.module.scss";
import {useSelector} from "react-redux";
import classNames from "classnames";
import SearchInput from "../SearchInput";
import Popular from "../Filter/Popular/Popular";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 0,
    options: [
      { id: 1, title: 'Все', value: 0 },
      { id: 2, title: 'Хочу прочитать', value: 1},
      { id: 3, title: 'Читаю', value: 2 },
      { id: 3, title: 'Прочитано', value: 3 }
    ],
    queryName: 'status',
  },
];

const QuotesPopup = () => {
  const { quotes } = useSelector(state => state.reader)

  return (
    <>
      <h3 className={styles.popupTitle}>Цитаты</h3>
      <SearchInput
        placeholder={'Введите слово из цитаты'}
        externalClass={styles.quotesSearch}
        onChange={() => {}}
      />
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
      {quotes?.length ?
        <ul className={classNames(styles.popupList, styles.quotesList)}>
          {quotes?.map(i =>
            <li
              key={i?.id}
              className={styles.popupListItem}
            >
              {i?.text}
            </li>
          )}
        </ul> :
        <p className={styles.empty}>У Вас нет добавленных цитат</p>
      }
    </>
  );
};

export default QuotesPopup;
