import React from 'react';
import ReviewPage from '../../components/ReviewPage';
import AuthorService from "../../http/AuthorService";
import {useDispatch} from "react-redux";
import {setAuthorQuotes} from "../../store/authorSlice";

const Quotes = (props) => {
	const dispatch = useDispatch();

	dispatch(setAuthorQuotes(props.quotes))

	return <ReviewPage />
};

export default Quotes;

export async function getServerSideProps({ params, query }) {
	try {
		const quotes = await AuthorService.getAuthorQuotes(params.slug, query.page);

		return {
			props: {
				quotes: quotes.data.data,
			},
		}
	} catch {
		return {
			redirect: {
				destination: "/404",
				parameter: false
			}
		};
	}
}