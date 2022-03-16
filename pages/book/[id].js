import React from 'react';
import BookPage from '../../components/BookPage';
import BookService from "../../http/BookService";
import {setBook} from "../../store/bookSlice";
import {useDispatch} from "react-redux";
import {setReviews} from "../../store/reviewSlice";
import CommentsService from "../../http/CommentsService";
import {setBookComments} from "../../store/commentsSlice";

const Book = ({ book, comments, reviews }) => {
	const dispatch = useDispatch()

	dispatch(setBook(book))
	dispatch(setBookComments(comments))
	// dispatch(setReviews(reviews))

	return <BookPage />
};

export default Book;

export async function getServerSideProps ({params, query}) {
	const book = await BookService.getBookById(params?.id, query?.type)
	const comments = await CommentsService.getComments({id: params?.id, type: query?.type})

	return {
		props: {
			book: book?.data?.data,
			comments: comments?.data?.data
			// reviews: book?.data?.data?.reviews,
		}
	}
}
