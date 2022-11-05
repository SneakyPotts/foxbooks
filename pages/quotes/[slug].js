import React from 'react';
import {useDispatch} from "react-redux";
import ReviewPage from '../../components/ReviewPage';
import AuthorService from "../../http/AuthorService";
import AdminSettings from "../../http/AdminSettings";
import {setAuthorQuotes} from "../../store/authorSlice";
import {setCurrentPageBanners} from "../../store/adminSlice";

const Quotes = (props) => {
	const dispatch = useDispatch();

	dispatch(setAuthorQuotes(props.quotes));
	dispatch(setCurrentPageBanners(props.banners));

	return <ReviewPage />
};

export default Quotes;

export async function getServerSideProps({ params, query }) {
	try {
		const quotes = await AuthorService.getAuthorQuotes(params.slug, query.page);
		const banners = await AdminSettings.getPageBanner({page_slug: 'quotes'});

		return {
			props: {
				quotes: quotes.data.data,
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