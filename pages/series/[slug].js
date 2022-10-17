import React from 'react';
import { useDispatch } from 'react-redux';
import SeriesPage from "../../components/SeriesPage";
import {setSeries} from "../../store/authorSlice";
import AuthorService from "../../http/AuthorService";

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
		const series = await AuthorService.getAuthorSeries({token, id: params?.slug})

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
