import React from 'react';
import { useDispatch } from 'react-redux';
import SeriesPage from '../components/SeriesPage';
import AuthorService from '../http/AuthorService';

const series = (props) => {
	const dispatch = useDispatch()

	console.log(props.series);

	return <SeriesPage />;
};

export default series;

export async function getServerSideProps ({ query }) {
	const series = await AuthorService.getAuthorSeries(query?.id)

	return {
		props: {
			series: series?.data?.data
		}
	}
}