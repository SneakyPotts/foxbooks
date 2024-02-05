import React from 'react';
import { useDispatch } from 'react-redux';

import { MicroMarkingOtherPages } from '../../components/AnaliticsScript/MicroMarking';
import BooksComponent from '../../components/Books';

import { setCurrentPageBanners } from '../../store/adminSlice';
import { setBooks, setCategories } from '../../store/bookSlice';

import AdminSettings from '../../http/AdminSettings';
import BookService from '../../http/BookService';
import CategoriesService from '../../http/CategoriesService';

const Books = (props) => {
  const dispatch = useDispatch();
  const booksType = props.books_type === 'audiobooks' ? 'audioBooks' : 'books';

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books));
  dispatch(setCurrentPageBanners(props.banners));

  return (
    <>
      <MicroMarkingOtherPages {...props.SEO} />
      <BooksComponent
        booksType={booksType}
        order={props.order}
      />
    </>
  );
};

export default Books;

export async function getServerSideProps({ query, params }) {
  const types = {
    books: 'books',
    audiobooks: 'audioBooks',
  };
  try {
    const categories = params.books_type === 'books' ? await CategoriesService.getCategoriesWithCount() : await CategoriesService.getAudioCategoriesWithCount();

    const order = await AdminSettings.getSortSetting(params.books_type);
    const banners = await AdminSettings.getPageBanner({ page_slug: types[params?.books_type] });

    const books = await BookService.getBooks({
      ...query,
      type: types[params?.books_type],
      sortBy: query.sortBy || order?.data?.data?.[0]?.value,
    });

    const pageSEO = query.page > 1 ? `Страница ${query.page}.` : '';

    const dataSEO =
      params.books_type === 'books'
        ? {
            title: `${pageSEO} Читать онлайн книги всех жанров на FoxBooks 🦊`.trim(),
            description:
              `Слушать самые лучшие аудиокниги онлайн бесплатно и без регистрации на FoxBooks: популярные новинки, профессиональные чтецы, большая библиотека и доступ с любого гаджета! ${pageSEO}`.trim(),
            keywords: ['самые лучшие аудиокниги', 'слушать аудиокниги бесплатно'],
          }
        : {
            title: `${pageSEO} Самые лучшие аудиокниги на FoxBooks 🦊 | Слушать аудиокниги бесплатно`.trim(),
            description:
              `Читать онлайн книги всех жанров на онлайн-библиотеке FoxBooks: фэнтези, фантастика, современная литература, любовные романы, отечественная и зарубежная литература и много другого! Сайт доступен на всех гаджетах. ${pageSEO}`.trim(),
            keywords: ['читать онлайн', 'книги всех жанров'],
          };

    return {
      props: {
        SEO: dataSEO,
        categories: categories?.data?.data,
        books: books?.data?.data,
        books_type: params.books_type,
        order: order?.data?.data,
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
