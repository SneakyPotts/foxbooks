import React from 'react';
import { useDispatch } from 'react-redux';

import { MicroMarkingOtherPages } from '../../../components/AnaliticsScript/MicroMarking';
import SeriesPage from '../../../components/SeriesPage';

import { setCurrentPageBanners } from '../../../store/adminSlice';
import { setSeries } from '../../../store/authorSlice';

import AdminSettings from '../../../http/AdminSettings';
import AuthorService from '../../../http/AuthorService';

const series = (props) => {
  const dispatch = useDispatch();

  dispatch(setSeries(props.series));
  dispatch(setCurrentPageBanners(props.banners));

  return (
    <>
      <MicroMarkingOtherPages {...props.SEO} />
      <SeriesPage />
    </>
  );
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
        banners: {
          aside: banners?.data?.data,
        },
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
