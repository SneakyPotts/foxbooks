import React from 'react';
import { useDispatch } from 'react-redux';

import SearchPage from '../components/SearchPage';

import { setCurrentPageBanners } from '../store/adminSlice';

import AdminSettings from '../http/AdminSettings';
import SearchService from '../http/SearchService';

const Search = (props) => {
  const dispatch = useDispatch();

  dispatch(setCurrentPageBanners(props.banners));

  return <SearchPage data={props.data} />;
};

export default Search;

export async function getServerSideProps({ query }) {
  const data = await SearchService.search(query);
  const banners = await AdminSettings.getPageBanner({ page_slug: 'search' });

  let emptySearchResult = true;
  for (let arrayField in data.data.data) {
    emptySearchResult = !data?.data?.data?.[arrayField].length && emptySearchResult;
  }
  return emptySearchResult
    ? {
        redirect: {
          destination: '/search-empty',
          parameter: false,
        },
      }
    : {
        props: {
          data: data.data.data,
          banners: banners?.data?.data,
        },
      };
}
