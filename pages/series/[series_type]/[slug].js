import React from 'react';
import { useDispatch } from 'react-redux';

import SeriesPage from '../../../components/SeriesPage';

import { setCurrentPageBanners } from '../../../store/adminSlice';
import { setSeries } from '../../../store/authorSlice';

import AdminSettings from '../../../http/AdminSettings';
import AuthorService from '../../../http/AuthorService';

const series = ({ series, banners }) => {
  const dispatch = useDispatch();

  dispatch(setSeries(series));
  dispatch(setCurrentPageBanners(banners));

  return <SeriesPage />;
};

export default series;

export async function getServerSideProps({ req, params }) {
  const { cookies } = req;
  const token = cookies.token;

  try {
    const series = await AuthorService.getAuthorSeriesBySlug({ token, slug: params?.slug, type: params?.series_type });
    const banners = await AdminSettings.getPageBanner({ page_slug: params?.slug });

    return {
      props: {
        series: series?.data?.data,
        SEO: {
          ...series?.data?.data?.seo_data,
          title: series?.data?.data?.seo_data?.seo_title || '',
          description: series?.data?.data?.seo_data?.seo_description || '',
          keywords: series?.data?.data?.seo_data?.seo_keywords || '',
        },
        banners: banners?.data?.data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/404',
        parameter: false,
      },
    };
  }
}
