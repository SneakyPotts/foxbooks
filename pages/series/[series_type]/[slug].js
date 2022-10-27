import React from 'react';
import { useDispatch } from 'react-redux';
import {setSeries} from "../../../store/authorSlice";
import SeriesPage from "../../../components/SeriesPage";
import AuthorService from "../../../http/AuthorService";


const series = ({ series }) => {
	const dispatch = useDispatch()

	dispatch(setSeries(series))

	return <SeriesPage />;
};

export default series;

export async function getServerSideProps ({ req, params }) {
	const { cookies } = req
	const token = cookies.token

	try {
		const series = await AuthorService.getAuthorSeriesBySlug({token, slug: params?.slug, type: params?.series_type})

		return {
			props: {
				series: series?.data?.data
			}
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
