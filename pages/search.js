import React from 'react';
import SearchPage from "../components/SearchPage";
import SearchService from "../http/SearchService";

const Search = (props) => {
  console.log('props', props.data)
  return <SearchPage />;
};

export default Search;

export async function getServerSideProps({query}) {
  const data = await SearchService.search(query)

  return {
    props: {
      data: data.data.data
    }
  }
}