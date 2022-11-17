import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Book from '../shared/common/book';
import MyPagination from '../shared/common/MyPagination';
import ClearAll from './Clear/Clear';
import Popular from './Popular/Popular';
import css from './filter.module.css';
import cssBook from './../shared/common/book/book.module.scss';

const Filters = ({order}) => {
  const data = [
    {
      title: order?.[0]?.title,
      defaultValue: order?.[0]?.value,
      options: order,
      queryName: 'sortBy',
    },
    {
      title: 'Категории',
      isCategory: true,
      queryName: 'findByCategory',
    },
    {
      title: 'Автор',
      isAlphabet: true,
      options: [
        'А',
        'Б',
        'В',
        'Г',
        'Д',
        'Е',
        'Ё',
        'Ж',
        'З',
        'И',
        'Й',
        'К',
        'Л',
        'М',
        'Н',
        'О',
        'П',
        'Р',
        'С',
        'Т',
        'У',
        'Ф',
        'Х',
        'Ц',
        'Ч',
        'Ш',
        'Щ',
        'Э',
        'Ю',
        'Я',
      ],
      queryName: 'alphabetAuthorIndex',
    },
    {
      title: 'Книга',
      isAlphabet: true,
      options: [
        'А',
        'Б',
        'В',
        'Г',
        'Д',
        'Е',
        'Ё',
        'Ж',
        'З',
        'И',
        'Й',
        'К',
        'Л',
        'М',
        'Н',
        'О',
        'П',
        'Р',
        'С',
        'Т',
        'У',
        'Ф',
        'Х',
        'Ц',
        'Ч',
        'Ш',
        'Щ',
        'Э',
        'Ю',
        'Я',
      ],
      queryName: 'alphabetTitleIndex',
    },
  ];

  const [stateIndex, setStateIndex] = useState(null);

  const { categories } = useSelector(state => state.book);
  const { books } = useSelector(state => state.book);

  const categoryOptions = categories?.map((i, index) => ({
    id: index + 1,
    title: i?.name,
    value: i?.id,
  }));

  categoryOptions?.unshift({ id: 0, title: 'Все категории' });

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.options}>
          {data?.map((it, index) => (
            <Popular
              key={it?.title}
              title={it?.title}
              defaultValue={it?.defaultValue}
              data={it?.isCategory ? categoryOptions : it?.options}
              queryName={it?.queryName}
              isAlphabet={it?.isAlphabet}
              setFilStateIdx={setStateIndex}
              elIdx={index}
              filterStateIdx={stateIndex}
            />
          ))}
        </div>
        <div>
          <ClearAll />
        </div>
      </div>
      {books?.data?.length ? (
        <>
          <ul className={css.bookList}>
            {books?.data?.map(book => (
              <li key={book?.id} className={`${css.book} ${cssBook.upBook}`}>
                <Book book={book} />
              </li>
            ))}
          </ul>
          <MyPagination lastPage={books?.last_page} />
        </>
      ) : (
        <p className="empty">Книги не найдены</p>
      )}
    </div>
  );
};
export default Filters;
