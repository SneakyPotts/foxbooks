import React from 'react';
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/bookSlice";
import LetterListPage from "../../components/LetterListPage";
import CategoriesService from "../../http/CategoriesService";

const LetterList = (props) => {
  const dispatch = useDispatch()

  dispatch(setCategories(props.categories));

  return <LetterListPage />;
};

export default LetterList;

export async function getServerSideProps () {
  const categories = await CategoriesService.getCategories()

  return {
    props: {
      categories: categories?.data?.data,
    }
  }
}