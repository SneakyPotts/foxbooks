import Date from './Date/Date';
import css from './updates.module.css';
import classNames from "classnames";
const data = [
  {
    date: 'Вчера',
    books: [
      { author: 'Катерина Сильванова', book: 'Лето в пионерском ...' },
      { author: 'Марина Степнова', book: 'Сад' },
      { author: 'Никлас Натт-о-Даг', book: '1794' },
      { author: 'Виктор Пелевин', book: 'Непобедимое солнце' },
    ],
  },
  {
    date: 'Сегодня',
    books: [
      { author: 'Юлия Яковлева', book: 'Каннибалы' },
      { author: 'Мэй Маск', book: 'Женщина, у которой есть...' },
      { author: 'Катерина Сильванова', book: 'Лето в пионерском ...' },
      { author: 'Марина Степнова', book: 'Сад' },
    ],
  },
  {
    date: 'Завтра',
    books: [
      { author: 'Марина Степнова', book: 'Сад' },
      { author: 'Никлас Натт-о-Даг', book: '1794' },
      { author: 'Мэй Маск', book: 'Женщина, у которой есть...' },
      { author: 'Катерина Сильванова', book: 'Лето в пионерском ...' },
    ],
  },
];
const BookUpdates = () => {
  return (
    <div className={css.container}>
      <h2 className={classNames("title", css.title)}>Горячие обновления книг</h2>
      {data.map(({ date, books }) => (
        <Date key={date} date={date} books={books} className={css.date} />
      ))}
    </div>
  );
};
export default BookUpdates;
