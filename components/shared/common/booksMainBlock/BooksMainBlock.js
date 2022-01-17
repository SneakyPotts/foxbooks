import React from 'react';
import Book from '../book';
import st from './booksMainBlock.module.scss';
import {useSelector} from "react-redux";

const BooksMainBlock = ({ audio }) => {
	const { books } = useSelector(state => state.book)

	return (
		<div className={st.mainBlock}>
			<div className={st.booksGrid}>
				{books?.data?.map(book => (
					<Book key={book.id} audio={audio} book={book} />
				))}
			</div>
			<div className={st.advertisingBlok}>
				<img src="/banner.png" alt="" className={st.banner} />
				<img src="/banner.png" alt="" className={st.banner} />
			</div>
		</div>
	);
};

export default BooksMainBlock;
