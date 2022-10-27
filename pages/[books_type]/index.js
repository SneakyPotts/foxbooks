import React from 'react';
import BooksComponent from '../../components/Books';
import BookService from '../../http/BookService';
import {useDispatch} from 'react-redux';
import {setBooks, setCategories} from '../../store/bookSlice';
import CategoriesService from "../../http/CategoriesService";
import AdminSettings from "../../http/AdminSettings";

const Books = props => {
  const dispatch = useDispatch();
  const booksType = props.books_type === 'audiobooks' ? 'audioBooks' : 'books';

  dispatch(setCategories(props.categories));
  dispatch(setBooks(props.books));

  return (
    <div>
      <BooksComponent booksType={booksType} order={props.order}/>
    </div>
  );
};

export default Books;

export async function getServerSideProps({query, params}) {
  const types = {
    'books': 'books',
    'audiobooks': 'audioBooks'
  }
  try {
    const categories = params.books_type === 'books'
      ? await CategoriesService.getCategoriesWithCount()
      : await CategoriesService.getAudioCategoriesWithCount();

    const order = await AdminSettings.getSortSetting(params.books_type);

    const books = await BookService.getBooks({
      ...query, type: types[params?.books_type], sortBy: order?.data?.data?.[0]?.value || 1
    });

    const dataSEO = params.books_type === 'books'
      ? {
        title: 'Читать онлайн книги всех жанров на FoxBooks 🦊',
        description: 'Слушать самые лучшие аудиокниги онлайн бесплатно и без регистрации на FoxBooks: популярные новинки, профессиональные чтецы, большая библиотека и доступ с любого гаджета!',
        keywords: ['самые лучшие аудиокниги', 'слушать аудиокниги бесплатно']
      }
      : {
        title: 'Самые лучшие аудиокниги на FoxBooks 🦊 | Слушать аудиокниги бесплатно',
        description: 'Читать онлайн книги всех жанров на онлайн-библиотеке FoxBooks: фэнтези, фантастика, современная литература, любовные романы, отечественная и зарубежная литература и много другого! Сайт доступен на всех гаджетах.',
        keywords: ['читать онлайн', 'книги всех жанров']
      }

    return {
      props: {
        SEO: dataSEO,
        categories: categories?.data?.data,
        books: books?.data?.data,
        books_type: params.books_type,
        order: order?.data?.data
      },
    };

  } catch {
    return {
      redirect: {
        destination: "/404",
        parameter: false
      }
    };
  }
}
