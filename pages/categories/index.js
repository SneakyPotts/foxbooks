import React from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPage from '../../components/CategoriesPage';

import { setAudioCategories, setCategories } from '../../store/bookSlice';

import CategoriesService from '../../http/CategoriesService';

const index = (props) => {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setAudioCategories(props.audioCategories));

  return <CategoriesPage />;
};

export default index;

export async function getServerSideProps() {
  const categories = await CategoriesService.getCategoriesWithCount();
  const audioCategories = await CategoriesService.getAudioCategoriesWithCount();

  return {
    props: {
      SEO: {
        title: 'Читать книги по жанрам в онлайн-библиотеке FoxBooks 🦊| Читать онлайн бесплатно',
        description:
          'Слушать и читать книги по жанрам в онлайн библиотеке FoxBooks. Читать онлайн бесплатно никогда не было так просто! Загадочные детективы, страстные романы, захватывающие' +
          ' приключения — вы обязательно найдёте литературу по душе!',
        keywords: ['читать книги по жанрам', 'читать онлайн бесплатно'],
      },
      categories: categories?.data?.data,
      audioCategories: audioCategories?.data?.data,
    },
  };
}
