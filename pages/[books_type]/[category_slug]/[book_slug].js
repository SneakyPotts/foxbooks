import React from 'react';
import { useDispatch } from 'react-redux';

import BookPage from '../../../components/BookPage';

import { setCurrentPageBanners } from '../../../store/adminSlice';
import { setBook } from '../../../store/bookSlice';

import AdminSettings from '../../../http/AdminSettings';
import BookService from '../../../http/BookService';

const Book = ({ book, books_type, banners }) => {
  const dispatch = useDispatch();

  dispatch(setBook(book));
  dispatch(setCurrentPageBanners(banners));

  return <BookPage bookType={books_type} />;
};

export default Book;

export async function getServerSideProps({ req, params }) {
  const { cookies } = req;

  const type = params.books_type === 'audiobooks' ? 'audioBooks' : 'books';

  const token = cookies.token;

  try {
    const book = type === 'books' ? await BookService.getBookBySlug(params?.book_slug, token) : await BookService.getAudioBookBySlug(params.book_slug, token);
    const similarBooks = await BookService.getSimilarBooks(book.data.data.id, type);

    const banners = await AdminSettings.getPageBanner({ page_slug: params?.book_slug });

    const audioBookChapters = type === 'audioBooks' ? await BookService.audioBookChapters(book.data.data.id) : null;
    console.log('getBookBySlug', book?.data?.data);
    return {
      props: {
        book: {
          ...book?.data?.data,
          similarBooks: similarBooks.data.data,
          chapters: audioBookChapters?.data?.data?.chapters || [],
        },
        books_type: type,
        SEO: {
          title: book?.data?.data?.seo_title,
          description: book?.data?.data?.seo_description,
          keywords: book?.data?.data?.seo_keywords,
          og_title: book?.data?.data?.og_title,
          og_description: book?.data?.data?.og_description,
          og_img: book?.data?.data?.og_img,
        },
        banners: banners?.data?.data,
      },
    };
  } catch {
    return {
      notFound: true, // triggers 404
    };
  }
}
