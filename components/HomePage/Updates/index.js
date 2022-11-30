import classNames from "classnames";
import {useSelector} from "react-redux";
import Date from './Date/Date';
import {formatDate} from "../../../utils";
import css from './updates.module.css';

const BookUpdates = () => {
	const {dailyHotUpdates} = useSelector(state => state.book)

	const data = Object.entries(dailyHotUpdates)

	return (
		<div className={css.container}>
			<h2 className={classNames("title", css.title)}>Горячие обновления книг</h2>
			{data.map((item, index) =>
				<Date
					key={item[0]}
					date={formatDate(item[0])}
					books={item[1]}
					show={index === 0 || index === 1}
					// show={formatDate(item[0]).includes('Вчера') || formatDate(item[0]).includes('Сегодня')}
				/>
			)}
		</div>
	);
};
export default BookUpdates;
