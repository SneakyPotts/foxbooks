import React from 'react';
import { useDispatch } from 'react-redux';
import SeriesPage from "../../../components/SeriesPage";
import AuthorService from "../../../http/AuthorService";
import AdminSettings from "../../../http/AdminSettings";
import {setSeries} from "../../../store/authorSlice";
import {setCurrentPageBanners} from "../../../store/adminSlice";


const series = ({ series, banners }) => {
	const dispatch = useDispatch()

	dispatch(setSeries(series));
	dispatch(setCurrentPageBanners(banners));

	return <SeriesPage />;
};

export default series;

export async function getServerSideProps ({ req, params }) {
	const { cookies } = req
	const token = cookies.token

	try {
		const series = await AuthorService.getAuthorSeriesBySlug({token, slug: params?.slug, type: params?.series_type});
		const banners = await AdminSettings.getPageBanner({page_slug: params?.slug});

		return {
			props: {
				series: series?.data?.data,
				SEO: {
					title: series?.data?.data?.seo_title,
					description: series?.data?.data?.seo_description,
					keywords: series?.data?.data?.seo_keywords,
					og_title: series?.data?.data?.og_title,
					og_description: series?.data?.data?.og_description,
					og_img: series?.data?.data?.og_img,
				},
				banners: banners?.data?.data,
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
