import React from 'react';
import SearchPage from "../components/SearchPage";
import SearchService from "../http/SearchService";
import AdminSettings from "../http/AdminSettings";
import {setCurrentPageBanners} from "../store/adminSlice";
import {useDispatch} from "react-redux";

const Search = (props) => {
  const dispatch = useDispatch();

  dispatch(setCurrentPageBanners(props.banners));

  return <SearchPage data={props.data} />;
};

export default Search;

export async function getServerSideProps({query}) {
  const data = await SearchService.search(query);
  const banners = await AdminSettings.getPageBanner({page_slug: 'search'});

  return {
    props: {
      data: data.data.data,
      banners: banners?.data?.data,
    }
  }
}