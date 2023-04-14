import React from 'react';

import SearchEmptyPage from '../components/SearchEmptyPage';

import NoveltiesService from '../http/NoveltiesService';

const SearchEmpty = (props) => {
  return <SearchEmptyPage books={props.books.slice(0, 6)} />;
};

export default SearchEmpty;

export async function getServerSideProps({ query }) {
  const novelties = await NoveltiesService.getNovelties(query);

  return {
    props: {
      books: novelties?.data?.data.data,
    },
  };
}
