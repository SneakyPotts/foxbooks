import React from 'react';
import {useDispatch} from "react-redux";
import ReviewPage from '../../components/ReviewPage';
import AuthorService from "../../http/AuthorService";
import AdminSettings from "../../http/AdminSettings";
import {setAuthorReviews} from "../../store/authorSlice";
import {setCurrentPageBanners} from "../../store/adminSlice";

const Reviews = (props) => {
	const dispatch = useDispatch();

	dispatch(setAuthorReviews(props.reviews));
	dispatch(setCurrentPageBanners(props.banners));

	return <ReviewPage />;
};

export default Reviews;

export async function getServerSideProps({ params, query }) {
	try {
		const reviews = await AuthorService.getAuthorReviews(params.slug ,query.page);
		const banners = await AdminSettings.getPageBanner({page_slug: 'reviews'});

		return {
			props: {
				reviews: reviews.data.data,
				banners: banners?.data?.data,
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