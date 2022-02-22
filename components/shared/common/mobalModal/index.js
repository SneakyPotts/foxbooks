import { useState } from 'react';
import Link from 'next/link';
import Grid from '../../icons/navMenu/grid';
import Filters from '../../icons/filters';
import CrossInCircle from '../../icons/crossInCircle';
import ModalWindow from '../modalWindow/ModalWindow';
import Popular from '../../../Filter/Popular/Popular';
import Button from '../Button/Button';
import st from './mobalModal.module.scss';

const MobalModal = ({ audio = false }) => {
  const data = [
    {
      title: 'Последние поступления',
      defaultValue: 4,
      options: [
        { id: 1, title: 'Последние поступления', value: 4 },
        { id: 2, title: 'Популярные', value: 3 },
        { id: 3, title: 'Бестселлеры', value: 5 },
        { id: 4, title: 'По отзывам', value: 1 },
        { id: 5, title: 'Сейчас читают', value: 2 },
      ],
      queryName: 'sortBy',
    },
  ];
  const [showFilters, setShowFilters] = useState(false);
  const [stateIndex, setStateIndex] = useState(null);
  const [filters, setFilters] = useState([
    {
      id: '0',
      flag: false,
      option: 'Автор',
      placeholder: 'Найти автора',
      queryName: 'findByAuthor',
      alphabetQuery: 'alphabetAuthorIndex',
    },
    {
      id: '1',
      flag: false,
      option: 'Книга',
      placeholder: 'Найти книгу',
      queryName: 'findByTitle',
      alphabetQuery: 'alphabetPublisherIndex',
    },
    {
      id: '2',
      flag: false,
      option: 'Издательство',
      placeholder: 'Найти издательство',
      queryName: 'findByPublisher',
      alphabetQuery: 'alphabetTitleIndex',
    },
  ]);

  return (
    <div className={st.mobalModal}>
      <div
        className={st.mobalModalFiltersMenu}
        onClick={e => e.stopPropagation()}
      >
        <div className={st.filters}>
          <Link href="/categories">
            <a>
              Категории
              <div className={st.icon}>
                <Grid />
              </div>
            </a>
          </Link>

          <div onClick={() => setShowFilters(true)}>
            <span>Фильтры</span>
            <Filters />
          </div>
        </div>
        {!audio && (
          <button>
            Популярные
            <CrossInCircle />
          </button>
        )}
      </div>
      {showFilters && (
        <ModalWindow onClose={() => setShowFilters(false)} isFullScreen={true}>
          <div className={st.mobalModalHead}>
            <p className={st.mobalModalTitle}>Фильтры</p>
            <span className={st.filterCount}>2</span>
            <p className={st.mobalModalFilters}>Очистить фильтры</p>
          </div>
          {data.map((it, index) => (
            <Popular
              key={index}
              title={it?.title}
              defaultValue={it?.defaultValue}
              data={it?.options}
              queryName={it?.queryName}
              filterStateIdx={stateIndex}
              elIdx={index}
              setFilStateIdx={setStateIndex}
            />
          ))}
          <ul className={st.filters}>
            {filters?.map(it => (
              <li key={it?.id} className={st.filterStatus}>
                <button className={st.btn}>{it?.option}</button>
                <div className={st.dates} onClick={e => e.stopPropagation()}>
                  <input
                    placeholder={it?.placeholder}
                    className={st.input}
                    onChange={ev =>
                      handleChange(ev.target.value, it?.queryName)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button
            text="Посмотреть 262 предложения"
            classNames={st.filtersBtn}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default MobalModal;
