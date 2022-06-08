import Date from './Date/Date';
import css from './updates.module.css';
import classNames from "classnames";
import {useSelector} from "react-redux";

const BookUpdates = () => {
  const { dailyHotUpdates } = useSelector(state => state.book)

  const data = Object.entries(dailyHotUpdates)

  return (
    <div className={css.container}>
      <h2 className={classNames("title", css.title)}>Горячие обновления книг</h2>
      {data.map(i =>
        <Date
            key={i[0]}
            date={i[0]}
            books={i[1]}
        />
      )}
    </div>
  );
};
export default BookUpdates;
