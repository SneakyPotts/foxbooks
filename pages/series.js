import React from 'react';
import { useDispatch } from 'react-redux';
import SeriesPage from '../components/SeriesPage';
import AuthorService from '../http/AuthorService';
import {setSeries} from "../store/authorSlice";

const series = ({ series }) => {
	const dispatch = useDispatch()

	dispatch(setSeries(series))

	return <SeriesPage />;
};

export default series;

export async function getServerSideProps ({ req, query }) {
	const { cookies } = req
	const token = cookies.token

	try {
		const series = await AuthorService.getAuthorSeries({token, id: query?.id})

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
