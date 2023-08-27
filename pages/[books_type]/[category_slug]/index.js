import React from 'react';
import { useDispatch } from 'react-redux';

import BookComponent from '../../../components/Books/category';

import { setCurrentPageBanners } from '../../../store/adminSlice';
import { setBooks, setCategories, setCategoriesInfoBlocks } from '../../../store/bookSlice';

import AdminSettings from '../../../http/AdminSettings';
import BookService from '../../../http/BookService';
import CategoriesService from '../../../http/CategoriesService';

const Categories = (props) => {
  const dispatch = useDispatch();

  dispatch(setCategories(props.categories));
  dispatch(setCategoriesInfoBlocks(props.infoBlocks));
  dispatch(setBooks(props.books));
  dispatch(setCurrentPageBanners(props.banners));

  return (
    <BookComponent
      order={props.order}
      current={props.currentCategory}
    />
  );
};

export default Categories;

export async function getServerSideProps({ req, params, query }) {
  const { cookies } = req;
  const { books_type, category_slug } = params;

  const token = cookies.token;

  try {
    const categories = books_type === 'books' ? await CategoriesService.getCategoriesBooks() : await CategoriesService.getAudioCategoriesWithCount();

    const order = await AdminSettings.getSortSetting(books_type === 'books' ? 'categories' : 'audio-categories');

    const categoryData = await CategoriesService.getBookCategories(category_slug, books_type);
    const categoryInfoBlock = await CategoriesService.getInfoblock(category_slug);
    const { seo_data } = categoryData.data.data[0];

    const books = await BookService.getBooks({
      ...query,
      type: books_type === 'audiobooks' ? 'audioBooks' : query.type,
      showType: query.showType || 'block',
      sortBy: query.sortBy || order?.data?.data?.[0]?.value,
      findByCategory: categoryData.data.data[0].id,
      token,
    });

    const banners = await AdminSettings.getPageBanner({ page_slug: 'category', category_slug });

    return {
      props: {
        currentCategory: {
          id: categoryData?.data?.data[0].id,
          name: categoryData?.data?.data[0].name,
          slug: categoryData?.data?.data[0].slug,
        },
        categories: categories?.data?.data,
        books: books?.data?.data,
        order: order?.data?.data,
        banners: banners?.data?.data,
        SEO: {
          title: seo_data?.seo_title,
          description: seo_data?.seo_description,
          keywords: seo_data?.seo_keywords,
          og_title: seo_data?.og_title,
          og_description: seo_data?.og_description,
          og_img: seo_data?.og_img,
        },
        infoBlocks: categoryInfoBlock?.data?.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
