import React from 'react';
import { useDispatch } from 'react-redux';

import LetterListPage from '../../components/LetterListPage';

import { setCategories } from '../../store/bookSlice';

import CategoriesService from '../../http/CategoriesService';

const LetterList = (props) => {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));

  return <LetterListPage />;
};

export default LetterList;

export async function getServerSideProps() {
  try {
    const categories = await CategoriesService.getCategories();

    return {
      props: {
        categories: categories?.data?.data,
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
