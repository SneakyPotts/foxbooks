import React from 'react';
import CategoriesPage from '../../components/CategoriesPage';
import CategoriesService from "../../http/CategoriesService";
import {useDispatch} from "react-redux";
import {setAudioCategories, setCategories} from "../../store/bookSlice";

const index = (props) => {
  const dispatch = useDispatch()

  dispatch(setCategories(props.categories))
  dispatch(setAudioCategories(props.audioCategories))

  return <CategoriesPage />;
};

export default index;


export async function getServerSideProps () {
  const categories = await CategoriesService.getCategoriesWithCount()
  const audioCategories = await CategoriesService.getAudioCategoriesWithCount()

  return {
    props: {
      categories: categories?.data?.data,
      audioCategories: audioCategories?.data?.data
    }
  }
}