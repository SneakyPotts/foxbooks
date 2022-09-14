import React from 'react';
import ReviewPage from '../../components/ReviewPage';
import AuthorService from "../../http/AuthorService";
import {useDispatch} from "react-redux";
import {setAuthorReviews} from "../../store/authorSlice";

const Reviews = (props) => {
	const dispatch = useDispatch();

	dispatch(setAuthorReviews(props.reviews))

	return <ReviewPage />;
};

export default Reviews;

export async function getServerSideProps({ query }) {

	try {
		const reviews = await AuthorService.getAuthorReviews(query.slug);

		return {
			props: {
				reviews: reviews.data.data,
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